"use client";

import gsap from "gsap";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

export type Story = {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly photo?: StaticImageData;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase();

/** Testimonials. Desktop: pinned heading + list. Phones: snap carousel that advances on its own until touched. */
export function Stories({ items }: { items: readonly Story[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const paused = useRef(false);
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track the active card from scroll position (phones only; on desktop the rail doesn't scroll).
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        const x = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        cards.forEach((c, i) => {
          if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - x) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - x)) best = i;
        });
        activeRef.current = best;
        setActive(best);
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance on phones every 5 s; a touch pauses it, and it resumes after 7 s of quiet.
  // The move is a tween of scrollLeft with snapping switched off for its duration: Safari ignores or
  // fights smooth scrollTo() inside a mandatory-snap container, which is why the old version stood still on iPhones.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const mobile = window.matchMedia("(max-width: 59.99rem)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mobile.matches || reduce) return;
    let tween: gsap.core.Tween | null = null;
    const settle = () => {
      tween?.kill();
      tween = null;
      el.style.scrollSnapType = "";
    };
    const pause = () => {
      settle();
      paused.current = true;
      if (resume.current) clearTimeout(resume.current);
      resume.current = setTimeout(() => (paused.current = false), 7000);
    };
    el.addEventListener("pointerdown", pause, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });
    const tick = setInterval(() => {
      if (paused.current || document.hidden || tween) return;
      const cards = Array.from(el.children) as HTMLElement[];
      if (!cards.length) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return; // only while on screen
      const next = cards[(activeRef.current + 1) % cards.length];
      const left = next.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft || "0");
      el.style.scrollSnapType = "none";
      const pos = { x: el.scrollLeft };
      tween = gsap.to(pos, {
        x: left,
        duration: 0.7,
        ease: "power2.inOut",
        onUpdate: () => (el.scrollLeft = pos.x),
        onComplete: settle,
      });
    }, 5000);
    return () => {
      clearInterval(tick);
      settle();
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
      if (resume.current) clearTimeout(resume.current);
    };
  }, []);

  return (
    <div className="stories__list">
      <div className="stories__rail" ref={rail}>
        {items.map((story, i) => (
          <Reveal as="figure" className="story" key={story.name} delay={i * 0.08}>
            {story.photo ? (
              <span className="story__photo" aria-hidden="true">
                <Image src={story.photo} alt="" sizes="(max-width: 60rem) 84vw, 0px" />
              </span>
            ) : null}
            <span className="story__mark" aria-hidden="true">
              “
            </span>
            <blockquote>{story.quote}</blockquote>
            <figcaption className="story__who">
              <span className="story__avatar" aria-hidden={story.photo ? undefined : "true"}>
                {story.photo ? (
                  <Image src={story.photo} alt={story.name} width={56} height={56} sizes="56px" />
                ) : (
                  initials(story.name)
                )}
              </span>
              <span className="story__meta">
                <span className="story__name">{story.name}</span>
                <span className="story__role">{story.role}</span>
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
      <div className="stories__dots" aria-hidden="true">
        {items.map((s, i) => (
          <span key={s.name} className={`stories__dot${i === active ? " is-active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
