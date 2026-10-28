// SDK or API, per product family. Shared by the admin form (browser) and the server.
//   content.launch.methods = { payments: 'api' | 'sdk', data: 'api' | 'sdk' }   (missing: 'api')
// Each product has a family ('payments', 'data', 'other') and a method ('sdk', 'api' or 'both').
export const COUNTERPART = {
  sdk: { otp: 'sip', rec: 'aof', data: 'data-sdk', cmi: null, cards: null },   // API product -> SDK counterpart (null: none)
  api: { sip: 'otp', aof: 'rec', 'data-sdk': 'data' },                        // SDK product -> API counterpart
};
export const methodsOf = (c) => ({ payments: 'api', data: 'api', ...((c && c.launch && c.launch.methods) || {}) });
// Whether a product fits the blueprint's chosen integrations
export function fits(p, methods) {
  if (!p) return false;
  if (!p.method || p.method === 'both' || p.family === 'other' || !methods[p.family]) return true;
  return p.method === methods[p.family];
}
// Switch a family to a method: every product of the other method is swapped for its counterpart, or removed.
export function applyIntegration(c, methods, lib) {
  c.launch = c.launch || {};
  const m = { ...methodsOf(c), ...(methods || {}) };
  c.launch.methods = { payments: m.payments === 'sdk' ? 'sdk' : 'api', data: m.data === 'sdk' ? 'sdk' : 'api' };
  const byId = (id) => lib.find((p) => p.id === id);
  const swap = (id) => {
    const p = byId(id); if (!p || fits(p, c.launch.methods)) return id;
    const to = (COUNTERPART[c.launch.methods[p.family]] || {})[id];
    return to && byId(to) ? to : null;
  };
  const dedupe = (arr, key) => { const seen = new Set(); return arr.filter((x) => { const k = key(x); if (seen.has(k)) return false; seen.add(k); return true; }); };
  for (const ph of c.launch.phases || []) {
    ph.rows = dedupe((ph.rows || []).map((r) => (r.product && r.product !== 'custom' ? { ...r, product: swap(r.product) } : r)).filter((r) => r.product), (r) => (r.product === 'custom' ? Math.random() : r.product));
  }
  if (Array.isArray(c.launch.products)) c.launch.products = dedupe(c.launch.products.map((x) => ({ ...x, product: swap(x.product) })).filter((x) => x.product), (x) => x.product);
  if (c.launch.assign) {
    const next = {};
    for (const [id, a] of Object.entries(c.launch.assign)) { const to = swap(id); if (to && !next[to]) next[to] = a; }
    c.launch.assign = next;
  }
  for (const j of (c.journeys && c.journeys.items) || []) {
    const before = (j.products || []).join(',');
    j.products = [...new Set((j.products || []).map(swap).filter(Boolean))];
    if (j.products.join(',') !== before) j.powers = j.products.length ? 'Powered by ' + j.products.map((id) => `**${byId(id).name}**`).join(' and ') + '.' : '';
  }
  return c;
}

// From the notes review: only the products that were kept are in the plan (new ones go into Phase 1), journeys
// left without products are dropped, and kept pain points go first, with solve and advantage left to fill in.
export function applyPicks(c, picks, lib) {
  const valid = new Set(lib.map((p) => p.id));
  const keep = new Set((Array.isArray(picks && picks.products) ? picks.products : []).filter((id) => valid.has(id)));
  c.launch = c.launch || {};
  c.launch.phases = Array.isArray(c.launch.phases) && c.launch.phases.length ? c.launch.phases : [{ label: 'Phase 1', title: '', bullets: '', rows: [], unconfirmed: false }];
  for (const ph of c.launch.phases) ph.rows = (ph.rows || []).filter((r) => r.product === 'custom' || keep.has(r.product));
  const placed = new Set(c.launch.phases.flatMap((ph) => ph.rows.map((r) => r.product)));
  for (const id of keep) if (!placed.has(id)) c.launch.phases[0].rows.push({ product: id });
  c.launch.phases = c.launch.phases.filter((ph, i) => i === 0 || ph.rows.length);   // no empty phases left behind
  if (Array.isArray(c.launch.products)) {
    c.launch.products = c.launch.products.filter((x) => keep.has(x.product));
    for (const id of keep) if (!c.launch.products.some((x) => x.product === id)) c.launch.products.push({ product: id, status: 'scope', card: '' });
  }
  if (c.launch.assign) for (const id of Object.keys(c.launch.assign)) if (!keep.has(id)) delete c.launch.assign[id];
  if (c.journeys && Array.isArray(c.journeys.items)) {
    c.journeys.items = c.journeys.items.filter((j) => {
      if (!(j.products || []).length) return true;
      j.products = j.products.filter((id) => keep.has(id));
      return j.products.length > 0;
    });
  }
  const pains = (Array.isArray(picks && picks.pains) ? picks.pains : []).map((t) => String(t).trim().slice(0, 400)).filter(Boolean).slice(0, 20);
  if (pains.length) { c.pain = c.pain || { intro: '', rows: [] }; c.pain.rows = [...pains.map((p) => ({ group: 'business', pain: p, solve: '', advantage: '' })), ...(c.pain.rows || [])]; }
  return c;
}
