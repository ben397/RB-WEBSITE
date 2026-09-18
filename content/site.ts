// Single source of truth for organisation identity, contact details, and social links.
// The live site (refugee-brotherhood.vercel.app) has the same details typed in by hand
// in multiple places, so they disagree with each other. Every field below that came out
// of that site as a contradiction is marked `verified: false` with both values kept in a
// comment — do not silently pick one. Update this file once Luke confirms, and every
// component that reads it (header, footer, contact page, WhatsApp link, schema.org JSON-LD)
// updates together.

export interface ContactChannel {
  value: string;
  verified: boolean;
  note?: string;
}

export const siteInfo = {
  name: "Refugee Brotherhood",
  shortName: "RB",
  tagline:
    "A refugee-led organisation supporting displaced people and host communities in Nairobi.",
  description:
    "Refugee Brotherhood is a community-based, refugee-led organisation dedicated to supporting displaced individuals and vulnerable host communities. Through programmes in livelihoods, psychosocial support, peace building, and advocacy, and strong partnerships with leading NGOs, we foster resilience, promote self-reliance, and create opportunities for all.",

  // CONTRADICTION on the live site: top bar / WhatsApp link showed +254 111449564,
  // footer / contact page showed +254 794 693898. Confirm the working number with Luke.
  phone: {
    value: "+254 111 449 564",
    verified: false,
    note: "Live site also showed +254 794 693898 on the footer/contact page. Confirm which is live before publishing.",
  } satisfies ContactChannel,

  email: {
    value: "info@refugeebrotherhood.org",
    verified: false,
    note: "Placeholder pattern — confirm the real inbox with Luke.",
  } satisfies ContactChannel,

  // CONTRADICTION on the live site: address rendered duplicated and misspelled
  // ("Patanisho Kayole, Nairobi Panisho, Kayole, Nairobi"). Needs the correct
  // estate/road name from RB, not a guess.
  address: {
    value: "Kayole, Nairobi, Kenya",
    verified: false,
    note: 'Live site rendered "Patanisho Kayole, Nairobi Panisho, Kayole, Nairobi" — duplicated and misspelled. Get the real physical/postal address from RB.',
  } satisfies ContactChannel,

  hours: {
    weekdays: "Monday – Friday, 9:00 AM – 6:00 PM",
    note: "Live site showed both a weekday schedule AND '24/7 Emergency Support' with no distinction. If there is a real emergency line, it needs its own number and framing, not a contradiction under the office hours.",
  },

  // No M-Pesa paybill/till on the live site (it only had USD tiers with no working
  // payment path). Never invent a number here — a wrong paybill is money misdirected,
  // not just a cosmetic placeholder.
  payments: {
    paybill: null as string | null,
    tillNumber: null as string | null,
    note: "RB's M-Pesa paybill or till number for the direct-pay fallback on /donate. Request from Luke before launch.",
  },

  registration: {
    value: null as string | null,
    note: "RB's registration/certificate number was not on the live site. Needed in the footer for funder credibility — request from Luke.",
  },

  socials: {
    // CONTRADICTION: two Facebook URLs and two Instagram handles were live at once.
    facebook: {
      value: "https://facebook.com/refugeebrotherhood",
      verified: false,
      note: "Live site had two different Facebook URLs. Confirm the real page.",
    } satisfies ContactChannel,
    instagram: {
      value: "https://instagram.com/refugeebrotherhood",
      verified: false,
      note: 'Live site used both "refugeebrotherhood7" and "refugeebrotherhood" as the handle. Confirm which account is active.',
    } satisfies ContactChannel,
    twitter: {
      value: "https://twitter.com/refugeebrotherhood",
      verified: false,
    } satisfies ContactChannel,
    linkedin: {
      value: "https://linkedin.com/company/refugee-brotherhood",
      verified: false,
    } satisfies ContactChannel,
  },

  theme: {
    navy: "#12263A",
    blue: "#3674B5", // RB's existing brand blue, carried over from the live site/logo
    ochre: "#B5652D",
    paper: "#F6F2EA",
    ink: "#2B2620",
    sage: "#7C8B6F",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Alumni", href: "/alumni" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
