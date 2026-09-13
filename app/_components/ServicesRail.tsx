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
        const segs = gsap.utils.toArray<HTMLElement>(".journey__seg", el);
        const wrap = el.querySelector<HTMLElement>(".journey");
        const title = el.querySelector<HTMLElement>(".journey__title");
        const current = el.querySelector<HTMLElement>(".journey__current");
        const meta = el.querySelector<HTMLElement>(".journey__dur");
        if (!cards.length || !wrap || !title) return;
        let last = -1;
        const setActive = (i: number) => {
          if (i === last) return;
          last = i;
          segs.forEach((seg, j) => seg.classList.toggle("is-done", j <= i));
          segs.forEach((seg, j) => seg.classList.toggle("is-active", j === i));
          const seg = segs[i];
          gsap.timeline()
            .to([title, meta], { opacity: 0, y: -4, duration: 0.18, ease: "power2.in" })
            .add(() => {
              title.textContent = seg.dataset.name ?? "";
              if (meta) meta.textContent = seg.dataset.dur ?? "";
              if (current) current.textContent = String(i + 1).padStart(2, "0");
            })
            .to([title, meta], { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" });
        };
        const triggers = cards.map((card, i) =>
          ScrollTrigger.create({ trigger: card, start: "top 55%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) }),
        );
        // While the strip is stuck to the top, the site nav steps aside so only one bar is up there.
        const root = document.documentElement;
        const hideNav = (on: boolean) => root.toggleAttribute("data-hide-nav", on);
        const navTrigger = ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          endTrigger: el.querySelector<HTMLElement>(".rail__track") ?? el,
          end: "bottom top+=1",
          onEnter: () => hideNav(true),
          onEnterBack: () => hideNav(true),
          onLeave: () => hideNav(false),
          onLeaveBack: () => hideNav(false),
        });
        setActive(0);
        return () => {
          triggers.forEach((t) => t.kill());
          navTrigger.kill();
          hideNav(false);
        };
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
        <div className="journey__meta">
          <span className="journey__count">
            <span className="journey__current">01</span> / {String(products.length).padStart(2, "0")}
          </span>
          <span className="journey__dur">{products[0].duration}</span>
        </div>
        <p className="journey__title">{products[0].name}</p>
        <div className="journey__bar">
          {products.map((p, i) => (
            <a key={p.id} href={`#${p.id}`} className="journey__seg" data-i={i} data-name={p.name} data-dur={p.duration} tabIndex={-1} />
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
                  <span className="rail__dur">{p.duration}</span>
                </p>
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
