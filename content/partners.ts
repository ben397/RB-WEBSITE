// Partner organisations. The live site's homepage had an empty "Our Trusted Partners"
// heading with no logos under it; the About page had all five logos. Every partner here
// needs its logo file and a one-line description of what the partnership actually does —
// a logo with no context reads as a badge-wall, not a credibility signal.

export interface Partner {
  // null means "not confirmed yet" — components must skip these entries entirely rather
  // than print a placeholder string to an end user.
  name: string | null;
  logo: string | null;
  description: string | null;
  url?: string;
}

export const partners: Partner[] = [
  {
    name: "Mr Green Africa",
    logo: null,
    description: "Waste aggregation partnership underpinning the livelihood programme's income-from-recycling work.",
  },
  // Live site's About page showed five partner logos with no accompanying names or
  // descriptions captured in the earlier review. Pull the actual partner list, logos, and
  // what each partnership does from RB, and add them as entries matching the shape above.
];
