/** Destinations for the two conversion actions and contact.
 *  Both actions go to the client's Tally form (client decision, 13 Sep 2026): "Take a free test" opens it
 *  in the modal (links marked data-quiz); "Book a free consultation" and "Enquire" link to it directly.
 *  The Google Form quiz built earlier is unused: docs.google.com/forms/d/e/1FAIpQLSf6iufehFU-AdjeEfFxMyKocXxDqKqTWy1MnrdWPemZXrzL9g/viewform */
export const email = "hello@fafoni.com";
export const phone = { display: "+44 7459 627496", href: "tel:+447459627496" };

const tallyForm = "https://tally.so/r/1ALAA4";

/** Enquiry form with the product name prefilled (Tally hidden field "product"). */
export const enquiryLink = (about: string) => `${tallyForm}?product=${encodeURIComponent(about)}`;

export const quiz = {
  embed: "https://tally.so/embed/1ALAA4?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
  label: "Free test",
  title: "Find your project management path",
  note: "Tell us which programme interests you and when you're free, and we'll get back to you.",
};

export const links = {
  bookConsultation: tallyForm,
  freeTest: tallyForm,
  services: "/services",
  about: "/about",
  contact: "#contact",
} as const;
