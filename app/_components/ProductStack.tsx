"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Product } from "@/app/_content/products";

const ease = [0.16, 1, 0.3, 1] as const;

/** Three product cards fanned on the hero. Hovering (or tapping) spreads them; each links to its section. */
export function ProductStack({ items }: { items: readonly Product[] }) {
  const reduce = useReducedMotion();
  const [spread, setSpread] = useState(false);
  const three = items.slice(0, 3);
  // Top card first in the array, rendered last so it paints on top.
  const layout = [
    { rotate: -7, x: -34, y: 26, scale: 0.94, sx: -150, sy: 40, sr: -10 },
    { rotate: 5, x: 26, y: 12, scale: 0.97, sx: 150, sy: 20, sr: 8 },
    { rotate: -1.5, x: 0, y: 0, scale: 1, sx: 0, sy: -14, sr: 0 },
  ];
  const order = [three[2], three[1], three[0]];
  return (
    <div
      className="pstack"
      onPointerEnter={() => setSpread(true)}
      onPointerLeave={() => setSpread(false)}
      onClick={() => setSpread((s) => !s)}
    >
      {order.map((p, i) => {
        const l = layout[i];
        const top = i === order.length - 1;
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
            transition={{ duration: 0.9, delay: reduce ? 0 : 0.5 + i * 0.12, ease }}
            style={{ zIndex: i + 1 }}
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
