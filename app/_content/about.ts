/** About page copy. Source of truth: content/source-content.md.
 *  Client-editable text lives in ./data/about.json (Pages CMS). This file shapes it for the components. */
import data from "./data/about.json";
import { list, str } from "./cms";

export const aboutHero = {
  title: str(data.hero.title),
  lead: str(data.hero.lead),
  words: list(data.hero.words).map(str),
  body: str(data.hero.body),
};

export const who = {
  title: str(data.who.title),
  roles: list(data.who.roles).map(str),
  body: str(data.who.body),
  pillars: list(data.who.pillars).map((p) => ({ name: str(p.name), body: str(p.body) })),
};

export const purpose = {
  title: str(data.purpose.title),
  body: str(data.purpose.body),
  verbs: list(data.purpose.verbs).map((v) => ({ verb: str(v.verb), what: str(v.what) })),
};

export const values = {
  title: str(data.values.title),
  body: str(data.values.body),
  words: list(data.values.words).map(str),
};

export const support = {
  title: str(data.support.title),
  rows: list(data.support.rows).map((r) => ({ who: str(r.who), what: str(r.what) })),
};

export const aboutClosing = {
  statement: str(data.closing.statement),
  body: str(data.closing.body),
};
