/** Destinations for the two conversion actions and contact. Both are Tally forms from the client (13 Sep 2026):
 *  "Take a free test" opens the quiz form in the modal (links marked data-quiz);
 *  "Book a free consultation" and "Enquire" link to the enquiry form directly. */
export const email = "hello@fafoni.com";
export const phone = { display: "+44 7459 627496", href: "tel:+447459627496" };

const enquiryForm = "https://tally.so/r/1ALAA4";
const quizForm = "https://tally.so/r/xXAXYv";

/** Enquiry form with the product name prefilled (Tally hidden field "product"). */
export const enquiryLink = (about: string) => `${enquiryForm}?product=${encodeURIComponent(about)}`;

export const quiz = {
  embed: "https://tally.so/embed/xXAXYv?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
  label: "Free test",
  title: "Find your project management path",
  note: "A few quick questions, then a suggested starting point.",
};

export const links = {
  bookConsultation: enquiryForm,
  freeTest: quizForm,
  services: "/services",
  about: "/about",
  contact: "#contact",
} as const;
