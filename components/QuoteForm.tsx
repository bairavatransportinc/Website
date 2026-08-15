"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { company } from "@/lib/company";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

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
      "New quote request via bairavatransport.ca",
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
        <h3 style={{ fontSize: "1.4rem", marginBottom: 8 }}>
          Your email is ready to send
        </h3>
        <p style={{ color: "var(--fg-muted)" }}>
          We&apos;ve opened your email app with the request pre-filled to{" "}
          <strong>{company.contact.email}</strong>. Just press{" "}
          <strong>Send</strong> and our dispatch team will get back to you with a
          quote.
        </p>
        <p className="form-note" style={{ marginTop: 16 }}>
          Nothing opened? Email us directly at{" "}
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
          Fill out another request
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" required placeholder="Jane Doe" />
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="origin">Pickup location</label>
          <input
            id="origin"
            name="origin"
            type="text"
            placeholder="Brampton, ON"
          />
        </div>
        <div className="field">
          <label htmlFor="destination">Delivery location</label>
          <input
            id="destination"
            name="destination"
            type="text"
            placeholder="Chicago, IL"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="service">Service needed</label>
        <select id="service" name="service" defaultValue="">
          <option value="" disabled>
            Select a service…
          </option>
          <option>Full Truckload (FTL)</option>
          <option>Cross-Border Freight</option>
          <option>Dry Van Shipping</option>
          <option>Dedicated Lanes</option>
          <option>Expedited Delivery</option>
          <option>Other</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="details">Shipment details</label>
        <textarea
          id="details"
          name="details"
          placeholder="Tell us about your load — weight, dimensions, timeline, and any special requirements."
        />
      </div>

      <button type="submit" className="btn btn-amber" style={{ width: "100%" }}>
        Request My Quote <ArrowIcon />
      </button>
      <p className="form-note">
        Opens your email app pre-filled to {company.contact.email} — no account
        needed on our end.
      </p>
    </form>
  );
}
