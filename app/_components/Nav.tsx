"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import logo from "@/public/fafoni-logo-trimmed.png";
import { brandLine } from "@/app/_content/home";
import { email, links, phone } from "@/app/_content/links";

const items = [
  { href: links.services, label: "Services" },
  { href: links.about, label: "About" },
  { href: links.contact, label: "Contact" },
] as const;

const menuItems = [{ href: "/", label: "Home" }, ...items] as const;

type Props = { ctaHref: string; ctaLabel: string };
const ease = [0.16, 1, 0.3, 1] as const;

/** N10 · transparent bar over the hero that morphs into a floating pill past 80 px. Full-screen menu under 60rem. */
export function Nav({ ctaHref, ctaLabel }: Props) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);
  const inner = pathname !== "/";

  useEffect(() => {
    const THRESHOLD = 80;
    let current = false;
    let ticking = false;
    const update = () => {
      const next = window.scrollY > THRESHOLD;
      if (next !== current) {
        current = next;
        setFloating(next);
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = (href: string) => (href === pathname ? "page" : undefined);
  const close = () => setOpen(false);

  return (
    <>
      <header className={`nav${floating || inner ? " is-floating" : ""}${open ? " is-open" : ""}`}>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <div className="nav__inner">
          <Link href="/" className="nav__brand" aria-label="Fafoni home" onClick={close}>
            <Image src={logo} alt="Fafoni" priority sizes="(min-width: 60rem) 132px, 112px" />
          </Link>
          <nav className="nav__links" aria-label="Primary">
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav__link" aria-current={current(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn--accent nav__cta" href={ctaHref}>
            {ctaLabel}
          </a>
          <Link href={links.services} className="nav__quick" aria-current={current(links.services)}>
            Services
          </Link>
          <button
            type="button"
            className="nav__menu"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__menu-bars" aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            className="menu grain"
            key="menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease }}
          >
            <nav className="wrap menu__inner" aria-label="Primary, mobile">
              <ul className="menu__list">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease }}
                  >
                    <span className="menu__n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link href={item.href} className="menu__link" aria-current={current(item.href)} onClick={close}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="menu__foot"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease }}
              >
                <a className="btn btn--accent btn--lg" href={ctaHref} onClick={close}>
                  {ctaLabel}
                </a>
                <a className="menu__mail" href={`mailto:${email}`}>
                  {email}
                </a>
                <a className="menu__mail" href={phone.href}>
                  {phone.display}
                </a>
                <p className="menu__line">{brandLine}</p>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
