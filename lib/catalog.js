// Loads the Products page's edits into the product library, before anything is rendered or listed.
import { query } from './db.js';
import { applyCatalog } from './products.js';

export async function loadCatalog() {
  let rows = [];
  try {
    ({ rows } = await query(`SELECT id, custom, name, sub, card, api_note AS "apiNote", effort, family, method, hidden, guide, guide_source, guide_at FROM product_catalog`));
  } catch (err) {
    if (err.code !== '42P01') throw err;   // the table isn't there until the schema is run: use the built-ins
  }
  return applyCatalog(rows);
}
