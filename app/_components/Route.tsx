"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stop = { readonly href: string; readonly label: string };

/** The journey line (desktop): a rule with numbered stops, drawn on when the page arrives. On phones the journey lives in the rail. */
export function Route({ stops }: { stops: readonly Stop[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    const outer = wrap.current;
    if (!el || !outer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ delay: 0.6, defaults: { ease: "power3.out" } });
      intro
        .fromTo(".route__line", { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 1.4, ease: "power4.inOut" })
        .fromTo(".route__dot", { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.12 }, 0.5)
        .fromTo(".route__label", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12 }, 0.65);

    }, outer);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="route-wrap">
      <ol ref={ref} className="route" aria-label="On this page">
        <span className="route__line" aria-hidden="true" />
        {stops.map((stop, i) => (
          <li key={stop.href} className="route__stop">
            <a href={stop.href} className="route__link">
              <span className="route__dot" aria-hidden="true" />
              <span className="route__label">
                <span className="route__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {stop.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
