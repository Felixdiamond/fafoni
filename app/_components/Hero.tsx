"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  video: { hd: string; sd: string; poster: string };
  title: string;
  lede: string;
  caption: string;
  scroll: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const ease = [0.16, 1, 0.3, 1] as const;

/** H6 photographic fold with a muted looping clip. Media parallaxes; headline blurs in word by word. */
export function Hero({ video, title, lede, caption, scroll, primary, secondary }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const mediaY = useTransform(scrollY, [0, 1000], [0, 260]);
  const mediaScale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const bodyY = useTransform(scrollY, [0, 800], [0, -90]);
  const bodyOpacity = useTransform(scrollY, [0, 700], [1, 0.15]);

  // Respect reduced motion and data saver: hold on the poster instead of playing.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (reduce || nav.connection?.saveData) {
      el.pause();
      el.removeAttribute("autoplay");
    }
  }, [reduce]);

  const words = title.split(" ");
  const wordDelay = 0.35;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <motion.div
        className="hero__media"
        aria-hidden="true"
        style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <video ref={ref} autoPlay muted loop playsInline preload="metadata" poster={video.poster}>
          <source src={video.sd} type="video/mp4" media="(max-width: 47.99rem)" />
          <source src={video.hd} type="video/mp4" />
        </video>
      </motion.div>
      <div className="hero__scrim grain" aria-hidden="true" />

      <motion.div className="wrap hero__body" style={reduce ? undefined : { y: bodyY, opacity: bodyOpacity }}>
        <h1 id="hero-title" aria-label={title}>
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="hero__word"
              aria-hidden="true"
              initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: wordDelay + i * 0.07, ease }}
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
          transition={{ duration: 0.8, delay: wordDelay + words.length * 0.07, ease }}
        >
          {lede}
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: wordDelay + 0.15 + words.length * 0.07, ease }}
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
      </motion.div>

      <motion.p
        className="hero__scroll"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span className="hero__scroll-line" />
        {scroll}
      </motion.p>
      <p className="hero__caption">{caption}</p>
    </section>
  );
}
