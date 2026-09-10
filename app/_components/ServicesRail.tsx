"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stackScale } from "./Bento";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  readonly id: string;
  readonly name: string;
  readonly line: string;
  readonly body: string;
  readonly cite?: string;
  readonly tone: "plate" | "paper" | "photo";
  readonly href: string;
};

type Props = {
  title: string;
  services: readonly Service[];
  photo: StaticImageData;
  enquire: string;
};

/** The journey: pinned horizontal rail on desktop (scroll drives you sideways), stacking cards on phones. */
export function ServicesRail({ title, services, photo, enquire }: Props) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => stackScale(section.current, ".rail__panel"), []);

  // Phones: the journey strip sticks under the nav and slides to whichever card is on top.
  useEffect(() => {
    const el = section.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();
    mm.add("(max-width: 59.99rem)", () => {
      const track = el.querySelector<HTMLElement>(".journey__track");
      const fill = el.querySelector<HTMLElement>(".journey__fill");
      const stops = gsap.utils.toArray<HTMLElement>(".journey__stop", el);
      const cards = gsap.utils.toArray<HTMLElement>(".rail__panel", el);
      if (!track || stops.length === 0) return;
      const go = (i: number) => {
        const stop = stops[i];
        const x = -(stop.offsetLeft - track.parentElement!.clientWidth * 0.12);
        gsap.to(track, { x: Math.min(0, x), duration: 0.7, ease: "power3.out", overwrite: true });
        if (fill) gsap.to(fill, { scaleX: i / Math.max(1, stops.length - 1), duration: 0.7, ease: "power3.out", overwrite: true });
        stops.forEach((s, j) => s.classList.toggle("is-active", j === i));
      };
      go(0);
      const triggers = cards.map((card, i) =>
        ScrollTrigger.create({ trigger: card, start: "top 45%", onEnter: () => go(i), onLeaveBack: () => go(Math.max(0, i - 1)) }),
      );
      return () => triggers.forEach((t) => t.kill());
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const mm = gsap.matchMedia();
    // Deferred so ScrollSmoother (created by the parent) exists first.
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
            trigger: el,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        ScrollTrigger.refresh();
        return () => tween.scrollTrigger?.kill();
      });
    });
    return () => {
      call.kill();
      mm.revert();
    };
  }, []);

  return (
    <section ref={section} className="rail" aria-labelledby="services-title">
      <div className="rail__head wrap">
        <h2 id="services-title" data-split>
          {title}
        </h2>
        <p className="rail__hint" aria-hidden="true">
          01 — 05
        </p>
      </div>
      <div className="journey" aria-hidden="true">
        <div className="journey__viewport">
          <span className="journey__line" />
          <span className="journey__fill" />
          <ol className="journey__track">
            {services.map((s, i) => (
              <li key={s.id} className="journey__stop">
                <span className="journey__dot" />
                <span className="journey__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="journey__name">{s.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <ol className="rail__track">
        {services.map((s, i) => (
          <li
            key={s.id}
            id={s.id}
            className={`rail__panel rail__panel--${s.tone}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            {s.tone === "photo" ? (
              <Image
                className="rail__photo"
                src={photo}
                alt="A woman studying at a laptop at a wooden desk"
                sizes="(min-width: 60rem) 60vw, 100vw"
                placeholder="blur"
              />
            ) : null}
            <span className="rail__n" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="rail__body">
              <h3>{s.name}</h3>
              <p className="rail__line">{s.line}</p>
              <p className="rail__text">
                {s.body}
                {s.cite ? (
                  <>
                    {" "}
                    <cite>{s.cite}</cite>.
                  </>
                ) : null}
              </p>
              <a className={`link-cta${s.tone === "paper" ? "" : " link-cta--plate"}`} href={s.href}>
                {enquire}{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </li>
        ))}
      </ol>
      <div className="rail__progress wrap" aria-hidden="true">
        <span className="rail__progress-bar" />
      </div>
    </section>
  );
}
