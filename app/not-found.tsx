import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you were looking for isn't here. Return to the ${company.name} home page.`,
};

export default function NotFound() {
  return (
    <main className="legal-page">
      <div className="container legal-inner">
        <span className="eyebrow badge">404</span>
        <h1>This lane doesn&apos;t exist.</h1>
        <p className="legal-updated">Page not found</p>

        <p>
          The page you were looking for may have moved, been renamed, or never
          existed. Let&apos;s get you back on the road.
        </p>

        <p>
          <Link href="/" className="btn btn-primary">
            ← Back to home
          </Link>
        </p>

        <p className="legal-note">
          Need to reach us? Email{" "}
          <a href={`mailto:${company.contact.email}`}>
            {company.contact.email}
          </a>{" "}
          or call {company.contact.phone}.
        </p>
      </div>
    </main>
  );
}
