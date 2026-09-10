import Link from "next/link";
import manPhoto from "@/public/photos/pexels-13801809.jpg";
import { Bento } from "./_components/Bento";
import { Closing } from "./_components/Closing";
import { Counter } from "./_components/Counter";
import { Hero } from "./_components/Hero";
import { Reveal } from "./_components/Reveal";
import { certifications, closing, hero, industries, stories, strip, why } from "./_content/home";
import { links } from "./_content/links";

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export default function HomePage() {
  return (
    <main id="content">
      <Hero
        video={{ hd: "/video/london-dusk-1080.mp4", sd: "/video/london-dusk-720.mp4", poster: "/video/london-dusk-poster.jpg" }}
        title={hero.title}
        lede={hero.lede}
        primary={{ label: hero.primary, href: links.bookConsultation }}
        secondary={{ label: hero.secondary, href: links.freeTest }}
      />

      {/* T4 stat strip · the client's figures, counting in */}
      <section className="strip" aria-labelledby="strip-title">
        <div className="wrap strip__inner">
          <h2 id="strip-title" className="strip__sign" data-split>
            {strip.sign}
          </h2>
          <dl className="strip__cells">
            {strip.cells.map((cell, i) => (
              <Reveal as="div" className="strip__cell" key={cell.label} delay={0.1 + i * 0.1}>
                <dt className="strip__figure">
                  {"text" in cell.figure ? (
                    cell.figure.text
                  ) : "value" in cell.figure ? (
                    <Counter value={cell.figure.value} prefix={cell.figure.prefix} suffix={cell.figure.suffix} />
                  ) : (
                    <>
                      <Counter value={cell.figure.from} prefix={cell.figure.prefix} />
                      <span className="strip__dash">–</span>
                      <Counter value={cell.figure.to} prefix={cell.figure.prefix} />
                    </>
                  )}
                </dt>
                <dd>{cell.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Certifications · heading row, then the marquee as the section's display line */}
      <section className="certs" aria-labelledby="certs-title">
        <div className="wrap certs__row">
          <h2 id="certs-title" data-split>
            {certifications.title}
          </h2>
          <Reveal className="certs__copy" delay={0.1}>
            <p>{certifications.body}</p>
            <Link className="link-cta" href={`${links.services}#ace-your-exam`}>
              {certifications.cta} <Arrow />
            </Link>
          </Reveal>
        </div>
        <Reveal className="marquee" delay={0.2} y={0}>
          {[false, true].map((clone) => (
            <ul
              className="marquee__track"
              key={clone ? "clone" : "track"}
              aria-hidden={clone ? "true" : undefined}
              aria-label={clone ? undefined : "Certifications we prepare you for"}
            >
              {certifications.list.map((cert) => (
                <li key={cert.name}>
                  {cert.name}
                  {cert.registered ? <sup>®</sup> : null}
                </li>
              ))}
            </ul>
          ))}
        </Reveal>
      </section>

      {/* Why Fafoni · bento on navy */}
      <section className="why grain" aria-labelledby="why-title">
        <div className="wrap">
          <div className="sec__head sec__head--plate">
            <h2 id="why-title" data-split>{why.title}</h2>
            <Reveal as="p" delay={0.2}>{why.body}</Reveal>
          </div>
        </div>
        <div className="wrap why__grid">
          <Bento tiles={why.tiles} />
        </div>
      </section>

      {/* Industries · diptych with index */}
      <section aria-labelledby="industries-title">
        <div className="wrap split">
          <div className="split__text">
            <h2 id="industries-title" data-split>{industries.title}</h2>
            <Reveal as="p" delay={0.2}>{industries.body}</Reveal>
            <Reveal delay={0.3}>
              <Link className="link-cta" href={links.services}>
                {industries.cta} <Arrow />
              </Link>
            </Reveal>
          </div>
          <div className="split__proof">
            <ul className="index" aria-label="Industries served">
              {industries.list.map((name, i) => (
                <Reveal as="li" key={name} delay={i * 0.06} y={12}>
                  <span className="index__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="index__name">{name}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Success stories · T1 */}
      <section aria-labelledby="stories-title">
        <div className="wrap stories">
          <div className="stories__pin">
            <div className="sec__head sec__head--tight">
              <h2 id="stories-title" data-split>{stories.title}</h2>
              <Reveal as="p" delay={0.2}>{stories.body}</Reveal>
            </div>
          </div>
          <div className="stories__list">
            {stories.items.map((story, i) => (
              <Reveal as="figure" className="story" key={story.name} delay={i * 0.08}>
                <blockquote>{story.quote}</blockquote>
                <figcaption className="story__who">
                  <span className="story__name">{story.name}</span>
                  <span className="story__role">{story.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
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
