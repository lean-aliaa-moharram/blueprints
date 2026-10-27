// Checklist state belongs to a client team (one link = one team).
// GET  /api/checklist?token=...
//   client team link -> { mode: "edit", team, items: { <item>: { done, at } } }
//   Lean team link   -> { mode: "view", teams: [ { name, items } ] }   (every client team on the blueprint)
// POST /api/checklist  { token, item, done }   client team links only
import { handler, getQuery, readJson, send, httpError } from '../lib/http.js';
import { query } from '../lib/db.js';
import { findActiveLink, loadMeta, ITEM_RE } from '../lib/blueprints.js';
import { checkViewParam } from '../lib/viewsig.js';
import { classify, viewerEmail, nameFromEmail } from '../lib/viewer.js';

// A team's path to production: when they asked, and when Lean switched them to production.
const production = (l) => ({ requestedAt: l.production_requested_at || null, note: l.production_request_note || null,
  grantedAt: l.environment === 'production' ? (l.environment_changed_at || null) : null });
const tail = (t) => (t && t.length > 4 ? '•••• ' + t.slice(-4) : t || '');
// What was sent with the request, masked, so the page can show it back.
async function withSummary(p, token) {
  if (!p.requestedAt) return p;
  const { rows } = await query('SELECT video_name, video_bytes, video_na_reason, account_holder_name, iban, account_number FROM production_requests WHERE token = $1 ORDER BY created_at DESC LIMIT 1', [token]);
  if (!rows.length) return p;
  const r = rows[0];
  return { ...p, summary: { video: r.video_name ? { name: r.video_name, bytes: Number(r.video_bytes) || 0 } : null, videoNaReason: r.video_na_reason,
    accountHolderName: r.account_holder_name, iban: tail(r.iban), accountNumber: tail(r.account_number) } };
}

// The Sandbox app token, as the page sees it: whether it's shared, when, by whom, and its last 4 characters.
// The token for the team's current environment: the production one once Lean switches them to Production.
const appToken = (l) => {
  const env = l.environment === 'production' ? 'production' : 'sandbox';
  const v = l[`${env}_app_token`], at = l[`${env}_app_token_at`], by = l[`${env}_app_token_by`];
  return v ? { env, shared: true, at, by: by ? nameFromEmail(by) : null, ending: String(v).slice(-4) } : { env, shared: false };
};
const APP_TOKEN_RE = /^[A-Za-z0-9][A-Za-z0-9._:-]{7,199}$/;

async function itemsFor(token, allowed) {
  const { rows } = await query('SELECT item, done, updated_at FROM team_checklist WHERE token = $1', [token]);
  const items = {};
  for (const r of rows) if (allowed.includes(r.item)) items[r.item] = { done: r.done, at: r.updated_at };
  return items;
}

export default handler(['GET', 'POST'], async (req, res) => {
  const input = req.method === 'GET' ? getQuery(req) : await readJson(req);
  const link = await findActiveLink(input.token);
  if (!link) throw httpError(404, 'Link not active');
  const bp = await loadMeta(link.slug);
  if (!bp) throw httpError(404, 'Blueprint not found');

  if (input.view !== undefined) {
    if (req.method !== 'GET') throw httpError(403, 'Lean views are read only.');
    if (link.kind !== 'client' || checkViewParam(link.token, input.view) !== 'ok') throw httpError(403, 'This view has expired. Open it again from the admin page.');
    return send(res, 200, { mode: 'view', teams: [{ name: link.label, environment: link.environment, production: await withSummary(production(link), link.token), appToken: appToken(link), items: await itemsFor(link.token, bp.items) }] });
  }

  if (req.method === 'GET') {
    if (link.kind === 'client') return send(res, 200, { mode: 'edit', team: link.label, environment: link.environment, production: await withSummary(production(link), link.token), appToken: appToken(link), items: await itemsFor(link.token, bp.items) });
    const { rows } = await query(
      `SELECT token, label, environment, environment_changed_at, production_requested_at, production_request_note, sandbox_app_token, sandbox_app_token_at, sandbox_app_token_by, production_app_token, production_app_token_at, production_app_token_by FROM links WHERE slug = $1 AND kind = 'client' AND revoked_at IS NULL ORDER BY created_at`,
      [link.slug],
    );
    const teams = [];
    for (const t of rows) teams.push({ name: t.label, environment: t.environment, production: await withSummary(production(t), t.token), appToken: appToken(t), items: await itemsFor(t.token, bp.items) });
    return send(res, 200, { mode: 'view', teams });
  }

  if (link.kind !== 'client') throw httpError(403, 'Lean team links can view checklist progress but not change it.');
  if (input.appToken !== undefined) { // the client team shares its Sandbox app token
    const sharer = classify(viewerEmail(req, input), link.client_domains);
    if (sharer.kind !== 'client') throw httpError(403, sharer.kind === 'lean' ? 'Lean team members can’t share the app token for the client.' : 'Only the client team can share the app token. Check the email you entered (Not you?).');
    const value = typeof input.appToken === 'string' ? input.appToken.trim() : '';
    if (!APP_TOKEN_RE.test(value)) throw httpError(400, 'That doesn’t look like an app token. Copy the application ID from the dev portal: letters, digits and dashes, with no spaces.');
    // Clients share only the Sandbox token: the production one is added by Lean in the admin page.
    if (link.environment === 'production') throw httpError(403, 'Lean adds the production app token for you.');
    const env = 'sandbox';
    const { rows } = await query(
      `UPDATE links SET ${env}_app_token = $2, ${env}_app_token_at = now(), ${env}_app_token_by = $3 WHERE token = $1
       RETURNING environment, sandbox_app_token, sandbox_app_token_at, sandbox_app_token_by, production_app_token, production_app_token_at, production_app_token_by`, [link.token, value, sharer.email]);
    return send(res, 200, { appToken: appToken(rows[0]) });
  }
  if (typeof input.item !== 'string' || !ITEM_RE.test(input.item) || !bp.items.includes(input.item)) {
    throw httpError(400, 'Unknown checklist item');
  }
  if (typeof input.done !== 'boolean') throw httpError(400, '"done" must be true or false');
  // Only someone on the client team (an email on this link's client domains) can tick.
  const who = classify(viewerEmail(req, input), link.client_domains);
  if (who.kind !== 'client') throw httpError(403, who.kind === 'lean' ? 'Lean team members can view progress but not change it.' : 'Only the client team can tick steps. Check the email you entered (Not you?).');
  const { rows } = await query(
    `INSERT INTO team_checklist (token, item, done, updated_at, updated_by) VALUES ($1, $2, $3, now(), $4)
     ON CONFLICT (token, item) DO UPDATE SET done = EXCLUDED.done, updated_at = now(), updated_by = EXCLUDED.updated_by
     RETURNING item, done, updated_at`,
    [link.token, input.item, input.done, who.email],
  );
  send(res, 200, { item: rows[0].item, done: rows[0].done, at: rows[0].updated_at });
});
