import type { Metadata } from "next";
import closingPhoto from "@/public/photos/closing-team.jpg";
import { Closing } from "../_components/Closing";
import { ServicesHero } from "../_components/ServicesHero";
import { Reveal } from "../_components/Reveal";
import { ServicesRail } from "../_components/ServicesRail";
import { Stories } from "../_components/Stories";
import { withPortraits } from "../_content/portraits";
import { Numbers } from "../_components/Numbers";
import { closing, hero, stories } from "../_content/home";
import { comingSoon, servicesHero, servicesIntro } from "../_content/services";
import { enquiryLink, links } from "../_content/links";
import { buyLabel, enquireLabel, products } from "../_content/products";

export const metadata: Metadata = {
  title: "Services",
  description: servicesHero.lede,
};

export default function ServicesPage() {
  return (
    <main id="content">
      <ServicesHero
        title={servicesHero.title}
        lede={servicesHero.lede}
        primary={{ label: hero.primary, href: links.bookConsultation }}
        secondary={{ label: hero.secondary, href: links.freeTest }}
        stops={products.map((p) => ({ href: `#${p.id}`, label: p.name }))}
        products={products}
      />

      <ServicesRail
        title={servicesIntro}
        products={products.map((p) => ({ ...p, href: links.bookConsultation, enquiry: enquiryLink(p.name) }))}
        buyLabel={buyLabel}
        enquireLabel={enquireLabel}
      />

      <Numbers />

      {/* Success stories · same three, same carousel on phones */}
      <section className="band-paper" aria-labelledby="stories-title">
        <div className="wrap stories">
          <div className="stories__pin">
            <div className="sec__head sec__head--tight">
              <h2 id="stories-title" data-split>{stories.title}</h2>
              <Reveal as="p" delay={0.2}>{stories.body}</Reveal>
            </div>
          </div>
          <Stories items={withPortraits(stories.items)} />
        </div>
      </section>

      {/* Coming soon · giant slow marquee on navy */}
      <section className="soon" aria-labelledby="soon-title">
        <h2 id="soon-title" className="sr-only">
          {comingSoon.title}
        </h2>
        <div className="marquee marquee--plate" aria-hidden="true">
          {[false, true].map((clone) => (
            <ul className="marquee__track marquee__track--slow" key={clone ? "clone" : "track"}>
              {[0, 1, 2].map((n) => (
                <li key={n}>{comingSoon.title}</li>
              ))}
            </ul>
          ))}
        </div>
        <div className="wrap soon__row">
          <Reveal as="p" className="soon__body">
            {comingSoon.body}
          </Reveal>
        </div>
      </section>

      <Closing
        photo={closingPhoto}
        statement={closing.statement}
        body={closing.body}
        primary={{ label: hero.primary, href: links.bookConsultation }}
        secondary={{ label: hero.secondary, href: links.freeTest }}
      />
    </main>
  );
}
