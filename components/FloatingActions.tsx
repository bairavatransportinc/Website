"use client";

import { useEffect, useState } from "react";
import { useQuote } from "./QuoteModal";
import { useI18n } from "@/lib/i18n";
import { ArrowIcon } from "./Icons";

export default function FloatingActions() {
  const { open } = useQuote();
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop: floating quote FAB + back-to-top (appear on scroll) */}
      <div className={`floating-actions ${show ? "is-visible" : ""}`}>
        <button
          type="button"
          className="fab fab-quote"
          onClick={open}
          aria-label={t.nav.getQuote}
        >
          <ArrowIcon size={16} />
          <span>{t.nav.getQuote}</span>
        </button>
        <button
          type="button"
          className="fab fab-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile: always-visible sticky quote bar so the CTA is one tap away */}
      <div className="mobile-quote-bar">
        <button type="button" className="btn btn-primary" onClick={open}>
          {t.hero.getQuote} <ArrowIcon size={16} />
        </button>
      </div>
    </>
  );
}
