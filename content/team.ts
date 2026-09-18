// Team content. Names and roles below match the live site's homepage team section.
// Photos stay null until real, consented photos arrive — components render a neutral
// placeholder rather than a broken image when it's null.

export interface TeamMember {
  // null means "identity not confirmed yet" — components must skip these, never print a
  // placeholder string like "[Name pending]" to an end user.
  name: string | null;
  role: string | null;
  roleVerified: boolean;
  photo: string | null;
  bio?: string;
}

export const team: TeamMember[] = [
  {
    name: "Luke Karema",
    role: "Executive Director",
    roleVerified: true,
    photo: null,
  },
  {
    name: "Linda Kaunda",
    role: "Lead Peace Building",
    roleVerified: true,
    photo: null,
  },
  {
    name: "Asnath Kabatesi",
    role: "Lead Advocacy",
    roleVerified: true,
    photo: null,
  },
  {
    name: "Christel Bakayomo",
    role: "Communication Lead",
    roleVerified: true,
    photo: null,
  },
];
