// Team content. The live site used logo.jpg as a placeholder photo for all four homepage
// team entries while the About page had real photos (team2.jpg–team5.jpg) for the same
// people — real photos belong on both. Swap `photo: null` for real files as they arrive;
// components must render a neutral placeholder rather than a broken image when it's null.
//
// CONTRADICTION on the live site: the homepage listed Asnath Kabatesi as "Lead Advocacy";
// the About page listed her as "Deputy Executive Director and Lead Advocacy". Using the
// more complete title until RB confirms which is current.

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
    name: "Luke", // Surname to confirm — Executive Director, per RB.
    role: "Executive Director",
    roleVerified: true,
    photo: null,
  },
  {
    name: "Asnath Kabatesi",
    role: "Deputy Executive Director and Lead Advocacy",
    roleVerified: false,
    photo: null,
    bio: "Live site listed her as 'Lead Advocacy' on the homepage and 'Deputy Executive Director and Lead Advocacy' on the About page. Confirm current title.",
  },
  {
    // Live site had four team members on the homepage; only Asnath's role was
    // distinguishable across pages in the earlier review. Pull full names, roles, and
    // consented photos from RB for the remaining team members and fill these in.
    name: null,
    role: null,
    roleVerified: false,
    photo: null,
  },
  {
    name: null,
    role: null,
    roleVerified: false,
    photo: null,
  },
];
