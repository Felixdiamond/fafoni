/** Destinations for the two conversion actions and contact. Both are Tally forms from the client (13 Sep 2026)
 *  and both open in the site modal so the visitor can cancel: links marked data-quiz open the quiz,
 *  links marked data-enquiry open the enquiry form (their href's query string, e.g. the product, is passed on). */
export const email = "hello@fafoni.com";
export const phone = { display: "+44 7459 627496", href: "tel:+447459627496" };

const enquiryForm = "https://tally.so/r/1ALAA4";
const quizForm = "https://tally.so/r/xXAXYv";

/** Enquiry form with the product name prefilled (Tally hidden field "product"). */
export const enquiryLink = (about: string) => `${enquiryForm}?product=${encodeURIComponent(about)}`;

const embedOptions = "alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export type FormKind = "quiz" | "enquiry";
export type FormConfig = { embed: string; label: string; title: string; note: string; done: string };

export const forms: Record<FormKind, FormConfig> = {
  quiz: {
    embed: `https://tally.so/embed/xXAXYv?${embedOptions}`,
    label: "Free test",
    title: "Find your project management path",
    note: "A few quick questions, then a suggested starting point.",
    done: "We’ll be in touch with your results and next steps.",
  },
  enquiry: {
    embed: `https://tally.so/embed/1ALAA4?${embedOptions}`,
    label: "Free consultation",
    title: "Book a free consultation",
    note: "Tell us which programme interests you and when you’re free, and we’ll get back to you.",
    done: "We’ll be in touch shortly to arrange a time.",
  },
};

export const links = {
  bookConsultation: enquiryForm,
  freeTest: quizForm,
  services: "/services",
  about: "/about",
  contact: "#contact",
} as const;
