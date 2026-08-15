"use client";

import { useState } from "react";
import Image from "next/image";
import { company } from "@/lib/company";

const links = [
  { href: "#services", label: "Services" },
  { href: "#fleet", label: "Fleet" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#top" className="nav-logo" aria-label={`${company.name} home`}>
          <Image
            src="/images/logo.png"
            alt={company.name}
            width={200}
            height={88}
            priority
            style={{ height: 44, width: "auto" }}
          />
        </a>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-cta">
          <a href="#about" className="btn btn-ghost">
            Our Credentials
          </a>
          <a href="#contact" className="btn btn-primary">
            Get a Quote
          </a>
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
        <div
          className="container"
          style={{ paddingBottom: 20, display: "grid", gap: 12 }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ color: "var(--fg-muted)", fontWeight: 600 }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
}
