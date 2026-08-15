import type { Metadata } from "next";
import { company } from "@/lib/company";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bairavatransport.ca"),
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
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${company.name} — Reliable Freight Across Canada & the US`,
    description: company.description,
    url: "https://www.bairavatransport.ca",
    siteName: company.name,
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: `${company.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — Reliable Freight Across Canada & the US`,
    description: company.description,
    images: ["/images/og.png"],
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
