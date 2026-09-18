// Testimonials from people RB has worked with. Starts empty rather than inventing
// quotes — putting fabricated words in a real or implied person's mouth is a different,
// worse kind of dishonesty than an unnamed "[pending]" slot, and it's exactly the kind of
// thing this rebuild exists to get away from. Add real, consented quotes here once RB
// supplies them.

export interface Testimonial {
  quote: string;
  name: string;
  role: string; // e.g. "USLA Savings Branch member", "Peace Cup participant"
  photo: string | null;
}

export const testimonials: Testimonial[] = [];
