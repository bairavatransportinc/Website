import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${company.name}.`,
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="container legal-inner">
        <Link href="/" className="legal-back">
          ← Back to home
        </Link>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: February 2025</p>

        <p>
          {company.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) respects your privacy. This policy explains what
          information we collect through our website and how we use it.
        </p>

        <h2>Information we collect</h2>
        <p>
          When you submit a quote request or contact us, we collect the details
          you provide — such as your name, company, email, phone number, and
          shipment information. We only collect what you choose to share with
          us.
        </p>

        <h2>How we use your information</h2>
        <ul>
          <li>To respond to your quote requests and inquiries.</li>
          <li>To arrange and provide freight and transport services.</li>
          <li>To communicate with you about your shipments.</li>
        </ul>

        <h2>How we share information</h2>
        <p>
          We do not sell your personal information. We may share it only as
          needed to provide our services (for example, with carriers, customs
          brokers, or partners involved in your shipment) or where required by
          law.
        </p>

        <h2>Data retention &amp; security</h2>
        <p>
          We keep your information only as long as necessary for the purposes
          above and take reasonable steps to protect it. No method of
          transmission over the internet is completely secure, so we cannot
          guarantee absolute security.
        </p>

        <h2>Your choices</h2>
        <p>
          You may request access to, correction of, or deletion of the personal
          information we hold about you by contacting us at{" "}
          <a href={`mailto:${company.contact.email}`}>
            {company.contact.email}
          </a>
          .
        </p>

        <h2>Contact</h2>
        <p>
          {company.name}
          <br />
          {company.contact.address}
          <br />
          <a href={`mailto:${company.contact.email}`}>
            {company.contact.email}
          </a>{" "}
          ·{" "}
          <a href={`tel:${company.contact.phone.replace(/[^+\d]/g, "")}`}>
            {company.contact.phone}
          </a>
        </p>

        <p className="legal-note">
          This policy is provided for general information and does not
          constitute legal advice.
        </p>
      </div>
    </main>
  );
}
