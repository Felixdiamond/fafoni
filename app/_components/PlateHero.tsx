"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  title: string;
  lede: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  index?: readonly { href: string; label: string }[];
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Typographic hero on the navy plate for pages without media. Same shape as the home hero, same word blur-in. */
export function PlateHero({ title, lede, primary, secondary, index }: Props) {
  const reduce = useReducedMotion();
  const words = title.split(" ");
  const wordDelay = 0.25;
  return (
    <section className="hero hero--plate grain" aria-labelledby="hero-title">
      <div className="wrap hero__body hero__body--index">
        <div className="hero__text">
        <h1 id="hero-title" aria-label={title}>
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="hero__word"
              aria-hidden="true"
              initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: wordDelay + i * 0.06, ease }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="lede"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: wordDelay + words.length * 0.06, ease }}
        >
          {lede}
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: wordDelay + 0.15 + words.length * 0.06, ease }}
        >
          <a className="btn btn--accent" href={primary.href}>
            {primary.label}
          </a>
          <a className="link-cta link-cta--plate" href={secondary.href} data-quiz>
            {secondary.label}{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>
        </div>
        {index ? (
          <motion.ol
            className="hero__index"
            aria-label="On this page"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {index.map((item, i) => (
              <motion.li
                key={item.href}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1 + i * 0.08, ease }}
              >
                <a href={item.href} className="hero__index-link">
                  <span className="hero__index-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </a>
              </motion.li>
            ))}
          </motion.ol>
        ) : null}
      </div>
    </section>
  );
}
