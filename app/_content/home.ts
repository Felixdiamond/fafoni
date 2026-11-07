/** Home page copy. Source of truth: content/source-content.md (client transcription).
 *  Client-editable text lives in ./data/home.json (Pages CMS). This file shapes it for the components. */
import data from "./data/home.json";
import { list, num, str } from "./cms";

export const brandLine = str(data.brandLine);
export const tagline = str(data.tagline);

export const hero = {
  title: str(data.hero.title),
  lede: str(data.hero.lede),
  primary: str(data.hero.primary),
  secondary: str(data.hero.secondary),
};

type Figure =
  | { readonly prefix: string; readonly from: number; readonly to: number }
  | { readonly prefix: string; readonly value: number; readonly suffix: string }
  | { readonly text: string };

/** T4 stat strip under the hero. All figures are the client's.
 *  In the CMS each cell picks a kind: a range (from–to), a single number, or words. */
const figure = (c: (typeof data.strip.cells)[number]): Figure => {
  if (c.kind === "text") return { text: str(c.text) };
  if (c.kind === "number") return { prefix: str(c.prefix), value: num(c.value), suffix: str(c.suffix) };
  return { prefix: str(c.prefix), from: num(c.from), to: num(c.to) };
};

export const strip = {
  sign: str(data.strip.sign),
  cells: list(data.strip.cells).map((c) => ({ figure: figure(c), label: str(c.label) })),
};

/** Not rendered anywhere at present; kept for reference, not in the CMS. */
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
  title: str(data.certifications.title),
  body: str(data.certifications.body),
  cta: str(data.certifications.cta),
  list: list(data.certifications.list).map((c) => ({ name: str(c.name), registered: c.registered === true })),
};

const tones = ["photo-tall", "plate", "photo", "accent"] as const;
type Tone = (typeof tones)[number];
const tone = (v: unknown): Tone => (tones.includes(v as Tone) ? (v as Tone) : "plate");

export const why = {
  title: str(data.why.title),
  body: str(data.why.body),
  tiles: list(data.why.tiles).map((t) => ({ title: str(t.title), body: str(t.body), tone: tone(t.tone) })),
};

export const industries = {
  title: str(data.industries.title),
  body: str(data.industries.body),
  cta: str(data.industries.cta),
  list: list(data.industries.list).map(str),
};

export const stories = {
  title: str(data.stories.title),
  body: str(data.stories.body),
  items: list(data.stories.items).map((s) => ({
    quote: str(s.quote),
    name: str(s.name),
    role: str(s.role),
    photo: str(s.photo),
  })),
};

export const closing = {
  statement: str(data.closing.statement),
  body: str(data.closing.body),
  contactLabel: str(data.closing.contactLabel),
  contactBody: str(data.closing.contactBody),
};
