"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Front-end only for now. Wire this to an email service or API route later.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="contact-form" style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "2.5rem",
            marginBottom: 12,
          }}
        >
          🚚
        </div>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 8 }}>
          Thanks — we're on it!
        </h3>
        <p style={{ color: "var(--fg-muted)" }}>
          Your request has landed with our dispatch team. We'll get back to you
          shortly with a quote.
        </p>
        <button
          className="btn btn-ghost"
          style={{ marginTop: 24 }}
          onClick={() => setSubmitted(false)}
        >
          Send another request
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
        No obligation. A dispatcher will respond with pricing and availability.
      </p>
    </form>
  );
}
