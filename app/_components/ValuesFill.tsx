"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The values as outlined type that floods orange, left to right, as each word scrolls through the viewport. */
export function ValuesFill({ words, label }: { words: readonly string[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<HTMLElement>(".vfill__fill").forEach((f) => (f.style.clipPath = "inset(0 0 0 0)"));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".vfill__word", el).forEach((word) => {
        const fill = word.querySelector<HTMLElement>(".vfill__fill");
        if (!fill) return;
        gsap.fromTo(
          fill,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: word, start: "top 88%", end: "top 42%", scrub: 0.4 } },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <ul ref={ref} className="vfill" aria-label={label}>
      {words.map((w) => (
        <li key={w} className="vfill__word">
          <span className="vfill__outline">{w}</span>
          <span className="vfill__fill" aria-hidden="true">
            {w}
          </span>
        </li>
      ))}
    </ul>
  );
}
