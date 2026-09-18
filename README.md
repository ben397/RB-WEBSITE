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
- `PAYHERO_API_KEY`, `PAYHERO_CHANNEL_ID` (+ `PAYHERO_CALLBACK_URL`) — the donate form (`/donate`) fails gracefully until these are set. Field names/auth scheme are implemented from general knowledge of PayHero's API, not verified against live docs from this environment — check `docs.payhero.co.ke` and test a real payment before launch.

### 2. Content still pending from RB / Luke

Search `content/*.ts` for `verified: false` and `null` values — each has a comment explaining exactly what's ambiguous. Highlights:

- Real phone number (`+254 111449564` vs `+254 794 693898` were both live)
- Real address (rendered duplicated/misspelled on the live site)
- Facebook URL and Instagram handle (two versions of each were live)
- Registration/certificate number (footer + `/governance`)
- M-Pesa paybill/till number (`/donate`) — deliberately left blank rather than guessed, since a wrong number here is money misdirected
- Full team roster, roles, and consented photos
- Full partner list, logos, and what each partnership does
- Two more Livelihood sub-projects (only 3 of 5 were individually identifiable from the live copy)
- Verified impact numbers (beneficiaries, partner count, USLA branch count)
- Board of Directors and governance structure (`/governance`)
- Formal sign-off on the draft safeguarding policy (`/safeguarding`)
- Alumni stories and blog posts (both currently empty states, ready for real content)

### 3. Images

Every photo on the site is currently a custom SVG illustration (`components/illustrations/Illustration.tsx`), not a real photo — this environment has no network access to stock photo sources. Swap in real, consented photography of RB's actual work when available.

## Design

- Colour: `#12263A` navy · `#3674B5` brand blue (carried over from RB's existing logo) · `#B5652D` ochre · `#F6F2EA` paper · `#2B2620` ink · `#7C8B6F` sage
- Type: Fraunces (headlines) / Work Sans (body)

## Phases

1. **Foundation** — project scaffold, content layer, theme tokens, layout shell ✅
2. **Home** — hero, programmes, team, partners, CTA ✅
3. **Programmes** — index + four detail pages ✅
4. **About, Partners, Contact** — including a working contact form ✅
5. **Credibility pages** — governance, safeguarding, privacy policy, annual report placeholder ✅
6. **Donate** — M-Pesa STK push (KES), paybill fallback, payment-callback notification ✅
7. **Blog** — structure + empty state in place; MDX/CMS upgrade optional once there's real content to publish ✅
8. **Polish** — SEO (metadata, robots.txt, sitemap.xml), full route sweep ✅ — accessibility/Lighthouse pass and a staging deploy still to do
