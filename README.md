# RB-WEBSITE

Refugee Brotherhood is a community-based, refugee-led organization dedicated to supporting displaced individuals and vulnerable host communities. Through innovative programs and strong partnerships with leading NGOs, we foster resilience, promote self-reliance, and create opportunities for all.

Rebuild of [refugee-brotherhood.vercel.app](https://refugee-brotherhood.vercel.app/) — same content, restructured and corrected, on a new design system.

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind v4 + React 19.

## Getting started

```bash
npm install
npm run dev
```

## Content layer

Everything in `/content` is the single source of truth — components read from it rather than hardcoding text. This is the fix for the live site's data-integrity problem, where the same phone number, address, and social handles were typed in by hand in multiple places and disagreed with each other.

- `content/site.ts` — org identity, contact details, socials, brand tokens, nav
- `content/programs.ts` — the four programmes (Livelihood, Psychosocial, Peace, Advocacy), Livelihood broken into its sub-projects
- `content/team.ts` — team members
- `content/partners.ts` — partner organisations
- `content/impact.ts` — stat numbers, peace-building calendar

**Rule:** any field that couldn't be verified from the live site is `null` (or has `verified: false`), and the component that renders it must skip it rather than show a blank label or a placeholder string. That's the direct fix for the live site's "Lives Impacted" counter that rendered with no number in it. See `components/StatBlock.tsx`, `TeamSection.tsx`, and `PartnersStrip.tsx` for the pattern.

### Open items for RB / Luke to confirm

Search `content/*.ts` for `verified: false` and `null` values — each has a comment explaining exactly what's ambiguous. Highlights:

- Real phone number (`+254 111449564` vs `+254 794 693898` were both live)
- Real address (rendered duplicated/misspelled on the live site)
- Facebook URL and Instagram handle (two versions of each were live)
- Registration/certificate number (not on the live site at all — needed for the footer)
- Full team roster, roles, and consented photos
- Full partner list, logos, and what each partnership does
- Two more Livelihood sub-projects (only 3 of 5 were individually identifiable from the live copy)
- Verified impact numbers (beneficiaries, partner count, USLA branch count)

## Design

- Colour: `#12263A` navy · `#3674B5` brand blue (carried over from RB's existing logo) · `#B5652D` ochre · `#F6F2EA` paper · `#2B2620` ink · `#7C8B6F` sage
- Type: Fraunces (headlines) / Work Sans (body)
- Hero and programme visuals are deliberate abstract placeholders, not stock photos — swap for real, consented photography once RB supplies it

## Phases

1. **Foundation** — project scaffold, content layer, theme tokens, layout shell ✅
2. **Home** — hero, programmes, team, partners, CTA ✅
3. **Programmes** — index + four detail pages
4. **About, Partners, Contact** — including a working contact form
5. **Credibility pages** — governance, safeguarding, privacy policy, annual report placeholder
6. **Donate** — M-Pesa STK push, KES primary / USD secondary, receipt with reference, paybill fallback
7. **Blog** — MDX or lightweight CMS
8. **Polish** — accessibility pass, Lighthouse, image budget, SEO, staging deploy
