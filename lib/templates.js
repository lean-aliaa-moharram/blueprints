// The standard starting point for new form-built blueprints: journeys and a three-phase launch plan,
// following the Wise blueprint's structure with Wise-specific content removed. A vertical (see the
// Verticals page) adds its pain points, introduction and use cases. "{client}" becomes the client's name.
export const STANDARD = {
  "client": {
    "name": "",
    "logo": ""
  },
  "header": {
    "mode": "name",
    "logoSize": "medium"
  },
  "theme": {
    "mode": "lean",
    "color": "#3dd68c"
  },
  "meta": {
    "preparedBy": "",
    "market": "UAE",
    "vertical": ""
  },
  "hero": {
    "subtitle": "How {client}'s product experience maps to Lean's account-to-account rails for the UAE market."
  },
  "summary": "{client} can bring its payment experiences to the UAE on Lean's account-to-account rails. This blueprint maps each {client} flow to the Lean product that powers it and lays out the path to go-live.",
  "pain": {
    "intro": "",
    "rows": []
  },
  "journeys": {
    "title": "The customer journeys, end to end",
    "intro": "Each journey maps a {client} flow to the Lean product that powers it.",
    "useCases": [],
    "items": []
  },
  "design": {
    "enabled": false,
    "title": "",
    "subtitle": "",
    "name": "",
    "description": "",
    "fileUrl": "",
    "images": [],
    "flows": []
  },
  "launch": {
    "intro": "How the integration is delivered: the Lean products involved, what ships in each phase, the APIs behind it, and the effort to build.",
    "products": [
      {
        "product": "otp",
        "status": "scope",
        "card": ""
      },
      {
        "product": "rec",
        "status": "scope",
        "card": ""
      },
      {
        "product": "payouts",
        "status": "future",
        "card": ""
      },
      {
        "product": "data",
        "status": "future",
        "card": ""
      },
      {
        "product": "cards",
        "status": "future",
        "card": ""
      }
    ],
    "phases": [
      {
        "label": "Phase 1",
        "title": "Funding journey",
        "bullets": "Account-to-account pay-in (One-Time + Recurring Payments)",
        "unconfirmed": false,
        "chip": "",
        "rows": [
          {
            "product": "otp"
          },
          {
            "product": "rec"
          },
          {
            "product": "cmi"
          }
        ]
      },
      {
        "label": "Phase 2",
        "title": "Verified pay-ins",
        "bullets": "Screen the actual payer: {client}-supplied name and the bank-returned account holder name on every new account connection\nName match at payment initiation: in development at Lean, targeted for Q4",
        "unconfirmed": false,
        "chip": "In development, Q4",
        "rows": [
          {
            "product": "namematch"
          }
        ]
      },
      {
        "label": "Future phases",
        "title": "Payouts, Data and Cards",
        "bullets": "Payouts to UAE bank accounts\nData: account insights for income-based decisions, in discovery\nCards: further payment methods on the same Charge integration; Lean's cards product is in build, KSA first, UAE to follow",
        "unconfirmed": true,
        "chip": "Later scope",
        "rows": [
          {
            "product": "payouts"
          },
          {
            "product": "data"
          },
          {
            "product": "cards"
          }
        ]
      }
    ],
    "note": "",
    "totals": [
      {
        "label": "Phase 1 (One-Time + Recurring Payments)",
        "value": "~1-2 weeks"
      },
      {
        "label": "Phase 2, Verified pay-ins",
        "value": "in development at Lean, targeted for Q4"
      },
      {
        "label": "Future phases (Payouts, Data, Cards)",
        "value": "payouts ~5 eng-days; data and cards to be scoped"
      }
    ],
    "summary": "Committed build today is Phase 1: **~1-2 weeks end to end** including kick-off, testing and go-live. Later phases to be scoped once confirmed."
  }
};

const fillClient = (v, name) => (typeof v === 'string' ? v.replaceAll('{client}', name)
  : Array.isArray(v) ? v.map((x) => fillClient(x, name))
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fillClient(x, name)])) : v);

// The standard template for a client, with a vertical's content dropped in when given.
export function fromTemplate(clientName, vertical) {
  const name = String(clientName || '').trim() || 'the client';
  const c = JSON.parse(JSON.stringify(STANDARD));
  if (vertical) {
    c.meta.vertical = vertical.name || '';
    // The vertical's own journeys, if it has any
    const vj = vertical.journeys;
    if (vj && Array.isArray(vj.items) && vj.items.length) {
      if (vj.title) c.journeys.title = vj.title;
      if (vj.intro) c.journeys.intro = vj.intro;
      c.journeys.items = JSON.parse(JSON.stringify(vj.items)).map((j) => ({ tag: '', title: '', feature: '', need: '', products: [], powers: '', alsoCovers: '', alsoImage: '', images: [], unconfirmed: false, ...j, images: [], alsoImage: '' }));
    }
    c.pain = { intro: vertical.painIntro || '', rows: JSON.parse(JSON.stringify(vertical.painRows || [])) };
    c.journeys.useCases = [...(vertical.useCases || [])];
  }
  const out = fillClient(c, name);
  out.client = { name: String(clientName || '').trim(), logo: '' };
  return out;
}
