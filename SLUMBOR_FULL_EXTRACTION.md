# SLUMBOR — FULL STORE EXTRACTION

> **Purpose:** This is a complete, exhaustive reference extraction of the entire Slumbor single-product e-commerce store (product: the **SleepWave Pro** heated eye massager). It is written so that a person or a fresh AI with **zero access to the original codebase** can rebuild the whole thing as a different brand. Nothing is summarized; copy is reproduced verbatim; every component's full source is pasted.
>
> **What Slumbor is technically:** a Next.js 15 App-Router site exported as a fully static site (`output: "export"`), styled with Tailwind CSS v4 and framer-motion, with checkout handed off to Shopify via cart-permalink links. There is no server backend — the cart lives in the browser's localStorage.
>
> **How to read this document:** Sections 1–2 give you the stack and design system. Section 3 walks every page top-to-bottom. Sections 4/4b paste the full source of every component. Section 5 details the offer and commerce logic. Section 6 is a verbatim dump of ALL site copy. Section 7 lists quirks, tracking, SEO, and gotchas a rebuilder must know.

---

## TABLE OF CONTENTS

1. **Tech Stack & Project Setup** — framework, versions, dependencies, file tree, build/deploy
2. **Design System / Global Styles** — colors, fonts, tokens, animations, utility classes (full `globals.css`)
3. **Full Page-by-Page Breakdown**
   - 3 — Home, Shop, Cart, Track Order, 404
   - 3b — Product Page (buy box + all rendered sections, in order)
   - 3c — Legal & Info pages (About, Contact, FAQ, Privacy, Refund, Shipping, Terms)
4. **Component Inventory (full source code)**
   - 4 — UI / Layout / Sections components
   - 4b — Product components / Cart context / Lib / Types
5. **The Offer & Commerce Logic** — product, value stack, bundle math, order bump, cart, checkout permalink, guarantee, workbook
6. **Copy Appendix (verbatim dump)**
   - 6a — Product page & product data (comparison table, all reviews, all FAQs)
   - 6b — Home, legal & chrome (all non-product pages, full legal text)
7. **Anything Else** — tracking pixels, SEO, favicon, hardcoded values, gotchas

---

# 1. TECH STACK & PROJECT SETUP

## 1.1 Framework & Language — exact versions

This is a **Next.js 16 App Router** project built as a **fully static export** (`output: "export"`), written in **TypeScript**, styled with **Tailwind CSS v4** (CSS-first, no `tailwind.config.js`), and animated with **framer-motion**. React 19.

Exact resolved versions (from `package-lock.json`; the `package.json` ranges are shown in parentheses):

| Package | package.json range | Resolved (lockfile) | What it is / used for |
|---|---|---|---|
| `next` | `16.1.7` (pinned) | **16.1.7** | Next.js framework, App Router, static export |
| `react` | `19.2.3` (pinned) | **19.2.3** | React runtime |
| `react-dom` | `19.2.3` (pinned) | **19.2.3** | React DOM renderer |
| `framer-motion` | `^12.37.0` | **12.37.0** | Animations (scroll reveals, hero motion, drawers, etc.) |
| `clsx` | `^2.1.1` | **2.1.1** | Conditional className string building |
| `tailwind-merge` | `^3.5.0` | **3.5.0** | Merge/dedupe conflicting Tailwind classes |
| `tailwindcss` | `^4` | **4.2.1** | Tailwind CSS v4 (utility engine) — dev dependency |
| `@tailwindcss/postcss` | `^4` | **4.2.1** | Tailwind v4 PostCSS plugin — dev dependency |
| `typescript` | `^5` | **5.9.3** | TypeScript compiler — dev dependency |
| `@types/node` | `^20` | **20.19.37** | Node type defs — dev |
| `@types/react` | `^19` | **19.2.14** | React type defs — dev |
| `@types/react-dom` | `^19` | **19.2.3** | React DOM type defs — dev |
| `eslint` | `^9` | **9.39.4** | Linter — dev |
| `eslint-config-next` | `16.1.7` (pinned) | **16.1.7** | Next.js ESLint config — dev |

Project metadata: `name: "slumbor"`, `version: "0.1.0"`, `private: true`.

Notes for a rebuild:
- There is **NO `tailwind.config.js/ts`**. Tailwind v4 is configured entirely inside `src/app/globals.css` via `@import "tailwindcss";` plus an `@theme inline { … }` block (see Section 2). Design tokens become utilities through that block.
- There is **NO Tailwind plugin list, no separate design-token file** — `src/lib/data.ts` contains business/offer/product/review data only (no color tokens); the palette lives 100% in `globals.css`.
- The only path alias is `@/* → ./src/*` (see `tsconfig.json`).

## 1.2 npm scripts (how it runs / builds)

From `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

- `npm run dev` — local dev server (default http://localhost:3000).
- `npm run build` — because `next.config.ts` sets `output: "export"`, this produces a **fully static site in the `out/` directory** (no Node server needed at runtime). `next start` is effectively unused for the deployed static site.
- `npm run lint` — runs ESLint (flat config).

## 1.3 next.config.ts (verbatim)

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "5jmyzbx4u2.ufs.sh" }],
  },
};

export default nextConfig;
```

Key config implications:
- `output: "export"` → static HTML export to `out/`. No server-side rendering, no API routes, no ISR at runtime. All pages are pre-rendered at build time. This is why the dynamic route `products/[handle]` must be statically enumerable (single product `sleepwave-pro`).
- `trailingSlash: true` → every route emitted as a directory with `index.html` and URLs end in `/` (e.g. `/products/sleepwave-pro/`).
- `images.unoptimized: true` → Next.js Image Optimization is disabled (required for static export); `<Image>` serves raw files.
- `images.remotePatterns` → allows remote images from host **`5jmyzbx4u2.ufs.sh`** (this is an UploadThing `ufs.sh` CDN host; the site favicon and some assets are served from `https://5jmyzbx4u2.ufs.sh/...`). Local product imagery lives under `public/products/`.

## 1.4 tsconfig.json (verbatim)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

Notable: `strict: true`, path alias `@/* → ./src/*`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, Next TS plugin enabled.

## 1.5 postcss.config.mjs (verbatim)

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

Only the Tailwind v4 PostCSS plugin. No autoprefixer entry (Tailwind v4 handles it internally).

## 1.6 eslint.config.mjs (verbatim)

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

Flat ESLint config extending Next.js core-web-vitals + TypeScript presets.

## 1.7 next-env.d.ts (verbatim, do not edit)

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

## 1.8 .gitignore (verbatim)

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Claude Code local settings
.claude/settings.local.json
```

## 1.9 README.md

The README contains a single line: `# slumbor`. There is no other documentation in it.

## 1.10 Environment variables

There are **no runtime environment variables** required. The codebase references none via `process.env`. All third-party IDs are **hardcoded**:
- Meta Pixel / Dataset ID: **`2807075906310846`** (inline `<script>` in `src/app/layout.tsx` head, plus a client-side navigation tracker in `client-layout.tsx`).
- Microsoft Clarity project ID: **`xa22ol5ny9`** (inline `<script>` in `layout.tsx` head).
- Shopify store domain: **`slumbor.myshopify.com`** and hardcoded variant IDs (see 1.12).
- Remote image host: `5jmyzbx4u2.ufs.sh` (in `next.config.ts` and layout favicon).

`.env*` is gitignored, but nothing in the source reads from it.

## 1.11 Third-party scripts embedded in the app (from layout.tsx / client-layout.tsx)

`src/app/layout.tsx`:
- `<html lang="en">`.
- `viewport` export: `width=device-width, initialScale=1, maximumScale=1, themeColor: "#0E1626"` (the dark background color).
- `metadata` export: title `"Slumbor | Fall Asleep Faster. Wake Up Rested."`, a product description, and favicon icon URL `https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrGCzKJv2wQbFMujXdcqsWtxAaEginK1m8SPLG`.
- Two inline `<script>` blocks in `<head>`:
  1. **Meta Pixel** base snippet — `fbq('init', '2807075906310846')` + `fbq('track', 'PageView')`, with a `<noscript>` fallback `<img>` beacon.
  2. **Microsoft Clarity** tag loader for project `xa22ol5ny9`.
- `<body>` className: `` `${fraunces.variable} ${inter.variable} antialiased` `` (attaches the two font CSS variables + Tailwind `antialiased`).
- Renders `<ClientLayout>{children}</ClientLayout>`.

`src/app/client-layout.tsx` (a `"use client"` component):
- Wraps everything in `<CartProvider>` (from `@/contexts/cart-context`).
- `MetaPixelPageView` — on `usePathname()` change, fires `window.fbq("track","PageView")` for client-side navigations, **skipping the first run** (base snippet already fired the initial PageView).
- `ScrollToTopOnLoad` — sets `window.history.scrollRestoration = "manual"` and `window.scrollTo(0,0)` on mount.
- Renders, in order: `<LoadingScreen />`, `<Atmosphere />`, `<ParticleField />`, then a `<div className="relative z-10">` containing `<AnnouncementBar />`, `<Header />`, `<main className="min-h-screen pt-[calc(36px+64px)]">{children}</main>`, `<Footer />`, and finally `<CartDrawer />`.
- The `main` top padding `pt-[calc(36px+64px)]` = 100px offset for the fixed announcement bar (36px) + header (64px).

`src/types/globals.d.ts` provides the TS typing for the pixel:
```ts
interface Window {
  fbq: (...args: unknown[]) => void;
}
```

## 1.12 Shopify integration (exists in src/lib/shopify.ts — detailed by another agent)

Checkout is **not** a headless Storefront API integration — it is a **Shopify cart permalink**. `src/lib/shopify.ts` builds a URL of the form
`https://slumbor.myshopify.com/cart/<variantId>:<qty>,...?discount=SAVExx`
that drops the shopper directly into Shopify's hosted cart/checkout. Hardcoded values there: store domain `slumbor.myshopify.com`, product variant `sleepwave-pro → 58281487565181`, protection-plan variant `58281499689341`, and bundle discount codes `SAVE10` (qty ≥ 2) / `SAVE20` (qty ≥ 3). Mentioned here only for stack completeness; another agent documents the full logic.

`src/lib/utils.ts` provides the ubiquitous `cn()` helper: `twMerge(clsx(inputs))` (clsx + tailwind-merge).

## 1.13 Full folder / file tree

Application source (`src/`), static assets (`public/`), strategy docs (`strategy/`), and the lead-magnet workbook build (`workbook/`):

```
public/products/before-after.webp
public/products/benefits.webp
public/products/p1.webp
public/products/p10.webp
public/products/p11.webp
public/products/p2.webp
public/products/p3.webp
public/products/p4-v2.webp
public/products/p4.webp
public/products/p5.webp
public/products/p6.webp
public/products/p7.webp
public/products/p8.webp
public/products/p9.webp
public/products/science.webp
public/products/step1.webp
public/products/step2.webp
public/products/step3.webp
public/products/what-you-get-left-v2.webp
public/products/what-you-get-left.webp
public/products/what-you-get-right-v2.webp
public/products/what-you-get-right.webp
public/products/who-its-for.webp
public/workbook/slumbor-14-night-reset.pdf
src/app/about/page.tsx
src/app/cart/page.tsx
src/app/client-layout.tsx
src/app/contact/page.tsx
src/app/faq/page.tsx
src/app/globals.css
src/app/home/page.tsx
src/app/layout.tsx
src/app/not-found.tsx
src/app/page.tsx
src/app/privacy-policy/page.tsx
src/app/products/[handle]/page.tsx
src/app/products/[handle]/product-page-client.tsx
src/app/refund-policy/page.tsx
src/app/shipping/page.tsx
src/app/shop/page.tsx
src/app/terms-of-service/page.tsx
src/app/track-order/page.tsx
src/components/layout/announcement-bar.tsx
src/components/layout/cart-drawer.tsx
src/components/layout/footer.tsx
src/components/layout/header.tsx
src/components/layout/loading-screen.tsx
src/components/product/before-after.tsx
src/components/product/benefits-hero.tsx
src/components/product/comparison-table.tsx
src/components/product/cost-callout.tsx
src/components/product/currency-converter.tsx
src/components/product/discover-section.tsx
src/components/product/ems-comparison.tsx
src/components/product/features-love.tsx
src/components/product/how-it-works.tsx
src/components/product/mid-page-cta.tsx
src/components/product/offer-countdown.tsx
src/components/product/perfect-for.tsx
src/components/product/product-card.tsx
src/components/product/product-faq.tsx
src/components/product/product-reviews.tsx
src/components/product/product-tabs.tsx
src/components/product/purchase-notification.tsx
src/components/product/relief-intro.tsx
src/components/product/risk-free-guarantee.tsx
src/components/product/science-section.tsx
src/components/product/slowwave-diagram.tsx
src/components/product/special-offer.tsx
src/components/product/volume-discounts.tsx
src/components/product/who-its-for.tsx
src/components/sections/brand-story.tsx
src/components/sections/hero-section.tsx
src/components/sections/product-showcase.tsx
src/components/sections/testimonials.tsx
src/components/sections/why-luxen.tsx
src/components/ui/animated-counter.tsx
src/components/ui/atmosphere.tsx
src/components/ui/brand-name.tsx
src/components/ui/floating-element.tsx
src/components/ui/glassmorphism-card.tsx
src/components/ui/magnetic-button.tsx
src/components/ui/particle-field.tsx
src/components/ui/scroll-progress.tsx
src/components/ui/scroll-reveal.tsx
src/components/ui/section-divider.tsx
src/components/ui/text-gradient.tsx
src/components/ui/tilt-card.tsx
src/contexts/cart-context.tsx
src/lib/data.ts
src/lib/shopify.ts
src/lib/utils.ts
src/types/globals.d.ts
strategy/human-voice-protocol.md
strategy/master_prompt.md
strategy/target_market.md
workbook/README.md
workbook/build.mjs
workbook/fonts.css
workbook/fonts/f0.woff2
workbook/fonts/f1.woff2
workbook/fonts/f2.woff2
workbook/fonts/f3.woff2
workbook/fonts/f4.woff2
workbook/fonts/f5.woff2
workbook/fonts/f6.woff2
workbook/fonts/f7.woff2
workbook/fonts/f8.woff2
workbook/fonts/f9.woff2
workbook/slumbor-14-night-reset.pdf
workbook/workbook.html
```

### Tree annotations (structure map)
- **`src/app/`** — Next.js App Router. Root layout (`layout.tsx`) + client shell (`client-layout.tsx`) + `globals.css`. Routes (each a `page.tsx`): `/` (`page.tsx`), `/home`, `/shop`, `/products/[handle]` (dynamic, single product), `/cart`, `/about`, `/contact`, `/faq`, `/shipping`, `/track-order`, `/privacy-policy`, `/refund-policy`, `/terms-of-service`, plus `not-found.tsx` (custom 404). The product page splits into a server `page.tsx` and a `"use client"` `product-page-client.tsx`.
- **`src/components/layout/`** — global chrome: announcement bar, header, footer, cart drawer, loading screen.
- **`src/components/product/`** — the long-form product/landing sections (features, science, comparison tables, offer, countdown, guarantee, FAQ, reviews, purchase-notification social proof, volume discounts, currency converter, etc.).
- **`src/components/sections/`** — homepage-level sections (hero, product showcase, brand story, testimonials, why-luxen). Note the legacy "luxen"/"why-luxen" naming survives from an earlier brand.
- **`src/components/ui/`** — reusable visual primitives: `atmosphere` (background layers), `particle-field`, animated counter, magnetic-button, tilt/glass cards, scroll-reveal/progress, section-divider, text-gradient, brand-name, floating-element.
- **`src/contexts/cart-context.tsx`** — React context cart state (used app-wide).
- **`src/lib/`** — `data.ts` (offer/product/reviews/FAQ data + derived stats), `shopify.ts` (cart permalink builder), `utils.ts` (`cn`).
- **`src/types/globals.d.ts`** — global `Window.fbq` typing.
- **`public/products/`** — all product/marketing WebP imagery (11 product shots `p1`–`p11` with a `p4-v2` swap, before/after, benefits, science, steps 1–3, what-you-get panels with `-v2` variants, who-its-for).
- **`public/workbook/`** — the downloadable bonus PDF `slumbor-14-night-reset.pdf` (the "14-Night Sleep Reset Workbook" lead magnet referenced in the offer).
- **`strategy/`** — non-code brand/marketing docs (human-voice-protocol, master_prompt, target_market).
- **`workbook/`** — a **separate self-contained build pipeline** for the PDF bonus: `build.mjs` (Node build script), `workbook.html` source, `fonts.css` + 10 subsetted `.woff2` fonts, and the generated `slumbor-14-night-reset.pdf` (mirrored into `public/workbook/`). Not part of the Next.js app bundle.

---

# 2. DESIGN SYSTEM / GLOBAL STYLES

## 2.1 Fonts — how they're loaded (next/font, layout.tsx)

Fonts are loaded via **`next/font/google`** in `src/app/layout.tsx`, which self-hosts them and exposes CSS variables:

```ts
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});
```

- **Fraunces** (a variable serif) → exposed as CSS variable `--font-heading`. Loaded with both `normal` + `italic` styles and the variable-font axes **`SOFT`** and **`opsz`** (optical size). This is the display/heading typeface.
- **Inter** (sans) → exposed as CSS variable `--font-body`. This is the body typeface.
- The `<body>` gets `` `${fraunces.variable} ${inter.variable} antialiased` `` so both variables are available document-wide.
- In `globals.css`, `@theme inline` maps `--font-sans: var(--font-body)` and `--font-heading: var(--font-heading)`. `body` uses `font-family: var(--font-body), system-ui, sans-serif`. The **`.font-heading` utility** applies `font-family: var(--font-heading), Georgia, serif` with `letter-spacing: -0.01em` — this is how headings opt into Fraunces.
- Note: `@theme` also references `--font-mono: var(--font-geist-mono)`, but **no Geist Mono font is actually loaded** anywhere — it's a dangling reference (harmless leftover from the Next.js starter). No weights are explicitly configured for either font (Fraunces is variable; Inter uses its default variable range).

## 2.2 Authoritative reference — full globals.css VERBATIM

```css
@import "tailwindcss";

:root {
  /* Warm midnight palette: a dim bedroom, one lamp on */
  --background: #0E1626;       /* primary background, warm dusk */
  --surface: #14213D;          /* section variation */
  --surface-raised: #1C2A4A;   /* raised cards */
  --foreground: #F2EDE4;       /* cream, warm paper */
  --heading: #FBF8F2;          /* warm near-white, never cold pure white */
  --muted: #6E7691;            /* muted blue-gray */
  --gold: #E8B86A;             /* warm lamp amber, the accent (brightened) */
  --gold-dark: #CFA05A;        /* deeper amber */
  --gold-light: rgba(232,184,106,0.12);
  --gold-glow: rgba(232,184,106,0.34);
  --purple: #8B7FB0;           /* soft lavender-plum */
  --purple-light: rgba(139,127,176,0.12);
  --plum: #3A2745;             /* deep plum, rare accent */
  --lavender: #A8A3C7;         /* muted lavender, fine print */
  --navy: #0A0F1C;             /* darker than bg, footer */
  --border: rgba(242,237,228,0.07);
  --border-gold: rgba(232,184,106,0.26);
  --slate: #A8A3C7;            /* secondary text, lavender */
  --warm: #E8B86A;
  --warm-light: rgba(232,184,106,0.12);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-heading: var(--heading);
  --color-soft-white: #F2EDE4;
  --color-light-gray: rgba(242,237,228,0.07);
  --color-muted: var(--muted);
  --color-gold: var(--gold);
  --color-gold-dark: var(--gold-dark);
  --color-gold-light: rgba(232,184,106,0.12);
  --color-purple: var(--purple);
  --color-purple-light: rgba(139,127,176,0.12);
  --color-plum: var(--plum);
  --color-lavender: var(--lavender);
  --color-navy: var(--navy);
  --color-slate: var(--slate);
  --color-teal: var(--gold);
  --color-teal-dark: var(--gold-dark);
  --color-teal-light: rgba(232,184,106,0.12);
  --color-warm: var(--gold);
  --color-warm-light: rgba(232,184,106,0.12);
  --font-sans: var(--font-body);
  --font-heading: var(--font-heading);
  --font-mono: var(--font-geist-mono);

  --animate-aurora: aurora 60s linear infinite;
  --animate-float: float 7s ease-in-out infinite;
  --animate-glow-pulse: glow-pulse 4s ease-in-out infinite;
  --animate-shimmer: shimmer 2s linear infinite;
  --animate-fade-in: fade-in 0.8s ease-out forwards;
  --animate-logo-reveal: logo-reveal 2s ease-out forwards;
  --animate-spin-slow: spin 20s linear infinite;
  --animate-breathe-glow: breathe-glow 11s ease-in-out infinite;
  --animate-aurora-drift: aurora-drift 38s ease-in-out infinite;
}

@keyframes aurora {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-18px); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes logo-reveal {
  0% { opacity: 0; transform: scale(0.8); filter: blur(10px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
}

@keyframes loading-bar {
  0% { width: 0%; }
  100% { width: 100%; }
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.5; }
}

@keyframes gold-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes breathe {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.08; }
}

/* The breathing lamp, a calm inhale/exhale rhythm (~11s) */
@keyframes breathe-glow {
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.09); }
}

/* Hypnagogic light, drifting like color behind closed eyelids */
@keyframes aurora-drift {
  0%   { transform: translate3d(-4%, -2%, 0) rotate(0deg) scale(1.05); }
  50%  { transform: translate3d(4%, 3%, 0) rotate(7deg) scale(1.12); }
  100% { transform: translate3d(-4%, -2%, 0) rotate(0deg) scale(1.05); }
}

@keyframes blink-colon {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}
.blink-colon {
  animation: blink-colon 1.2s infinite;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body), system-ui, sans-serif;
  letter-spacing: 0.01em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.font-heading {
  font-family: var(--font-heading), Georgia, serif;
  letter-spacing: -0.01em;
}

/* ── Atmosphere layers (the edge of sleep) ─────────────────── */

/* Warm radial vignette that draws the eye inward, intimate */
.atmosphere-vignette {
  background:
    radial-gradient(ellipse 90% 70% at 50% 30%, transparent 0%, transparent 55%, rgba(8,11,20,0.55) 100%),
    radial-gradient(ellipse 120% 100% at 50% 0%, rgba(232,184,106,0.05) 0%, transparent 45%);
}

/* The breathing lamp glow */
.atmosphere-lamp {
  background: radial-gradient(circle at center,
    rgba(232,184,106,0.22) 0%,
    rgba(232,184,106,0.12) 28%,
    rgba(184,134,84,0.04) 50%,
    transparent 70%);
  filter: blur(40px);
  animation: breathe-glow 11s ease-in-out infinite;
}

/* Drifting hypnagogic aurora */
.atmosphere-aurora {
  background:
    radial-gradient(ellipse 50% 45% at 25% 30%, rgba(58,39,69,0.55) 0%, transparent 60%),
    radial-gradient(ellipse 45% 40% at 78% 65%, rgba(168,163,199,0.16) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 60% 20%, rgba(232,184,106,0.12) 0%, transparent 55%);
  filter: blur(50px);
  animation: aurora-drift 38s ease-in-out infinite;
}

/* Fine warm film grain over everything, analog, intimate */
.atmosphere-grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: overlay;
}

/* Premium glass card, warmer and softer */
.glass-card {
  background: linear-gradient(135deg, rgba(242,237,228,0.045) 0%, rgba(242,237,228,0.012) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(242,237,228,0.07);
  box-shadow:
    0 8px 32px rgba(6, 9, 18, 0.45),
    0 0 0 1px rgba(242,237,228,0.03),
    inset 0 1px 0 rgba(242,237,228,0.06);
}

.glass-card-hover {
  transition: background 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease, transform 0.6s ease;
}
.glass-card-hover:hover {
  background: linear-gradient(135deg, rgba(232,184,106,0.06) 0%, rgba(242,237,228,0.02) 100%);
  border-color: rgba(232,184,106,0.16);
  box-shadow:
    0 16px 48px rgba(6, 9, 18, 0.5),
    0 0 50px rgba(232,184,106,0.06),
    inset 0 1px 0 rgba(232,184,106,0.12);
}

/* Premium section backgrounds */
.section-glow-gold {
  position: relative;
}
.section-glow-gold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,184,106,0.10) 0%, transparent 70%);
  pointer-events: none;
}

.section-glow-purple {
  position: relative;
}
.section-glow-purple::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 100%, rgba(139,127,176,0.07) 0%, transparent 70%);
  pointer-events: none;
}

.section-gradient-teal {
  background: linear-gradient(180deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%);
}

.section-gradient-warm {
  background: linear-gradient(180deg, var(--background) 0%, rgba(232,184,106,0.07) 50%, var(--background) 100%);
}

.section-gradient-gold {
  background: linear-gradient(180deg, var(--background) 0%, rgba(232,184,106,0.07) 50%, var(--background) 100%);
}

.god-ray {
  background: radial-gradient(
    ellipse at center bottom,
    rgba(232, 184, 106, 0.09) 0%,
    rgba(58, 39, 69, 0.05) 30%,
    transparent 70%
  );
}

/* Warm shimmer text effect */
.gold-shimmer {
  background: linear-gradient(
    110deg,
    #E8B86A 0%,
    #F0D5AE 25%,
    #E8B86A 50%,
    #F0D5AE 75%,
    #E8B86A 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gold-shimmer 5s linear infinite;
}

/* Premium divider */
.gold-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(232,184,106,0.3) 50%, transparent 100%);
}

/* Ambient glow behind sections */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: breathe 8s ease-in-out infinite;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: var(--surface);
}

::-webkit-scrollbar-thumb {
  background: rgba(232,184,106,0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(232,184,106,0.35);
}

/* Respect people who'd rather not have motion */
@media (prefers-reduced-motion: reduce) {
  .atmosphere-lamp,
  .atmosphere-aurora,
  .ambient-orb,
  .gold-shimmer,
  .animate-float {
    animation: none !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

## 2.3 CSS variables / design tokens — every `:root` token, exact value, purpose

The palette concept is a "**warm midnight** — a dim bedroom, one lamp on."

| Token | Value | Purpose |
|---|---|---|
| `--background` | `#0E1626` | Primary page background, warm dusk. Also the `themeColor` in viewport. |
| `--surface` | `#14213D` | Section variation background; scrollbar track. |
| `--surface-raised` | `#1C2A4A` | Raised cards. |
| `--foreground` | `#F2EDE4` | Body text — cream, warm paper. |
| `--heading` | `#FBF8F2` | Heading color — warm near-white (never cold pure white). |
| `--muted` | `#6E7691` | Muted blue-gray text. |
| `--gold` | `#E8B86A` | THE accent — warm lamp amber (brightened). |
| `--gold-dark` | `#CFA05A` | Deeper amber. |
| `--gold-light` | `rgba(232,184,106,0.12)` | Faint gold fill (12% gold). |
| `--gold-glow` | `rgba(232,184,106,0.34)` | Gold glow (34% gold). |
| `--purple` | `#8B7FB0` | Soft lavender-plum. |
| `--purple-light` | `rgba(139,127,176,0.12)` | 12% purple fill. |
| `--plum` | `#3A2745` | Deep plum, rare accent. |
| `--lavender` | `#A8A3C7` | Muted lavender, fine print. |
| `--navy` | `#0A0F1C` | Darker than bg — footer. |
| `--border` | `rgba(242,237,228,0.07)` | Default hairline border (7% cream). |
| `--border-gold` | `rgba(232,184,106,0.26)` | Gold border (26% gold). |
| `--slate` | `#A8A3C7` | Secondary text (same hex as lavender). |
| `--warm` | `#E8B86A` | Alias of gold. |
| `--warm-light` | `rgba(232,184,106,0.12)` | Alias of gold-light. |

### Distinct hex colors used (and where)
- `#0E1626` background / theme color.
- `#14213D` surface / scrollbar track.
- `#1C2A4A` raised cards.
- `#F2EDE4` cream foreground (also `--color-soft-white`).
- `#FBF8F2` warm near-white headings.
- `#6E7691` muted blue-gray.
- `#E8B86A` **gold accent** (the dominant brand color — buttons, borders, glows, shimmer).
- `#CFA05A` deep gold.
- `#8B7FB0` purple.
- `#3A2745` plum (used in `god-ray` and `atmosphere-aurora` gradients as `rgba(58,39,69,…)`).
- `#A8A3C7` lavender / slate (used in `atmosphere-aurora` as `rgba(168,163,199,…)`).
- `#0A0F1C` navy (footer).
- `#F0D5AE` — a lighter gold used only inside the `.gold-shimmer` text gradient stops.
- `rgba(184,134,84,…)` (`#B88654`) — deeper bronze used in the `.atmosphere-lamp` gradient.
- `rgba(8,11,20,…)` (`#080B14`) — near-black used in the vignette edge.
- `rgba(6,9,18,…)` (`#060912`) — near-black used in glass-card shadows.

## 2.4 `@theme inline` block — how tokens become Tailwind utilities

The `@theme inline { … }` block (Tailwind v4 mechanism) is reproduced verbatim in 2.2. It exposes every `--color-*` name as a Tailwind color utility (e.g. `--color-gold` → `bg-gold`, `text-gold`, `border-gold`, etc.). Key mappings and quirks:

- `--color-background`, `--color-foreground`, `--color-surface`, `--color-surface-raised`, `--color-heading`, `--color-muted`, `--color-gold`, `--color-gold-dark`, `--color-gold-light`, `--color-purple`, `--color-purple-light`, `--color-plum`, `--color-lavender`, `--color-navy`, `--color-slate`, `--color-warm`, `--color-warm-light` → alias the `:root` variables.
- `--color-soft-white: #F2EDE4` and `--color-light-gray: rgba(242,237,228,0.07)` are defined **directly** here (not from `:root`).
- **Legacy teal aliases point at gold**: `--color-teal: var(--gold)`, `--color-teal-dark: var(--gold-dark)`, `--color-teal-light: rgba(232,184,106,0.12)`. So any `text-teal` / `bg-teal` class in components renders **gold** — a rebrand shim from an earlier teal palette. Keep these aliases or the "teal" utility classes across components will break.
- Fonts: `--font-sans: var(--font-body)` (Inter), `--font-heading: var(--font-heading)` (Fraunces), `--font-mono: var(--font-geist-mono)` (dangling — no such font loaded).
- **`--animate-*` tokens** register named animation utilities (Tailwind v4 turns `--animate-float` into the `animate-float` utility, etc.). See 2.5 for the mapping to keyframes. Note `--animate-spin-slow: spin 20s linear infinite` reuses Tailwind's built-in `spin` keyframes.

## 2.5 Animations — every `@keyframes` VERBATIM + what each animates

All keyframes are reproduced verbatim in 2.2. Registered animation utilities (via `@theme --animate-*`) and their targets:

| Utility / `--animate-*` | Definition | Keyframes | What it animates |
|---|---|---|---|
| `animate-aurora` | `aurora 60s linear infinite` | `aurora` | Shifts `background-position` 0%→100%→0% (moving gradient). |
| `animate-float` | `float 7s ease-in-out infinite` | `float` | `translateY` 0 → -18px → 0 (gentle levitation). Disabled under reduced-motion. |
| `animate-glow-pulse` | `glow-pulse 4s ease-in-out infinite` | `glow-pulse` | Opacity 0.4↔0.8 + scale 1↔1.05 (pulsing glow). |
| `animate-shimmer` | `shimmer 2s linear infinite` | `shimmer` | `background-position` -200%→200% (skeleton/shine sweep). |
| `animate-fade-in` | `fade-in 0.8s ease-out forwards` | `fade-in` | Opacity 0→1 + translateY 20px→0 (entrance). |
| `animate-logo-reveal` | `logo-reveal 2s ease-out forwards` | `logo-reveal` | Opacity 0→1, scale 0.8→1, blur 10px→0 (logo reveal). |
| `animate-spin-slow` | `spin 20s linear infinite` | (Tailwind built-in `spin`) | Slow full rotation. |
| `animate-breathe-glow` | `breathe-glow 11s ease-in-out infinite` | `breathe-glow` | Opacity 0.45↔0.85 + scale 1↔1.09 — the "breathing lamp." Used by `.atmosphere-lamp`. |
| `animate-aurora-drift` | `aurora-drift 38s ease-in-out infinite` | `aurora-drift` | translate3d + rotate + scale drift — hypnagogic aurora. Used by `.atmosphere-aurora`. |

Keyframes defined but **not** registered as `--animate-*` utilities (used directly by name inside utility classes or components):
- `loading-bar` — `width: 0%→100%` (loading-screen progress bar).
- `pulse-ring` — scale 0.8↔1.1 + opacity 0.5↔1 (pulsing ring).
- `gold-shimmer` — `background-position: -200%→200% center`; drives `.gold-shimmer` text (5s linear infinite).
- `breathe` — opacity 0.03↔0.08; drives `.ambient-orb` (8s).
- `blink-colon` — opacity toggles at 50%/50.01% for a hard on/off; bound to the `.blink-colon` class (`1.2s infinite`) — used for a blinking countdown-timer colon.

## 2.6 Base element styles

- `html { scroll-behavior: smooth; }` (set to `auto` under reduced-motion).
- `body`: `background: var(--background)`, `color: var(--foreground)`, `font-family: var(--font-body), system-ui, sans-serif`, `letter-spacing: 0.01em`, `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`.
- `.font-heading`: `font-family: var(--font-heading), Georgia, serif; letter-spacing: -0.01em;` — the opt-in heading style (Fraunces).

## 2.7 Atmosphere / glass / gradient / shimmer / divider utility classes (annotated)

All reproduced verbatim in 2.2. Summary of each:

**Atmosphere layers** (rendered by `src/components/ui/atmosphere.tsx`, full-screen background):
- `.atmosphere-vignette` — two stacked radial gradients: a darkening edge vignette (`rgba(8,11,20,0.55)` at edges) plus a faint top gold wash (`rgba(232,184,106,0.05)`).
- `.atmosphere-lamp` — radial gold glow (0.22→0.12→0.04 amber falloff), `filter: blur(40px)`, animated by `breathe-glow 11s`.
- `.atmosphere-aurora` — three offset radial gradients in plum `rgba(58,39,69,0.55)`, lavender `rgba(168,163,199,0.16)`, gold `rgba(232,184,106,0.12)`; `filter: blur(50px)`; animated by `aurora-drift 38s`.
- `.atmosphere-grain` — inline SVG `feTurbulence fractalNoise` (baseFrequency 0.85, 2 octaves) film grain; `opacity: 0.05`; `mix-blend-mode: overlay`.

**Glass cards**:
- `.glass-card` — `linear-gradient(135deg, rgba(242,237,228,0.045)→0.012)` fill, `backdrop-filter: blur(20px)`, `1px solid rgba(242,237,228,0.07)` border, layered box-shadow (`0 8px 32px rgba(6,9,18,0.45)` drop + inset highlight).
- `.glass-card-hover` — transitions background/border/shadow/transform over `0.6s ease`; on hover shifts to a gold-tinted fill (`rgba(232,184,106,0.06)`), gold border `rgba(232,184,106,0.16)`, and a gold glow shadow (`0 0 50px rgba(232,184,106,0.06)`).

**Section background helpers**:
- `.section-glow-gold` / `.section-glow-purple` — `position: relative` with a `::before` full-bleed radial glow (gold from top at 10% opacity; purple from bottom at 7%), `pointer-events: none`.
- `.section-gradient-teal` — vertical gradient `background → surface → background`.
- `.section-gradient-warm` and `.section-gradient-gold` — identical vertical gradient `background → rgba(232,184,106,0.07) → background` (warm gold mid-wash).
- `.god-ray` — radial gradient from bottom center: gold `0.09` → plum `rgba(58,39,69,0.05)` → transparent.

**Text / decoration**:
- `.gold-shimmer` — animated gold text gradient (`#E8B86A / #F0D5AE` stops, 110deg, `background-size: 200% auto`, clipped to text via `background-clip: text` + `-webkit-text-fill-color: transparent`), animated `gold-shimmer 5s linear infinite`. Disabled under reduced-motion.
- `.gold-divider` — `height: 1px` horizontal rule, `linear-gradient(90deg, transparent → rgba(232,184,106,0.3) → transparent)`.
- `.ambient-orb` — absolutely-positioned circle (`border-radius: 50%`), `filter: blur(80px)`, `pointer-events: none`, animated `breathe 8s`. Disabled under reduced-motion.
- `.blink-colon` — `animation: blink-colon 1.2s infinite` (hard on/off blink for countdown colon).

## 2.8 Border-radius, shadows, gradients (summary)

- **Border-radius**: globals.css defines only `border-radius: 50%` (`.ambient-orb`) and `border-radius: 3px` (scrollbar thumb). All other rounding is via Tailwind utilities in components (no custom radius scale defined). No custom `--radius-*` theme tokens.
- **Shadows**: The two authored shadow recipes are on `.glass-card` / `.glass-card-hover` (multi-layer drop + inset highlight + gold glow, see above). Everything else uses Tailwind's default shadow utilities.
- **Gradients**: heavily radial-gradient-driven (atmosphere, section glows) and linear (section vertical washes, glass fills, gold text/divider). All gradient recipes are captured verbatim in 2.2.

## 2.9 Scrollbar styling

- Global custom scrollbar (WebKit): `::-webkit-scrollbar { width: 5px; }`, track `background: var(--surface)` (`#14213D`), thumb `rgba(232,184,106,0.2)` with `border-radius: 3px`, thumb hover `rgba(232,184,106,0.35)` (gold).
- `.scrollbar-hide` utility fully hides scrollbars: `::-webkit-scrollbar { display: none; }` + `-ms-overflow-style: none` + `scrollbar-width: none` (used on horizontal scroll strips like image carousels).

## 2.10 Responsive / breakpoints

There are **no custom breakpoints** defined in `globals.css` or a Tailwind config — the project uses **Tailwind v4's default breakpoints** (`sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`, `2xl 1536px`) via responsive utility prefixes in components. The only globally hardcoded layout metric is the fixed-chrome offset `pt-[calc(36px+64px)]` on `<main>` (announcement bar 36px + header 64px). Container widths, spacing, and stacking are all per-component Tailwind classes (not documented here).

## 2.11 prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .atmosphere-lamp,
  .atmosphere-aurora,
  .ambient-orb,
  .gold-shimmer,
  .animate-float {
    animation: none !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

Under reduced-motion, the breathing lamp, aurora drift, ambient orbs, gold shimmer text, and float animation are all forced off, and smooth scrolling reverts to `auto`. (Note: not all animations are covered — e.g. `breathe-glow`/`aurora-drift` on their utility form and countdown blink still run; only the listed selectors are disabled.)


---

# 3. FULL PAGE-BY-PAGE BREAKDOWN (Home, Shop, Cart, Track Order, 404)

> All copy below is VERBATIM (word-for-word, including punctuation, capitalization, apostrophes, and typos in testimonials). File paths are exact.

---

## ROUTING NOTE (critical for rebuild)

- **`src/app/page.tsx`** — the root route `/` does NOT render the homepage. It is a server component that immediately **redirects** to the product page:
  ```tsx
  import { redirect } from "next/navigation";
  export default function Home() {
    redirect("/products/sleepwave-pro/");
  }
  ```
  So visiting `/` sends the user to `/products/sleepwave-pro/`.

- **`src/app/home/page.tsx`** — the actual homepage lives at the route **`/home`** (client component `"use client"`). It composes the section components in this exact top-to-bottom order, with `SectionDivider` components between them:
  1. `<HeroSection />`
  2. `<SectionDivider variant="aurora" />`
  3. `<WhySlumbor />` (imported from `why-luxen.tsx`)
  4. `<SectionDivider variant="ray" />`
  5. `<ProductShowcase />`
  6. `<SectionDivider variant="ray" />`
  7. `<Testimonials />`
  8. `<SectionDivider variant="aurora" />`
  9. `<BrandStory />`

**SectionDivider variants** (`src/components/ui/section-divider.tsx`):
- `aurora` (default): centered `flex justify-center py-8`; a `h-px w-full max-w-xl` shimmering line, `animate-shimmer`, background `linear-gradient(90deg, transparent, #E8B86A, #F2CE84, #E8B86A, transparent)` with `background-size: 200% 100%`.
- `ray`: centered `flex justify-center py-8`; a `h-px w-full max-w-xl` line, `bg-gradient-to-r from-transparent via-gold/30 to-transparent`.
- `gradient` (not used on home): `h-24 w-full section-gradient-gold`.

---

## PAGE: HOMEPAGE

- **Purpose:** Brand/landing experience — hero pitch, benefit grid, featured product, testimonials, brand story.
- **Route/URL:** `/home` (file `src/app/home/page.tsx`). NOT reachable from `/` since `/` redirects to the product page.
- **Component type:** `"use client"`.
- Renders the 9 items listed in the Routing Note above, in that order. Each section is detailed below.

### Section 1 — Hero (`src/components/sections/hero-section.tsx`)

- **Layout:** Full-height `section` (`min-h-screen`, `flex items-center`, `overflow-hidden`). Inner container `max-w-7xl mx-auto px-6 py-28 md:py-36`. A 2-column grid on desktop (`grid md:grid-cols-2 gap-10 md:gap-14 items-center`): left = text column (order-1, `text-center md:text-left`), right = the "WarmLight" centerpiece (order-2, hidden on mobile — `hidden md:flex`). On mobile the WarmLight appears inline between the eyebrow and headline (scaled to 90%, `md:hidden`).
- **Animations:** Text column fades/slides up (framer-motion `opacity 0→1, y 24→0`, 0.9s easeOut). Centerpiece scales in (`opacity 0→1, scale 0.92→1`, 1.1s, 0.15s delay). WarmLight wrapped in `<FloatingElement>` (floating animation).
- **Media:** NO product photo. `const HERO_IMAGE = "";` (empty) — a CSS-rendered "WarmLight" orb stands in as the centerpiece. The orb is built from divs:
  - Breathing halo: `atmosphere-lamp absolute h-[125%] w-[125%] rounded-full`.
  - Two concentric ring borders: `border border-gold/10` (full size) and `border border-gold/15` (82% size).
  - The light disc: `h-72 w-72 md:h-96 md:w-96 rounded-full`, background `radial-gradient(circle_at_50%_42%,#FBF1DF 0%,#E8C79A 22%,#C99B66 46%,#2A2238 78%,#161E33 100%)`, plus inset shadow `inset 0 -24px 60px rgba(10,15,28,0.7), inset 0 10px 40px rgba(251,241,223,0.25)`, plus a top-left highlight `bg-white/30 blur-2xl`.
  - If `HERO_IMAGE` were set, it would render a `next/image` with alt **"The SleepWave Pro resting in warm light"** — currently NOT rendered.
- **Copy (verbatim, in order):**
  - Eyebrow (uppercase, tracking, gold): `The Wind-Down Mask`
  - Headline (h1; "finally" is italic gold): `Let the day finally leave your body.`
  - Subhead/body paragraph: `The kind of warm pressure that pulls your shoulders down from your ears. The kind of quiet that makes your brain stop rehearsing tomorrow.`
  - Primary button (variant primary, size lg) → href `/products/sleepwave-pro/`: `Shop the SleepWave Pro`
  - Secondary button (variant secondary, size lg) → href `/shop/`: `Learn more`
  - Star rating glyphs: `★★★★★`
  - Rating caption: `Loved by thousands of tired humans`

### Section 2 — SectionDivider (aurora)
Shimmering gold line. No copy.

### Section 3 — Why Slumbor (`src/components/sections/why-luxen.tsx`, exported as `WhySlumbor`)

- **Layout:** `section py-24 md:py-36 px-6 section-gradient-gold`. Inner `max-w-7xl mx-auto`. A centered header block (`text-center mb-16`), then a 4-up card grid (`grid md:grid-cols-2 lg:grid-cols-4 gap-6`). Each card is a `GlassmorphismCard` (`h-full text-center`) with a rounded gold-tinted icon badge (`w-14 h-14 rounded-2xl bg-gold-light/60`, gold SVG), a heading, and a description. Each card wrapped in `ScrollReveal` with staggered delay (`i * 0.1`).
- **Media:** No photos. Four inline SVG icons (stroke `currentColor`, 28×28), one per card:
  - Card 1: lightning/activity zigzag `path d="M22 12h-4l-3 9L9 3l-3 9H2"`
  - Card 2: clock `circle r=10` + `path d="M12 6v6l4 2"`
  - Card 3: muted speaker `path d="M11 5 6 9H2v6h4l5 4V5z"` + two crossing lines (an "x")
  - Card 4: shield `path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"`
- **Copy (verbatim, in order):**
  - Eyebrow (contains `<BrandName />` which renders `SLUMBOR`): `Why SLUMBOR`
  - Headline (h2; "11pm" is a gold gradient): `Built for the version of you at 11pm.`
  - Subhead: `You've tried melatonin, white noise, and sleep apps. Here's what your nervous system actually responds to.`
  - **Card 1** title: `The warmth that signals safety`
    - desc: `Gentle heat around the eyes tells your nervous system the day is over and it's safe to wind down. The tension behind your eyes starts to let go.`
  - **Card 2** title: `A pulse your body recognizes`
    - desc: `A slow, rhythmic pressure that mimics the pace of a human touch. Your body reads it as a calming signal, the way a swaddled baby settles.`
  - **Card 3** title: `Silence that lets you drift`
    - desc: `It stays quiet the whole way through, from the moment you put it on until you are already asleep. That quiet is a big part of why it works so well.`
  - **Card 4** title: `The ritual, not the gadget`
    - desc: `Something you reach for every night, not another device you forget in a drawer. The one part of the day that's just for letting go.`

### Section 4 — SectionDivider (ray)
Thin gold line. No copy.

### Section 5 — Product Showcase (`src/components/sections/product-showcase.tsx`)

- **Layout:** `section py-24 md:py-36 px-6`. Inner `max-w-7xl mx-auto`. 2-column grid (`grid md:grid-cols-2 gap-8 md:gap-16 items-center`). Left = product image (`aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-gold/10`, with a gold-light gradient overlay on top). Right = text column (`text-center md:text-left`). Both wrapped in `ScrollReveal` (right column delay 0.2).
- **Media:** `next/image` from `heroProduct.images[0]` = **`/products/p1.webp`** (600×600, `object-cover`), alt = product title (`SleepWave Pro`).
- **Data source:** `heroProduct` from `src/lib/data.ts`.
- **Copy (verbatim, in order):**
  - Eyebrow: `Featured Product`
  - Headline (h2; product title is a gold gradient): `Meet the SleepWave Pro`
  - Body (from `heroProduct.description`): `By the end of the day your eyes are fried from screens and your head will not switch off. The SleepWave Pro wraps your eyes in gentle warmth and a slow pulse, two signals that tell your nervous system the day is over and it is safe to let go. The tension behind your eyes eases, your mind goes quiet, and you finally drift off into the kind of rest your body has been waiting for.`
  - **Feature list** — renders the FIRST 3 of `heroProduct.features` (each with a gold check icon, `polyline points="20 6 9 17 4 12"`):
    - Feature 1 title: `The warmth lasts`
      - desc: `Gentle, even heat around your eyes and temples for the full session. The kind that pulls the tension out from behind your eyes instead of just sitting on top of it.`
    - Feature 2 title: `The pulse is soft`
      - desc: `A slow rhythm that wraps your sinuses and temples the way a hand would. Designed to never press your eyes back into your head.`
    - Feature 3 title: `It stays silent`
      - desc: `No music, no beeps, no cheerful voice announcing it's done. It powers down quietly after 15 minutes, the way sleep actually starts.`
  - **Price block:** current price `$69.99` (from `heroProduct.price`), crossed-out compare price `$139.99` (from `heroProduct.compareAtPrice`), and a savings badge computed as `SAVE 50%` (rounded `(139.99-69.99)/139.99 * 100` = 50). Badge text renders as: `SAVE 50%`
  - Primary button (size lg) → href `/products/sleepwave-pro/`: `Get Yours Now`

### Section 6 — SectionDivider (ray)
Thin gold line. No copy.

### Section 7 — Testimonials (`src/components/sections/testimonials.tsx`)

- **Layout:** `section py-24 md:py-36 px-6 section-gradient-warm`. Inner `max-w-7xl mx-auto`. Centered header (`text-center mb-16`), then a card grid (`grid md:grid-cols-2 lg:grid-cols-3 gap-6`). Each testimonial is a `GlassmorphismCard` (`h-full`) with: a row of warm-colored star glyphs (`★`, count = rating), the quote (wrapped in curly quotes `&ldquo;…&rdquo;`), then name + role. Each wrapped in `ScrollReveal` with staggered delay (`i * 0.1`).
- **Media:** No images — only `★` star characters.
- **Copy (verbatim, in order):**
  - Eyebrow: `Real Results`
  - Headline (h2; "customers" is gold gradient): `What our customers are saying`
  - Subhead: `Don't just take our word for it. Here's what real people experience with the SleepWave Pro.`
  - **6 testimonial cards** (all rating 5 → 5 stars each):
    1. Quote: `My mind was constantly racing from staring at screens all day. The first few sessions felt different, but now I can't imagine not having it. The tension just melts away and I drift off effortlessly.`
       - Name: `Marcus T.` — Role: `Software Developer`
    2. Quote: `After three weeks of using this nightly, my sleep quality is about 70% better. I fall asleep faster and wake up actually feeling rested. This thing actually works.`
       - Name: `Sarah K.` — Role: `Office Manager`
    3. Quote: `I've spent hundreds on sleep supplements and gadgets. This device gives me more nightly relief than anything else I've tried. It's now the cornerstone of my bedtime routine.`
       - Name: `Brandon C.` — Role: `Freelance Designer`
    4. Quote: `I work long shifts and the stress builds up, making it impossible to wind down. This has been an absolute godsend. The relaxation is immediate.`
       - Name: `Lisa T.` — Role: `Registered Nurse`
    5. Quote: `The warmth and vibration around my eyes just dissolves the tension. Nothing else has worked like this for me. Even on the lowest setting it's deeply relaxing.`
       - Name: `James R.` — Role: `Construction Worker`
    6. Quote: `I recommend relaxation tools to my clients regularly. Having a portable, affordable option like this is excellent. The multiple modes give real versatility for different relaxation needs.`
       - Name: `Amanda G.` — Role: `Wellness Coach`

### Section 8 — SectionDivider (aurora)
Shimmering gold line. No copy.

### Section 9 — Brand Story (`src/components/sections/brand-story.tsx`)

- **Layout:** `section py-24 md:py-36 px-6`. Inner `max-w-7xl mx-auto`. 2-column grid (`grid md:grid-cols-2 gap-8 md:gap-16 items-center`). Left = story text (`text-center md:text-left`). Right = a vertical stack of 3 stat cards (`grid grid-cols-1 gap-6`), each a `glass-card rounded-2xl p-6 text-center`. Both columns wrapped in `ScrollReveal` (right delay 0.2).
- **Media:** No photos. The middle stat card contains an inline gold star SVG (`polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"`). Other stat numbers use `<AnimatedCounter>` (count-up animation).
- **Copy (verbatim, in order):**
  - Eyebrow: `Our Story`
  - Headline (h2; "tired of restless nights" is gold gradient): `Built for people who are tired of restless nights`
  - Body paragraph 1 (contains `<BrandName />` = `SLUMBOR`): `We started SLUMBOR because we were honestly fed up. We were tired of nights that dragged on with no real sleep at the end of them, and tired of spending money on remedies that cost a fortune and wore off in a week. The gadgets that promised the world and did nothing were the last straw.`
  - Body paragraph 2: `Heat and gentle pulse therapy like this has been used in wellness clinics and sleep centers for years, but it was always expensive and hard to get your hands on. We wanted to bring that same feeling home to everyone, at a price that actually makes sense.`
  - Secondary button → href `/about/`: `Read Our Full Story`
  - **Stat cards (3):**
    1. Number `10000+` (animated counter, target 10000, suffix `+`) — label: `Happy sleepers`
    2. Number `4.9/5` (hardcoded `4.9` + suffix `/5`) with a gold star icon — label: `Average rating`
    3. Number `180-Night` (animated counter, target 180, suffix `-Night`) — label: `Money-back guarantee`

---

## PAGE: SHOP

- **Purpose:** Product collection/catalog listing page.
- **Route/URL:** `/shop` (file `src/app/shop/page.tsx`). Linked from hero "Learn more" button and cart empty-state "Continue Shopping".
- **Component type:** `"use client"`.
- **Layout:** Outer `div py-16 md:py-24 px-6`, inner `max-w-7xl mx-auto`. Centered header block (`text-center mb-16`), wrapped in `ScrollReveal`. Then a product grid (`grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto`) rendering one `<ProductCard>` per product in `products` (each wrapped in `ScrollReveal` with delay `i * 0.1`). Note: `products` array contains only ONE product (`heroProduct`), so a single card renders.
- **Copy (verbatim, in order):**
  - Eyebrow: `Shop`
  - Headline (h1; "Collection" is gold gradient): `Our Collection`
  - Body: `Premium heated vibrating eye mask technology designed for deeper, better sleep.`
- **Product card content:** see ProductCard component below (renders `SleepWave Pro`, tagline, `$69.99`, crossed `$139.99`, `-50% OFF` badge, image `/products/p1.webp`).

---

## PAGE: TRACK ORDER

- **Purpose:** Let customers look up shipment status by order number + email; also cross-sells the product.
- **Route/URL:** `/track-order` (file `src/app/track-order/page.tsx`).
- **Component type:** `"use client"`.
- **Layout:** Outer `div py-16 md:py-24 px-6`, inner `max-w-3xl mx-auto`. Three `ScrollReveal` blocks stacked:
  1. Centered header (`text-center mb-12`).
  2. A `GlassmorphismCard` (`mb-12`) containing a form (`space-y-4`) with two labeled inputs and a submit button, plus microcopy below.
  3. A "Recommended for you" header + product grid (`grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto`) rendering a `<ProductCard>` per product.
- **Form fields:**
  - Label 1: `Order Number` — text input, placeholder `#1234`.
  - Label 2: `Email Address` — email input, placeholder `your@email.com`.
  - Submit button (`MagneticButton` variant primary, `w-full`, type submit): `Track Order`
  - Note: the form has no `onSubmit` handler — it is a static/non-functional form.
- **Copy (verbatim, in order):**
  - Eyebrow: `Track Order`
  - Headline (h1; "order" is gold gradient): `Track your order`
  - Body: `Enter your order details below to check the status of your shipment.`
  - Form label 1: `Order Number`
  - Form label 2: `Email Address`
  - Button: `Track Order`
  - Microcopy under form: `You can also track your order using the link in your shipping confirmation email.`
  - Cross-sell heading (h2): `Recommended for you`
- **Product card content:** same `<ProductCard>` as Shop (renders SleepWave Pro card).

---

## PAGE: 404 / NOT FOUND

- **Purpose:** Fallback for non-existent routes.
- **Route/URL:** any unmatched route (file `src/app/not-found.tsx`).
- **Component type:** `"use client"`.
- **Layout:** Full centered column (`min-h-[60vh] flex flex-col items-center justify-center px-6 text-center`). Giant faint "404" numeral, then a heading, body, and a button.
- **Media:** None.
- **Copy (verbatim, in order):**
  - Big numeral (h1, `text-[120px] md:text-[180px]`, `text-white/5`): `404`
  - Heading (h2): `Page not found`
  - Body: `Looks like this page doesn't exist. Let's get you back on track.`  *(rendered from `doesn&apos;t` and `Let&apos;s` → apostrophes)*
  - Button (`MagneticButton` variant primary) → href `/`: `Back to Home`

---

## PAGE: CART

- **Purpose:** Shopping cart — review items, adjust quantity, toggle protection plan, proceed to Shopify checkout.
- **Route/URL:** `/cart` (file `src/app/cart/page.tsx`).
- **Component type:** `"use client"`. Uses `useCart()` from `src/contexts/cart-context.tsx` and `createCheckout()` from `src/lib/shopify`.
- **Layout:** Outer `div py-16 md:py-24 px-6`, inner `max-w-3xl mx-auto`. Title, then EITHER an empty-state block OR the populated cart (items list + protection-plan toggle + subtotal box). All wrapped in `ScrollReveal`.
- **Checkout:** Clicking "Proceed to Checkout" runs `window.location.href = createCheckout(items, protectionPlan)` (redirects to Shopify checkout URL).

### Cart — always shown
- Page title (h1): `Your Cart`

### Cart — EMPTY state (when `items.length === 0`)
- Centered glass card (`text-center py-16 glass-card rounded-2xl`):
  - Text: `Your cart is empty`
  - Button (`MagneticButton` variant primary) → href `/shop/`: `Continue Shopping`

### Cart — POPULATED state (when items exist)
- **Item rows** (`glass-card rounded-2xl p-4 flex gap-4 items-center`), per line item:
  - Thumbnail: `next/image` from `item.image` (80×80, `object-cover`), alt = `item.title`.
  - Title: `Link` to `/products/{item.id}/` showing `item.title` (hover turns gold).
  - Price: `${unitPrice(item)}` in gold (2 decimals). If `lineDiscount(item) > 0`: also shows crossed-out `${item.price}` (lavender line-through) and a gold pill badge: `{lineDiscount}% OFF` (e.g. `10% OFF`).
  - Quantity stepper: a `-` button, the quantity number, a `+` button (round bordered buttons). `-` calls `updateQuantity(item.id, item.quantity - 1)`, `+` calls `+ 1`.
  - Remove control (text button, hover red): `Remove`
- **Protection plan toggle** (`label` styled as `glass-card rounded-2xl ... border border-gold/20`, checkbox is `sr-only` with a custom check box that fills gold + shows a check SVG when selected). Bound to `protectionPlan` / `setProtectionPlan`. Content pulled from `PROTECTION_PLAN` in cart-context:
  - Title (`PROTECTION_PLAN.title`): `3-Year Protection Plan`
  - Price (`+${PROTECTION_PLAN.price}`): `+$2.99`
  - Description: `Covers accidental damage for 3 years. One free replacement, no questions.`
  - Check icon SVG: `polyline points="20 6 9 17 4 12"` (stroke `#0E1626`).
- **Subtotal box** (`glass-card rounded-2xl p-6`):
  - Label: `Subtotal`
  - Amount: `${total}` (2 decimals; `total` = subtotal + $2.99 if protection plan selected).
  - Microcopy: `Shipping calculated at checkout`
  - Button (`MagneticButton` variant primary, size lg, `w-full`) → runs `handleCheckout`: `Proceed to Checkout`

---

## HOMEPAGE SECTION COMPONENTS — SUMMARY (what each renders + verbatim copy)

Full detail is given inline in the Homepage sections above. Condensed reference:

### `hero-section.tsx` (HeroSection)
- Renders: full-screen hero, CSS "WarmLight" orb centerpiece (no real image — `HERO_IMAGE = ""`), text column with eyebrow/headline/body/two buttons/star-rating.
- Verbatim: `The Wind-Down Mask` / `Let the day finally leave your body.` / `The kind of warm pressure that pulls your shoulders down from your ears. The kind of quiet that makes your brain stop rehearsing tomorrow.` / buttons `Shop the SleepWave Pro` (→ `/products/sleepwave-pro/`) and `Learn more` (→ `/shop/`) / `★★★★★` / `Loved by thousands of tired humans`.

### `why-luxen.tsx` (exported as WhySlumbor)
- Renders: gold-gradient section, centered header, 4-card benefit grid (glass cards with inline SVG icons).
- Verbatim: eyebrow `Why SLUMBOR` / headline `Built for the version of you at 11pm.` / subhead `You've tried melatonin, white noise, and sleep apps. Here's what your nervous system actually responds to.` / 4 cards (titles + descriptions as listed in Homepage Section 3).

### `product-showcase.tsx` (ProductShowcase)
- Renders: 2-col featured product section; image `/products/p1.webp` (heroProduct.images[0]); eyebrow/headline/description; first 3 features with check icons; price block ($69.99 / $139.99 / SAVE 50%); CTA.
- Verbatim: `Featured Product` / `Meet the SleepWave Pro` / heroProduct.description (full text in Homepage Section 5) / features 1-3 / `SAVE 50%` / button `Get Yours Now` (→ `/products/sleepwave-pro/`).

### `testimonials.tsx` (Testimonials)
- Renders: warm-gradient section, centered header, 6-card testimonial grid (glass cards, star glyphs, quote, name, role). All 6 are hardcoded in this file (separate from `reviewsData` in data.ts).
- Verbatim: `Real Results` / `What our customers are saying` / `Don't just take our word for it. Here's what real people experience with the SleepWave Pro.` / 6 quotes + names/roles (Marcus T., Sarah K., Brandon C., Lisa T., James R., Amanda G. — full quotes in Homepage Section 7).

### `brand-story.tsx` (BrandStory)
- Renders: 2-col story section, story text + `Read Our Full Story` button (→ `/about/`), and 3 stat cards (animated counters).
- Verbatim: `Our Story` / `Built for people who are tired of restless nights` / two body paragraphs (full text in Homepage Section 9) / `Read Our Full Story` / stats `10000+` "Happy sleepers", `4.9/5` "Average rating", `180-Night` "Money-back guarantee".

### `product/product-card.tsx` (ProductCard) — used by Shop & Track Order
- **Renders:** a `Link` to `/products/{product.handle}/` wrapping a glass card. Card contains:
  - Square image area (`aspect-square`, gradient bg). If discount > 0, a badge top-right (`bg-gold text-white`): `-{discount}% OFF`. Image = `product.images[0]` (400×400, `object-cover`, zoom on hover).
  - Body: product title (h3, hover gold), tagline (italic slate), price row.
- **Discount:** computed `Math.round((compareAtPrice - price)/compareAtPrice * 100)`. For SleepWave Pro = **50** → badge `-50% OFF`.
- **Verbatim content for the sole product (SleepWave Pro):**
  - Badge: `-50% OFF`
  - Title: `SleepWave Pro`
  - Tagline (italic): `The kind of quiet your body has been waiting for.`
  - Price: `$69.99` (gold) + crossed-out `$139.99` (only shown because compareAtPrice > price).
  - Image: `/products/p1.webp`
  - Card links to: `/products/sleepwave-pro/`

---

## DATA REFERENCE (used by the above; from `src/lib/data.ts`)

- **`heroProduct` / the only product in `products`:**
  - id/handle: `sleepwave-pro`
  - title: `SleepWave Pro`
  - tagline: `The kind of quiet your body has been waiting for.`
  - price: `69.99`; compareAtPrice: `139.99` (→ 50% off)
  - category: `Sleep & Wellness`
  - images (11): `/products/p1.webp`, `/products/p2.webp`, `/products/p3.webp`, `/products/p4-v2.webp`, `/products/p5.webp`, `/products/p6.webp`, `/products/p7.webp`, `/products/p8.webp`, `/products/p9.webp`, `/products/p10.webp`, `/products/p11.webp`
  - description (full): `By the end of the day your eyes are fried from screens and your head will not switch off. The SleepWave Pro wraps your eyes in gentle warmth and a slow pulse, two signals that tell your nervous system the day is over and it is safe to let go. The tension behind your eyes eases, your mind goes quiet, and you finally drift off into the kind of rest your body has been waiting for.`
  - features (6 total; homepage showcase uses first 3): titles `The warmth lasts`, `The pulse is soft`, `It stays silent`, `Gentle on your eyes`, `One button, no fuss`, `Lives on your nightstand` (descriptions in data file / Homepage Section 5 for first three).
- **`PROTECTION_PLAN`** (from `cart-context.tsx`): id `protection-plan-3yr`, title `3-Year Protection Plan`, price `2.99`.
- **`BrandName` component** renders the literal text `SLUMBOR` (uppercase, letter-spaced; optional `™` when `tm` prop true — not used on these pages).


---

# 3b. PRODUCT PAGE — SECTION-BY-SECTION

## Page purpose + route

- **Route:** `/products/[handle]/` — dynamic segment. The only product handle is `sleepwave-pro`, so the live URL is `/products/sleepwave-pro/`.
- **Purpose:** This is the single money page — the long-form sales/PDP for the one product in the catalog (the SleepWave Pro heated eye mask, sold under the SLUMBOR™ brand). It carries a sticky buy box at the top followed by a long stack of persuasion sections (benefits, pain-agitation, mechanism/"science", features, how-to, old-way-vs-new, comparison table, cost callout, offer summary, mid-page CTA, FAQ, guarantee, reviews) plus a floating live-purchase social-proof toast.
- **Rendering:** `page.tsx` is a server component. It calls `generateStaticParams()` (one param: `{ handle: "sleepwave-pro" }`) and `generateMetadata()`:
  - Page `<title>`: **`SleepWave Pro | Slumbor`** (built as `` `${product.title} | Slumbor` ``).
  - Meta `description`: the product `description` (verbatim from data.ts): *"By the end of the day your eyes are fried from screens and your head will not switch off. The SleepWave Pro wraps your eyes in gentle warmth and a slow pulse, two signals that tell your nervous system the day is over and it is safe to let go. The tension behind your eyes eases, your mind goes quiet, and you finally drift off into the kind of rest your body has been waiting for."*
  - If handle not found: renders `<h1>Product not found</h1>`, title `Product Not Found | Slumbor`.
- Server component finds the product and passes it to `<ProductPageClient product={product} />` (client component).

### Product data (from `src/lib/data.ts`, `heroProduct`)
- **id:** `sleepwave-pro`
- **handle:** `sleepwave-pro`
- **title:** `SleepWave Pro`
- **tagline:** `The kind of quiet your body has been waiting for.`
- **price:** `69.99`  |  **compareAtPrice:** `139.99`  →  discount computed = **50% OFF** (`(139.99-69.99)/139.99 ≈ 50`)
- **category:** `Sleep & Wellness`
- **images** (11, in order — all under `/products/`):
  1. `/products/p1.webp`
  2. `/products/p2.webp`
  3. `/products/p3.webp`
  4. `/products/p4-v2.webp`
  5. `/products/p5.webp`
  6. `/products/p6.webp`
  7. `/products/p7.webp`
  8. `/products/p8.webp`
  9. `/products/p9.webp`
  10. `/products/p10.webp`
  11. `/products/p11.webp`

**Shared offer constants** (`offer` object, referenced across sections): price 69.99, compareAtPrice 139.99, guaranteeDays 180, outcomeDays 14, warrantyYears 2, bonusName "The 14-Night Sleep Reset Workbook", bonusBlurb "a night-by-night plan that gets you sleeping better inside your guarantee", bonusValue 29, shipping "Free US shipping".

**Bundle discount logic** (`bundleDiscount(qty)`): qty>=3 → 20% off; qty===2 → 10% off; else 0. Quantity is the single source of truth; cart recomputes discount from quantity.

**Brand name rendering:** `<BrandName tm />` renders the word **SLUMBOR** (uppercase, letter-spaced, heading font, semibold) followed by a superscript **™**. Wherever "SLUMBOR™" appears below, it is this component.

---

## Render order (verified against `product-page-client.tsx`)

Buy box block (id `#buy`) → then in order:
`BenefitsHero` → `ReliefIntro` → `DiscoverSection` → `PerfectFor` → `ScienceSection` → `FeaturesLove` → `HowItWorks` → `EMSComparison` → `ComparisonTable` → `CostCallout` → `SpecialOffer` → `MidPageCTA` → `ProductFAQ` → `RiskFreeGuarantee` → `ProductReviews` → `PurchaseNotification` (floating, fixed).

> **Components present in `/components/product/` but NOT rendered on this page** (imported nowhere in product-page-client): `before-after.tsx` (BeforeAfter), `currency-converter.tsx` (useCurrency hook only), `slowwave-diagram.tsx` (SlowWaveDiagram), `who-its-for.tsx` (WhoItsFor). Their copy is catalogued at the end for completeness but they do not appear on the live product page.

---

## THE BUY BOX (`#buy`, top of page, rendered inline in product-page-client.tsx)

**Container:** `<div id="buy">` with `scroll-mt-24 py-6 md:py-12 px-6`, inner `max-w-7xl mx-auto`. Two-column grid on desktop: `grid md:grid-cols-2 gap-8 lg:gap-16 items-start`. Left column = gallery, right column = product info.

### Gallery (left column)

Two separate implementations swapped by breakpoint:

**Mobile gallery** (`md:hidden`, full-bleed `-mx-6`): a horizontal snap-scroll carousel. It renders `[...product.images, product.images[0]]` (all 11 images + a clone of image 1 appended at the end for seamless loop). Each slide is a square (`aspect-square`) with gradient background `from-gold-light via-surface to-gold-light`. Object-cover images 600×600. Dot pagination row below (11 dots, active dot is gold and wider). On the FIRST image only, a discount badge overlays top-right: **`-50% OFF`** (gold pill, navy text). Swiping past the end silently snaps back to slide 0.

**Desktop gallery** (`hidden md:block`, `md:sticky md:top-28`): a **sticky** main image panel (`aspect-square rounded-3xl`, gradient background, border) with fade cross-transition between images, plus left/right chevron arrow buttons (SVG polylines) that appear conditionally (left arrow hidden on first image, right arrow hidden on last). On the first image (`selectedImage === 0`) a scale-in **`-50% OFF`** gold badge overlays top-right. Below: a horizontal thumbnail strip of all 11 images (72×72 rounded squares; active thumb has gold border).
- Badge text template: `-{discountPct}% OFF` → `-50% OFF`.

### Product Info (right column)

Order top-to-bottom:

**1. Title (h1):** SLUMBOR™ (BrandName tm) + space + product title. Renders as: **SLUMBOR™ SleepWave Pro**
   - JSX: `<BrandName tm /> {product.title}`. Styling: 3xl→4xl→42px heading font, medium weight.

**2. Tagline (italic):** *The kind of quiet your body has been waiting for.*

**3. Star rating row:** five gold stars `★★★★★` (literal glyph string), then text: **`4.9 (2,347 reviews)`** (from `reviewDisplay.avg` = 4.9 and `reviewDisplay.count` = 2347, `.toLocaleString()`).

**4. Price row:**
   - Current price (gold, large): **`$69.99`**
   - Compare-at (lavender, line-through): **`$139.99`**
   - Pill (gold-light bg, gold text): **`SAVE 50%`** (template `SAVE {discountPct}%`).

**5. Countdown** — `<OfferCountdown />` (see component below). Renders a red-text line: **`Discount ends in {H hours} {M minutes}`**.

**6. Benefit Badges** — 3-column grid, each a gold-tinted rounded card with an SVG icon, a bold label, and a gold sublabel:
   | icon | label | sublabel |
   |---|---|---|
   | moon (crescent) | **Wind down** | **End the day** |
   | face-in-circle (smiley) | **Ease tension** | **Behind the eyes** |
   | clock | **Fall asleep** | **Without the fight** |

**7. Core Benefits** — checkmark list (gold check SVG), 4 items verbatim:
   - `End the day without a tension headache stacking on top`
   - `Loosen the strain behind your eyes from a long day at screens`
   - `Stop reaching for your phone just to get tired enough to sleep`
   - `Wake up without that heavy-eyed, run-over feeling`

**8. Tension-entry agitation callout** — separated by top border. Contents verbatim:
   - h3: **`By 11pm your eyes are fried and your head still won't switch off.`**
   - Body p1: `Gentle warmth and a slow pulse, two signals that tell your body the day is over, with no music and no beeping.`
   - Body p2 (with inline bold on "six months"): `Not better in two weeks? You've got six months to send it back for every cent, and you keep the workbook either way.`
     - (rendered: "You've got **six months** to send it back…", the words "six months" wrapped in `font-medium text-heading`.)

**9. Volume Discounts** — `<VolumeDiscounts basePrice={69.99} selectedTier=… onSelect=… />` (see component below). Heading **`Buy More, Save More`** with 3 selectable tier rows.

**10. Quantity selector + Add to Cart:**
   - Quantity stepper: `-` button, current number, `+` button (min 1).
   - ATC button label default: **`Add to Cart`**. After click, for 2 seconds shows a checkmark + **`Added!`**. Button is gold with navy text (`#0E1626`).
   - On add: fires cart `addItem` with product id/title/price/image[0] and the chosen quantity.

**11. Offer reassurance line** (below ATC), verbatim with inline gold span on the workbook:
   `Free US shipping, a 180-night guarantee, and a 2-year warranty. Plus The 14-Night Sleep Reset Workbook ($29 value), free with every order.`
   - ("The 14-Night Sleep Reset Workbook" rendered in gold `text-gold`.)

**12. Trust Badges** — 3-column grid (subtle white cards), SVG icon + label + muted sublabel:
   | icon | label | sublabel |
   |---|---|---|
   | delivery truck | **Free US** | **Shipping** |
   | shield | **180-Night** | **Guarantee** |
   | padlock | **Secure** | **Checkout** |

**13. ProductTabs** — `<ProductTabs product={product} />` (see component below).

### Buy-box side effects
- On mount, preloads all product images.
- On mount, fires Meta Pixel `ViewContent` with content_name=title, content_ids=[id], content_type "product", value=price, currency "USD".

---

## COMPONENT: OfferCountdown (`offer-countdown.tsx`)

Rendered inside buy box (step 5). Per-visitor countdown persisted in `localStorage` key `slumbor-offer-deadline`. First visit locks a random deadline **3h–5h30m** out; counts down in hours+minutes only (no seconds). If it hits zero, a fresh window starts (never sits at 0). Ticks every 30s.
- Layout: small red-400 text row (`text-xs`), a clock SVG then text.
- Copy (dynamic): **`Discount ends in {hourLabel} {minuteLabel}`** where hourLabel = e.g. "4 hours" (singular "hour" when 1) and minuteLabel = e.g. "17 minutes" (singular "minute" when 1). Example render: `Discount ends in 4 hours 12 minutes`.

---

## COMPONENT: VolumeDiscounts (`volume-discounts.tsx`)

Rendered inside buy box (step 9). basePrice = 69.99.
- Heading: **`Buy More, Save More`**
- Three radio-style selectable tier rows. Each row: radio dot, label, optional badge, right-side unit price + savings. Selected row highlighted gold. Tiers:
  | tier | label | badge | unit price (each) | savings |
  |---|---|---|---|---|
  | 1 | **Buy 1** | (none) | **$69.99 each** | (no savings line) |
  | 2 | **Buy 2** | **10% OFF** | **$62.99 each** | **Save $14.00** |
  | 3 | **Buy 3** | **20% OFF** | **$55.99 each** | **Save $42.00** |
   - unitPrice = basePrice×(1−discount/100); totalSavings = (basePrice−unitPrice)×qty. "each" is muted small text; "Save $X.XX" is gold. Badges are gold pills with navy text.

---

## COMPONENT: ProductTabs (`product-tabs.tsx`)

Rendered at the bottom of the buy box (step 13). Three tabs with an animated gold underline indicator. Tabs: **`Details`**, **`Shipping`**, **`Our Guarantee`**.

**Tab 1 — Details:** a checkmark list of `product.specs` (from data.ts), verbatim:
   - `Method: Warmth + pulse (the SlowWave Method)`
   - `Heat: 5 adjustable levels (35°C-55°C)`
   - `Pulse: 6 modes (steady, pulse, wave, and more)`
   - `Battery: 1200mAh rechargeable lithium (USB-C)`
   - `Run time: Up to 4 sessions per charge`
   - `Weight: 120g (ultra-light)`
   - `Silence: No music, no Bluetooth, no voice prompts, silent auto-off after 15 minutes`
   - `Warranty: 2-year free replacement if it ever stops working`
   - `In the box: SleepWave Pro, USB-C cable, travel pouch, plus The 14-Night Sleep Reset Workbook (digital)`

**Tab 2 — Shipping** (3 paragraphs, verbatim):
   - `Free US shipping on every order. No add-ons, no shipping protection upsell at checkout.`
   - `Orders are processed within 1-3 business days and ship with tracking. You'll get a tracking number by email the moment it's on its way.`
   - `Need help? Email us at shopslumbor@gmail.com` (email is a mailto link, gold).

**Tab 3 — Our Guarantee** (4 paragraphs, verbatim; bold on "180-night money-back guarantee"):
   - `Sleep on it for six months. We back the SleepWave Pro with a 180-night money-back guarantee that starts the day it arrives.`
   - `Sleep better within 14 nights or we make it right. No restocking fee, no questions about why, and you keep the bonus workbook either way.`
   - `It's also covered by a 2-year warranty. If it ever stops working, we replace it free.`
   - `Contact our friendly support team at shopslumbor@gmail.com and we'll make it right.` (email mailto link, gold).

---

## SECTION 1 — BenefitsHero (`benefits-hero.tsx`)

**Layout:** `<section>` py-20/28, `bg-surface`. Inner `max-w-6xl` two-column grid `md:grid-cols-2`, `items-center`. Text column (order-2 on mobile→order-1 desktop) on left; image column (order-1 mobile→order-2 desktop) on right. Wrapped in `ScrollReveal` (fade-up on scroll).

**Copy:**
- h2: **`What it actually does for you.`**
- Intro p: `Your nervous system has been running hard for fourteen hours. A few quiet minutes gives it the off-switch it's been asking for, so you can:`
- Checkmark bullet list (gold check SVG), verbatim:
  - `Loosen the tension that builds up behind your eyes after a long day`
  - `Ease off a screen headache before it has the chance to settle in`
  - `Let a racing mind slow down enough to actually drift off`
  - `Fall asleep on your own, without supplements, apps, or your phone`
  - `Wake up feeling clear instead of heavy and run down`

**Image:** `/products/benefits.webp` (alt "SleepWave Pro heated eye mask", 700×700, rounded-3xl, object-cover).

---

## SECTION 2 — ReliefIntro (`relief-intro.tsx`)

**Layout:** `<section>` py-20/28, `bg-surface section-glow-purple`. Inner `max-w-4xl`. Centered header, then a 2-column grid (`sm:grid-cols-2`) of 4 pain-point cards, then a highlighted gold reassurance callout. ScrollReveal on each block (staggered delay `i*0.08`).

**Copy:**
- Eyebrow (uppercase gold): **`Sound familiar?`**
- h2: **`Give your nervous system the off-switch it's been begging for.`**
- Four pain-point cards (each = icon + title + body):
  1. **`Wired all evening`** — `Eyes burning by 4pm, headache by 7pm, still can't switch off by 11pm.` (icon: eye)
  2. **`Exhausted but awake`** — `Lying there completely drained, and your brain still won't power down.` (icon: moon)
  3. **`Tried everything`** — `Melatonin, supplements, sleep apps. Still staring at the ceiling.` (icon: key)
  4. **`Rough mornings`** — `Waking up groggy and heavy, like a truck ran over you in the night.` (icon: sunrise)
- Bottom callout (gold-bordered card, gold check SVG), with inline bold lead:
  `You don't have to keep grinding through it. SLUMBOR™ is built for exactly this: warmth and a slow pulse that walk your body down into sleep, in the kind of quiet that lets it work.`
  - ("You don't have to keep grinding through it." is `font-semibold`; SLUMBOR™ = `<BrandName tm />`.)

---

## SECTION 3 — DiscoverSection (`discover-section.tsx`)

**Layout:** `<section>` py-20/28, `bg-background section-glow-gold`. Inner `max-w-6xl`, 2-column grid `md:grid-cols-2` `items-center`. Image left, text right. ScrollReveal (image delay 0, text delay 0.15).

**Image:** `/products/before-after.webp` (alt "Before and after Slumbor", 700×700, aspect-square rounded-3xl).

**Copy (right column):**
- h2 (gold): **`The cycle ends tonight.`**
- Lead p (inline bold "Meet" + SLUMBOR™): `Meet SLUMBOR™, a heated eye mask for anyone sick of staring at the ceiling with a fried head and a brain that won't shut up.`
  - ("Meet" = `font-medium text-heading`; SLUMBOR™ = `<BrandName tm className="text-heading" />`.)
- Gold-bullet list (• markers), verbatim:
  - `Built for screen-tired eyes and a nervous system stuck in overdrive`
  - `Uses gentle warmth and a soft pulse your body responds to, in complete silence`
  - `Works in a matter of minutes, not weeks of waiting it out`
  - `Small enough to live on your nightstand and become part of the routine`

---

## SECTION 4 — PerfectFor (`perfect-for.tsx`)

**Layout:** `<section>` py-20/28, `bg-surface section-glow-gold`. Inner `max-w-6xl`, 2-column grid `md:grid-cols-2` `items-start`. Image left, text right. ScrollReveal (image 0, text 0.15).

**Image:** `/products/who-its-for.webp` (alt "Who SleepWave Pro is for", 700×700, aspect-square rounded-3xl).

**Copy (right column):**
- h2: **`Who is this for?`**
- Lead p: `If any of this sounds like you:`
- Gold-bullet list (• markers), verbatim:
  - `You can't fall asleep even when you are completely worn out`
  - `You stare at screens all day and feel it by the time night comes`
  - `You get a tension headache by the end of almost every workday`
  - `You have tried melatonin, apps, and tea, and still can't switch off`
  - `You wake up at 2am with a brain that simply will not stop`
- Transition p (inline SLUMBOR™): `Then SLUMBOR™ was made with you in mind.`
  - (SLUMBOR™ = `<BrandName tm className="text-heading" />`.)
- Checkmark list (gold check SVG), verbatim:
  - `Real relief from the comfort of your own bed`
  - `No supplements, no apps, and nothing to subscribe to`
  - `Deeper sleep, fewer headaches, and calmer mornings`

---

## SECTION 5 — ScienceSection (`science-section.tsx`)

**Layout:** `<section>` py-20/28, `bg-surface section-glow-gold`. Inner `max-w-6xl`, 2-column grid `md:grid-cols-2` `items-center`. **Image is on the right** (`md:order-last`), text on left. ScrollReveal (image 0, text 0.15).

**Image:** `/products/science.webp` (alt "The science behind SleepWave Pro", 700×700, aspect-square rounded-3xl).

**Copy (left column):**
- Eyebrow (uppercase gold): **`The SlowWave Method`**
- h2: **`How warmth and a slow pulse walk your nervous system to sleep.`**
- Three bullet items (• gold marker; each has a bold lead word then body):
  - **`Warmth.`** `Gentle heat relaxes the muscles around your eyes and the tension starts to let go.`
  - **`Pulse.`** `A slow, soft rhythm your body reads as a signal to calm down.`
  - **`Silence.`** `No music, no beeping, just quiet. That quiet is the part that lets it work.`
  - (Each lead word renders as `{name}.` in `font-medium text-heading`, i.e. "Warmth.", "Pulse.", "Silence.")

---

## SECTION 6 — FeaturesLove (`features-love.tsx`)

**Layout:** `<section>` py-20/28, `bg-background`. Inner `max-w-5xl`. Centered header, then a 2-column card grid (`sm:grid-cols-2`) of 4 feature cards (icon in gold-tinted rounded square, title, body). ScrollReveal staggered `i*0.08`.

**Copy:**
- Eyebrow (uppercase gold): **`The details`**
- h2: **`Every part of it earns its place.`**
- Four feature cards:
  1. **`Contoured 3D cups`** — `The cups arch over your eyes instead of pressing on them. No weight on your eyelids, so it stays comfortable the whole time you wear it.` (icon: eye)
  2. **`Five heat settings`** — `Choose a light warmth or a deeper heat, whatever your face needs that night. The warmth is what tells your body it is safe to wind down.` (icon: thermometer)
  3. **`Adjustable strap`** — `Loosen or tighten it to your head in seconds. It stays put when you roll over and never pulls at your hair.` (icon: sliders)
  4. **`Six pulse modes`** — `A soft, steady pulse around your eyes, like a slow massage. Your body reads the rhythm as a cue to calm down.` (icon: activity/pulse line)

---

## SECTION 7 — HowItWorks (`how-it-works.tsx`)

**Layout:** `<section>` py-20/28, `bg-background section-glow-purple`. Inner `max-w-4xl`. Centered header, then a 3-column grid (`sm:grid-cols-3`) of steps. Each step = circular image (round, bordered) + gold "Step N" label + italic description. ScrollReveal staggered `i*0.1`.

**Copy:**
- h2: **`How to use it`**
- Three steps (image + `Step {n}` label + italic description):
  1. Image `/products/step1.webp` (alt "Step 1"), label **`Step 1`**, desc: *`Slip the mask on and adjust the strap until it feels held in place, not tight.`*
  2. Image `/products/step2.webp` (alt "Step 2"), label **`Step 2`**, desc: *`Press the button and choose warmth, pulse, or both, then dial it in to whatever tonight calls for.`*
  3. Image `/products/step3.webp` (alt "Step 3"), label **`Step 3`**, desc: *`Lie back and let your breath slow down. Most people are asleep before the timer even ends.`*
   - (Step images 250×250, object-cover scaled 1.18 inside round frames.)

---

## SECTION 8 — EMSComparison (`ems-comparison.tsx`)

**Layout:** `<section>` py-20/28, `bg-surface`. Inner `max-w-5xl`. Centered header, then a 2-column grid (`md:grid-cols-2`) of two contrasting cards: a muted "OLD WAY" card (left) and a gold-highlighted "SLEEPWAVE PRO" card (right). Each card has a decorative CSS-only illustration block (no real image), a corner tag, a heading, body, and a footer status line. ScrollReveal (left 0.1, right 0.2).

**Copy:**
- Eyebrow (uppercase gold): **`The Difference`**
- h2: **`The old way vs the SleepWave Pro`**

- **Left card — corner tag: `OLD WAY`**
  - Decorative illustration caption: `STILL WIRED AT MIDNIGHT` (with 3 dull red dots)
  - h3: **`Pills, apps, and the wait-it-out method`**
  - Body: `Melatonin fades, apps keep you on your phone, and a hot shower wears off fast. None of it tells your body the day is actually over.`
  - Footer status (X icon): **`Never reaches the signal your body needs`**

- **Right card — corner tag: `SLEEPWAVE PRO`**
  - Decorative illustration captions: `WARMTH + PULSE` (top) and `NERVOUS SYSTEM, OFF` (bottom), with an animated ping ring.
  - h3: **`Warmth and a slow pulse, in silence`**
  - Body: `Two signals your body is built to respond to, in fifteen quiet minutes a night. The last calm thing you do before sleep, instead of the thing you fight.`
  - Footer status (check icon): **`Signals your body actually responds to`**

---

## SECTION 9 — ComparisonTable (`comparison-table.tsx`)

**Layout:** `<section>` py-20/28, `bg-background`. Inner `max-w-3xl`. Centered header, then a bordered 4-column comparison table. Columns: (row label) | **SleepWave Pro** (gold header) | **Pills & supplements** | **Regular eye mask**. Boolean cells render a gold check (true) or muted cross (false); the Price row renders text. Alternating row shading. ScrollReveal.

**Copy:**
- Eyebrow (uppercase gold): **`Compare`**
- h2: **`SleepWave Pro vs the alternatives`**
- Column headers: `SleepWave Pro`, `Pills & supplements`, `Regular eye mask`
- Rows (label → SleepWave / Supplements / Mask):
  | Row label | SleepWave Pro | Pills & supplements | Regular eye mask |
  |---|---|---|---|
  | **Price** | **$69.99 once** | **$30-60/month** | **$10-20** |
  | **Tells your nervous system to wind down** | ✓ | ✗ | ✗ |
  | **Warmth and a slow pulse in one, in total silence** | ✓ | ✗ | ✗ |
  | **Works in minutes, not weeks** | ✓ | ✗ | ✗ |
  | **No subscription, no refills** | ✓ | ✗ | ✓ |
  | **Doesn't leave you groggy in the morning** | ✓ | ✗ | ✓ |
  | **Drug-free** | ✓ | ✗ | ✓ |
  | **Easy to use right before bed without your phone** | ✓ | ✗ | ✓ |

---

## SECTION 10 — CostCallout (`cost-callout.tsx`)

**Layout:** `<section>` py-16/20. Inner `max-w-4xl` full-width gold gradient banner (`from-gold via-#CFA05A to-gold`, shine overlay), rounded-3xl, dark navy text (`#0E1626`), centered. ScrollReveal.

**Copy:**
- h2: **`A bottle of melatonin runs out in three weeks.`**
- Body (with inline bold+underline on price): `The SleepWave Pro costs $69.99 once, and you can use it every night for the rest of your life.`
  - ("$69.99 once" is `font-semibold underline underline-offset-4`.)

---

## SECTION 11 — SpecialOffer (`special-offer.tsx`)

**Layout:** `<section>` py-20/28, `bg-surface section-glow-gold`. Inner `max-w-6xl`. Centered header + a 4-item offer grid (`grid-cols-2 md:grid-cols-4` gold cards), then a 2-image grid, then a centered price reveal. ScrollReveal on each block.

**Copy:**
- Eyebrow (uppercase gold): **`Limited-time offer`**
- h2: **`Everything you need to finally sleep.`**
- Sub p (inline gold lead): `Special offer today. Try the SleepWave Pro risk-free at the lowest price it has ever been.`
  - ("Special offer today." = `text-gold font-semibold`.)
- Four offer cards (value + label, each with icon):
  | value | label |
  |---|---|
  | **50% OFF** | **the SleepWave Pro** |
  | **FREE** | **$29 Sleep Reset Workbook** |
  | **180 nights** | **money-back guarantee** |
  | **FREE** | **US shipping** |
- **Two images** (2-column grid):
  - Left: `/products/what-you-get-left-v2.webp` (alt "The SleepWave Pro mask and the 14-Night Sleep Reset Workbook", 1200×1200).
  - Right: `/products/what-you-get-right-v2.webp` (alt "Everything included: free shipping, the bonus workbook, and the 180-night guarantee", 1200×900).
- **Price reveal** (centered):
  - Compare-at (lavender line-through): **`$243`**
  - Price (large gold): **`$69.99`**
  - Caption (inline SLUMBOR™): `Everything above, one charge, one mask, and SLUMBOR™ ships it free.`
    - (SLUMBOR™ = `<BrandName tm />`.)

---

## SECTION 12 — MidPageCTA (`mid-page-cta.tsx`)

**Layout:** `<section>` px-6 py-20/28, gradient bg (`from-background via-surface to-background`). Inner `max-w-2xl` centered. ScrollReveal.

**Copy:**
- h2: **`Tonight could be the night your brain finally lets go.`**
- Button (gold pill, navy text, anchors to `#buy`): **`Try it tonight`**
- Sub p (lavender): `Free US shipping, a 180-night guarantee, and your money back if you are not sleeping better in 14 nights.`

---

## SECTION 13 — ProductFAQ (`product-faq.tsx`)

**Layout:** `<section>` py-20/28, `bg-background section-glow-gold`. Inner `max-w-3xl`. Centered header, then an accordion of 6 items (rounded cards, click to expand, animated + → × rotate icon). ScrollReveal staggered `i*0.05`.

> NOTE: This on-page FAQ uses its own local `faqItems` array (6 items) — NOT the larger `faqData` array in data.ts (that 13-item array feeds a different page). Both catalogued.

**Copy:**
- h2: **`FAQs`**
- Six accordion items (question → answer), verbatim:
  1. Q: **`How long does it last on a charge?`**
     A: `You will get up to four sessions out of a single charge, and it tops back up in about an hour and a half over USB-C, so it tends to just live on your nightstand and stay ready whenever you need it.`
  2. Q: **`Does it actually help with headaches, or just sleep?`**
     A: `It helps with both, honestly. The warmth and the slow pulse loosen the tension that builds up behind your eyes and temples after a long day on screens, so a lot of people reach for it the moment a tension headache starts, and not only at bedtime.`
  3. Q: **`Is the pulse going to feel like too much on my eyes?`**
     A: `Not at all. The pulse is built to sit gently around your sinuses and temples rather than push on your eyes, so most people describe it as feeling like a warm hand resting softly over their face while they fall asleep.`
  4. Q: **`How long do I wear it each night?`**
     A: `About fifteen to twenty minutes is all it takes, and there is an auto shutoff so you do not have to think about it. You put it on, you lie back, and most people are asleep before it finishes the session.`
  5. Q: **`What if it breaks?`**
     A: `It is covered by a two-year warranty, so if it ever stops working, just send us a quick email at shopslumbor@gmail.com and we will get a free replacement out to you. There is no fine print and nothing to argue about.`
  6. Q: **`What if it doesn't work for me?`**
     A: `Then you send it back, simple as that. You have a full 180 nights to try it, and if you are not sleeping better, email us at shopslumbor@gmail.com for a refund of every cent. You keep the bonus workbook either way, and there is no restocking fee and no questions about why.`

---

## SECTION 14 — RiskFreeGuarantee (`risk-free-guarantee.tsx`)

**Layout:** `<section>` py-20/28, `bg-surface section-glow-gold`. Inner `max-w-3xl` centered. Amber shield seal icon at top, eyebrow, h2, intro, then a 2-column bullet grid of guarantee promises, then closing lines + email. ScrollReveal.

**Copy:**
- Eyebrow (uppercase gold): **`Our promise`**
- h2: **`The worst that happens? You sleep on it for six months.`**
- Intro p: `If you've made it this far, you're tired of being sold to. So here's the honest version.`
- Bullet grid (gold check each), 6 items verbatim:
  - `180-night full refund, starting the day it arrives`
  - `Sleep better in 14 nights, or we make it right`
  - `2-year warranty: free replacement if it ever stops working`
  - `No restocking fee, no questions about why`
  - `Keep the bonus workbook either way`
  - `Real humans answer your email within 24 hours`
- Closing p (two lines, `<br/>` between): `We built this because we needed it ourselves.` / `We stand behind it.`
- Email line: `Questions? Email us anytime at shopslumbor@gmail.com` (email = gold mailto link).

---

## SECTION 15 — ProductReviews (`product-reviews.tsx`)

**Layout:** `<section>` py-24/36, `bg-background`. Inner `max-w-5xl`. Centered header, then a summary "glass-card" (big average number + star row + rating distribution bars), then a 2-column grid of review cards (16 shown initially, "Read more reviews" loads +16), then a trailing count line. Data from `reviewsData` and `reviewDisplay` in data.ts.

**Copy / structure:**
- h2: **`Customer Reviews`** ("Reviews" rendered via gold TextGradient).
- Summary card:
  - Big average: **`4.9`** (`reviewDisplay.avg`)
  - 5-star row
  - Count: **`2,347 reviews`** (`reviewDisplay.count` = 2347, toLocaleString)
  - Distribution bars (from `reviewDisplay.dist`, pct of 2347):
    | stars | count |
    |---|---|
    | 5 | 2,160 |
    | 4 | 130 |
    | 3 | 35 |
    | 2 | 14 |
    | 1 | 8 |
- Review cards: each shows avatar (first initial), name, a gold **`Verified`** badge (check icon), star rating, date, and review text. Grid is capped to an even count. Initial 16 visible.
- "Show more" control: button **`Read more reviews`** while more remain; once all shown, trailing line: `Plus {remainingReviews} more reviews from people who finally got some sleep.` where remainingReviews = 2347 − (even-capped visible count). (reviewsData has 42 entries → even cap 42 → remaining = 2347 − 42 = **2,305**; renders "Plus 2,305 more reviews from people who finally got some sleep.")

**ALL review cards, verbatim (from `reviewsData`, in array/display order — name · rating · date · text):**

1. **Hannah W.** · 5★ · May 24, 2026 — `my old massager used to literally announce GOODBYE when it shut off and wake me right back up. this one just goes quiet. and it doesnt crush my eyes either, the pressure is soft. the two things i hated most about my last one are just gone`
2. **Denise R.** · 5★ · May 19, 2026 — `I have fallen asleep several times while using it which is very unlike me because it usually takes me hours. I stare at a screen all day and by night my head is pounding and my brain wont shut up. This is the first thing that actually quiets it.`
3. **Tiffany H.** · 5★ · May 12, 2026 — `listen. this thing will put you to sleep. i mean snoring sleep lol. i put it on, the warmth spreads out across my eyes, and thats the last thing i remember. my husband knows when i put it on to just leave me alone hahaha`
4. **Marcus L.** · 5★ · May 6, 2026 — `by 4pm my eyes are burning and by 7 my head is in a vice from staring at a monitor all day. i was honestly skeptical but i was out before the timer even ended. didnt believe it til it happened to me`
5. **Priyanka N.** · 5★ · Apr 30, 2026 — `If you get migraines you know how debilitating they are. I was desperate one night and put this on and it actually took the edge off before it got bad. Now I reach for it the second I feel the tension starting behind my eyes.`
6. **Aaron T.** · 5★ · Apr 23, 2026 — `every time i laid down my chest would get tight and my brain would start dumping every worry from the day. id lie there an hour minimum. the slow pulse gives my mind something to follow and i just drift. didnt think anything could turn my brain off but here we are`
7. **Gabriela S.** · 5★ · Apr 17, 2026 — `my family made fun of me when i unboxed it and slipped it on. joke is on them, three of them have ordered their own now. everyone who laughed wants one`
8. **Sophie L.** · 5★ · Apr 11, 2026 — `i work from home and my eyes are fried by bedtime, dry and strained. ten minutes of the heat and its like a reset. i sleep so much deeper now and wake up without that heavy feeling behind my eyes`
9. **Devon M.** · 4★ · Apr 4, 2026 — `my old one had this loud voice that announced silent mode and woke me up every time, drove me insane. this one is dead silent, no beeps no nothing. only reason for 4 stars is i wish the strap was a touch longer. warm, quiet, and im gone`
10. **Renee K.** · 5★ · Mar 30, 2026 — `melatonin, magnesium, tea, a meditation app, you name it i tried it. half of them left me groggy in the morning. this is the only thing that gets me down without the hangover. skeptical at first, obsessed now`
11. **Carmen V.** · 5★ · Mar 25, 2026 — `twelve hour shifts, my eyes are destroyed by the time im home. this feels like a warm compress at a spa. i used to lie there wired from the shift, now im asleep before the auto shutoff`
12. **Megan F.** · 5★ · Mar 18, 2026 — `i carry all my stress in my forehead and behind my eyes. the warmth plus the soft pulse loosens it in a way nothing else has. its become the one part of my night i actually look forward to`
13. **Ian P.** · 5★ · Mar 12, 2026 — `first time in a long time i woke up without that tired heavy feeling in my eyes. i didnt even realize how much tension i was holding until it was gone`
14. **Wade B.** · 5★ · Mar 5, 2026 — `i drive long haul and sleep in weird places at weird times. this is the only thing that gets me down fast in a loud truck stop. heat on, eyes covered, out cold`
15. **Olivia D.** · 5★ · Feb 27, 2026 — `got it for my sister whos a new mom running on no sleep. she said the fifteen minutes before bed with this is the most relaxed shes felt in months. thanked me like five times`
16. **Aisha P.** · 5★ · Feb 20, 2026 — `I've tried melatonin, chamomile tea, weighted blankets, and basic sleep masks. Nothing worked like this. The warmth and the slow pulse together are unlike anything else I've used and I actually wake up feeling rested now.`
17. **Emily W.** · 5★ · Feb 14, 2026 — `I have the worst time winding down after work. My brain just wont shut off. This is now my nightly ritual. Put it on, turn on the wave mode, and I'm asleep before the auto shutoff even kicks in.`
18. **Ryan P.** · 5★ · Feb 8, 2026 — `i work at a screen all day and my eyes are always strained and tired by bedtime. this with the heat on medium is the perfect way to decompress. sleeping like a baby now`
19. **Rachel D.** · 5★ · Feb 2, 2026 — `the eye strain relief alone is worth it. i stare at screens 10+ hours a day and putting this on at night is like a spa treatment for my eyes. the warm compress feeling is incredible`
20. **Marcus A.** · 5★ · Jan 27, 2026 — `this is way better than any sleep supplement ive tried. no groggy feeling in the morning, no dependency, just genuine relaxation that puts you to sleep naturally. the warmth is the real star here`
21. **Alex R.** · 5★ · Jan 21, 2026 — `skeptical at first but this thing is legit. the warmth spreads across your eyes and you can literally feel your body relaxing. highly recommend to anyone who takes forever to fall asleep`
22. **Samantha R.** · 5★ · Jan 15, 2026 — `Bought two, one for me and one for my mom. She's obsessed. The different pulse modes are perfect and the heat is genuinely soothing. Great quality for the price.`
23. **James C.** · 5★ · Jan 9, 2026 — `got this because my sleep was terrible from anxiety and my roommate immediately ordered one too after trying mine. we both use them nightly now. best purchase of the year easily`
24. **Sophie C.** · 5★ · Jan 3, 2026 — `Bought it for my insomnia and it completely changes how I feel by morning. I put it on with the wave mode while lying in bed and it just melts the tension away. Absolutely love it.`
25. **Megan T.** · 5★ · Dec 29, 2025 — `I carry all my stress in my eyes and forehead and this has genuinely changed my bedtime. the pulse mode is so nice for releasing tension. best purchase I've made this year honestly`
26. **Jordan B.** · 4★ · Dec 22, 2025 — `great device for the price. the heat and pulse combo is really effective for falling asleep faster. only giving 4 stars because shipping took a bit longer than i expected but the product itself is 5/5`
27. **Danielle S.** · 5★ · Dec 16, 2025 — `perfect for my nighttime wind-down. i put it on in bed, heat on level 3, wave mode, and im out within 10 minutes. the auto shutoff means i never have to worry about it. absolute essential now`
28. **Tom H.** · 5★ · Dec 10, 2025 — `replaced my old sleep mask with this and the difference is night and day. so much more than just blocking light. the heat and pulse actually help you fall asleep instead of lying there. 10/10`
29. **Lisa N.** · 5★ · Dec 4, 2025 — `My daughter has been struggling with sleep from studying late and staring at screens all day. Got her this and she literally thanked me which never happens lol. She falls asleep so much faster now.`
30. **Nina G.** · 5★ · Nov 28, 2025 — `My husband and I both use one now. He was the skeptic but after trying mine he ordered his own within a week. We both sleep so much better and wake up clearer.`
31. **Carlos V.** · 5★ · Nov 21, 2025 — `this thing is way better than expected. i was worried it would be some cheap gimmick but its actually really well built. the heat feels like a warm compress at a spa. genuinely helps me sleep`
32. **Priya S.** · 5★ · Nov 15, 2025 — `Perfect gift for my sister who's a new mom and hasn't slept properly in months. She says the 15 minutes she gets with this before bed is the most relaxed she feels all day.`
33. **Brandon W.** · 4★ · Nov 9, 2025 — `solid product. really helps me unwind before bed. my only minor complaint is the strap could be slightly more adjustable for larger heads but it still fits me fine. heat and pulse are excellent`
34. **Natalie L.** · 5★ · Nov 3, 2025 — `so comfortable. it fits perfectly and doesnt put any pressure on my eyes. i was worried it would feel heavy but it barely weighs anything. sleep quality has genuinely improved`
35. **Danielle O.** · 5★ · Oct 28, 2025 — `second one i bought. first was for me and this one is for my best friend for her birthday. she has terrible insomnia and is going to love this. quality is consistent between both units`
36. **Mike T.** · 5★ · Oct 22, 2025 — `my wife and i both use this every night now, we each have our own. its become part of our routine. 15 minutes before bed and we both sleep so much deeper. cant recommend enough`
37. **Rachel T.** · 5★ · Oct 16, 2025 — `the 15 minute auto shutoff is a lifesaver. i always fall asleep before it even turns off which tells you how well it works. no more lying in bed scrolling my phone for hours`
38. **Zara L.** · 5★ · Oct 10, 2025 — `I'm an optometrist and I recommend warm compresses to my patients regularly. Having an affordable heated mask with a gentle pulse like this is excellent. The quality is genuinely impressive for the price.`
39. **Ethan G.** · 5★ · Oct 4, 2025 — `i travel a lot for work and this is essential in my carry-on now. hotel sleep used to be awful but now i put this on and im out cold. the travel pouch is a nice touch`
40. **Isabel R.** · 5★ · Sep 28, 2025 — `My doctor suggested heat therapy for my eye strain and tension headaches. This has been perfect. The soothing warmth with the gentle pulse is so effective. Best money I've spent on my health this year.`
41. **Kayla D.** · 4★ · Sep 21, 2025 — `really effective. the heat levels are all genuinely different temps which is nice. only reason for 4 stars is i wish there was an app but the buttons work fine and honestly its easier without a phone`
42. **Noah F.** · 5★ · Sep 15, 2025 — `ive shown this to literally everyone i know and they all want one. just ordered two more as gifts for my parents who both have trouble sleeping. the quality is genuinely impressive`
43. **Chloe W.** · 5★ · Sep 9, 2025 — `just wow. i didnt expect much for $70 but this exceeded all my expectations. the warmth is perfectly gentle and the pulse is so relaxing. my whole family fights over it now lol`

> (reviewsData contains 43 entries; the page even-caps to 42 for the 2-column grid, so entry #43 Chloe W. is present in the data but the last card is dropped to keep rows even. All 43 catalogued above for completeness.)

---

## SECTION 16 — PurchaseNotification (`purchase-notification.tsx`) — floating toast

**Layout:** `fixed`, bottom-center on mobile / bottom-right on desktop, `z-40`. A small "just purchased" toast card (avatar initial + message + time-ago + dismiss X, gold left border). First appears 8s after mount, visible 5s; then recurs every 35s, cycling through the names list. Spring animation in/out.

**Copy (dynamic template):** `{name} from {city} just purchased SleepWave Pro` + a time-ago line.
- ("SleepWave Pro" rendered gold/semibold; name bold.)

**Names/cities pool (30, cycled in order):**
Sarah — Plano, TX · Marcus — Littleton, CO · Jessica — Hoboken, NJ · David — Bend, OR · Emily — Naperville, IL · Ryan — Carlsbad, CA · Amanda — Franklin, TN · Tyler — Redmond, WA · Lauren — Coral Springs, FL · Chris — Gilbert, AZ · Megan — Cary, NC · Jordan — Beaverton, OR · Priya — Alpharetta, GA · Derek — Overland Park, KS · Olivia — Folsom, CA · Hassan — Eagan, MN · Sophie — Leesburg, VA · Alex — Broken Arrow, OK · Tanya — Roswell, GA · Brandon — Huntersville, NC · Lisa — Westfield, IN · Kevin — Cedar Park, TX · Nina — Murfreesboro, TN · Liam — Bothell, WA · Jade — Cheshire, CT · Carlos — Katy, TX · Anna — Gig Harbor, WA · Mike — Papillion, NE · Zara — Chandler, AZ · Tom — Flower Mound, TX

**Time-ago pool (10, cycled by `index % 10`):**
`2 minutes ago`, `5 minutes ago`, `8 minutes ago`, `12 minutes ago`, `3 minutes ago`, `6 minutes ago`, `1 minute ago`, `9 minutes ago`, `4 minutes ago`, `7 minutes ago`

---

## APPENDIX — Components in `/components/product/` NOT rendered on this page

These files exist but are not imported by `product-page-client.tsx`, so they do not appear on the live product page. Catalogued for completeness.

### BeforeAfter (`before-after.tsx`) — UNUSED on product page
Two-column "Life Before vs After" section.
- Eyebrow: **`The Transformation`**
- h2: **`Life Before vs After the SleepWave Pro`**
- Left card heading: **`Without It`** — items:
  - `Lying awake for hours, unable to quiet your mind`
  - `Tension building up behind your eyes throughout the day`
  - `Spending $60+ per session on sleep therapies that barely help`
  - `Relying on sleeping pills just to get through the night`
  - `Waking up exhausted and dreading the day ahead`
- Right card heading: **`With SleepWave Pro`** — items:
  - `Drifting off peacefully within minutes of lying down`
  - `Getting through the day feeling rested and refreshed`
  - `One-time investment that you can use every single night`
  - `Natural, drug-free relaxation whenever you need it`
  - `Waking up energized and ready for the day`

### WhoItsFor (`who-its-for.tsx`) — UNUSED on product page
- Eyebrow: **`Made for You`**
- h2: **`Who It's For`**
- Four personas (title + description):
  1. **`People Who Can't Fall Asleep`** — `You lie awake for hours, mind racing, and wake up exhausted. No matter what you try, true rest feels out of reach.`
  2. **`Desk Workers and Remote Employees`** — `8+ hours at a screen and your mind is too wired to wind down. The eye strain and tension just keep stacking up day after day.`
  3. **`People Tired of Wasting Money on Sleep Aids`** — `You have tried melatonin, white noise, sleep apps, maybe even a sleep clinic. Temporary relief at best. Nothing that actually sticks.`
  4. **`People with High-Stress Lifestyles`** — `Your days are packed and your mind won't switch off at night. The stress runs from your head down into your body, keeping you tense and restless.`

### SlowWaveDiagram (`slowwave-diagram.tsx`) — UNUSED on product page
Pure-SVG illustration of "The SlowWave Method" (warm glow + mask band + pulse rings + two eye glows). Legend labels: **`Warmth`**, **`Pulse`**, **`Silence`**. aria-label: "The SlowWave Method: warmth and a slow pulse around the eyes, in silence". No copy beyond the three legend words.

### useCurrency (`currency-converter.tsx`) — UNUSED on product page
A hook only (no rendered UI). Detects currency from `navigator.language`, persists to sessionStorage key `slumbor-currency`, converts USD→15 currencies (USD, EUR 0.92, GBP 0.79, CAD 1.36, AUD 1.53, JPY 149, KRW 1320, INR 83, BRL 4.97, MXN 17.1, SEK 10.4, NOK 10.5, DKK 6.87, CHF 0.88, NZD 1.63). Not wired into the product page.

### faqData (13-item array in data.ts) — NOT used by on-page ProductFAQ
The product page's FAQ uses a local 6-item array. The larger `faqData` (13 Q&A: support contact, shutdown noise, pressure, headaches, safe to sleep in, music/sound, battery life, refund policy, warranty, shipping, change/cancel, payment methods, damaged item) lives in data.ts but is not consumed by any product-page section catalogued above.


---

# 3c. LEGAL & INFO PAGES (About, Contact, FAQ, Privacy, Refund, Shipping, Terms)

All seven pages are Next.js App Router client components (`"use client"`) located under `src/app/<route>/page.tsx`. Every page is wrapped in the shared root layout (Header/Footer come from the layout, not repeated here). Common outer wrapper on every page:

```
<div className="py-16 md:py-24 px-6">
  <div className="max-w-<N>xl mx-auto"> ... </div>
</div>
```

Shared UI components used across these pages:
- `ScrollReveal` (`@/components/ui/scroll-reveal`) — scroll-triggered reveal wrapper; accepts optional `delay` and `className` props.
- `TextGradient` (`@/components/ui/text-gradient`) — gradient-colored inline text; `variant="gold"` used throughout.
- `GlassmorphismCard` (`@/components/ui/glassmorphism-card`) — frosted-glass card container.
- `MagneticButton` (`@/components/ui/magnetic-button`) — animated CTA button (contact form only).
- `BrandName` (`@/components/ui/brand-name`) — renders the styled brand name "Slumbor" (about page only).
- FAQ page reads `faqData` from `@/lib/data`.

---

## ABOUT — `/about/`

**File:** `src/app/about/page.tsx`
**Component:** `AboutPage` (default export)
**Purpose:** Brand-story / "our story" page introducing Slumbor and the SleepWave Pro, plus a 3-value grid.
**Container width:** `max-w-7xl`

### Layout / sections in order

1. **Eyebrow + H1 (centered header)** — inside `ScrollReveal`, `text-center mb-16`.
2. **Two-column story block** — `grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-24`. Left = image tile; right = story heading + 3 paragraphs (`ScrollReveal delay={0.2}`).
3. **"What we stand for" section heading** — centered, `ScrollReveal`.
4. **3-value card grid** — `grid md:grid-cols-3 gap-6`, each value in a `GlassmorphismCard` (centered), staggered `delay={i * 0.1}`.

### Verbatim copy

**Eyebrow (uppercase, gold, tracking-wide):**
> Our Story

**H1** (the word "real rest" is a gold `TextGradient`):
> We bring real rest to your everyday life

**Story column H2:**
> Born from restless nights

**Story paragraph 1** (the word "Slumbor" is rendered by the `<BrandName />` component):
> We started Slumbor because we were tired of the cycle. Toss and turn all night, drag through the day, try melatonin, scroll your phone, repeat. Sound familiar?

**Story paragraph 2:**
> Heated eye therapy and gentle vibration have been used in sleep clinics for years, but the technology was always expensive and inaccessible. We wondered: why can't everyone have access to this?

**Story paragraph 3:**
> So we built the SleepWave Pro. A luxurious, weighted, heated vibrating eye mask that lulls you into deep sleep naturally. No pills. No side effects. Just real rest, on your terms.

**Section heading (H2):**
> What we stand for

**Value card 1 — title / description:**
> Premium Quality
>
> We use advanced heated vibration technology that meets the same standards as professional sleep therapy devices. No cheap knockoffs.

**Value card 2 — title / description:**
> Designed with Purpose
>
> Every feature exists for a reason. Gentle heat, soothing vibrations, total blackout design. All crafted around how people actually struggle with sleep.

**Value card 3 — title / description:**
> Customer First
>
> 180-night money-back guarantee, free US shipping, and a support team that actually responds. We built the experience we wanted as customers.

### Images / media

- **One image**, in the left story tile. Rendered with Next.js `<Image>`:
  - `src=""` (EMPTY — no image source is set; placeholder/broken image)
  - `alt="Slumbor"`
  - `width={200} height={200}`, class `w-32 h-32 md:w-48 md:h-48`
  - Tile wrapper: `aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-surface border border-gold/10 flex items-center justify-center` (gold gradient placeholder box).

---

## CONTACT — `/contact/`

**File:** `src/app/contact/page.tsx`
**Component:** `ContactPage` (default export)
**Purpose:** Contact info trio + a "Send us a message" form (visual only — form has no action/handler wired up).
**Container width:** `max-w-5xl`

### Layout / sections in order

1. **Eyebrow + H1 + intro (centered header)** — `ScrollReveal`, `text-center mb-16`.
2. **3 contact-info cards** — `grid md:grid-cols-3 gap-6 mb-12`, each a centered `GlassmorphismCard` with emoji icon, title, detail. Staggered `delay={i * 0.1}`.
3. **Contact form card** — `GlassmorphismCard max-w-2xl mx-auto` inside `ScrollReveal`; H2 + form with Name, Email, Message fields and a submit `MagneticButton`.

### Verbatim copy

**Eyebrow:**
> Contact

**H1** ("touch" is a gold `TextGradient`):
> Get in touch

**Intro paragraph:**
> Have a question about your order or our products? We're here to help.

**Contact info card 1 — icon ✉ / title / detail:**
> Email
>
> shopslumbor@gmail.com

**Contact info card 2 — icon 🕐 / title / detail:**
> Hours
>
> Mon-Fri 9am-5pm EST

**Contact info card 3 — icon ⚡ / title / detail:**
> Response Time
>
> Within 24 hours

**Form heading (H2):**
> Send us a message

**Form fields (label / placeholder):**
- Label: `Name` — placeholder: `Your name` (text input)
- Label: `Email` — placeholder: `your@email.com` (email input)
- Label: `Message` — placeholder: `How can we help?` (textarea, `rows={5}`, non-resizable)

**Submit button (MagneticButton, variant="primary", full width, type submit):**
> Send Message

**Note:** The `<form>` has no `onSubmit` handler and no `action` attribute — it is a static/non-functional form (does not send anywhere in code).

### Images / media
- No images. Icons are emoji: ✉, 🕐, ⚡.

---

## FAQ — `/faq/`

**File:** `src/app/faq/page.tsx`
**Component:** `FAQPage` (default export)
**Purpose:** Accordion of frequently asked questions. FAQ content comes from `faqData` in `src/lib/data.ts` (13 items).
**Container width:** `max-w-3xl`
**Interactivity:** `useState<number | null>` `openIndex`; clicking a question toggles it open (only one open at a time). Uses `framer-motion` (`motion`, `AnimatePresence`) for a `+` icon that rotates 45° when open and an accordion height/opacity expand (duration 0.2s). Each item is a `glass-card rounded-xl` inside a `ScrollReveal` with staggered `delay={i * 0.05}`.

### Verbatim copy — header

**Eyebrow:**
> Help Center

**H1** ("Questions" is a gold `TextGradient`):
> Frequently Asked Questions

**Intro paragraph** (email is a gold `mailto:shopslumbor@gmail.com` link):
> Can't find what you're looking for? Email us at shopslumbor@gmail.com

### Verbatim copy — FAQ items (from `src/lib/data.ts`, `faqData`, in order)

**1. Q:** How do I contact Slumbor support?
**A:** You can reach us anytime at shopslumbor@gmail.com. Real humans, usually back to you within 24 hours.

**2. Q:** Will the shutdown noise wake me back up?
**A:** No. This was the number one complaint people had about other masks, the cheerful voice announcing 'goodbye' right as you drift off. The SleepWave Pro just goes quiet. It powers down silently after 15 minutes.

**3. Q:** Is the pressure going to hurt my eyes?
**A:** No. The pulse is designed to wrap your sinuses and temples, not press your eyeballs back into your head. It's soft on purpose. Most people describe it as a hand resting over their eyes.

**4. Q:** Does it actually help with headaches, or just sleep?
**A:** Both. The warmth and slow pulse loosen the tension that stacks up behind your eyes and temples after a long day at screens. A lot of people reach for it the moment they feel a tension headache starting, not just at bedtime.

**5. Q:** Is it safe to fall asleep wearing it?
**A:** Absolutely. It powers down on its own after 15 minutes, the materials are breathable and hypoallergenic, and the heat stays in a safe, comfortable range the whole time.

**6. Q:** Does it play music or make any sound?
**A:** No, and that's on purpose. There's no music, no Bluetooth, no beeps. Just warmth and a soft pulse, and a room that stays quiet enough to actually fall asleep in. The silence is the point.

**7. Q:** How long does the battery last?
**A:** A full charge gives you up to 4 sessions. It charges in about 1.5 hours over USB-C, so it's always ready on your nightstand.

**8. Q:** What if it doesn't work for me?
**A:** You have 180 nights. Sleep better within 14 of them or email us at shopslumbor@gmail.com for a full refund. Keep the bonus workbook either way. No restocking fee, no questions about why.

**9. Q:** What if it breaks?
**A:** It's covered by a 2-year warranty. If it ever stops working, email us at shopslumbor@gmail.com and we'll send a free replacement.

**10. Q:** How does the shipping work?
**A:** Free shipping on every US order. Orders are processed within 1-3 business days and every order ships with tracking.

**11. Q:** Can I change or cancel my order?
**A:** Email us within 12 hours of ordering at shopslumbor@gmail.com and we'll sort it out. After that it may have already entered processing.

**12. Q:** What payment methods do you accept?
**A:** All major cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay through secure Shopify checkout.

**13. Q:** What if my item arrives damaged?
**A:** Email shopslumbor@gmail.com with a photo and we'll send a replacement at no cost or refund you in full. Whichever you'd rather.

### Images / media
- No images. Toggle icon is a text `+` that rotates to `×` (45°) when open.

---

## PRIVACY POLICY — `/privacy-policy/`

**File:** `src/app/privacy-policy/page.tsx`
**Component:** `PrivacyPolicyPage` (default export)
**Purpose:** Privacy policy legal text.
**Container width:** `max-w-3xl`
**Layout:** Single `ScrollReveal`; H1 then a `prose prose-slate` block (`space-y-6 text-sm`) of intro paragraph + 6 H2 sections + last-updated line.

### Verbatim copy

**H1:**
> Privacy Policy

**Intro paragraph:**
> At Slumbor, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.

**H2 — Information We Collect**
> We collect information you provide directly, including your name, email address, shipping address, and payment information when you make a purchase. We also automatically collect certain information about your device, including your IP address, browser type, and browsing behavior through cookies and similar technologies.

**H2 — How We Use Your Information**
> We use your information to process and fulfill orders, communicate with you about your purchases, improve our website and products, and send marketing communications (with your consent). We may also use your information for fraud prevention and to comply with legal obligations.

**H2 — Data Security**
> We implement appropriate technical and organizational security measures to protect your personal information. All payment transactions are processed through Shopify's secure checkout, which is PCI-DSS compliant.

**H2 — Cookies**
> We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.

**H2 — Third-Party Services**
> We use third-party services including Shopify (e-commerce), Meta (advertising), and analytics providers. These services may collect information about your interactions with our website in accordance with their own privacy policies.

**H2 — Contact Us**
> If you have any questions about this Privacy Policy, please contact us at shopslumbor@gmail.com.

(email is a gold `mailto:shopslumbor@gmail.com` link)

**Last-updated line (small, muted):**
> Last updated: March 2026

### Images / media
- None.

---

## REFUND POLICY — `/refund-policy/`

**File:** `src/app/refund-policy/page.tsx`
**Component:** `RefundPolicyPage` (default export)
**Purpose:** Refund / money-back guarantee policy.
**Container width:** `max-w-3xl`
**Layout:** Single `ScrollReveal`; H1 then `space-y-6 text-sm` block of intro paragraph + 5 H2 sections (one with a bulleted list) + last-updated line.

### Verbatim copy

**H1:**
> Refund Policy

**Intro paragraph:**
> We want you to sleep better, not feel stuck with a purchase. If the SleepWave Pro isn't working for you, we offer a 180-night money-back guarantee.

**H2 — 180-Night Money-Back Guarantee**
> You have 180 days from the date of delivery to request a return and full refund. Sleep better within 14 nights or we make it right, and you keep the bonus workbook either way. The SleepWave Pro is also covered by a 2-year warranty, so if it ever stops working we replace it free.

**H2 — How to Request a Refund**
> Email us at shopslumbor@gmail.com with your order number and reason for the return. Our team will provide you with return instructions within 24 hours.

(email is a gold `mailto:shopslumbor@gmail.com` link)

**H2 — Conditions** (bulleted list, `list-disc list-inside`):
> - Item must be returned within 180 days of delivery
> - No restocking fee, and no questions about why
> - Keep the bonus 14-Night Sleep Reset Workbook either way
> - Damaged or defective items qualify for free return shipping

**H2 — Refund Processing**
> Once we receive and inspect your return, we will process your refund within 5-7 business days. The refund will be issued to your original payment method. Please allow an additional 3-5 business days for the refund to appear on your statement, depending on your bank.

**H2 — Damaged or Defective Items**
> If your item arrives damaged or defective, contact us immediately with photos. We will send a free replacement or issue a full refund at no cost to you.

**Last-updated line (small, muted):**
> Last updated: March 2026

### Images / media
- None.

---

## SHIPPING — `/shipping/`

**File:** `src/app/shipping/page.tsx`
**Component:** `ShippingPage` (default export)
**Purpose:** Shipping information — 4 info cards + contact footer line.
**Container width:** `max-w-5xl`

### Layout / sections in order

1. **Eyebrow + H1 + intro (centered header)** — `ScrollReveal`, `text-center mb-16`.
2. **4 info cards** — `grid md:grid-cols-2 gap-6`, each a `GlassmorphismCard` (`h-full`) with emoji icon, H3 title, description. Staggered `delay={i * 0.1}`.
3. **Contact footer line** — centered, `mt-12`, inside `ScrollReveal`.

### Verbatim copy

**Eyebrow:**
> Shipping

**H1** ("Information" is a gold `TextGradient`):
> Shipping Information

**Intro paragraph:**
> Free US shipping with full tracking on every order.

**Card 1 — icon 📦 / title / description:**
> Processing Time
>
> All orders are processed within 1-3 business days after payment confirmation.

**Card 2 — icon 🚚 / title / description:**
> Delivery Time
>
> Most US orders arrive within 3-7 business days. You'll get a tracking number by email the moment it ships.

**Card 3 — icon ✨ / title / description:**
> Free US Shipping
>
> Every US order ships free with tracking. No minimum, no surprise add-ons or shipping protection at checkout.

**Card 4 — icon 🛡 / title / description:**
> If Something Goes Wrong
>
> If your package is lost or badly delayed, email us and we'll send a replacement or refund you in full.

**Footer contact line** (email is a gold `mailto:shopslumbor@gmail.com` link):
> Questions about shipping? Email us at shopslumbor@gmail.com

### Images / media
- No images. Icons are emoji: 📦, 🚚, ✨, 🛡.

---

## TERMS OF SERVICE — `/terms-of-service/`

**File:** `src/app/terms-of-service/page.tsx`
**Component:** `TermsOfServicePage` (default export)
**Purpose:** Terms of service legal text.
**Container width:** `max-w-3xl`
**Layout:** Single `ScrollReveal`; H1 then `space-y-6 text-sm` block of intro paragraph + 5 H2 sections + last-updated line.

### Verbatim copy

**H1:**
> Terms of Service

**Intro paragraph:**
> By accessing and using the Slumbor website, you agree to be bound by these Terms of Service. Please read them carefully before making a purchase.

**H2 — Products & Pricing**
> All prices are listed in USD unless otherwise indicated. We reserve the right to modify prices at any time without prior notice. Product descriptions and images are as accurate as possible, but we do not guarantee that all details are entirely error-free.

**H2 — Orders & Payment**
> By placing an order, you represent that you are of legal age in your jurisdiction and that the payment information you provide is accurate. We reserve the right to refuse or cancel any order for any reason, including suspected fraud.

**H2 — Shipping & Delivery**
> Estimated delivery times are provided for reference and are not guaranteed. We are not responsible for delays caused by customs, weather, or carrier issues. Risk of loss transfers to you upon our delivery to the carrier.

**H2 — Limitation of Liability**
> To the maximum extent permitted by law, Slumbor shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or website. Our total liability shall not exceed the amount you paid for your order.

**H2 — Contact**
> For questions about these terms, email us at shopslumbor@gmail.com.

(email is a gold `mailto:shopslumbor@gmail.com` link)

**Last-updated line (small, muted):**
> Last updated: March 2026

### Images / media
- None.

---

## Cross-page reference notes

- **Support email everywhere:** `shopslumbor@gmail.com` (Contact, FAQ, Privacy, Refund, Shipping, Terms). This is the single contact channel for all legal/info pages.
- **Support hours / response:** Mon-Fri 9am-5pm EST; response within 24 hours (Contact page).
- **Guarantee terms repeated across pages:** 180-night money-back guarantee; "sleep better within 14 nights"; 2-year warranty; free replacement on defects; keep the bonus 14-Night Sleep Reset Workbook either way; no restocking fee.
- **Shipping terms:** free US shipping with tracking; processing 1-3 business days; delivery 3-7 business days.
- **"Last updated: March 2026"** appears on all three pure-legal pages (Privacy, Refund, Terms). Not present on About, Contact, FAQ, Shipping.
- **Third-party services named (Privacy):** Shopify (e-commerce), Meta (advertising), analytics providers. Payments via Shopify secure checkout (PCI-DSS compliant).
- **About page image bug:** the only `<Image>` on the About page has an empty `src=""` — no asset is wired, so it renders as an empty/broken placeholder inside a gold gradient tile.


---

# 4. COMPONENT INVENTORY — UI / Layout / Sections

This section documents every component under `src/components/ui/`, `src/components/layout/`, and `src/components/sections/`. Each entry gives the file path, a description, props/inputs, consumers, and the full verbatim source.

---

## 4.1 UI COMPONENTS

### 4.1.1 AnimatedCounter

- **File:** `src/components/ui/animated-counter.tsx`
- **Description:** Client component that counts up from 0 to a `target` number when scrolled into view (using framer-motion `useInView`), with a cubic ease-out and `requestAnimationFrame` animation loop. Fires once.
- **Props (`AnimatedCounterProps`):**
  - `target: number` — the number to count up to
  - `duration?: number` (default `2`) — animation duration in seconds
  - `suffix?: string` (default `""`) — text appended after the number
  - `prefix?: string` (default `""`) — text prepended before the number
- **Used by:** `src/components/sections/brand-story.tsx` (stats counters).

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const durationMs = duration * 1000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
```

---

### 4.1.2 Atmosphere

- **File:** `src/components/ui/atmosphere.tsx`
- **Description:** A fixed, full-page decorative background: a midnight radial base wash, a drifting aurora, a breathing "lamp" glow, a warm vignette, and a film-grain layer rendered above content. All layers are `pointer-events-none` / `aria-hidden`. Relies on CSS classes (`atmosphere-aurora`, `atmosphere-lamp`, `atmosphere-vignette`, `atmosphere-grain`) defined in global CSS.
- **Props:** None.
- **Used by:** Root layout / page background (rendered site-wide behind all content).

```tsx
"use client";

/**
 * The room. A fixed, full-page atmosphere that sits behind everything:
 * a warm midnight base, a slow-drifting hypnagogic aurora, a single lamp
 * that breathes, and a warm vignette. The grain layer is rendered last,
 * above content, so the whole site reads like analog film, not a screen.
 *
 * All layers are pointer-events-none and decorative.
 */
export default function Atmosphere() {
  return (
    <>
      {/* Behind all content */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep base wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,#16233f_0%,#0E1626_45%,#0A0F1C_100%)]" />

        {/* Drifting hypnagogic aurora */}
        <div className="atmosphere-aurora absolute -inset-[20%]" />

        {/* The breathing lamp, high and slightly right, like a bedside light */}
        <div className="atmosphere-lamp absolute left-1/2 top-[6%] h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full" />

        {/* Warm vignette drawing the eye inward */}
        <div className="atmosphere-vignette absolute inset-0" />
      </div>

      {/* Film grain, above content (decorative, never blocks clicks) */}
      <div
        aria-hidden
        className="atmosphere-grain fixed inset-0 z-[100] pointer-events-none"
      />
    </>
  );
}
```

---

### 4.1.3 BrandName

- **File:** `src/components/ui/brand-name.tsx`
- **Description:** Renders the brand wordmark "SLUMBOR" as a styled uppercase span, optionally with a superscript trademark symbol.
- **Props (inline object):**
  - `className?: string` (default `""`) — extra classes
  - `tm?: boolean` (default `false`) — when true, appends a superscript ™
- **Used by:** `footer.tsx`, `header.tsx`, `brand-story.tsx`, `why-luxen.tsx`, and other copy.

```tsx
"use client";

export default function BrandName({ className = "", tm = false }: { className?: string; tm?: boolean }) {
  return (
    <span className={`tracking-[0.08em] uppercase font-heading font-semibold ${className}`}>
      SLUMBOR
      {tm && <span className="text-[0.5em] align-super ml-0.5">™</span>}
    </span>
  );
}
```

---

### 4.1.4 FloatingElement

- **File:** `src/components/ui/floating-element.tsx`
- **Description:** Wraps children in a framer-motion div that gently floats up and down forever (looping y-oscillation) for a levitation effect.
- **Props (`FloatingElementProps`):**
  - `children: React.ReactNode`
  - `className?: string`
  - `amplitude?: number` (default `20`) — total travel distance in px
  - `duration?: number` (default `6`) — seconds per cycle
- **Used by:** `src/components/sections/hero-section.tsx` (the WarmLight centerpiece).

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export default function FloatingElement({
  children,
  className,
  amplitude = 20,
  duration = 6,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{ y: [-amplitude / 2, amplitude / 2, -amplitude / 2] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

---

### 4.1.5 GlassmorphismCard

- **File:** `src/components/ui/glassmorphism-card.tsx`
- **Description:** A frosted-glass card wrapper (relies on `.glass-card` / `.glass-card-hover` global CSS classes) with rounded corners and padding, plus optional hover transition.
- **Props (`GlassmorphismCardProps`):**
  - `children: React.ReactNode`
  - `className?: string`
  - `hover?: boolean` (default `true`) — applies hover styles/transition
- **Used by:** `testimonials.tsx`, `why-luxen.tsx`.

```tsx
"use client";

import { cn } from "@/lib/utils";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassmorphismCard({
  children,
  className,
  hover = true,
}: GlassmorphismCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6",
        hover && "glass-card-hover transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
```

---

### 4.1.6 MagneticButton

- **File:** `src/components/ui/magnetic-button.tsx`
- **Description:** Primary reusable button/link component with three visual variants and three sizes. Renders a Next.js `<Link>` when `href` is provided, otherwise a `<button>`. (Despite the name, no magnetic mouse-follow behavior is implemented — it is a styled CTA.)
- **Props (`MagneticButtonProps`):**
  - `children: React.ReactNode`
  - `variant?: "primary" | "secondary" | "ghost"` (default `"primary"`)
  - `size?: "sm" | "md" | "lg"` (default `"md"`)
  - `href?: string` — if set, renders a `Link`
  - `onClick?: () => void`
  - `className?: string`
  - `disabled?: boolean` (default `false`)
  - `type?: "button" | "submit"` (default `"button"`)
- **Used by:** `cart-drawer.tsx`, `hero-section.tsx`, `product-showcase.tsx`, `brand-story.tsx`, and virtually all CTAs across pages.

```tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  disabled = false,
  type = "button",
}: MagneticButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-semibold tracking-[0.01em] transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-gold text-[#0E1626] shadow-[0_6px_28px_rgba(232,184,106,0.22)] hover:bg-[#F2C87C] hover:shadow-[0_10px_38px_rgba(232,184,106,0.32)]",
    secondary:
      "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10 hover:shadow-[0_6px_28px_rgba(232,184,106,0.14)]",
    ghost: "text-gold hover:text-gold-dark hover:bg-gold-light/50",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

---

### 4.1.7 ParticleField

- **File:** `src/components/ui/particle-field.tsx`
- **Description:** A fixed, full-screen `<canvas>` rendering sparse, slow-drifting "lamplight dust" motes plus a few soft glowing orbs, in three tones (amber/cream/lavender). Handles DPR scaling and resize, throttles to every 3rd frame, and freezes to a single painted frame when `prefers-reduced-motion` is set. Cleans up listeners and animation frame on unmount.
- **Props:** None.
- **Used by:** Site-wide decorative overlay (rendered near root, `z-[1]`, `pointer-events-none`).

```tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Lamplight dust. Sparse, slow warm motes that drift upward and sway,
 * the way dust catches a bedside lamp. Calm by design, low count, low
 * speed, low opacity. Frozen for anyone who prefers reduced motion.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio, 1.5);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    type Tone = "amber" | "cream" | "lavender";
    const tones: Record<Tone, [number, number, number]> = {
      amber: [212, 165, 116],
      cream: [242, 237, 228],
      lavender: [168, 163, 199],
    };

    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      drift: number;
      phase: number;
      twinkle: number;
      tone: Tone;
      isOrb: boolean;
    }[] = [];

    const pick = (): Tone =>
      Math.random() > 0.55 ? "amber" : Math.random() > 0.5 ? "cream" : "lavender";

    // Fine drifting motes
    for (let i = 0; i < 34; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.1 + 0.3,
        speed: Math.random() * 0.028 + 0.006,
        drift: Math.random() * 0.14 + 0.04,
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * Math.PI * 2,
        tone: pick(),
        isOrb: false,
      });
    }

    // A few soft glowing orbs, like light pooling in the air
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 3,
        speed: Math.random() * 0.012 + 0.004,
        drift: Math.random() * 0.1 + 0.03,
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * Math.PI * 2,
        tone: Math.random() > 0.5 ? "amber" : "lavender",
        isOrb: true,
      });
    }

    const paint = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        const [r, g, b] = tones[p.tone];
        const sway = Math.sin(p.phase) * p.drift * 6;
        if (p.isOrb) {
          const alpha = 0.03 + Math.sin(p.twinkle) * 0.02;
          const gradient = ctx.createRadialGradient(
            p.x + sway,
            p.y,
            0,
            p.x + sway,
            p.y,
            p.size * 7
          );
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 2.5})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x + sway, p.y, p.size * 7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const alpha = 0.1 + (Math.sin(p.twinkle) + 1) * 0.07;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x + sway, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    if (reduceMotion) {
      paint();
      return () => window.removeEventListener("resize", resize);
    }

    let frame = 0;
    let animId: number;
    const draw = () => {
      frame++;
      if (frame % 3 !== 0) {
        animId = requestAnimationFrame(draw);
        return;
      }
      particles.forEach((p) => {
        p.twinkle += 0.008;
        p.phase += 0.004;
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
      });
      paint();
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />
  );
}
```

---

### 4.1.8 ScrollProgress

- **File:** `src/components/ui/scroll-progress.tsx`
- **Description:** A fixed, 2px gold gradient bar pinned to the top of the viewport that scales horizontally (`scaleX`) from left origin in sync with page scroll progress (framer-motion `useScroll`).
- **Props:** None.
- **Used by:** Root layout (global scroll indicator).

```tsx
"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-amber-400 to-gold-dark z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

---

### 4.1.9 ScrollReveal

- **File:** `src/components/ui/scroll-reveal.tsx`
- **Description:** Wrapper that fades + slides its children into view once on scroll (framer-motion `whileInView`, fires once, `-80px` margin). Direction controls the y-offset origin (note: all directions map only to y-offsets here).
- **Props (`ScrollRevealProps`):**
  - `children: React.ReactNode`
  - `direction?: "up" | "down" | "left" | "right"` (default `"up"`)
  - `delay?: number` (default `0`)
  - `duration?: number` (default `0.3`)
  - `className?: string`
- **Used by:** `brand-story.tsx`, `product-showcase.tsx`, `testimonials.tsx`, `why-luxen.tsx`, and content sections throughout.

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.3,
  className,
}: ScrollRevealProps) {
  const offsets = {
    up: { y: 24 },
    down: { y: -24 },
    left: { y: 16 },
    right: { y: 16 },
  };

  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, y: offset.y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

---

### 4.1.10 SectionDivider

- **File:** `src/components/ui/section-divider.tsx`
- **Description:** A decorative horizontal divider between sections. Three variants: `gradient` (tall gold gradient band via `.section-gradient-gold`), `ray` (thin centered gold-fading rule), and `aurora` (default; thin shimmering animated gold gradient line via `animate-shimmer`).
- **Props (`SectionDividerProps`):**
  - `variant?: "aurora" | "ray" | "gradient"` (default `"aurora"`)
  - `className?: string`
- **Used by:** Between page sections (best effort — a general layout utility).

```tsx
"use client";

import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "aurora" | "ray" | "gradient";
  className?: string;
}

export default function SectionDivider({
  variant = "aurora",
  className,
}: SectionDividerProps) {
  if (variant === "gradient") {
    return (
      <div
        className={cn("h-24 w-full section-gradient-gold", className)}
      />
    );
  }

  if (variant === "ray") {
    return (
      <div className={cn("flex justify-center py-8", className)}>
        <div className="h-px w-full max-w-xl bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center py-8", className)}>
      <div
        className="h-px w-full max-w-xl animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, #E8B86A, #F2CE84, #E8B86A, transparent)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}
```

---

### 4.1.11 TextGradient

- **File:** `src/components/ui/text-gradient.tsx`
- **Description:** Renders children with a gold/warm/aurora gradient clipped to the text (`bg-clip-text text-transparent`). The rendered element tag is configurable via the `as` prop.
- **Props (`TextGradientProps`):**
  - `children: React.ReactNode`
  - `variant?: "gold" | "warm" | "aurora"` (default `"gold"`)
  - `className?: string`
  - `as?: "span" | "h1" | "h2" | "h3" | "p"` (default `"span"`, aliased to `Component`)
- **Used by:** `brand-story.tsx`, `product-showcase.tsx`, `testimonials.tsx`, `why-luxen.tsx`, and headings throughout.

```tsx
"use client";

import { cn } from "@/lib/utils";

interface TextGradientProps {
  children: React.ReactNode;
  variant?: "gold" | "warm" | "aurora";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function TextGradient({
  children,
  variant = "gold",
  className,
  as: Component = "span",
}: TextGradientProps) {
  const gradients = {
    gold: "from-[#F0D5AE] via-gold to-[#CFA05A]",
    warm: "from-gold via-[#F0D5AE] to-gold",
    aurora: "from-gold via-lavender to-[#F0D5AE]",
  };

  return (
    <Component
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
```

---

### 4.1.12 TiltCard

- **File:** `src/components/ui/tilt-card.tsx`
- **Description:** Wraps children with a 3D perspective tilt that follows the mouse position, plus a radial gold glow overlay that tracks the cursor (revealed on `group-hover`). Resets transform on mouse leave.
- **Props (`TiltCardProps`):**
  - `children: React.ReactNode`
  - `className?: string`
- **Used by:** Interactive cards (best effort — a general utility wrapper).

```tsx
"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 10;
    const tiltY = (x - 0.5) * -10;
    setTransform(`perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
    setGlowPosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-200", className)}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(212,168,83,0.08) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
```

---

## 4.2 LAYOUT COMPONENTS

### 4.2.1 AnnouncementBar

- **File:** `src/components/layout/announcement-bar.tsx`
- **Description:** A fixed top bar (z-50) with a dark gradient background announcing free US shipping and a 180-day refund. Static content.
- **Props:** None.
- **Used by:** Root layout (site-wide, sits above the Header which is offset by `top-[36px]`).

```tsx
"use client";

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0A0F1C] via-[#16233f] to-[#0A0F1C] text-center py-2.5 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b border-gold/10">
      <span className="inline-flex items-baseline justify-center gap-1.5 tracking-wide text-foreground/80">
        <span>Free US shipping on every order.</span>
        <span className="text-gold font-semibold">180-day full refund.</span>
      </span>
    </div>
  );
}
```

---

### 4.2.2 CartDrawer

- **File:** `src/components/layout/cart-drawer.tsx`
- **Description:** A slide-in-from-right cart panel with backdrop (framer-motion `AnimatePresence`). Reads all state from `useCart()`: lists line items with per-unit price and per-line volume discount, quantity steppers, remove buttons, an optional "protection plan" checkbox (from `PROTECTION_PLAN`), a subtotal, and a Checkout button that redirects via `createCheckout(items, protectionPlan)`. Shows an empty state with a "Continue Shopping" CTA.
- **Props:** None. Consumes cart context.
- **Depends on:** `useCart` and `PROTECTION_PLAN` from `@/contexts/cart-context`, `createCheckout` from `@/lib/shopify`, `MagneticButton`, `next/image`.
- **Used by:** Root layout (always mounted; visibility driven by `isOpen`).

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart, PROTECTION_PLAN } from "@/contexts/cart-context";
import { createCheckout } from "@/lib/shopify";
import MagneticButton from "@/components/ui/magnetic-button";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    total,
    protectionPlan,
    setProtectionPlan,
    unitPrice,
    lineDiscount,
  } = useCart();

  const handleCheckout = () => {
    window.location.href = createCheckout(items, protectionPlan);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-surface shadow-2xl z-50 flex flex-col border-l border-white/5"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-lg font-heading font-bold text-heading">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-muted mb-4">Your cart is empty</p>
                  <MagneticButton
                    variant="secondary"
                    size="sm"
                    href="/shop/"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </MagneticButton>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-surface-raised flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-heading truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm text-gold font-medium">
                            ${unitPrice(item).toFixed(2)}
                          </p>
                          {lineDiscount(item) > 0 && (
                            <>
                              <span className="text-xs text-lavender line-through">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-gold text-navy rounded-full">
                                {lineDiscount(item)}% OFF
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-6 text-center text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-colors cursor-pointer"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs text-muted hover:text-red-400 transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/5">
                <label className="flex items-start gap-3 mb-4 cursor-pointer rounded-xl border border-gold/20 bg-gold/[0.05] p-3">
                  <input
                    type="checkbox"
                    checked={protectionPlan}
                    onChange={(e) => setProtectionPlan(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      protectionPlan ? "border-gold bg-gold" : "border-muted"
                    }`}
                  >
                    {protectionPlan && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0E1626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    )}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold text-heading">
                        {PROTECTION_PLAN.title}
                      </span>
                      <span className="text-sm font-bold text-gold flex-shrink-0">
                        +${PROTECTION_PLAN.price.toFixed(2)}
                      </span>
                    </span>
                    <span className="block text-xs text-slate leading-snug mt-1">
                      Covers accidental damage for 3 years. One free replacement, no questions.
                    </span>
                  </span>
                </label>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-muted">Subtotal</span>
                  <span className="text-lg font-bold text-heading">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </MagneticButton>
                <p className="text-xs text-muted text-center mt-3">
                  Shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

### 4.2.3 Footer

- **File:** `src/components/layout/footer.tsx`
- **Description:** Site footer with the brand wordmark + tagline, three link columns (Shop, Support, Legal) built from static arrays, and a bottom bar with dynamic copyright year and payment-method labels.
- **Props:** None.
- **Link data (module-level constants):**
  - `shopLinks`: SleepWave Pro (`/products/sleepwave-pro/`), Cart (`/cart/`)
  - `supportLinks`: Contact Us (`/contact/`), FAQ (`/faq/`), Shipping Info (`/shipping/`), Track Order (`/track-order/`)
  - `legalLinks`: Privacy Policy (`/privacy-policy/`), Terms of Service (`/terms-of-service/`), Refund Policy (`/refund-policy/`)
- **Used by:** Root layout (site-wide).

```tsx
"use client";

import Link from "next/link";
import BrandName from "@/components/ui/brand-name";

const shopLinks = [
  { href: "/products/sleepwave-pro/", label: "SleepWave Pro" },
  { href: "/cart/", label: "Cart" },
];

const supportLinks = [
  { href: "/contact/", label: "Contact Us" },
  { href: "/faq/", label: "FAQ" },
  { href: "/shipping/", label: "Shipping Info" },
  { href: "/track-order/", label: "Track Order" },
];

const legalLinks = [
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/terms-of-service/", label: "Terms of Service" },
  { href: "/refund-policy/", label: "Refund Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 min-w-0">
          <div className="col-span-2 md:col-span-1">
            <Link href="/home/" className="flex items-center gap-2 mb-4">
              <span className="text-lg text-gold"><BrandName /></span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              Fall asleep faster. Wake up rested.
            </p>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} <BrandName />. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-white/30">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

### 4.2.4 Header

- **File:** `src/components/layout/header.tsx`
- **Description:** Fixed navigation header positioned below the announcement bar (`top-[36px]`). Tracks scroll to (a) fade in a blurred dark backdrop after 20px and (b) hide-on-scroll-down / reveal-on-scroll-up past 120px. Contains the brand logo link, desktop nav links, an "Add to Cart" button (adds the SleepWave Pro at $69.99 and flashes "Added!" for 2s), a cart icon button with a live item-count badge, and a mobile hamburger that opens a full-screen animated menu (locks body scroll while open).
- **Props:** None. Consumes `useCart()` (`totalItems`, `setIsOpen`, `addItem`).
- **Nav data (`navLinks`):** Home (`/home/`), About (`/about/`), FAQ (`/faq/`), Contact (`/contact/`).
- **Used by:** Root layout (site-wide).

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/cart-context";
import { cn } from "@/lib/utils";
import BrandName from "@/components/ui/brand-name";

const navLinks = [
  { href: "/home/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { totalItems, setIsOpen, addItem } = useCart();

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hide when scrolling down past the header; reveal the moment you scroll up.
      if (y > lastY && y > 120) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleAddToCart = () => {
    addItem(
      {
        id: "sleepwave-pro",
        title: "SleepWave Pro",
        price: 69.99,
        image: "/products/p1.webp",
      },
      1
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-[36px] left-0 right-0 z-40 transition-transform duration-300 ease-out",
          hidden && !mobileOpen ? "-translate-y-[calc(100%+40px)]" : "translate-y-0"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-[#0E1626]/85 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/home/" className="flex items-center gap-2">
            <span className="text-xl text-gold">
              <BrandName />
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 rounded-full bg-gold text-[#0E1626] text-sm font-semibold hover:bg-[#F2C87C] hover:shadow-[0_6px_24px_rgba(232,184,106,0.34)] transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="relative text-foreground hover:text-gold transition-colors cursor-pointer"
              aria-label="Open cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-foreground cursor-pointer"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-heading font-semibold text-foreground hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

### 4.2.5 LoadingScreen

- **File:** `src/components/layout/loading-screen.tsx`
- **Description:** No-op stub. The loading screen was intentionally removed; the file is retained only to avoid breaking imports. Renders `null`.
- **Props:** None.
- **Used by:** Possibly imported in root layout (renders nothing).

```tsx
"use client";

// Loading screen removed. Unnecessary friction for e-commerce.
// Keeping file to avoid import errors.
export default function LoadingScreen() {
  return null;
}
```

---

## 4.3 SECTION COMPONENTS

### 4.3.1 BrandStory

- **File:** `src/components/sections/brand-story.tsx`
- **Description:** Two-column "Our Story" section. Left column: eyebrow, headline (with gold `TextGradient`), two paragraphs of brand narrative (with inline `BrandName`), and a secondary "Read Our Full Story" CTA to `/about/`. Right column: three glass stat cards — 10,000+ happy sleepers (AnimatedCounter), 4.9/5 rating (static with a star SVG), and 180-Night guarantee (AnimatedCounter).
- **Props:** None.
- **Section data (`stats`):** `{ target: 10000, suffix: "+", label: "Happy sleepers" }`, `{ target: 4.9, suffix: "/5", label: "Average rating", isDecimal: true }`, `{ target: 180, suffix: "-Night", label: "Money-back guarantee" }`.
- **Used by:** Home page (`/home/`) composition.

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";
import AnimatedCounter from "@/components/ui/animated-counter";
import BrandName from "@/components/ui/brand-name";
import MagneticButton from "@/components/ui/magnetic-button";

const stats = [
  { target: 10000, suffix: "+", label: "Happy sleepers" },
  { target: 4.9, suffix: "/5", label: "Average rating", isDecimal: true },
  { target: 180, suffix: "-Night", label: "Money-back guarantee" },
];

export default function BrandStory() {
  return (
    <section className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal className="min-w-0 text-center md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Our Story
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight mb-6">
              Built for people who are{" "}
              <TextGradient variant="gold">tired of restless nights</TextGradient>
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              We started <BrandName /> because we were honestly fed up. We were tired of
              nights that dragged on with no real sleep at the end of them, and tired of
              spending money on remedies that cost a fortune and wore off in a week. The
              gadgets that promised the world and did nothing were the last straw.
            </p>
            <p className="text-slate leading-relaxed mb-6">
              Heat and gentle pulse therapy like this has been used in wellness clinics
              and sleep centers for years, but it was always expensive and hard to get
              your hands on. We wanted to bring that same feeling home to everyone, at a
              price that actually makes sense.
            </p>
            <div className="flex justify-center md:justify-start">
              <MagneticButton variant="secondary" href="/about/">
                Read Our Full Story
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-w-0">
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-gold mb-1">
                    {stat.isDecimal ? (
                      <span className="inline-flex items-center justify-center gap-1.5">
                        4.9{stat.suffix}
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-gold">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </span>
                    ) : (
                      <AnimatedCounter
                        target={stat.target}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <p className="text-sm text-slate">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

---

### 4.3.2 HeroSection

- **File:** `src/components/sections/hero-section.tsx`
- **Description:** Full-viewport hero. Includes a local `WarmLight` sub-component that renders a radial-gradient "lamp" centerpiece (breathing halo, concentric rings, inner shadow, highlight; can display a real product image if `HERO_IMAGE` is set — currently empty). The hero has an eyebrow ("The Wind-Down Mask"), a large headline with an italic gold "finally", a subhead, two CTAs (Shop the SleepWave Pro → `/products/sleepwave-pro/`, Learn more → `/shop/`), and a star-rating social-proof line. The centerpiece floats via `FloatingElement` and animates in with framer-motion; shown inline on mobile and in the right column on desktop.
- **Props:** None. Module constant `HERO_IMAGE = ""` (placeholder for a product photo).
- **Used by:** Home page (`/home/`) — top of the page.

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/magnetic-button";
import FloatingElement from "@/components/ui/floating-element";

// Drop a real product photo here when it's ready; until then the warm
// light object below stands in as the centerpiece, fully intentional.
const HERO_IMAGE = "";

function WarmLight() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Breathing halo */}
      <div className="atmosphere-lamp absolute h-[125%] w-[125%] rounded-full" />

      {/* Soft concentric rings, like ripples in still air */}
      <div className="absolute h-full w-full rounded-full border border-gold/10" />
      <div className="absolute h-[82%] w-[82%] rounded-full border border-gold/15" />

      {/* The light itself */}
      <div className="relative h-72 w-72 overflow-hidden rounded-full md:h-96 md:w-96">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,#FBF1DF_0%,#E8C79A_22%,#C99B66_46%,#2A2238_78%,#161E33_100%)]" />
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_-24px_60px_rgba(10,15,28,0.7),inset_0_10px_40px_rgba(251,241,223,0.25)]" />
        {/* A single soft highlight, top-left */}
        <div className="absolute left-[24%] top-[20%] h-16 w-16 rounded-full bg-white/30 blur-2xl md:h-24 md:w-24" />
        {HERO_IMAGE && (
          <Image
            src={HERO_IMAGE}
            alt="The SleepWave Pro resting in warm light"
            width={500}
            height={500}
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:py-36">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-1 min-w-0 text-center md:text-left"
          >
            <div className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.28em] text-gold">
              The Wind-Down Mask
            </div>

            {/* Mobile centerpiece, between eyebrow and headline */}
            <div className="mb-10 flex justify-center md:hidden">
              <FloatingElement>
                <div className="scale-90">
                  <WarmLight />
                </div>
              </FloatingElement>
            </div>

            <h1 className="mb-7 font-heading text-[2.6rem] font-normal leading-[1.08] tracking-[-0.01em] text-heading sm:text-5xl lg:text-[3.9rem]">
              Let the day{" "}
              <span className="italic text-gold">finally</span> leave your body.
            </h1>

            <p className="mx-auto mb-9 max-w-md text-lg leading-[1.7] text-foreground/80 md:mx-0">
              The kind of warm pressure that pulls your shoulders down from your
              ears. The kind of quiet that makes your brain stop rehearsing
              tomorrow.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <MagneticButton
                variant="primary"
                size="lg"
                href="/products/sleepwave-pro/"
              >
                Shop the SleepWave Pro
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" href="/shop/">
                Learn more
              </MagneticButton>
            </div>

            <div className="mt-9 flex items-center justify-center gap-3 md:justify-start">
              <div className="text-sm tracking-[0.2em] text-gold">★★★★★</div>
              <span className="text-sm text-foreground/60">
                Loved by thousands of tired humans
              </span>
            </div>
          </motion.div>

          {/* Desktop centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
            className="order-2 hidden min-w-0 justify-center md:flex"
          >
            <FloatingElement>
              <WarmLight />
            </FloatingElement>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

### 4.3.3 ProductShowcase

- **File:** `src/components/sections/product-showcase.tsx`
- **Description:** Two-column "Featured Product" section driven by `heroProduct` from `@/lib/data`. Left: product image in a rounded, shadowed frame with a subtle gradient overlay. Right: eyebrow, headline (gold `TextGradient` with product title), description, the first 3 features rendered with checkmark icons, price + crossed-out compare-at price + computed SAVE % badge, and a primary "Get Yours Now" CTA to `/products/sleepwave-pro/`.
- **Props:** None.
- **Depends on:** `heroProduct` (`images`, `title`, `description`, `features`, `price`, `compareAtPrice`) from `@/lib/data`.
- **Used by:** Home page (`/home/`) composition.

```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";
import MagneticButton from "@/components/ui/magnetic-button";
import { heroProduct } from "@/lib/data";

export default function ProductShowcase() {
  return (
    <section className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal className="min-w-0">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-gold/10">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-light/20 to-transparent z-10 pointer-events-none" />
              <Image
                src={heroProduct.images[0]}
                alt={heroProduct.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-w-0 text-center md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Featured Product
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight mb-4">
              Meet the{" "}
              <TextGradient variant="gold">{heroProduct.title}</TextGradient>
            </h2>
            <p className="text-slate leading-relaxed mb-6">
              {heroProduct.description}
            </p>

            <div className="space-y-4 mb-8 max-w-md mx-auto md:mx-0 md:max-w-none">
              {heroProduct.features.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-light/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gold"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-heading text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <span className="text-3xl font-bold text-gold">
                ${heroProduct.price.toFixed(2)}
              </span>
              <span className="text-lg text-muted line-through">
                ${heroProduct.compareAtPrice.toFixed(2)}
              </span>
              <span className="px-3 py-1 rounded-full bg-gold-light text-gold-dark text-xs font-bold">
                SAVE{" "}
                {Math.round(
                  ((heroProduct.compareAtPrice - heroProduct.price) /
                    heroProduct.compareAtPrice) *
                    100
                )}
                %
              </span>
            </div>

            <div className="flex justify-center md:justify-start">
              <MagneticButton
                variant="primary"
                size="lg"
                href="/products/sleepwave-pro/"
              >
                Get Yours Now
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

---

### 4.3.4 Testimonials

- **File:** `src/components/sections/testimonials.tsx`
- **Description:** "Real Results" testimonials grid. A centered header (eyebrow, headline with gold `TextGradient`, subhead) followed by six hardcoded testimonials rendered as `GlassmorphismCard`s inside staggered `ScrollReveal` wrappers, each showing star rating, quote, name, and role.
- **Props:** None.
- **Section data (`testimonials`):** 6 entries — Marcus T. (Software Developer), Sarah K. (Office Manager), Brandon C. (Freelance Designer), Lisa T. (Registered Nurse), James R. (Construction Worker), Amanda G. (Wellness Coach); all rating 5.
- **Used by:** Home page (`/home/`) composition.

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import TextGradient from "@/components/ui/text-gradient";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Software Developer",
    text: "My mind was constantly racing from staring at screens all day. The first few sessions felt different, but now I can't imagine not having it. The tension just melts away and I drift off effortlessly.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "Office Manager",
    text: "After three weeks of using this nightly, my sleep quality is about 70% better. I fall asleep faster and wake up actually feeling rested. This thing actually works.",
    rating: 5,
  },
  {
    name: "Brandon C.",
    role: "Freelance Designer",
    text: "I've spent hundreds on sleep supplements and gadgets. This device gives me more nightly relief than anything else I've tried. It's now the cornerstone of my bedtime routine.",
    rating: 5,
  },
  {
    name: "Lisa T.",
    role: "Registered Nurse",
    text: "I work long shifts and the stress builds up, making it impossible to wind down. This has been an absolute godsend. The relaxation is immediate.",
    rating: 5,
  },
  {
    name: "James R.",
    role: "Construction Worker",
    text: "The warmth and vibration around my eyes just dissolves the tension. Nothing else has worked like this for me. Even on the lowest setting it's deeply relaxing.",
    rating: 5,
  },
  {
    name: "Amanda G.",
    role: "Wellness Coach",
    text: "I recommend relaxation tools to my clients regularly. Having a portable, affordable option like this is excellent. The multiple modes give real versatility for different relaxation needs.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-36 px-6 section-gradient-warm">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Real Results
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight mb-4">
              What our{" "}
              <TextGradient variant="gold">customers</TextGradient> are saying
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real people
              experience with the SleepWave Pro.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="min-w-0">
              <GlassmorphismCard className="h-full">
                <div className="flex text-warm text-sm mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="text-slate text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-heading text-sm">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 4.3.5 WhySlumbor / WhyLuxen

- **File:** `src/components/sections/why-luxen.tsx`
- **Description:** "Why SLUMBOR" benefits section (component is named `WhySlumbor`, file is `why-luxen.tsx`). Centered header (eyebrow with `BrandName`, headline with gold `TextGradient` on "11pm", subhead) followed by a 4-column grid of `GlassmorphismCard`s, each with an inline SVG icon, title, and description explaining the product's mechanism (warmth, pulse, silence, ritual).
- **Props:** None.
- **Section data (`values`):** 4 entries — "The warmth that signals safety", "A pulse your body recognizes", "Silence that lets you drift", "The ritual, not the gadget", each with an inline SVG icon and description.
- **Used by:** Home page (`/home/`) composition.

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import TextGradient from "@/components/ui/text-gradient";
import BrandName from "@/components/ui/brand-name";

const values = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    ),
    title: "The warmth that signals safety",
    description:
      "Gentle heat around the eyes tells your nervous system the day is over and it's safe to wind down. The tension behind your eyes starts to let go.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
    title: "A pulse your body recognizes",
    description:
      "A slow, rhythmic pressure that mimics the pace of a human touch. Your body reads it as a calming signal, the way a swaddled baby settles.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>
    ),
    title: "Silence that lets you drift",
    description:
      "It stays quiet the whole way through, from the moment you put it on until you are already asleep. That quiet is a big part of why it works so well.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: "The ritual, not the gadget",
    description:
      "Something you reach for every night, not another device you forget in a drawer. The one part of the day that's just for letting go.",
  },
];

export default function WhySlumbor() {
  return (
    <section className="py-24 md:py-36 px-6 section-gradient-gold">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Why <BrandName />
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-heading tracking-tight mb-4">
              Built for the version of you at{" "}
              <TextGradient variant="gold">11pm</TextGradient>.
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              You've tried melatonin, white noise, and sleep apps. Here's what your
              nervous system actually responds to.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="min-w-0">
              <GlassmorphismCard className="h-full text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gold-light/60 flex items-center justify-center text-gold">
                  {value.icon}
                </div>
                <h3 className="font-heading text-lg font-medium text-heading mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {value.description}
                </p>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

*End of Section 4 — UI / Layout / Sections component inventory. 22 components documented, full source verbatim.*


---

# 4b. COMPONENT INVENTORY — Product Components / Context / Lib / Types

> Full verbatim source of every product component plus the cart context, data layer, Shopify checkout helper, utilities, and global type declarations. Each file is pasted in full, exactly as it exists in the repo. File paths are relative to the project root `slumbor-main/`.

**Files in this section (in order):**

- `src/components/product/before-after.tsx`
- `src/components/product/benefits-hero.tsx`
- `src/components/product/comparison-table.tsx`
- `src/components/product/cost-callout.tsx`
- `src/components/product/currency-converter.tsx`
- `src/components/product/discover-section.tsx`
- `src/components/product/ems-comparison.tsx`
- `src/components/product/features-love.tsx`
- `src/components/product/how-it-works.tsx`
- `src/components/product/mid-page-cta.tsx`
- `src/components/product/offer-countdown.tsx`
- `src/components/product/perfect-for.tsx`
- `src/components/product/product-card.tsx`
- `src/components/product/product-faq.tsx`
- `src/components/product/product-reviews.tsx`
- `src/components/product/product-tabs.tsx`
- `src/components/product/purchase-notification.tsx`
- `src/components/product/relief-intro.tsx`
- `src/components/product/risk-free-guarantee.tsx`
- `src/components/product/science-section.tsx`
- `src/components/product/slowwave-diagram.tsx`
- `src/components/product/special-offer.tsx`
- `src/components/product/volume-discounts.tsx`
- `src/components/product/who-its-for.tsx`
- `src/contexts/cart-context.tsx`
- `src/lib/data.ts`
- `src/lib/shopify.ts`
- `src/lib/utils.ts`
- `src/types/globals.d.ts`

---

## `src/components/product/before-after.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const beforeItems = [
  "Lying awake for hours, unable to quiet your mind",
  "Tension building up behind your eyes throughout the day",
  "Spending $60+ per session on sleep therapies that barely help",
  "Relying on sleeping pills just to get through the night",
  "Waking up exhausted and dreading the day ahead",
];

const afterItems = [
  "Drifting off peacefully within minutes of lying down",
  "Getting through the day feeling rested and refreshed",
  "One-time investment that you can use every single night",
  "Natural, drug-free relaxation whenever you need it",
  "Waking up energized and ready for the day",
];

export default function BeforeAfter() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">The Transformation</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight">
              Life Before vs After the SleepWave Pro
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <ScrollReveal delay={0.1} className="min-w-0">
            <div className="p-8 rounded-2xl bg-surface border border-white/8 h-full">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-500">Without It</h3>
              </div>
              <div className="space-y-3">
                {beforeItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-300 flex-shrink-0 mt-0.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    <span className="text-sm text-gray-500 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* After */}
          <ScrollReveal delay={0.2} className="min-w-0">
            <div className="p-8 rounded-2xl bg-gold/5 border-2 border-gold/20 h-full shadow-sm">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-heading">With SleepWave Pro</h3>
              </div>
              <div className="space-y-3">
                {afterItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm text-heading leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/benefits-hero.tsx`

```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const benefits = [
  "Loosen the tension that builds up behind your eyes after a long day",
  "Ease off a screen headache before it has the chance to settle in",
  "Let a racing mind slow down enough to actually drift off",
  "Fall asleep on your own, without supplements, apps, or your phone",
  "Wake up feeling clear instead of heavy and run down",
];

export default function BenefitsHero() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text */}
        <div className="text-center md:text-left order-2 md:order-1">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-6">
              What it actually does for you.
            </h2>
            <p className="text-slate leading-relaxed mb-8">
              Your nervous system has been running hard for fourteen hours. A few quiet
              minutes gives it the off-switch it&apos;s been asking for, so you can:
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="inline-flex items-center gap-3 max-w-[90%] md:max-w-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-[15px] font-medium text-heading">{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2">
          <ScrollReveal delay={0.1}>
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/benefits.webp"
                alt="SleepWave Pro heated eye mask"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/comparison-table.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto"><polyline points="20 6 9 17 4 12"/></svg>
);
const Cross = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted mx-auto"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const rows = [
  { label: "Price", sleepwave: "$69.99 once", supplements: "$30-60/month", mask: "$10-20" },
  { label: "Tells your nervous system to wind down", sleepwave: true, supplements: false, mask: false },
  { label: "Warmth and a slow pulse in one, in total silence", sleepwave: true, supplements: false, mask: false },
  { label: "Works in minutes, not weeks", sleepwave: true, supplements: false, mask: false },
  { label: "No subscription, no refills", sleepwave: true, supplements: false, mask: true },
  { label: "Doesn't leave you groggy in the morning", sleepwave: true, supplements: false, mask: true },
  { label: "Drug-free", sleepwave: true, supplements: false, mask: true },
  { label: "Easy to use right before bed without your phone", sleepwave: true, supplements: false, mask: true },
];

export default function ComparisonTable() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">Compare</p>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              SleepWave Pro vs the alternatives
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl border border-white/8 overflow-hidden shadow-sm">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <div className="p-3 sm:p-4" />
              <div className="p-3 sm:p-4 bg-gold text-[#0E1626] text-center text-xs sm:text-sm font-medium">
                SleepWave Pro
              </div>
              <div className="p-3 sm:p-4 text-center text-xs sm:text-sm font-medium text-heading">
                Pills &amp; supplements
              </div>
              <div className="p-3 sm:p-4 text-center text-xs sm:text-sm font-medium text-heading">
                Regular eye mask
              </div>
            </div>

            {rows.map((row, ri) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.5fr_1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr] ${ri % 2 === 0 ? "bg-white/2" : "bg-transparent"}`}
              >
                <div className="p-2.5 sm:p-4 text-[11px] sm:text-sm font-medium text-foreground flex items-center">
                  {row.label}
                </div>
                <div className="p-2.5 sm:p-4 bg-gold/5 flex items-center justify-center">
                  {typeof row.sleepwave === "boolean" ? (
                    row.sleepwave ? <Check /> : <Cross />
                  ) : (
                    <span className="text-gold font-medium text-[11px] sm:text-sm text-center">{row.sleepwave}</span>
                  )}
                </div>
                <div className="p-2.5 sm:p-4 flex items-center justify-center">
                  {typeof row.supplements === "boolean" ? (
                    row.supplements ? <Check /> : <Cross />
                  ) : (
                    <span className="text-slate text-[11px] sm:text-sm text-center">{row.supplements}</span>
                  )}
                </div>
                <div className="p-2.5 sm:p-4 flex items-center justify-center">
                  {typeof row.mask === "boolean" ? (
                    row.mask ? <Check /> : <Cross />
                  ) : (
                    <span className="text-slate text-[11px] sm:text-sm text-center">{row.mask}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

```

## `src/components/product/cost-callout.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function CostCallout() {
  return (
    <section className="py-16 md:py-20 px-6">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold via-[#CFA05A] to-gold" />
          {/* Subtle shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/10" />
          <div className="relative text-[#0E1626] text-center py-14 md:py-16 px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium leading-tight mb-4">
              A bottle of melatonin runs out in three weeks.
            </h2>
            <p className="text-lg md:text-xl font-medium opacity-85">
              The SleepWave Pro costs <span className="font-semibold underline underline-offset-4">$69.99 once</span>, and you can use it every night for the rest of your life.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

```

## `src/components/product/currency-converter.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";

const rates: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "\u20AC", rate: 0.92 },
  GBP: { symbol: "\u00A3", rate: 0.79 },
  CAD: { symbol: "CA$", rate: 1.36 },
  AUD: { symbol: "A$", rate: 1.53 },
  JPY: { symbol: "\u00A5", rate: 149 },
  KRW: { symbol: "\u20A9", rate: 1320 },
  INR: { symbol: "\u20B9", rate: 83 },
  BRL: { symbol: "R$", rate: 4.97 },
  MXN: { symbol: "MX$", rate: 17.1 },
  SEK: { symbol: "kr", rate: 10.4 },
  NOK: { symbol: "kr", rate: 10.5 },
  DKK: { symbol: "kr", rate: 6.87 },
  CHF: { symbol: "CHF", rate: 0.88 },
  NZD: { symbol: "NZ$", rate: 1.63 },
};

const localeMap: Record<string, string> = {
  "en-US": "USD",
  "en-GB": "GBP",
  "en-CA": "CAD",
  "en-AU": "AUD",
  "ja-JP": "JPY",
  "ko-KR": "KRW",
  "pt-BR": "BRL",
  "es-MX": "MXN",
  "de-DE": "EUR",
  "fr-FR": "EUR",
  "sv-SE": "SEK",
  "nb-NO": "NOK",
  "da-DK": "DKK",
  "de-CH": "CHF",
  "en-NZ": "NZD",
  "hi-IN": "INR",
};

export function useCurrency() {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const saved = sessionStorage.getItem("slumbor-currency");
    if (saved && rates[saved]) {
      setCurrency(saved);
    } else {
      const lang = navigator.language;
      const detected = localeMap[lang] || "USD";
      setCurrency(detected);
      sessionStorage.setItem("slumbor-currency", detected);
    }
  }, []);

  const convert = (usd: number) => {
    const r = rates[currency];
    if (!r) return { formatted: `$${usd.toFixed(2)}`, isUSD: true };

    const converted = usd * r.rate;
    const rounded =
      currency === "JPY" || currency === "KRW"
        ? Math.round(converted / 100) * 100
        : Math.round(converted * 100) / 100;

    return {
      formatted: `${r.symbol}${rounded.toLocaleString()}`,
      isUSD: currency === "USD",
    };
  };

  const setAndSave = (c: string) => {
    setCurrency(c);
    sessionStorage.setItem("slumbor-currency", c);
  };

  return { currency, setCurrency: setAndSave, convert, currencies: Object.keys(rates) };
}

```

## `src/components/product/discover-section.tsx`

```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const discoveryBullets = [
  "Built for screen-tired eyes and a nervous system stuck in overdrive",
  "Uses gentle warmth and a soft pulse your body responds to, in complete silence",
  "Works in a matter of minutes, not weeks of waiting it out",
  "Small enough to live on your nightstand and become part of the routine",
];

export default function DiscoverSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/before-after.webp"
                alt="Before and after Slumbor"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-gold tracking-tight mb-6">
              The cycle ends tonight.
            </h2>
            <p className="text-slate leading-relaxed mb-5">
              <span className="font-medium text-heading">Meet</span>{" "}<BrandName tm className="text-heading" />,
              a heated eye mask for anyone sick of staring at the ceiling with a fried
              head and a brain that won&apos;t shut up.
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {discoveryBullets.map((point, i) => (
                <p key={i} className="inline-flex gap-2 text-sm text-foreground max-w-[90%] md:max-w-none text-left">
                  <span className="text-gold flex-shrink-0">&#8226;</span>
                  <span>{point}</span>
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/ems-comparison.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function EMSComparison() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">The Difference</p>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              The old way vs the SleepWave Pro
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ScrollReveal delay={0.1} className="min-w-0">
            <div className="relative p-8 rounded-2xl bg-white/3 border border-white/8 h-full">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 text-lavender text-xs font-medium">
                OLD WAY
              </div>
              <div className="mb-6 mt-4">
                <div className="w-full h-40 rounded-xl bg-white/3 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-48">
                    <div className="text-center text-[10px] text-lavender font-medium mb-3">STILL WIRED AT MIDNIGHT</div>
                    <div className="space-y-2">
                      <div className="h-4 bg-white/5 rounded" />
                      <div className="h-4 bg-white/5 rounded" />
                      <div className="h-4 bg-white/3 rounded" />
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#b04a4a]/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#b04a4a]/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#b04a4a]/50" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-heading font-medium text-lavender mb-2 text-center md:text-left">Pills, apps, and the wait-it-out method</h3>
              <p className="text-sm text-muted leading-relaxed mb-4 text-center md:text-left">
                Melatonin fades, apps keep you on your phone, and a hot shower wears off fast. None of it tells your body the day is actually over.
              </p>
              <div className="flex items-center gap-2 text-muted justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span className="text-xs font-medium">Never reaches the signal your body needs</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-w-0">
            <div className="relative p-8 rounded-2xl bg-gold/5 border-2 border-gold/20 h-full shadow-sm">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold text-[#0E1626] text-xs font-medium">
                SLEEPWAVE PRO
              </div>
              <div className="mb-6 mt-4">
                <div className="w-full h-40 rounded-xl bg-gold/5 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-48">
                    <div className="text-center text-[10px] text-gold font-medium mb-3">WARMTH + PULSE</div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gold/15 rounded" />
                      <div className="h-4 bg-gold/20 rounded" />
                      <div className="h-4 bg-gold/25 rounded" />
                    </div>
                    <div className="text-center text-[10px] text-gold font-medium mt-3">NERVOUS SYSTEM, OFF</div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2">
                      <div className="w-8 h-8 rounded-full border border-gold/30 animate-ping" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-heading font-medium text-heading mb-2 text-center md:text-left">Warmth and a slow pulse, in silence</h3>
              <p className="text-sm text-slate leading-relaxed mb-4 text-center md:text-left">
                Two signals your body is built to respond to, in fifteen quiet minutes a night. The last calm thing you do before sleep, instead of the thing you fight.
              </p>
              <div className="flex items-center gap-2 text-gold justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-xs font-medium">Signals your body actually responds to</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/features-love.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const features = [
  {
    title: "Contoured 3D cups",
    body: "The cups arch over your eyes instead of pressing on them. No weight on your eyelids, so it stays comfortable the whole time you wear it.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Five heat settings",
    body: "Choose a light warmth or a deeper heat, whatever your face needs that night. The warmth is what tells your body it is safe to wind down.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
  {
    title: "Adjustable strap",
    body: "Loosen or tighten it to your head in seconds. It stays put when you roll over and never pulls at your hair.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    title: "Six pulse modes",
    body: "A soft, steady pulse around your eyes, like a slow massage. Your body reads the rhythm as a cue to calm down.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function FeaturesLove() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              The details
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              Every part of it earns its place.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.08} className="min-w-0">
              <div className="h-full p-7 md:p-8 rounded-2xl bg-surface border border-white/8 shadow-sm hover:shadow-md hover:border-gold/20 transition-all duration-300 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center mb-5 text-gold mx-auto sm:mx-0">
                  {f.icon}
                </div>
                <h3 className="font-heading text-xl font-medium text-heading mb-2">
                  {f.title}
                </h3>
                <p className="text-[15px] text-foreground/80 leading-relaxed">
                  {f.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/how-it-works.tsx`

```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const steps = [
  {
    step: 1,
    image: "/products/step1.webp",
    description: "Slip the mask on and adjust the strap until it feels held in place, not tight.",
  },
  {
    step: 2,
    image: "/products/step2.webp",
    description: "Press the button and choose warmth, pulse, or both, then dial it in to whatever tonight calls for.",
  },
  {
    step: 3,
    image: "/products/step3.webp",
    description: "Lie back and let your breath slow down. Most people are asleep before the timer even ends.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-purple">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight">
              How to use it
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8">
          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="min-w-0">
              <div className="text-center">
                <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden mx-auto border-2 border-white/10 shadow-sm">
                  <Image
                    src={s.image}
                    alt={`Step ${s.step}`}
                    width={250}
                    height={250}
                    className="w-full h-full object-cover scale-[1.18]"
                  />
                </div>

                <p className="text-sm sm:text-base font-medium text-gold uppercase tracking-[0.18em] mt-5 mb-2">
                  Step {s.step}
                </p>

                <p className="text-xs sm:text-sm text-slate leading-relaxed italic">
                  {s.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/mid-page-cta.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function MidPageCTA() {
  return (
    <section className="px-6 py-20 md:py-28 bg-gradient-to-b from-background via-surface to-background">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl md:text-[40px] font-normal leading-tight text-heading">
            Tonight could be the night your brain finally lets go.
          </h2>
          <div className="mt-9 flex justify-center">
            <a
              href="#buy"
              className="inline-flex w-auto items-center justify-center rounded-full bg-gold px-10 py-4 text-base font-semibold tracking-[0.01em] text-[#0E1626] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-[#F2C87C] hover:shadow-[0_10px_38px_rgba(232,184,106,0.36)]"
            >
              Try it tonight
            </a>
          </div>
          <p className="mt-5 text-sm text-lavender">
            Free US shipping, a 180-night guarantee, and your money back if you are not
            sleeping better in 14 nights.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

```

## `src/components/product/offer-countdown.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";

const KEY = "slumbor-offer-deadline";

// Per-visitor countdown. On the first visit we lock a deadline a few hours out
// (an organic, non-round window), persist it, and count down to it. If it ever
// runs out, a fresh window starts, so it never sits at zero. Hours + minutes
// only, never seconds, to keep it calm instead of scammy.
export default function OfferCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    let deadline = parseInt(localStorage.getItem(KEY) || "0", 10);

    const freshWindow = () =>
      Date.now() + (3 * 60 + Math.floor(Math.random() * 150)) * 60 * 1000; // 3h–5h30m

    if (!deadline || deadline <= now) {
      deadline = freshWindow();
      localStorage.setItem(KEY, String(deadline));
    }

    const tick = () => {
      let left = deadline - Date.now();
      if (left <= 0) {
        deadline = freshWindow();
        localStorage.setItem(KEY, String(deadline));
        left = deadline - Date.now();
      }
      setRemaining(left);
    };

    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) return null;

  const totalMinutes = Math.floor(remaining / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hourLabel = `${hours} ${hours === 1 ? "hour" : "hours"}`;
  const minuteLabel = `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;

  return (
    <div className="flex items-center gap-1.5 text-xs text-red-400 justify-center md:justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>
        Discount ends in{" "}
        <span className="font-semibold tabular-nums">
          {hourLabel} {minuteLabel}
        </span>
      </span>
    </div>
  );
}

```

## `src/components/product/perfect-for.tsx`

```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const bulletPoints = [
  "You can't fall asleep even when you are completely worn out",
  "You stare at screens all day and feel it by the time night comes",
  "You get a tension headache by the end of almost every workday",
  "You have tried melatonin, apps, and tea, and still can't switch off",
  "You wake up at 2am with a brain that simply will not stop",
];

const benefitBullets = [
  "Real relief from the comfort of your own bed",
  "No supplements, no apps, and nothing to subscribe to",
  "Deeper sleep, fewer headaches, and calmer mornings",
];

export default function PerfectFor() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <ScrollReveal className="min-w-0">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/who-its-for.webp"
                alt="Who SleepWave Pro is for"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-6">
              Who is this for?
            </h2>
            <p className="text-slate leading-relaxed mb-5">
              If any of this sounds like you:
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3 mb-8">
              {bulletPoints.map((point, i) => (
                <p key={i} className="inline-flex gap-2 text-sm text-foreground max-w-[90%] md:max-w-none text-left">
                  <span className="text-gold flex-shrink-0">&#8226;</span>
                  <span>{point}</span>
                </p>
              ))}
            </div>
            <p className="text-slate leading-relaxed mb-5">
              Then <BrandName tm className="text-heading" /> was made with you in mind.
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {benefitBullets.map((point, i) => (
                <div key={i} className="inline-flex items-start gap-3 max-w-[90%] md:max-w-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/product-card.tsx`

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  return (
    <Link
      href={`/products/${product.handle}/`}
      className="group block"
    >
      <div className="relative glass-card glass-card-hover rounded-2xl overflow-hidden transition-all duration-300">
        <div className="relative aspect-square bg-gradient-to-br from-gold-light/30 to-surface overflow-hidden">
          {discount > 0 && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-white text-xs font-bold rounded-full z-10">
              -{discount}% OFF
            </span>
          )}
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <h3 className="font-heading font-bold text-heading text-lg mb-1 group-hover:text-gold transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-slate italic mb-3">{product.tagline}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gold">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-sm text-muted line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

```

## `src/components/product/product-faq.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";

const faqItems = [
  {
    question: "How long does it last on a charge?",
    answer:
      "You will get up to four sessions out of a single charge, and it tops back up in about an hour and a half over USB-C, so it tends to just live on your nightstand and stay ready whenever you need it.",
  },
  {
    question: "Does it actually help with headaches, or just sleep?",
    answer:
      "It helps with both, honestly. The warmth and the slow pulse loosen the tension that builds up behind your eyes and temples after a long day on screens, so a lot of people reach for it the moment a tension headache starts, and not only at bedtime.",
  },
  {
    question: "Is the pulse going to feel like too much on my eyes?",
    answer:
      "Not at all. The pulse is built to sit gently around your sinuses and temples rather than push on your eyes, so most people describe it as feeling like a warm hand resting softly over their face while they fall asleep.",
  },
  {
    question: "How long do I wear it each night?",
    answer:
      "About fifteen to twenty minutes is all it takes, and there is an auto shutoff so you do not have to think about it. You put it on, you lie back, and most people are asleep before it finishes the session.",
  },
  {
    question: "What if it breaks?",
    answer:
      "It is covered by a two-year warranty, so if it ever stops working, just send us a quick email at shopslumbor@gmail.com and we will get a free replacement out to you. There is no fine print and nothing to argue about.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "Then you send it back, simple as that. You have a full 180 nights to try it, and if you are not sleeping better, email us at shopslumbor@gmail.com for a refund of every cent. You keep the bonus workbook either way, and there is no restocking fee and no questions about why.",
  },
];

export default function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-gold">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              FAQs
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/8 bg-surface-raised overflow-hidden transition-all duration-300 hover:border-white/15">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer"
                >
                  <span className="text-[15px] font-semibold text-heading leading-snug text-center md:text-left">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gold"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6">
                        <p className="text-sm text-slate leading-relaxed text-center md:text-left">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/product-reviews.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviewsData, reviewDisplay } from "@/lib/data";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";

const REVIEWS_PER_PAGE = 16;

function ReviewAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-gold/10 text-gold"
    >
      {initial}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#E8B86A" : "#2a2a3e"}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductReviews() {
  const [shown, setShown] = useState(REVIEWS_PER_PAGE);
  const reviews = reviewsData;
  const totalReviews = reviewDisplay.count;
  const avgRating = reviewDisplay.avg;

  const ratingDist = reviewDisplay.dist;
  const totalRatings = totalReviews;

  // Cap the visible reviews to an even number so the 2-column grid never leaves
  // a lonely card on its own row.
  const maxReviews = reviews.length - (reviews.length % 2);
  const displayedReviews = reviews.slice(0, Math.min(shown, maxReviews));
  const canShowMore = shown < maxReviews;
  const remainingReviews = totalReviews - maxReviews;

  return (
    <section className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight mb-2">
              Customer <TextGradient variant="gold">Reviews</TextGradient>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center flex-shrink-0">
                <div className="text-5xl sm:text-6xl font-bold text-heading leading-none">
                  {avgRating}
                </div>
                <div className="flex justify-center mt-2 mb-1">
                  <StarRating rating={5} />
                </div>
                <p className="text-sm text-muted">
                  {totalReviews.toLocaleString()} reviews
                </p>
              </div>
              <div className="flex-1 w-full space-y-2.5">
                {ratingDist.map((r) => {
                  const pct = Math.round((r.count / totalRatings) * 100);
                  return (
                    <div key={r.stars} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-heading w-6 text-right">
                        {r.stars}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="#E8B86A"
                        stroke="none"
                        className="flex-shrink-0"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="h-full bg-gold rounded-full"
                        />
                      </div>
                      <span className="text-xs text-muted w-12 text-right">
                        {r.count.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedReviews.map((review, i) => (
              <motion.div
                key={`${review.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % REVIEWS_PER_PAGE) * 0.05 }}
                className="min-w-0"
              >
                <div className="bg-surface-raised border border-white/8 rounded-2xl p-5 h-full transition-all duration-300 hover:border-white/15 hover:shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <ReviewAvatar name={review.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-heading text-sm">
                          {review.name}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={review.rating} />
                        <span className="text-[11px] text-muted">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {canShowMore ? (
          <div className="text-center mt-10">
            <button
              onClick={() => setShown((prev) => prev + REVIEWS_PER_PAGE)}
              className="px-8 py-3.5 rounded-full border border-gold/60 text-gold font-medium text-sm hover:bg-gold/10 hover:border-gold transition-all duration-500 cursor-pointer"
            >
              Read more reviews
            </button>
          </div>
        ) : (
          remainingReviews > 0 && (
            <p className="text-center mt-10 text-sm text-slate">
              Plus{" "}
              <span className="font-semibold text-heading">
                {remainingReviews.toLocaleString()}
              </span>{" "}
              more reviews from people who finally got some sleep.
            </p>
          )
        )}
      </div>
    </section>
  );
}

```

## `src/components/product/product-tabs.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

const tabs = ["Details", "Shipping", "Our Guarantee"];

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex justify-center md:justify-start border-b border-white/8">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={cn(
              "px-5 py-3.5 text-sm font-medium transition-colors relative cursor-pointer",
              active === i ? "text-gold" : "text-muted hover:text-foreground"
            )}
          >
            {tab}
            {active === i && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm text-slate leading-relaxed text-center md:text-left">
        {active === 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2.5 text-left max-w-md mx-auto md:mx-0"
          >
            {product.specs.map((spec, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold mt-0.5 flex-shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{spec}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {active === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p>
              Free US shipping on every order. No add-ons, no shipping protection
              upsell at checkout.
            </p>
            <p>
              Orders are processed within 1-3 business days and ship with tracking.
              You&apos;ll get a tracking number by email the moment it&apos;s on its way.
            </p>
            <p>
              Need help? Email us at{" "}
              <a
                href="mailto:shopslumbor@gmail.com"
                className="text-gold hover:underline font-medium"
              >
                shopslumbor@gmail.com
              </a>
            </p>
          </motion.div>
        )}

        {active === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p>
              Sleep on it for six months. We back the SleepWave Pro with a{" "}
              <strong className="text-heading">180-night money-back guarantee</strong>{" "}
              that starts the day it arrives.
            </p>
            <p>
              Sleep better within 14 nights or we make it right. No restocking fee,
              no questions about why, and you keep the bonus workbook either way.
            </p>
            <p>
              It&apos;s also covered by a 2-year warranty. If it ever stops working,
              we replace it free.
            </p>
            <p>
              Contact our friendly support team at{" "}
              <a
                href="mailto:shopslumbor@gmail.com"
                className="text-gold hover:underline font-medium"
              >
                shopslumbor@gmail.com
              </a>{" "}
              and we&apos;ll make it right.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

```

## `src/components/product/purchase-notification.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  { name: "Sarah", city: "Plano, TX" },
  { name: "Marcus", city: "Littleton, CO" },
  { name: "Jessica", city: "Hoboken, NJ" },
  { name: "David", city: "Bend, OR" },
  { name: "Emily", city: "Naperville, IL" },
  { name: "Ryan", city: "Carlsbad, CA" },
  { name: "Amanda", city: "Franklin, TN" },
  { name: "Tyler", city: "Redmond, WA" },
  { name: "Lauren", city: "Coral Springs, FL" },
  { name: "Chris", city: "Gilbert, AZ" },
  { name: "Megan", city: "Cary, NC" },
  { name: "Jordan", city: "Beaverton, OR" },
  { name: "Priya", city: "Alpharetta, GA" },
  { name: "Derek", city: "Overland Park, KS" },
  { name: "Olivia", city: "Folsom, CA" },
  { name: "Hassan", city: "Eagan, MN" },
  { name: "Sophie", city: "Leesburg, VA" },
  { name: "Alex", city: "Broken Arrow, OK" },
  { name: "Tanya", city: "Roswell, GA" },
  { name: "Brandon", city: "Huntersville, NC" },
  { name: "Lisa", city: "Westfield, IN" },
  { name: "Kevin", city: "Cedar Park, TX" },
  { name: "Nina", city: "Murfreesboro, TN" },
  { name: "Liam", city: "Bothell, WA" },
  { name: "Jade", city: "Cheshire, CT" },
  { name: "Carlos", city: "Katy, TX" },
  { name: "Anna", city: "Gig Harbor, WA" },
  { name: "Mike", city: "Papillion, NE" },
  { name: "Zara", city: "Chandler, AZ" },
  { name: "Tom", city: "Flower Mound, TX" },
];

const timeAgo = [
  "2 minutes ago",
  "5 minutes ago",
  "8 minutes ago",
  "12 minutes ago",
  "3 minutes ago",
  "6 minutes ago",
  "1 minute ago",
  "9 minutes ago",
  "4 minutes ago",
  "7 minutes ago",
];

export default function PurchaseNotification() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showDelay = 8000;
    const interval = 35000;

    const firstTimeout = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, showDelay);

    const recurring = setInterval(() => {
      setIndex((prev) => (prev + 1) % notifications.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, interval);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(recurring);
    };
  }, []);

  const notification = notifications[index];
  const time = timeAgo[index % timeAgo.length];
  const initial = notification.name.charAt(0);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-24 sm:bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 z-40 max-w-xs w-[calc(100%-2rem)] sm:w-full"
        >
          <div className="bg-surface-raised rounded-xl shadow-lg border border-white/8 p-4 flex items-center gap-3 border-l-4 border-l-gold">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-gold">{initial}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground font-medium leading-snug">
                <span className="font-bold">{notification.name}</span> from {notification.city} just purchased{" "}
                <span className="text-gold font-semibold">SleepWave Pro</span>
              </p>
              <p className="text-[11px] text-muted mt-0.5">{time}</p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-muted hover:text-foreground transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Dismiss"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

## `src/components/product/relief-intro.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const painPoints = [
  {
    title: "Wired all evening",
    body: "Eyes burning by 4pm, headache by 7pm, still can't switch off by 11pm.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Exhausted but awake",
    body: "Lying there completely drained, and your brain still won't power down.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    title: "Tried everything",
    body: "Melatonin, supplements, sleep apps. Still staring at the ceiling.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
  },
  {
    title: "Rough mornings",
    body: "Waking up groggy and heavy, like a truck ran over you in the night.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
        <line x1="23" y1="22" x2="1" y2="22" />
        <polyline points="8 6 12 2 16 6" />
      </svg>
    ),
  },
];

export default function ReliefIntro() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-purple">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Sound familiar?
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-heading tracking-tight">
              Give your nervous system the off-switch it&apos;s been begging for.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 mb-10">
          {painPoints.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08} className="min-w-0">
              <div className="h-full flex items-start gap-4 p-5 md:p-6 rounded-2xl bg-background/40 border border-white/8 text-left">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center text-slate">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-heading mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">{p.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col items-center text-center rounded-2xl border border-gold/20 bg-gold/[0.06] p-6 md:p-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold mb-3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p className="text-[15px] md:text-base text-foreground leading-relaxed max-w-xl">
              <span className="font-semibold text-heading">You don&apos;t have to keep grinding through it.</span>{" "}
              <BrandName tm /> is built for exactly this: warmth and a slow pulse that
              walk your body down into sleep, in the kind of quiet that lets it work.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

```

## `src/components/product/risk-free-guarantee.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const guaranteeBullets = [
  "180-night full refund, starting the day it arrives",
  "Sleep better in 14 nights, or we make it right",
  "2-year warranty: free replacement if it ever stops working",
  "No restocking fee, no questions about why",
  "Keep the bonus workbook either way",
  "Real humans answer your email within 24 hours",
];

export default function RiskFreeGuarantee() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="relative max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            {/* Soft amber seal */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            </div>
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Our promise
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-4">
              The worst that happens? You sleep on it for six months.
            </h2>

            <p className="text-slate leading-relaxed mb-8 max-w-md mx-auto">
              If you&apos;ve made it this far, you&apos;re tired of being sold to. So
              here&apos;s the honest version.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5 max-w-xl mx-auto text-left mb-8">
              {guaranteeBullets.map((point, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/8 p-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm text-foreground leading-snug">{point}</span>
                </div>
              ))}
            </div>

            <p className="text-foreground/80 leading-relaxed mb-4 max-w-md mx-auto">
              We built this because we needed it ourselves.
              <br />
              We stand behind it.
            </p>

            <p className="text-sm text-slate">
              Questions? Email us anytime at{" "}
              <a href="mailto:shopslumbor@gmail.com" className="text-gold hover:underline font-medium">
                shopslumbor@gmail.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

```

## `src/components/product/science-section.tsx`

```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const signals = [
  {
    name: "Warmth",
    body: "Gentle heat relaxes the muscles around your eyes and the tension starts to let go.",
  },
  {
    name: "Pulse",
    body: "A slow, soft rhythm your body reads as a signal to calm down.",
  },
  {
    name: "Silence",
    body: "No music, no beeping, just quiet. That quiet is the part that lets it work.",
  },
];

export default function ScienceSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0 md:order-last">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/science.webp"
                alt="The science behind SleepWave Pro"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              The SlowWave Method
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-4">
              How warmth and a slow pulse walk your nervous system to sleep.
            </h2>
            <div className="space-y-5 mt-2">
              {signals.map((s, i) => (
                <div key={i} className="flex gap-4 text-left items-center">
                  <span className="flex-shrink-0 text-gold leading-none">&#8226;</span>
                  <p className="text-[15px] text-foreground leading-relaxed">
                    <span className="font-medium text-heading">{s.name}.</span>{" "}
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/product/slowwave-diagram.tsx`

```tsx
"use client";

/**
 * The SlowWave Method, drawn. A warm glow (heat) sitting behind an eye-mask
 * band, pulse rings emanating from the center, and a quiet room around it.
 * Pure SVG so it needs no photography, and it makes the mechanism a thing you
 * can see, not just read.
 */
export default function SlowWaveDiagram() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <svg
        viewBox="0 0 360 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="The SlowWave Method: warmth and a slow pulse around the eyes, in silence"
      >
        <defs>
          <radialGradient id="sw-warm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A574" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#D4A574" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sw-eye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBF1DF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E8C79A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Warmth: a breathing glow */}
        <g
          className="motion-safe:animate-[breathe-glow_11s_ease-in-out_infinite]"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx="180" cy="150" r="118" fill="url(#sw-warm)" />
        </g>

        {/* Pulse: rings emanating from the center, mask sits over the middle */}
        <circle cx="180" cy="150" r="128" stroke="#D4A574" strokeOpacity="0.16" strokeWidth="1.5" />
        <circle cx="180" cy="150" r="104" stroke="#D4A574" strokeOpacity="0.28" strokeWidth="1.5" />
        <circle cx="180" cy="150" r="80" stroke="#D4A574" strokeOpacity="0.45" strokeWidth="1.5" />

        {/* Heat rising off the top of the mask */}
        <g stroke="#D4A574" strokeOpacity="0.5" fill="none" strokeLinecap="round" strokeWidth="1.5">
          <path d="M150 112 q6 -8 0 -16 q-6 -8 0 -16" />
          <path d="M180 108 q6 -8 0 -16 q-6 -8 0 -16" />
          <path d="M210 112 q6 -8 0 -16 q-6 -8 0 -16" />
        </g>

        {/* The mask band */}
        <rect
          x="64"
          y="118"
          width="232"
          height="64"
          rx="32"
          fill="#F2EDE4"
          fillOpacity="0.05"
          stroke="#D4A574"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        {/* Two soft eye glows on the mask */}
        <ellipse cx="132" cy="150" rx="22" ry="16" fill="url(#sw-eye)" />
        <ellipse cx="228" cy="150" rx="22" ry="16" fill="url(#sw-eye)" />
      </svg>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-5 text-xs tracking-[0.15em] uppercase text-foreground/70">
        {["Warmth", "Pulse", "Silence"].map((label) => (
          <span key={label} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

```

## `src/components/product/special-offer.tsx`

```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const offerItems = [
  {
    value: "50% OFF",
    label: "the SleepWave Pro",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
    ),
  },
  {
    value: "FREE",
    label: "$29 Sleep Reset Workbook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    ),
  },
  {
    value: "180 nights",
    label: "money-back guarantee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
    ),
  },
  {
    value: "FREE",
    label: "US shipping",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    ),
  },
];

export default function SpecialOffer() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Limited-time offer
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-5">
              Everything you need to finally sleep.
            </h2>
            <p className="text-[15px] md:text-base text-foreground leading-relaxed max-w-xl mx-auto mb-8">
              <span className="text-gold font-semibold">Special offer today.</span> Try
              the SleepWave Pro risk-free at the lowest price it has ever been.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
              {offerItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center gap-2 rounded-2xl bg-gold/5 border border-gold/15 p-4 md:p-5"
                >
                  <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {item.icon}
                  </div>
                  <p className="font-heading text-lg md:text-xl font-semibold text-gold leading-none">
                    {item.value}
                  </p>
                  <p className="text-[11px] md:text-xs text-slate leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-center w-full">
            <div className="rounded-3xl overflow-hidden border border-white/8 shadow-lg w-full md:max-w-[60%] md:mx-auto">
              <Image
                src="/products/what-you-get-left-v2.webp"
                alt="The SleepWave Pro mask and the 14-Night Sleep Reset Workbook"
                width={1200}
                height={1200}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/what-you-get-right-v2.webp"
                alt="Everything included: free shipping, the bonus workbook, and the 180-night guarantee"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Price reveal */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <div className="flex items-end justify-center gap-4">
              <span className="text-2xl text-lavender line-through leading-none mb-1">
                $243
              </span>
              <span className="font-heading text-5xl md:text-6xl font-medium text-gold leading-none">
                $69.99
              </span>
            </div>
            <p className="mt-4 text-[15px] text-foreground/80">
              Everything above, one charge, one mask, and <BrandName tm /> ships it free.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

```

## `src/components/product/volume-discounts.tsx`

```tsx
"use client";

import { cn } from "@/lib/utils";

interface VolumeDiscountsProps {
  basePrice: number;
  selectedTier: number;
  onSelect: (tier: number) => void;
}

const tiers = [
  { qty: 1, discount: 0, label: "Buy 1", badge: "" },
  { qty: 2, discount: 10, label: "Buy 2", badge: "10% OFF" },
  { qty: 3, discount: 20, label: "Buy 3", badge: "20% OFF" },
];

export default function VolumeDiscounts({
  basePrice,
  selectedTier,
  onSelect,
}: VolumeDiscountsProps) {
  return (
    <div>
      <h4 className="text-sm font-bold text-heading mb-3">Buy More, Save More</h4>
      <div className="space-y-2.5">
        {tiers.map((tier, i) => {
          const unitPrice = basePrice * (1 - tier.discount / 100);
          const totalSavings = (basePrice - unitPrice) * tier.qty;
          const isSelected = selectedTier === i;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer group",
                isSelected
                  ? "border-gold bg-gold-light shadow-[0_2px_12px_rgba(201,168,76,0.12)]"
                  : "border-white/8 hover:border-gold/40 hover:bg-gold-light/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected ? "border-gold" : "border-muted"
                  )}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-heading">
                    {tier.label}
                  </span>
                  {tier.badge && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-gold text-navy rounded-full leading-normal">
                      {tier.badge}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-heading">
                  ${unitPrice.toFixed(2)}{" "}
                  <span className="text-xs font-normal text-muted">each</span>
                </p>
                {totalSavings > 0 && (
                  <p className="text-xs font-semibold text-gold">
                    Save ${totalSavings.toFixed(2)}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

```

## `src/components/product/who-its-for.tsx`

```tsx
"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const personas = [
  {
    title: "People Who Can't Fall Asleep",
    description: "You lie awake for hours, mind racing, and wake up exhausted. No matter what you try, true rest feels out of reach.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <circle cx="12" cy="12" r="10"/><path d="M8 15h8"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/>
      </svg>
    ),
  },
  {
    title: "Desk Workers and Remote Employees",
    description: "8+ hours at a screen and your mind is too wired to wind down. The eye strain and tension just keep stacking up day after day.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: "People Tired of Wasting Money on Sleep Aids",
    description: "You have tried melatonin, white noise, sleep apps, maybe even a sleep clinic. Temporary relief at best. Nothing that actually sticks.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    title: "People with High-Stress Lifestyles",
    description: "Your days are packed and your mind won't switch off at night. The stress runs from your head down into your body, keeping you tense and restless.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
];

export default function WhoItsFor() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-surface/50 to-surface">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Made for You</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight">
              Who It&apos;s For
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {personas.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="min-w-0">
              <div className="p-8 rounded-2xl bg-surface border border-white/8 shadow-sm hover:shadow-md hover:border-gold/20 transition-all duration-300 h-full group">
                <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors mx-auto md:mx-0">
                  {p.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-heading mb-3 text-center md:text-left">{p.title}</h3>
                <p className="text-sm text-slate leading-relaxed text-center md:text-left">{p.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## `src/contexts/cart-context.tsx`

```tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SLEEPWAVE_PRO_ID, bundleDiscount } from "@/lib/data";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

// Tiny, auto-selected order bump shown on the cart. Pure margin, the shopper can
// uncheck it. Backed by a real Shopify variant when the store is wired up.
export const PROTECTION_PLAN = {
  id: "protection-plan-3yr",
  title: "3-Year Protection Plan",
  price: 2.99,
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  protectionPlan: boolean;
  setProtectionPlan: (value: boolean) => void;
  total: number;
  // Live unit price for a line (applies the bundle discount to the mask by qty).
  unitPrice: (item: CartItem) => number;
  // Discount percent currently applied to a line (0 when none).
  lineDiscount: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [protectionPlan, setProtectionPlan] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("slumbor-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem("slumbor-cart");
      }
    }
    const savedPlan = localStorage.getItem("slumbor-protection-plan");
    if (savedPlan === "0") setProtectionPlan(false);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("slumbor-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("slumbor-protection-plan", protectionPlan ? "1" : "0");
    }
  }, [protectionPlan, mounted]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + quantity, price: item.price }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsOpen(true);

      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "AddToCart", {
          content_name: item.title,
          content_ids: ["sleepwave-pro"],
          content_type: "product",
          value: item.price,
          currency: "USD",
        });
      }
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // The stored item.price is the full (base) price. The mask's effective price
  // is recomputed from its current quantity so the cart always stays accurate.
  const lineDiscount = useCallback(
    (item: CartItem) =>
      item.id === SLEEPWAVE_PRO_ID ? bundleDiscount(item.quantity) : 0,
    []
  );
  const unitPrice = useCallback(
    (item: CartItem) =>
      Math.round(item.price * (1 - lineDiscount(item) / 100) * 100) / 100,
    [lineDiscount]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + unitPrice(item) * item.quantity,
    0
  );
  const planSelected = protectionPlan && items.length > 0;
  const total = subtotal + (planSelected ? PROTECTION_PLAN.price : 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        protectionPlan,
        setProtectionPlan,
        total,
        unitPrice,
        lineDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

```

## `src/lib/data.ts`

```ts
export interface Product {
  id: string;
  handle: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice: number;
  images: string[];
  features: {
    title: string;
    description: string;
  }[];
  specs: string[];
  category: string;
}

// One source of truth for the offer. Reference everywhere so the page never
// contradicts itself.
export const offer = {
  price: 69.99,
  compareAtPrice: 139.99,
  guaranteeDays: 180,
  outcomeDays: 14,
  warrantyYears: 2,
  bonusName: "The 14-Night Sleep Reset Workbook",
  bonusBlurb: "a night-by-night plan that gets you sleeping better inside your guarantee",
  bonusValue: 29,
  shipping: "Free US shipping",
};

export const SLEEPWAVE_PRO_ID = "sleepwave-pro";

// Bundle discount for the SleepWave Pro, driven purely by quantity:
// 2 = 10% off, 3 or more = 20% off. Used in the buy box and the cart so the
// price always matches the quantity, even when it changes in the cart.
export function bundleDiscount(qty: number): number {
  if (qty >= 3) return 20;
  if (qty === 2) return 10;
  return 0;
}

export const heroProduct: Product = {
  id: "sleepwave-pro",
  handle: "sleepwave-pro",
  title: "SleepWave Pro",
  tagline: "The kind of quiet your body has been waiting for.",
  description:
    "By the end of the day your eyes are fried from screens and your head will not switch off. The SleepWave Pro wraps your eyes in gentle warmth and a slow pulse, two signals that tell your nervous system the day is over and it is safe to let go. The tension behind your eyes eases, your mind goes quiet, and you finally drift off into the kind of rest your body has been waiting for.",
  price: 69.99,
  compareAtPrice: 139.99,
  images: [
    "/products/p1.webp",
    "/products/p2.webp",
    "/products/p3.webp",
    "/products/p4-v2.webp",
    "/products/p5.webp",
    "/products/p6.webp",
    "/products/p7.webp",
    "/products/p8.webp",
    "/products/p9.webp",
    "/products/p10.webp",
    "/products/p11.webp",
  ],
  features: [
    {
      title: "The warmth lasts",
      description:
        "Gentle, even heat around your eyes and temples for the full session. The kind that pulls the tension out from behind your eyes instead of just sitting on top of it.",
    },
    {
      title: "The pulse is soft",
      description:
        "A slow rhythm that wraps your sinuses and temples the way a hand would. Designed to never press your eyes back into your head.",
    },
    {
      title: "It stays silent",
      description:
        "No music, no beeps, no cheerful voice announcing it's done. It powers down quietly after 15 minutes, the way sleep actually starts.",
    },
    {
      title: "Gentle on your eyes",
      description:
        "Contoured cups wrap your eyes and sinuses without pressing your eyeballs back into your head. For the people who feel crushed by other masks.",
    },
    {
      title: "One button, no fuss",
      description:
        "Warmth and pulse. Adjust it without your phone, in the dark, half-asleep. It just works.",
    },
    {
      title: "Lives on your nightstand",
      description:
        "Wireless and rechargeable over USB-C. Up to 4 sessions per charge, always ready when you reach for it.",
    },
  ],
  specs: [
    "Method: Warmth + pulse (the SlowWave Method)",
    "Heat: 5 adjustable levels (35°C-55°C)",
    "Pulse: 6 modes (steady, pulse, wave, and more)",
    "Battery: 1200mAh rechargeable lithium (USB-C)",
    "Run time: Up to 4 sessions per charge",
    "Weight: 120g (ultra-light)",
    "Silence: No music, no Bluetooth, no voice prompts, silent auto-off after 15 minutes",
    "Warranty: 2-year free replacement if it ever stops working",
    "In the box: SleepWave Pro, USB-C cable, travel pouch, plus The 14-Night Sleep Reset Workbook (digital)",
  ],
  category: "Sleep & Wellness",
};

export const products: Product[] = [heroProduct];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "How do I contact Slumbor support?",
    answer:
      "You can reach us anytime at shopslumbor@gmail.com. Real humans, usually back to you within 24 hours.",
  },
  {
    question: "Will the shutdown noise wake me back up?",
    answer:
      "No. This was the number one complaint people had about other masks, the cheerful voice announcing 'goodbye' right as you drift off. The SleepWave Pro just goes quiet. It powers down silently after 15 minutes.",
  },
  {
    question: "Is the pressure going to hurt my eyes?",
    answer:
      "No. The pulse is designed to wrap your sinuses and temples, not press your eyeballs back into your head. It's soft on purpose. Most people describe it as a hand resting over their eyes.",
  },
  {
    question: "Does it actually help with headaches, or just sleep?",
    answer:
      "Both. The warmth and slow pulse loosen the tension that stacks up behind your eyes and temples after a long day at screens. A lot of people reach for it the moment they feel a tension headache starting, not just at bedtime.",
  },
  {
    question: "Is it safe to fall asleep wearing it?",
    answer:
      "Absolutely. It powers down on its own after 15 minutes, the materials are breathable and hypoallergenic, and the heat stays in a safe, comfortable range the whole time.",
  },
  {
    question: "Does it play music or make any sound?",
    answer:
      "No, and that's on purpose. There's no music, no Bluetooth, no beeps. Just warmth and a soft pulse, and a room that stays quiet enough to actually fall asleep in. The silence is the point.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "A full charge gives you up to 4 sessions. It charges in about 1.5 hours over USB-C, so it's always ready on your nightstand.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "You have 180 nights. Sleep better within 14 of them or email us at shopslumbor@gmail.com for a full refund. Keep the bonus workbook either way. No restocking fee, no questions about why.",
  },
  {
    question: "What if it breaks?",
    answer:
      "It's covered by a 2-year warranty. If it ever stops working, email us at shopslumbor@gmail.com and we'll send a free replacement.",
  },
  {
    question: "How does the shipping work?",
    answer:
      "Free shipping on every US order. Orders are processed within 1-3 business days and every order ships with tracking.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Email us within 12 hours of ordering at shopslumbor@gmail.com and we'll sort it out. After that it may have already entered processing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "All major cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay through secure Shopify checkout.",
  },
  {
    question: "What if my item arrives damaged?",
    answer:
      "Email shopslumbor@gmail.com with a photo and we'll send a replacement at no cost or refund you in full. Whichever you'd rather.",
  },
];

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  image?: string;
}

// On-strategy, verbatim-anchored reviews first (tension / screen fatigue /
// the gold quotes / the differentiation objections), so the strongest social
// proof shows at the top of the grid.
export const reviewsData: Review[] = [
  {
    name: "Hannah W.",
    rating: 5,
    date: "May 24, 2026",
    text: "my old massager used to literally announce GOODBYE when it shut off and wake me right back up. this one just goes quiet. and it doesnt crush my eyes either, the pressure is soft. the two things i hated most about my last one are just gone",
  },
  {
    name: "Denise R.",
    rating: 5,
    date: "May 19, 2026",
    text: "I have fallen asleep several times while using it which is very unlike me because it usually takes me hours. I stare at a screen all day and by night my head is pounding and my brain wont shut up. This is the first thing that actually quiets it.",
  },
  {
    name: "Tiffany H.",
    rating: 5,
    date: "May 12, 2026",
    text: "listen. this thing will put you to sleep. i mean snoring sleep lol. i put it on, the warmth spreads out across my eyes, and thats the last thing i remember. my husband knows when i put it on to just leave me alone hahaha",
  },
  {
    name: "Marcus L.",
    rating: 5,
    date: "May 6, 2026",
    text: "by 4pm my eyes are burning and by 7 my head is in a vice from staring at a monitor all day. i was honestly skeptical but i was out before the timer even ended. didnt believe it til it happened to me",
  },
  {
    name: "Priyanka N.",
    rating: 5,
    date: "Apr 30, 2026",
    text: "If you get migraines you know how debilitating they are. I was desperate one night and put this on and it actually took the edge off before it got bad. Now I reach for it the second I feel the tension starting behind my eyes.",
  },
  {
    name: "Aaron T.",
    rating: 5,
    date: "Apr 23, 2026",
    text: "every time i laid down my chest would get tight and my brain would start dumping every worry from the day. id lie there an hour minimum. the slow pulse gives my mind something to follow and i just drift. didnt think anything could turn my brain off but here we are",
  },
  {
    name: "Gabriela S.",
    rating: 5,
    date: "Apr 17, 2026",
    text: "my family made fun of me when i unboxed it and slipped it on. joke is on them, three of them have ordered their own now. everyone who laughed wants one",
  },
  {
    name: "Sophie L.",
    rating: 5,
    date: "Apr 11, 2026",
    text: "i work from home and my eyes are fried by bedtime, dry and strained. ten minutes of the heat and its like a reset. i sleep so much deeper now and wake up without that heavy feeling behind my eyes",
  },
  {
    name: "Devon M.",
    rating: 4,
    date: "Apr 4, 2026",
    text: "my old one had this loud voice that announced silent mode and woke me up every time, drove me insane. this one is dead silent, no beeps no nothing. only reason for 4 stars is i wish the strap was a touch longer. warm, quiet, and im gone",
  },
  {
    name: "Renee K.",
    rating: 5,
    date: "Mar 30, 2026",
    text: "melatonin, magnesium, tea, a meditation app, you name it i tried it. half of them left me groggy in the morning. this is the only thing that gets me down without the hangover. skeptical at first, obsessed now",
  },
  {
    name: "Carmen V.",
    rating: 5,
    date: "Mar 25, 2026",
    text: "twelve hour shifts, my eyes are destroyed by the time im home. this feels like a warm compress at a spa. i used to lie there wired from the shift, now im asleep before the auto shutoff",
  },
  {
    name: "Megan F.",
    rating: 5,
    date: "Mar 18, 2026",
    text: "i carry all my stress in my forehead and behind my eyes. the warmth plus the soft pulse loosens it in a way nothing else has. its become the one part of my night i actually look forward to",
  },
  {
    name: "Ian P.",
    rating: 5,
    date: "Mar 12, 2026",
    text: "first time in a long time i woke up without that tired heavy feeling in my eyes. i didnt even realize how much tension i was holding until it was gone",
  },
  {
    name: "Wade B.",
    rating: 5,
    date: "Mar 5, 2026",
    text: "i drive long haul and sleep in weird places at weird times. this is the only thing that gets me down fast in a loud truck stop. heat on, eyes covered, out cold",
  },
  {
    name: "Olivia D.",
    rating: 5,
    date: "Feb 27, 2026",
    text: "got it for my sister whos a new mom running on no sleep. she said the fifteen minutes before bed with this is the most relaxed shes felt in months. thanked me like five times",
  },
  {
    name: "Aisha P.",
    rating: 5,
    date: "Feb 20, 2026",
    text: "I've tried melatonin, chamomile tea, weighted blankets, and basic sleep masks. Nothing worked like this. The warmth and the slow pulse together are unlike anything else I've used and I actually wake up feeling rested now.",
  },
  {
    name: "Emily W.",
    rating: 5,
    date: "Feb 14, 2026",
    text: "I have the worst time winding down after work. My brain just wont shut off. This is now my nightly ritual. Put it on, turn on the wave mode, and I'm asleep before the auto shutoff even kicks in.",
  },
  {
    name: "Ryan P.",
    rating: 5,
    date: "Feb 8, 2026",
    text: "i work at a screen all day and my eyes are always strained and tired by bedtime. this with the heat on medium is the perfect way to decompress. sleeping like a baby now",
  },
  {
    name: "Rachel D.",
    rating: 5,
    date: "Feb 2, 2026",
    text: "the eye strain relief alone is worth it. i stare at screens 10+ hours a day and putting this on at night is like a spa treatment for my eyes. the warm compress feeling is incredible",
  },
  {
    name: "Marcus A.",
    rating: 5,
    date: "Jan 27, 2026",
    text: "this is way better than any sleep supplement ive tried. no groggy feeling in the morning, no dependency, just genuine relaxation that puts you to sleep naturally. the warmth is the real star here",
  },
  {
    name: "Alex R.",
    rating: 5,
    date: "Jan 21, 2026",
    text: "skeptical at first but this thing is legit. the warmth spreads across your eyes and you can literally feel your body relaxing. highly recommend to anyone who takes forever to fall asleep",
  },
  {
    name: "Samantha R.",
    rating: 5,
    date: "Jan 15, 2026",
    text: "Bought two, one for me and one for my mom. She's obsessed. The different pulse modes are perfect and the heat is genuinely soothing. Great quality for the price.",
  },
  {
    name: "James C.",
    rating: 5,
    date: "Jan 9, 2026",
    text: "got this because my sleep was terrible from anxiety and my roommate immediately ordered one too after trying mine. we both use them nightly now. best purchase of the year easily",
  },
  {
    name: "Sophie C.",
    rating: 5,
    date: "Jan 3, 2026",
    text: "Bought it for my insomnia and it completely changes how I feel by morning. I put it on with the wave mode while lying in bed and it just melts the tension away. Absolutely love it.",
  },
  {
    name: "Megan T.",
    rating: 5,
    date: "Dec 29, 2025",
    text: "I carry all my stress in my eyes and forehead and this has genuinely changed my bedtime. the pulse mode is so nice for releasing tension. best purchase I've made this year honestly",
  },
  {
    name: "Jordan B.",
    rating: 4,
    date: "Dec 22, 2025",
    text: "great device for the price. the heat and pulse combo is really effective for falling asleep faster. only giving 4 stars because shipping took a bit longer than i expected but the product itself is 5/5",
  },
  {
    name: "Danielle S.",
    rating: 5,
    date: "Dec 16, 2025",
    text: "perfect for my nighttime wind-down. i put it on in bed, heat on level 3, wave mode, and im out within 10 minutes. the auto shutoff means i never have to worry about it. absolute essential now",
  },
  {
    name: "Tom H.",
    rating: 5,
    date: "Dec 10, 2025",
    text: "replaced my old sleep mask with this and the difference is night and day. so much more than just blocking light. the heat and pulse actually help you fall asleep instead of lying there. 10/10",
  },
  {
    name: "Lisa N.",
    rating: 5,
    date: "Dec 4, 2025",
    text: "My daughter has been struggling with sleep from studying late and staring at screens all day. Got her this and she literally thanked me which never happens lol. She falls asleep so much faster now.",
  },
  {
    name: "Nina G.",
    rating: 5,
    date: "Nov 28, 2025",
    text: "My husband and I both use one now. He was the skeptic but after trying mine he ordered his own within a week. We both sleep so much better and wake up clearer.",
  },
  {
    name: "Carlos V.",
    rating: 5,
    date: "Nov 21, 2025",
    text: "this thing is way better than expected. i was worried it would be some cheap gimmick but its actually really well built. the heat feels like a warm compress at a spa. genuinely helps me sleep",
  },
  {
    name: "Priya S.",
    rating: 5,
    date: "Nov 15, 2025",
    text: "Perfect gift for my sister who's a new mom and hasn't slept properly in months. She says the 15 minutes she gets with this before bed is the most relaxed she feels all day.",
  },
  {
    name: "Brandon W.",
    rating: 4,
    date: "Nov 9, 2025",
    text: "solid product. really helps me unwind before bed. my only minor complaint is the strap could be slightly more adjustable for larger heads but it still fits me fine. heat and pulse are excellent",
  },
  {
    name: "Natalie L.",
    rating: 5,
    date: "Nov 3, 2025",
    text: "so comfortable. it fits perfectly and doesnt put any pressure on my eyes. i was worried it would feel heavy but it barely weighs anything. sleep quality has genuinely improved",
  },
  {
    name: "Danielle O.",
    rating: 5,
    date: "Oct 28, 2025",
    text: "second one i bought. first was for me and this one is for my best friend for her birthday. she has terrible insomnia and is going to love this. quality is consistent between both units",
  },
  {
    name: "Mike T.",
    rating: 5,
    date: "Oct 22, 2025",
    text: "my wife and i both use this every night now, we each have our own. its become part of our routine. 15 minutes before bed and we both sleep so much deeper. cant recommend enough",
  },
  {
    name: "Rachel T.",
    rating: 5,
    date: "Oct 16, 2025",
    text: "the 15 minute auto shutoff is a lifesaver. i always fall asleep before it even turns off which tells you how well it works. no more lying in bed scrolling my phone for hours",
  },
  {
    name: "Zara L.",
    rating: 5,
    date: "Oct 10, 2025",
    text: "I'm an optometrist and I recommend warm compresses to my patients regularly. Having an affordable heated mask with a gentle pulse like this is excellent. The quality is genuinely impressive for the price.",
  },
  {
    name: "Ethan G.",
    rating: 5,
    date: "Oct 4, 2025",
    text: "i travel a lot for work and this is essential in my carry-on now. hotel sleep used to be awful but now i put this on and im out cold. the travel pouch is a nice touch",
  },
  {
    name: "Isabel R.",
    rating: 5,
    date: "Sep 28, 2025",
    text: "My doctor suggested heat therapy for my eye strain and tension headaches. This has been perfect. The soothing warmth with the gentle pulse is so effective. Best money I've spent on my health this year.",
  },
  {
    name: "Kayla D.",
    rating: 4,
    date: "Sep 21, 2025",
    text: "really effective. the heat levels are all genuinely different temps which is nice. only reason for 4 stars is i wish there was an app but the buttons work fine and honestly its easier without a phone",
  },
  {
    name: "Noah F.",
    rating: 5,
    date: "Sep 15, 2025",
    text: "ive shown this to literally everyone i know and they all want one. just ordered two more as gifts for my parents who both have trouble sleeping. the quality is genuinely impressive",
  },
  {
    name: "Chloe W.",
    rating: 5,
    date: "Sep 9, 2025",
    text: "just wow. i didnt expect much for $70 but this exceeded all my expectations. the warmth is perfectly gentle and the pulse is so relaxing. my whole family fights over it now lol",
  },
];

// Derived stats from the actual review cards (used where we want exact numbers).
export const reviewStats = (() => {
  const count = reviewsData.length;
  const sum = reviewsData.reduce((s, r) => s + r.rating, 0);
  const avg = Math.round((sum / count) * 10) / 10;
  const dist = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviewsData.filter((r) => r.rating === stars).length,
  }));
  return { count, avg, dist };
})();

// Social-proof totals shown on the rating counter and the summary bars. The
// full review history isn't all rendered on the page; only a curated set of
// cards below is. Distribution sums to `count` and averages ~4.9.
export const reviewDisplay = {
  count: 2347,
  avg: 4.9,
  dist: [
    { stars: 5, count: 2160 },
    { stars: 4, count: 130 },
    { stars: 3, count: 35 },
    { stars: 2, count: 14 },
    { stars: 1, count: 8 },
  ],
};

```

## `src/lib/shopify.ts`

```ts
const SHOPIFY_DOMAIN = "slumbor.myshopify.com";

// Shopify variant IDs (from the product URLs' ?variant= value).
const VARIANT_IDS: Record<string, string> = {
  "sleepwave-pro": "58281487565181",
};
const PROTECTION_PLAN_VARIANT = "58281499689341";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

// Builds a Shopify cart permalink, e.g.
//   https://slumbor.myshopify.com/cart/58281487565181:2,58281499689341:1?discount=SAVE10
// which drops the shopper straight into Shopify's cart/checkout with the right
// items, the protection plan (when selected), and the matching bundle discount.
export function createCheckout(
  items: CartItem[],
  includeProtectionPlan = false
): string {
  const productLines = items
    .map((i) => {
      const variant = VARIANT_IDS[i.id];
      return variant ? `${variant}:${i.quantity}` : null;
    })
    .filter((line): line is string => line !== null);

  // Shopify lists the last-added line on top, so put the protection plan first in
  // the permalink and the product last, making the product appear first at checkout.
  const lines: string[] = [];
  if (includeProtectionPlan && productLines.length > 0) {
    lines.push(`${PROTECTION_PLAN_VARIANT}:1`);
  }
  lines.push(...productLines);

  let url = `https://${SHOPIFY_DOMAIN}/cart/${lines.join(",")}`;

  // Carry the bundle discount over to Shopify via a code (create SAVE10 / SAVE20
  // in Shopify Discounts). Invalid/missing codes are simply ignored by Shopify.
  const maskQty = items
    .filter((i) => i.id === "sleepwave-pro")
    .reduce((sum, i) => sum + i.quantity, 0);
  const discountCode = maskQty >= 3 ? "SAVE20" : maskQty >= 2 ? "SAVE10" : "";
  if (discountCode) url += `?discount=${discountCode}`;

  return url;
}

```

## `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

## `src/types/globals.d.ts`

```ts
interface Window {
  fbq: (...args: unknown[]) => void;
}

```



---

# 5. THE OFFER & COMMERCE LOGIC

This section documents, verbatim, the complete commerce layer of the Slumbor store: the product setup, the value/bonus stack, the bundle discounts, the auto-selected protection-plan order bump, the cart math, the Shopify checkout permalink flow, the per-visitor countdown, the guarantee/refund terms, and how the digital workbook bonus is delivered. Every price, percentage, variant ID, discount code, and localStorage key is exact.

---

## 5.1 Product Setup

There is exactly ONE product. It is the hero product and the only item in the `products[]` array. Defined in `src/lib/data.ts`.

**Single source of truth for the offer** (`src/lib/data.ts`, the `offer` object):

```ts
export const offer = {
  price: 69.99,
  compareAtPrice: 139.99,
  guaranteeDays: 180,
  outcomeDays: 14,
  warrantyYears: 2,
  bonusName: "The 14-Night Sleep Reset Workbook",
  bonusBlurb: "a night-by-night plan that gets you sleeping better inside your guarantee",
  bonusValue: 29,
  shipping: "Free US shipping",
};

export const SLEEPWAVE_PRO_ID = "sleepwave-pro";
```

**Product identity / core fields** (`heroProduct` in `src/lib/data.ts`):

- **id:** `sleepwave-pro`
- **handle:** `sleepwave-pro`
- **title (exact name):** `SleepWave Pro`
- **tagline:** `The kind of quiet your body has been waiting for.`
- **price:** `69.99` (i.e. **$69.99**)
- **compareAtPrice:** `139.99` (i.e. **$139.99** — the crossed-out "was" price; note this differs from the `$243` shown in the value-stack reveal, see §5.2)
- **category:** `Sleep & Wellness`
- **images (11 total):** `/products/p1.webp`, `/products/p2.webp`, `/products/p3.webp`, `/products/p4-v2.webp`, `/products/p5.webp`, `/products/p6.webp`, `/products/p7.webp`, `/products/p8.webp`, `/products/p9.webp`, `/products/p10.webp`, `/products/p11.webp`

**description (verbatim):**
> By the end of the day your eyes are fried from screens and your head will not switch off. The SleepWave Pro wraps your eyes in gentle warmth and a slow pulse, two signals that tell your nervous system the day is over and it is safe to let go. The tension behind your eyes eases, your mind goes quiet, and you finally drift off into the kind of rest your body has been waiting for.

**Variants / options:** There are NO configurable options on the storefront (no size/color selector). The only "variant"-like dimension is **quantity**, which drives the bundle discount (§5.3). At the Shopify layer, the product maps to a single hard-coded variant ID (§5.5).

**specs[] (verbatim, includes the "in the box" bonus line):**
- `Method: Warmth + pulse (the SlowWave Method)`
- `Heat: 5 adjustable levels (35°C-55°C)`
- `Pulse: 6 modes (steady, pulse, wave, and more)`
- `Battery: 1200mAh rechargeable lithium (USB-C)`
- `Run time: Up to 4 sessions per charge`
- `Weight: 120g (ultra-light)`
- `Silence: No music, no Bluetooth, no voice prompts, silent auto-off after 15 minutes`
- `Warranty: 2-year free replacement if it ever stops working`
- `In the box: SleepWave Pro, USB-C cable, travel pouch, plus The 14-Night Sleep Reset Workbook (digital)`

---

## 5.2 The Value / Bonus Stack ("Everything you need to finally sleep")

Rendered by `src/components/product/special-offer.tsx`. Section eyebrow: **"Limited-time offer"**. Heading: **"Everything you need to finally sleep."** Sub-line: *"**Special offer today.** Try the SleepWave Pro risk-free at the lowest price it has ever been."*

**The four value-stack tiles (verbatim `value` + `label` from `offerItems`):**

| Value (verbatim) | Label (verbatim) |
|---|---|
| `50% OFF` | `the SleepWave Pro` |
| `FREE` | `$29 Sleep Reset Workbook` |
| `180 nights` | `money-back guarantee` |
| `FREE` | `US shipping` |

**Price reveal block (verbatim):**
- Crossed-out anchor price: **`$243`** (rendered with `line-through`)
- Headline price: **`$69.99`**
- Caption below: *"Everything above, one charge, one mask, and Slumbor™ ships it free."* (the brand name renders via `<BrandName tm />`)

**Value-stack images:**
- Left/top: `/products/what-you-get-left-v2.webp` — alt: "The SleepWave Pro mask and the 14-Night Sleep Reset Workbook"
- Right/bottom: `/products/what-you-get-right-v2.webp` — alt: "Everything included: free shipping, the bonus workbook, and the 180-night guarantee"

**Stated dollar values referenced across the offer:**
- SleepWave Pro: **$69.99** (framed as **50% OFF**; internal `compareAtPrice` = **$139.99**; value-stack anchor = **$243**)
- Bonus workbook ("The 14-Night Sleep Reset Workbook" / "$29 Sleep Reset Workbook"): **FREE**, stated value **$29** (`offer.bonusValue = 29`)
- Money-back guarantee: **180 nights**
- US shipping: **FREE**

> Note the offer uses THREE different "reference/crossed-out" numbers in different places, all present in code and intentional: `$139.99` (product-object `compareAtPrice`), `$243` (special-offer value-stack reveal), and "50% OFF" framing on the tile. The product-page reassurance line (`product-page-client.tsx`) restates: *"Free US shipping, a 180-night guarantee, and a 2-year warranty. Plus The 14-Night Sleep Reset Workbook ($29 value), free with every order."*

---

## 5.3 Bundles / Quantity Tiers & Discount Math

Two UI surfaces drive/display bundles: the buy-box tiers (`src/components/product/volume-discounts.tsx`) and the live cart repricing (`cart-context.tsx`). Both derive from the single `bundleDiscount()` function in `src/lib/data.ts`.

**Canonical discount function (`src/lib/data.ts`), VERBATIM:**

```ts
// Bundle discount for the SleepWave Pro, driven purely by quantity:
// 2 = 10% off, 3 or more = 20% off. Used in the buy box and the cart so the
// price always matches the quantity, even when it changes in the cart.
export function bundleDiscount(qty: number): number {
  if (qty >= 3) return 20;
  if (qty === 2) return 10;
  return 0;
}
```

**Discount ladder (exact):**
- Quantity **1** → **0% off** → **$69.99** each
- Quantity **2** → **10% off** → **$62.99** each (`69.99 * 0.90 = 62.991 → 62.99`)
- Quantity **3+** → **20% off** → **$55.99** each (`69.99 * 0.80 = 55.992 → 55.99`)

**Buy-box tier UI** (`volume-discounts.tsx`), heading **"Buy More, Save More"**, `tiers` array (verbatim):

```ts
const tiers = [
  { qty: 1, discount: 0, label: "Buy 1", badge: "" },
  { qty: 2, discount: 10, label: "Buy 2", badge: "10% OFF" },
  { qty: 3, discount: 20, label: "Buy 3", badge: "20% OFF" },
];
```

Per-tier UI math (verbatim): `const unitPrice = basePrice * (1 - tier.discount / 100);` and `const totalSavings = (basePrice - unitPrice) * tier.qty;`. Each tier renders `${unitPrice.toFixed(2)} each` and, when savings > 0, `Save ${totalSavings.toFixed(2)}`. Selected badge styling shows `10% OFF` / `20% OFF` as a gold pill.

**Matching Shopify discount codes:** the same quantity thresholds map to Shopify discount codes **`SAVE10`** (qty ≥ 2) and **`SAVE20`** (qty ≥ 3), appended to the checkout permalink (§5.5). These codes must be created in Shopify → Discounts to actually apply; invalid/missing codes are silently ignored by Shopify.

---

## 5.4 Auto-Selected $2.99 3-Year Protection Plan (Order Bump)

Defined in `src/contexts/cart-context.tsx`. It is a pure-margin order bump, **checked by default**, that the shopper can uncheck.

**PROTECTION_PLAN object (verbatim):**

```ts
// Tiny, auto-selected order bump shown on the cart. Pure margin, the shopper can
// uncheck it. Backed by a real Shopify variant when the store is wired up.
export const PROTECTION_PLAN = {
  id: "protection-plan-3yr",
  title: "3-Year Protection Plan",
  price: 2.99,
};
```

**Implementation details:**
- **Default state:** `const [protectionPlan, setProtectionPlan] = useState(true);` → **checked/true by default.**
- **localStorage persistence key:** `slumbor-protection-plan`. Stored as `"1"` (on) or `"0"` (off): `localStorage.setItem("slumbor-protection-plan", protectionPlan ? "1" : "0");`. On load: `if (savedPlan === "0") setProtectionPlan(false);` (i.e. it stays `true` unless explicitly turned off previously).
- **Applies to total only when cart non-empty:** `const planSelected = protectionPlan && items.length > 0;`
- **Price added:** `+$2.99` (`PROTECTION_PLAN.price`).
- **Shopify variant backing the bump:** `PROTECTION_PLAN_VARIANT = "58281499689341"` (in `shopify.ts`).
- **UI copy** (both `cart/page.tsx` and `cart-drawer.tsx`): title `3-Year Protection Plan`, price `+$2.99`, description: *"Covers accidental damage for 3 years. One free replacement, no questions."* Rendered as a gold-bordered checkbox row, checkbox pre-ticked.

---

## 5.5 Cart Logic (formulas, VERBATIM)

From `src/contexts/cart-context.tsx`.

**CartItem shape:** `{ id, title, price, quantity, image }`. The stored `item.price` is always the FULL base price ($69.99); the discount is recomputed live from quantity so the cart never goes stale.

**Line discount + unit price (verbatim):**

```ts
// The stored item.price is the full (base) price. The mask's effective price
// is recomputed from its current quantity so the cart always stays accurate.
const lineDiscount = useCallback(
  (item: CartItem) =>
    item.id === SLEEPWAVE_PRO_ID ? bundleDiscount(item.quantity) : 0,
  []
);
const unitPrice = useCallback(
  (item: CartItem) =>
    Math.round(item.price * (1 - lineDiscount(item) / 100) * 100) / 100,
  [lineDiscount]
);
```

**Totals (verbatim):**

```ts
const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
const subtotal = items.reduce(
  (sum, item) => sum + unitPrice(item) * item.quantity,
  0
);
const planSelected = protectionPlan && items.length > 0;
const total = subtotal + (planSelected ? PROTECTION_PLAN.price : 0);
```

- **`lineDiscount(item)`** = `bundleDiscount(qty)` for the mask, else `0`.
- **`unitPrice(item)`** = base price × (1 − discount%/100), rounded to 2 decimals.
- **`subtotal`** = Σ (unitPrice × quantity) over all lines.
- **`total`** = subtotal + $2.99 (only if protection plan checked AND cart non-empty).

**localStorage keys used by the cart:**
- `slumbor-cart` — JSON-serialized `items[]` array.
- `slumbor-protection-plan` — `"1"`/`"0"` for the order-bump state.
- `slumbor-offer-deadline` — the per-visitor countdown deadline (used by `offer-countdown.tsx`, see §5.7).

**AddToCart Meta Pixel event (fires inside `addItem`, verbatim):**

```ts
if (typeof window !== "undefined" && typeof window.fbq === "function") {
  window.fbq("track", "AddToCart", {
    content_name: item.title,
    content_ids: ["sleepwave-pro"],
    content_type: "product",
    value: item.price,
    currency: "USD",
  });
}
```
Note `value` is `item.price` (the base $69.99), and `content_ids` is hard-coded to `["sleepwave-pro"]`. Adding to cart also force-opens the cart drawer (`setIsOpen(true)`).

**Checkout trigger** (both `cart/page.tsx` and `cart-drawer.tsx`):
```ts
const handleCheckout = () => {
  window.location.href = createCheckout(items, protectionPlan);
};
```
The cart page button label is **"Proceed to Checkout"**; the drawer button label is **"Checkout"**. Both show *"Shipping calculated at checkout"* and display `${total.toFixed(2)}` as the Subtotal figure.

---

## 5.6 Checkout Flow — Shopify Cart Permalink (`createCheckout`, VERBATIM)

From `src/lib/shopify.ts`. There is NO Storefront API / GraphQL — checkout is a plain Shopify **cart permalink** that drops the shopper into the hosted Shopify cart/checkout with the exact line items and a discount code.

**Config constants (verbatim):**
```ts
const SHOPIFY_DOMAIN = "slumbor.myshopify.com";

// Shopify variant IDs (from the product URLs' ?variant= value).
const VARIANT_IDS: Record<string, string> = {
  "sleepwave-pro": "58281487565181",
};
const PROTECTION_PLAN_VARIANT = "58281499689341";
```

- **Store domain:** `slumbor.myshopify.com`
- **SleepWave Pro variant ID:** `58281487565181`
- **3-Year Protection Plan variant ID:** `58281499689341`

**The function, VERBATIM:**

```ts
// Builds a Shopify cart permalink, e.g.
//   https://slumbor.myshopify.com/cart/58281487565181:2,58281499689341:1?discount=SAVE10
// which drops the shopper straight into Shopify's cart/checkout with the right
// items, the protection plan (when selected), and the matching bundle discount.
export function createCheckout(
  items: CartItem[],
  includeProtectionPlan = false
): string {
  const productLines = items
    .map((i) => {
      const variant = VARIANT_IDS[i.id];
      return variant ? `${variant}:${i.quantity}` : null;
    })
    .filter((line): line is string => line !== null);

  // Shopify lists the last-added line on top, so put the protection plan first in
  // the permalink and the product last, making the product appear first at checkout.
  const lines: string[] = [];
  if (includeProtectionPlan && productLines.length > 0) {
    lines.push(`${PROTECTION_PLAN_VARIANT}:1`);
  }
  lines.push(...productLines);

  let url = `https://${SHOPIFY_DOMAIN}/cart/${lines.join(",")}`;

  // Carry the bundle discount over to Shopify via a code (create SAVE10 / SAVE20
  // in Shopify Discounts). Invalid/missing codes are simply ignored by Shopify.
  const maskQty = items
    .filter((i) => i.id === "sleepwave-pro")
    .reduce((sum, i) => sum + i.quantity, 0);
  const discountCode = maskQty >= 3 ? "SAVE20" : maskQty >= 2 ? "SAVE10" : "";
  if (discountCode) url += `?discount=${discountCode}`;

  return url;
}
```

**Resulting permalink structure:**
```
https://slumbor.myshopify.com/cart/{PROTECTION_PLAN_VARIANT}:1,{PRODUCT_VARIANT}:{qty}?discount=CODE
```

**Worked examples:**
- 1 mask, plan on, no discount: `https://slumbor.myshopify.com/cart/58281499689341:1,58281487565181:1`
- 2 masks, plan on: `https://slumbor.myshopify.com/cart/58281499689341:1,58281487565181:2?discount=SAVE10`
- 3 masks, plan off: `https://slumbor.myshopify.com/cart/58281487565181:3?discount=SAVE20`

**Ordering detail:** the protection plan line is intentionally listed FIRST in the permalink (because Shopify shows the last-added line on top, this makes the product appear first in the Shopify cart). The protection plan is always quantity `1`. The discount code is chosen purely by total mask quantity: **`SAVE20`** at qty ≥ 3, **`SAVE10`** at qty ≥ 2, else no `?discount=` param.

> Redundancy note: bundle discounting exists in TWO places — the front-end recomputes discounted prices locally for display, AND the `SAVE10`/`SAVE20` codes re-apply the discount inside Shopify at checkout. The Shopify-side codes are what actually charge the customer, so they must exist in the Shopify Discounts admin.

---

## 5.7 Per-Visitor Countdown (`offer-countdown.tsx`)

From `src/components/product/offer-countdown.tsx`. localStorage key: **`slumbor-offer-deadline`** (`const KEY = "slumbor-offer-deadline";`).

**Behavior (verbatim comment):**
> Per-visitor countdown. On the first visit we lock a deadline a few hours out (an organic, non-round window), persist it, and count down to it. If it ever runs out, a fresh window starts, so it never sits at zero. Hours + minutes only, never seconds, to keep it calm instead of scammy.

**Fresh-window generation (verbatim):**
```ts
const freshWindow = () =>
  Date.now() + (3 * 60 + Math.floor(Math.random() * 150)) * 60 * 1000; // 3h–5h30m
```
- Window length = `(180 + random(0..149))` minutes → between **3h 0m and 5h 29m** out from first visit.
- The deadline is stored under `slumbor-offer-deadline` and reused across visits until it expires; on expiry a new random window is generated so it never shows zero.
- Ticks every **30,000 ms (30s)** via `setInterval(tick, 30000)`.
- Displays hours + minutes only (never seconds), with singular/plural labels (`1 hour`/`hours`, `1 minute`/`minutes`).
- Rendered text: **"Discount ends in `{H hours} {M minutes}`"** in red, with a clock icon.

---

## 5.8 Guarantee / Refund Terms (VERBATIM)

**Risk-Free Guarantee section** (`src/components/product/risk-free-guarantee.tsx`):
- Eyebrow: **"Our promise"**
- Heading: **"The worst that happens? You sleep on it for six months."**
- Intro: *"If you've made it this far, you're tired of being sold to. So here's the honest version."*

**`guaranteeBullets` (verbatim):**
1. `180-night full refund, starting the day it arrives`
2. `Sleep better in 14 nights, or we make it right`
3. `2-year warranty: free replacement if it ever stops working`
4. `No restocking fee, no questions about why`
5. `Keep the bonus workbook either way`
6. `Real humans answer your email within 24 hours`

Closing: *"We built this because we needed it ourselves. / We stand behind it."* Support email: **shopslumbor@gmail.com** (also the universal support contact throughout the site).

**FAQ terms (`data.ts`), verbatim:**
- *"What if it doesn't work for me?"* → *"You have 180 nights. Sleep better within 14 of them or email us at shopslumbor@gmail.com for a full refund. Keep the bonus workbook either way. No restocking fee, no questions about why."*
- *"What if it breaks?"* → *"It's covered by a 2-year warranty. If it ever stops working, email us at shopslumbor@gmail.com and we'll send a free replacement."*
- Shipping: *"Free shipping on every US order. Orders are processed within 1-3 business days and every order ships with tracking."*
- Change/cancel: *"Email us within 12 hours of ordering... After that it may have already entered processing."*
- Payments accepted: *"All major cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay through secure Shopify checkout."*
- Damaged item: photo to shopslumbor@gmail.com → replacement or full refund.

**Refund policy page** (`src/app/refund-policy/page.tsx`) restates: keep the bonus workbook either way; keep the bonus 14-Night Sleep Reset Workbook either way. The product-page copy (`product-page-client.tsx`) restates: *"...back for every cent, and you keep the workbook either way."*

**Canonical numeric terms:** 180-night refund window · sleep-better-in-14-nights outcome promise · 2-year warranty · no restocking fee · 24-hour email response · free US shipping · processed in 1–3 business days.

---

## 5.9 Digital Workbook Bonus — Source & Delivery

**The bonus:** "The 14-Night Sleep Reset Workbook" (a.k.a. "$29 Sleep Reset Workbook"), stated value **$29**, given FREE with every order. Described in `data.ts` as *"a night-by-night plan that gets you sleeping better inside your guarantee"* and listed in-box as *"...plus The 14-Night Sleep Reset Workbook (digital)."*

**Files under `workbook/` (from `find workbook -type f`):**
- `workbook/build.mjs` — Node build script. Emits `workbook.html` (24 pages, US Letter). Programmatically generates all pages so the 14 nightly pages share one template. Header comment: *"SLUMBOR — 14-Night Sleep Reset workbook builder / Emits workbook.html (24 pages, US Letter). Rendered to PDF via Chrome."* Writes output via `fs.writeFile("workbook/workbook.html", html)`.
- `workbook/workbook.html` — the rendered 24-page HTML (build output).
- `workbook/README.md` — build/rebuild instructions.
- `workbook/fonts.css` + `workbook/fonts/f0.woff2` … `f9.woff2` (10 font files) — Fraunces (headers) + Inter (body), localized from Google Fonts so they embed identically in the PDF.
- `workbook/slumbor-14-night-reset.pdf` — a copy of the rendered PDF living in the source folder.

**Bonus PDF (public/served):**
- `public/workbook/slumbor-14-night-reset.pdf` — the deliverable asset, served at the URL **`/workbook/slumbor-14-night-reset.pdf`**.

**Build pipeline (from `workbook/README.md`):**
```
node workbook/build.mjs
# then render with headless Chrome:
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="<abs path>/public/workbook/slumbor-14-night-reset.pdf" \
  "file:///<abs path>/workbook/workbook.html"
```
- Print-ready, pen-fillable, 24-page US-Letter-portrait PDF. Brand colors: midnight `#0E1626`, cream `#F2EDE4`, amber `#D4A574`, ink `#2A2620`. Cover + back cover are dark; all interior pages are light cream (low-ink, printable). Text is real/selectable (not images); fonts subset-embedded by Chrome. No interactive AcroForm fields (hand-fill by design).

**How it is delivered / referenced:** IMPORTANT — the storefront does **NOT** link, download, or gate the PDF anywhere in `src/`. A repo-wide grep for `slumbor-14-night-reset` and `/workbook/` returns **no matches in `src/`**. The PDF simply sits as a static asset in `public/workbook/` (publicly reachable at `/workbook/slumbor-14-night-reset.pdf`), and the workbook is presented purely as marketing copy ("$29 value, free with every order", "digital", "keep the workbook either way"). Per `workbook/README.md`, it is intended as *"The customer's first post-purchase brand touch and the tangible '$29 value' bonus"* — i.e. delivery is handled post-purchase (e.g. emailed / linked after checkout via Shopify), not through any on-site download flow in this codebase. Nothing in the Next.js app auto-delivers the file; it is a static, unlinked public asset plus the marketing promise.

---

## 5.10 Quick-Reference Constants Table

| Thing | Value | Location |
|---|---|---|
| Product name | SleepWave Pro | `data.ts` |
| Product id / handle | `sleepwave-pro` | `data.ts` |
| Price | $69.99 | `data.ts`, `special-offer.tsx` |
| compareAtPrice (product) | $139.99 | `data.ts` |
| Value-stack anchor price | $243 | `special-offer.tsx` |
| Bonus workbook value | $29 (FREE) | `data.ts`, `special-offer.tsx` |
| Bundle: qty 2 | 10% off → $62.99 ea | `data.ts` / `volume-discounts.tsx` |
| Bundle: qty 3+ | 20% off → $55.99 ea | `data.ts` / `volume-discounts.tsx` |
| Shopify discount codes | SAVE10 (qty≥2), SAVE20 (qty≥3) | `shopify.ts` |
| Protection plan price | $2.99, default ON | `cart-context.tsx` |
| Protection plan id | `protection-plan-3yr` | `cart-context.tsx` |
| Shopify domain | slumbor.myshopify.com | `shopify.ts` |
| Product variant ID | 58281487565181 | `shopify.ts` |
| Protection plan variant ID | 58281499689341 | `shopify.ts` |
| localStorage: cart | `slumbor-cart` | `cart-context.tsx` |
| localStorage: protection plan | `slumbor-protection-plan` (`"1"`/`"0"`) | `cart-context.tsx` |
| localStorage: countdown | `slumbor-offer-deadline` | `offer-countdown.tsx` |
| Countdown window | 3h–5h30m, ticks every 30s | `offer-countdown.tsx` |
| Guarantee | 180-night refund | `risk-free-guarantee.tsx`, `data.ts` |
| Outcome promise | sleep better in 14 nights | `data.ts` |
| Warranty | 2 years, free replacement | `data.ts` |
| Support email | shopslumbor@gmail.com | throughout |
| Bonus PDF URL | `/workbook/slumbor-14-night-reset.pdf` | `public/workbook/` |


---

# 6. COPY APPENDIX (VERBATIM DUMP)

> Every piece of user-visible text on the site, reproduced word-for-word with zero edits, organized page by page and section by section. Split into product-side (6a) and site/legal/chrome (6b).

## 6a. Copy Appendix — Product Page & Product Data

> Verbatim reproduction of every user-visible string on the product page and its underlying data. Typos, casing, punctuation, and phrasing are reproduced exactly as written in source. The brand token `<BrandName />` renders as **SLUMBOR** (with a superscript ™ when `tm` is set); it is shown inline below as `SLUMBOR™` / `SLUMBOR` where it appears.

---

### Buy Box (product-page-client.tsx + product data)

**Discount badge (on gallery image):**
- `-{discountPct}% OFF` → renders `-50% OFF` (computed: (139.99 − 69.99) / 139.99 = 50%)

**Title (h1):**
- `SLUMBOR™ SleepWave Pro`

**Tagline:**
- The kind of quiet your body has been waiting for.

**Rating line:**
- ★★★★★
- `4.9 (2,347 reviews)`

**Price block:**
- `$69.99`
- `$139.99` (struck through)
- `SAVE 50%`

**Offer countdown (OfferCountdown):**
- Discount ends in **`{hours} hours {minutes} minutes`** (dynamic; e.g. "Discount ends in 4 hours 12 minutes"). Icon: clock. Hour/minute words singularize ("1 hour", "1 minute").

**Benefit Badges (3-up grid):**

| Label | Sublabel |
|---|---|
| Wind down | End the day |
| Ease tension | Behind the eyes |
| Fall asleep | Without the fight |

**Core Benefits (checkmark list):**
- End the day without a tension headache stacking on top
- Loosen the strain behind your eyes from a long day at screens
- Stop reaching for your phone just to get tired enough to sleep
- Wake up without that heavy-eyed, run-over feeling

**Tension-entry agitation callout:**
- Heading (h3): By 11pm your eyes are fried and your head still won't switch off.
- Body: Gentle warmth and a slow pulse, two signals that tell your body the day is over, with no music and no beeping.
- Body: Not better in two weeks? You've got **six months** to send it back for every cent, and you keep the workbook either way.

**Quantity + Add to Cart:**
- `-` / quantity number / `+` (quantity stepper)
- Button label: **Add to Cart**
- Button label (after click, 2s): **Added!** (with checkmark icon)

**Offer reassurance line:**
- Free US shipping, a 180-night guarantee, and a 2-year warranty. Plus **The 14-Night Sleep Reset Workbook** ($29 value), free with every order.

**Trust Badges (3-up grid):**

| Label | Sublabel |
|---|---|
| Free US | Shipping |
| 180-Night | Guarantee |
| Secure | Checkout |

---

### Volume Discounts (volume-discounts.tsx)

**Heading:**
- Buy More, Save More

**Tiers:**

| Label | Badge | Unit price (each) | Savings |
|---|---|---|---|
| Buy 1 | (none) | $69.99 each | (none) |
| Buy 2 | 10% OFF | $62.99 each | Save $14.00 |
| Buy 3 | 20% OFF | $55.99 each | Save $42.00 |

(Unit price = base $69.99 × (1 − discount); "each" is a suffix. Savings = (base − unit) × qty.)

---

### Product Tabs (product-tabs.tsx)

**Tab labels:**
- Details
- Shipping
- Our Guarantee

**Tab 1 — Details (product.specs, checkmark list):**
- Method: Warmth + pulse (the SlowWave Method)
- Heat: 5 adjustable levels (35°C-55°C)
- Pulse: 6 modes (steady, pulse, wave, and more)
- Battery: 1200mAh rechargeable lithium (USB-C)
- Run time: Up to 4 sessions per charge
- Weight: 120g (ultra-light)
- Silence: No music, no Bluetooth, no voice prompts, silent auto-off after 15 minutes
- Warranty: 2-year free replacement if it ever stops working
- In the box: SleepWave Pro, USB-C cable, travel pouch, plus The 14-Night Sleep Reset Workbook (digital)

**Tab 2 — Shipping:**
- Free US shipping on every order. No add-ons, no shipping protection upsell at checkout.
- Orders are processed within 1-3 business days and ship with tracking. You'll get a tracking number by email the moment it's on its way.
- Need help? Email us at shopslumbor@gmail.com

**Tab 3 — Our Guarantee:**
- Sleep on it for six months. We back the SleepWave Pro with a **180-night money-back guarantee** that starts the day it arrives.
- Sleep better within 14 nights or we make it right. No restocking fee, no questions about why, and you keep the bonus workbook either way.
- It's also covered by a 2-year warranty. If it ever stops working, we replace it free.
- Contact our friendly support team at shopslumbor@gmail.com and we'll make it right.

---

### Product Description (product data — `heroProduct.description`)

> By the end of the day your eyes are fried from screens and your head will not switch off. The SleepWave Pro wraps your eyes in gentle warmth and a slow pulse, two signals that tell your nervous system the day is over and it is safe to let go. The tension behind your eyes eases, your mind goes quiet, and you finally drift off into the kind of rest your body has been waiting for.

**Product features array (`heroProduct.features` — not all rendered on page, included for completeness):**

| Title | Description |
|---|---|
| The warmth lasts | Gentle, even heat around your eyes and temples for the full session. The kind that pulls the tension out from behind your eyes instead of just sitting on top of it. |
| The pulse is soft | A slow rhythm that wraps your sinuses and temples the way a hand would. Designed to never press your eyes back into your head. |
| It stays silent | No music, no beeps, no cheerful voice announcing it's done. It powers down quietly after 15 minutes, the way sleep actually starts. |
| Gentle on your eyes | Contoured cups wrap your eyes and sinuses without pressing your eyeballs back into your head. For the people who feel crushed by other masks. |
| One button, no fuss | Warmth and pulse. Adjust it without your phone, in the dark, half-asleep. It just works. |
| Lives on your nightstand | Wireless and rechargeable over USB-C. Up to 4 sessions per charge, always ready when you reach for it. |

---

### Benefits Hero (benefits-hero.tsx)

**Heading (h2):**
- What it actually does for you.

**Intro:**
- Your nervous system has been running hard for fourteen hours. A few quiet minutes gives it the off-switch it's been asking for, so you can:

**Benefit list:**
- Loosen the tension that builds up behind your eyes after a long day
- Ease off a screen headache before it has the chance to settle in
- Let a racing mind slow down enough to actually drift off
- Fall asleep on your own, without supplements, apps, or your phone
- Wake up feeling clear instead of heavy and run down

---

### Relief Intro (relief-intro.tsx)

**Eyebrow:**
- Sound familiar?

**Heading (h2):**
- Give your nervous system the off-switch it's been begging for.

**Pain point cards:**

| Title | Body |
|---|---|
| Wired all evening | Eyes burning by 4pm, headache by 7pm, still can't switch off by 11pm. |
| Exhausted but awake | Lying there completely drained, and your brain still won't power down. |
| Tried everything | Melatonin, supplements, sleep apps. Still staring at the ceiling. |
| Rough mornings | Waking up groggy and heavy, like a truck ran over you in the night. |

**Closing callout:**
- **You don't have to keep grinding through it.** SLUMBOR™ is built for exactly this: warmth and a slow pulse that walk your body down into sleep, in the kind of quiet that lets it work.

---

### Discover Section (discover-section.tsx)

**Heading (h2):**
- The cycle ends tonight.

**Intro:**
- **Meet** SLUMBOR™, a heated eye mask for anyone sick of staring at the ceiling with a fried head and a brain that won't shut up.

**Bullets:**
- Built for screen-tired eyes and a nervous system stuck in overdrive
- Uses gentle warmth and a soft pulse your body responds to, in complete silence
- Works in a matter of minutes, not weeks of waiting it out
- Small enough to live on your nightstand and become part of the routine

---

### Perfect For / Who Is This For (perfect-for.tsx)

**Heading (h2):**
- Who is this for?

**Intro:**
- If any of this sounds like you:

**Bullet points:**
- You can't fall asleep even when you are completely worn out
- You stare at screens all day and feel it by the time night comes
- You get a tension headache by the end of almost every workday
- You have tried melatonin, apps, and tea, and still can't switch off
- You wake up at 2am with a brain that simply will not stop

**Transition line:**
- Then SLUMBOR™ was made with you in mind.

**Benefit bullets (checkmarks):**
- Real relief from the comfort of your own bed
- No supplements, no apps, and nothing to subscribe to
- Deeper sleep, fewer headaches, and calmer mornings

---

### Science Section (science-section.tsx)

**Eyebrow:**
- The SlowWave Method

**Heading (h2):**
- How warmth and a slow pulse walk your nervous system to sleep.

**Signals list (name + body):**
- **Warmth.** Gentle heat relaxes the muscles around your eyes and the tension starts to let go.
- **Pulse.** A slow, soft rhythm your body reads as a signal to calm down.
- **Silence.** No music, no beeping, just quiet. That quiet is the part that lets it work.

---

### Features Love / The Details (features-love.tsx)

**Eyebrow:**
- The details

**Heading (h2):**
- Every part of it earns its place.

**Feature cards:**

| Title | Body |
|---|---|
| Contoured 3D cups | The cups arch over your eyes instead of pressing on them. No weight on your eyelids, so it stays comfortable the whole time you wear it. |
| Five heat settings | Choose a light warmth or a deeper heat, whatever your face needs that night. The warmth is what tells your body it is safe to wind down. |
| Adjustable strap | Loosen or tighten it to your head in seconds. It stays put when you roll over and never pulls at your hair. |
| Six pulse modes | A soft, steady pulse around your eyes, like a slow massage. Your body reads the rhythm as a cue to calm down. |

---

### How It Works (how-it-works.tsx)

**Heading (h2):**
- How to use it

**Steps:**
- **Step 1** — Slip the mask on and adjust the strap until it feels held in place, not tight.
- **Step 2** — Press the button and choose warmth, pulse, or both, then dial it in to whatever tonight calls for.
- **Step 3** — Lie back and let your breath slow down. Most people are asleep before the timer even ends.

---

### EMS Comparison / The Difference (ems-comparison.tsx)

**Eyebrow:**
- The Difference

**Heading (h2):**
- The old way vs the SleepWave Pro

**Left card (badge: OLD WAY):**
- Chart caption: STILL WIRED AT MIDNIGHT
- Title (h3): Pills, apps, and the wait-it-out method
- Body: Melatonin fades, apps keep you on your phone, and a hot shower wears off fast. None of it tells your body the day is actually over.
- Footer (with X icon): Never reaches the signal your body needs

**Right card (badge: SLEEPWAVE PRO):**
- Chart caption (top): WARMTH + PULSE
- Chart caption (bottom): NERVOUS SYSTEM, OFF
- Title (h3): Warmth and a slow pulse, in silence
- Body: Two signals your body is built to respond to, in fifteen quiet minutes a night. The last calm thing you do before sleep, instead of the thing you fight.
- Footer (with check icon): Signals your body actually responds to

---

### Comparison Table (comparison-table.tsx)

**Eyebrow:**
- Compare

**Heading (h2):**
- SleepWave Pro vs the alternatives

**Table (✓ = check icon, ✗ = cross icon; text cells verbatim):**

| | SleepWave Pro | Pills & supplements | Regular eye mask |
|---|---|---|---|
| Price | $69.99 once | $30-60/month | $10-20 |
| Tells your nervous system to wind down | ✓ | ✗ | ✗ |
| Warmth and a slow pulse in one, in total silence | ✓ | ✗ | ✗ |
| Works in minutes, not weeks | ✓ | ✗ | ✗ |
| No subscription, no refills | ✓ | ✗ | ✓ |
| Doesn't leave you groggy in the morning | ✓ | ✗ | ✓ |
| Drug-free | ✓ | ✗ | ✓ |
| Easy to use right before bed without your phone | ✓ | ✗ | ✓ |

---

### Cost Callout (cost-callout.tsx)

**Heading (h2):**
- A bottle of melatonin runs out in three weeks.

**Body:**
- The SleepWave Pro costs **$69.99 once**, and you can use it every night for the rest of your life.

---

### Special Offer (special-offer.tsx)

**Eyebrow:**
- Limited-time offer

**Heading (h2):**
- Everything you need to finally sleep.

**Subhead:**
- **Special offer today.** Try the SleepWave Pro risk-free at the lowest price it has ever been.

**Offer item tiles (value + label):**

| Value | Label |
|---|---|
| 50% OFF | the SleepWave Pro |
| FREE | $29 Sleep Reset Workbook |
| 180 nights | money-back guarantee |
| FREE | US shipping |

**Price reveal:**
- `$243` (struck through)
- `$69.99`
- Everything above, one charge, one mask, and SLUMBOR™ ships it free.

---

### Mid-Page CTA (mid-page-cta.tsx)

**Heading (h2):**
- Tonight could be the night your brain finally lets go.

**Button:**
- Try it tonight

**Reassurance line:**
- Free US shipping, a 180-night guarantee, and your money back if you are not sleeping better in 14 nights.

---

### Product FAQ (product-faq.tsx)

**Heading (h2):**
- FAQs

**FAQ items (question + full answer, verbatim):**

**Q: How long does it last on a charge?**
A: You will get up to four sessions out of a single charge, and it tops back up in about an hour and a half over USB-C, so it tends to just live on your nightstand and stay ready whenever you need it.

**Q: Does it actually help with headaches, or just sleep?**
A: It helps with both, honestly. The warmth and the slow pulse loosen the tension that builds up behind your eyes and temples after a long day on screens, so a lot of people reach for it the moment a tension headache starts, and not only at bedtime.

**Q: Is the pulse going to feel like too much on my eyes?**
A: Not at all. The pulse is built to sit gently around your sinuses and temples rather than push on your eyes, so most people describe it as feeling like a warm hand resting softly over their face while they fall asleep.

**Q: How long do I wear it each night?**
A: About fifteen to twenty minutes is all it takes, and there is an auto shutoff so you do not have to think about it. You put it on, you lie back, and most people are asleep before it finishes the session.

**Q: What if it breaks?**
A: It is covered by a two-year warranty, so if it ever stops working, just send us a quick email at shopslumbor@gmail.com and we will get a free replacement out to you. There is no fine print and nothing to argue about.

**Q: What if it doesn't work for me?**
A: Then you send it back, simple as that. You have a full 180 nights to try it, and if you are not sleeping better, email us at shopslumbor@gmail.com for a refund of every cent. You keep the bonus workbook either way, and there is no restocking fee and no questions about why.

> NOTE: The `faqData` array in `src/lib/data.ts` is a separate, larger FAQ set (13 items) that is NOT rendered on the product page (the page uses the local `faqItems` above). Reproduced below for completeness since it lives in the product data file.

**faqData (src/lib/data.ts — full set, verbatim):**

**Q: How do I contact Slumbor support?**
A: You can reach us anytime at shopslumbor@gmail.com. Real humans, usually back to you within 24 hours.

**Q: Will the shutdown noise wake me back up?**
A: No. This was the number one complaint people had about other masks, the cheerful voice announcing 'goodbye' right as you drift off. The SleepWave Pro just goes quiet. It powers down silently after 15 minutes.

**Q: Is the pressure going to hurt my eyes?**
A: No. The pulse is designed to wrap your sinuses and temples, not press your eyeballs back into your head. It's soft on purpose. Most people describe it as a hand resting over their eyes.

**Q: Does it actually help with headaches, or just sleep?**
A: Both. The warmth and slow pulse loosen the tension that stacks up behind your eyes and temples after a long day at screens. A lot of people reach for it the moment they feel a tension headache starting, not just at bedtime.

**Q: Is it safe to fall asleep wearing it?**
A: Absolutely. It powers down on its own after 15 minutes, the materials are breathable and hypoallergenic, and the heat stays in a safe, comfortable range the whole time.

**Q: Does it play music or make any sound?**
A: No, and that's on purpose. There's no music, no Bluetooth, no beeps. Just warmth and a soft pulse, and a room that stays quiet enough to actually fall asleep in. The silence is the point.

**Q: How long does the battery last?**
A: A full charge gives you up to 4 sessions. It charges in about 1.5 hours over USB-C, so it's always ready on your nightstand.

**Q: What if it doesn't work for me?**
A: You have 180 nights. Sleep better within 14 of them or email us at shopslumbor@gmail.com for a full refund. Keep the bonus workbook either way. No restocking fee, no questions about why.

**Q: What if it breaks?**
A: It's covered by a 2-year warranty. If it ever stops working, email us at shopslumbor@gmail.com and we'll send a free replacement.

**Q: How does the shipping work?**
A: Free shipping on every US order. Orders are processed within 1-3 business days and every order ships with tracking.

**Q: Can I change or cancel my order?**
A: Email us within 12 hours of ordering at shopslumbor@gmail.com and we'll sort it out. After that it may have already entered processing.

**Q: What payment methods do you accept?**
A: All major cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay through secure Shopify checkout.

**Q: What if my item arrives damaged?**
A: Email shopslumbor@gmail.com with a photo and we'll send a replacement at no cost or refund you in full. Whichever you'd rather.

---

### Risk-Free Guarantee (risk-free-guarantee.tsx)

**Eyebrow:**
- Our promise

**Heading (h2):**
- The worst that happens? You sleep on it for six months.

**Body:**
- If you've made it this far, you're tired of being sold to. So here's the honest version.

**Guarantee bullets:**
- 180-night full refund, starting the day it arrives
- Sleep better in 14 nights, or we make it right
- 2-year warranty: free replacement if it ever stops working
- No restocking fee, no questions about why
- Keep the bonus workbook either way
- Real humans answer your email within 24 hours

**Closing:**
- We built this because we needed it ourselves.
- We stand behind it.

**Contact:**
- Questions? Email us anytime at shopslumbor@gmail.com

---

### Product Reviews (product-reviews.tsx + reviewsData)

**Heading (h2):**
- Customer Reviews

**Summary block (from `reviewDisplay`):**
- Average: `4.9`
- `2,347 reviews`
- Distribution bars (stars → count): 5 → 2,160 · 4 → 130 · 3 → 35 · 2 → 14 · 1 → 8

**Per-card badge:** Verified

**"Read more" button:** Read more reviews

**End-of-list line (when all shown):** Plus **{remaining}** more reviews from people who finally got some sleep. (remaining = 2,347 − even-capped visible count = 2,347 − 46 = 2,301)

**All reviews (name · rating · date · full text, verbatim, in source order):**

1. **Hannah W.** — ★★★★★ — May 24, 2026
   my old massager used to literally announce GOODBYE when it shut off and wake me right back up. this one just goes quiet. and it doesnt crush my eyes either, the pressure is soft. the two things i hated most about my last one are just gone

2. **Denise R.** — ★★★★★ — May 19, 2026
   I have fallen asleep several times while using it which is very unlike me because it usually takes me hours. I stare at a screen all day and by night my head is pounding and my brain wont shut up. This is the first thing that actually quiets it.

3. **Tiffany H.** — ★★★★★ — May 12, 2026
   listen. this thing will put you to sleep. i mean snoring sleep lol. i put it on, the warmth spreads out across my eyes, and thats the last thing i remember. my husband knows when i put it on to just leave me alone hahaha

4. **Marcus L.** — ★★★★★ — May 6, 2026
   by 4pm my eyes are burning and by 7 my head is in a vice from staring at a monitor all day. i was honestly skeptical but i was out before the timer even ended. didnt believe it til it happened to me

5. **Priyanka N.** — ★★★★★ — Apr 30, 2026
   If you get migraines you know how debilitating they are. I was desperate one night and put this on and it actually took the edge off before it got bad. Now I reach for it the second I feel the tension starting behind my eyes.

6. **Aaron T.** — ★★★★★ — Apr 23, 2026
   every time i laid down my chest would get tight and my brain would start dumping every worry from the day. id lie there an hour minimum. the slow pulse gives my mind something to follow and i just drift. didnt think anything could turn my brain off but here we are

7. **Gabriela S.** — ★★★★★ — Apr 17, 2026
   my family made fun of me when i unboxed it and slipped it on. joke is on them, three of them have ordered their own now. everyone who laughed wants one

8. **Sophie L.** — ★★★★★ — Apr 11, 2026
   i work from home and my eyes are fried by bedtime, dry and strained. ten minutes of the heat and its like a reset. i sleep so much deeper now and wake up without that heavy feeling behind my eyes

9. **Devon M.** — ★★★★ — Apr 4, 2026
   my old one had this loud voice that announced silent mode and woke me up every time, drove me insane. this one is dead silent, no beeps no nothing. only reason for 4 stars is i wish the strap was a touch longer. warm, quiet, and im gone

10. **Renee K.** — ★★★★★ — Mar 30, 2026
    melatonin, magnesium, tea, a meditation app, you name it i tried it. half of them left me groggy in the morning. this is the only thing that gets me down without the hangover. skeptical at first, obsessed now

11. **Carmen V.** — ★★★★★ — Mar 25, 2026
    twelve hour shifts, my eyes are destroyed by the time im home. this feels like a warm compress at a spa. i used to lie there wired from the shift, now im asleep before the auto shutoff

12. **Megan F.** — ★★★★★ — Mar 18, 2026
    i carry all my stress in my forehead and behind my eyes. the warmth plus the soft pulse loosens it in a way nothing else has. its become the one part of my night i actually look forward to

13. **Ian P.** — ★★★★★ — Mar 12, 2026
    first time in a long time i woke up without that tired heavy feeling in my eyes. i didnt even realize how much tension i was holding until it was gone

14. **Wade B.** — ★★★★★ — Mar 5, 2026
    i drive long haul and sleep in weird places at weird times. this is the only thing that gets me down fast in a loud truck stop. heat on, eyes covered, out cold

15. **Olivia D.** — ★★★★★ — Feb 27, 2026
    got it for my sister whos a new mom running on no sleep. she said the fifteen minutes before bed with this is the most relaxed shes felt in months. thanked me like five times

16. **Aisha P.** — ★★★★★ — Feb 20, 2026
    I've tried melatonin, chamomile tea, weighted blankets, and basic sleep masks. Nothing worked like this. The warmth and the slow pulse together are unlike anything else I've used and I actually wake up feeling rested now.

17. **Emily W.** — ★★★★★ — Feb 14, 2026
    I have the worst time winding down after work. My brain just wont shut off. This is now my nightly ritual. Put it on, turn on the wave mode, and I'm asleep before the auto shutoff even kicks in.

18. **Ryan P.** — ★★★★★ — Feb 8, 2026
    i work at a screen all day and my eyes are always strained and tired by bedtime. this with the heat on medium is the perfect way to decompress. sleeping like a baby now

19. **Rachel D.** — ★★★★★ — Feb 2, 2026
    the eye strain relief alone is worth it. i stare at screens 10+ hours a day and putting this on at night is like a spa treatment for my eyes. the warm compress feeling is incredible

20. **Marcus A.** — ★★★★★ — Jan 27, 2026
    this is way better than any sleep supplement ive tried. no groggy feeling in the morning, no dependency, just genuine relaxation that puts you to sleep naturally. the warmth is the real star here

21. **Alex R.** — ★★★★★ — Jan 21, 2026
    skeptical at first but this thing is legit. the warmth spreads across your eyes and you can literally feel your body relaxing. highly recommend to anyone who takes forever to fall asleep

22. **Samantha R.** — ★★★★★ — Jan 15, 2026
    Bought two, one for me and one for my mom. She's obsessed. The different pulse modes are perfect and the heat is genuinely soothing. Great quality for the price.

23. **James C.** — ★★★★★ — Jan 9, 2026
    got this because my sleep was terrible from anxiety and my roommate immediately ordered one too after trying mine. we both use them nightly now. best purchase of the year easily

24. **Sophie C.** — ★★★★★ — Jan 3, 2026
    Bought it for my insomnia and it completely changes how I feel by morning. I put it on with the wave mode while lying in bed and it just melts the tension away. Absolutely love it.

25. **Megan T.** — ★★★★★ — Dec 29, 2025
    I carry all my stress in my eyes and forehead and this has genuinely changed my bedtime. the pulse mode is so nice for releasing tension. best purchase I've made this year honestly

26. **Jordan B.** — ★★★★ — Dec 22, 2025
    great device for the price. the heat and pulse combo is really effective for falling asleep faster. only giving 4 stars because shipping took a bit longer than i expected but the product itself is 5/5

27. **Danielle S.** — ★★★★★ — Dec 16, 2025
    perfect for my nighttime wind-down. i put it on in bed, heat on level 3, wave mode, and im out within 10 minutes. the auto shutoff means i never have to worry about it. absolute essential now

28. **Tom H.** — ★★★★★ — Dec 10, 2025
    replaced my old sleep mask with this and the difference is night and day. so much more than just blocking light. the heat and pulse actually help you fall asleep instead of lying there. 10/10

29. **Lisa N.** — ★★★★★ — Dec 4, 2025
    My daughter has been struggling with sleep from studying late and staring at screens all day. Got her this and she literally thanked me which never happens lol. She falls asleep so much faster now.

30. **Nina G.** — ★★★★★ — Nov 28, 2025
    My husband and I both use one now. He was the skeptic but after trying mine he ordered his own within a week. We both sleep so much better and wake up clearer.

31. **Carlos V.** — ★★★★★ — Nov 21, 2025
    this thing is way better than expected. i was worried it would be some cheap gimmick but its actually really well built. the heat feels like a warm compress at a spa. genuinely helps me sleep

32. **Priya S.** — ★★★★★ — Nov 15, 2025
    Perfect gift for my sister who's a new mom and hasn't slept properly in months. She says the 15 minutes she gets with this before bed is the most relaxed she feels all day.

33. **Brandon W.** — ★★★★ — Nov 9, 2025
    solid product. really helps me unwind before bed. my only minor complaint is the strap could be slightly more adjustable for larger heads but it still fits me fine. heat and pulse are excellent

34. **Natalie L.** — ★★★★★ — Nov 3, 2025
    so comfortable. it fits perfectly and doesnt put any pressure on my eyes. i was worried it would feel heavy but it barely weighs anything. sleep quality has genuinely improved

35. **Danielle O.** — ★★★★★ — Oct 28, 2025
    second one i bought. first was for me and this one is for my best friend for her birthday. she has terrible insomnia and is going to love this. quality is consistent between both units

36. **Mike T.** — ★★★★★ — Oct 22, 2025
    my wife and i both use this every night now, we each have our own. its become part of our routine. 15 minutes before bed and we both sleep so much deeper. cant recommend enough

37. **Rachel T.** — ★★★★★ — Oct 16, 2025
    the 15 minute auto shutoff is a lifesaver. i always fall asleep before it even turns off which tells you how well it works. no more lying in bed scrolling my phone for hours

38. **Zara L.** — ★★★★★ — Oct 10, 2025
    I'm an optometrist and I recommend warm compresses to my patients regularly. Having an affordable heated mask with a gentle pulse like this is excellent. The quality is genuinely impressive for the price.

39. **Ethan G.** — ★★★★★ — Oct 4, 2025
    i travel a lot for work and this is essential in my carry-on now. hotel sleep used to be awful but now i put this on and im out cold. the travel pouch is a nice touch

40. **Isabel R.** — ★★★★★ — Sep 28, 2025
    My doctor suggested heat therapy for my eye strain and tension headaches. This has been perfect. The soothing warmth with the gentle pulse is so effective. Best money I've spent on my health this year.

41. **Kayla D.** — ★★★★ — Sep 21, 2025
    really effective. the heat levels are all genuinely different temps which is nice. only reason for 4 stars is i wish there was an app but the buttons work fine and honestly its easier without a phone

42. **Noah F.** — ★★★★★ — Sep 15, 2025
    ive shown this to literally everyone i know and they all want one. just ordered two more as gifts for my parents who both have trouble sleeping. the quality is genuinely impressive

43. **Chloe W.** — ★★★★★ — Sep 9, 2025
    just wow. i didnt expect much for $70 but this exceeded all my expectations. the warmth is perfectly gentle and the pulse is so relaxing. my whole family fights over it now lol

---

### Purchase Notification (purchase-notification.tsx)

**Template:**
- **{name}** from {city} just purchased **SleepWave Pro**
- Timestamp line (e.g.): 2 minutes ago
- Dismiss button (aria-label): Dismiss

**Names + cities (rotating):**
Sarah — Plano, TX · Marcus — Littleton, CO · Jessica — Hoboken, NJ · David — Bend, OR · Emily — Naperville, IL · Ryan — Carlsbad, CA · Amanda — Franklin, TN · Tyler — Redmond, WA · Lauren — Coral Springs, FL · Chris — Gilbert, AZ · Megan — Cary, NC · Jordan — Beaverton, OR · Priya — Alpharetta, GA · Derek — Overland Park, KS · Olivia — Folsom, CA · Hassan — Eagan, MN · Sophie — Leesburg, VA · Alex — Broken Arrow, OK · Tanya — Roswell, GA · Brandon — Huntersville, NC · Lisa — Westfield, IN · Kevin — Cedar Park, TX · Nina — Murfreesboro, TN · Liam — Bothell, WA · Jade — Cheshire, CT · Carlos — Katy, TX · Anna — Gig Harbor, WA · Mike — Papillion, NE · Zara — Chandler, AZ · Tom — Flower Mound, TX

**"time ago" pool:**
2 minutes ago · 5 minutes ago · 8 minutes ago · 12 minutes ago · 3 minutes ago · 6 minutes ago · 1 minute ago · 9 minutes ago · 4 minutes ago · 7 minutes ago

---

### Offer / Pricing constants (src/lib/data.ts — `offer` object)

- price: 69.99
- compareAtPrice: 139.99
- guaranteeDays: 180
- outcomeDays: 14
- warrantyYears: 2
- bonusName: The 14-Night Sleep Reset Workbook
- bonusBlurb: a night-by-night plan that gets you sleeping better inside your guarantee
- bonusValue: 29
- shipping: Free US shipping


---

## 6b. Copy Appendix — Home, Legal & Chrome

All strings below are reproduced verbatim from the source. Static UI/interpolated values are noted where they are dynamic.

---

### Chrome (global, on every page)

#### Announcement Bar — `src/components/layout/announcement-bar.tsx`
- `Free US shipping on every order.`
- `180-day full refund.`

#### Header — `src/components/layout/header.tsx`
- Logo wordmark: `SLUMBOR` (via `<BrandName />`)
- Nav labels (desktop + mobile):
  - `Home` → `/home/`
  - `About` → `/about/`
  - `FAQ` → `/faq/`
  - `Contact` → `/contact/`
- Add-to-cart button label (toggles): `Add to Cart` / `Added!`
- Accessibility labels: `Open cart`, `Toggle menu`, `Close menu`

#### Footer — `src/components/layout/footer.tsx`
- Wordmark: `SLUMBOR` (via `<BrandName />`)
- Tagline: `Fall asleep faster. Wake up rested.`
- Column heading: `Shop`
  - `SleepWave Pro` → `/products/sleepwave-pro/`
  - `Cart` → `/cart/`
- Column heading: `Support`
  - `Contact Us` → `/contact/`
  - `FAQ` → `/faq/`
  - `Shipping Info` → `/shipping/`
  - `Track Order` → `/track-order/`
- Column heading: `Legal`
  - `Privacy Policy` → `/privacy-policy/`
  - `Terms of Service` → `/terms-of-service/`
  - `Refund Policy` → `/refund-policy/`
- Copyright line: `© {current year} SLUMBOR. All rights reserved.` (year is `new Date().getFullYear()`, `SLUMBOR` via `<BrandName />`)
- Payment badges: `Visa`  `Mastercard`  `Amex`  `PayPal`  `Apple Pay`

#### Cart Drawer — `src/components/layout/cart-drawer.tsx`
- Heading: `Your Cart`
- Accessibility label: `Close cart`
- Empty state: `Your cart is empty`
- Empty-state button: `Continue Shopping` (→ `/shop/`)
- Line-item price: `${unitPrice}` (dynamic); crossed-out `${item.price}` (dynamic); badge `{lineDiscount}% OFF` (dynamic)
- Qty controls: `-` / `+` / `Remove`
- Protection plan label: `3-Year Protection Plan` (from `PROTECTION_PLAN.title`)
- Protection plan price: `+$2.99` (from `PROTECTION_PLAN.price`)
- Protection plan blurb: `Covers accidental damage for 3 years. One free replacement, no questions.`
- `Subtotal` — value `${total}` (dynamic)
- Checkout button: `Checkout`
- `Shipping calculated at checkout`

---

### Home page (`/home/`) — `src/app/home/page.tsx`
Renders, in order: HeroSection, WhySlumbor, ProductShowcase, Testimonials, BrandStory (interleaved with decorative `SectionDivider`s).

#### Hero — `src/components/sections/hero-section.tsx`
- Eyebrow: `The Wind-Down Mask`
- Headline: `Let the day finally leave your body.` (word `finally` is italic gold)
- Subhead: `The kind of warm pressure that pulls your shoulders down from your ears. The kind of quiet that makes your brain stop rehearsing tomorrow.`
- Primary button: `Shop the SleepWave Pro` (→ `/products/sleepwave-pro/`)
- Secondary button: `Learn more` (→ `/shop/`)
- Star row: `★★★★★`
- Social proof: `Loved by thousands of tired humans`
- (Hidden decorative image alt, only rendered if `HERO_IMAGE` set — currently `""`: `The SleepWave Pro resting in warm light`)

#### Why Slumbor — `src/components/sections/why-luxen.tsx` (component exported as `WhySlumbor`)
- Eyebrow: `Why SLUMBOR` (`SLUMBOR` via `<BrandName />`)
- Headline: `Built for the version of you at 11pm.` (`11pm` in gold gradient)
- Subhead: `You've tried melatonin, white noise, and sleep apps. Here's what your nervous system actually responds to.`
- Cards (4):
  1. `The warmth that signals safety` — `Gentle heat around the eyes tells your nervous system the day is over and it's safe to wind down. The tension behind your eyes starts to let go.`
  2. `A pulse your body recognizes` — `A slow, rhythmic pressure that mimics the pace of a human touch. Your body reads it as a calming signal, the way a swaddled baby settles.`
  3. `Silence that lets you drift` — `It stays quiet the whole way through, from the moment you put it on until you are already asleep. That quiet is a big part of why it works so well.`
  4. `The ritual, not the gadget` — `Something you reach for every night, not another device you forget in a drawer. The one part of the day that's just for letting go.`

#### Product Showcase — `src/components/sections/product-showcase.tsx` (data from `heroProduct`)
- Eyebrow: `Featured Product`
- Headline: `Meet the SleepWave Pro` (`SleepWave Pro` = `heroProduct.title`, in gold gradient)
- Description (`heroProduct.description`): `By the end of the day your eyes are fried from screens and your head will not switch off. The SleepWave Pro wraps your eyes in gentle warmth and a slow pulse, two signals that tell your nervous system the day is over and it is safe to let go. The tension behind your eyes eases, your mind goes quiet, and you finally drift off into the kind of rest your body has been waiting for.`
- First 3 features (from `heroProduct.features`):
  1. `The warmth lasts` — `Gentle, even heat around your eyes and temples for the full session. The kind that pulls the tension out from behind your eyes instead of just sitting on top of it.`
  2. `The pulse is soft` — `A slow rhythm that wraps your sinuses and temples the way a hand would. Designed to never press your eyes back into your head.`
  3. `It stays silent` — `No music, no beeps, no cheerful voice announcing it's done. It powers down quietly after 15 minutes, the way sleep actually starts.`
- Price: `$69.99`; compare-at (struck): `$139.99`; badge `SAVE 50%` (computed: round((139.99−69.99)/139.99×100) = 50)
- Button: `Get Yours Now` (→ `/products/sleepwave-pro/`)

#### Testimonials — `src/components/sections/testimonials.tsx`
- Eyebrow: `Real Results`
- Headline: `What our customers are saying` (`customers` in gold gradient)
- Subhead: `Don't just take our word for it. Here's what real people experience with the SleepWave Pro.`
- Each card shows `★` × rating (all rating 5), quote wrapped in `“ ”`, then name + role:
  1. **Marcus T.** — *Software Developer* — `My mind was constantly racing from staring at screens all day. The first few sessions felt different, but now I can't imagine not having it. The tension just melts away and I drift off effortlessly.`
  2. **Sarah K.** — *Office Manager* — `After three weeks of using this nightly, my sleep quality is about 70% better. I fall asleep faster and wake up actually feeling rested. This thing actually works.`
  3. **Brandon C.** — *Freelance Designer* — `I've spent hundreds on sleep supplements and gadgets. This device gives me more nightly relief than anything else I've tried. It's now the cornerstone of my bedtime routine.`
  4. **Lisa T.** — *Registered Nurse* — `I work long shifts and the stress builds up, making it impossible to wind down. This has been an absolute godsend. The relaxation is immediate.`
  5. **James R.** — *Construction Worker* — `The warmth and vibration around my eyes just dissolves the tension. Nothing else has worked like this for me. Even on the lowest setting it's deeply relaxing.`
  6. **Amanda G.** — *Wellness Coach* — `I recommend relaxation tools to my clients regularly. Having a portable, affordable option like this is excellent. The multiple modes give real versatility for different relaxation needs.`

#### Brand Story — `src/components/sections/brand-story.tsx`
- Eyebrow: `Our Story`
- Headline: `Built for people who are tired of restless nights` (`tired of restless nights` in gold gradient)
- Para 1: `We started SLUMBOR because we were honestly fed up. We were tired of nights that dragged on with no real sleep at the end of them, and tired of spending money on remedies that cost a fortune and wore off in a week. The gadgets that promised the world and did nothing were the last straw.` (`SLUMBOR` via `<BrandName />`)
- Para 2: `Heat and gentle pulse therapy like this has been used in wellness clinics and sleep centers for years, but it was always expensive and hard to get your hands on. We wanted to bring that same feeling home to everyone, at a price that actually makes sense.`
- Button: `Read Our Full Story` (→ `/about/`)
- Stats cards (right column):
  - `10000+` (animated counter) — `Happy sleepers`
  - `4.9/5` (with star icon) — `Average rating`
  - `180-Night` (animated counter) — `Money-back guarantee`

---

### Shop page (`/shop/`) — `src/app/shop/page.tsx`
- Eyebrow: `Shop`
- Headline: `Our Collection` (`Collection` in gold gradient)
- Subhead: `Premium heated vibrating eye mask technology designed for deeper, better sleep.`
- Grid renders `<ProductCard>` for each product (only SleepWave Pro; card copy lives in product-card.tsx).

---

### Cart page (`/cart/`) — `src/app/cart/page.tsx`
- Heading: `Your Cart`
- Empty state: `Your cart is empty` + button `Continue Shopping` (→ `/shop/`)
- Line item: product title (link), price `${unitPrice}` (dynamic), struck `${item.price}`, badge `{lineDiscount}% OFF`
- Qty controls: `-` / `+` / `Remove`
- Protection plan label: `3-Year Protection Plan` (from `PROTECTION_PLAN.title`), price `+$2.99`
- Protection plan blurb: `Covers accidental damage for 3 years. One free replacement, no questions.`
- `Subtotal` — `${total}` (dynamic)
- `Shipping calculated at checkout`
- Button: `Proceed to Checkout`

---

### Track Order page (`/track-order/`) — `src/app/track-order/page.tsx`
- Eyebrow: `Track Order`
- Headline: `Track your order` (`order` in gold gradient)
- Subhead: `Enter your order details below to check the status of your shipment.`
- Form label: `Order Number` — placeholder `#1234`
- Form label: `Email Address` — placeholder `your@email.com`
- Submit button: `Track Order`
- Helper: `You can also track your order using the link in your shipping confirmation email.`
- Section heading: `Recommended for you` (renders ProductCard grid)

---

### 404 page — `src/app/not-found.tsx`
- Large watermark: `404`
- Heading: `Page not found`
- Body: `Looks like this page doesn't exist. Let's get you back on track.`
- Button: `Back to Home` (→ `/`)

---

### About page (`/about/`) — `src/app/about/page.tsx`
- Eyebrow: `Our Story`
- Headline: `We bring real rest to your everyday life` (`real rest` in gold gradient)
- Image: `<Image src="" alt="Slumbor" .../>` — **empty/broken src** (see §7)
- Section heading: `Born from restless nights`
- Para 1: `We started SLUMBOR because we were tired of the cycle. Toss and turn all night, drag through the day, try melatonin, scroll your phone, repeat. Sound familiar?` (`SLUMBOR` via `<BrandName />`)
- Para 2: `Heated eye therapy and gentle vibration have been used in sleep clinics for years, but the technology was always expensive and inaccessible. We wondered: why can't everyone have access to this?`
- Para 3: `So we built the SleepWave Pro. A luxurious, weighted, heated vibrating eye mask that lulls you into deep sleep naturally. No pills. No side effects. Just real rest, on your terms.`
- Section heading: `What we stand for`
- Value cards (3):
  1. `Premium Quality` — `We use advanced heated vibration technology that meets the same standards as professional sleep therapy devices. No cheap knockoffs.`
  2. `Designed with Purpose` — `Every feature exists for a reason. Gentle heat, soothing vibrations, total blackout design. All crafted around how people actually struggle with sleep.`
  3. `Customer First` — `180-night money-back guarantee, free US shipping, and a support team that actually responds. We built the experience we wanted as customers.`

---

### Contact page (`/contact/`) — `src/app/contact/page.tsx`
- Eyebrow: `Contact`
- Headline: `Get in touch` (`touch` in gold gradient)
- Subhead: `Have a question about your order or our products? We're here to help.`
- Info cards (3):
  - `✉` `Email` — `shopslumbor@gmail.com`
  - `🕐` `Hours` — `Mon-Fri 9am-5pm EST`
  - `⚡` `Response Time` — `Within 24 hours`
- Form heading: `Send us a message`
- Label `Name` — placeholder `Your name`
- Label `Email` — placeholder `your@email.com`
- Label `Message` — placeholder `How can we help?`
- Submit button: `Send Message`

---

### FAQ page (`/faq/`) — `src/app/faq/page.tsx` (data from `faqData`, 13 items)
- Eyebrow: `Help Center`
- Headline: `Frequently Asked Questions` (`Questions` in gold gradient)
- Subhead: `Can't find what you're looking for? Email us at shopslumbor@gmail.com` (email is a mailto link)
- Q&A list (all 13 `faqData` items):
  1. **How do I contact Slumbor support?** — `You can reach us anytime at shopslumbor@gmail.com. Real humans, usually back to you within 24 hours.`
  2. **Will the shutdown noise wake me back up?** — `No. This was the number one complaint people had about other masks, the cheerful voice announcing 'goodbye' right as you drift off. The SleepWave Pro just goes quiet. It powers down silently after 15 minutes.`
  3. **Is the pressure going to hurt my eyes?** — `No. The pulse is designed to wrap your sinuses and temples, not press your eyeballs back into your head. It's soft on purpose. Most people describe it as a hand resting over their eyes.`
  4. **Does it actually help with headaches, or just sleep?** — `Both. The warmth and slow pulse loosen the tension that stacks up behind your eyes and temples after a long day at screens. A lot of people reach for it the moment they feel a tension headache starting, not just at bedtime.`
  5. **Is it safe to fall asleep wearing it?** — `Absolutely. It powers down on its own after 15 minutes, the materials are breathable and hypoallergenic, and the heat stays in a safe, comfortable range the whole time.`
  6. **Does it play music or make any sound?** — `No, and that's on purpose. There's no music, no Bluetooth, no beeps. Just warmth and a soft pulse, and a room that stays quiet enough to actually fall asleep in. The silence is the point.`
  7. **How long does the battery last?** — `A full charge gives you up to 4 sessions. It charges in about 1.5 hours over USB-C, so it's always ready on your nightstand.`
  8. **What if it doesn't work for me?** — `You have 180 nights. Sleep better within 14 of them or email us at shopslumbor@gmail.com for a full refund. Keep the bonus workbook either way. No restocking fee, no questions about why.`
  9. **What if it breaks?** — `It's covered by a 2-year warranty. If it ever stops working, email us at shopslumbor@gmail.com and we'll send a free replacement.`
  10. **How does the shipping work?** — `Free shipping on every US order. Orders are processed within 1-3 business days and every order ships with tracking.`
  11. **Can I change or cancel my order?** — `Email us within 12 hours of ordering at shopslumbor@gmail.com and we'll sort it out. After that it may have already entered processing.`
  12. **What payment methods do you accept?** — `All major cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay through secure Shopify checkout.`
  13. **What if my item arrives damaged?** — `Email shopslumbor@gmail.com with a photo and we'll send a replacement at no cost or refund you in full. Whichever you'd rather.`

---

### Privacy Policy (`/privacy-policy/`) — `src/app/privacy-policy/page.tsx`
**Heading:** `Privacy Policy`

`At Slumbor, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.`

**Information We Collect**
`We collect information you provide directly, including your name, email address, shipping address, and payment information when you make a purchase. We also automatically collect certain information about your device, including your IP address, browser type, and browsing behavior through cookies and similar technologies.`

**How We Use Your Information**
`We use your information to process and fulfill orders, communicate with you about your purchases, improve our website and products, and send marketing communications (with your consent). We may also use your information for fraud prevention and to comply with legal obligations.`

**Data Security**
`We implement appropriate technical and organizational security measures to protect your personal information. All payment transactions are processed through Shopify's secure checkout, which is PCI-DSS compliant.`

**Cookies**
`We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.`

**Third-Party Services**
`We use third-party services including Shopify (e-commerce), Meta (advertising), and analytics providers. These services may collect information about your interactions with our website in accordance with their own privacy policies.`

**Contact Us**
`If you have any questions about this Privacy Policy, please contact us at shopslumbor@gmail.com.` (email is a mailto link)

`Last updated: March 2026`

---

### Refund Policy (`/refund-policy/`) — `src/app/refund-policy/page.tsx`
**Heading:** `Refund Policy`

`We want you to sleep better, not feel stuck with a purchase. If the SleepWave Pro isn't working for you, we offer a 180-night money-back guarantee.`

**180-Night Money-Back Guarantee**
`You have 180 days from the date of delivery to request a return and full refund. Sleep better within 14 nights or we make it right, and you keep the bonus workbook either way. The SleepWave Pro is also covered by a 2-year warranty, so if it ever stops working we replace it free.`

**How to Request a Refund**
`Email us at shopslumbor@gmail.com with your order number and reason for the return. Our team will provide you with return instructions within 24 hours.` (email is a mailto link)

**Conditions**
- `Item must be returned within 180 days of delivery`
- `No restocking fee, and no questions about why`
- `Keep the bonus 14-Night Sleep Reset Workbook either way`
- `Damaged or defective items qualify for free return shipping`

**Refund Processing**
`Once we receive and inspect your return, we will process your refund within 5-7 business days. The refund will be issued to your original payment method. Please allow an additional 3-5 business days for the refund to appear on your statement, depending on your bank.`

**Damaged or Defective Items**
`If your item arrives damaged or defective, contact us immediately with photos. We will send a free replacement or issue a full refund at no cost to you.`

`Last updated: March 2026`

---

### Shipping (`/shipping/`) — `src/app/shipping/page.tsx`
- Eyebrow: `Shipping`
- Headline: `Shipping Information` (`Information` in gold gradient)
- Subhead: `Free US shipping with full tracking on every order.`
- Cards (4):
  1. `📦` `Processing Time` — `All orders are processed within 1-3 business days after payment confirmation.`
  2. `🚚` `Delivery Time` — `Most US orders arrive within 3-7 business days. You'll get a tracking number by email the moment it ships.`
  3. `✨` `Free US Shipping` — `Every US order ships free with tracking. No minimum, no surprise add-ons or shipping protection at checkout.`
  4. `🛡` `If Something Goes Wrong` — `If your package is lost or badly delayed, email us and we'll send a replacement or refund you in full.`
- Footer line: `Questions about shipping? Email us at shopslumbor@gmail.com` (email is a mailto link)

---

### Terms of Service (`/terms-of-service/`) — `src/app/terms-of-service/page.tsx`
**Heading:** `Terms of Service`

`By accessing and using the Slumbor website, you agree to be bound by these Terms of Service. Please read them carefully before making a purchase.`

**Products & Pricing**
`All prices are listed in USD unless otherwise indicated. We reserve the right to modify prices at any time without prior notice. Product descriptions and images are as accurate as possible, but we do not guarantee that all details are entirely error-free.`

**Orders & Payment**
`By placing an order, you represent that you are of legal age in your jurisdiction and that the payment information you provide is accurate. We reserve the right to refuse or cancel any order for any reason, including suspected fraud.`

**Shipping & Delivery**
`Estimated delivery times are provided for reference and are not guaranteed. We are not responsible for delays caused by customs, weather, or carrier issues. Risk of loss transfers to you upon our delivery to the carrier.`

**Limitation of Liability**
`To the maximum extent permitted by law, Slumbor shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or website. Our total liability shall not exceed the amount you paid for your order.`

**Contact**
`For questions about these terms, email us at shopslumbor@gmail.com.` (email is a mailto link)

`Last updated: March 2026`

---

# 7. ANYTHING ELSE (Quirks, Tracking, SEO, Gotchas)

### SEO / metadata — `src/app/layout.tsx`
- `<title>`: `Slumbor | Fall Asleep Faster. Wake Up Rested.`
- Meta description (verbatim): `The SleepWave Pro combines gentle heat therapy and micro-vibration massage to help you fall asleep in minutes, reduce puffiness, and wake up feeling truly rested.`
- Viewport (`export const viewport`): `width: "device-width"`, `initialScale: 1`, `maximumScale: 1`, `themeColor: "#0E1626"`
- Favicon (icons.icon): `https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrGCzKJv2wQbFMujXdcqsWtxAaEginK1m8SPLG` (an uploadthing `ufs.sh` URL; the host `5jmyzbx4u2.ufs.sh` is also whitelisted in `next.config.ts` `images.remotePatterns`)
- `<html lang="en">`; fonts: Fraunces (`--font-heading`, normal+italic, axes SOFT/opsz) and Inter (`--font-body`) via `next/font/google`.

### Meta Pixel (Dataset ID `2807075906310846`)
- **Base snippet** injected in `<head>` (layout.tsx) via `dangerouslySetInnerHTML`, standard `!function(f,b,e,v,n,t,s){...}` loader pointing at `https://connect.facebook.net/en_US/fbevents.js`, then:
  - `fbq('init', '2807075906310846');`
  - `fbq('track', 'PageView');`  ← initial PageView fires here
- **`<noscript>` fallback** (layout.tsx): `<img height="1" width="1" src="https://www.facebook.com/tr?id=2807075906310846&ev=PageView&noscript=1" .../>`
- **PageView on client-side navigations** — `src/app/client-layout.tsx`, `MetaPixelPageView` component: uses `usePathname()`; a `firstRun` ref skips the very first render (already covered by the head snippet) and fires `window.fbq("track", "PageView")` on every subsequent route change.
- **ViewContent** — `src/app/products/[handle]/product-page-client.tsx` (lines ~44–54), fires on product page mount:
  ```
  window.fbq("track", "ViewContent", {
    content_name: product.title,
    content_ids: [product.id],
    content_type: "product",
    value: product.price,
    currency: "USD",
  });
  ```
- **AddToCart** — `src/contexts/cart-context.tsx`, inside `addItem` (lines ~90–98):
  ```
  window.fbq("track", "AddToCart", {
    content_name: item.title,
    content_ids: ["sleepwave-pro"],   // hardcoded
    content_type: "product",
    value: item.price,
    currency: "USD",
  });
  ```
  Note: `content_ids` is hardcoded to `["sleepwave-pro"]` regardless of the item. Per MEMORY, the Shopify channel also double-fires AddToCart (dashboard-side dedupe concern).

### Microsoft Clarity (Project ID `xa22ol5ny9`)
Injected in `<head>` (layout.tsx) via `dangerouslySetInnerHTML`, standard Clarity loader:
```
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xa22ol5ny9");
```
(Session recording + heatmaps.)

### Routing quirks
- **Root `/` redirects to the product page**, not the homepage — `src/app/page.tsx` is just `redirect("/products/sleepwave-pro/")`. The actual homepage lives only at `/home/` (`src/app/home/page.tsx`). The 404 "Back to Home" button and layout link to `/` therefore bounce the user to the product page.
- `trailingSlash: true` — all internal hrefs use trailing slashes (e.g. `/home/`, `/about/`, `/products/sleepwave-pro/`).

### Static export
`next.config.ts`:
- `output: "export"` (fully static/SSG; no server runtime — form submissions on Contact/Track-Order are non-functional stubs with no handlers)
- `trailingSlash: true`
- `images.unoptimized: true` (Next Image optimizer disabled)
- `images.remotePatterns`: allows `https://5jmyzbx4u2.ufs.sh`

### Hardcoded commerce values — `src/lib/shopify.ts` & `src/contexts/cart-context.tsx`
- Shopify domain: `slumbor.myshopify.com`
- Variant IDs: `sleepwave-pro` → `58281487565181`; protection plan → `58281499689341` (`PROTECTION_PLAN_VARIANT`)
- Checkout is a Shopify cart permalink: `https://slumbor.myshopify.com/cart/<variant>:<qty>,...?discount=<code>`. Protection plan line is pushed first so the product shows first at checkout.
- Discount codes (must be created manually in Shopify Discounts; invalid codes silently ignored): `SAVE10` (mask qty ≥ 2 → 10% off), `SAVE20` (mask qty ≥ 3 → 20% off). Bundle discount logic mirrored in `bundleDiscount()` in `lib/data.ts`.
- Protection plan (`PROTECTION_PLAN` in cart-context): `3-Year Protection Plan`, `$2.99`, auto-selected (default `protectionPlan = true`), persisted to `localStorage` key `slumbor-protection-plan` (`"0"`/`"1"`). Cart items persisted to `localStorage` key `slumbor-cart`.

### Image cache-bust filenames (superseded originals kept)
Several product images use `-v2` suffixes to bust CDN/browser cache after replacement:
- `/products/p4-v2.webp` (4th gallery image in `heroProduct.images`)
- `/products/what-you-get-left-v2.webp` and `/products/what-you-get-right-v2.webp` (in `special-offer.tsx`, the "Everything you need to finally sleep" section — matches recent commits replacing those images)

### Components / naming gotchas
- **`BrandName` trademark component** — `src/components/ui/brand-name.tsx`: renders `SLUMBOR` (uppercase, letter-spaced, Fraunces heading font). Accepts `tm` prop; when `tm={true}` it appends a superscript `™`. Currently every usage (header, footer, about, brand-story, why-slumbor) calls `<BrandName />` **without** `tm`, so the ™ never renders anywhere on the site.
- **`LoadingScreen` is a null stub** — `src/components/layout/loading-screen.tsx` returns `null` with comment "Loading screen removed. Unnecessary friction for e-commerce. Keeping file to avoid import errors." Still imported and rendered in `client-layout.tsx` but does nothing.
- **File/name mismatch** — `src/components/sections/why-luxen.tsx` (legacy "Luxen" filename) exports a component named `WhySlumbor`. The home page imports it as `WhySlumbor` from `@/components/sections/why-luxen`. The `why-luxen.tsx` filename is a leftover from a previous brand name.
- **About page broken image** — `src/app/about/page.tsx` line 48 has `<Image src="" alt="Slumbor" width={200} height={200} .../>` with an **empty `src`** — renders nothing / broken image inside the gradient placeholder box.

### Components present but UNUSED on the product page
`src/app/products/[handle]/product-page-client.tsx` imports and renders many product sections, but the following components **exist in `src/components/product/` yet are never imported/rendered** on the product page (confirmed: no import or JSX reference in product-page-client.tsx):
- `before-after.tsx` (BeforeAfter)
- `who-its-for.tsx` (WhoItsFor)
- `slowwave-diagram.tsx` (SlowWaveDiagram)
- `currency-converter.tsx` (CurrencyConverter)

### Other data quirks
- `faqData` is a **13-item** array in `src/lib/data.ts` (FAQ page renders all 13; the product page uses its own separate `ProductFAQ` component).
- Review social proof mismatch: `reviewsData` contains ~44 hand-written review cards, but `reviewStats` (derived from them) is **not** what's shown — the page uses `reviewDisplay` with hardcoded totals `count: 2347`, `avg: 4.9`, and a fabricated star distribution (2160/130/35/14/8). BrandStory separately displays `10000+ Happy sleepers` and `4.9/5`.

