"use client";

import { useEffect, useRef } from "react";

type Props = { value: number; prefix?: string; suffix?: string };

const fmt = new Intl.NumberFormat("en-GB");

/** Number reveal: counts from 0 to the value once, when it enters the viewport. Renders the final value without JS. */
export function Counter({ value, prefix = "", suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = fmt.format(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = fmt.format(Math.round(value * eased));
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = final;
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, final]);

  return (
    <>
      {prefix}
      <span ref={ref} className="tnum">
        {final}
      </span>
      {suffix}
    </>
  );
}
