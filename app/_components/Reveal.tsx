"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const tags = { div: motion.div, li: motion.li, p: motion.p, figure: motion.figure, h2: motion.h2, span: motion.span } as const;

type Props = {
  as?: keyof typeof tags;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
  style?: CSSProperties;
  /** Animate on mount rather than on entering the viewport (for above-the-fold content). */
  eager?: boolean;
  children: ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

/** One-shot fade-up on entering the viewport.
 *  Progressive: the server-rendered HTML is fully visible. Once the script runs, only elements still
 *  below the viewport are hidden and armed, so slow connections never see blank sections. */
export function Reveal({ as = "div", delay = 0, y = 18, className, id, style, eager = false, children }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"in" | "out">("in");
  const Tag = tags[as] as typeof motion.div;

  useEffect(() => {
    if (reduce || eager) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.92) setState("out");
  }, [reduce, eager]);

  if (eager) {
    return (
      <Tag
        ref={ref}
        className={className}
        id={id}
        style={style}
        initial={reduce ? false : { opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={className}
      id={id}
      style={style}
      initial={false}
      animate={state}
      variants={{
        out: { opacity: 0, y, transition: { duration: 0 } },
        in: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease } },
      }}
      onViewportEnter={() => setState("in")}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Tag>
  );
}
