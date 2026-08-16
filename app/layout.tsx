import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { company } from "@/lib/company";
import { QuoteProvider } from "@/components/QuoteModal";
import FloatingActions from "@/components/FloatingActions";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    <html lang="en" className={inter.className}>
      <head>
        {/* Mark JS as available before paint so scroll-reveal can hide
            content only when it can also reveal it (no blank sections). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');`,
          }}
        />
      </head>
      <body>
        <QuoteProvider>
          {children}
          <FloatingActions />
        </QuoteProvider>
      </body>
    </html>
  );
}
