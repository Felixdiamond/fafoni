"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormConfig, FormKind } from "@/app/_content/links";

type Props = { forms: Record<FormKind, FormConfig> };

/** The form modal (the client's Tally forms). Opens only from links marked data-quiz or data-enquiry; there is
 *  no timed pop-up (client decision, 13 Sep 2026). Full-screen under 768 px. */
export function Quiz({ forms }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<FormKind>("quiz");
  const [src, setSrc] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const form = forms[kind];

  const show = useCallback(
    (next: FormKind, query: string) => {
      const embed = forms[next].embed + (query ? "&" + query.replace(/^\?/, "") : "");
      if (embed !== src) setSubmitted(false);
      setKind(next);
      setSrc(embed);
      setOpen(true);
      const d = dialog.current;
      if (d && !d.open) {
        d.showModal();
        document.documentElement.style.overflow = "hidden";
      }
    },
    [forms, src],
  );

  // Free test and consultation / enquiry links open the modal instead of leaving the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-quiz], a[data-enquiry]");
      if (!a || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      show(a.hasAttribute("data-enquiry") ? "enquiry" : "quiz", new URL(a.href).search);
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
    setOpen(false);
    document.documentElement.style.overflow = "";
  };
  // A close event that arrives after the dialog has been reopened is stale; ignore it.
  const onNativeClose = () => {
    if (dialog.current?.open) return;
    dismiss();
  };

  // Tally tells the parent page when a form is submitted.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://tally.so") return;
      if (typeof e.data !== "string" || !e.data.includes("Tally.FormSubmitted")) return;
      setSubmitted(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <dialog
      ref={dialog}
      className="quiz"
      data-form={kind}
      aria-labelledby="quiz-title"
      onClose={onNativeClose}
      onClick={(e) => {
        if (e.target === dialog.current) dismiss();
      }}
    >
      <div className="quiz__panel">
        <header className="quiz__head">
          <div className="quiz__titles">
            <p className="quiz__label">{submitted ? "Thank you" : form.label}</p>
            <h2 id="quiz-title" className="quiz__title">
              {submitted ? "We’ve got your details." : form.title}
            </h2>
          </div>
          <button type="button" className="quiz__close" onClick={dismiss} aria-label="Close">
            <span aria-hidden="true" />
          </button>
        </header>
        <div className="quiz__body">
          {src ? <iframe className="quiz__frame" src={src} title={form.title} loading="eager" /> : null}
        </div>
        <p className="quiz__note">{submitted ? form.done : form.note}</p>
      </div>
    </dialog>
  );
}
