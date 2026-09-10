"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** A figure that starts inset with rounded corners and grows to full-bleed as it scrolls into view. */
export function Expand({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: window.matchMedia("(min-width: 60rem)").matches ? 0.76 : 0.9, borderRadius: 16 },
        {
          scale: 1,
          borderRadius: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 0.5, invalidateOnRefresh: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={`expand ${className}`}>
      {children}
    </div>
  );
}
