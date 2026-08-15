import type { MetadataRoute } from "next";
import { company } from "@/lib/company";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.shortName,
    description: company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e1a",
    theme_color: "#0a1a4a",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
