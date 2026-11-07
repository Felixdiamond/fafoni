/** Destinations for the two conversion actions and contact. Both open in the site modal so the visitor
 *  can cancel: links marked data-quiz open the free-test form, links marked data-enquiry open the
 *  consultation form (their href's query string, e.g. the product, is passed on to the embed).
 *  Free test = Tally (tally.so/r/xXAXYv). Consultation / enquiry = the client's Google Form
 *  (forms.gle/RReYsSScn91kXe2K6, made public 17 Sep 2026 — the earlier link required sign-in). */
import contact from "./data/contact.json";
import { str } from "./cms";

/** Email and phone are client-editable in Pages CMS (./data/contact.json). The tel: link is derived from the display form. */
export const email = str(contact.email).trim();
const phoneDisplay = str(contact.phone).trim();
export const phone = { display: phoneDisplay, href: `tel:${phoneDisplay.replace(/[^\d+]/g, "")}` };

const enquiryForm = "https://docs.google.com/forms/d/e/1FAIpQLScmSFD8c7267Hu61PdS83KztEDLAvIOU1c5-Bb0bsyhIvw3WQ/viewform";
const quizForm = "https://tally.so/r/xXAXYv";

/** Consultation form with the product folded into its "brief information" question (entry.1215181132). */
export const enquiryLink = (about: string) =>
  `${enquiryForm}?entry.1215181132=${encodeURIComponent(`Interested in: ${about}`)}`;

export type FormKind = "quiz" | "enquiry";
export type FormConfig = { embed: string; label: string; title: string; note: string; done: string };

export const forms: Record<FormKind, FormConfig> = {
  quiz: {
    embed: "https://tally.so/embed/xXAXYv?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    label: "Free test",
    title: "Find your project management path",
    note: "A few quick questions, then a suggested starting point.",
    done: "We’ll be in touch with your results and next steps.",
  },
  enquiry: {
    embed: `${enquiryForm}?embedded=true`,
    label: "Free consultation",
    title: "Book a free consultation",
    note: "A few quick questions about your situation, and we’ll get back to you.",
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
