"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

type Props = { title: string; lead: string; words: readonly string[]; body: string };

/** About opening: the page pins while the four accent words take turns, then the body line lands. */
export function AboutHero({ title, lead, words, body }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();
    const call = gsap.delayedCall(0.1, () => {
      mm.add("(min-width: 60rem)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".ahero__word", el);
        const bodyEl = el.querySelector<HTMLElement>(".ahero__body");
        const bar = el.querySelector<HTMLElement>(".ahero__bar");
        if (!items.length || !bodyEl) return;
        gsap.set(items.slice(1), { yPercent: 110, opacity: 0 });
        gsap.set(bodyEl, { opacity: 0, y: 24 });
        // The first word arrives on load; the rest are driven by scroll.
        gsap.from(items[0], { yPercent: 110, opacity: 0, duration: 1.1, delay: 0.5, ease: "power4.out" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => `+=${items.length * 75}%`,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        items.forEach((word, i) => {
          if (i > 0) tl.to(word, { yPercent: 0, opacity: 1, duration: 1 }, i * 3 - 0.6);
          if (i < items.length - 1) tl.to(word, { yPercent: -110, opacity: 0, duration: 1 }, i * 3 + 2);
        });
        tl.to(bodyEl, { opacity: 1, y: 0, duration: 1.2 }, (items.length - 1) * 3 + 0.6);
        ScrollTrigger.refresh();
        return () => tl.scrollTrigger?.kill();
      });
    });
    // Phones: no pin; the words take turns on a timer, masked the same way.
    mm.add("(max-width: 59.99rem)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".ahero__word", el);
      if (items.length < 2) return;
      gsap.set(items, { yPercent: 110, opacity: 0 });
      const tl = gsap.timeline({ repeat: -1, delay: 0.6 });
      items.forEach((word, i) => {
        tl.to(word, { yPercent: 0, opacity: 1, duration: 0.7, ease: "power4.out" }, i * 2.6)
          .to(word, { yPercent: -110, opacity: 0, duration: 0.55, ease: "power3.in" }, i * 2.6 + 2.1);
      });
      return () => tl.kill();
    });
    return () => {
      call.kill();
      mm.revert();
    };
  }, []);

  return (
    <section ref={ref} className="ahero grain" aria-labelledby="hero-title">
      <div className="wrap ahero__grid">
        <div className="ahero__text">
          <h1 id="hero-title" data-split>
            {title}
          </h1>
          <Reveal as="p" className="ahero__lead" delay={0.5}>
            {lead}
          </Reveal>
        </div>
        <div className="ahero__stage" aria-label={words.join(", ")}>
          <div className="ahero__words" aria-hidden="true">
            {words.map((w) => (
              <span key={w} className="ahero__word">
                {w}.
              </span>
            ))}
          </div>
          <p className="ahero__body">{body}</p>
          <span className="ahero__track" aria-hidden="true">
            <span className="ahero__bar" />
          </span>
        </div>
      </div>
    </section>
  );
}
