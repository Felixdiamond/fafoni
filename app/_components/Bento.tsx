"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, type PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import teamPhoto from "@/public/photos/pexels-8117476.jpg";
import laptopPhoto from "@/public/photos/pexels-9429373.jpg";

type Tone = "photo-tall" | "photo" | "plate" | "accent";
type Tile = { readonly title: string; readonly body: string; readonly tone: Tone };

const photos: Record<string, { src: StaticImageData; alt: string }> = {
  "Global opportunities": { src: teamPhoto, alt: "A team planning a project together around a table" },
  "Flexible learning": { src: laptopPhoto, alt: "A woman studying at a laptop at a wooden desk" },
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Phones: as each sticky card slides over the previous one, the one underneath settles back a touch. */
export function stackScale(root: HTMLElement | null, selector: string) {
  if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const mm = gsap.matchMedia();
  mm.add("(max-width: 59.99rem)", () => {
    const cards = gsap.utils.toArray<HTMLElement>(selector, root);
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.94,
        opacity: 0.75,
        ease: "none",
        scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
      });
    });
  });
  return () => mm.revert();
}

/** One tile: spotlight follows the pointer on dark tiles; photo tiles tilt toward it (TiltedCard). */
function TileItem({ tile, index }: { tile: Tile; index: number }) {
  const reduce = useReducedMotion();
  const photo = tile.tone.startsWith("photo") ? photos[tile.title] : undefined;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 22 });

  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (photo && !reduce && e.pointerType === "mouse") {
      ry.set((px - 0.5) * 10);
      rx.set((0.5 - py) * 10);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.li
      className={`tile tile--${tile.tone}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ ...(photo ? { rotateX, rotateY, transformPerspective: 1000 } : {}), "--i": index } as never}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
    >
      {photo ? (
        <Image
          className="tile__photo"
          src={photo.src}
          alt={photo.alt}
          sizes="(min-width: 60rem) 420px, (min-width: 40rem) 50vw, 82vw"
          placeholder="blur"
        />
      ) : null}
      <div className="tile__body">
        <h3>{tile.title}</h3>
        <p>{tile.body}</p>
      </div>
    </motion.li>
  );
}

/** F1 bento · 5 tiles, irregular spans, two photographs, one accent block. */
export function Bento({ tiles }: { tiles: readonly Tile[] }) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => stackScale(ref.current, ".tile"), []);
  return (
    <ul ref={ref} className="bento" role="list">
      {tiles.map((tile, i) => (
        <TileItem key={tile.title} tile={tile} index={i} />
      ))}
    </ul>
  );
}
