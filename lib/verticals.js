// Starting content for the Verticals page, used once when the verticals table is empty.
// After that, the SE team maintains verticals in the admin page and these are not used again.
// Remittance comes from the Wise blueprint ("{client}" becomes the client's name). The other
// verticals start empty on purpose: their pain points should come from the team, not be made up here.
export const DEFAULT_VERTICALS = [
  {
    "id": "remittance",
    "name": "Remittance",
    "painIntro": "Bringing {client}'s product experience to the UAE means moving funding, recurring pulls and payouts onto local account-to-account infrastructure. These are the remittance pain points Lean addresses, split by business and technical impact.",
    "painRows": [
      {
        "group": "business",
        "pain": "Card fees erode thin margins on top-ups and collections.",
        "solve": "Lean **Pay by Bank** for bank-to-bank top-ups and collections as a lower-cost alternative to cards.",
        "advantage": "Lower take-rates, improved unit economics, and more pricing flexibility per corridor."
      },
      {
        "group": "business",
        "pain": "Volatile rates, spreads, and correspondent fees vary by corridor, squeezing competitiveness.",
        "solve": "Reduce card dependence and improve settlement predictability.",
        "advantage": "Higher, more stable margins per corridor through lower acceptance costs."
      },
      {
        "group": "technical",
        "pain": "Multiple payment methods and payout rails increase integration and ops complexity.",
        "solve": "A single integration for **Pay by Bank** and **Payouts**, with normalized references and clear statuses across banks.",
        "advantage": "Faster time-to-market and leaner operations, with less engineering effort and support load."
      },
      {
        "group": "technical",
        "pain": "Bank variability and inconsistent references make for a non-standard experience across banks and corridors.",
        "solve": "Consistent payment references across banks, handling different bank formats.",
        "advantage": "More predictable ops and faster exception handling across markets."
      },
      {
        "group": "technical",
        "pain": "Heavy AML / KYC expectations, especially source-of-funds and beneficiary ownership checks, add operational burden.",
        "solve": "Name verification on pay-ins, in development at Lean and targeted for Q4, will support payer screening and ownership checks.",
        "advantage": "Reduced manual document collection, better compliance posture, smoother UX."
      }
    ],
    "useCases": [
      "Wallet top-up",
      "Scheduled remittance",
      "Corridor payout"
    ],
    "journeys": {
      "title": "The remittance journey, end to end",
      "intro": "Told as one money lifecycle: a UAE customer funds their {client} balance, automates recurring money movement and pays out locally. The journeys split along two lines: the direction of funds (money in vs money out) and the payment permission (the customer authenticates each payment vs one standing agreement), because each combination is a different Lean product, a different customer experience, and a different piece of the build. Each step below is an existing {client} experience (shown in-app) mapped to the Lean product that powers it in the UAE.",
      "items": [
        {
          "tag": "Funding a {client} balance",
          "title": "Top up from your bank",
          "feature": "Add money, then pay from a connected bank account.",
          "need": "Pull AED from the customer's own bank to fund their {client} balance.",
          "products": [
            "otp",
            "rec"
          ],
          "powers": "A **One-Time Payment** for one-off top-ups; a **Payment Agreement** for repeat top-ups (authorise once, charge on demand).",
          "alsoCovers": "",
          "unconfirmed": false
        },
        {
          "tag": "Recurring funding",
          "title": "Money on autopilot",
          "feature": "Scheduled transfers on a recurring cadence.",
          "need": "Fund each scheduled transfer from the customer's bank, without asking each time.",
          "products": [
            "rec"
          ],
          "powers": "One Payment Agreement, many scheduled charges: {client} creates a charge under the agreement to fund each scheduled transfer.",
          "alsoCovers": "",
          "unconfirmed": false
        },
        {
          "tag": "Payouts",
          "title": "Pay out locally",
          "feature": "Sending to a recipient's UAE bank account.",
          "need": "Pay out to any UAE bank account.",
          "products": [
            "payouts"
          ],
          "powers": "**Payouts** for the transfer, initiated server-side.",
          "alsoCovers": "",
          "unconfirmed": true
        }
      ]
    }
  },
  {
    "id": "trading-gaming",
    "name": "Trading & Gaming",
    "painIntro": "",
    "painRows": [],
    "useCases": [],
    "journeys": null
  },
  {
    "id": "lending",
    "name": "Lending",
    "painIntro": "",
    "painRows": [],
    "useCases": [],
    "journeys": null
  },
  {
    "id": "emerging-industries",
    "name": "Emerging Industries",
    "painIntro": "",
    "painRows": [],
    "useCases": [],
    "journeys": null
  }
];
