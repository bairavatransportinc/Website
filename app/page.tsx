import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import CoverageMap from "@/components/CoverageMap";
import { QuoteButton } from "@/components/QuoteModal";
import { iconMap, ShieldIcon, ArrowIcon } from "@/components/Icons";
import {
  company,
  services,
  stats,
  whyChooseUs,
  fleet,
  coverage,
} from "@/lib/company";

export default function Home() {
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
            <span className="tag">Active</span>
            <span className="hero-pill-text">
              Brampton, ON · <span className="pill-long">Canada &amp; US carrier</span>
            </span>
          </span>

          <h1 className="hero-title" aria-label="Freight that moves with the pack.">
            {"Freight that moves".split(" ").map((w, i) => (
              <span className="word" style={{ ["--i" as string]: i }} key={i}>
                <span>{w}</span>
              </span>
            ))}
            <span className="word" style={{ ["--i" as string]: 3 }}>
              <span>with</span>
            </span>
            <span className="word" style={{ ["--i" as string]: 4 }}>
              <span>the</span>
            </span>
            <span className="word" style={{ ["--i" as string]: 5 }}>
              <span className="accent">pack.</span>
            </span>
          </h1>

          <p className="lead">
            {company.shortName} delivers reliable, on-time full-truckload and
            cross-border freight across Canada and the United States — fast,
            tracked, and backed by 24/7 dispatch.
          </p>

          <div className="hero-actions">
            <QuoteButton className="btn btn-primary">
              Get a Free Quote <ArrowIcon />
            </QuoteButton>
            <a href="#services" className="btn btn-white">
              Explore Services
            </a>
          </div>

          <div className="hero-trust">
            {stats.map((s) => (
              <div className="item" key={s.label}>
                <strong>
                  <CountUp value={s.value} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <a href="#services" className="hero-scroll" aria-label="Scroll to content">
          <span className="hero-scroll-text">Scroll</span>
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
              <span className="strip-item">Full Truckload</span>
              <span className="strip-item">Cross-Border Freight</span>
              <span className="strip-item">Dry Van</span>
              <span className="strip-item">Dedicated Lanes</span>
              <span className="strip-item">Expedited Delivery</span>
              <span className="strip-item">24/7 Dispatch</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="section-pad">
        <div className="container">
          <Reveal variant="up" className="section-head-center">
            <span className="eyebrow badge">What We Haul</span>
            <h2 className="section-title">
              Freight solutions built for{" "}
              <span className="title-underline">reliability</span>
            </h2>
            <p className="section-lead">
              Whatever you're shipping and wherever it's headed, we have the
              capacity and the discipline to get it there safely and on
              schedule.
            </p>
          </Reveal>

          <div className="services-grid">
            {services.map((svc, i) => {
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
            <span className="eyebrow badge">Our Equipment</span>
            <h2 className="section-title">
              A fleet built to{" "}
              <span className="title-underline">keep its promise</span>
            </h2>
            <p className="section-lead">
              Well-maintained, safety-inspected equipment ready for the lanes
              you run. Don&apos;t see exactly what you need? Ask us — we&apos;ll
              find the right capacity.
            </p>
          </Reveal>

          <div className="fleet-grid">
            {fleet.map((unit, i) => {
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
            <span className="eyebrow">Where We Run</span>
            <h2 className="section-title">
              Coverage across{" "}
              <span className="title-underline">Canada &amp; the US</span>
            </h2>
            <p className="section-lead">
              From our Brampton base we run freight throughout Ontario and Quebec
              and cross-border into the US heartland — the Great Lakes, Midwest,
              Northeast, and down to Texas.
            </p>

            <div className="coverage-regions">
              {coverage.regions.map((r) => (
                <span className="coverage-chip" key={r}>
                  {r}
                </span>
              ))}
            </div>

            <div className="coverage-lanes">
              {coverage.lanes.map((lane) => (
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
            <span className="eyebrow">Who We Are</span>
            <h2 className="section-title">
              A registered Ontario carrier you can{" "}
              <span className="title-underline">trust</span>
            </h2>
            <p className="section-lead">
              {company.name} is a Brampton-based transport company built on a
              simple promise: move freight the way we'd want ours moved — on
              time, in full, and with honest communication every mile of the
              way.
            </p>

            <div className="about-features">
              {whyChooseUs.map((f) => (
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

          {/* Real incorporation credentials from the Ontario registry */}
          <Reveal variant="right" className="credentials">
            <span className="verified">✓ Verified · Ontario Business Registry</span>
            <h3>{company.name}</h3>
            <div style={{ marginTop: 18 }}>
              <div className="cred-row">
                <span className="k">Business Number (BN)</span>
                <span className="v">{company.businessNumber}</span>
              </div>
              <div className="cred-row">
                <span className="k">Registry ID</span>
                <span className="v">{company.registryId}</span>
              </div>
              <div className="cred-row">
                <span className="k">Registered Office</span>
                <span className="v">{company.registeredOffice}</span>
              </div>
              <div className="cred-row">
                <span className="k">Business Type</span>
                <span className="v">{company.businessType}</span>
              </div>
              <div className="cred-row">
                <span className="k">Incorporated</span>
                <span className="v">{company.incorporatedDate}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- WHY / CTA BAND ---------------- */}
      <section id="why" className="section-pad">
        <div className="container">
          <Reveal variant="scale" className="cta-band">
            <h2>Ready to move your freight?</h2>
            <p>
              Tell us where it's going. Our dispatch team will get you a quick,
              honest quote and reliable capacity — no runaround.
            </p>
            <div className="hero-actions">
              <QuoteButton className="btn btn-amber">
                Get a Free Quote <ArrowIcon />
              </QuoteButton>
              <a
                href={`tel:${company.contact.phone.replace(/[^+\d]/g, "")}`}
                className="btn btn-ghost"
              >
                Call Dispatch
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
