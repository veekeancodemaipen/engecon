# Engineering Economy — Final Exam Review

Interactive single-page review app covering sensitivity analysis, replacement
studies, depreciation methods, after-tax cash flow, bonds, break-even
analysis, and rate of return.

Built with **Next.js 14 (App Router)**, **React 18**, and **Tailwind CSS**.
Designed to deploy to Vercel in one click.

---

## Modules

| #  | Module                          | Interactive feature                                   |
| -- | ------------------------------- | ----------------------------------------------------- |
| 01 | Sensitivity & Decisions         | Three-estimate scenario cards · Expected value calc   |
| 02 | Replacement & Depreciation      | Four-method depreciation calculator (SL/DB/DDB/SYD)   |
| 03 | After-Tax Analysis & Bonds      | Bond valuator — coupon + face value PW                |
| 04 | Break-Even & Rate of Return     | Linear break-even calculator · Incremental ROR steps  |

---

## Run locally

```bash
npm install
npm run dev
```

The app runs at <http://localhost:3000>.

---

## Deploy to Vercel

The fastest path:

1. Push this folder to a new GitHub repository.
2. Go to <https://vercel.com/new> and import the repo.
3. Vercel auto-detects Next.js — keep the defaults and hit **Deploy**.

No environment variables needed.

Alternatively, with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

---

## Project structure

```
.
├── app/
│   ├── layout.jsx       # Root layout — fonts, metadata
│   ├── page.jsx         # SPA shell — sidebar + module switching
│   └── globals.css      # Tailwind + custom styles
├── components/
│   ├── Sidebar.jsx
│   ├── Overview.jsx
│   ├── Module1Sensitivity.jsx
│   ├── Module2Replacement.jsx
│   ├── Module3AfterTax.jsx
│   ├── Module4Breakeven.jsx
│   ├── DepreciationCalculator.jsx
│   ├── BreakevenCalculator.jsx
│   ├── DecisionTree.jsx
│   └── ui.jsx           # Shared UI primitives
├── tailwind.config.js   # Custom colors, fonts
├── next.config.mjs
└── package.json
```

---

## Design notes

- **Typography**: Fraunces (display serif), Plus Jakarta Sans (body), JetBrains
  Mono (numbers and code).
- **Palette**: Warm bone background, deep ink text, clay/terracotta accents
  for highlights, sage green for "good" states.
- **Numbers**: Tabular variant everywhere — table columns and calculator
  outputs align cleanly.
- **Charts**: All hand-rolled SVG. No chart library dependency, no client-side
  flash on first render.

---

## Customization quick-tips

- **Colors**: Edit `tailwind.config.js` — the `ink`, `clay`, and `sage`
  palettes drive the whole site.
- **Fonts**: Swap the imports in `app/layout.jsx` for any
  [next/font/google](https://nextjs.org/docs/app/api-reference/components/font#google-fonts)
  family.
- **Add a module**: drop a new `<ModuleX>.jsx` file in `components/`, register
  it in the `MODULES` array in `app/page.jsx`, and add a render case in the
  `<main>` block.
