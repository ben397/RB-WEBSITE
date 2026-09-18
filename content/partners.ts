// Partner organisations shown as a text-logo marquee on the homepage and listed
// on /partners. Names below match the live site's "Our Trusted Partners" row.
// Logos stay null until real logo files arrive — the strip renders text wordmarks
// (monochrome) so it never shows a broken image.

export interface Partner {
  // null means "not confirmed yet" — components must skip these entries entirely rather
  // than print a placeholder string to an end user.
  name: string | null;
  logo: string | null;
  description: string | null;
  url?: string;
}

export const partners: Partner[] = [
  { name: "Refugepoint", logo: null, description: null },
  {
    name: "Mr. Green Africa",
    logo: null,
    description: "Waste aggregation partnership underpinning the livelihood programme's income-from-recycling work.",
  },
  { name: "Nairobi Industrial Institute", logo: null, description: null },
  { name: "Embakasi Sub-County Peace Committee", logo: null, description: null },
  { name: "Kenya Association of Waste Recyclers", logo: null, description: null },
  { name: "Positive Young Women Voices", logo: null, description: null },
  { name: "Youth Voices Community", logo: null, description: null },
  { name: "Pamoja Trust", logo: null, description: null },
  { name: "Umoja Refugees", logo: null, description: null },
  { name: "Danish Refugee Council", logo: null, description: null },
  { name: "Family Bridges of Hope", logo: null, description: null },
];
