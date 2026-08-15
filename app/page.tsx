import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import {
  iconMap,
  ShieldIcon,
  ArrowIcon,
  PhoneIcon,
  MailIcon,
  PinIcon,
  ClockIcon,
} from "@/components/Icons";
import { company, services, stats, whyChooseUs } from "@/lib/company";

export default function Home() {
  return (
    <>
      <span id="top" />
      <Header />

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Brampton, Ontario · Canada &amp; US</span>
            <h1>
              Freight that moves with the{" "}
              <span className="accent">pack.</span>
            </h1>
            <p className="lead">
              {company.shortName} delivers reliable, on-time full-truckload and
              cross-border freight across Canada and the United States. Fast,
              tracked, and driven by people who care about your deadline.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-amber">
                Get a Free Quote <ArrowIcon />
              </a>
              <a href="#services" className="btn btn-ghost">
                Explore Services
              </a>
            </div>

            <div className="hero-badges">
              <div className="hero-badge">
                <strong>24/7</strong>
                <span>Dispatch</span>
              </div>
              <div className="hero-badge">
                <strong>Cross-Border</strong>
                <span>CA ↔ US</span>
              </div>
              <div className="hero-badge">
                <strong>Active</strong>
                <span>Ontario Corp.</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="speed-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <Image
                src="/images/logo.png"
                alt={`${company.name} logo`}
                width={520}
                height={380}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE STRIP ---------------- */}
      <div className="strip" aria-hidden="true">
        <div className="strip-track">
          {[...Array(2)].map((_, dup) => (
            <div
              key={dup}
              style={{ display: "flex", gap: 48 }}
            >
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

      {/* ---------------- STATS ---------------- */}
      <section className="section-pad">
        <div className="container">
          <div className="stats">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="num">{s.value}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="section-pad">
        <div className="container">
          <span className="eyebrow">What We Haul</span>
          <h2 className="section-title">
            Freight solutions built for reliability
          </h2>
          <p className="section-lead">
            Whatever you're shipping and wherever it's headed, we have the
            capacity and the discipline to get it there safely and on schedule.
          </p>

          <div className="services-grid">
            {services.map((svc) => {
              const Icon = iconMap[svc.icon as keyof typeof iconMap];
              return (
                <div className="service-card" key={svc.title}>
                  <div className="service-icon">
                    <Icon size={26} />
                  </div>
                  <h3>{svc.title}</h3>
                  <p>{svc.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT + CREDENTIALS ---------------- */}
      <section id="about" className="about section-pad">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="section-title">
              A registered Ontario carrier you can trust
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
          </div>

          {/* Real incorporation credentials from the Ontario registry */}
          <div className="credentials">
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
          </div>
        </div>
      </section>

      {/* ---------------- WHY / CTA BAND ---------------- */}
      <section id="why" className="section-pad">
        <div className="container">
          <div className="cta-band">
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
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="section-pad">
        <div className="container">
          <span className="eyebrow">Get in Touch</span>
          <h2 className="section-title">Request a quote</h2>
          <p className="section-lead">
            Fill out the form and a dispatcher will reach out with pricing and
            availability. Prefer to talk? Our lines are open 24/7.
          </p>

          <div className="contact-grid" style={{ marginTop: 48 }}>
            <div className="contact-info">
              <div className="contact-item">
                <span className="ci-icon">
                  <PhoneIcon size={20} />
                </span>
                <div>
                  <div className="k">Phone</div>
                  <div className="v">{company.contact.phone}</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="ci-icon">
                  <MailIcon size={20} />
                </span>
                <div>
                  <div className="k">Email</div>
                  <div className="v">{company.contact.email}</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="ci-icon">
                  <PinIcon size={20} />
                </span>
                <div>
                  <div className="k">Location</div>
                  <div className="v">{company.contact.address}</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="ci-icon">
                  <ClockIcon size={20} />
                </span>
                <div>
                  <div className="k">Hours</div>
                  <div className="v">{company.contact.hours}</div>
                </div>
              </div>
            </div>

            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
