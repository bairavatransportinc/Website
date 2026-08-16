import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for the ${company.name} website.`,
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="container legal-inner">
        <Link href="/" className="legal-back">
          ← Back to home
        </Link>
        <h1>Terms of Use</h1>
        <p className="legal-updated">Last updated: February 2025</p>

        <p>
          These terms govern your use of the {company.name} website. By using
          this site, you agree to them.
        </p>

        <h2>Use of this website</h2>
        <p>
          This website is provided for general information about our freight and
          transport services. You agree to use it lawfully and not to misuse or
          attempt to disrupt it.
        </p>

        <h2>Quotes &amp; information</h2>
        <p>
          Any rates, availability, or estimates shown or provided through this
          site are for reference only and are not a binding offer. Freight
          services are subject to a separate agreement, applicable rate
          confirmation, and our operating terms.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The {company.name} name, logo, and content on this site are our
          property or used with permission. You may not copy or reuse them
          without our consent.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          This website is provided &ldquo;as is.&rdquo; To the extent permitted
          by law, {company.name} is not liable for any loss arising from your
          use of, or reliance on, this website.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Reach us at{" "}
          <a href={`mailto:${company.contact.email}`}>
            {company.contact.email}
          </a>
          .
        </p>

        <p className="legal-note">
          This page is provided for general information and does not constitute
          legal advice.
        </p>
      </div>
    </main>
  );
}
