"use client";

import { useState } from "react";

// Small utility button that clears browser caches / service workers and
// force-reloads, so visitors can pull the latest deployed version without
// digging through browser settings. Useful for a static site served via a CDN.
export default function RefreshCacheButton() {
  const [busy, setBusy] = useState(false);

  async function refresh() {
    if (busy) return;
    setBusy(true);
    try {
      // Clear the Cache Storage API entries (if any).
      if (typeof caches !== "undefined") {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      // Unregister any service workers.
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
    } catch {
      // Ignore — we still force a reload below.
    } finally {
      // Cache-busting reload to bypass the HTTP cache for the document.
      const url = new URL(window.location.href);
      url.searchParams.set("_", Date.now().toString());
      window.location.replace(url.toString());
    }
  }

  return (
    <button
      type="button"
      className="refresh-cache-btn"
      onClick={refresh}
      disabled={busy}
      aria-label="Refresh cache and reload the latest version"
      title="Refresh cache & reload the latest version"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={busy ? "spin" : ""}
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <path d="M21 3v6h-6" />
      </svg>
      <span>{busy ? "Refreshing…" : "Refresh"}</span>
    </button>
  );
}
