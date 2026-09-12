"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/app/_content/products";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  title: string;
  products: readonly (Product & { readonly href: string; readonly enquiry: string })[];
  buyLabel: string;
  enquireLabel: string;
};

/** The products: pinned horizontal rail on desktop; stacking cards with a sticky journey strip on phones. */
export function ServicesRail({ title, products, buyLabel, enquireLabel }: Props) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const mm = gsap.matchMedia();
    const call = gsap.delayedCall(0.1, () => {
      mm.add("(min-width: 60rem)", () => {
        const track = el.querySelector<HTMLElement>(".rail__track");
        const bar = el.querySelector<HTMLElement>(".rail__progress-bar");
        if (!track) return;
        const distance = () => track.scrollWidth - el.clientWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el, pin: true, scrub: 0.8, start: "top top", end: () => `+=${distance()}`,
            invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: (self) => { if (bar) bar.style.transform = `scaleX(${self.progress})`; },
          },
        });
        ScrollTrigger.refresh();
        return () => tween.scrollTrigger?.kill();
      });

      mm.add("(max-width: 59.99rem)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".rail__panel", el);
        const stops = gsap.utils.toArray<HTMLElement>(".journey__stop", el);
        const track = el.querySelector<HTMLElement>(".journey__track");
        const fill = el.querySelector<HTMLElement>(".journey__fill");
        const wrap = el.querySelector<HTMLElement>(".journey");
        if (!cards.length || !track || !wrap) return;
        const setActive = (i: number) => {
          stops.forEach((s, j) => s.classList.toggle("is-active", j === i));
          const stop = stops[i];
          const x = Math.max(0, stop.offsetLeft + stop.offsetWidth / 2 - wrap.clientWidth / 2);
          gsap.to(track, { x: -x, duration: 0.6, ease: "power3.out", overwrite: true });
          if (fill) gsap.to(fill, { scaleX: stops.length > 1 ? i / (stops.length - 1) : 1, duration: 0.6, ease: "power3.out", overwrite: true });
        };
        const triggers = cards.map((card, i) =>
          ScrollTrigger.create({ trigger: card, start: "top 55%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) }),
        );
        setActive(0);
        return () => triggers.forEach((t) => t.kill());
      });
    });
    return () => { call.kill(); mm.revert(); };
  }, []);

  return (
    <section ref={section} className="rail" aria-labelledby="services-title">
      <div className="rail__head wrap">
        <h2 id="services-title" data-split>{title}</h2>
        <p className="rail__hint" aria-hidden="true">01–0{products.length}</p>
      </div>

      <div className="journey" aria-hidden="true">
        <div className="journey__track">
          <span className="journey__line" />
          <span className="journey__fill" />
          {products.map((p, i) => (
            <span key={p.id} className="journey__stop">
              <span className="journey__dot" />
              <span className="journey__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="journey__name">{p.short}</span>
            </span>
          ))}
        </div>
      </div>

      <ol className="rail__track">
        {products.map((p, i) => {
          const featured = Boolean(p.badge);
          return (
            <li key={p.id} id={p.id} className={`rail__panel${featured ? " rail__panel--featured" : ""}`}>
              <div className="rail__body">
                <span className="rail__index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {p.badge ? <span className="rail__badge">{p.badge}</span> : null}
                <h3>{p.name}</h3>
                <p className="rail__line">{p.line}</p>
                <p className="rail__meta">
                  <span className="rail__price">{p.price}</span>
                  <span className="rail__dur">{p.duration}</span>
                </p>
                {p.priceNote ? <p className="rail__note">{p.priceNote}</p> : null}
                <ul className="rail__includes">
                  {p.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="rail__target">
                  <span className="rail__target-label">For</span> {p.target}
                </p>
                <div className="rail__actions">
                  <a className={`btn btn--lg${featured ? " btn--accent" : ""}`} href={p.href}>{buyLabel}</a>
                  <a className={`link-cta${featured ? " link-cta--plate" : ""}`} href={p.enquiry}>
                    {enquireLabel} <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="rail__progress wrap" aria-hidden="true">
        <span className="rail__progress-bar" />
      </div>
    </section>
  );
}
