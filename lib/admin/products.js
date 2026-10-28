// /api/admin/products  (admin)
//   GET  -> the product catalogue (built-ins plus Products page edits), by family
//   POST { action: 'save', id, name, sub, card, effort }            edit a product's wording
//   POST { action: 'add', name, family, method, sub, card }           add a product of your own
//   POST { action: 'parse', filename, data (base64) }                 read a checklist file for review (saves nothing)
//   POST { action: 'guide', id, guide: { title, sub, groups }, filename }   save a reviewed checklist as the product's guide
//   POST { action: 'removeGuide', id } · { action: 'remove', id }    (remove: your own products only)
import { handler, readJson, send, httpError } from '../http.js';
import { requireAdmin } from '../auth.js';
import { query } from '../db.js';
import { productSummaries, FAMILIES, PRODUCTS } from '../products.js';
import { loadCatalog } from '../catalog.js';
import { parseChecklist, MAX_UPLOAD } from '../checklistdoc.js';

const ID_RE = /^[a-z0-9][a-z0-9-]{0,39}$/;
const txt = (v, n) => (typeof v === 'string' ? v.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, n) : '');
const by = (b) => txt(b.by, 80) || null;
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
// A step's HTML from the review screen: text, with <code> and <b> kept
const stepClean = (s) => txt(s, 1200).replace(/<(?!\/?(code|b|strong)>)[^>]*>/gi, '').replace(/&(?!(amp|lt|gt|quot|#39);)/g, '&amp;');

async function upsert(id, fields, who) {
  const cols = Object.keys(fields);
  await query(
    `INSERT INTO product_catalog (id, ${cols.join(', ')}, updated_by) VALUES ($1, ${cols.map((_, i) => '$' + (i + 2)).join(', ')}, $${cols.length + 2})
     ON CONFLICT (id) DO UPDATE SET ${cols.map((c) => `${c} = EXCLUDED.${c}`).join(', ')}, updated_by = EXCLUDED.updated_by, updated_at = now()`,
    [id, ...cols.map((c) => fields[c]), who]);
}

export default handler(['GET', 'POST'], async (req, res) => {
  requireAdmin(req);
  await loadCatalog();
  if (req.method === 'GET') return send(res, 200, { products: productSummaries(), families: FAMILIES, drafting: !!process.env.ANTHROPIC_API_KEY });
  const b = await readJson(req, 4_400_000);
  const known = (id) => PRODUCTS.find((p) => p.id === id);
  if (b.action === 'parse') {
    const buffer = Buffer.from(String(b.data || ''), 'base64');
    if (buffer.length > MAX_UPLOAD) throw httpError(413, 'The file is over 3 MB. Remove images or split it, then try again.');
    try { return send(res, 200, await parseChecklist({ filename: txt(b.filename, 200), buffer })); }
    catch (err) { throw httpError(err.status || 422, err.status ? err.message : 'The file couldn’t be read. Save it again as Word (.docx) or Markdown, or use the template.'); }
  }
  if (b.action === 'add') {
    const name = txt(b.name, 80); if (!name) throw httpError(400, 'Give the product a name.');
    if (!['payments', 'data', 'other'].includes(b.family)) throw httpError(400, 'Choose a family.');
    const method = b.family === 'other' ? 'both' : (['sdk', 'api'].includes(b.method) ? b.method : null);
    if (!method) throw httpError(400, 'Choose SDK or API.');
    let id = slugify(name) || 'product'; if (known(id)) id = `${id}-${Date.now().toString(36).slice(-4)}`;
    await upsert(id, { custom: true, name, family: b.family, method, sub: txt(b.sub, 80) || null, card: txt(b.card, 300) || null, effort: 'TBC' }, by(b));
    return send(res, 201, { id });
  }
  const id = txt(b.id, 40);
  if (!ID_RE.test(id) || !known(id)) throw httpError(404, 'That product isn’t in the catalogue.');
  if (b.action === 'save') {
    const name = txt(b.name, 80); if (!name) throw httpError(400, 'A product needs a name.');
    await upsert(id, { name, sub: txt(b.sub, 80) || null, card: txt(b.card, 300) || null, effort: txt(b.effort, 40) || null }, by(b));
    return send(res, 200, { id });
  }
  if (b.action === 'guide') {
    const g = b.guide || {};
    const groups = (Array.isArray(g.groups) ? g.groups : []).slice(0, 30).map((x) => ({ title: txt(x.title, 120), steps: (Array.isArray(x.steps) ? x.steps : []).map(stepClean).filter(Boolean).slice(0, 200) })).filter((x) => x.steps.length);
    const total = groups.reduce((a, x) => a + x.steps.length, 0);
    if (!total) throw httpError(400, 'The guide needs at least one step.');
    if (total > 200) throw httpError(400, 'A guide can have up to 200 steps.');
    await upsert(id, { guide: JSON.stringify({ title: txt(g.title, 120) || known(id).name, sub: txt(g.sub, 300), groups }), guide_source: JSON.stringify({ filename: txt(b.filename, 200) || null }), guide_at: new Date().toISOString() }, by(b));
    return send(res, 200, { id, steps: total });
  }
  if (b.action === 'removeGuide') {
    await query(`UPDATE product_catalog SET guide = NULL, guide_source = NULL, guide_at = NULL, updated_at = now() WHERE id = $1`, [id]);
    return send(res, 200, { id });
  }
  if (b.action === 'remove') {
    if (!known(id).custom) throw httpError(400, 'Built-in products can’t be removed.');
    const { rows } = await query(`SELECT count(*)::int AS n FROM blueprints WHERE draft::text LIKE '%"' || $1 || '"%'`, [id]);
    if (rows[0].n) throw httpError(409, `${rows[0].n} blueprint${rows[0].n === 1 ? ' uses' : 's use'} this product. Take it out of them first.`);
    await query(`DELETE FROM product_catalog WHERE id = $1 AND custom`, [id]);
    return send(res, 200, { id });
  }
  throw httpError(400, 'Unknown action');
});
