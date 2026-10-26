// GET /api/admin/engagement?slug  (admin) -> where the client team spends time on a blueprint, and what they click.
// Client team visits only (never Lean colleagues or other emails), so the picture isn't skewed.
import { handler, send, httpError, getQuery } from '../http.js';
import { requireAdmin } from '../auth.js';
import { query } from '../db.js';
import { SLUG_RE } from '../blueprints.js';

export default handler(['GET'], async (req, res) => {
  requireAdmin(req);
  const { slug } = getQuery(req);
  if (!SLUG_RE.test(String(slug || ''))) throw httpError(400, 'Bad short name');
  const visits = `SELECT v.session_id FROM views v JOIN links l ON l.token = v.token
                   WHERE v.slug = $1 AND l.kind = 'client' AND coalesce(v.viewer_kind, 'client') = 'client'`;
  const [{ rows: tot }, { rows }] = await Promise.all([
    query(`SELECT count(*)::int AS n FROM (${visits}) x`, [slug]),
    query(`SELECT e.kind, e.key, max(e.label) AS label, sum(e.seconds)::int AS seconds, sum(e.count)::int AS count,
                  count(DISTINCT e.session_id) FILTER (WHERE e.seconds >= 3 OR e.kind = 'action')::int AS visits
             FROM engagement e WHERE e.session_id IN (${visits}) GROUP BY e.kind, e.key`, [slug]),
  ]);
  const time = rows.filter((r) => r.kind === 'time').sort((a, b) => b.seconds - a.seconds);
  const actions = rows.filter((r) => r.kind === 'action').sort((a, b) => b.count - a.count);
  send(res, 200, { visits: tot[0].n, time, actions });
});
