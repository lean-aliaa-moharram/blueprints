// A visit is counted when the page is first on screen, not when it's requested: tabs reloaded or restored in the
// background, and pages the browser loads ahead, aren't visits until someone looks at them.
// The page gets a visit id signed by the server, and reports it ("open") the first time it's visible.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { query } from './db.js';
import { classify, viewerFromRequest } from './viewer.js';
import { notifySlack } from './notify.js';

const NOTIFY_GAP_HOURS = 12;
const key = () => process.env.ADMIN_PASSWORD || '';
export const visitSig = (visit, token) => createHmac('sha256', key()).update(`visit:${token}:${visit}`).digest('base64url');
export function checkVisitSig(visit, token, sig) {
  const want = Buffer.from(visitSig(visit, token)), got = Buffer.from(String(sig || ''));
  return want.length === got.length && timingSafeEqual(want, got);
}

// Records the visit once (repeat reports are ignored). Returns whether it was counted now.
export async function openVisit(req, link, visit) {
  const email = viewerFromRequest(req);
  if (!email) return false;
  const who = classify(email, link.kind === 'client' ? link.client_domains : []);
  const kind = link.kind === 'client' ? who.kind : who.kind === 'lean' ? 'lean' : 'other';
  const ua = String(req.headers['user-agent'] || '').slice(0, 300);
  const country = String(req.headers['x-vercel-ip-country'] || '').slice(0, 2) || null;
  const { rows } = await query(
    `INSERT INTO views (session_id, token, slug, user_agent, country, seconds_visible, viewer_email, viewer_name, viewer_kind)
     VALUES ($1, $2, $3, $4, $5, 0, $6, $7, $8) ON CONFLICT (session_id) DO NOTHING RETURNING id`,
    [visit, link.token, link.slug, ua, country, who.email, who.name, link.kind === 'client' ? kind : null]);
  if (!rows.length) return false;
  // The first-view alert: the client team, at most once every 12 hours
  if (link.kind === 'client' && kind === 'client') {
    const recent = await query(`SELECT 1 FROM views WHERE token = $1 AND id <> $2 AND coalesce(viewer_kind, 'client') = 'client' AND opened_at > now() - make_interval(hours => $3) LIMIT 1`,
      [link.token, rows[0].id, NOTIFY_GAP_HOURS]);
    if (!recent.rows.length) {
      const bp = await query(`SELECT coalesce(name, title, slug) AS name FROM blueprints WHERE slug = $1`, [link.slug]);
      await notifySlack(`${who.name} (${link.label}) opened the ${(bp.rows[0] && bp.rows[0].name) || link.slug} blueprint.`);
    }
  }
  return true;
}
