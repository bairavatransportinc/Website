"use client";

import { useEffect, useState } from "react";
import { useQuote } from "./QuoteModal";
import { ArrowIcon } from "./Icons";

export default function FloatingActions() {
  const { open } = useQuote();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`floating-actions ${show ? "is-visible" : ""}`}>
      <button
        type="button"
        className="fab fab-quote"
        onClick={open}
        aria-label="Get a quote"
      >
        <ArrowIcon size={16} />
        <span>Get a Quote</span>
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
  );
}
