import type { Metadata } from "next";
import { company } from "@/lib/company";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${company.name} — Reliable Freight Across Canada & the US`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "trucking",
    "freight",
    "transport",
    "Brampton",
    "Ontario",
    "cross-border shipping",
    "full truckload",
    "FTL",
    "logistics",
    "Bairava Transport",
  ],
  openGraph: {
    title: company.name,
    description: company.description,
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
