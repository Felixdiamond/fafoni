/** Home page copy. Source of truth: content/source-content.md (client transcription). */

export const brandLine = "Skills · Careers · Global Opportunities";
export const tagline = "Skills. Careers. Global Opportunities.";

export const hero = {
  title: "Get qualified, land your dream job in project management and earn €50k–€100k a year with ease",
  lede:
    "Get certified, build in-demand skills and gain the qualifications employers are looking for, and take your career global with visa sponsorship opportunities.",
  primary: "Book a free consultation",
  secondary: "Take a free test",
};

/** T4 stat strip under the hero. All figures are the client's. */
export const strip = {
  sign: "In-demand skills. Global opportunities.",
  cells: [
    { figure: { prefix: "£", from: 50000, to: 100000 }, label: "UK project manager average salary, per year" },
    { figure: { prefix: "£", value: 38700, suffix: "+" }, label: "Skilled Worker visa threshold. Many project management roles meet it, which makes sponsorship possible." },
    { figure: { text: "Visa sponsorship opportunities" }, label: "Skilled Worker visa and Global Talent opportunities with UK employers who sponsor project professionals, so you can build your career and stay." },
  ],
} as const;

export const proof = {
  salary: {
    label: "UK project manager average salary",
    figure: "£45,000–£70,000",
    unit: "per year",
  },
  visa: {
    label: "Visa sponsorship",
    body:
      "Many project management roles offer salaries that meet the UK Skilled Worker visa threshold (£38,700+), making visa sponsorship possible.",
  },
  route: {
    label: "The route",
    items: [
      "Tier 2 Skilled Worker Visa",
      "Top UK employers actively hiring",
      "Fast-track your career and stay",
    ],
  },
  sign: "In-demand skills. Global opportunities.",
};

export const certifications = {
  title: "Get certified. Stand out.",
  body:
    "Gain globally recognised certifications like PMP®, PRINCE2®, CAPM® and more. Build credibility, boost your CV and open doors to better opportunities.",
  cta: "Explore certification options",
  list: [
    { name: "PMP", registered: true },
    { name: "PRINCE2", registered: true },
    { name: "CAPM", registered: true },
    { name: "Agile", registered: false },
    { name: "PMI-ACP", registered: true },
    { name: "Scrum", registered: false },
    { name: "ITIL", registered: true },
  ],
};

export const why = {
  title: "Why choose Fafoni",
  body:
    "Fafoni is a global project management and career development ecosystem, bringing together experienced project managers, industry experts and a strong network of professionals to help individuals, businesses and organisations achieve their goals.",
  tiles: [
    { title: "Global opportunities", body: "Work in top industries with visa sponsorship pathways.", tone: "photo-tall" },
    { title: "Industry-relevant training", body: "Practical, up-to-date and job-focused.", tone: "plate" },
    { title: "Expert guidance", body: "Support from experienced project management professionals.", tone: "plate" },
    { title: "Flexible learning", body: "Study at your pace, anywhere, anytime.", tone: "photo" },
    { title: "Career support", body: "CV help, interview prep and job guidance.", tone: "accent" },
  ] as const,
};

export const industries = {
  title: "Many industries. Endless opportunities.",
  body: "From startups to global corporations, project managers are the backbone of progress.",
  cta: "Explore our services",
  list: [
    "IT & Technology",
    "Finance & Banking",
    "Healthcare",
    "Construction & Infrastructure",
    "Government & Public Sector",
    "Manufacturing",
    "Consulting",
  ],
};

export const stories = {
  title: "Real people. Real progress.",
  body:
    "Hear from our learners who secured certifications, gained new skills and landed dream roles with visa sponsorship.",
  items: [
    {
      quote:
        "The PMP prep programme gave me the confidence and skills I needed. Within three weeks of getting certified, I was receiving interview invitations from UK employers.",
      name: "Adaeze T.",
      role: "Project Manager, UK",
    },
    {
      quote:
        "The support and resources were excellent. I got certified and secured a role with visa sponsorship in two months.",
      name: "Emmanuel K.",
      role: "Project Coordinator, UK",
    },
    {
      quote:
        "Fafoni made the whole process simple and stress-free. The coaching, practice exams and guidance were exactly what I needed.",
      name: "Blessing A.",
      role: "Assistant Project Manager, UK",
    },
  ],
};

export const closing = {
  statement: "Your goals. Our mission.",
  body: "Find out which project management path is right for you and get a personalised action plan.",
  contactLabel: "Contact",
  contactBody: "Questions about certification, careers or sponsorship routes? Write to us.",
};
