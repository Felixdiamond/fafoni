import type { Metadata } from "next";
import Image from "next/image";
import manPhoto from "@/public/photos/pexels-13801809.jpg";
import teamPhoto from "@/public/photos/pexels-30688593.jpg";
import { AboutHero } from "../_components/AboutHero";
import { Closing } from "../_components/Closing";
import { Expand } from "../_components/Expand";
import { Reveal } from "../_components/Reveal";
import { ValuesFill } from "../_components/ValuesFill";
import { aboutClosing, aboutHero, purpose, support, values, who } from "../_content/about";
import { hero } from "../_content/home";
import { links } from "../_content/links";

export const metadata: Metadata = {
  title: "About",
  description: aboutHero.lead,
};

export default function AboutPage() {
  return (
    <main id="content">
      <AboutHero title={aboutHero.title} lead={aboutHero.lead} words={aboutHero.words} body={aboutHero.body} />

      {/* Who we are · statement, photograph band, three pillars */}
      <section className="who" aria-labelledby="who-title">
        <div className="wrap who__head">
          <h2 id="who-title" data-split>
            {who.title}
          </h2>
          <Reveal as="p" delay={0.2}>
            {who.body}
          </Reveal>
        </div>
        <Expand className="who__band">
          <Image src={teamPhoto} alt="Four project managers in conversation at a workplace" sizes="100vw" placeholder="blur" />
        </Expand>
        <div className="who__strip">
          <ul className="wrap who__pillars">
            {who.pillars.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 0.1}>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Purpose · navy, the four verbs */}
      <section className="purpose" aria-labelledby="purpose-title">
        <div className="wrap purpose__grid">
          <div className="purpose__text">
            <p className="label">Our purpose</p>
            <h2 id="purpose-title" data-split>
              {purpose.title}
            </h2>
            <Reveal as="p" delay={0.2}>
              {purpose.body}
            </Reveal>
          </div>
          <ul className="purpose__verbs">
            {purpose.verbs.map((v, i) => (
              <Reveal as="li" key={v.verb} delay={0.15 + i * 0.1}>
                <span className="purpose__verb">{v.verb}</span>
                <span className="purpose__what">{v.what}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Values and who we support · ivory */}
      <section className="values grain" aria-labelledby="values-title">
        <div className="wrap values__grid">
          <div className="values__text">
            <h2 id="values-title" data-split>
              {values.title}
            </h2>
            <Reveal as="p" delay={0.2}>
              {values.body}
            </Reveal>
          </div>
          <ValuesFill words={values.words} label="Our values" />
          <div className="values__support">
            <h3 id="support-title" className="values__support-title">
              {support.title}
            </h3>
            <dl className="support">
              {support.rows.map((r, i) => (
                <Reveal as="div" key={r.who} className="support__row" delay={i * 0.08} y={12}>
                  <dt>{r.who}</dt>
                  <dd>{r.what}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Closing
        photo={manPhoto}
        statement={aboutClosing.statement}
        body={aboutClosing.body}
        primary={{ label: hero.primary, href: links.bookConsultation }}
        secondary={{ label: hero.secondary, href: links.freeTest }}
      />
    </main>
  );
}
