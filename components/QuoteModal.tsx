"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import QuoteForm from "./QuoteForm";
import { useI18n } from "@/lib/i18n";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const QuoteContext = createContext<Ctx | null>(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <QuoteContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t.quote.title}
          onClick={close}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              aria-label={t.quote.close}
              onClick={close}
            >
              ✕
            </button>
            <div className="modal-head">
              <span className="eyebrow badge">{t.quote.eyebrow}</span>
              <h3>{t.quote.title}</h3>
              <p>{t.quote.lead}</p>
            </div>
            <QuoteForm />
          </div>
        </div>
      )}
    </QuoteContext.Provider>
  );
}

/** Button that opens the quote modal. Drop-in replacement for the CTA links. */
export function QuoteButton({
  className = "btn btn-primary",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useQuote();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
