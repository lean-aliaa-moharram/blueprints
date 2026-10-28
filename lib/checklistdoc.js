// Reads an uploaded checklist (Word, PDF, Markdown or text) into a guide: a title, groups and steps.
// No AI: the document's own structure decides. Headings become groups; numbered, bulleted and checkbox lines
// become steps. The result is always shown for review and editing before it's saved.
import { parse } from 'node-html-parser';

export const MAX_UPLOAD = 3_000_000;
const MAX_STEPS = 200;
const MARKER = /^\s*(?:(?:\d{1,3}[.)]|\(\d{1,3}\)|[a-z][.)]|[-–•*▪●◦○■□☐☑✓✔➢>]|\[[ xX]?\])\s+|\d{1,3}[.)](?=[A-Za-z]))/;
const CHECKBOX = /^\s*[☐☑✓✔]|\[[ xX]?\]/;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clean = (s) => String(s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
// Plain text to step HTML: escaped, with `code` kept as code
const stepHtml = (t) => esc(clean(t)).replace(/`([^`]+)`/g, '<code>$1</code>');
const looksLikeHeading = (t) => t.length > 1 && t.length <= 70 && !/[.;:,]$/.test(t) && !MARKER.test(t) && /[A-Za-z]/.test(t)
  && (t === t.toUpperCase() || /^(\d+(\.\d+)*\.?\s+)?[A-Z]/.test(t));

function finish(title, groups, warnings, kind) {
  let gs = groups.map((g) => ({ title: clean(g.title), steps: g.steps.map(clean).filter(Boolean) })).filter((g) => g.steps.length);
  let total = gs.reduce((a, g) => a + g.steps.length, 0);
  if (!total) {
    const err = new Error('No checklist items were found. Use numbered or bulleted lines (or a table in Word), or start from the template.');
    err.status = 422; throw err;
  }
  if (total > MAX_STEPS) {
    warnings.push(`The file has ${total} items; only the first ${MAX_STEPS} are kept.`);
    let left = MAX_STEPS; gs = gs.map((g) => ({ ...g, steps: g.steps.slice(0, Math.max(0, left)) })).map((g) => { left -= g.steps.length; return g; }).filter((g) => g.steps.length);
    total = MAX_STEPS;
  }
  const long = gs.flatMap((g) => g.steps).filter((s) => s.length > 400).length;
  if (long) warnings.push(`${long} item${long === 1 ? ' is' : 's are'} very long: check paragraphs weren’t merged into one step.`);
  if (gs.length === 1 && !gs[0].title) gs[0].title = '';
  return { title: clean(title), groups: gs.map((g) => ({ title: g.title, steps: g.steps.map(stepHtml) })), steps: total, warnings, kind };
}

// Markdown, plain text and PDF text: line by line
function fromLines(text, kind) {
  const lines = String(text).replace(/\r\n?/g, '\n').split('\n');
  let title = '', groups = [{ title: '', steps: [] }], warnings = [], last = null, sawMarker = false;
  const paras = [];
  for (const raw of lines) {
    const line = raw.replace(/\t/g, '    ');
    const t = clean(line);
    if (!t) { last = null; continue; }
    if (/^\s*page \d+( of \d+)?\s*$/i.test(t)) continue;                       // PDF page numbers
    const md = t.match(/^(#{1,6})\s+(.*)$/);
    if (md) {
      if (md[1].length === 1 && !title) { title = md[2]; continue; }
      groups.push({ title: md[2].replace(/[*_`]/g, ''), steps: [] }); last = null; continue;
    }
    if (MARKER.test(line) || CHECKBOX.test(line)) {
      sawMarker = true;
      const indent = (line.match(/^\s*/) || [''])[0].length;
      const body = t.replace(MARKER, '').replace(/^\[[ xX]?\]\s*/, '').replace(/^[☐☑✓✔]\s*/, '').replace(/\*\*/g, '');
      const g = groups[groups.length - 1];
      if (indent >= 2 && last !== null && g.steps.length) { g.steps[g.steps.length - 1] += '; ' + body; continue; }   // a sub-bullet stays with its step
      g.steps.push(body); last = g.steps.length - 1; continue;
    }
    if (last !== null && !looksLikeHeading(t)) { const g = groups[groups.length - 1]; g.steps[last] += ' ' + t.replace(/\*\*/g, ''); continue; }  // a wrapped line
    if (looksLikeHeading(t)) {
      if (!title && !groups.some((g) => g.steps.length) && groups.length === 1) { title = t; continue; }
      groups.push({ title: t.replace(/^\d+(\.\d+)*\.?\s+/, ''), steps: [] }); last = null; continue;
    }
    paras.push({ g: groups.length - 1, t });
  }
  if (!sawMarker) {
    // No list markers at all: read blank-line separated blocks. A block's first line heads it; its other lines are steps.
    const blocks = String(text).replace(/\r\n?/g, '\n').split(/\n\s*\n/).map((b) => b.split('\n').map(clean).filter(Boolean)).filter((b) => b.length);
    if (!blocks.length) return finish(title, groups, warnings, kind);
    title = '';
    const gs = blocks.map((b) => (b.length > 1 ? { title: b[0], steps: b.slice(1) } : { title: '', steps: b }));
    warnings.push('No numbered or bulleted lines were found, so each block’s first line became a group and its other lines steps. Check them before saving.');
    return finish(title, gs, warnings, kind);
  } else if (paras.length) {
    warnings.push(`${paras.length} line${paras.length === 1 ? '' : 's'} outside a list ${paras.length === 1 ? 'was' : 'were'} left out, such as introductions.`);
  }
  return finish(title, groups, warnings, kind);
}

// Word: headings and lists come through as HTML
function fromWordHtml(html) {
  const root = parse(`<div>${html}</div>`).firstChild;
  let title = '', groups = [{ title: '', steps: [] }];
  const warnings = [], paras = [];
  let sawList = false;
  const liText = (li) => {
    const own = li.childNodes.filter((n) => !(n.tagName && /^(UL|OL)$/i.test(n.tagName))).map((n) => n.textContent || n.text || '').join(' ');
    const subs = li.querySelectorAll(':scope > ul > li, :scope > ol > li').map(liText);
    return clean(own) + (subs.length ? '; ' + subs.join('; ') : '');
  };
  for (const el of root.childNodes) {
    if (!el.tagName) continue;
    const tag = el.tagName.toUpperCase(), t = clean(el.text);
    if (/^H[1-6]$/.test(tag)) {
      if (el.classList && el.classList.contains('doctitle')) { if (!title) title = t; continue; }
      if (tag === 'H1' && !title && !groups.some((g) => g.steps.length) && !root.querySelector('h1.doctitle')) { title = t; continue; }
      if (t) groups.push({ title: t, steps: [] });
      continue;
    }
    if (tag === 'UL' || tag === 'OL') { sawList = true; for (const li of el.querySelectorAll(':scope > li')) groups[groups.length - 1].steps.push(liText(li)); continue; }
    if (tag === 'TABLE') {
      const rows = el.querySelectorAll('tr').map((tr) => tr.querySelectorAll('td,th').map((c) => clean(c.text)));
      if (!rows.length) continue;
      sawList = true;
      const headerRow = rows.length > 1 && (el.querySelectorAll('tr')[0].querySelectorAll('th').length || rows[0].every((c) => c.length <= 20 && !/[.?!]$/.test(c)) && rows.slice(1).some((r) => r.some((c) => c.length > 20)));
      const body = headerRow ? rows.slice(1) : rows;
      const width = Math.max(...body.map((r) => r.length));
      let best = 0, bestLen = -1;
      for (let c = 0; c < width; c++) { const len = body.reduce((a, r) => a + (r[c] || '').length, 0); if (len > bestLen) { best = c; bestLen = len; } }
      for (const r of body) if (r[best]) groups[groups.length - 1].steps.push(r[best]);
      if (width > 1) warnings.push('A table was read using its column with the most text; the other columns were left out.');
      continue;
    }
    if (tag === 'P' && t) {
      if (CHECKBOX.test(t) || MARKER.test(t)) { sawList = true; groups[groups.length - 1].steps.push(t.replace(MARKER, '').replace(/^[☐☑✓✔]\s*/, '')); continue; }
      const strong = el.querySelector('strong');
      if (strong && clean(strong.text) === t && t.length <= 70) { if (!title && !groups.some((g) => g.steps.length) && groups.length === 1) title = t; else groups.push({ title: t, steps: [] }); continue; }
      paras.push({ g: groups.length - 1, t });
    }
  }
  if (!sawList) { for (const p of paras) groups[p.g].steps.push(p.t); if (paras.length) warnings.push('No lists were found, so each paragraph became a step. Check them before saving.'); }
  else if (paras.length) warnings.push(`${paras.length} paragraph${paras.length === 1 ? '' : 's'} outside a list ${paras.length === 1 ? 'was' : 'were'} left out, such as introductions.`);
  return finish(title, groups, warnings, 'word');
}

// Plain text from any supported file (also used for meeting notes)
export async function readText({ filename, buffer }) {
  const ext = String(filename || '').toLowerCase().split('.').pop();
  if (ext === 'docx') {
    const mammoth = (await import('mammoth')).default;
    return { kind: 'word', text: (await mammoth.extractRawText({ buffer })).value };
  }
  if (ext === 'pdf') {
    const pdf = (await import('pdf-parse/lib/pdf-parse.js')).default;
    return { kind: 'pdf', text: (await pdf(buffer)).text };
  }
  if (['txt', 'md', 'markdown', 'vtt', 'srt'].includes(ext)) return { kind: ext === 'md' || ext === 'markdown' ? 'markdown' : 'text', text: buffer.toString('utf8') };
  const err = new Error('Upload a Word (.docx), PDF, Markdown (.md) or text (.txt) file.'); err.status = 415; throw err;
}

export async function parseChecklist({ filename, buffer }) {
  if (!buffer || !buffer.length) { const e = new Error('The file is empty.'); e.status = 400; throw e; }
  if (buffer.length > MAX_UPLOAD) { const e = new Error('The file is over 3 MB. Remove images or split it, then try again.'); e.status = 413; throw e; }
  const ext = String(filename || '').toLowerCase().split('.').pop();
  if (ext === 'docx') {
    const mammoth = (await import('mammoth')).default;
    const { value } = await mammoth.convertToHtml({ buffer }, { styleMap: ["p[style-name='Title'] => h1.doctitle:fresh", "p[style-name='Subtitle'] => p:fresh"] });
    return fromWordHtml(value);
  }
  const { kind, text } = await readText({ filename, buffer });
  const out = fromLines(text, kind);
  if (kind === 'pdf') out.warnings.unshift('PDFs don’t keep their structure reliably: check the groups and steps below.');
  return out;
}
