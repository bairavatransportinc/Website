import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import {
  iconMap,
  ShieldIcon,
  ArrowIcon,
  PhoneIcon,
  MailIcon,
  PinIcon,
  ClockIcon,
} from "@/components/Icons";
import { company, services, stats, whyChooseUs, fleet } from "@/lib/company";

export default function Home() {
  return (
    <>
      <span id="top" />
      <Header />

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <span className="hero-pill">
            <span className="tag">Active</span>
            Brampton, Ontario · Canada &amp; US carrier
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
            <a href="#contact" className="btn btn-primary">
              Get a Free Quote <ArrowIcon />
            </a>
            <a href="#services" className="btn btn-ghost">
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
          <Reveal variant="up">
            <span className="eyebrow">What We Haul</span>
            <h2 className="section-title">
              <span className="title-underline">Freight solutions</span> built for
              reliability
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
          <Reveal variant="up">
            <span className="eyebrow">Our Equipment</span>
            <h2 className="section-title">
              A fleet built to <span className="title-underline">keep its promise</span>
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
                <span className="k">Status</span>
                <span className="v">
                  <span className="status-pill">{company.status}</span>
                </span>
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
              <a href="#contact" className="btn btn-amber">
                Get a Free Quote <ArrowIcon />
              </a>
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

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="section-pad">
        <div className="container">
          <Reveal variant="up">
            <span className="eyebrow">Get in Touch</span>
            <h2 className="section-title">
              Request a <span className="title-underline">quote</span>
            </h2>
            <p className="section-lead">
              Fill out the form and a dispatcher will reach out with pricing and
              availability. Prefer to talk? Our lines are open 24/7.
            </p>
          </Reveal>

          <div className="contact-grid" style={{ marginTop: 48 }}>
            <div className="contact-info">
              <Reveal variant="left" delay={0} className="contact-item">
                <span className="ci-icon">
                  <PhoneIcon size={20} />
                </span>
                <div>
                  <div className="k">Phone</div>
                  <div className="v">{company.contact.phone}</div>
                </div>
              </Reveal>
              <Reveal variant="left" delay={80} className="contact-item">
                <span className="ci-icon">
                  <MailIcon size={20} />
                </span>
                <div>
                  <div className="k">Email</div>
                  <div className="v">{company.contact.email}</div>
                </div>
              </Reveal>
              <Reveal variant="left" delay={160} className="contact-item">
                <span className="ci-icon">
                  <PinIcon size={20} />
                </span>
                <div>
                  <div className="k">Location</div>
                  <div className="v">{company.contact.address}</div>
                </div>
              </Reveal>
              <Reveal variant="left" delay={240} className="contact-item">
                <span className="ci-icon">
                  <ClockIcon size={20} />
                </span>
                <div>
                  <div className="k">Hours</div>
                  <div className="v">{company.contact.hours}</div>
                </div>
              </Reveal>
            </div>

            <Reveal variant="right">
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
