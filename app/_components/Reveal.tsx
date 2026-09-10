"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const tags = { div: motion.div, li: motion.li, p: motion.p, figure: motion.figure, h2: motion.h2, span: motion.span } as const;

type Props = {
  as?: keyof typeof tags;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

/** One-shot fade-up when the element enters the viewport (ScrollReveal). */
export function Reveal({ as = "div", delay = 0, y = 18, className, id, style, children }: Props) {
  const reduce = useReducedMotion();
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      id={id}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </Tag>
  );
}
