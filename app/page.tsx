"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import CoverageMap from "@/components/CoverageMap";
import { QuoteButton } from "@/components/QuoteModal";
import { iconMap, ShieldIcon, ArrowIcon } from "@/components/Icons";
import { company, coverageLanes } from "@/lib/company";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <span id="top" />
      <Header />

      {/* ---------------- HERO (full-width truck banner) ---------------- */}
      <section className="hero">
        <div
          className="hero-photo"
          style={{ backgroundImage: "url(/images/hero/truck-blue.jpg)" }}
          aria-hidden="true"
        />
        <div className="hero-overlay" aria-hidden="true" />

        <div className="container hero-inner">
          <span className="hero-pill">
            <span className="tag">{t.hero.badge}</span>
            <span className="hero-pill-text">{t.hero.location}</span>
          </span>

          <h1 className="hero-title">
            {t.hero.titleLine1.split(" ").map((w, i) => (
              <span className="word" style={{ ["--i" as string]: i }} key={i}>
                <span>{w}</span>
              </span>
            ))}
            {t.hero.titleWith && (
              <span className="word" style={{ ["--i" as string]: 3 }}>
                <span>{t.hero.titleWith}</span>
              </span>
            )}
            {t.hero.titleThe && (
              <span className="word" style={{ ["--i" as string]: 4 }}>
                <span>{t.hero.titleThe}</span>
              </span>
            )}
            <span className="word" style={{ ["--i" as string]: 5 }}>
              <span className="accent">{t.hero.titlePack}</span>
            </span>
          </h1>

          <p className="lead">{t.hero.lead}</p>

          <div className="hero-actions">
            <QuoteButton className="btn btn-primary">
              {t.hero.getQuote} <ArrowIcon />
            </QuoteButton>
            <a href="#services" className="btn btn-white">
              {t.hero.explore}
            </a>
          </div>

          <div className="hero-trust">
            {t.stats.map((s) => (
              <div className="item" key={s.label}>
                <strong>
                  <CountUp value={s.value} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <a href="#services" className="hero-scroll" aria-label={t.hero.scroll}>
          <span className="hero-scroll-text">{t.hero.scroll}</span>
          <span className="hero-scroll-mouse">
            <span className="hero-scroll-dot" />
          </span>
        </a>
      </section>

      {/* ---------------- MARQUEE STRIP ---------------- */}
      <div className="strip" aria-hidden="true">
        <div className="strip-track">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} style={{ display: "flex", gap: 56 }}>
              {t.strip.map((item, i) => (
                <span className="strip-item" key={`${dup}-${i}`}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="section-pad">
        <div className="container">
          <Reveal variant="up" className="section-head-center">
            <span className="eyebrow badge">{t.services.eyebrow}</span>
            <h2 className="section-title">
              {t.services.title1}
              <span className="title-underline">{t.services.titleAccent}</span>
            </h2>
            <p className="section-lead">{t.services.lead}</p>
          </Reveal>

          <div className="services-grid">
            {t.services.items.map((svc, i) => {
              const Icon = iconMap[svc.icon as keyof typeof iconMap];
              return (
                <Reveal
                  variant="up"
                  delay={i * 90}
                  className="service-card"
                  key={svc.title}
                >
                  <span className="service-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="service-icon">
                    <Icon size={26} />
                  </div>
                  <h3>{svc.title}</h3>
                  <p>{svc.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- FLEET ---------------- */}
      <section id="fleet" className="fleet section-pad">
        <div className="container">
          <Reveal variant="up" className="section-head-center">
            <span className="eyebrow badge">{t.fleet.eyebrow}</span>
            <h2 className="section-title">
              {t.fleet.title1}
              <span className="title-underline">{t.fleet.titleAccent}</span>
            </h2>
            <p className="section-lead">{t.fleet.lead}</p>
          </Reveal>

          <div className="fleet-grid">
            {t.fleet.items.map((unit, i) => {
              const Icon = iconMap[unit.icon as keyof typeof iconMap];
              return (
                <Reveal
                  variant="up"
                  delay={i * 110}
                  className="fleet-card"
                  key={unit.name}
                >
                  <div className="fleet-card-head">
                    <span className="fleet-icon">
                      <Icon size={24} />
                    </span>
                    <h3>{unit.name}</h3>
                  </div>
                  <span className="fleet-spec">{unit.specs}</span>
                  <p>{unit.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- COVERAGE ---------------- */}
      <section id="coverage" className="coverage section-pad">
        <div className="container coverage-grid">
          <Reveal variant="left">
            <span className="eyebrow">{t.coverage.eyebrow}</span>
            <h2 className="section-title">
              {t.coverage.title1}
              <span className="title-underline">{t.coverage.titleAccent}</span>
            </h2>
            <p className="section-lead">{t.coverage.lead}</p>

            <div className="coverage-regions">
              {t.coverage.regions.map((r) => (
                <span className="coverage-chip" key={r}>
                  {r}
                </span>
              ))}
            </div>

            <div className="coverage-lanes">
              {coverageLanes.map((lane) => (
                <div className="lane-row" key={`${lane.from}-${lane.to}`}>
                  <span className="from">{lane.from}</span>
                  <span className="arrow" />
                  <span className="to">{lane.to}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right">
            <CoverageMap />
          </Reveal>
        </div>
      </section>

      {/* ---------------- ABOUT + CREDENTIALS ---------------- */}
      <section id="about" className="about section-pad">
        <div className="container about-grid">
          <Reveal variant="left">
            <span className="eyebrow">{t.about.eyebrow}</span>
            <h2 className="section-title">
              {t.about.title1}
              <span className="title-underline">{t.about.titleAccent}</span>
            </h2>
            <p className="section-lead">{t.about.lead}</p>

            <div className="about-features">
              {t.about.features.map((f) => (
                <div className="feature" key={f.title}>
                  <span className="dot">
                    <ShieldIcon size={18} />
                  </span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Trust card — conveys credibility without exposing registry
              identifiers (BN / registry ID) that could be misused. */}
          <Reveal variant="right" className="credentials trust-card">
            <span className="verified">{t.about.credVerified}</span>
            <h3>{company.name}</h3>
            <p className="trust-lead">{t.about.trustLead}</p>
            <ul className="trust-points">
              {t.about.trustPoints.map((point) => (
                <li key={point}>
                  <ShieldIcon size={18} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- WHY / CTA BAND ---------------- */}
      <section id="why" className="section-pad">
        <div className="container">
          <Reveal variant="scale" className="cta-band">
            <h2>{t.cta.title}</h2>
            <p>{t.cta.lead}</p>
            <div className="hero-actions">
              <QuoteButton className="btn btn-amber">
                {t.cta.getQuote} <ArrowIcon />
              </QuoteButton>
              <a
                href={`tel:${company.contact.phone.replace(/[^+\d]/g, "")}`}
                className="btn btn-ghost"
              >
                {t.cta.call}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
