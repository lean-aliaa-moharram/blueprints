// The Lean product library. Every blueprint built in the admin page picks from this list.
// Edit here when Lean's products or docs change; new and republished blueprints pick it up.
//
// Fields: name, sub (short label under the name), card (product card text), apis (endpoint
// chips), apiNote (text under the endpoints; "{client}" becomes the client's name), effort
// (default, editable per blueprint), panel (guide panel id, or null), linkFromDesign
// (label for a link to the blueprint's Figma file), toBeScoped (shows a "To be scoped" chip),
// showCard (whether it gets a product card by default).
//
// Panel checklist items get stable keys (<panel>-1, <panel>-2, ...), which is what saved
// ticks are tied to. Add new steps at the end of a list so existing ticks stay in place.

export const PRODUCTS = [
  {
    "id": "otp",
    "name": "One-Time Payments",
    "sub": "a Charge per payment",
    "card": "A single Pay by Bank payment, represented by a Charge, collected directly from the customer's bank account.",
    "apis": [
      "POST /v4/payment-charges",
      "GET /v4/payment-charges/{id}",
      "Hosted authentication (redirect)"
    ],
    "apiNote": "",
    "effort": "~1 week",
    "panel": "otp",
    "showCard": true,
    "family": "payments",
    "method": "api"
  },
  {
    "id": "rec",
    "name": "Recurring Payments",
    "sub": "Payment Agreement",
    "card": "A Payment Agreement gives reusable permission to charge: on demand, on a schedule, or in instalments.",
    "apis": [
      "POST /v4/payment-agreements",
      "POST /v4/payment-agreements/{id}/payment-charges",
      "POST /v4/payment-agreements/{id}/revocations"
    ],
    "apiNote": "",
    "effort": "~1 week",
    "panel": "rec",
    "showCard": true,
    "family": "payments",
    "method": "api"
  },
  {
    "id": "cmi",
    "name": "Consent Management Interface",
    "sub": "CMI, required before go-live",
    "card": "Lets users see their Open Finance payment history and Payment Agreements, and revoke an agreement at any time. Required by the Open Finance framework before go-live.",
    "apis": [
      "GET /v4/payment-agreements/{agreement_id}",
      "GET /v4/payment-agreements/{agreement_id}/payment-charges",
      "POST /v4/payment-agreements/{agreement_id}/revocations"
    ],
    "apiNote": "{client} builds Lean’s CMI natively from the Figma screens and Lean’s requirements. Lean signs it off at three gates before Pay by Bank goes live in production.",
    "effort": "~1-2 weeks",
    "panel": "cmi",
    "linkFromDesign": "CMI screens (Figma)",
    "showCard": false,
    "family": "payments",
    "method": "api"
  },
  {
    "id": "cards",
    "name": "Cards",
    "sub": "same integration",
    "card": "Cards and further payment methods as values on the same Charge integration, with no re-integration.",
    "apis": [
      "payment_method"
    ],
    "apiNote": "",
    "effort": "TBC",
    "panel": null,
    "showCard": true,
    "family": "payments",
    "method": "api"
  },
  {
    "id": "sip",
    "name": "Single Instant Payments (SIP)",
    "sub": "through the Link SDK",
    "card": "A single Pay by Bank payment through Lean’s Link SDK, with Lean’s screens for choosing a bank and authenticating.",
    "apis": [],
    "apiNote": "",
    "toBeScoped": true,
    "effort": "TBC",
    "panel": null,
    "showCard": true,
    "family": "payments",
    "method": "sdk"
  },
  {
    "id": "aof",
    "name": "Account on File (AoF)",
    "sub": "through the Link SDK",
    "card": "The customer connects their bank account once through Lean’s Link SDK, for later payments from it.",
    "apis": [],
    "apiNote": "",
    "toBeScoped": true,
    "effort": "TBC",
    "panel": null,
    "showCard": true,
    "family": "payments",
    "method": "sdk"
  },
  {
    "id": "data",
    "name": "Data (API)",
    "sub": "account information",
    "card": "Account insights for income-based decisions, such as salary verification for lending and credit limit increases.",
    "apis": [],
    "apiNote": "",
    "toBeScoped": true,
    "effort": "TBC",
    "panel": null,
    "showCard": true,
    "family": "data",
    "method": "api"
  },
  {
    "id": "data-sdk",
    "name": "Data (SDK)",
    "sub": "through the Link SDK",
    "card": "Account information through Lean’s Link SDK, with Lean’s screens for connecting and consenting.",
    "apis": [],
    "apiNote": "",
    "toBeScoped": true,
    "effort": "TBC",
    "panel": null,
    "showCard": true,
    "family": "data",
    "method": "sdk"
  },
  {
    "id": "payouts",
    "name": "Payouts",
    "sub": "server-to-server",
    "card": "Outbound transfers to UAE bank accounts, initiated server-side.",
    "apis": [
      "POST /payouts/v1/payment/destinations",
      "POST /payouts/v1/payment"
    ],
    "apiNote": "",
    "effort": "~5 eng-days",
    "panel": "pay",
    "showCard": true,
    "family": "other",
    "method": "both"
  },
  {
    "id": "namematch",
    "name": "Name match at initiation",
    "sub": "Lean-side match",
    "card": "Lean matches the bank-returned account holder name against the customer name at payment initiation and rejects mismatches before money moves.",
    "apis": [
      "customer.name",
      "instrument.details.holder_name"
    ],
    "apiNote": "In development at Lean, targeted for Q4. Once live, Lean matches the bank-returned account holder name against the customer name on its side, enabled as a trait with no customer action, and rejects mismatches before money moves. Whether the name is also returned on webhooks is being confirmed. Pass the customer’s name in the <code>customer</code> object from the start, so nothing needs to change when this goes live.",
    "effort": "Lean build, Q4",
    "panel": null,
    "showCard": false,
    "family": "other",
    "method": "both"
  },
  {
    "id": "recon",
    "name": "Reconciliation",
    "sub": "matching payments",
    "card": "Matching Lean payments and settlements against your own records.",
    "apis": [],
    "apiNote": "",
    "toBeScoped": true,
    "effort": "TBC",
    "panel": null,
    "showCard": true,
    "family": "other",
    "method": "both"
  },
  {
    "id": "avs",
    "name": "Account Verification (AVS)",
    "sub": "before money moves",
    "card": "Checking a bank account before money is sent to it or taken from it.",
    "apis": [],
    "apiNote": "",
    "toBeScoped": true,
    "effort": "TBC",
    "panel": null,
    "showCard": true,
    "family": "other",
    "method": "both"
  }
];

export const PANELS = {
  "dev": {
    "title": "Developer portal setup",
    "sub": "Set up your application on the Lean dev portal in Sandbox: app token, Open Finance, client secret, redirect URLs, webhooks and a test user. Production comes once Lean upgrades you.",
    "pre": [],
    "steps": [
      "Create an account on the <a href=\"https://dev.leantech.me/\" target=\"_blank\" rel=\"noopener\">Lean dev portal</a>.",
      "Create your application. The portal starts in <b>Sandbox</b> mode: do every step below in Sandbox until Lean upgrades you to production.",
      "Copy the application ID the portal generates: your sandbox [[apptoken|app token]]. Share it with Lean in the box after these Sandbox steps.",
      "Ask Lean Support to enable Open Finance on your application.",
      "In <b>Development</b>, <b>Integration settings</b>, generate your client secret and store it on your backend. Retrieving it again invalidates the existing one.",
      "In <b>Settings</b>, add your redirect URLs. The host is enough, for example <code>https://app.yourcompany.com</code>: Lean only sends customers back to URLs set up here.",
      "In <b>Settings</b>, add the purpose statement and the benefit statement customers see when they authorise a payment, in English and Arabic.",
      "In <b>Development</b>, <b>Webhooks</b>, add a [[webhook|webhook]] with the HTTPS endpoint where your backend receives events, for example <code>https://api.yourcompany.com/webhooks/lean</code>.",
      "Select these webhook events, then save. In the event list they’re under <b>Other</b>.<div class=\"evgroups\"><details class=\"evgroup\"><summary><span class=\"evt\">Charge events</span><span class=\"evs\">One-Time and Recurring Payments</span><span class=\"evn\">5</span></summary><div class=\"evlist\"><div class=\"ev\"><code>charge.created</code><span>A new Charge is created.</span></div><div class=\"ev\"><code>charge.authorized</code><span>The Charge is authorized.</span></div><div class=\"ev\"><code>charge.captured</code><span>The Charge is captured.</span></div><div class=\"ev\"><code>charge.declined</code><span>The payment was declined.</span></div><div class=\"ev\"><code>charge.discarded</code><span>Authentication wasn’t completed in time.</span></div></div></details><details class=\"evgroup\"><summary><span class=\"evt\">Agreement events</span><span class=\"evs\">Recurring Payments</span><span class=\"evn\">7</span></summary><div class=\"evlist\"><div class=\"ev\"><code>agreement.activated</code><span>The Agreement is active and ready to be used.</span></div><div class=\"ev\"><code>agreement.suspended</code><span>The Agreement is paused.</span></div><div class=\"ev\"><code>agreement.resumed</code><span>The Agreement is ACTIVE again.</span></div><div class=\"ev\"><code>agreement.declined</code><span>The Agreement was rejected.</span></div><div class=\"ev\"><code>agreement.discarded</code><span>The customer didn’t complete authentication.</span></div><div class=\"ev\"><code>agreement.fulfilled</code><span>The Agreement reached its completion conditions.</span></div><div class=\"ev\"><code>agreement.revoked</code><span>The Agreement is permanently withdrawn.</span></div></div></details><details class=\"evgroup\"><summary><span class=\"evt\">Instrument events</span><span class=\"evs\">the bank accounts customers pay from</span><span class=\"evn\">2</span></summary><div class=\"evlist\"><div class=\"ev\"><code>instrument.created</code><span>A new Payment Instrument is created.</span></div><div class=\"ev\"><code>instrument.updated</code><span>An instrument’s stored details change.</span></div></div></details></div>",
      "In <b>Development</b>, <b>Integration settings</b>, copy your webhook [[signing|signing secret]]. It’s separate from your client secret: your backend uses it to verify every webhook (see Webhooks).",
      "In <b>Development</b>, open the test-user management section and create a Sandbox test user: set its details and the scenarios you need, then save. You’ll use its details to authenticate in Sandbox. Test users are separate from the Lean Customers your API calls create."
    ],
    "prodTitle": "Production",
    "prodNote": "Once Lean upgrades you to production. These steps aren’t counted in Phase 0 progress.",
    "prodSteps": [
      "Switch the dev portal to production mode.",
      "Copy the newly generated <b>production</b> application ID ([[apptoken|app token]]).",
      "In <b>Integration settings</b>, generate your <b>production</b> client secret. Sandbox and production credentials are separate, so your sandbox secret won’t work in production.",
      "Set up production webhooks: the production endpoint, its signing secret and the same events (see the Webhooks guide).",
      "Start calling production endpoints with the production credentials."
    ],
    "endpoints": [],
    "links": [
      {
        "url": "https://dev.leantech.me/",
        "label": "Lean dev portal"
      },
      {
        "url": "https://docs.leantech.me/docs/configuring-your-application",
        "label": "Configuring your application"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/sandbox-testing",
        "label": "Testing your integration"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/webhooks-1",
        "label": "Set up webhooks"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/payment-webhooks",
        "label": "Payment webhooks"
      }
    ],
    "extraTitle": "Also in the dev portal",
    "extra": [
      "Your customers.",
      "All payments made by your customers.",
      "Your consumption and billing details."
    ],
    "diagrams": [
      {
        "title": "Sandbox to production",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 414\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lb{font:700 11.5px Arial,Helvetica,sans-serif;fill:#1c2024}.ms{font:500 10.5px Arial,Helvetica,sans-serif;fill:#1c2024}.mm{font:italic 500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><line x1=\"80.0\" y1=\"36\" x2=\"80.0\" y2=\"404\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"5.0\" y=\"6\" width=\"150\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"80.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">{client} team</text><line x1=\"280.0\" y1=\"36\" x2=\"280.0\" y2=\"404\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"215.0\" y=\"6\" width=\"130\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean dev portal</text><line x1=\"480.0\" y1=\"36\" x2=\"480.0\" y2=\"404\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"432.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"480.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean</text><line x1=\"80.0\" y1=\"64\" x2=\"274.0\" y2=\"64\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 60 L280.0 64 L272.0 68 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"58\" text-anchor=\"middle\" class=\"ms\">Create an account and an application</text><line x1=\"280.0\" y1=\"98\" x2=\"86.0\" y2=\"98\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 94 L80.0 98 L88.0 102 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"92\" text-anchor=\"middle\" class=\"ms\">Sandbox application ID (app token)</text><line x1=\"80.0\" y1=\"132\" x2=\"474.0\" y2=\"132\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 128 L480.0 132 L472.0 136 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"126\" text-anchor=\"middle\" class=\"ms\">Share the sandbox app token</text><line x1=\"80.0\" y1=\"166\" x2=\"474.0\" y2=\"166\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 162 L480.0 166 L472.0 170 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"160\" text-anchor=\"middle\" class=\"ms\">Ask Lean Support to enable Open Finance</text><line x1=\"80.0\" y1=\"200\" x2=\"274.0\" y2=\"200\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 196 L280.0 200 L272.0 204 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"194\" text-anchor=\"middle\" class=\"ms\">Client secret, redirect URLs, statements</text><line x1=\"80.0\" y1=\"234\" x2=\"274.0\" y2=\"234\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 230 L280.0 234 L272.0 238 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"228\" text-anchor=\"middle\" class=\"ms\">Webhook endpoint, events, signing secret</text><line x1=\"80.0\" y1=\"268\" x2=\"274.0\" y2=\"268\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 264 L280.0 268 L272.0 272 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"262\" text-anchor=\"middle\" class=\"ms\">Create a Sandbox test user</text><line x1=\"480.0\" y1=\"302\" x2=\"286.0\" y2=\"302\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M288.0 298 L280.0 302 L288.0 306 Z\" fill=\"#6b7280\"/><text x=\"380.0\" y=\"296\" text-anchor=\"middle\" class=\"ms\">Upgrade the application to production</text><line x1=\"80.0\" y1=\"336\" x2=\"274.0\" y2=\"336\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 332 L280.0 336 L272.0 340 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"330\" text-anchor=\"middle\" class=\"ms\">Switch to production mode</text><line x1=\"280.0\" y1=\"370\" x2=\"86.0\" y2=\"370\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 366 L80.0 370 L88.0 374 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"364\" text-anchor=\"middle\" class=\"ms\">Production application ID (app token)</text></svg>"
      }
    ]
  },
  "start": {
    "title": "Authentication and Settlement Account Setup",
    "sub": "Get an access token for every API call, then make your first one: creating your Settlement Account.",
    "pre": [
      "Your app token and client secret from Developer portal setup.",
      "Your business details: trade licence number, registered address, and the bank account that receives your funds."
    ],
    "steps": [
      "Configure your backend with the Sandbox addresses: the API at <code>https://sandbox.leantech.me</code> and the token endpoint on <code>auth.sandbox.leantech.me</code>. You’ll switch both when Lean upgrades you to production.",
      "Generate an access token from your backend with <code>POST /oauth2/token</code> on <code>auth.sandbox.leantech.me</code>: your app token as <code>client_id</code>, your client secret, <code>grant_type</code> <code>client_credentials</code> and scope <code>api</code> for backend calls (<code>customer.&lt;customer_id&gt;</code> for customer-scoped calls).",
      "Send the token on every API call as <code>Authorization: Bearer &lt;token&gt;</code>.",
      "Create your [[settlement|Settlement Account]]: <code>POST /payments/v1/destinations</code> with your business and bank details, and no <code>customer_id</code>, so the account belongs to your application. The fields are in the reference below; don’t use special characters in any of them, as banks may reject the details. Store the <code>id</code> Lean returns in your backend configuration as <code>settlement_account_id</code>."
    ],
    "endpoints": [
      "POST /oauth2/token",
      "POST /payments/v1/destinations"
    ],
    "links": [
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/introduction",
        "label": "Intro to Lean"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/authentication",
        "label": "Authentication"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/reference/postoauth2token",
        "label": "Generate Access Token (API reference)"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/getting-started-with-payments",
        "label": "Payments overview"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/sandbox-testing",
        "label": "Testing your integration"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/errors-and-troubleshooting",
        "label": "Errors and troubleshooting"
      },
      {
        "url": "https://docs.leantech.me/reference/createpaymentdestination",
        "label": "Create Payment Destination (API reference)"
      },
      {
        "url": "https://docs.leantech.me/docs/migrating-to-open-finance-based-payments",
        "label": "Open Finance enablement (destination fields)"
      }
    ],
    "diagrams": [
      {
        "title": "Getting an access token",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 278\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lb{font:700 11.5px Arial,Helvetica,sans-serif;fill:#1c2024}.ms{font:500 10.5px Arial,Helvetica,sans-serif;fill:#1c2024}.mm{font:italic 500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><line x1=\"80.0\" y1=\"36\" x2=\"80.0\" y2=\"268\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"5.0\" y=\"6\" width=\"150\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"80.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">{client} backend</text><line x1=\"280.0\" y1=\"36\" x2=\"280.0\" y2=\"268\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"232.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean auth</text><line x1=\"480.0\" y1=\"36\" x2=\"480.0\" y2=\"268\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"432.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"480.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean API</text><line x1=\"80.0\" y1=\"64\" x2=\"274.0\" y2=\"64\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 60 L280.0 64 L272.0 68 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"58\" text-anchor=\"middle\" class=\"ms\">POST /oauth2/token  (client_id, client_secret, scope)</text><line x1=\"280.0\" y1=\"98\" x2=\"86.0\" y2=\"98\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 94 L80.0 98 L88.0 102 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"92\" text-anchor=\"middle\" class=\"ms\">Access token</text><line x1=\"80.0\" y1=\"132\" x2=\"474.0\" y2=\"132\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 128 L480.0 132 L472.0 136 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"126\" text-anchor=\"middle\" class=\"ms\">API call  (Authorization: Bearer &lt;token&gt;)</text><line x1=\"480.0\" y1=\"166\" x2=\"86.0\" y2=\"166\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 162 L80.0 166 L88.0 170 Z\" style=\"fill:var(--bright)\"/><text x=\"280.0\" y=\"160\" text-anchor=\"middle\" class=\"ms\">Response</text><line x1=\"80.0\" y1=\"200\" x2=\"474.0\" y2=\"200\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 196 L480.0 200 L472.0 204 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"194\" text-anchor=\"middle\" class=\"ms\">POST /payments/v1/destinations  (no customer_id)</text><line x1=\"480.0\" y1=\"234\" x2=\"86.0\" y2=\"234\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 230 L80.0 234 L88.0 238 Z\" style=\"fill:var(--bright)\"/><text x=\"280.0\" y=\"228\" text-anchor=\"middle\" class=\"ms\">Destination id: your settlement_account_id</text></svg>"
      }
    ],
    "prodTitle": "Production",
    "prodNote": "Once Lean upgrades you to production. These steps aren’t counted in Phase 0 progress.",
    "prodSteps": [
      "Create your production Settlement Account with the same call on <code>https://api.leantech.me</code>, and use its <code>id</code> as <code>settlement_account_id</code> in production."
    ],
    "extra": [],
    "sections": [
      {
        "title": "Reference: Settlement Account request",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Field</th><th>What to send</th></tr></thead><tbody><tr><td><code>bank_identifier</code></td><td>Your bank’s Lean identifier, for example <code>NBF_OF_UAE</code>.</td></tr><tr><td><code>name</code></td><td>The account holder’s name, as the bank has it.</td></tr><tr><td><code>iban</code></td><td>The account’s IBAN.</td></tr><tr><td><code>display_name</code></td><td>A friendly name for the account.</td></tr><tr><td><code>status</code></td><td><code>CONFIRMED</code>.</td></tr><tr><td><code>address</code>, <code>city</code></td><td>The address registered with the bank, and its city. Keep it short, with no special characters.</td></tr><tr><td><code>country</code></td><td>The three-letter country code: <code>ARE</code>.</td></tr><tr><td><code>bank_type</code></td><td><code>RETAIL</code>, <code>SME</code> or <code>CORPORATE</code>.</td></tr><tr><td><code>customer_id</code></td><td>Leave it out, so the account belongs to your application.</td></tr></tbody></table></div><p class=\"sp-note\">The API reference also lists <code>account_number</code>, <code>swift_code</code> and <code>government_identifier</code> (<code>TRADE_LICENSE_NUMBER</code> and its value). Add them if Lean asks for them.</p><p class=\"sp-note\">Example request (sample values: replace them with yours):</p><pre class=\"sp-code\">{\n  &quot;bank_identifier&quot;: &quot;YOUR_BANK_IDENTIFIER&quot;,\n  &quot;name&quot;: &quot;YOUR COMPANY LLC&quot;,\n  &quot;iban&quot;: &quot;AE070331234567890123456&quot;,\n  &quot;display_name&quot;: &quot;Settlement Account&quot;,\n  &quot;status&quot;: &quot;CONFIRMED&quot;,\n  &quot;address&quot;: &quot;Office 101 Business Bay&quot;,\n  &quot;country&quot;: &quot;ARE&quot;,\n  &quot;city&quot;: &quot;Dubai&quot;,\n  &quot;bank_type&quot;: &quot;SME&quot;\n}</pre>"
      }
    ],
    "mindful": [
      "Keep your app token and client secret on your backend only, never in a client-side app or source control.",
      "Send an [[idempotency|Idempotency-Key]] with every create request. If a request times out, retry with the same key; never reuse a key with a different body.",
      "Lean is the source of payment state: a customer returning to your app means their authentication finished, not that the payment succeeded. Use the resource’s status or its webhook."
    ]
  },
  "wh": {
    "title": "Webhooks",
    "sub": "Receive payment and instrument events on your backend: verify them, acknowledge them fast, and process them safely.",
    "pre": [
      "Your webhook endpoint, its events and its signing secret, from Developer portal setup."
    ],
    "steps": [
      "Store the webhook [[signing|signing secret]] from Developer portal setup on your backend only: never in a client-side app or source control.",
      "Make your endpoint publicly reachable over HTTPS, accepting POST requests and returning HTTP <code>200</code> within 10 seconds.",
      "Verify the <code>lean-signature</code> header on every request: HMAC-SHA512 of the raw request body with your signing secret, formatted <code>sha512=&lt;hash&gt;</code>. Reject invalid signatures.",
      "Acknowledge fast: verify, store or enqueue the event, return HTTP <code>200</code>, then process it asynchronously.",
      "Deduplicate on <code>event_id</code>: Lean delivers at least once, so skip IDs you’ve already processed.",
      "Don’t rely on order: identify the resource from the payload and fetch its current state when you need to decide something, with <code>GET /v4/payment-charges/{charge_id}</code> or <code>GET /v4/payment-agreements/{agreement_id}</code>."
    ],
    "prodTitle": "Production",
    "prodNote": "Once Lean upgrades you to production. These steps aren’t counted in Phase 0 progress.",
    "prodSteps": [
      "Configure webhooks separately for production: the production endpoint, its signing secret and the same events."
    ],
    "diagrams": [
      {
        "title": "How a webhook is delivered",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 278\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lb{font:700 11.5px Arial,Helvetica,sans-serif;fill:#1c2024}.ms{font:500 10.5px Arial,Helvetica,sans-serif;fill:#1c2024}.mm{font:italic 500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><line x1=\"110.0\" y1=\"36\" x2=\"110.0\" y2=\"268\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"62.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"110.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean</text><line x1=\"450.0\" y1=\"36\" x2=\"450.0\" y2=\"268\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"375.0\" y=\"6\" width=\"150\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"450.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">{client} backend</text><line x1=\"110.0\" y1=\"64\" x2=\"444.0\" y2=\"64\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M442.0 60 L450.0 64 L442.0 68 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"58\" text-anchor=\"middle\" class=\"ms\">POST webhook event  (lean-signature header)</text><rect x=\"318.0\" y=\"81\" width=\"236\" height=\"20\" rx=\"6\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"436.0\" y=\"95\" text-anchor=\"middle\" class=\"mm\">Verify the signature</text><rect x=\"318.0\" y=\"115\" width=\"236\" height=\"20\" rx=\"6\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"436.0\" y=\"129\" text-anchor=\"middle\" class=\"mm\">Store or enqueue the event</text><line x1=\"450.0\" y1=\"166\" x2=\"116.0\" y2=\"166\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M118.0 162 L110.0 166 L118.0 170 Z\" style=\"fill:var(--bright)\"/><text x=\"280.0\" y=\"160\" text-anchor=\"middle\" class=\"ms\">HTTP 200, within 10 seconds</text><rect x=\"318.0\" y=\"183\" width=\"236\" height=\"20\" rx=\"6\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"436.0\" y=\"197\" text-anchor=\"middle\" class=\"mm\">Process the event</text><rect x=\"318.0\" y=\"217\" width=\"236\" height=\"20\" rx=\"6\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"436.0\" y=\"231\" text-anchor=\"middle\" class=\"mm\">Update from the resource’s current state</text></svg>"
      },
      {
        "title": "Handling duplicate deliveries",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 330\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.ms{font:500 11px Arial,Helvetica,sans-serif;fill:#1c2024}.mm{font:italic 500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><rect x=\"190.0\" y=\"10\" width=\"180\" height=\"28\" rx=\"8\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"28\" text-anchor=\"middle\" class=\"ms\">Event received</text><line x1=\"280.0\" y1=\"38\" x2=\"280.0\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M276.0 54 L280.0 62 L284.0 54 Z\" fill=\"#1c2024\"/><rect x=\"190.0\" y=\"62\" width=\"180\" height=\"28\" rx=\"8\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"80\" text-anchor=\"middle\" class=\"ms\">Verify signature</text><line x1=\"280.0\" y1=\"90\" x2=\"280.0\" y2=\"108\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M276.0 106 L280.0 114 L284.0 106 Z\" fill=\"#1c2024\"/><rect x=\"190.0\" y=\"114\" width=\"180\" height=\"28\" rx=\"8\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"132\" text-anchor=\"middle\" class=\"ms\">Check event_id</text><path d=\"M280.0 142 L280.0 156 L160.0 156 L160.0 172\" fill=\"none\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M156.0 166 L160.0 174 L164.0 166 Z\" fill=\"#1c2024\"/><path d=\"M280.0 156 L400.0 156 L400.0 172\" fill=\"none\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M396.0 166 L400.0 174 L404.0 166 Z\" fill=\"#1c2024\"/><text x=\"160.0\" y=\"190\" text-anchor=\"middle\" class=\"mm\">Already seen</text><text x=\"400.0\" y=\"190\" text-anchor=\"middle\" class=\"mm\">New event</text><rect x=\"75.0\" y=\"200\" width=\"170\" height=\"28\" rx=\"8\" stroke=\"none\" style=\"fill:color-mix(in srgb,var(--bright) 18%,#fff)\"/><text x=\"160.0\" y=\"218\" text-anchor=\"middle\" class=\"ms\">Acknowledge (HTTP 200)</text><rect x=\"315.0\" y=\"200\" width=\"170\" height=\"28\" rx=\"8\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"400.0\" y=\"218\" text-anchor=\"middle\" class=\"ms\">Store / enqueue</text><line x1=\"400.0\" y1=\"228\" x2=\"400.0\" y2=\"246\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M396.0 244 L400.0 252 L404.0 244 Z\" fill=\"#1c2024\"/><rect x=\"315.0\" y=\"252\" width=\"170\" height=\"28\" rx=\"8\" stroke=\"none\" style=\"fill:color-mix(in srgb,var(--bright) 18%,#fff)\"/><text x=\"400.0\" y=\"270\" text-anchor=\"middle\" class=\"ms\">Acknowledge (HTTP 200)</text><line x1=\"400.0\" y1=\"280\" x2=\"400.0\" y2=\"290\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M396.0 288 L400.0 296 L404.0 288 Z\" fill=\"#1c2024\"/><rect x=\"315.0\" y=\"296\" width=\"170\" height=\"28\" rx=\"8\" fill=\"#fff\" stroke=\"#e5e7eb\"/><text x=\"400.0\" y=\"314\" text-anchor=\"middle\" class=\"ms\">Process</text></svg>"
      }
    ],
    "sections": [
      {
        "title": "Reference: webhook fields",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Field</th><th>What it is</th></tr></thead><tbody><tr><td><code>event_id</code></td><td>Unique ID for the event. Use it to detect duplicate deliveries.</td></tr><tr><td><code>type</code></td><td>The event, for example <code>charge.captured</code>.</td></tr><tr><td><code>message</code></td><td>A readable description of the event.</td></tr><tr><td><code>timestamp</code></td><td>When the event happened, in UTC.</td></tr><tr><td><code>payload</code></td><td>The resource the event is about. Its contents depend on the event: some events carry the full resource, others its ID and new status.</td></tr></tbody></table></div><pre class=\"sp-code\">{\n  &quot;event_id&quot;: &quot;evt_6Lp3Rd9Km&quot;,\n  &quot;type&quot;: &quot;charge.captured&quot;,\n  &quot;message&quot;: &quot;The charge has been captured.&quot;,\n  &quot;timestamp&quot;: &quot;2026-07-17T10:05:44.612Z&quot;,\n  &quot;payload&quot;: {\n    &quot;id&quot;: &quot;chg_oneoff75Qk&quot;,\n    &quot;status&quot;: &quot;CAPTURED&quot;,\n    &quot;capture_id&quot;: &quot;cap_8dF2Qm&quot;,\n    &quot;amount&quot;: { &quot;value&quot;: &quot;75.00&quot;, &quot;currency&quot;: &quot;AED&quot; }\n  }\n}</pre>"
      },
      {
        "title": "Reference: signature and code example",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody><tr><td>Header</td><td><code>lean-signature</code></td></tr><tr><td>Algorithm</td><td>HMAC-SHA512</td></tr><tr><td>Format</td><td><code>sha512=&lt;hash&gt;</code></td></tr><tr><td>Signed content</td><td>The raw HTTP request body</td></tr><tr><td>Secret</td><td>Your webhook signing secret</td></tr></tbody></table></div><p class=\"sp-note\">Example in Node.js. Calculate the signature over the raw body: parsing and re-serialising the JSON changes the bytes and breaks verification.</p><pre class=\"sp-code\">const crypto = require(&quot;crypto&quot;);\n\n// rawBody: the request body exactly as received (a Buffer), before any JSON parsing.\nfunction isFromLean(rawBody, signatureHeader, signingSecret) {\n  if (!signatureHeader || !signingSecret) return false;\n  const expected = &quot;sha512=&quot; + crypto.createHmac(&quot;sha512&quot;, signingSecret).update(rawBody).digest(&quot;hex&quot;);\n  const a = Buffer.from(signatureHeader, &quot;utf8&quot;);\n  const b = Buffer.from(expected, &quot;utf8&quot;);\n  return a.length === b.length &amp;&amp; crypto.timingSafeEqual(a, b);\n}\n\n// Express: keep the raw body on the webhook route.\napp.post(&quot;/webhooks/lean&quot;, express.raw({ type: &quot;application/json&quot; }), async (req, res) =&gt; {\n  if (!isFromLean(req.body, req.get(&quot;lean-signature&quot;), process.env.LEAN_WEBHOOK_SECRET)) return res.sendStatus(401);\n  const event = JSON.parse(req.body.toString(&quot;utf8&quot;));\n  await saveIfNew(event); // your durable store or queue, keyed on event.event_id\n  res.sendStatus(200);    // acknowledge first, process asynchronously\n});</pre>"
      },
      {
        "title": "Reference: retry schedule",
        "collapsible": true,
        "html": "<p class=\"sp-note\" style=\"margin-top:0\">Lean delivers at least once, so an event can arrive more than once. A delivery fails if your endpoint doesn’t return HTTP <code>200</code> within 10 seconds. Failed deliveries are retried on this schedule:</p><div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Retry</th><th>After</th></tr></thead><tbody><tr><td>1</td><td>1 minute</td></tr><tr><td>2</td><td>2 minutes</td></tr><tr><td>3</td><td>5 minutes</td></tr><tr><td>4</td><td>10 minutes</td></tr><tr><td>5</td><td>60 minutes</td></tr><tr><td>6</td><td>180 minutes</td></tr></tbody></table></div>"
      },
      {
        "title": "Reference: payment events",
        "collapsible": true,
        "html": "<p class=\"sp-note\" style=\"margin-top:0\">Events can arrive out of order: <code>charge.captured</code> can arrive before <code>charge.created</code>. Treat each one as a notice that the resource changed.</p><div class=\"sp-sub-h\">Charge events (standalone Charges and Charges under an Agreement)</div><div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Event</th><th>When it’s sent</th><th>What to do</th></tr></thead><tbody><tr><td><code>charge.created</code></td><td>A new Charge is created.</td><td>Record it against your order or transaction.</td></tr><tr><td><code>charge.authorized</code></td><td>The Charge is authorized.</td><td>Re-fetch the Charge for its current status.</td></tr><tr><td><code>charge.captured</code></td><td>The Charge is captured.</td><td>Mark the payment successful. Settlement is requested; the funds may not have reached your Settlement Account yet.</td></tr><tr><td><code>charge.declined</code></td><td>The payment was declined.</td><td>Read <code>decline_reason</code>. Terminal: create a new Charge to retry.</td></tr><tr><td><code>charge.discarded</code></td><td>Authentication wasn’t completed in the allowed window.</td><td>Close the attempt. Terminal: create a new Charge to retry.</td></tr></tbody></table></div><div class=\"sp-sub-h\">Agreement events</div><div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Event</th><th>When it’s sent</th><th>What to do</th></tr></thead><tbody><tr><td><code>agreement.activated</code></td><td>The Agreement is active and ready to be used.</td><td>Enable charging. Only an ACTIVE Agreement can be charged.</td></tr><tr><td><code>agreement.suspended</code></td><td>The Agreement is paused.</td><td>Stop initiating new Charges.</td></tr><tr><td><code>agreement.resumed</code></td><td>The Agreement is ACTIVE again.</td><td>Resume charging where appropriate.</td></tr><tr><td><code>agreement.declined</code></td><td>The Agreement was rejected.</td><td>Read <code>decline_reason</code>; offer a new authorisation if appropriate.</td></tr><tr><td><code>agreement.discarded</code></td><td>The customer didn’t complete authentication.</td><td>Create a new Agreement if needed.</td></tr><tr><td><code>agreement.fulfilled</code></td><td>The Agreement reached its completion conditions.</td><td>Stop creating Charges and mark it completed.</td></tr><tr><td><code>agreement.revoked</code></td><td>The Agreement is permanently withdrawn.</td><td>Stop charging under it.</td></tr></tbody></table></div><div class=\"sp-sub-h\">Instrument events</div><div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Event</th><th>When it’s sent</th><th>What to do</th></tr></thead><tbody><tr><td><code>instrument.created</code></td><td>A new Payment Instrument is created: when you create one, or when Lean captures one while processing a payment (for example, when the customer selects the account to pay with).</td><td>Store it against the customer. The payload is the complete instrument, in the same shape as Fetch Payment Instrument, so no follow-up fetch is needed.</td></tr><tr><td><code>instrument.updated</code></td><td>An instrument’s stored details change.</td><td>Replace your stored copy with the payload (the complete instrument after the change) rather than merging fields.</td></tr></tbody></table></div><p class=\"sp-note\">Delivery is at least once and unordered: dedupe on <code>event_id</code>. Example <code>instrument.created</code> (sample values):</p><pre class=\"sp-code\">{\n  &quot;event_id&quot;: &quot;evt_4Tn8Vb2Xw&quot;,\n  &quot;type&quot;: &quot;instrument.created&quot;,\n  &quot;message&quot;: &quot;The instrument has been created.&quot;,\n  &quot;timestamp&quot;: &quot;2026-07-17T10:01:12.284Z&quot;,\n  &quot;payload&quot;: {\n    &quot;id&quot;: &quot;ins_bank7Yt2Qp&quot;,\n    &quot;type&quot;: &quot;BANK_ACCOUNT&quot;,\n    &quot;customer_id&quot;: &quot;3f8e2c4a-9b1d-4e6f-8a2c-5d7b9e1f3a60&quot;,\n    &quot;details&quot;: {\n      &quot;iban&quot;: &quot;AE070331234567890123456&quot;,\n      &quot;swift_code&quot;: &quot;ADCBAEAAXXX&quot;,\n      &quot;holder_name&quot;: &quot;Sample Customer&quot;\n    },\n    &quot;display_name&quot;: &quot;AE**** **** **** 0123&quot;,\n    &quot;fingerprint&quot;: &quot;fpr_ka9f2ubmqk5d5wcz&quot;\n  }\n}</pre>"
      },
      {
        "title": "If you run into these",
        "collapsible": false,
        "html": "<ul class=\"sp-pre\"><li>Your network restricts inbound traffic: allowlist Lean’s UAE webhook senders. <a href=\"https://docs.leantech.me/v4.0-GLOBAL/docs/webhooks-1#5-allowlist-lean-webhook-ip-addresses\" target=\"_blank\" rel=\"noopener\">IP addresses and hostnames</a></li><li>A delivery failed or an event wasn’t processed: check the delivery history and resend it from the dev portal. <a href=\"https://docs.leantech.me/v4.0-GLOBAL/docs/webhooks-1#monitor-webhook-deliveries\" target=\"_blank\" rel=\"noopener\">Monitor and resend deliveries</a></li><li>You need to change your endpoint or rotate the signing secret. <a href=\"https://docs.leantech.me/v4.0-GLOBAL/docs/webhooks-1#2-manage-webhooks-in-the-lean-dashboard\" target=\"_blank\" rel=\"noopener\">Manage webhooks</a></li><li>You receive an event type you don’t recognise: acknowledge it after verifying and storing it, and record it for investigation. <a href=\"https://docs.leantech.me/v4.0-GLOBAL/docs/payment-webhooks#5-handle-unknown-events-safely\" target=\"_blank\" rel=\"noopener\">Handle unknown events</a></li></ul>"
      }
    ],
    "endpoints": [
      "GET /v4/payment-charges/{charge_id}",
      "GET /v4/payment-agreements/{agreement_id}"
    ],
    "links": [
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/webhooks-1",
        "label": "Set up webhooks"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/payment-webhooks",
        "label": "Payment webhooks"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/errors-and-troubleshooting",
        "label": "Errors and troubleshooting"
      },
      {
        "url": "https://dev.leantech.me/",
        "label": "Lean dev portal"
      }
    ]
  },
  "otp": {
    "title": "One-Time Payments",
    "sub": "Accept a single Pay by Bank payment. Each payment is a [[charge|Charge]], tracked from creation through the customer’s authentication to its outcome.",
    "pre": [
      "Phase 0 done: an access token and your settlement_account_id (Authentication and Settlement Account Setup), and webhooks (Webhooks). You’ll test the whole flow in the End-to-end test."
    ],
    "steps": [
      "Create a Charge from your backend: <code>POST /v4/payment-charges</code> with an [[idempotency|Idempotency-Key]], <code>payment_method</code> <code>PAY_BY_BANK</code>, the <code>amount</code> in AED, your <code>settlement_account_id</code>, your references (<code>charge_merchant_reference</code>, <code>authorization_merchant_reference</code>), the <code>customer</code> object with the customer’s name and <code>authentication_overrides</code> with a <code>return_url</code> and <code>fail_return_url</code> on a host you added in Developer portal setup.",
      "For a customer’s first payment, create the [[customer|Customer]] in the same request with a <code>customer</code> block; store the <code>customer_id</code> Lean returns. For their later payments, send <code>customer_id</code> instead.",
      "Store the Charge <code>id</code> against your order before sending the customer anywhere. You’ll use it to fetch the Charge and match webhooks.",
      "Send the customer to the <code>REDIRECT</code> method’s <code>details.url</code> from <code>available_authentication_methods</code>. They choose their bank and the account to pay from, and Lean creates a [[instrument|Payment Instrument]] for that account and sends <code>instrument.created</code>. On the web, redirect the browser. In a mobile app, open it in a WebView: close the WebView on your own return URL, keep Lean-hosted URLs inside it, and hand any other URL to the operating system so the bank app opens.",
      "When the customer returns, check the outcome with <code>GET /v4/payment-charges/{charge_id}</code> and show it from the Charge’s state:<ul class=\"sp-outcomes\"><li><code>CAPTURED</code>: show success. Settlement is requested; the funds may not have arrived yet.</li><li><code>DECLINED</code>: show failure, using <code>decline_reason</code>.</li><li><code>PENDING_PROVIDER_CONFIRMATION</code>: show a pending state and listen for webhooks (<code>charge.captured</code> or <code>charge.declined</code>), then update the customer. This happens in under 2% of payments, but your integration still needs to handle it.</li></ul><code>PENDING_CUSTOMER_AUTHENTICATION</code> means authentication isn’t finished yet; <code>DISCARDED</code> means it wasn’t completed in time. Declined and discarded are final: create a new Charge to retry.",
      "Handle <code>charge.authorized</code>, <code>charge.captured</code>, <code>charge.declined</code> and <code>charge.discarded</code>: they matter most when the customer never comes back to your app. Store the instrument from <code>instrument.created</code>, and replace it when <code>instrument.updated</code> arrives."
    ],
    "endpoints": [
      "POST /v4/payment-charges",
      "GET /v4/payment-charges/{charge_id}"
    ],
    "links": [
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/one-time-payments",
        "label": "Accept a one-time payment"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/getting-started-with-payments",
        "label": "Payments overview"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/payment-methods",
        "label": "Payment methods"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/payment-webhooks",
        "label": "Payment webhooks"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/errors-and-troubleshooting",
        "label": "Errors and troubleshooting"
      }
    ],
    "diagrams": [
      {
        "title": "The payment lifecycle",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 112\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lt{font:700 11px Arial,Helvetica,sans-serif;fill:#1c2024}.ld{font:500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><rect x=\"17.6\" y=\"14\" width=\"118\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"17.6\" y=\"14\" width=\"118\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"76.6\" y=\"44\" text-anchor=\"middle\" class=\"lt\">1. Create</text><text x=\"76.6\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Your backend creates</text><text x=\"76.6\" y=\"81\" text-anchor=\"middle\" class=\"ld\">a Charge</text><line x1=\"138.6\" y1=\"56\" x2=\"144.2\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M142.2 52 L150.2 56 L142.2 60 Z\" fill=\"#1c2024\"/><rect x=\"153.2\" y=\"14\" width=\"118\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"153.2\" y=\"14\" width=\"118\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"212.2\" y=\"44\" text-anchor=\"middle\" class=\"lt\">2. Authenticate</text><text x=\"212.2\" y=\"66\" text-anchor=\"middle\" class=\"ld\">The customer approves</text><text x=\"212.2\" y=\"81\" text-anchor=\"middle\" class=\"ld\">with their bank</text><line x1=\"274.2\" y1=\"56\" x2=\"279.8\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M277.8 52 L285.8 56 L277.8 60 Z\" fill=\"#1c2024\"/><rect x=\"288.8\" y=\"14\" width=\"118\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"288.8\" y=\"14\" width=\"118\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"347.8\" y=\"44\" text-anchor=\"middle\" class=\"lt\">3. Process</text><text x=\"347.8\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Lean processes</text><text x=\"347.8\" y=\"81\" text-anchor=\"middle\" class=\"ld\">the payment</text><line x1=\"409.8\" y1=\"56\" x2=\"415.4\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M413.4 52 L421.4 56 L413.4 60 Z\" fill=\"#1c2024\"/><rect x=\"424.4\" y=\"14\" width=\"118\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"424.4\" y=\"14\" width=\"118\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"483.4\" y=\"44\" text-anchor=\"middle\" class=\"lt\">4. Outcome</text><text x=\"483.4\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Status by webhook</text><text x=\"483.4\" y=\"81\" text-anchor=\"middle\" class=\"ld\">or GET Charge</text></svg>"
      },
      {
        "title": "A one-time payment",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 346\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lb{font:700 11.5px Arial,Helvetica,sans-serif;fill:#1c2024}.ms{font:500 10.5px Arial,Helvetica,sans-serif;fill:#1c2024}.mm{font:italic 500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><line x1=\"80.0\" y1=\"36\" x2=\"80.0\" y2=\"336\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"5.0\" y=\"6\" width=\"150\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"80.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">{client} backend</text><line x1=\"280.0\" y1=\"36\" x2=\"280.0\" y2=\"336\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"232.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean</text><line x1=\"480.0\" y1=\"36\" x2=\"480.0\" y2=\"336\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"432.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"480.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Customer</text><line x1=\"80.0\" y1=\"64\" x2=\"274.0\" y2=\"64\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 60 L280.0 64 L272.0 68 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"58\" text-anchor=\"middle\" class=\"ms\">Create Charge  (POST /v4/payment-charges)</text><line x1=\"280.0\" y1=\"98\" x2=\"86.0\" y2=\"98\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 94 L80.0 98 L88.0 102 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"92\" text-anchor=\"middle\" class=\"ms\">Charge + hosted auth URL</text><line x1=\"280.0\" y1=\"132\" x2=\"86.0\" y2=\"132\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 128 L80.0 132 L88.0 136 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"126\" text-anchor=\"middle\" class=\"ms\">charge.created webhook</text><line x1=\"80.0\" y1=\"166\" x2=\"474.0\" y2=\"166\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 162 L480.0 166 L472.0 170 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"160\" text-anchor=\"middle\" class=\"ms\">Send customer to authenticate</text><line x1=\"480.0\" y1=\"200\" x2=\"286.0\" y2=\"200\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M288.0 196 L280.0 200 L288.0 204 Z\" fill=\"#1c2024\"/><text x=\"380.0\" y=\"194\" text-anchor=\"middle\" class=\"ms\">Customer authenticates with their bank</text><line x1=\"280.0\" y1=\"234\" x2=\"86.0\" y2=\"234\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 230 L80.0 234 L88.0 238 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"228\" text-anchor=\"middle\" class=\"ms\">charge.captured webhook</text><line x1=\"80.0\" y1=\"268\" x2=\"274.0\" y2=\"268\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 264 L280.0 268 L272.0 272 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"262\" text-anchor=\"middle\" class=\"ms\">Fetch Charge  (GET /v4/payment-charges/{id})</text><line x1=\"280.0\" y1=\"302\" x2=\"86.0\" y2=\"302\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 298 L80.0 302 L88.0 306 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"296\" text-anchor=\"middle\" class=\"ms\">Current status: CAPTURED</text></svg>"
      }
    ],
    "sections": [
      {
        "title": "Reference: Charge statuses",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Status</th><th>What it means</th><th>What to do</th></tr></thead><tbody><tr><td><code>PENDING_CUSTOMER_AUTHENTICATION</code></td><td>The customer still needs to authenticate.</td><td>Wait for the customer or a webhook.</td></tr><tr><td><code>PENDING_PROVIDER_CONFIRMATION</code></td><td>Waiting for final confirmation from the provider. Happens in under 2% of payments.</td><td>Show a pending state and listen for webhooks (<code>charge.captured</code> or <code>charge.declined</code>), then update the customer. Build for it even though it’s rare.</td></tr><tr><td><code>CAPTURED</code></td><td>The payment succeeded and settlement is requested.</td><td>Confirm the payment.</td></tr><tr><td><code>DECLINED</code></td><td>The payment was declined.</td><td>Read <code>decline_reason</code>; allow a new payment.</td></tr><tr><td><code>DISCARDED</code></td><td>Not completed within the 10-minute window.</td><td>Create a new Charge to retry.</td></tr></tbody></table></div>"
      }
    ],
    "mindful": [
      "Use the Charge’s state to determine the payment outcome, rather than assuming that the customer returning from authentication means the payment succeeded. The customer has 10 minutes to authenticate; after that the Charge is discarded."
    ]
  },
  "rec": {
    "title": "Recurring Payments",
    "sub": "Collect repeat payments under one [[agreement|Payment Agreement]]: the customer authenticates once, and each payment under it is its own [[charge|Charge]].",
    "pre": [
      "Phase 0 done: an access token, your settlement_account_id and webhooks. The One-Time Payments flow, since every Charge under an Agreement behaves the same way. You’ll test the whole flow in the End-to-end test."
    ],
    "steps": [
      "Choose how payments are created: <b>on demand</b> (your app creates each Charge).",
      "Create the Agreement: <code>POST /v4/payment-agreements</code> with an [[idempotency|Idempotency-Key]], <code>payment_method</code> <code>PAY_BY_BANK</code>, <code>currency</code> <code>AED</code>, a <code>customer</code> object (or <code>customer_id</code> for a returning customer) and <code>limits</code> that match what the customer agrees to. Mandatory: pass the customer’s Emirates ID in the <code>identifications</code> object. Optionally add <code>settlement_accounts</code> or an <code>initial_charge</code>.",
      "Store the Agreement <code>id</code> against the customer, then send them to the <code>REDIRECT</code> method’s <code>details.url</code>, the same way as a one-time payment. The customer chooses the account to pay from, and Lean creates a [[instrument|Payment Instrument]] for it and sends <code>instrument.created</code>.",
      "Confirm activation from the <code>agreement.activated</code> webhook: webhooks are always your primary source, and <code>GET /v4/payment-agreements/{agreement_id}</code> is a fallback. Only charge an <code>ACTIVE</code> Agreement; <code>DECLINED</code> and <code>DISCARDED</code> are final, so start a new Agreement to retry.",
      "Charge on demand: <code>POST /v4/payment-agreements/{agreement_id}/payment-charges</code> with an Idempotency-Key, the <code>amount</code>, <code>authorization_merchant_reference</code> and <code>payment_descriptor</code>. Show each Charge’s outcome from its state, the same way as a one-time payment: <code>CAPTURED</code> shows success, <code>DECLINED</code> shows failure, and <code>PENDING_PROVIDER_CONFIRMATION</code> shows pending until a webhook arrives.",
      "Manage the Agreement: pause with <code>POST /v4/payment-agreements/{agreement_id}/pauses</code> (<code>SUSPENDED</code>), resume with <code>/resumptions</code> (<code>ACTIVE</code>) and revoke with <code>/revocations</code> (<code>REVOKED</code>, permanent).",
      "Handle the Agreement events: <code>agreement.activated</code>, <code>agreement.suspended</code>, <code>agreement.resumed</code>, <code>agreement.declined</code>, <code>agreement.discarded</code>, <code>agreement.fulfilled</code> and <code>agreement.revoked</code>. Handle each Charge’s events as for a one-time payment: <code>charge.created</code>, <code>charge.authorized</code>, <code>charge.captured</code>, <code>charge.declined</code> and <code>charge.discarded</code>. Track the Agreement’s status separately from each Charge’s."
    ],
    "endpoints": [
      "POST /v4/payment-agreements",
      "GET /v4/payment-agreements/{agreement_id}",
      "POST /v4/payment-agreements/{agreement_id}/payment-charges",
      "POST /v4/payment-agreements/{agreement_id}/pauses",
      "POST /v4/payment-agreements/{agreement_id}/resumptions",
      "POST /v4/payment-agreements/{agreement_id}/revocations"
    ],
    "links": [
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/set-up-recurring-payments",
        "label": "Set up recurring payments"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/getting-started-with-payments",
        "label": "Payments overview"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/one-time-payments",
        "label": "Accept a one-time payment"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/payment-webhooks",
        "label": "Payment webhooks"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/errors-and-troubleshooting",
        "label": "Errors and troubleshooting"
      }
    ],
    "diagrams": [
      {
        "title": "Recurring payments on demand",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 414\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lb{font:700 11.5px Arial,Helvetica,sans-serif;fill:#1c2024}.ms{font:500 10.5px Arial,Helvetica,sans-serif;fill:#1c2024}.mm{font:italic 500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><line x1=\"80.0\" y1=\"36\" x2=\"80.0\" y2=\"404\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"5.0\" y=\"6\" width=\"150\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"80.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">{client} backend</text><line x1=\"280.0\" y1=\"36\" x2=\"280.0\" y2=\"404\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"232.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean</text><line x1=\"480.0\" y1=\"36\" x2=\"480.0\" y2=\"404\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"432.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"480.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Customer</text><line x1=\"80.0\" y1=\"64\" x2=\"274.0\" y2=\"64\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 60 L280.0 64 L272.0 68 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"58\" text-anchor=\"middle\" class=\"ms\">Create Agreement  (POST /v4/payment-agreements)</text><line x1=\"280.0\" y1=\"98\" x2=\"86.0\" y2=\"98\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 94 L80.0 98 L88.0 102 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"92\" text-anchor=\"middle\" class=\"ms\">Agreement + hosted auth URL</text><line x1=\"80.0\" y1=\"132\" x2=\"474.0\" y2=\"132\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 128 L480.0 132 L472.0 136 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"126\" text-anchor=\"middle\" class=\"ms\">Send customer to authenticate</text><line x1=\"480.0\" y1=\"166\" x2=\"286.0\" y2=\"166\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M288.0 162 L280.0 166 L288.0 170 Z\" fill=\"#1c2024\"/><text x=\"380.0\" y=\"160\" text-anchor=\"middle\" class=\"ms\">Customer authenticates with their bank</text><line x1=\"280.0\" y1=\"200\" x2=\"86.0\" y2=\"200\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 196 L80.0 200 L88.0 204 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"194\" text-anchor=\"middle\" class=\"ms\">agreement.activated webhook</text><line x1=\"80.0\" y1=\"234\" x2=\"274.0\" y2=\"234\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 230 L280.0 234 L272.0 238 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"228\" text-anchor=\"middle\" class=\"ms\">Create Charge under the Agreement</text><line x1=\"280.0\" y1=\"268\" x2=\"86.0\" y2=\"268\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 264 L80.0 268 L88.0 272 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"262\" text-anchor=\"middle\" class=\"ms\">Charge + status</text><line x1=\"280.0\" y1=\"302\" x2=\"86.0\" y2=\"302\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 298 L80.0 302 L88.0 306 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"296\" text-anchor=\"middle\" class=\"ms\">charge.captured webhook</text><line x1=\"80.0\" y1=\"336\" x2=\"274.0\" y2=\"336\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 332 L280.0 336 L272.0 340 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"330\" text-anchor=\"middle\" class=\"ms\">Fetch Charge  (GET /v4/payment-charges/{id})</text><line x1=\"280.0\" y1=\"370\" x2=\"86.0\" y2=\"370\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 366 L80.0 370 L88.0 374 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"364\" text-anchor=\"middle\" class=\"ms\">Charge status</text></svg>"
      }
    ],
    "sections": [
      {
        "title": "Reference: limits",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Limit</th><th>What it controls</th></tr></thead><tbody><tr><td><code>per_charge_max_amount</code></td><td>Maximum amount of one Charge.</td></tr><tr><td><code>agreement_max_total_amount</code></td><td>Maximum total charged under the Agreement.</td></tr><tr><td><code>agreement_max_charges_count</code></td><td>Maximum number of Charges.</td></tr><tr><td><code>expiration_date</code></td><td>Date after which the Agreement can’t be used.</td></tr></tbody></table></div><p class=\"sp-note\">If you omit a limit, the payment provider may apply its own: read the Agreement response for the limits in effect.</p>"
      },
      {
        "title": "Reference: Agreement statuses",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Status</th><th>Meaning</th><th>Can you charge it?</th></tr></thead><tbody><tr><td><code>PENDING_CUSTOMER_AUTHENTICATION</code></td><td>Authentication is outstanding.</td><td>No</td></tr><tr><td><code>ACTIVE</code></td><td>Authorised and chargeable.</td><td>Yes, within its limits</td></tr><tr><td><code>SUSPENDED</code></td><td>Temporarily paused.</td><td>No</td></tr><tr><td><code>FULFILLED</code></td><td>Reached its completion conditions.</td><td>No (final)</td></tr><tr><td><code>REVOKED</code></td><td>Permission withdrawn.</td><td>No (final)</td></tr><tr><td><code>DECLINED</code></td><td>Declined by the customer or provider.</td><td>No (final)</td></tr><tr><td><code>DISCARDED</code></td><td>Authentication wasn’t completed.</td><td>No (final)</td></tr></tbody></table></div>"
      }
    ],
    "mindful": [
      "Each Charge under an Agreement behaves like a one-time payment, with its own status and <code>charge.*</code> events, including the scheduled Charges Lean creates. Track the Agreement’s status separately from each Charge’s."
    ]
  },
  "e2e": {
    "title": "End-to-end test in Sandbox",
    "sub": "Run the whole integration against the Sandbox, in order: environment, a one-time payment, a recurring payment, webhooks and failure cases. When every step passes, you’re ready for production.",
    "pre": [
      "Phase 0 done: dev portal setup (including a test user), authentication (including your Settlement Account) and webhooks.",
      "One-Time and Recurring Payments built from their guides."
    ],
    "stepGroups": [
      {
        "title": "1. Environment",
        "steps": [
          "Point your backend at the Sandbox: API base <code>https://sandbox.leantech.me</code>, token endpoint on <code>auth.sandbox.leantech.me</code>, and your <b>sandbox</b> app token and client secret. Sandbox and production credentials are separate.",
          "Confirm your backend uses the sandbox <code>settlement_account_id</code> from Developer portal setup, and that your Sandbox test user (Developer portal setup, step 12) is ready."
        ]
      },
      {
        "title": "2. A one-time payment",
        "steps": [
          "From your real checkout code, create a Pay by Bank [[charge|Charge]] for an arbitrary amount, with an Idempotency-Key, your <code>settlement_account_id</code>, your references, a <code>customer</code> object and your <code>return_url</code> and <code>fail_return_url</code>.",
          "Check the response: status <code>PENDING_CUSTOMER_AUTHENTICATION</code>, a <code>REDIRECT</code> method with <code>details.url</code> and a <code>customer_id</code>. Confirm your app stored the Charge <code>id</code> and the <code>customer_id</code> before redirecting.",
          "Open <code>details.url</code> on the web and in your app’s WebView, choose an account, and complete authentication with your test user’s details. Confirm the customer lands back on your <code>return_url</code>.",
          "Confirm the outcome from the Lean webhooks: you should receive <code>charge.created</code>, <code>instrument.created</code>, <code>charge.authorized</code> and <code>charge.captured</code>, verify <code>lean-signature</code> and return <code>200</code> within 10 seconds. You can also check the status with <code>GET /v4/payment-charges/{charge_id}</code> and make sure it reached <code>CAPTURED</code> as its final state. Your order shows as paid.",
          "Make a second payment for the same customer, sending <code>customer_id</code> instead of the <code>customer</code> object. Confirm both Charges belong to the same Lean Customer."
        ]
      },
      {
        "title": "3. A recurring payment",
        "steps": [
          "Create an on-demand [[agreement|Agreement]] with <code>limits</code>, open its <code>details.url</code> and authorise it with your test user. Confirm <code>ACTIVE</code> through <code>agreement.activated</code> and <code>GET /v4/payment-agreements/{agreement_id}</code>.",
          "Charge it with <code>POST /v4/payment-agreements/{agreement_id}/payment-charges</code>. Confirm the Charge belongs to the Agreement, has the right amount and currency, follows the usual lifecycle, and sends <code>charge.captured</code>.",
          "Try a Charge above <code>per_charge_max_amount</code>: it’s rejected, and your app handles it.",
          "Pause the Agreement (<code>SUSPENDED</code>, <code>agreement.suspended</code>) and create a new Charge: it should get rejected, and your app should handle that. Resume it (<code>ACTIVE</code>, <code>agreement.resumed</code>). Revoke it (<code>REVOKED</code>, <code>agreement.revoked</code>) and confirm it can’t be charged again. If your Agreement’s limits haven’t been reached yet, keep charging it to test the <code>FULFILLED</code> state (<code>agreement.fulfilled</code>)."
        ]
      },
      {
        "title": "4. Webhooks",
        "steps": [
          "In the dev portal’s webhook delivery history, confirm every event from the runs above arrived and your endpoint returned <code>200</code>.",
          "Resend one of those events from the dev portal and confirm your backend skips it as a duplicate (<code>event_id</code>).",
          "Send your endpoint a request with a wrong <code>lean-signature</code> and confirm it’s rejected.",
          "Process an event out of order, for example <code>charge.captured</code> before <code>charge.created</code>, and confirm your records still end up correct by fetching the current state.",
          "Take your endpoint offline, make a payment, then bring it back. Once it’s back online, confirm you receive the event and process it once."
        ]
      },
      {
        "title": "5. Failure cases",
        "steps": [
          "Decline a payment with a test-user scenario: the Charge becomes <code>DECLINED</code>, you show <code>decline_reason</code>, and the customer can start a new Charge.",
          "Abandon authentication and wait out the 10 minutes: <code>charge.discarded</code> arrives and the Charge is <code>DISCARDED</code>.",
          "Complete authentication but don’t follow the return to your app: your backend still records the outcome from the webhook or the API.",
          "Decline or abandon an Agreement: it becomes <code>DECLINED</code> or <code>DISCARDED</code>, and your app offers a new one.",
          "Retry a create request with the same [[idempotency|Idempotency-Key]]: you get the original Charge back. Reuse the key with a different body: it’s rejected.",
          "Send invalid parameters (validation error), an invalid token (<code>401</code>) and a call you don’t have permission for (<code>403</code>). Also test a Charge that returns insufficient funds, one above the Agreement’s limits, and one on an Agreement that isn’t in the right state. Confirm your app handles each, and every other edge case."
        ]
      },
      {
        "title": "6. Ready for production",
        "steps": [
          "Go through Lean’s go-live checklist: authentication works; the Settlement Account is configured; Pay by Bank is tested; successful and unsuccessful outcomes are handled; Charges and Agreements belong to the right customers; create requests are idempotent; webhook signatures are verified; duplicate and out-of-order webhooks are handled; outcomes come from resource statuses; production credentials and webhooks are ready."
        ]
      }
    ],
    "steps": [],
    "prodTitle": "Going live",
    "prodNote": "After the production steps in Developer portal setup and Webhooks. These aren’t counted in progress.",
    "prodSteps": [
      "Change the API base URL to <code>https://api.leantech.me</code> and use your production credentials. Don’t reuse Sandbox credentials or test users in production.",
      "Confirm your production Settlement Account and that Pay by Bank is enabled for your production application.",
      "Complete Lean’s go-live validation before processing live customer payments."
    ],
    "diagrams": [
      {
        "title": "The end-to-end run in Sandbox",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 550\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lb{font:700 11.5px Arial,Helvetica,sans-serif;fill:#1c2024}.ms{font:500 10.5px Arial,Helvetica,sans-serif;fill:#1c2024}.mm{font:italic 500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><line x1=\"80.0\" y1=\"36\" x2=\"80.0\" y2=\"540\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"5.0\" y=\"6\" width=\"150\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"80.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">{client} backend</text><line x1=\"280.0\" y1=\"36\" x2=\"280.0\" y2=\"540\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"226.0\" y=\"6\" width=\"108\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean Sandbox</text><line x1=\"480.0\" y1=\"36\" x2=\"480.0\" y2=\"540\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"432.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"480.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Test user</text><line x1=\"80.0\" y1=\"64\" x2=\"274.0\" y2=\"64\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 60 L280.0 64 L272.0 68 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"58\" text-anchor=\"middle\" class=\"ms\">POST /oauth2/token</text><line x1=\"280.0\" y1=\"98\" x2=\"86.0\" y2=\"98\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 94 L80.0 98 L88.0 102 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"92\" text-anchor=\"middle\" class=\"ms\">Access token</text><line x1=\"80.0\" y1=\"132\" x2=\"274.0\" y2=\"132\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 128 L280.0 132 L272.0 136 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"126\" text-anchor=\"middle\" class=\"ms\">Create Charge  (AED 75, PAY_BY_BANK)</text><line x1=\"280.0\" y1=\"166\" x2=\"86.0\" y2=\"166\" style=\"stroke:var(--bright)\" stroke-width=\"1.6\"/><path d=\"M88.0 162 L80.0 166 L88.0 170 Z\" style=\"fill:var(--bright)\"/><text x=\"180.0\" y=\"160\" text-anchor=\"middle\" class=\"ms\">Charge + details.url</text><line x1=\"80.0\" y1=\"200\" x2=\"474.0\" y2=\"200\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 196 L480.0 200 L472.0 204 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"194\" text-anchor=\"middle\" class=\"ms\">Open details.url</text><line x1=\"480.0\" y1=\"234\" x2=\"286.0\" y2=\"234\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M288.0 230 L280.0 234 L288.0 238 Z\" fill=\"#1c2024\"/><text x=\"380.0\" y=\"228\" text-anchor=\"middle\" class=\"ms\">Authenticate with test-user details</text><line x1=\"280.0\" y1=\"268\" x2=\"86.0\" y2=\"268\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 264 L80.0 268 L88.0 272 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"262\" text-anchor=\"middle\" class=\"ms\">charge.created, charge.captured webhooks</text><line x1=\"80.0\" y1=\"302\" x2=\"274.0\" y2=\"302\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 298 L280.0 302 L272.0 306 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"296\" text-anchor=\"middle\" class=\"ms\">GET Charge: CAPTURED</text><line x1=\"80.0\" y1=\"336\" x2=\"274.0\" y2=\"336\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 332 L280.0 336 L272.0 340 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"330\" text-anchor=\"middle\" class=\"ms\">Create Agreement  (on demand, with limits)</text><line x1=\"80.0\" y1=\"370\" x2=\"474.0\" y2=\"370\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 366 L480.0 370 L472.0 374 Z\" fill=\"#1c2024\"/><text x=\"280.0\" y=\"364\" text-anchor=\"middle\" class=\"ms\">Open details.url</text><line x1=\"480.0\" y1=\"404\" x2=\"286.0\" y2=\"404\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M288.0 400 L280.0 404 L288.0 408 Z\" fill=\"#1c2024\"/><text x=\"380.0\" y=\"398\" text-anchor=\"middle\" class=\"ms\">Authorise the Agreement</text><line x1=\"280.0\" y1=\"438\" x2=\"86.0\" y2=\"438\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 434 L80.0 438 L88.0 442 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"432\" text-anchor=\"middle\" class=\"ms\">agreement.activated webhook</text><line x1=\"80.0\" y1=\"472\" x2=\"274.0\" y2=\"472\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 468 L280.0 472 L272.0 476 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"466\" text-anchor=\"middle\" class=\"ms\">Charge under the Agreement</text><line x1=\"280.0\" y1=\"506\" x2=\"86.0\" y2=\"506\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 502 L80.0 506 L88.0 510 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"500\" text-anchor=\"middle\" class=\"ms\">charge.captured webhook</text></svg>"
      }
    ],
    "endpoints": [
      "POST /oauth2/token",
      "POST /v4/payment-charges",
      "GET /v4/payment-charges/{charge_id}",
      "POST /v4/payment-agreements",
      "GET /v4/payment-agreements/{agreement_id}",
      "POST /v4/payment-agreements/{agreement_id}/payment-charges"
    ],
    "links": [
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/sandbox-testing",
        "label": "Testing your integration"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/one-time-payments",
        "label": "Accept a one-time payment"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/set-up-recurring-payments",
        "label": "Set up recurring payments"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/webhooks-1",
        "label": "Set up webhooks"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/errors-and-troubleshooting",
        "label": "Errors and troubleshooting"
      }
    ]
  },
  "pay": {
    "title": "Payouts",
    "sub": "Server-to-server outbound transfers to UAE bank accounts. No customer-facing screen.",
    "pre": [
      "Authenticate with the Lean API.",
      "Fund the payout account.",
      "Your webhook endpoint receiving <code>payment_source.beneficiary.created</code>, <code>payment_intent.created</code>, <code>payment.created</code> and <code>payment.updated</code>."
    ],
    "steps": [
      "Create the payout destination: <code>POST /payouts/v1/payment/destinations</code> with the beneficiary’s details. Wait for <code>payment_source.beneficiary.created</code> before making a payout to it.",
      "Create the payout: <code>POST /payouts/v1/payment</code> with an idempotency key so retries never double-pay.",
      "Track each payout: <code>payment_intent.created</code> arrives for each payment in the payout; <code>payment.created</code> carries its first status (<code>AWAITING_AUTHORIZATION</code> or <code>FAILED</code>); then <code>payment.updated</code> carries the bank’s status (<code>AUTHORIZATION_FAILED</code>, <code>ACCEPTED_BY_BANK</code>, <code>PENDING_WITH_BANK</code> or <code>FAILED</code>). <code>ACCEPTED_BY_BANK</code> isn’t a completed payment until the funds are reconciled. Read the final outcome from <code>post_initiation_status</code> (<code>PROCESSED</code> or <code>REJECTED</code>), also available from <code>GET /payouts/v1/{payoutId}</code>. Handle failed payouts and retries explicitly.",
      "Test in Sandbox: a successful payout, a failed payout and retry, and a duplicate <code>payment.created</code> delivery."
    ],
    "endpoints": [
      "POST /payouts/v1/payment/destinations",
      "POST /payouts/v1/payment"
    ],
    "links": [
      {
        "url": "https://docs.leantech.me/docs/single-payment-mechanism",
        "label": "Making Payouts using Single Payment Mechanism"
      },
      {
        "url": "https://docs.leantech.me/docs/making-payments",
        "label": "Making Payments (payment statuses)"
      }
    ],
    "note": "Existing payout endpoints remain supported as the v4 payout surface rolls out.",
    "diagrams": [
      {
        "title": "",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 346\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lb{font:700 11.5px Arial,Helvetica,sans-serif;fill:#1c2024}.ms{font:500 10.5px Arial,Helvetica,sans-serif;fill:#1c2024}.mm{font:italic 500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><line x1=\"80.0\" y1=\"36\" x2=\"80.0\" y2=\"336\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"5.0\" y=\"6\" width=\"150\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"80.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">{client} backend</text><line x1=\"280.0\" y1=\"36\" x2=\"280.0\" y2=\"336\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"232.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"280.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Lean</text><line x1=\"480.0\" y1=\"36\" x2=\"480.0\" y2=\"336\" stroke=\"#e5e7eb\" stroke-width=\"1.5\"/><rect x=\"432.0\" y=\"6\" width=\"96\" height=\"24\" rx=\"7\" fill=\"#f3f4f6\" stroke=\"#e5e7eb\"/><text x=\"480.0\" y=\"22\" text-anchor=\"middle\" class=\"lb\">Bank</text><line x1=\"80.0\" y1=\"64\" x2=\"274.0\" y2=\"64\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 60 L280.0 64 L272.0 68 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"58\" text-anchor=\"middle\" class=\"ms\">Create payout destination</text><line x1=\"280.0\" y1=\"98\" x2=\"86.0\" y2=\"98\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 94 L80.0 98 L88.0 102 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"92\" text-anchor=\"middle\" class=\"ms\">payment_source.beneficiary.created webhook</text><line x1=\"80.0\" y1=\"132\" x2=\"274.0\" y2=\"132\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 128 L280.0 132 L272.0 136 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"126\" text-anchor=\"middle\" class=\"ms\">Create payout  (POST /payouts/v1/payment)</text><line x1=\"280.0\" y1=\"166\" x2=\"86.0\" y2=\"166\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 162 L80.0 166 L88.0 170 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"160\" text-anchor=\"middle\" class=\"ms\">payment_intent.created webhook</text><line x1=\"280.0\" y1=\"200\" x2=\"86.0\" y2=\"200\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 196 L80.0 200 L88.0 204 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"194\" text-anchor=\"middle\" class=\"ms\">payment.created webhook  (AWAITING_AUTHORIZATION)</text><line x1=\"280.0\" y1=\"234\" x2=\"474.0\" y2=\"234\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M472.0 230 L480.0 234 L472.0 238 Z\" fill=\"#1c2024\"/><text x=\"380.0\" y=\"228\" text-anchor=\"middle\" class=\"ms\">Payment submitted to the bank</text><line x1=\"280.0\" y1=\"268\" x2=\"86.0\" y2=\"268\" stroke=\"#6b7280\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M88.0 264 L80.0 268 L88.0 272 Z\" fill=\"#6b7280\"/><text x=\"180.0\" y=\"262\" text-anchor=\"middle\" class=\"ms\">payment.updated webhook  (bank status)</text><line x1=\"80.0\" y1=\"302\" x2=\"274.0\" y2=\"302\" stroke=\"#1c2024\" stroke-width=\"1.6\"/><path d=\"M272.0 298 L280.0 302 L272.0 306 Z\" fill=\"#1c2024\"/><text x=\"180.0\" y=\"296\" text-anchor=\"middle\" class=\"ms\">GET /payouts/v1/{payoutId}: post_initiation_status</text></svg>"
      }
    ]
  },
  "cmi": {
    "title": "Consent Management Interface (CMI)",
    "sub": "Build Lean’s CMI natively in your app: users see their Pay by Bank agreements and payments, and can revoke an agreement. Lean signs it off at three gates before Pay by Bank goes live in production.",
    "pre": [
      "Lean’s Native CMI Implementation Requirements, and the CMI screens in Figma (see Design reference). The native CMI replaces the Link SDK’s <code>manageConsents()</code> function.",
      "One-Time and Recurring Payments built: the CMI reads the [[agreement|Agreements]] and [[charge|Charges]] they create."
    ],
    "diagrams": [
      {
        "title": "Sign-off: three gates before go-live",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 112\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lt{font:700 11px Arial,Helvetica,sans-serif;fill:#1c2024}.ld{font:500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><rect x=\"17.6\" y=\"14\" width=\"118.0\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"17.6\" y=\"14\" width=\"118.0\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"76.6\" y=\"44\" text-anchor=\"middle\" class=\"lt\">1. Design review</text><text x=\"76.6\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Figma for every screen</text><text x=\"76.6\" y=\"81\" text-anchor=\"middle\" class=\"ld\">and state</text><line x1=\"138.6\" y1=\"56\" x2=\"144.2\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M142.2 52 L150.2 56 L142.2 60 Z\" fill=\"#1c2024\"/><rect x=\"153.2\" y=\"14\" width=\"118.0\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"153.2\" y=\"14\" width=\"118.0\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"212.2\" y=\"44\" text-anchor=\"middle\" class=\"lt\">2. Sandbox review</text><text x=\"212.2\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Demo, recordings</text><text x=\"212.2\" y=\"81\" text-anchor=\"middle\" class=\"ld\">and acceptance criteria</text><line x1=\"274.2\" y1=\"56\" x2=\"279.8\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M277.8 52 L285.8 56 L277.8 60 Z\" fill=\"#1c2024\"/><rect x=\"288.8\" y=\"14\" width=\"118.0\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"288.8\" y=\"14\" width=\"118.0\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"347.8\" y=\"44\" text-anchor=\"middle\" class=\"lt\">3. Production</text><text x=\"347.8\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Same build as signed off;</text><text x=\"347.8\" y=\"81\" text-anchor=\"middle\" class=\"ld\">Lean confirms in writing</text><line x1=\"409.8\" y1=\"56\" x2=\"415.4\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M413.4 52 L421.4 56 L413.4 60 Z\" fill=\"#1c2024\"/><rect x=\"424.4\" y=\"14\" width=\"118.0\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"424.4\" y=\"14\" width=\"118.0\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"483.4\" y=\"44\" text-anchor=\"middle\" class=\"lt\">Go live</text><text x=\"483.4\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Pay by Bank in</text><text x=\"483.4\" y=\"81\" text-anchor=\"middle\" class=\"ld\">production</text></svg>"
      },
      {
        "title": "Revocation: one API call, only after Confirm",
        "svg": "<svg class=\"seqsvg\" viewBox=\"0 0 560 112\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\"><style>.lt{font:700 11px Arial,Helvetica,sans-serif;fill:#1c2024}.ld{font:500 10.5px Arial,Helvetica,sans-serif;fill:#6b7280}</style><rect x=\"17.6\" y=\"14\" width=\"118.0\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"17.6\" y=\"14\" width=\"118.0\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"76.6\" y=\"44\" text-anchor=\"middle\" class=\"lt\">Consent details</text><text x=\"76.6\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Active agreement:</text><text x=\"76.6\" y=\"81\" text-anchor=\"middle\" class=\"ld\">Cancel permission</text><line x1=\"138.6\" y1=\"56\" x2=\"144.2\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M142.2 52 L150.2 56 L142.2 60 Z\" fill=\"#1c2024\"/><rect x=\"153.2\" y=\"14\" width=\"118.0\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"153.2\" y=\"14\" width=\"118.0\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"212.2\" y=\"44\" text-anchor=\"middle\" class=\"lt\">Confirmation</text><text x=\"212.2\" y=\"66\" text-anchor=\"middle\" class=\"ld\">No API call</text><text x=\"212.2\" y=\"81\" text-anchor=\"middle\" class=\"ld\">until Confirm</text><line x1=\"274.2\" y1=\"56\" x2=\"279.8\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M277.8 52 L285.8 56 L277.8 60 Z\" fill=\"#1c2024\"/><rect x=\"288.8\" y=\"14\" width=\"118.0\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"288.8\" y=\"14\" width=\"118.0\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"347.8\" y=\"44\" text-anchor=\"middle\" class=\"lt\">Revoke</text><text x=\"347.8\" y=\"66\" text-anchor=\"middle\" class=\"ld\">POST …/revocations</text><text x=\"347.8\" y=\"81\" text-anchor=\"middle\" class=\"ld\">on Confirm only</text><line x1=\"409.8\" y1=\"56\" x2=\"415.4\" y2=\"56\" stroke=\"#1c2024\" stroke-width=\"1.5\"/><path d=\"M413.4 52 L421.4 56 L413.4 60 Z\" fill=\"#1c2024\"/><rect x=\"424.4\" y=\"14\" width=\"118.0\" height=\"84\" rx=\"10\" fill=\"#fff\" stroke=\"#e5e7eb\"/><rect x=\"424.4\" y=\"14\" width=\"118.0\" height=\"5\" rx=\"2\" style=\"fill:var(--bright)\"/><text x=\"483.4\" y=\"44\" text-anchor=\"middle\" class=\"lt\">Result</text><text x=\"483.4\" y=\"66\" text-anchor=\"middle\" class=\"ld\">Success, or failure</text><text x=\"483.4\" y=\"81\" text-anchor=\"middle\" class=\"ld\">(error or 30 s timeout)</text></svg>"
      }
    ],
    "mindful": [
      "Server-to-server only: the Lean token and client secret stay on your backend, never in the app. The app talks only to your backend.",
      "Customer scope is your check: Lean’s reads are scoped to your application, not the customer. Check <code>customer_id</code> on every read, including IDs sent from the app, and never return records that fail it.",
      "The list endpoints can’t filter by <code>customer_id</code>, so don’t build a user’s CMI from them: store every <code>agreement_id</code> and one-time <code>charge_id</code> against the user, and read them back by ID.",
      "Phase 1 builds Payments only. Design the Data screens for sign-off, but keep the Data tab hidden from users until Lean issues the Data requirements."
    ],
    "stepGroups": [
      {
        "title": "1. Gate 1 · Design review",
        "steps": [
          "<span class=\"st-ref\">Sections 2 and 4</span><b class=\"st-title\">Design every CMI screen and state</b><div class=\"st-story\">As Lean, we can review every CMI screen and state in your designs before you build.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Covers the Payments list, payment consent details (Active, Revoked, Expired), Terms, Payment history, payment details, and the revocation confirmation, success and failure screens (sections 5 to 8).</li><li>Covers the loading, empty, no-results and error states (section 9, STA-01 to STA-07).</li><li>Uses Lean’s consent design system in light mode (Reference: design system), not your own design system.</li><li>Matches the frames in Lean’s Figma.</li></ul>",
          "<span class=\"st-ref\">Sections 3.8, 5.3 and 6</span><b class=\"st-title\">Design the Data screens</b><div class=\"st-story\">As Lean, we can review the Data screens now, so they’re ready when Data ships.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Covers the Data list, and data consent details in Active, Expired and Revoked, with the copy in sections 5.3 and 6.</li><li>Tapping a Data tile opens that consent’s details (DAT-01), and the list has no Connect another account footer (DAT-02).</li><li>Cancel permission on an Active data consent starts the data revocation flow (DAT-05). No Pause button unless you build pause / resume (DAT-03), and no footer action on Expired or Revoked (DAT-04).</li><li>Permission labels use the three labels in the WISE CMI DESIGNS / active data consent frame, in that order.</li><li>Not built or shown to users in Phase 1. When Data goes live, Lean confirms the default tab and whether an empty tab is hidden or shows its empty state (GEN-05).</li></ul>",
          "<span class=\"st-ref\">GEN-06</span><b class=\"st-title\">Design Arabic, right to left</b><div class=\"st-story\">As an Arabic-speaking user, I can use the CMI in Arabic.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Screens are mirrored, text is right-aligned and directional icons are flipped.</li><li>Required at launch.</li></ul>",
          "<span class=\"st-ref\">Section 2, Gate 1</span><b class=\"st-title\">Get the design review signed off</b><div class=\"st-story\">As your team, we have Lean’s sign-off on the designs before we build.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Figma (or equivalent) for every screen and state in sections 5 to 9 is shared with Lean.</li><li>Lean has checked it against its designs and the acceptance criteria in section 10, and signed it off.</li></ul>"
        ]
      },
      {
        "title": "2. Build · Data and APIs",
        "steps": [
          "<span class=\"st-ref\">Section 3.2</span><b class=\"st-title\">Store consent IDs against the user</b><div class=\"st-story\">As your backend, I keep every agreement and one-time charge ID against the user who created it, so the CMI only reads that user’s records.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Every <code>agreement_id</code> from <code>POST /v4/payment-agreements</code> is stored against the user.</li><li>Every one-time <code>charge_id</code> from <code>POST /v4/payment-charges</code> is stored against the user.</li><li>The CMI is never built from the agreement or charge list endpoints: they can’t filter by <code>customer_id</code>, and no filter is planned.</li></ul>",
          "<span class=\"st-ref\">Sections 3.2 and 3.3</span><b class=\"st-title\">Read consents and payments by ID</b><div class=\"st-story\">As your backend, I fetch each user’s consents and payments from Lean by ID.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>An access token from <code>POST /oauth2/token</code> with a form body of <code>client_id</code>, <code>client_secret</code>, <code>grant_type=client_credentials</code> and <code>scope=api</code> (L1), sent as <code>Authorization: Bearer &lt;token&gt;</code>. Auth host: <code>https://auth.sandbox.leantech.me</code> in Sandbox, <code>https://auth.leantech.me</code> in production.</li><li>API base: <code>https://sandbox.leantech.me</code> in Sandbox, <code>https://api2.leantech.me</code> in production.</li><li>Agreements by ID (L2); one-time charges by ID (L4).</li><li>Charges per agreement, following <code>next_cursor</code> until <code>has_more</code> is false, <code>page_size</code> up to 100 (L3).</li><li>The payer’s [[instrument|Payment Instrument]] (L5), and the bank name and logo from <code>GET /banks/v1</code>, matched on <code>swift_code</code> and cached (L6). Lean provides the bank names and logos.</li></ul>",
          "<span class=\"st-ref\">Section 3.2</span><b class=\"st-title\">Return only the user’s own records</b><div class=\"st-story\">As a user, I only ever see my own consents and payments.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Every read checks that <code>customer_id</code> is the signed-in user’s Lean customer, including IDs sent from the app.</li><li>Records that fail the check are never returned.</li></ul>",
          "<span class=\"st-ref\">PAY-02, section 3.4</span><b class=\"st-title\">Show the right records</b><div class=\"st-story\">As a user, I see my Pay by Bank permissions and payments, without pending or failed ones.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Payments tab: <code>PAY_BY_BANK</code> agreements only. <code>ACTIVE</code> under Active; <code>REVOKED</code> and <code>FULFILLED</code> under Expired (LPG has no EXPIRED status; FULFILLED shows as Expired).</li><li>Never shown: <code>PENDING_CUSTOMER_AUTHENTICATION</code>, <code>PENDING_PROVIDER_CONFIRMATION</code>, <code>DECLINED</code>, <code>DISCARDED</code>; <code>SUSPENDED</code> unless you build pause / resume (tell Lean first, and Lean designs the Paused state).</li><li>Payment history: the charges under those agreements plus stored one-time <code>PAY_BY_BANK</code> charges, hiding <code>PENDING_CUSTOMER_AUTHENTICATION</code>, <code>DISCARDED</code> and <code>VOIDED</code>.</li><li>Agreements are sorted by <code>created_at</code>, newest first; Payment history merges all charges, newest first.</li></ul>",
          "<span class=\"st-ref\">Sections 3.5 and 3.6</span><b class=\"st-title\">Map every field from Lean’s data</b><div class=\"st-story\">As a user, every value I see comes from Lean’s data.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Each field is mapped as in Reference: field mapping, including the purpose labels.</li><li>Total paid to date is the sum of <code>CAPTURED</code> charge amounts (LPG exposes no consumption totals).</li><li>A row is hidden when its source field is absent, including limit rows: no empty or “null” values, and no Figma placeholder text (<code>Label</code>, <code>Text</code>, <code>Badge</code>, <code>{{reference}}</code>).</li></ul>",
          "<span class=\"st-ref\">Section 3.7</span><b class=\"st-title\">Format amounts, dates and names</b><div class=\"st-story\">As a user, amounts, dates, IBANs and names look consistent everywhere.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>AED amounts use the UAE Dirham symbol (16 × 16) before the number, except Payment history rows and the payment details title, which use the “AED” prefix as designed.</li><li>Amounts are formatted from Lean’s decimal strings without floating point, with a comma thousands separator: 2 decimal places for totals and charges, and limits without decimals when whole.</li><li>Dates are DD/MM/YY on list subtitles and Data screens, and D MMMM YYYY on agreement details, Payment history and payment details. Lean’s timestamps are UTC: show them in the device time zone. “Last payment {when}” reads today, yesterday or D MMMM YYYY.</li><li>IBANs are masked as **** + last 4, except “Your IBAN”, shown in full and grouped in 4s.</li><li><code>{TPP}</code> and <code>{MerchantName}</code> are your company name, as a static string.</li></ul>",
          "<span class=\"st-ref\">Section 3.2</span><b class=\"st-title\">Keep consents up to date</b><div class=\"st-story\">As a user, I see the latest state of my consents, including revocations at my bank.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>The CMI re-fetches on every open and after every revocation.</li><li>On <code>agreement.activated</code>, <code>agreement.suspended</code>, <code>agreement.resumed</code>, <code>agreement.fulfilled</code>, <code>agreement.revoked</code>, <code>charge.captured</code>, <code>charge.declined</code> and <code>charge.discarded</code>, the resource is re-fetched.</li><li>Duplicate and out-of-order webhooks are handled. <code>agreement.revoked</code> carries a <code>source</code> of <code>MERCHANT</code>, <code>CUSTOMER</code> or <code>PROVIDER</code>; <code>PROVIDER</code> means it was revoked at the user’s bank.</li></ul>"
        ]
      },
      {
        "title": "3. Build · Screens",
        "steps": [
          "<span class=\"st-ref\">GEN-01 to GEN-04</span><b class=\"st-title\">Open the CMI</b><div class=\"st-story\">As a user, I can open my Open Finance connected accounts and switch between Payments and Payment history.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>The CMI opens as a bottom sheet over the scrim on your Connected accounts page, and Close dismisses it from every screen.</li><li>The tab selector sits at x24, 76 pt below the sheet top, in a 39 pt high tap area with radius 14 (Tab selector style). It opens a picker with Data, Payments and Payment history, in that order, and the selected option becomes its label.</li><li>It opens on Payments, and the Data option is hidden in Phase 1.</li></ul>",
          "<span class=\"st-ref\">PAY-01, section 5.2</span><b class=\"st-title\">See and search my payment permissions</b><div class=\"st-story\">As a user, I can see my payment permissions grouped into Active and Expired, and search them by bank name.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Header: Close only, the company avatar, the title “Open Finance connected accounts”, and the description “You have given us payment permissions for these accounts. Tap on each option to view, update or cancel your permission.” with a “Read more” link (URL from Lean). Drop “update” unless you build update.</li><li>A “Search consents” field filters both groups by bank name, case-insensitive, as I type; a group with no consents hides its heading (STA-03).</li><li>Active tile: bank avatar and name, “Last payment {when}”, “Expires on {DD/MM/YY}”, and the total paid on the right with a chevron.</li><li>Expired tile: “Permission cancelled {DD/MM/YY}” when revoked, or “Expired on {DD/MM/YY}”, with a chevron and no amount column. The optional line can show “Total paid {Dirham} {amount}”; account type has no LPG field, so it’s hidden (Q20).</li><li>Tapping a tile opens its details. No Connect another account control is shown.</li></ul>",
          "<span class=\"st-ref\">PAY-03, PAY-07, section 7.1</span><b class=\"st-title\">View a permission’s details</b><div class=\"st-story\">As a user, I can see the full details of a payment permission.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Bank name with its status badge, and “To make instant payments with Wise you gave us your consent to your {Bank name} accounts since {DD/MM/YY}.”</li><li>Total paid to date, consent ID, where the money was sent (masked IBAN) and purpose.</li><li>Payment rules: start and expiry dates and each limit, each hidden when absent.</li><li>The “Permission to check balance” and “Share account details” tiles with their copy, and a Terms tile.</li><li>Last payment made, its amount, the from account (bank name and masked IBAN), and a Payment history link filtered to this agreement (PAY-07).</li><li>Values stay on one line, right-aligned, and truncate with an ellipsis (PAY-03).</li></ul>",
          "<span class=\"st-ref\">PAY-04, PAY-05</span><b class=\"st-title\">Cancel permission only when active</b><div class=\"st-story\">As a user, I can cancel an active permission; expired and revoked ones are shown for reference only.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Cancel permission is shown on Active agreements only.</li><li>It is never shown on Revoked or Expired, even though the revoked Figma frame shows it.</li><li>Tapping it starts the revocation flow.</li></ul>",
          "<span class=\"st-ref\">PAY-06</span><b class=\"st-title\">Read the terms</b><div class=\"st-story\">As a user, I can read the End user agreement and Privacy Policy.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>The Terms screen lists both, and each opens in an in-app browser.</li><li>URLs are supplied by Lean (open item Q13).</li></ul>",
          "<span class=\"st-ref\">HIS-01, HIS-02</span><b class=\"st-title\">See my payment history</b><div class=\"st-story\">As a user, I can see the payments made from my connected accounts, newest first.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Header: Close only, the company avatar, the title “Payment history” and “A record of the payments made from your connected accounts.”</li><li>Each row shows the bank avatar, amount, date, status badge (Successful, Pending, Rejected) and a chevron.</li><li>Successful, Pending and Rejected rows open payment details.</li><li>More payments load as I scroll (HIS-02); SHOULD show a spinner row at the end while the next page loads (STA-02).</li></ul>",
          "<span class=\"st-ref\">HIS-03, HIS-04</span><b class=\"st-title\">View a payment’s details</b><div class=\"st-story\">As a user, I can see a payment’s details and copy its references.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Title “AED {amount}”, “Paid to {recipient name}” (the static company name), and the amount, status and date.</li><li>The title amount and the Amount row show the same value.</li><li>Paid to with masked IBAN, paid from, and my IBAN in full.</li><li>Payment frequency (“On demand” or “One-time”), consent ID (hidden for one-time payments) and description.</li><li>The copy icon copies the full value (HIS-03 MUST), and SHOULD confirm with your standard toast.</li></ul>",
          "<span class=\"st-ref\">STA-01 to STA-07</span><b class=\"st-title\">Loading, empty and error states</b><div class=\"st-story\">As a user, I can always tell whether the CMI is loading, empty or has failed.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>SHOULD: skeleton rows while loading (Skeleton_Description-List), with the header shown straight away (STA-01).</li><li>An empty tab shows its title and description, hides search, and shows an empty message; no search results hides both groups and shows a no-results message (copy reviewed by Lean).</li><li>A failed fetch keeps the header, shows an inline error with Retry, and never shows stale data as current.</li><li>When a bank logo fails, its initials show on the bank’s <code>main_color</code>.</li></ul>",
          "<span class=\"st-ref\">STA-08</span><b class=\"st-title\">Accessible for everyone</b><div class=\"st-story\">As a user of assistive technology, I can use every CMI screen.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Every tap target is at least 44 × 44 pt.</li><li>Badges, icons and avatar pairs have screen-reader labels, for example “Status: Active”.</li></ul>"
        ]
      },
      {
        "title": "4. Build · Revocation",
        "steps": [
          "<span class=\"st-ref\">REV-01</span><b class=\"st-title\">Confirm before cancelling</b><div class=\"st-story\">As a user, I’m asked to confirm before a permission is cancelled.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Cancel permission opens the confirmation screen, with no API call yet.</li><li>Cancel or Back returns to the consent details unchanged; Close dismisses the CMI.</li><li>The revocation call is made only when I tap Confirm.</li></ul>",
          "<span class=\"st-ref\">Sections 8.2 to 8.4</span><b class=\"st-title\">Confirmation, success and failure screens</b><div class=\"st-story\">As a user, I understand what cancelling means, and whether it worked.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Confirmation: title “The impact to your service”; “You are about to disconnect your {LFI} accounts, so we will no longer be able to initiate payments on demand with {MerchantName}”; the “What are the implications?” block; the payer account (L5) under “The accounts you shared access to”; the Privacy Notice footnote; and “Are you sure you want to disconnect this account from our service?” with Confirm (Al Tareq primary) and Cancel (Al Tareq outline).</li><li>Payments use the payment-specific success screen and implications copy from Lean’s CMI revocation flow Figma, which Lean is to link (open item Q11).</li><li>Success: check-circled icon on its ripple, “Disconnection successful”, its body copy, a Close button and the Privacy Notice footnote.</li><li>Failure: exclamation-triangle icon, “Disconnection failed” and “We couldn’t disconnect your accounts from {LFI} at this moment. Please try again later.”</li></ul>",
          "<span class=\"st-ref\">REV-02</span><b class=\"st-title\">Revoke once, safely</b><div class=\"st-story\">As your backend, I revoke an agreement exactly once per confirmation.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>On Confirm, both buttons are disabled and Confirm shows a spinner.</li><li>The call is <code>POST /v4/payment-agreements/{agreement_id}/revocations</code> with a new [[idempotency|Idempotency-Key]] per confirmation and <code>{&quot;reason&quot;:&quot;END_USER_REQUESTED&quot;}</code>.</li><li>Double taps and back-and-retry make no duplicate calls; retrying the same confirmation reuses the same key.</li></ul>",
          "<span class=\"st-ref\">Sections 3.3 and 8.1</span><b class=\"st-title\">Handle the result</b><div class=\"st-story\">As a user, I’m shown the right result.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Success on 200, or on 409 when re-fetching the agreement shows <code>REVOKED</code> (for example, already revoked at the bank).</li><li>Failure on 400, 404, 5xx, or no response within 30 seconds, with the consent unchanged.</li></ul>",
          "<span class=\"st-ref\">REV-03</span><b class=\"st-title\">Return to an up-to-date list</b><div class=\"st-story\">As a user, I return to an up-to-date list after cancelling.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>There’s no way back from success or failure to the confirmation screen.</li><li>Close on success returns to the re-fetched list, with the agreement under Expired and “Permission cancelled {today}”.</li><li>Close on failure returns to the consent details, unchanged.</li></ul>"
        ]
      },
      {
        "title": "5. Gate 2 · Sandbox build review",
        "steps": [
          "<span class=\"st-ref\">Section 2, Gate 2</span><b class=\"st-title\">Demo the build in Sandbox</b><div class=\"st-story\">As Lean, we can see the build working against Sandbox.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>The demo runs against <code>sandbox.leantech.me</code> with agreements in every displayed status (ACTIVE, REVOKED, FULFILLED) and charges in every displayed status.</li><li>Screen recordings show the agreement revocation flow end to end, including the failure state.</li><li>Data screens are reviewed as designs only.</li></ul>",
          "<span class=\"st-ref\">Section 10</span><b class=\"st-title\">Visual and copy parity</b><div class=\"st-story\">As Lean, we can confirm the build matches the designs.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Every screen in sections 5 to 8 matches its Figma frame 1:1: layout, spacing, radii, colours, type and icons.</li><li>All copy matches sections 5 to 8 word for word, including punctuation and capitalisation.</li><li>The Al Tareq gradient, button variants and status badges match the design system, and no placeholder text appears anywhere.</li></ul>",
          "<span class=\"st-ref\">Section 10</span><b class=\"st-title\">Data and scope</b><div class=\"st-story\">As Lean, we can confirm the CMI shows the right data.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>The Payments tab shows <code>PAY_BY_BANK</code> agreements only; Payment history shows their charges plus one-time <code>PAY_BY_BANK</code> charges.</li><li>Every Payments field matches the LPG response for at least one agreement and charge in each displayed status; null fields hide their row; amounts, dates and IBANs follow section 3.7.</li><li>View and revoke work end to end. Pending, DECLINED and DISCARDED agreements never appear, the Data tab is hidden, and no Connect another account control is shown.</li><li>Update, pause / resume and reconfirm controls appear only if you build them, and pass Lean review.</li><li>An agreement’s status reflects a revocation at the bank after <code>agreement.revoked</code> or on next open.</li></ul>",
          "<span class=\"st-ref\">Section 10</span><b class=\"st-title\">Revocation and security</b><div class=\"st-story\">As Lean, we can confirm revocation works and users’ data is protected.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Revocation completes end to end in Sandbox, and the agreement moves to Expired with the Revoked badge.</li><li>No API call before Confirm, no duplicate calls on double tap, and the failure screen shows on an error or timeout. Cancel and Back leave the consent unchanged.</li><li>The Lean token is never in the app bundle or the app’s network traffic.</li><li>A user can only see and revoke consents for their own <code>customer_id</code>.</li></ul>"
        ]
      },
      {
        "title": "6. Gate 3 · Production readiness",
        "steps": [
          "<span class=\"st-ref\">Section 2, Gate 3</span><b class=\"st-title\">Production sign-off</b><div class=\"st-story\">As your team, we can take Pay by Bank live once Lean has signed off production.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>The production build is identical to the signed-off sandbox build.</li><li>Lean has confirmed in writing. This is a precondition for Pay by Bank going live in production with real users, not only for releasing the CMI screens.</li></ul>",
          "<span class=\"st-ref\">Section 2, Gate 3</span><b class=\"st-title\">Changes after go-live</b><div class=\"st-story\">As Lean, we review any CMI change before it’s released.</div><div class=\"st-ac-h\">Acceptance criteria</div><ul class=\"st-ac\"><li>Any change to CMI screens, copy or data mapping gets a fresh Lean review before release.</li></ul>"
        ]
      }
    ],
    "extraTitle": "Optional (MAY): if you build any of these, Lean reviews and signs them off",
    "extra": [
      "Update, pause / resume or reconfirm of consents. Pause / resume use <code>POST /v4/payment-agreements/{agreement_id}/pauses</code> and <code>POST /v4/payment-agreements/{agreement_id}/resumptions</code>. If you build reconfirm, you set the threshold and copy for the “Expires in {X} days, tap to reconfirm” line.",
      "Dark mode."
    ],
    "sections": [
      {
        "title": "Reference: API calls",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>#</th><th>Call</th><th>Used for</th><th>Notes</th></tr></thead><tbody><tr><td>L1</td><td><code>POST /oauth2/token</code></td><td>Access token</td><td><code>scope=api</code>. Production auth host: <code>https://auth.leantech.me</code>.</td></tr><tr><td>L2</td><td><code>GET /v4/payment-agreements/{agreement_id}</code></td><td>Payments list, agreement details</td><td>One call per stored <code>agreement_id</code>.</td></tr><tr><td>L3</td><td><code>GET /v4/payment-agreements/{agreement_id}/payment-charges</code></td><td>Payment history, total paid, last payment</td><td>Cursor pagination, newest first: follow <code>next_cursor</code> until <code>has_more</code> is false; <code>page_size</code> up to 100.</td></tr><tr><td>L4</td><td><code>GET /v4/payment-charges/{charge_id}</code></td><td>Payment details; one-time charges in Payment history</td><td>Stored <code>charge_id</code>.</td></tr><tr><td>L5</td><td><code>GET /v4/payment-instruments/{instrument_id}</code></td><td>Payer account: <code>details.iban</code>, <code>details.holder_name</code>, <code>details.swift_code</code></td><td><code>instrument_id</code> from L2, L3 or L4.</td></tr><tr><td>L6</td><td><code>GET /banks/v1</code></td><td>Bank name and logo</td><td>Match on <code>swift_code</code>; cache. Lean provides bank names and logos.</td></tr><tr><td>L7</td><td><code>POST /v4/payment-agreements/{agreement_id}/revocations</code></td><td>Revoke an agreement</td><td>Header <code>Idempotency-Key</code> (required); body <code>{&quot;reason&quot;:&quot;END_USER_REQUESTED&quot;}</code>. 200: revoked. 409: re-fetch L2; REVOKED means success. 400, 404, 5xx or timeout: failure screen.</td></tr><tr><td></td><td><code>GET /v4/payment-agreements/{agreement_id}/revocations</code></td><td>Read an agreement’s revocations</td><td></td></tr><tr><td></td><td><code>POST /v4/payment-agreements/{agreement_id}/pauses</code></td><td>Pause an agreement</td><td>Only if you build pause / resume (optional).</td></tr><tr><td></td><td><code>GET /v4/payment-agreements/{agreement_id}/pauses</code></td><td>Read an agreement’s pauses</td><td>Only if you build pause / resume.</td></tr><tr><td></td><td><code>POST /v4/payment-agreements/{agreement_id}/resumptions</code></td><td>Resume a paused agreement</td><td>Only if you build pause / resume (optional).</td></tr><tr><td></td><td><code>GET /v4/payment-agreements/{agreement_id}/resumptions</code></td><td>Read an agreement’s resumptions</td><td>Only if you build pause / resume.</td></tr></tbody></table></div><p class=\"sp-note\">API base: <code>https://sandbox.leantech.me</code> in Sandbox and <code>https://api2.leantech.me</code> in production. Auth: <code>https://auth.sandbox.leantech.me</code> and <code>https://auth.leantech.me</code>. Header <code>Authorization: Bearer &lt;token&gt;</code>.</p>"
      },
      {
        "title": "Reference: which records to show",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>List</th><th>“Active”</th><th>“Expired”</th><th>Never shown</th></tr></thead><tbody><tr><td>Payments tab (stored agreements, <code>PAY_BY_BANK</code>)</td><td><code>ACTIVE</code></td><td><code>REVOKED</code>, <code>FULFILLED</code> (shows as Expired)</td><td><code>PENDING_CUSTOMER_AUTHENTICATION</code>, <code>PENDING_PROVIDER_CONFIRMATION</code>, <code>DECLINED</code>, <code>DISCARDED</code>; <code>SUSPENDED</code> unless pause / resume is built</td></tr><tr><td>Payment history (charges under those agreements, plus stored one-time <code>PAY_BY_BANK</code> charges)</td><td>None</td><td>None</td><td><code>PENDING_CUSTOMER_AUTHENTICATION</code>, <code>DISCARDED</code>, <code>VOIDED</code></td></tr></tbody></table></div><p class=\"sp-note\">Sort agreements by <code>created_at</code>, newest first. Payment history: merge all charges, newest first.</p>"
      },
      {
        "title": "Reference: field mapping",
        "collapsible": true,
        "html": "<div class=\"sp-sub-h\">Agreements (Payments tab)</div><div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>UI element</th><th>Source</th></tr></thead><tbody><tr><td>Bank name and avatar</td><td>L2 <code>instrument_id</code> → L5 <code>details.swift_code</code> → L6 name and logo; fallback initials</td></tr><tr><td>Status badge</td><td><code>ACTIVE</code> Active · <code>REVOKED</code> Revoked · <code>FULFILLED</code> Expired</td></tr><tr><td>“since {DD/MM/YY}”, Start date</td><td><code>created_at</code></td></tr><tr><td>Total paid to date</td><td>Sum of L3 <code>amount.value</code> where status is <code>CAPTURED</code> (no consumption totals on LPG)</td></tr><tr><td>Consent ID</td><td><code>id</code>: first 6 + … + last 9</td></tr><tr><td>IBAN (Where we were sending money)</td><td><code>settlement_accounts[0]</code>: your own settlement account IBAN, masked</td></tr><tr><td>Purpose</td><td><code>purpose_code</code> → label; hide if absent</td></tr><tr><td>Expiry date</td><td><code>limits.expiration_date</code></td></tr><tr><td>Total payments allowed · Total value allowed · Max. value per payment</td><td><code>limits.agreement_max_charges_count</code> · <code>limits.agreement_max_total_amount.value</code> · <code>limits.per_charge_max_amount.value</code>; each row hidden when absent</td></tr><tr><td>Reference; Limits every; Max. payments per {period}</td><td>No LPG field: hide</td></tr><tr><td>List: “Last payment {when}”</td><td>Latest L3 <code>created_at</code>: today, yesterday or D MMMM YYYY</td></tr><tr><td>List: “Expires on”</td><td><code>limits.expiration_date</code>, DD/MM/YY</td></tr><tr><td>List (Expired): “Permission cancelled {DD/MM/YY}”</td><td><code>updated_at</code> when status is <code>REVOKED</code></td></tr><tr><td>List (Expired): “Expired on {DD/MM/YY}”</td><td><code>updated_at</code> when status is <code>FULFILLED</code></td></tr><tr><td>List: amount (right)</td><td>Total paid to date on the agreement</td></tr><tr><td>Max. value per payment</td><td><code>limits.per_charge_max_amount.value</code>, relabelled from “Max. value per {period}”</td></tr><tr><td>Account type</td><td>No LPG field: hide</td></tr></tbody></table></div><div class=\"sp-sub-h\">Charges (Payment history, payment details)</div><div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>UI element</th><th>Source</th></tr></thead><tbody><tr><td>Amount</td><td><code>amount.currency</code> + <code>amount.value</code></td></tr><tr><td>Date</td><td><code>created_at</code></td></tr><tr><td>Status badge</td><td><code>CAPTURED</code> Successful · <code>PENDING_PROVIDER_CONFIRMATION</code>, <code>PENDING_CAPTURE</code> Pending · <code>DECLINED</code> Rejected</td></tr><tr><td>Paid to</td><td>Static: your company name</td></tr><tr><td>Paid to → IBAN</td><td><code>settlement_account_id</code> → your settlement account IBAN, masked</td></tr><tr><td>Paid from · Your IBAN</td><td>L5 → L6 name · L5 <code>details.iban</code> in full, grouped in 4s</td></tr><tr><td>Payment frequency</td><td><code>agreement_id</code> set: “On demand”; null: “One-time”</td></tr><tr><td>Consent ID</td><td><code>agreement_id</code>; hide for one-time charges</td></tr><tr><td>Description</td><td><code>descriptor</code>, fallback <code>authorization_merchant_reference</code></td></tr><tr><td>Row avatar</td><td><code>instrument_id</code> → L5 → L6 logo, 40 × 40, radius 6</td></tr><tr><td>Amount (panel)</td><td><code>amount.value</code> with the Dirham symbol</td></tr></tbody></table></div><div class=\"sp-sub-h\">Purpose labels</div><div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Code</th><th>Label</th></tr></thead><tbody><tr><td><code>FIS</code></td><td>Financial services</td></tr><tr><td><code>TCS</code></td><td>Telecommunication services</td></tr><tr><td><code>OAT</code></td><td>Own account transfer</td></tr><tr><td><code>IFS</code></td><td>Information services</td></tr><tr><td><code>RNT</code></td><td>Rent payments</td></tr><tr><td><code>LNC</code></td><td>Loan charges</td></tr><tr><td><code>PIN</code></td><td>Personal investments</td></tr><tr><td><code>GDS</code></td><td>Goods bought or sold</td></tr></tbody></table></div>"
      },
      {
        "title": "Reference: design system",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>Area</th><th>Spec (from the requirements, section 4)</th></tr></thead><tbody><tr><td>Design system</td><td>Lean’s consent design system: Radix-based tokens, Slate neutrals, Inter, with Al Tareq branding on every consent action. Light mode only. Use these values, not your own design system, on all CMI screens.</td></tr><tr><td>Key colours</td><td>Page <code>#FFFFFF</code> · surface-darker (Slate 2) <code>#F9F9FB</code> · text-primary (Slate 12) <code>#1C2024</code> · text-secondary (Slate 10) <code>#7E808A</code> · surface-border (Slate A3) <code>#00003B</code> at 5.1% · overlay scrim (Slate A8) <code>#00082F</code> at 27.5%</td></tr><tr><td>Al Tareq gradient</td><td><code>linear-gradient(89deg, #00C8AF 0%, #015AD7 41%, #000000 96.5%)</code>: primary consent buttons and outline button borders</td></tr><tr><td>Typography</td><td>Inter. Heading 6 24/30 Medium (screen titles) · Text 5 20/28 Medium (hero amounts) · Button 4 18/26 Medium (CTAs) · Text 3 16/24 · Text 2 14/20 Medium and Regular · Text 1 12/16 Medium (badges, subtitles)</td></tr><tr><td>Shapes</td><td>Bottom sheet 64 pt from top, top radius 16 · payment panels radius 8, 24 pt margins, rows 44 pt · tiles radius 12 · pill buttons 48 high, radius 999 · list tiles 76 pt, avatar 40 radius 6</td></tr><tr><td>Badges</td><td>20 high, radius 3: Active Green 9 <code>#30A46C</code> · Expired Slate 9 <code>#8B8D98</code> · Revoked and Rejected soft red · Successful soft green · Pending soft yellow</td></tr></tbody></table></div><p class=\"sp-note\">The full colour, type, spacing, button and badge spec is in section 4 of Lean’s requirements, and on the <b>CMI design spec</b> section in the Figma file, next to the Consent management screens. The buttons and status badges there are components you can reuse.</p>"
      },
      {
        "title": "Reference: open items",
        "collapsible": true,
        "html": "<div class=\"sp-tablewrap\"><table class=\"sp-table\"><thead><tr><th>#</th><th>Open item</th><th>Owner</th></tr></thead><tbody><tr><td>Q7</td><td>Source for the Data list “Last updated on” (Data phase): coming soon</td><td>Lean eng</td></tr><tr><td>Q11</td><td>Payment-specific copy for the success screen and implications block: Lean to link the payments frames</td><td>Lean PM</td></tr><tr><td>Q13</td><td>URLs for End user agreement, Privacy Policy, Privacy Notice and “Read more”: Lean to supply</td><td>Lean PM</td></tr><tr><td>Q14</td><td>How to show SUSPENDED agreements: hidden by default; tell Lean if you want pause / resume, and Lean designs it</td><td>Lean PM</td></tr></tbody></table></div>"
      }
    ],
    "endpoints": [
      "POST /oauth2/token",
      "GET /v4/payment-agreements/{agreement_id}",
      "GET /v4/payment-agreements/{agreement_id}/payment-charges",
      "GET /v4/payment-charges/{charge_id}",
      "GET /v4/payment-instruments/{instrument_id}",
      "GET /banks/v1",
      "POST /v4/payment-agreements/{agreement_id}/revocations",
      "GET /v4/payment-agreements/{agreement_id}/revocations",
      "POST /v4/payment-agreements/{agreement_id}/pauses",
      "GET /v4/payment-agreements/{agreement_id}/pauses",
      "POST /v4/payment-agreements/{agreement_id}/resumptions",
      "GET /v4/payment-agreements/{agreement_id}/resumptions"
    ],
    "links": [
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/authentication",
        "label": "Authentication"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/set-up-recurring-payments",
        "label": "Set up recurring payments"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/payment-webhooks",
        "label": "Payment webhooks"
      },
      {
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/errors-and-troubleshooting",
        "label": "Errors"
      }
    ]
  }
};

// Endpoint chips that link to their page in Lean's v4 API reference (table and guides).
export const ENDPOINT_LINKS = {
  "GET /v4/payment-charges/{charge_id}/captures/{capture_id}": "https://docs.leantech.me/v4.0-GLOBAL/reference/getcapture",
  "POST /v4/payment-charges": "https://docs.leantech.me/v4.0-GLOBAL/reference/createpaymentcharge",
  "GET /v4/payment-charges/{id}": "https://docs.leantech.me/v4.0-GLOBAL/reference/getpaymentcharge",
  "GET /v4/payment-charges/{charge_id}": "https://docs.leantech.me/v4.0-GLOBAL/reference/getpaymentcharge",
  "POST /v4/payment-agreements": "https://docs.leantech.me/v4.0-GLOBAL/reference/createpaymentagreement",
  "GET /v4/payment-agreements/{id}": "https://docs.leantech.me/v4.0-GLOBAL/reference/getpaymentagreement",
  "GET /v4/payment-agreements/{agreement_id}": "https://docs.leantech.me/v4.0-GLOBAL/reference/getpaymentagreement",
  "POST /v4/payment-agreements/{id}/payment-charges": "https://docs.leantech.me/v4.0-GLOBAL/reference/createagreementcharge",
  "POST /v4/payment-agreements/{agreement_id}/payment-charges": "https://docs.leantech.me/v4.0-GLOBAL/reference/createagreementcharge",
  "POST /v4/payment-agreements/{id}/pauses": "https://docs.leantech.me/v4.0-GLOBAL/reference/pausepaymentagreement",
  "POST /v4/payment-agreements/{agreement_id}/pauses": "https://docs.leantech.me/v4.0-GLOBAL/reference/pausepaymentagreement",
  "POST /v4/payment-agreements/{id}/resumptions": "https://docs.leantech.me/v4.0-GLOBAL/reference/resumepaymentagreement",
  "POST /v4/payment-agreements/{agreement_id}/resumptions": "https://docs.leantech.me/v4.0-GLOBAL/reference/resumepaymentagreement",
  "POST /v4/payment-agreements/{id}/revocations": "https://docs.leantech.me/v4.0-GLOBAL/reference/revokepaymentagreement",
  "POST /v4/payment-agreements/{agreement_id}/revocations": "https://docs.leantech.me/v4.0-GLOBAL/reference/revokepaymentagreement",
  "POST /oauth2/token": "https://docs.leantech.me/v4.0-GLOBAL/reference/postoauth2token"
};

// Phase 0 · Setup: rows at the top of the plan table, for blueprints with a v4 payments product.
// refs are links shown under the row's endpoints; eventsHtml is optional extra content; panel is the row's guide.
// Checklist keys containing "-prod-" (production steps) are shown and can be ticked, but aren't counted in progress.
export const SETUP_GROUP = 'Phase 0 · Setup';
export const PREREQUISITES = [
  {
    "name": "Developer portal setup",
    "sub": "sandbox, then production",
    "apis": [],
    "refsLabel": "",
    "refs": [
      {
        "label": "Lean dev portal",
        "url": "https://dev.leantech.me/"
      },
      {
        "label": "Configuring your application",
        "url": "https://docs.leantech.me/docs/configuring-your-application"
      }
    ],
    "note": "In Sandbox mode: create an account and an application, share the sandbox app token with Lean and have Lean enable Open Finance. Then generate a client secret, add redirect URLs and your purpose and benefit statements, add your webhook endpoint and events, copy the webhook signing secret and create a test user. Once Lean upgrades you to production, follow the production steps.",
    "panel": "dev",
    "cardLine": "Developer portal: sandbox app token, credentials, redirect URLs, webhooks and a test user"
  },
  {
    "name": "Authentication and Settlement Account Setup",
    "sub": "before any API call",
    "apis": [
      "POST /oauth2/token",
      "POST /payments/v1/destinations"
    ],
    "refs": [],
    "note": "Get an access token with your app token and client secret and send it as a Bearer token on every call. Then create your Settlement Account with the API and store its id as settlement_account_id.",
    "panel": "start",
    "refsLabel": "",
    "cardLine": "Authentication and Settlement Account Setup: an access token for every API call, then your Settlement Account"
  },
  {
    "name": "Webhooks",
    "sub": "events, signatures, retries",
    "apis": [],
    "refsLabel": "",
    "refs": [
      {
        "label": "Set up webhooks",
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/webhooks-1"
      },
      {
        "label": "Payment webhooks",
        "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/payment-webhooks"
      }
    ],
    "note": "Verify the lean-signature header, return HTTP 200 within 10 seconds, deduplicate on event_id, and fetch current state when events arrive out of order.",
    "panel": "wh",
    "eventsHtml": "<span class=\"api-refs\" style=\"margin-bottom:6px\">Events to receive, under <b>Other</b> in the dev portal’s event list:</span><div class=\"evgroups\"><details class=\"evgroup\"><summary><span class=\"evt\">Charge events</span><span class=\"evs\">One-Time and Recurring Payments</span><span class=\"evn\">5</span></summary><div class=\"evlist\"><div class=\"ev\"><code>charge.created</code><span>A new Charge is created.</span></div><div class=\"ev\"><code>charge.authorized</code><span>The Charge is authorized.</span></div><div class=\"ev\"><code>charge.captured</code><span>The Charge is captured.</span></div><div class=\"ev\"><code>charge.declined</code><span>The payment was declined.</span></div><div class=\"ev\"><code>charge.discarded</code><span>Authentication wasn’t completed in time.</span></div></div></details><details class=\"evgroup\"><summary><span class=\"evt\">Agreement events</span><span class=\"evs\">Recurring Payments</span><span class=\"evn\">7</span></summary><div class=\"evlist\"><div class=\"ev\"><code>agreement.activated</code><span>The Agreement is active and ready to be used.</span></div><div class=\"ev\"><code>agreement.suspended</code><span>The Agreement is paused.</span></div><div class=\"ev\"><code>agreement.resumed</code><span>The Agreement is ACTIVE again.</span></div><div class=\"ev\"><code>agreement.declined</code><span>The Agreement was rejected.</span></div><div class=\"ev\"><code>agreement.discarded</code><span>The customer didn’t complete authentication.</span></div><div class=\"ev\"><code>agreement.fulfilled</code><span>The Agreement reached its completion conditions.</span></div><div class=\"ev\"><code>agreement.revoked</code><span>The Agreement is permanently withdrawn.</span></div></div></details><details class=\"evgroup\"><summary><span class=\"evt\">Instrument events</span><span class=\"evs\">the bank accounts customers pay from</span><span class=\"evn\">2</span></summary><div class=\"evlist\"><div class=\"ev\"><code>instrument.created</code><span>A new Payment Instrument is created.</span></div><div class=\"ev\"><code>instrument.updated</code><span>An instrument’s stored details change.</span></div></div></details></div>",
    "cardLine": "Webhooks: signed payment events, handled once and in any order"
  }
];
// The last row of the first phase that contains a v4 payments product: the end-to-end test and go-live steps.
// The end-to-end test row and guide, added at the end of the first phase with a v4 payments product.
export const E2E_ROW = {
  "name": "End-to-end test",
  "sub": "Sandbox, then go live",
  "apis": [],
  "refsLabel": "",
  "refs": [
    {
      "label": "Testing your integration",
      "url": "https://docs.leantech.me/v4.0-GLOBAL/docs/sandbox-testing"
    }
  ],
  "note": "Run the whole integration against the Sandbox in order: environment, a one-time payment, a recurring payment, webhooks and failure cases, then the go-live checklist. When every step passes, switch to production.",
  "panel": "e2e"
};
export const PREREQUISITE_PRODUCTS = ['otp', 'rec', 'cmi', 'namematch'];

// Short definitions shown when hovering or focusing a marked word in a guide, written as [[key|word]].
export const TERMS = {
  "charge": "A Charge is a single payment. Every payment is a Charge, whether it stands alone or is made under an Agreement.",
  "agreement": "A Payment Agreement is a customer’s permission to be charged over time. It doesn’t move money itself: each payment under it is a Charge.",
  "settlement": "The bank account where the funds you collect through Lean are transferred. You create it with the API (a Payment Destination with no customer_id) and send its id as settlement_account_id.",
  "customer": "The person paying. Lean creates the Customer with their first Charge or Agreement and returns a customer_id to reuse.",
  "apptoken": "Your application ID from the dev portal, sent as client_id. Sandbox and production each have their own.",
  "idempotency": "A unique key sent with a create request. Retrying with the same key returns the original result instead of creating a duplicate.",
  "webhook": "An HTTPS POST Lean sends to your backend when a payment resource changes, for example charge.captured.",
  "signing": "The secret Lean signs each webhook with (the lean-signature header). It’s in Development, Integration settings.",
  "instrument": "A Payment Instrument is a funding source, created once and then referenced by its id from Charges and Agreements. For Pay by Bank it’s a bank account: IBAN, SWIFT code and holder name. Lean creates one when the customer selects the account to pay with."
};

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

// What the admin form needs (no panel HTML).
export function productSummaries() {
  return PRODUCTS.filter((p) => !p.hidden).map(({ id, name, sub, card, apis, apiNote, effort, panel, linkFromDesign, toBeScoped, showCard, family, method, custom }) =>
    ({ id, name, sub, card, apis, apiNote, effort, hasGuide: !!panel, linkFromDesign: linkFromDesign || '', toBeScoped: !!toBeScoped, showCard: showCard !== false,
       family: family || 'other', method: method || 'both', custom: !!custom,
       guide: panel && PANELS[panel] ? { title: PANELS[panel].title, steps: (PANELS[panel].steps || []).length + (PANELS[panel].stepGroups || []).reduce((a, g) => a + g.steps.length, 0), uploaded: PANELS[panel].uploaded || null } : null }));
}

// ---------- The catalogue: built-in products, plus edits and guides from the admin Products page ----------
export const FAMILIES = [
  { id: 'payments', label: 'Payments' },
  { id: 'data', label: 'Data' },
  { id: 'other', label: 'Other products' },
];
export { COUNTERPART } from '../public/integration.js';
const BUILTIN_PRODUCTS = structuredClone(PRODUCTS);
const BUILTIN_PANELS = structuredClone(PANELS);
const EDITABLE = ['name', 'sub', 'card', 'apiNote', 'effort'];
export const guideId = (productId) => 'u-' + productId;   // uploaded guides; keys like u-sip-1
// rows: product_catalog rows. Resets to the built-ins first, so each request starts clean.
export function applyCatalog(rows = []) {
  PRODUCTS.length = 0; PRODUCTS.push(...structuredClone(BUILTIN_PRODUCTS));
  for (const k of Object.keys(PANELS)) delete PANELS[k];
  Object.assign(PANELS, structuredClone(BUILTIN_PANELS));
  for (const r of rows) {
    let p = PRODUCTS.find((x) => x.id === r.id);
    if (!p) { if (!r.custom) continue; p = { id: r.id, name: r.id, sub: '', card: '', apis: [], apiNote: '', toBeScoped: true, effort: 'TBC', panel: null, showCard: true, family: 'other', method: 'both', custom: true }; PRODUCTS.push(p); }
    for (const k of EDITABLE) if (typeof r[k] === 'string' && r[k].trim()) p[k] = r[k].trim();
    if (r.custom && ['payments', 'data', 'other'].includes(r.family)) p.family = r.family;
    if (r.custom && ['sdk', 'api', 'both'].includes(r.method)) p.method = r.method;
    if (r.hidden) p.hidden = true;
    const g = r.guide;
    if (g && Array.isArray(g.groups) && g.groups.some((x) => x.steps && x.steps.length)) {
      const id = guideId(r.id);
      PANELS[id] = { pre: [], diagrams: [], mindful: [], sections: [], endpoints: [], links: [], title: g.title || p.name, sub: g.sub || '', stepGroups: g.groups.filter((x) => x.steps && x.steps.length).map((x) => ({ title: x.title || '', steps: x.steps })), uploaded: { filename: r.guide_source && r.guide_source.filename, at: r.guide_at } };
      p.panel = id;
    }
  }
  return PRODUCTS;
}
