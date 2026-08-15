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
      <div className="container">
        <div className="nav-pill">
          <a href="#top" className="nav-logo" aria-label={`${company.name} home`}>
            <Image
              src="/images/logo.png"
              alt={company.name}
              width={180}
              height={78}
              priority
              style={{ height: 34, width: "auto" }}
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
          <div className="mobile-menu">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ justifyContent: "center", marginTop: 6 }}
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
