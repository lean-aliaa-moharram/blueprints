// GET /b/<token>  (rewritten to /api/b?token=<token>)
// Serves the blueprint a link points at, with the checklist and tracking runtime injected.
// Visits are recorded here, by the server, on every page load (every refresh counts), against the person in the
// signed viewer cookie. Without that cookie the page content is hidden until they enter their email, and nothing
// is recorded, so link previews (Slack unfurls, crawlers) never count as visits.
import { randomUUID } from 'node:crypto';
import { handler, getQuery, send } from '../lib/http.js';
import { findActiveLink, loadBlueprint } from '../lib/blueprints.js';
import { checkViewParam } from '../lib/viewsig.js';
import { leanDomains, classify, viewerFromRequest } from '../lib/viewer.js';
import { visitSig } from '../lib/visits.js';

const NOT_FOUND = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title>Link not active</title>
<style>:root{color-scheme:light dark}body{margin:0;min-height:100vh;display:grid;place-items:center;
font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;background:#fafafa;color:#1c2024}
@media (prefers-color-scheme:dark){body{background:#14171a;color:#e7e9ec}}
main{max-width:30rem;padding:2rem}h1{font-size:1.4rem;margin:0 0 .5rem}p{margin:0;opacity:.75}</style></head>
<body><main><h1>This link isn’t active</h1><p>It may have expired or been replaced. Ask your Lean contact to send you a new one.</p></main></body></html>`;

const VIEW_EXPIRED = NOT_FOUND.replace('<title>Link not active</title>', '<title>View expired</title>')
  .replace('This link isn’t active', 'This view has expired')
  .replace('It may have expired or been replaced. Ask your Lean contact to send you a new one.', 'Lean views of a client team’s page last 2 hours. Open it again from the admin page.');

// Until the viewer has entered their email, everything on the page is hidden (the runtime shows the question).
const GATE = `<style id="bp-gate">body>*:not(.bp-who-ov):not(script):not(style){visibility:hidden !important}html,body{overflow:hidden !important;background:#14171a !important}</style>
<noscript><style>#bp-gate{display:none}</style><p style="font:16px system-ui;padding:2rem">Turn on JavaScript to view this blueprint.</p></noscript>`;

export default handler(['GET', 'HEAD'], async (req, res) => {
  const { token, view } = getQuery(req);
  const link = await findActiveLink(token);
  const bp = link && (await loadBlueprint(link.slug));
  if (!bp) return send(res, 404, NOT_FOUND);
  let viewParam = null;
  if (view !== undefined) {
    const check = checkViewParam(link.token, view);
    if (check !== 'ok' || link.kind !== 'client') return send(res, 403, VIEW_EXPIRED);
    viewParam = view;
  }

  // Who's viewing (not asked in Lean's signed view, which is never counted)
  let viewer = null, visit = null, visitSigned = null;
  const email = viewParam ? null : viewerFromRequest(req);
  if (email) {
    const who = classify(email, link.kind === 'client' ? link.client_domains : []);
    viewer = { email: who.email, name: who.name, kind: link.kind === 'client' ? who.kind : who.kind === 'lean' ? 'lean' : 'other' };
    // Counted when the page is first on screen (see lib/visits.js), not now: a tab reloading in the background isn't a visit.
    if (req.method === 'GET') { visit = randomUUID(); visitSigned = visitSig(visit, link.token); }
  }
  const needIdentity = !viewParam && !viewer;

  const config = JSON.stringify({ token: link.token, slug: bp.slug, kind: link.kind, leanDomains: leanDomains(), clientDomains: link.kind === 'client' ? link.client_domains || [] : [],
    uploadMode: process.env.UPLOAD_MODE === 'local' ? 'local' : 'blob', view: viewParam, team: viewParam ? link.label : undefined, viewer, visit, visitSig: visitSigned, needIdentity }).replace(/</g, '\\u003c');
  let html = bp.html.replace(/<\/head>/i, `<meta name="robots" content="noindex, nofollow">\n${needIdentity ? GATE + '\n' : ''}</head>`);
  const runtime = `<script>window.__LEAN_BP=${config};</script>\n<script src="/bp-runtime.js" defer></script>\n`;
  const at = html.toLowerCase().lastIndexOf('</body>');
  html = at === -1 ? html + runtime : html.slice(0, at) + runtime + html.slice(at);
  send(res, 200, html);
});
