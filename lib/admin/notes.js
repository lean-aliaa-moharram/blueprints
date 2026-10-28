// POST /api/admin/notes  { text } or { filename, data (base64) }  (admin)
// Reads meeting notes or a transcript for products, integration, vertical, pain points, timelines and open
// questions, each with the line it was found in. No AI, and nothing is saved.
import { handler, readJson, send, httpError } from '../http.js';
import { requireAdmin } from '../auth.js';
import { productSummaries } from '../products.js';
import { loadCatalog } from '../catalog.js';
import { listVerticals } from '../verticalsdb.js';
import { readText, MAX_UPLOAD } from '../checklistdoc.js';
import { scanNotes } from '../notes.js';

export default handler(['POST'], async (req, res) => {
  requireAdmin(req);
  const b = await readJson(req, 4_400_000);
  let text = typeof b.text === 'string' ? b.text : '';
  if (b.data) {
    const buffer = Buffer.from(String(b.data), 'base64');
    if (buffer.length > MAX_UPLOAD) throw httpError(413, 'The file is over 3 MB.');
    try { text = (await readText({ filename: String(b.filename || ''), buffer })).text; }
    catch (err) { throw httpError(err.status || 422, err.status ? err.message : 'The file couldn’t be read. Paste the notes instead.'); }
  }
  await loadCatalog();
  try { send(res, 200, scanNotes(text, { products: productSummaries(), verticals: await listVerticals() })); }
  catch (err) { throw httpError(err.status || 400, err.message); }
});
