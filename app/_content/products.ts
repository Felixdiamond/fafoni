/** The five products from "Products - description.pdf" (client, Sep 2026). Ace your PM exam leads.
 *  Prices are deliberately not published (client decision, 12 Sep 2026). */

export type Product = {
  readonly id: string;
  readonly name: string;
  readonly short: string;
  readonly duration: string;
  readonly target: string;
  readonly line: string;
  readonly includes: readonly string[];
  readonly badge?: string;
};

export const products: readonly Product[] = [
  {
    id: "ace-your-exam",
    name: "Ace your PM exam",
    short: "Ace your exam",
    duration: "8 weeks",
    target: "Project managers with some training or experience who want to get certified.",
    line: "Prepare. Practise. Pass with confidence.",
    badge: "Start here",
    includes: [
      "Five hours of live, instructor-led sessions",
      "Exam curriculum with a study plan",
      "Digital learning materials, guides and past questions",
      "Mock examinations",
      "Recording access for revision",
    ],
  },
  {
    id: "programme",
    name: "Private Project Management Programme",
    short: "Private programme",
    duration: "12 weeks",
    target: "Anyone who wants to become a capable, career-ready project professional.",
    line: "From knowing nothing to becoming an exceptional project manager.",
    includes: [
      "Project management fundamentals, A to Z",
      "Practical project management simulations",
      "Private mentorship sessions",
      "Personal development plan",
      "CV and supporting statement development",
      "LinkedIn optimisation",
      "Interview preparation",
      "Job-search and application strategy",
    ],
  },
  {
    id: "internship",
    name: "PM Internship Experience",
    short: "Internship experience",
    duration: "8 weeks",
    target: "People who know the theory but have no practical experience yet.",
    line: "Real project delivery, on your CV.",
    includes: [
      "End-to-end templates",
      "Refresher lifecycle training",
      "Live steering committee and script support",
      "Live product deployment",
    ],
  },
  {
    id: "starter",
    name: "Project Management Starter",
    short: "Starter kit",
    duration: "Immediate access",
    target: "Complete beginners.",
    line: "Your first step into project management.",
    includes: [
      "Beginner project management guide and roadmap",
      "Project management newbie glossary",
      "The Skilled Project Manager ebook",
    ],
  },
  {
    id: "for-business",
    name: "Fafoni for Business",
    short: "For business",
    duration: "Scoped with you",
    target: "Businesses that want to upskill a team and improve project and operations delivery.",
    line: "Build stronger teams. Deliver better results.",
    includes: [
      "Project management fundamentals",
      "Project planning and delivery",
      "Risk management",
      "Stakeholder management",
      "Leadership",
      "Operations",
      "Change management",
      "Agile and hybrid project management",
      "Project team development",
    ],
  },
];

export const buyLabel = "Book a free consultation";
export const enquireLabel = "Enquire";
