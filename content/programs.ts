// Programme content, restructured from the live site's copy.
// The old "Livelihood" page was one ~200-word paragraph running five sub-projects
// together and ending on an unrelated line about children's education. Below, each
// sub-project is its own object so the page can render them as separate blocks.
//
// Sub-projects marked `verified: false` are ones this rebuild could only partially
// confirm from the live site review (USLA, Singles for a Better Tomorrow, and Mr Green
// Africa were explicitly named; the remaining two sub-projects mentioned in the original
// paragraph were not individually named in that review). Do not invent detail for those —
// pull the real copy from RB before publishing, or drop the slot.

export interface SubProject {
  // null means "not confirmed yet" — components must skip these rather than print a
  // placeholder string to an end user.
  name: string | null;
  summary: string | null;
  verified: boolean;
}

export interface Programme {
  slug: "livelihood" | "psychosocial" | "peace" | "advocacy";
  name: string;
  shortDescription: string;
  description: string;
  subProjects?: SubProject[];
  highlights?: { label: string; detail: string }[];
  /** false when this programme's description is a thin placeholder pending real copy from RB. */
  contentVerified?: boolean;
}

export const programmes: Programme[] = [
  {
    slug: "livelihood",
    name: "Livelihood",
    shortDescription:
      "Savings groups, small enterprise, and waste-to-income work that build economic self-reliance.",
    description:
      "RB's livelihood work runs several linked projects that move refugee and host-community members from dependency toward sustainable income, rather than a single programme.",
    subProjects: [
      {
        name: "USLA Savings Branches",
        summary:
          "Urban Savings and Loans Association branches that let members save collectively and access small loans for enterprise, without relying on formal bank credit most refugees can't get.",
        verified: true,
      },
      {
        name: "Singles for a Better Tomorrow",
        summary:
          "A livelihood and support track for single-headed households, building income stability for people carrying a household alone.",
        verified: true,
      },
      {
        name: "Mr Green Africa Waste Aggregation",
        summary:
          "A partnership with Mr Green Africa that turns waste collection and aggregation into a source of income while reducing plastic waste in the community.",
        verified: true,
      },
      // The original livelihood copy referenced five linked projects; only three were
      // individually identifiable from the live site content (above). The live copy's
      // closing line about children's education may belong to a distinct project (e.g. a
      // school-fees or education-support track) rather than being part of livelihood.
      // Get the remaining project name(s)/description(s) from RB and add them here in the
      // same shape — do not invent them.
    ],
  },
  {
    slug: "psychosocial",
    name: "Psychosocial Support",
    shortDescription:
      "Mental health and community support for people carrying displacement trauma.",
    description:
      "Psychosocial support for refugees and host-community members dealing with the trauma of displacement, including counselling access and peer support structures. Full programme detail (specific activities, partner clinics, group formats) should be pulled from the live /programs/psychosocial page and RB directly — the earlier review of the live site did not capture page-level detail here the way it did for Livelihood, Peace, and Advocacy.",
    contentVerified: false,
  },
  {
    slug: "peace",
    name: "Peace Building",
    shortDescription:
      "Sport and community events that bring refugees and host communities together.",
    description:
      "RB runs a peace-building calendar anchored on the Peace Cup, a community football tournament used to build relationships between refugee and host-community youth around recognised international peace dates.",
    highlights: [
      { label: "6 April", detail: "International Day of Sport for Development and Peace" },
      { label: "20 June", detail: "World Refugee Day" },
      { label: "21 September", detail: "International Day of Peace" },
    ],
  },
  {
    slug: "advocacy",
    name: "Advocacy",
    shortDescription:
      "Policy engagement and coalition work pushing for refugee rights and inclusion.",
    description:
      "RB's advocacy work includes contributing to the Shirika Plan process on refugee inclusion in Kenya, and participating in the Beyond My Status consortium alongside other refugee-led and partner organisations pushing for policy change.",
    highlights: [
      { label: "Shirika Plan", detail: "Advocacy input on Kenya's refugee inclusion policy framework." },
      { label: "Beyond My Status", detail: "A multi-organisation consortium RB is part of, advocating for refugee rights." },
    ],
  },
];

export function getProgramme(slug: Programme["slug"]) {
  return programmes.find((p) => p.slug === slug);
}
