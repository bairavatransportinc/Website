"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { company } from "@/lib/company";
import { useI18n } from "@/lib/i18n";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useI18n();
  const q = t.quote;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => (data.get(k) || "").toString().trim();

    const name = get("name");
    const companyName = get("company");
    const email = get("email");
    const phone = get("phone");
    const origin = get("origin");
    const destination = get("destination");
    const service = get("service");
    const details = get("details");

    const subject = `Quote request${name ? ` from ${name}` : ""}${
      companyName ? ` (${companyName})` : ""
    }`;

    const bodyLines = [
      "New quote request via bairavatransportinc.ca",
      "",
      `Name:        ${name || "—"}`,
      `Company:     ${companyName || "—"}`,
      `Email:       ${email || "—"}`,
      `Phone:       ${phone || "—"}`,
      `Pickup:      ${origin || "—"}`,
      `Delivery:    ${destination || "—"}`,
      `Service:     ${service || "—"}`,
      "",
      "Shipment details:",
      details || "—",
    ];

    const mailto = `mailto:${company.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    // Opens the user's email app (Gmail in browser, Apple Mail, Outlook, etc.)
    // with everything pre-filled — they just press Send.
    window.location.href = mailto;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="contact-form" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📧</div>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 8 }}>{q.thanksTitle}</h3>
        <p style={{ color: "var(--fg-muted)" }}>{q.thanksBody}</p>
        <p className="form-note" style={{ marginTop: 16 }}>
          {q.thanksNote}{" "}
          <a
            href={`mailto:${company.contact.email}`}
            style={{ color: "var(--blue-400)", fontWeight: 700 }}
          >
            {company.contact.email}
          </a>
          .
        </p>
        <button
          className="btn btn-ghost"
          style={{ marginTop: 24 }}
          onClick={() => setSubmitted(false)}
        >
          {q.another}
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">{q.name}</label>
          <input id="name" name="name" type="text" required placeholder="Jane Doe" />
        </div>
        <div className="field">
          <label htmlFor="company">{q.company}</label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Acme Logistics"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email">{q.email}</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
          />
        </div>
        <div className="field">
          <label htmlFor="phone">{q.phone}</label>
          <input id="phone" name="phone" type="tel" placeholder="(647) 000-0000" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="origin">{q.pickup}</label>
          <input
            id="origin"
            name="origin"
            type="text"
            placeholder="Brampton, ON"
          />
        </div>
        <div className="field">
          <label htmlFor="destination">{q.delivery}</label>
          <input
            id="destination"
            name="destination"
            type="text"
            placeholder="Chicago, IL"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="service">{q.service}</label>
        <select id="service" name="service" defaultValue="">
          <option value="" disabled>
            {q.serviceSelect}
          </option>
          {t.services.items.map((svc) => (
            <option key={svc.title}>{svc.title}</option>
          ))}
          <option>{q.serviceOther}</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="details">{q.details}</label>
        <textarea
          id="details"
          name="details"
          placeholder={q.detailsPlaceholder}
        />
      </div>

      <button type="submit" className="btn btn-amber" style={{ width: "100%" }}>
        {q.submit} <ArrowIcon />
      </button>
      <p className="form-note">{q.formNote}</p>
    </form>
  );
}
