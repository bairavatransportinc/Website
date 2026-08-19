"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { company } from "@/lib/company";
import { useI18n } from "@/lib/i18n";
import { QuoteButton } from "./QuoteModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { t, lang, setLang } = useI18n();

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#fleet", label: t.nav.fleet },
    { href: "#coverage", label: t.nav.coverage },
    { href: "#about", label: t.nav.about },
    { href: "#footer", label: t.nav.contact },
  ];

  // Highlight the nav link for whichever section is currently in view.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible section near the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LangToggle = () => (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === "en" ? "is-active" : ""}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        className={lang === "fr" ? "is-active" : ""}
        aria-pressed={lang === "fr"}
        onClick={() => setLang("fr")}
      >
        FR
      </button>
    </div>
  );

  return (
    <header className="site-header">
      <div className="container">
        <div className="nav-pill">
          <a href="#top" className="nav-logo" aria-label={`${company.name} home`}>
            <Image
              src="/images/logo.png"
              alt={company.name}
              width={201}
              height={91}
              priority
              style={{ height: 38, width: "auto" }}
            />
          </a>

          <nav aria-label="Primary">
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={active === l.href ? "is-active" : ""}
                    aria-current={active === l.href ? "true" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-cta">
            <LangToggle />
            <QuoteButton className="btn btn-primary">
              {t.nav.getQuote}
            </QuoteButton>
            <button
              className="mobile-toggle"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <div className="mobile-menu">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <LangToggle />
            <QuoteButton className="btn btn-primary">
              {t.nav.getQuote}
            </QuoteButton>
          </div>
        )}
      </div>
    </header>
  );
}
