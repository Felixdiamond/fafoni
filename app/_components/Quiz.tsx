"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const KEY = "fafoni.quiz";
const DELAY_MS = 30_000;
/** Pages that never open the modal on a timer (client decision, 12 Sep 2026: not on the home page). */
const NO_AUTO_OPEN = new Set(["/"]);

const remember = (value: string) => {
  try {
    sessionStorage.setItem(KEY, value);
  } catch {}
};
const remembered = () => {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
};

type Props = { src: string; label: string; title: string; note: string };

/** The free-test modal (Google Form). Opens after 30 s on every page except the home page, or from any link marked data-quiz.
 *  Once dismissed it stays away for the rest of the session. Full-screen under 768 px. */
export function Quiz({ src, label, title, note }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const show = useCallback(() => {
    setMounted(true);
    setOpen(true);
    const d = dialog.current;
    if (d && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  // 30 seconds on the page, unless already dismissed this session or the page opts out. ?quiz=now skips the wait for testing.
  useEffect(() => {
    if (remembered()) return;
    if (NO_AUTO_OPEN.has(pathname) && new URLSearchParams(location.search).get("quiz") !== "now") return;
    const wait = new URLSearchParams(location.search).get("quiz") === "now" ? 0 : DELAY_MS;
    const t = setTimeout(() => {
      if (!remembered()) show();
    }, wait);
    return () => clearTimeout(t);
  }, [show, pathname]);

  // Any "Take a free test" link opens the modal instead of leaving the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-quiz]");
      if (!a || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      show();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [show]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  const dismiss = () => {
    remember("dismissed");
    setOpen(false);
    document.documentElement.style.overflow = "";
  };
  // A close event that arrives after the dialog has been reopened is stale; ignore it.
  const onNativeClose = () => {
    if (dialog.current?.open) return;
    dismiss();
  };

  return (
    <dialog
      ref={dialog}
      className="quiz"
      aria-labelledby="quiz-title"
      onClose={onNativeClose}
      onClick={(e) => {
        if (e.target === dialog.current) dismiss();
      }}
    >
      <div className="quiz__panel">
        <header className="quiz__head">
          <div className="quiz__titles">
            <p className="quiz__label">{label}</p>
            <h2 id="quiz-title" className="quiz__title">{title}</h2>
          </div>
          <button type="button" className="quiz__close" onClick={dismiss} aria-label="Close">
            <span aria-hidden="true" />
          </button>
        </header>
        <div className="quiz__body">
          {mounted ? (
            <iframe className="quiz__frame" src={src} title={title} loading="eager" />
          ) : null}
        </div>
        <p className="quiz__note">{note}</p>
      </div>
    </dialog>
  );
}
