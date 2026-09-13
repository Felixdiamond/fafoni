/** Destinations for the two conversion actions and contact.
 *  Free test = the client's Google Form quiz; links marked data-quiz open it in the modal.
 *  Enquiry / consultation = the client's Tally "Free enquiry form" (replaces the mailto placeholder). */
export const email = "hello@fafoni.com";
export const phone = { display: "+44 7459 627496", href: "tel:+447459627496" };

const enquiryForm = "https://tally.so/r/1ALAA4";
const freeTestForm = "https://docs.google.com/forms/d/e/1FAIpQLSf6iufehFU-AdjeEfFxMyKocXxDqKqTWy1MnrdWPemZXrzL9g/viewform";

/** Enquiry form with the product name prefilled (Tally hidden field "product"). */
export const enquiryLink = (about: string) => `${enquiryForm}?product=${encodeURIComponent(about)}`;

export const quiz = {
  embed: `${freeTestForm}?embedded=true`,
  label: "Free test",
  title: "Find your project management path",
  note: "A few questions, then a suggested starting point and a personalised action plan.",
};

export const links = {
  bookConsultation: enquiryForm,
  freeTest: freeTestForm,
  services: "/services",
  about: "/about",
  contact: "#contact",
} as const;
