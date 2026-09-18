// Impact stats. The live site rendered "Lives Impacted / Core Programs / Partner
// Organizations" as bare labels with no numbers (a count-up animation that never fired),
// and separately claimed "50+ Beneficiaries" on the homepage vs "over 1,000 families" on
// Donate — two different, uncorroborated numbers for the same thing.
//
// Rule for this file: `value: null` means "not verified yet." Components must filter out
// null-valued stats before rendering, never show a stat card with a blank number. See
// components/StatBlock.tsx.

export interface Stat {
  label: string;
  value: number | null;
  suffix?: string;
  verified: boolean;
}

export const impactStats: Stat[] = [
  {
    label: "Beneficiaries",
    value: null,
    verified: false,
  },
  {
    label: "Core Programmes",
    value: 4,
    verified: true, // Livelihood, Psychosocial Support, Peace Building, Advocacy — countable from site structure itself.
  },
  {
    label: "Partner Organisations",
    value: null,
    verified: false,
  },
  {
    label: "USLA Savings Branches",
    value: null,
    verified: false,
  },
];

export const peaceCalendar = [
  { date: "6 April", label: "International Day of Sport for Development and Peace" },
  { date: "20 June", label: "World Refugee Day" },
  { date: "21 September", label: "International Day of Peace" },
] as const;
