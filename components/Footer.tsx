"use client";

import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/company";
import { useI18n } from "@/lib/i18n";
import RefreshCacheButton from "./RefreshCacheButton";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer id="footer" className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-logo-chip">
              <Image
                src="/images/logo.png"
                alt={company.name}
                width={220}
                height={96}
                style={{ height: 36, width: "auto" }}
              />
            </span>
            <p>{company.description}</p>
          </div>

          <div className="footer-col">
            <h4>{t.footer.company}</h4>
            <ul>
              <li>
                <a href="#services">{t.footer.services}</a>
              </li>
              <li>
                <a href="#fleet">{t.footer.fleet}</a>
              </li>
              <li>
                <a href="#coverage">{t.footer.coverage}</a>
              </li>
              <li>
                <a href="#about">{t.footer.about}</a>
              </li>
              <li>
                <a href="#footer">{t.footer.contact}</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer.getInTouch}</h4>
            <ul>
              <li>
                <a href={`mailto:${company.contact.email}`}>
                  {company.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.contact.phone.replace(/[^+\d]/g, "")}`}>
                  {company.contact.phone}
                </a>
              </li>
              <li>{company.contact.address}</li>
              <li>{company.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {company.name} {t.footer.rights}
          </span>
          <span className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <span className="dot-sep">·</span>
            <Link href="/terms">Terms</Link>
            <span className="dot-sep">·</span>
            <RefreshCacheButton />
          </span>
          <span>Registered Ontario Business Corporation · Brampton, ON</span>
        </div>
      </div>
    </footer>
  );
}
