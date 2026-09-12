"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/app/_content/products";

const ease = [0.16, 1, 0.3, 1] as const;

/** Three product cards fanned on the hero. Hovering (or tapping) spreads them; each links to its section. */
export function ProductStack({ items }: { items: readonly Product[] }) {
  const reduce = useReducedMotion();
  const [spread, setSpread] = useState(false);
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const three = items.slice(0, 3);

  // Phones: the deck deals itself every few seconds while it's on screen; a tap deals the next card.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !window.matchMedia("(max-width: 59.99rem)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const tick = setInterval(() => {
      if (visible && !document.hidden) setOffset((o) => o + 1);
    }, 3600);
    return () => {
      io.disconnect();
      clearInterval(tick);
    };
  }, [reduce]);
  // Top card first in the array, rendered last so it paints on top.
  const layout = [
    { rotate: -7, x: -34, y: 26, scale: 0.94, sx: -120, sy: 40, sr: -9 },
    { rotate: 5, x: 26, y: 12, scale: 0.97, sx: 96, sy: 26, sr: 7 },
    { rotate: -1.5, x: 0, y: 0, scale: 1, sx: 0, sy: -14, sr: 0 },
  ];
  // Slot 2 is the top of the deck. Each card's slot rotates with the offset so the deck deals.
  const n = three.length;
  return (
    <div
      ref={ref}
      className="pstack"
      onPointerEnter={() => setSpread(true)}
      onPointerLeave={() => setSpread(false)}
      onClick={(e) => {
        if (window.matchMedia("(max-width: 59.99rem)").matches) {
          e.preventDefault();
          setOffset((o) => o + 1);
        } else setSpread((s) => !s);
      }}
    >
      {three.map((p, idx) => {
        const slot = (n - 1 - idx + offset) % n;
        const l = layout[slot];
        const top = slot === n - 1;
        return (
          <motion.a
            key={p.id}
            href={`#${p.id}`}
            className={`pcard${top ? " pcard--top" : ""}`}
            initial={reduce ? false : { opacity: 0, y: 60, rotate: 0 }}
            animate={
              spread && !reduce
                ? { opacity: 1, x: l.sx, y: l.sy, rotate: l.sr, scale: 1 }
                : { opacity: 1, x: l.x, y: l.y, rotate: l.rotate, scale: l.scale }
            }
            transition={{ duration: 0.8, delay: reduce || offset > 0 ? 0 : 0.5 + slot * 0.12, ease }}
            style={{ zIndex: slot + 1 }}
          >
            {p.badge ? <span className="pcard__badge">{p.badge}</span> : null}
            <span className="pcard__name">{p.name}</span>
            <span className="pcard__line">{p.line}</span>
            <span className="pcard__meta">
              <span className="pcard__price">{p.price}</span>
              <span className="pcard__dur">{p.duration}</span>
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
