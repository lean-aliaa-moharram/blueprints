// POST /api/track
//   { event: "identify", token, email }      -> sets the signed viewer cookie (the page then reloads, and that
//                                               load is recorded as a visit by /b/<token>)
//   { event: "forget", token }                -> clears it ("Not you?")
//   { event: "beat" | "leave", token, visit, seconds } -> adds visible time to this page load's visit
// Visits themselves are recorded by the server when the page is requested (api/b.js), so every load counts.
import { handler, readJson, send, httpError } from '../lib/http.js';
import { query } from '../lib/db.js';
import { findActiveLink } from '../lib/blueprints.js';
import { classify, viewerCookie, clearViewerCookie, isSecure } from '../lib/viewer.js';
import { checkVisitSig, openVisit, visitSig } from '../lib/visits.js';
import { randomUUID } from 'node:crypto';

const VISIT_RE = /^[0-9a-f-]{36}$/;
const KEY_RE = /^[a-z0-9][a-z0-9:._-]{0,79}$/;
// { t: { key: [label, seconds] }, a: { key: [label, count] } } from the page, checked and capped.
function cleanEngagement(e) {
  const rows = [];
  if (!e || typeof e !== 'object') return rows;
  for (const [kind, src, cap] of [['time', e.t, 120], ['action', e.a, 50]]) {
    if (!src || typeof src !== 'object') continue;
    for (const [key, v] of Object.entries(src).slice(0, 60)) {
      if (!KEY_RE.test(key) || !Array.isArray(v)) continue;
      const label = typeof v[0] === 'string' ? v[0].replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, 140) : '';
      const n = Math.max(0, Math.min(cap, Math.round(Number(v[1]) || 0)));
      if (n) rows.push([key, kind, label, kind === 'time' ? n : 0, kind === 'action' ? n : 0]);
    }
  }
  return rows;
}

export default handler(['POST'], async (req, res) => {
  const body = await readJson(req);
  if (body.view !== undefined && body.view !== null) return send(res, 200, { ok: true, ignored: 'Lean view' });
  const link = await findActiveLink(body.token);
  if (!link) throw httpError(404, 'Link not active');

  if (body.event === 'identify') {
    const who = classify(body.email, []);
    if (!who.email) throw httpError(400, 'Enter a full email address, for example name@company.com.');
    return send(res, 200, { ok: true, name: who.name }, { 'Set-Cookie': viewerCookie(who.email, isSecure(req)) });
  }
  if (body.event === 'forget') return send(res, 200, { ok: true }, { 'Set-Cookie': clearViewerCookie(isSecure(req)) });

  if (body.event === 'open') {   // the page is on screen for the first time: now it's a visit
    if (typeof body.visit !== 'string' || !VISIT_RE.test(body.visit) || !checkVisitSig(body.visit, link.token, body.visitSig)) throw httpError(400, 'Bad visit');
    return send(res, 200, { ok: true, counted: await openVisit(req, link, body.visit) });
  }
  if (body.event === 'reopen') {   // back after an hour or more away: a new visit, with a new signed id
    if (typeof body.visit !== 'string' || !VISIT_RE.test(body.visit) || !checkVisitSig(body.visit, link.token, body.visitSig)) throw httpError(400, 'Bad visit');
    const visit = randomUUID();
    const counted = await openVisit(req, link, visit);
    return send(res, 200, { ok: true, counted, visit, visitSig: visitSig(visit, link.token) });
  }
  if (body.event === 'beat' || body.event === 'leave') {
    if (typeof body.visit !== 'string' || !VISIT_RE.test(body.visit)) throw httpError(400, 'Bad visit');
    const seconds = Math.max(0, Math.min(120, Math.round(Number(body.seconds) || 0)));
    await query(
      `UPDATE views SET last_seen_at = now(), seconds_visible = LEAST(seconds_visible + $3, 14400)
       WHERE session_id = $1 AND token = $2`,
      [body.visit, link.token, seconds]);
    const rows = cleanEngagement(body.engage);
    if (rows.length) {
      // Only for this link's own visit; repeated reports add up.
      await query(
        `INSERT INTO engagement (session_id, key, kind, label, seconds, count)
         SELECT $1, k, kd, lb, s, c FROM unnest($3::text[], $4::text[], $5::text[], $6::int[], $7::int[]) AS t(k, kd, lb, s, c)
          WHERE EXISTS (SELECT 1 FROM views WHERE session_id = $1 AND token = $2)
         ON CONFLICT (session_id, key) DO UPDATE SET seconds = engagement.seconds + EXCLUDED.seconds, count = engagement.count + EXCLUDED.count,
           label = coalesce(nullif(EXCLUDED.label, ''), engagement.label)`,
        [body.visit, link.token, rows.map((r) => r[0]), rows.map((r) => r[1]), rows.map((r) => r[2]), rows.map((r) => r[3]), rows.map((r) => r[4])]);
    }
    return send(res, 200, { ok: true });
  }
  throw httpError(400, 'Unknown event');
});
