import type { Product } from "@/app/_content/products";
import { ProductStack } from "./ProductStack";
import { Reveal } from "./Reveal";
import { Route } from "./Route";

type Props = {
  title: string;
  lede: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  stops: readonly { readonly href: string; readonly label: string }[];
  products: readonly Product[];
};

/** Ivory typographic hero: statement top-left, paragraph and actions right, the journey line beneath. */
export function ServicesHero({ title, lede, primary, secondary, stops, products }: Props) {
  return (
    <section className="phero" aria-labelledby="hero-title">
      <div className="wrap phero__grid">
        <div className="phero__text">
          <h1 id="hero-title" data-split>
            {title}
          </h1>
          <div className="phero__aside">
          <Reveal as="p" className="phero__lede" delay={0.5} eager>
            {lede}
          </Reveal>
          <Reveal className="phero__actions" delay={0.65} eager>
            <a className="btn" href={primary.href}>
              {primary.label}
            </a>
            <a className="link-cta" href={secondary.href} data-quiz>
              {secondary.label}{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>
          </div>
        </div>
        <ProductStack items={products} />
        <Route stops={stops} />
      </div>
    </section>
  );
}
