/** Services page copy. Source of truth: content/source-content.md.
 *  Client-editable text lives in ./data/services.json (Pages CMS). */
import data from "./data/services.json";
import { str } from "./cms";

export const servicesHero = {
  title: str(data.hero.title),
  lede: str(data.hero.lede),
};

export const servicesIntro = str(data.intro);

export const comingSoon = {
  title: str(data.comingSoon.title),
  body: str(data.comingSoon.body),
};
