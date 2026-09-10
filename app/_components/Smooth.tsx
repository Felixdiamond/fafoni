"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

/** GSAP layer: inertial scrolling (ScrollSmoother), line-masked heading reveals, velocity skew on the marquee,
 *  pinned story heading, scrubbed closing. Native scroll and instant reveals under reduced motion. */
export function Smooth({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // ?smooth=force is a debug switch for headless checks (touch devices scroll natively otherwise).
      const forceTouch = new URLSearchParams(location.search).get("smooth") === "force";
      const smoother = reduce
        ? null
        : ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.1, effects: true, smoothTouch: forceTouch ? 1.1 : false });

      // Headings: split into masked lines that rise in once.
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (reduce) {
          el.style.visibility = "visible";
          return;
        }
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(el, { visibility: "visible" });
            const scrub = el.dataset.split === "scrub";
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1,
              stagger: 0.09,
              ease: "power4.out",
              scrollTrigger: scrub
                ? { trigger: el, start: "top 90%", end: "top 45%", scrub: 0.6 }
                : { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      });

      // Marquee: skew with scroll velocity.
      const track = document.querySelectorAll(".marquee__track");
      if (track.length && !reduce) {
        const proxy = { skew: 0 };
        const setter = gsap.quickSetter(track, "skewX", "deg");
        const clamp = gsap.utils.clamp(-8, 8);
        ScrollTrigger.create({
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -250);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, { skew: 0, duration: 0.7, ease: "power3", overwrite: true, onUpdate: () => setter(proxy.skew) });
            }
          },
        });
      }

      // Stories: pin the heading beside the scrolling quotes on desktop.
      ScrollTrigger.matchMedia({
        "(min-width: 60rem)": () => {
          const pin = document.querySelector<HTMLElement>(".stories__pin");
          const list = document.querySelector<HTMLElement>(".stories__list");
          if (!pin || !list) return;
          ScrollTrigger.create({
            trigger: pin,
            start: "top 128px",
            endTrigger: list,
            end: () => `bottom ${pin.offsetHeight + 128}px`,
            pin: true,
            pinSpacing: false,
          });
        },
      });

      // In-page anchors go through the smoother.
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
        if (!a) return;
        const url = new URL(a.href, location.href);
        if (url.pathname !== location.pathname || !url.hash) return;
        const target = document.querySelector(url.hash);
        if (!target) return;
        e.preventDefault();
        if (smoother) smoother.scrollTo(target, true, "top 96px");
        else target.scrollIntoView({ behavior: "smooth" });
      };
      document.addEventListener("click", onClick);

      // Arriving with a hash (e.g. /services#ace-your-exam): scroll there once layout has settled.
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
          setTimeout(() => {
            ScrollTrigger.refresh();
            if (smoother) smoother.scrollTo(target, false, "top 96px");
            else target.scrollIntoView();
          }, 350);
        }
      }
      return () => document.removeEventListener("click", onClick);
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
