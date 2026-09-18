// Alumni — people who've completed RB programmes. The live site had an Alumni page but
// the earlier content review didn't capture individual profiles or stories, so this
// starts empty rather than inventing names or testimonials. Add real, consented profiles
// here in this shape once RB supplies them.

export interface AlumniProfile {
  name: string;
  programme: string;
  story: string;
  photo: string | null;
}

export const alumniProfiles: AlumniProfile[] = [];
