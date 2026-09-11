import type { Metadata } from "next";
import manPhoto from "@/public/photos/pexels-13801809.jpg";
import laptopPhoto from "@/public/photos/pexels-9429373.jpg";
import { Closing } from "../_components/Closing";
import { ServicesHero } from "../_components/ServicesHero";
import { Reveal } from "../_components/Reveal";
import { ServicesRail } from "../_components/ServicesRail";
import { closing, hero } from "../_content/home";
import { comingSoon, enquire, services, servicesHero, servicesIntro } from "../_content/services";
import { enquiryLink, links } from "../_content/links";
import { products } from "../_content/products";

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
        services={services.map((s) => ({ ...s, href: enquiryLink(s.name) }))}
        photo={laptopPhoto}
        enquire={enquire}
      />

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
        photo={manPhoto}
        statement={closing.statement}
        body={closing.body}
        primary={{ label: hero.primary, href: links.bookConsultation }}
        secondary={{ label: hero.secondary, href: links.freeTest }}
      />
    </main>
  );
}
