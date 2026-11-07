/** The five products from "Products - description.pdf" (client, Sep 2026). Ace your PM exam leads.
 *  Prices are deliberately not published (client decision, 12 Sep 2026).
 *  Client-editable text lives in ./data/products.json (Pages CMS); the order there is the order on the page. */
import data from "./data/products.json";
import services from "./data/services.json";
import { list, opt, str } from "./cms";

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

/** A stable id for anchors. Falls back to the name if the CMS left it blank. */
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const products: readonly Product[] = list(data.products).map((p) => ({
  id: opt(p.id) ?? slug(str(p.name)),
  name: str(p.name),
  short: str(p.short),
  duration: str(p.duration),
  target: str(p.target),
  line: str(p.line),
  includes: list(p.includes).map(str).filter(Boolean),
  badge: opt(p.badge),
}));

export const buyLabel = str(services.buyLabel);
export const enquireLabel = str(services.enquireLabel);
