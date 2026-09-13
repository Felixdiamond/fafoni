"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/app/_content/products";

const ease = [0.16, 1, 0.3, 1] as const;

const PHONE = "(max-width: 59.99rem)";

/** Three product cards fanned on the hero. Desktop: hovering (or clicking) spreads them; each links to its section.
 *  Phones: the deck deals itself every few seconds; a tap deals the next card and a swipe deals in either direction. */
export function ProductStack({ items }: { items: readonly Product[] }) {
  const reduce = useReducedMotion();
  const [spread, setSpread] = useState(false);
  const [offset, setOffset] = useState(0);
  const [phone, setPhone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const three = items.slice(0, 3);
  const n = three.length;
  // Swiping left deals the top card away; swiping right brings the previous one back.
  const deal = (dir: 1 | -1) => setOffset((o) => (o + n + dir) % n);

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Phones: the deck deals itself every few seconds while it's on screen; a tap deals the next card.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !window.matchMedia(PHONE).matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0.4,
    });
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
  return (
    <div
      ref={ref}
      className="pstack"
      onPointerEnter={() => setSpread(true)}
      onPointerLeave={() => setSpread(false)}
      onClick={(e) => {
        if (window.matchMedia(PHONE).matches) {
          e.preventDefault();
          // The click that follows a swipe is not a tap.
          if (dragged.current) return;
          deal(1);
        } else setSpread((s) => !s);
      }}
    >
      {three.map((p, idx) => {
        const slot = (n - 1 - idx + offset) % n;
        const l = layout[slot];
        const top = slot === n - 1;
        return (
          <motion.div
            key={p.id}
            className="pcard__slot"
            style={{ zIndex: slot + 1 }}
            drag={phone && top && !reduce ? "x" : false}
            dragSnapToOrigin
            dragElastic={0.7}
            dragMomentum={false}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={(_, info) => {
              const far =
                Math.abs(info.offset.x) > 48 || Math.abs(info.velocity.x) > 400;
              if (far) deal(info.offset.x < 0 ? 1 : -1);
              // Clear after the click that a released drag may fire.
              setTimeout(() => (dragged.current = false), 0);
            }}
          >
            <motion.a
              href={`#${p.id}`}
              className={`pcard${top ? " pcard--top" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 60, rotate: 0 }}
              animate={
                spread && !reduce
                  ? { opacity: 1, x: l.sx, y: l.sy, rotate: l.sr, scale: 1 }
                  : {
                      opacity: 1,
                      x: l.x,
                      y: l.y,
                      rotate: l.rotate,
                      scale: l.scale,
                    }
              }
              transition={{
                duration: 0.8,
                delay: reduce || offset > 0 ? 0 : 0.5 + slot * 0.12,
                ease,
              }}
            >
              {p.badge ? <span className="pcard__badge">{p.badge}</span> : null}
              <span className="pcard__name">{p.name}</span>
              <span className="pcard__line">{p.line}</span>
              <span className="pcard__meta">
                <span className="pcard__dur">{p.duration}</span>
              </span>
            </motion.a>
          </motion.div>
        );
      })}
    </div>
  );
}
