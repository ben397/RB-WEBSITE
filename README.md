# RB-WEBSITE

Refugee Brotherhood is a community-based, refugee-led organization dedicated to supporting displaced individuals and vulnerable host communities. Through innovative programs and strong partnerships with leading NGOs, we foster resilience, promote self-reliance, and create opportunities for all.

Rebuild of [refugee-brotherhood.vercel.app](https://refugee-brotherhood.vercel.app/) — same content, restructured and corrected, on a new design system.

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind v4 + React 19.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values — see "Before this goes live" below
npm run dev
```

## Content layer

Everything in `/content` is the single source of truth — components read from it rather than hardcoding text. This is the fix for the live site's data-integrity problem, where the same phone number, address, and social handles were typed in by hand in multiple places and disagreed with each other.

- `content/site.ts` — org identity, contact details, socials, payments, brand tokens, nav
- `content/programs.ts` — the four programmes (Livelihood, Psychosocial, Peace, Advocacy), Livelihood broken into its sub-projects
- `content/team.ts` — team members
- `content/partners.ts` — partner organisations
- `content/impact.ts` — stat numbers, peace-building calendar
- `content/alumni.ts` — alumni profiles (currently empty — none were captured from the live site)
- `content/posts.ts` — blog posts (currently empty — none were captured from the live site)

**Rule:** any field that couldn't be verified from the live site is `null` (or has `verified: false`), and the component that renders it must skip it rather than show a blank label or a placeholder string. That's the direct fix for the live site's "Lives Impacted" counter that rendered with no number in it. See `components/StatBlock.tsx`, `TeamSection.tsx`, and `PartnersStrip.tsx` for the pattern.

## Before this goes live

### 1. Environment variables (`.env.local`, see `.env.example`)

- `NEXT_PUBLIC_SITE_URL` — the real deployed domain. Without it, metadata/OG tags and `sitemap.xml` point at `localhost`.
- `RESEND_API_KEY` (+ `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) — the contact form (`/contact`) fails gracefully with a clear message until this is set. Not tested against a live key in development — verify a real submission before relying on it.
- `PAYHERO_API_USERNAME` + `PAYHERO_API_PASSWORD` (or `PAYHERO_BASIC_AUTH_TOKEN` directly), plus `PAYHERO_CHANNEL_ID` (+ `PAYHERO_CALLBACK_URL`, optional `PAYHERO_CREDENTIAL_ID`) — the donate form (`/donate`) fails gracefully until these are set. PayHero doesn't issue a single opaque API key; it's a username/password pair (standard HTTP Basic auth) or the pre-encoded token their dashboard shows — see `.env.example` for which to use. **Confirmed working against a live PayHero account** — the STK push itself reaches a real phone.
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL` + `KV_REST_API_TOKEN` — see below) — powers the donate page's real "Thank you" screen: the initiating request stores a PENDING record, PayHero's callback resolves it to SUCCESS/FAILED, and the browser polls `/api/donate/status` until it knows which. Without this, the STK push still works but the donor just gets a static "check your phone" message with no confirmation either way. **`parseCallback` in `app/api/donate/callback/route.ts` is matched against a real captured PayHero callback payload** (a genuine test donation, not a guess) — tested against that exact payload plus a hypothetical failure variant of the same shape, both resolving correctly end-to-end (init → callback → status → UI transition to thank-you/failure). One thing this caught: the real payload has a top-level boolean `status: true` *and* a separate nested string `response.Status: "Success"` — an earlier version of this code treated those as the same field under two spellings and only got the right answer by luck (ResultCode also independently confirmed success); fixed to read them separately. Still untested: an actual real *failure* callback (only success has been observed against a live PayHero account) — worth triggering one small real donation and cancelling the M-Pesa prompt to confirm the failure shape matches what's coded.

  **Naming gotcha that cost real debugging time:** adding this via Vercel's Storage tab → "Upstash for Redis" marketplace integration does *not* set `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` — it auto-injects `KV_REST_API_URL`/`KV_REST_API_TOKEN` instead (the old "Vercel KV" naming, carried over even though the storage backing it is Upstash). `lib/upstash.ts` checks both, so whichever Vercel actually gave you works without renaming anything — confirmed against this exact failure mode on the live deployment (Vercel's function trace showed `"External APIs: No outgoing requests"` on `/api/donate/status`, proving the code was silently skipping the whole Redis call because it only knew the Upstash-native name).

### 2. Content still pending from RB / Luke

Search `content/*.ts` for `verified: false` and `null` values — each has a comment explaining exactly what's ambiguous.

Closed since the last pass: full team roster (`content/team.ts` — Luke Karema, Linda Kaunda, Asnath Kabatesi, Christel Bakayomo) and full partner list (`content/partners.ts` — 11 named partners).

Still open:

- Real phone number (`+254 111449564` vs `+254 794 693898` were both live)
- Real address (rendered duplicated/misspelled on the live site)
- Facebook URL and Instagram handle (two versions of each were live)
- Registration/certificate number (footer + `/governance`)
- M-Pesa paybill/till number (`/donate`) — deliberately left blank rather than guessed, since a wrong number here is money misdirected
- Consented team photos (avatars are still illustrated placeholders) and partner logos (marquee/`/partners` currently render text wordmarks)
- Two more Livelihood sub-projects (only 3 of 5 were individually identifiable from the live copy)
- Verified impact numbers (beneficiaries, partner count, USLA branch count)
- Board of Directors and governance structure (`/governance`)
- Formal sign-off on the draft safeguarding policy (`/safeguarding`)
- Alumni stories and blog posts (both currently empty states, ready for real content)
- Real testimonials — `content/testimonials.ts` currently holds four sample quotes (`placeholder: true`, attributed to role only, never a specific invented name) to demo the carousel. Replace before this is treated as a finished page.

### 3. Images

The hero and four programme sections now use real stock photography (`public/images/`) rather than the SVG illustrations, which are still used for team avatars. None of it is RB's own — captions/alt text are written generically (no specific place, event, or "our community" claims) specifically so a stock photo is never presented as documentation of a real RB event or the specific people RB serves. Swap in real, consented photography of RB's actual work when available, and keep that same rule: a photo's caption should never claim more than the photo can honestly back up.

## Design

- Colour: `#12263A` navy · `#003F6A` brand blue (sampled from RB's real logo mark — see `public/rb-icon.png`, supersedes the earlier `#326BA7` guess) · `#B5652D` ochre · `#F6F2EA` paper · `#2B2620` ink · `#7C8B6F` sage
- Type: Fraunces (headlines) / Work Sans (body)
- Logo/icon marks, favicons, the manifest, and the OG share image (`public/rb-*.png`, `public/favicon-*.png`, `public/og-image.png`, `public/apple-touch-icon.png`, `app/manifest.webmanifest`) are RB's real brand asset kit, not placeholders. `rb-logo.svg` from the kit is a broken wrapper (an `<image>` tag pointing at a relative PNG path, not real vector art) and was skipped — use the PNGs directly. Header uses `rb-icon.png` next to the text wordmark; footer (dark navy background) uses `rb-icon-white.png`.

## Phases

1. **Foundation** — project scaffold, content layer, theme tokens, layout shell ✅
2. **Home** — hero, programmes, team, partners, CTA ✅
3. **Programmes** — index + four detail pages ✅
4. **About, Partners, Contact** — including a working contact form ✅
5. **Credibility pages** — governance, safeguarding, privacy policy, annual report placeholder ✅
6. **Donate** — M-Pesa STK push (KES), paybill fallback, payment-callback notification ✅
7. **Blog** — structure + empty state in place; MDX/CMS upgrade optional once there's real content to publish ✅
8. **Polish** — SEO (metadata, robots.txt, sitemap.xml), full route sweep, sticky header, scroll-reveal animations (`components/Reveal.tsx`, IntersectionObserver-based, reduced-motion safe), real stock photography, partners marquee, deployed to Vercel, full-site Lighthouse pass (every page 100/100/100/100 — accessibility, best-practices, SEO, performance) ✅

Lighthouse ran against a local production build of the deployed commit (this dev environment can't reach the live URL directly); accessibility/best-practices/SEO scores are code-driven so they match the live site — only raw performance timing would differ from Vercel's edge network, and that scored 100 locally too. Fixed along the way: brand blue/ochre both failed WCAG AA text contrast and were darkened slightly (`#326ba7` / `#9a5626` — see `app/globals.css`), several secondary-text opacities were too low, inline mailto links needed underlines, a testimonial carousel touch target was too small, and one `<dl>` had invalid nesting.
