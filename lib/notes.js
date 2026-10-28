// Reads meeting notes or a call transcript for what a blueprint needs, without AI. Everything it returns comes
// with the line it was found in, for the person to keep or drop. Nothing is guessed.
const MAX_NOTES = 200_000;
const PER_LIST = 12;

// How products are usually written in notes (lowercase, matched as whole words)
const ALIASES = {
  otp: ['one-time payment', 'one time payment', 'one-time payments', 'one-off payment', 'single payment via api'],
  rec: ['recurring payment', 'recurring payments', 'payment agreement', 'payment agreements', 'direct debit', 'charge on demand'],
  cmi: ['cmi', 'consent management', 'consent management interface', 'manage consents'],
  cards: ['card payments', 'accept cards', 'accepting cards', 'pay by card', 'card acceptance', 'cards product'],   // not "card fees": that's a pain point
  sip: ['sip', 'single instant payment', 'single instant payments'],
  aof: ['aof', 'account on file'],
  data: ['data api', 'data via api', 'data through the api'],
  'data-sdk': ['data sdk', 'data via sdk', 'data through the sdk'],
  payouts: ['payout', 'payouts', 'disbursement', 'disbursements'],
  namematch: ['name match', 'name matching', 'name check'],
  recon: ['reconciliation', 'recon'],
  avs: ['account verification', 'avs', 'iban verification', 'verify the account', 'account validation'],
};
const DATA_WORDS = ['data', 'account information', 'ais', 'transaction history', 'balances', 'income verification', 'salary verification'];
const VERTICAL_WORDS = {
  remittance: ['remittance', 'remittances', 'money transfer', 'exchange house', 'mto', 'cross-border', 'cross border', 'corridor', 'corridors'],
  'trading-gaming': ['trading', 'brokerage', 'broker', 'gaming', 'betting', 'investment app', 'deposits into'],
  lending: ['lending', 'loan', 'loans', 'bnpl', 'credit', 'repayment', 'repayments', 'underwriting'],
  'emerging-industries': ['crypto', 'virtual asset', 'vasp', 'web3'],
};
const PAIN = /\b(pain|problem|issue|challenge|struggl\w*|friction|drop[- ]?offs?|manual(ly)?|slow|expensive|costly|fees?|fraud|fail(s|ed|ure|ing)?|complain\w*|bottleneck|delay(s|ed)?|abandon\w*|chargebacks?)\b/i;
const TIMELINE = /\b(go[- ]?live|launch(ing|es)?|deadline|by (the )?end of|q[1-4]\b|h[12]\b|(next|this) (week|month|quarter)|\d+\s*(weeks?|months?)|sprint|jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|june?|july?|aug(ust)?|sep(tember)?|oct(ober)?|nov(ember)?|dec(ember)?)\b/i;
const QUESTION = /\?\s*$|\b(tbc|tbd|open question|to confirm|need(s)? to confirm|follow[- ]?up|action item|next steps?|to be decided|not sure)\b/i;
const SDK = /\b(link ?sdk|sdk)\b/i;
const API = /\b(api|apis|server[- ]to[- ]server|backend integration|own screens|native (screens|ui|build)|in[- ]house screens)\b/i;

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const word = (w) => new RegExp(`(^|[^a-z0-9])${escRe(w)}([^a-z0-9]|$)`, 'i');

// Notes or a transcript into clean lines: timestamps, cue numbers and speaker labels removed
export function noteLines(text) {
  return String(text || '').slice(0, MAX_NOTES).replace(/\r\n?/g, '\n').split('\n')
    .map((l) => l.replace(/^\s*(WEBVTT.*|NOTE .*|\d+\s*)$/i, '')
      .replace(/\d{1,2}:\d{2}(:\d{2})?([.,]\d{1,3})?\s*-->\s*\d{1,2}:\d{2}(:\d{2})?([.,]\d{1,3})?.*$/, '')
      .replace(/^\s*\[?\(?\d{1,2}:\d{2}(:\d{2})?\)?\]?\s*/, '')
      .replace(/^\s*[A-Z][\w .'-]{0,40}(\s*\([^)]{0,40}\))?\s*:\s+/, '')
      .replace(/^\s*[-*•]\s+/, '').replace(/\s+/g, ' ').trim())
    .filter((l) => l.length > 2);
}

export function scanNotes(text, { products = [], verticals = [] } = {}) {
  const lines = noteLines(text);
  if (!lines.length) { const e = new Error('There’s nothing to read in the notes. Paste them or upload the file again.'); e.status = 400; throw e; }
  const find = (words) => lines.filter((l) => words.some((w) => word(w).test(l)));
  const quotes = (ls) => [...new Set(ls)].slice(0, 2).map((l) => (l.length > 220 ? l.slice(0, 217) + '…' : l));

  // Products: built-in aliases, plus every product's own name (custom products included)
  const found = [];
  for (const p of products) {
    const own = p.name.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim();
    const words = ALIASES[p.id] ? ALIASES[p.id] : [own].filter((w) => w.length > 2);   // custom products: their name
    const hits = find(words);
    if (hits.length) found.push({ id: p.id, name: p.name, family: p.family, method: p.method, evidence: quotes(hits), mentions: hits.length });
  }
  // "Data" on its own: suggest the Data product that fits the integration chosen below
  const dataHits = find(DATA_WORDS).filter((l) => !found.some((f) => f.family === 'data' && f.evidence.includes(l)));

  // SDK or API, per family: named SDK or API products first, then the words used
  const sdkLines = lines.filter((l) => SDK.test(l)), apiLines = lines.filter((l) => API.test(l));
  const method = (family) => {
    const sdkP = found.filter((f) => f.family === family && f.method === 'sdk'), apiP = found.filter((f) => f.family === family && f.method === 'api');
    if (sdkP.length && !apiP.length) return { value: 'sdk', evidence: quotes(sdkP.flatMap((f) => f.evidence)), basis: 'products' };
    if (apiP.length && !sdkP.length) return { value: 'api', evidence: quotes(apiP.flatMap((f) => f.evidence)), basis: 'products' };
    if (sdkLines.length && !apiLines.length) return { value: 'sdk', evidence: quotes(sdkLines), basis: 'words' };
    if (apiLines.length && !sdkLines.length) return { value: 'api', evidence: quotes(apiLines), basis: 'words' };
    if (sdkLines.length || apiLines.length) return { value: null, evidence: quotes([...sdkLines, ...apiLines]), basis: 'both' };
    return { value: null, evidence: [], basis: 'none' };
  };
  const methods = { payments: method('payments'), data: method('data') };
  // Only say how data is integrated if data comes up at all
  if (!found.some((f) => f.family === 'data') && !dataHits.length) methods.data = { value: null, evidence: [], basis: 'none' };
  if (dataHits.length && !found.some((f) => f.family === 'data')) {
    const id = methods.data.value === 'sdk' ? 'data-sdk' : 'data';
    const p = products.find((x) => x.id === id);
    if (p) found.push({ id, name: p.name, family: 'data', method: p.method, evidence: quotes(dataHits), mentions: dataHits.length });
  }

  // Vertical: the one with the most mentions
  const vs = verticals.map((v) => { const hits = find([...(VERTICAL_WORDS[v.id] || []), v.name.toLowerCase()]); return { id: v.id, name: v.name, evidence: quotes(hits), mentions: hits.length }; })
    .filter((v) => v.mentions).sort((a, b) => b.mentions - a.mentions);

  const pick = (re) => [...new Set(lines.filter((l) => re.test(l) && l.length >= 12))].slice(0, PER_LIST);
  return {
    lines: lines.length,
    products: found.sort((a, b) => b.mentions - a.mentions),
    methods,
    vertical: vs[0] || null,
    otherVerticals: vs.slice(1),
    pains: pick(PAIN),
    timeline: pick(TIMELINE),
    questions: pick(QUESTION),
  };
}
