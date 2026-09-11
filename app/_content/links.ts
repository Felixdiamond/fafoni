/** Destinations for the two conversion actions and contact.
 *  The booking link is a placeholder until the client supplies a booking URL.
 *  The free test is a Google Form; links marked data-quiz open it in the modal. */
export const email = "hello@fafoni.com";
export const phone = { display: "+44 7459 627496", href: "tel:+447459627496" };

export const enquiryLink = (about: string) => `mailto:${email}?subject=${encodeURIComponent(about)}`;

export const quiz = {
  embed: "https://docs.google.com/forms/d/e/1FAIpQLSf6iufehFU-AdjeEfFxMyKocXxDqKqTWy1MnrdWPemZXrzL9g/viewform?embedded=true",
  label: "Free test",
  title: "Find your project management path",
  note: "A few questions, then a suggested starting point and a personalised action plan.",
};

export const links = {
  bookConsultation: `mailto:${email}?subject=${encodeURIComponent("Free consultation")}`,
  freeTest: "https://forms.gle/TxkwVdmLyNeW5mSYA",
  services: "/services",
  about: "/about",
  contact: "#contact",
} as const;
