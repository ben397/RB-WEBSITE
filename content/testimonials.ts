// Testimonials from people RB has worked with.
//
// The entries below are SAMPLE copy to demo the carousel UI — not real quotes from real
// people. They're written from the real, verified facts about RB's programmes (USLA
// branches, the Peace Cup, psychosocial support, advocacy work) but attributed generically
// by role rather than to an invented named individual, specifically so nothing here reads
// as a fabricated identity. `placeholder: true` marks every one of them.
//
// Replace with real, consented quotes from RB before this ships to real visitors — see the
// "Sample quotes" notice TestimonialSection renders while any placeholder entry is present.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  photo: string | null;
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Joining the USLA savings branch meant I could finally put money aside without worrying about losing it. Within a year I had enough saved to start my own small trading business.",
    name: "USLA Member",
    role: "Livelihood Programme",
    photo: null,
    placeholder: true,
  },
  {
    quote:
      "The Peace Cup is the one time of year our estate and the refugee community share the same pitch, the same referee, the same result. It's done more for how we see each other than any meeting could.",
    name: "Peace Cup Participant",
    role: "Peace Building Programme",
    photo: null,
    placeholder: true,
  },
  {
    quote:
      "I didn't expect to talk about what happened to me. Having people who listened without judging changed how I was able to move forward, for myself and for my children.",
    name: "Support Group Member",
    role: "Psychosocial Support Programme",
    photo: null,
    placeholder: true,
  },
  {
    quote:
      "Being part of the Beyond My Status consortium means our experience isn't just a case study for someone else's report — we're in the room when the policy gets written.",
    name: "Advocacy Volunteer",
    role: "Advocacy Programme",
    photo: null,
    placeholder: true,
  },
];
