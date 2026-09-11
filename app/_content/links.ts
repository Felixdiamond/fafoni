/** Destinations for the two conversion actions and contact.
 *  The booking link is a placeholder until the client supplies a booking URL.
 *  The free test is a Tally form; links marked data-quiz open it in the modal. */
export const email = "hello@fafoni.com";
export const phone = { display: "+44 7459 627496", href: "tel:+447459627496" };

export const enquiryLink = (about: string) => `mailto:${email}?subject=${encodeURIComponent(about)}`;

export const quiz = {
  embed: "https://tally.so/embed/1ALAA4?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
  label: "Free test",
  title: "Find your project management path",
  note: "A few questions, then a suggested starting point and a personalised action plan.",
};

export const links = {
  bookConsultation: `mailto:${email}?subject=${encodeURIComponent("Free consultation")}`,
  freeTest: "https://tally.so/r/1ALAA4",
  services: "/services",
  about: "/about",
  contact: "#contact",
} as const;
