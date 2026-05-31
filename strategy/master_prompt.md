# SLUMBOR WEBSITE BUILD — MASTER PROMPT FOR CLAUDE CODE

> Saved verbatim from the user's build brief. This is the single source of truth for
> tone, voice, structure, palette, copy rules, and offer architecture. Reference it on
> every change. Companion doc: [`target_market.md`](./target_market.md).

## HOW TO READ THIS DOCUMENT

This is the complete build instruction set for the Slumbor ecommerce site. Read it in full before writing any code. Every section is load-bearing because every decision here was earned through hours of competitor analysis, customer research, and strategic positioning work.

Two companion docs live in this folder:
1. `target_market.md` — verbatim customer language library, locked strategic findings, awareness/sophistication analysis, competitor TPA notes.
2. `master_prompt.md` (this file) — tone, voice, marketing frameworks, copy rules.

When writing copy for any section, pull from the verbatim language library in the TM doc rather than inventing language. Real customer sentences convert. Invented marketing copy does not.

---

## PART ONE: PROJECT CONTEXT AND ARCHITECTURE

### What we're building
Slumbor is a single-product ecommerce store selling the SleepWave Pro, a heated eye massager with vibration and bluetooth music. Priced at $69.99. The site exists to convert paid Meta ad traffic to a single product purchase.

This is the second attempt at ecom for this client. The first store (Recova, neck pain product) failed because the ad creative was outsourced to a low-quality service and the project math was not verified before launch. The site itself was structurally strong. We are reusing that structural intelligence here while flipping the entire emotional tone to fit a sleep brand instead of a pain brand.

### Tech stack
Match the Recova architecture exactly. Next.js 15+ with React Server Components, Tailwind CSS, custom theme. Hosted on Cloudflare. Cart and checkout handled through the Shopify Storefront API.

- Next.js 15 app router
- Tailwind CSS for styling
- Shopify Storefront API for product data, cart, and checkout
- Cloudflare Pages or equivalent for hosting
- Meta Pixel and Conversions API integrated
- Microsoft Clarity for session recording and heatmaps
- Klaviyo or Shopify Email for post-purchase flows (integration only, no flows in scope)

### Repository structure
```
/app                    Next.js app router pages
  /(marketing)          Homepage and content pages
  /products             Product pages
  /cart                 Cart page (uses Shopify Storefront API)
  /api                  Server routes
/components             Reusable React components
/lib                    Shopify client, utilities
/strategy               Saved strategy docs (TM research, master prompt)
/public                 Static assets
  /images               Brand images and product photos
/styles                 Global styles and Tailwind config
```

### Do FIRST before writing any page code
1. Save TM research as `/strategy/target_market.md`
2. Save master prompt as `/strategy/master_prompt.md`
3. Set up Tailwind theme config with exact palette + typography below
4. Install deps (Next.js, Tailwind, Shopify Storefront API client, framer-motion)
5. Set up Shopify Storefront API client with env vars for the storefront access token
6. Read both strategy docs in full before writing a single component

---

## PART TWO: LOCKED STRATEGIC DECISIONS

These are decisions, not suggestions.

- **Awareness level:** Level 2 — Problem aware, solution unaware, product unaware. She knows she has end-of-day tension, screen-fried eyes, racing thoughts, trouble sleeping. She does not know SleepWave Pro exists. Agitate the problem, reveal the mechanism, introduce the product, stack proof until she buys.
- **Sophistication stage:** Stage 3. Buyers are tired of feature lists. Lead with experience and feeling, reveal the mechanism in the middle as credibility, bury features near the bottom as fine print.
- **Entry door (wedge):** Tension. Screen fatigue. End-of-day headaches. NOT sleep-first. Sleep is the destination, not the entry. Every above-the-fold message frames the pain as tension first, then resolves through sleep as the payoff.

### Differentiation wedges (vs Sakerplus and Renpho)
1. No screaming voice prompts (Renpho's biggest 1-star complaint).
2. Gentle pressure that doesn't crush the eyeballs (Renpho 1-star complaint).
3. Real-feeling creative and site copy (Sakerplus uses obvious AI imagery).
4. Cleaner offer architecture (Sakerplus charges $5.99 shipping + $1.99 protection; we bundle shipping in).

### Competitor offer benchmark (Sakerplus)
- Effective price most pay: ~$55 (the $49.99 upgrade bundle)
- Plus $5.99 shipping + $1.99 protection = ~$63 AOV
- Anchored against $109 with 50% off framing
- 90-day money-back guarantee
- No real bonus, upsell, or genuine scarcity

### Our offer architecture (displayed across the site)
- List price anchor: $139.99 (crossed out)
- Sale price: $69.99
- Free US shipping (no shipping protection upsell)
- 180-day money-back guarantee with specific outcome: "Sleep better in 14 days or full refund"
- Free bonus: "The 7-Minute Wind-Down" downloadable audio-guided breathwork session. $29 value.
- No countdown timers. No fake scarcity. No urgency banners. Trust over pressure.

### Buy More Save More bundle
- 1x SleepWave Pro: $69.99 each
- 2x SleepWave Pro: $62.99 each (10% off, "Save $14")
- 3x SleepWave Pro: $55.99 each (20% off, "Save $42")

Bundle selector: vertical stack of three radio-button cards, middle option subtly emphasized.

---

## PART THREE: BRAND IDENTITY AND VIBE

### Vibe in one sentence
A quiet bedroom at 10:47pm with a single warm lamp on. A long exhale. Permission to let the day go.

### What Slumbor is NOT
- A loud dropshipper site with red SALE banners
- A clinical medical-device site with stock photos on white
- A bright "wellness" brand with mint green and pastel pink
- An urgent pain-relief site (that was Recova)
- A tech-forward gadget site with futuristic gradients
- Anything that feels like daytime

### What Slumbor IS
- A bedside ritual brand. Soft, dim, intimate, warm. Slow and breathable.
- Feels like the moment before sleep, not the moment of buying.

### Color palette (exact hex)
```
midnight:    #0E1626    /* primary background, dusk feel */
midnight-2:  #14213D    /* slightly lighter dark for section variation */
cream:       #F2EDE4    /* primary text on dark, warm paper-like */
cream-soft:  #E8DFD2    /* secondary text, slightly more muted */
amber:       #D4A574    /* warm lamp glow, primary accent, all CTAs */
amber-hover: #E5B889    /* button hover state */
amber-deep:  #B88654    /* darker amber for emphasis variation */
plum:        #3A2745    /* deep purple, rare accents only */
lavender:    #A8A3C7    /* muted lavender for subtle UI, dividers, fine print */
sage:        #7A8B75    /* desaturated sage, ONLY for benefit checkmarks */
```
Rules: background always midnight/midnight-2, never white. Body text always cream on dark. All primary CTAs amber bg with midnight text. Stars amber (not bright yellow). Strikethrough anchor prices in lavender. No bright red, green, mint, teal, or blue beyond the midnight family.

### Typography
- Headlines: **Fraunces** (Google Fonts). Warm serif. Weights 400/500 only. Never 700+. Italic for taglines only.
- Body: **Inter** (Google Fonts). Weights 400/500. Letter spacing ~0.01em. Line height 1.6-1.7.
- Hero H1: 56-72px desktop / 36-44px mobile, weight 400-500
- Section H2: 36-48px desktop / 28-34px mobile, weight 400-500
- H3 / card headlines: 22-26px, weight 500
- Body: 17-18px (intentionally larger; tired eyes)
- Small/captions: 14-15px, lavender for fine print
- Line length: body paragraphs ~65 chars (`max-w-prose`)

### Imagery rules (read twice)
The buyer is at 11pm, exhausted, half-cynical, trained to spot fake imagery instantly. One AI tell kills trust on the whole page.
- Dim warm bedroom lighting (Kinfolk magazine, not Apple keynote)
- Real-looking people, often partially out of frame
- Soft shadows, never harsh
- Warm light sources only (bedside lamp, sunset, candle). Never blue/fluorescent/ring-light
- Empty space and quiet. Every image breathes.
- Product shot in soft contextual lighting on a bed/nightstand, never floating on white

Image roles: Hero = woman reclining with mask on, hand on chest, dim warm light, cream sheets, cinematic. Mechanism = close-up on a nightstand by a half-burned candle and folded book. Social proof = multiple unposed shots, mixed angles/ages/ethnicities. Comparison = clean line illustration ok. How-to-use = three sequential ritual frames.

If forced to use AI imagery: no centered subjects, slight grain/film texture, warm grade, accept framing imperfections, never the smooth-skin gallery-portrait look.

### Motion rules
- Slow/subtle. Fade-ins ~800ms, not 200ms.
- framer-motion `transition={{ duration: 0.8, ease: "easeOut" }}`, no bouncy springs.
- No autoplay video with sound. Loop silently with optional unmute.
- Soft hover; buttons shift color slightly, no dramatic scale.
- Soft page transitions (fade > slide). No parallax. No auto-advancing carousels.

The site should feel like it's exhaling, not selling.

---

## PART FOUR: SITE ARCHITECTURE

### Primary pages (highest design attention)
1. Homepage (`/`)
2. Product page (`/products/sleepwave-pro`) — 80% of design effort
3. Cart (`/cart`)

### Secondary pages (built, minimal)
4. About (`/about`)
5. FAQ (`/faq`)
6. Shipping & Returns (`/shipping`)
7. Contact (`/contact`)
8. Track Order (`/track-order`)

### Legal pages
9. Privacy Policy (`/privacy-policy`)
10. Terms of Service (`/terms-of-service`)
11. Refund Policy (`/refund-policy`)

### NOT at launch
Blog, multiple product pages, quiz funnel, separate reviews page, affiliate page.

---

## PART FIVE: GLOBAL UI ELEMENTS

### Top announcement bar
Thin bar, muted amber-on-midnight (NOT bright red urgency). Text: `Free US shipping on every order. 180-day full refund.` NO countdown, NO "limited time." Closable via small × on the right, persists per session via cookie.

### Header
Fixed after scrolling past announcement bar. Background fades transparent → midnight with subtle bottom border on scroll. Logo (left) "SLUMBOR" Fraunces cream. Nav (center desktop): Home, About, FAQ, Contact. Right: cart icon with count badge + "Add to Cart" amber on desktop. Mobile: hamburger → full-screen overlay.

### Footer
Background midnight-2. Four columns desktop, stacked mobile: Brand (logo, description, socials), Shop (Product, Cart), Support (Contact, FAQ, Shipping, Track Order), Legal (Privacy, Terms, Refund). Bottom: copyright in lavender, payment icons in muted style.

---

## PART SIX: HOMEPAGE STRUCTURE

Soft brand entry. Most ad traffic skips it. Short, atmospheric, directs to product page.

- **H1 Hero:** Full-viewport, 50/50 split. Left: amber eyebrow `THE WIND-DOWN MASK`; H1 `Let the day finally leave your body.`; subhead in buyer's voice; two CTAs (primary amber "Shop the SleepWave Pro", secondary outlined "Learn more"); trust line (5 amber stars + "Trusted by [N] tired humans"). Right: cinematic mask shot, bleeds to edge, subtle vignette.
- **H2 Why Slumbor (4-pillar):** eyebrow `WHY SLUMBOR`; H2 `Built for the version of you at 11pm.`; four cards (warmth signals safety / pulse your body recognizes / sound that fills the noise / the ritual not the gadget), amber icon + cream headline + cream-soft body.
- **H3 Featured Product:** split image + text. Eyebrow `THE SLEEPWAVE PRO`; H2 `Made for the ones who can't shut their brain off.`; intro paragraph; three amber-check bullet rows (warmth lasts / pressure is soft / shutdown is silent); price row $69.99 amber + $139.99 lavender strike; CTA "Try it tonight."
- **H4 Customer voices:** single large Fraunces-italic testimonial, centered, on midnight-2; name + 5 amber stars + "Verified buyer."
- **H5 Brand story:** split. Eyebrow `OUR STORY`; H2 `Built by people who couldn't sleep.`; two quiet paragraphs; outlined CTA "Read our full story". Right: three glass stat cards (customer count, 4.X/5 rating, 180-day guarantee).
- Standard footer.

---

## PART SEVEN: PRODUCT PAGE STRUCTURE (17 sections, exact order)

**P1 Above the fold** — 50/50 split, gallery left / info right (stacked mobile, gallery first).
- Gallery: main square image + 5-9 thumbnails (vertical strip or row below); swap on click; optional amber "-50% OFF" badge. Mobile: swipeable snap carousel with dots. 9 image slots (leave placeholders): lifestyle hero, product on nightstand, hand reaching, padding close-up, side-angle on face, multi-people composite, scale-in-hand, components, ritual lifestyle.
- Info order: (1) H1 "SLUMBOR SleepWave Pro" Fraunces 36-40px; (2) italic tagline "The kind of quiet your body has been waiting for."; (3) star row 5 amber + "4.X (N reviews)"; (4) price $69.99 amber + $139.99 lavender strike + "SAVE 50%" amber-tint; (5) three outcome icons (Wind down faster / Ease tension behind the eyes / Fall asleep easier), amber, 2-line labels; (6) four sage checkmarks (wake without heavy-eyed feeling / end day without tension headache / stop reaching for screens to get tired / something that actually works every night); (7) pain agitation block w/ top border — H3 "Tired of your brain refusing to switch off when you finally lie down?" + two short agitation paragraphs + "Try it for 180 nights and if it doesn't help you sleep better, we send every cent back. No questions asked."; (8) Buy More Save More selector (1/2/3 cards, default 1, badges 10%/20% off, 3rd "MOST POPULAR", selected = amber border + tint); (9) quantity stepper + full-width amber "Add to cart"; (10) three trust badges (free US shipping / 180-day refund / secure checkout) glass style; (11) tabs Details/Shipping/Guarantee, default Details.

**P2 Benefits** — split. Left: amber H2 "The benefits:", two intro paragraphs, five sage pills (wind down without 2am wake-ups / stop screen-fatigue headaches / loosen tension behind eyes / fall asleep without forcing it / stop layering supplements). Right: centered amber H2 "Effective For", image, three uppercase labels SCREEN-FRIED EYES / END-OF-DAY TENSION / RACING THOUGHTS.

**P3 "Sound familiar?" agitation** — centered. H2 "Give your nervous system the off-switch it's been begging for." + "Sound familiar?" + four amber-dot pains (lying exhausted but wide awake / wake up like a truck ran over you / tried melatonin/supplements/apps still here / eyes burning by 4pm headache by 7pm can't switch off by 11pm) + "**You don't have to keep grinding through it.** SleepWave Pro is built for exactly this."

**P4 Before/After** — 3-col (Before image / amber arrow / After image), Before in lavender, After in amber. Below: amber H2 "The cycle ends tonight." + paragraph + four amber bullets (made for screen-fried eyes & stressed nervous systems / warmth, soft pulse, quiet sound the body responds to / works in minutes not weeks / compact enough to live on your nightstand).

**P5 Mechanism reveal** (Stage 3 credibility) — split. Left: diagram of three layers (heat/pulse/sound). Right: H2 "How warmth, pulse, and quiet sound walk your nervous system to sleep." + intro + three amber bullets: **Heat** (vasodilation, parasympathetic signal), **Pulse** (mimics slow human touch, swaddled-baby calm), **Sound** (quiet meditative + binaural-style, masks motor). Closing: "It's not about forcing sleep. It's about giving your body permission."

**P6 Who it's for** — split. Left: amber H2 "Made For", navy subhead "People Who Are:", archetype image. Right: H2 "Who is this for?", "If you are someone who:", five amber bullets (can't fall asleep even exhausted / stares at screens all day / tension headaches every workday / tried melatonin/apps/tea still can't switch off / wakes at 2am brain won't stop), "Then Slumbor is built exactly for you.", three closers (relief in your own bed / no supplements apps subscriptions / better sleep fewer headaches calmer mornings).

**P7 Features you'll love** — split image + text. Left amber H2 "Features You'll Love" + four amber-check bold bullets: 15 adjustable settings / 3 designed modes (Wind Down, Migraine Relief, Deep Sleep) / wireless & rechargeable / quiet motor. Right: feature close-up.

**P8 How to use (ritual)** — centered. H2 "The 7-minute wind-down ritual." Three circles: STEP 1 "Slip the mask on. Adjust the strap until it feels held, not tight." / STEP 2 "Press the button. Choose warmth, or pulse, or music. Or all three." / STEP 3 "Lie back. Breathe out. Most people are asleep before the timer ends."

**P9 Old way vs SleepWave Pro** (Stage 4 differentiation) — 2-col cards. Left (muted/lavender, "OLD WAY" badge): tension-trapped diagram, "Pills, apps, and the wait-it-out method", body, × closer "Doesn't address the actual signal your body needs". Right (amber border, "SLEEPWAVE PRO" badge): tension-releasing diagram, "Warmth + pulse + sound, working together", body, ✓ closer "Signals your body actually responds to".

**P10 Comparison table** — eyebrow "COMPARE", H2 "SleepWave Pro vs the alternatives". 3-col (feature / SleepWave Pro amber / Sleep pills/apps/supplements). Rows: Price $69.99 one-time vs Hundreds per year; Use anytime ✓/✗; Tells nervous system to wind down ✓/✗; Works in minutes ✓/✗; No subscription/refills ✓/✗; No morning grogginess ✓/✗; Easy before bed without phone ✓/✗. Amber ✓, lavender ✗.

**P11 Cost anchor** — centered amber card, cream text. H2 "A bottle of melatonin runs out in three weeks." Subhead "SleepWave Pro costs $69.99 and you can use it every single night for years."

**P12 Bonus stack reveal** (no fake urgency) — eyebrow "WHAT YOU GET TODAY", H2 "Everything you need to fall asleep tonight.", subhead about free bonus. Amber-check list (50% OFF / 7-Minute Wind-Down $29 free / free US shipping $9.99 free / 180-day guarantee). 50/50 split: left product+PDF bundle image; right three cards (audio guide was $29 Free Today / shipping was $9.99 Free Today / guarantee was $19.99 Free Today). Below: $139.99 lavender strike + $69.99 huge amber + CTA "Get yours tonight."

**P13 Testimonial slider** — centered, one at a time, arrows + dots. H2 "200+ tired humans, finally sleeping." Large Fraunces italic quote + name w/ amber check + location + verified. 8-12 testimonials hitting: skeptic-converted, specific pain solved, family/social proof, vivid sleep description.

**P14 Reviews grid** — summary card (big rating "4.8", 5 amber stars, "Based on N reviews", 5/4/3/2/1 distribution bars). 12 review cards (2-col desktop, 1 mobile): initial avatar, name, verified badge, 5-star, date, body. Mix short/long, sleep/tension. Optional "Show More Reviews" outlined button.

**P15 Product FAQ (top 6)** — eyebrow "COMMON QUESTIONS", H2 "Frequently asked questions". Six collapsible + cards: shutdown noise wake me? (Renpho) / pressure hurt eyes? (Renpho) / headaches or just sleep? / charge life? / own music? / what if it doesn't work?

**P16 Risk reversal / guarantee** — centered. H2 "Try it for 180 nights. Or every cent comes back." Subhead "Real talk. If you've made it this far, you're tired of being sold to. So here's the deal." Five amber checks (180-day full refund from arrival / sleep better in 14 days or we make it right / no restocking fee no questions / keep the bonus either way / real humans answer within 24 hours). Closer "We built this because we needed it ourselves. We stand behind it." + contact email.

**P17 Sticky mobile bottom CTA** — appears after first screen, mobile only. Product name + price (left), amber Add to Cart (right). Hidden on cart page.

---

## PART EIGHT: COPY RULES (THE ANTI-AI FIREWALL)

### Banned punctuation
**ZERO em dashes (— or –) anywhere.** Use commas, periods, parentheses, or restructure.

### Banned words/phrases
delve, dive into, unpack, explore, journey, navigate, traverse, leverage, unlock, unleash, elevate, empower, harness, foster, cultivate, robust, comprehensive, holistic, seamless, cutting-edge, transformative, tapestry, intricate, myriad, plethora, multifaceted, in conclusion, in summary, ultimately, that said, furthermore, moreover, additionally, it's important to note, it's worth noting, game-changer, revolutionary, ensure, endeavor, embark, realm, landscape (metaphorical), "in today's fast-paced world", pain point (use "pain"/"frustration"/"ache"), "Are you tired of...".

### Banned structures
No three-part symmetrical lists ("calming, restorative, and renewing"). No "X but also Y" hedging. No template headers ("Why X Matters", "Understanding X", "The Power of X", "The Truth About X", "What You Need To Know About X").

### Sentence length variation (mandatory)
Mix sentence lengths wildly within every paragraph. Use deliberate fragments (once or twice per paragraph max). Use contractions naturally and inconsistently.

### Specifics over abstractions
"The kind of stillness where you can feel your own heartbeat slow down" > "Experience deep relaxation." "The sinus pressure behind your eyes finally letting go" > "Reduce stress and tension." "You'll be out before the 15-minute timer ends" > "Promotes better sleep."

### Use the verbatim library directly
The TM doc has 30+ real reviewer sentences. Use them as section openers, agitation paragraphs, benefit bullets, pull-quotes. The reader recognizes her own voice. That's the conversion.

### Avoid corporate transitions
No "Additionally/Furthermore/Moreover/On the other hand." Start with "And", "But", or just begin. One or two small informalities per page (a lowercased headline word, a "honestly", a "look, here's the thing").

### Headline rules
Sound like something a person says out loud, readable in <3s, no template formats, sensory/emotional, fragments/lowercase ok. Good: "Let the day finally leave your body." / "Built for the version of you at 11pm." / "Made for the ones who can't shut their brain off." Bad: "Unlock Deeper Sleep", "Why Quality Sleep Matters", "Discover the Power of Heated Eye Therapy", "Transform Your Sleep Tonight".

### Voice
A smart, tired friend who's been there, telling you what actually worked, in the quiet of her kitchen at 11pm, half-whispering so as not to wake the house. Not a marketer, doctor, or wellness coach. A friend.

---

## PART NINE: OFFER DISPLAY (consistent everywhere)
```
$139.99    $69.99
Free US shipping on every order.
180-day money-back guarantee.
Bonus: The 7-Minute Wind-Down audio guide ($29 value).
```
Anchor $139.99 small/lavender. $69.99 large/amber. Lines under in cream body size.
Do NOT display: bright red % badge, countdown timers, fake stock scarcity, bright-green "you save" line, "TODAY ONLY"/sale banners. The amber-tint "SAVE 50%" badge in P1 is the only discount badge.

---

## PART TEN: SHOPIFY STOREFRONT API
- Product: fetch SleepWave Pro on build (ISR/RSC streaming), cache, 60s TTL.
- Cart: Storefront API; custom drawer sliding from right on Add to Cart. Contents: line item, qty selector, subtotal, "Shipping calculated at checkout. US orders ship free.", amber Checkout via `checkoutUrl`. Do NOT add shipping protection toggle, cart upsells, "frequently bought together", or pre-checkout discount prompts.
- Checkout: Shopify-hosted via `checkoutUrl`, brand colors/fonts via customizer.
- Customer accounts: optional, Shopify system.
- Order tracking: order number + email queries Shopify API for status.

---

## PART ELEVEN: MOBILE-FIRST
80%+ traffic is mobile Meta ads. Hero stacks image above text on mobile. Sticky bottom CTA (P17). Touch targets ≥48px. Body never below 16px. Next.js `<Image />` with responsive `sizes`. No hover-only interactions. Slow animations matter more on mobile. Test iPhone Safari.

---

## PART TWELVE: TECHNICAL REQUIREMENTS
Next.js 15 app router; Tailwind with exact palette; Shopify client at `/lib/shopify.ts`; env `NEXT_PUBLIC_SHOPIFY_DOMAIN`, `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`; Meta Pixel; Microsoft Clarity; lazy-load below fold; LCP <2.5s on 4G; Lighthouse 90+ mobile; all meta/OG tags; sitemap.xml + robots.txt; responsive at 480/768/1024/1280px.

---

## PART THIRTEEN: WHAT NOT TO DO (Recova mistakes)
1. Top banner urgency timer → Slumbor bar is trust-positioning.
2. AI-generated imagery → real-looking only.
3. Generic teal/clinical aesthetic → bedside ritual.
4. Bright bold weight everywhere → warm serif headlines, modest weights.
5. "Are you tired of..." openers → specific sensory hooks.
6. Shipping protection upsell → shipping free, period.
7. Generic spec language as benefits → sensory, not technical.

---

## PART FOURTEEN: DELIVERY CHECKLIST
(Full checklist retained in the original brief — design/brand, copy, homepage, product page 17 sections, offer, trust, technical. Key gates: zero em dashes; no banned AI words; verbatim language in ≥6 places; tension entry door honored; mechanism in the middle; 180-day guarantee ≥4 mentions; no countdown/fake scarcity; bonus guide ≥3 mentions.)

---

## PART FIFTEEN: FINAL NOTE
If you want to "make it more vibrant" or "add a discount banner" — stop. That's the dropshipper instinct. Slumbor wins by being calmer than every competitor. When in doubt, choose less. Less color, motion, copy, urgency. The buyer is exhausted. The brand should feel like a long exhale.

Build it slow. Build it warm. Build it like you mean it.
