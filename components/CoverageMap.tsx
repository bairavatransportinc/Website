"use client";

// Real-map coverage visual using Leaflet with CARTO dark tiles (free, no API key).
// Static-export safe: Leaflet is loaded from CDN inside useEffect (client only),
// so nothing runs during SSR / `next build` export.
//
// On top of the base map we draw curved "flight-arc" routes from the Brampton
// hub to key destination cities, animate them drawing in, then send a glowing
// shipment pulse travelling along each route on a loop.

import { useEffect, useRef, useState } from "react";

// --- Real geographic coordinates [lat, lng] ---
const HUB = { name: "Brampton", coords: [43.7315, -79.7624] as [number, number] };

const DESTINATIONS: { name: string; coords: [number, number] }[] = [
  { name: "Montreal", coords: [45.5019, -73.5674] },
  { name: "Detroit", coords: [42.3314, -83.0458] },
  { name: "Chicago", coords: [41.8781, -87.6298] },
  { name: "New York", coords: [40.7128, -74.006] },
  { name: "Dallas", coords: [32.7767, -96.797] },
];

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

// Load a script once and resolve when ready.
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

function loadCss(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  document.head.appendChild(l);
}

// Build a gently curved arc (list of latlngs) between two points using a
// quadratic bezier bowed perpendicular to the line — reads as a "flight path".
function curvedArc(
  from: [number, number],
  to: [number, number],
  bow = 0.2,
  steps = 48
): [number, number][] {
  const [lat1, lng1] = from;
  const [lat2, lng2] = to;
  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;
  // Perpendicular offset for the control point.
  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  const ctrlLat = midLat - dLng * bow;
  const ctrlLng = midLng + dLat * bow;

  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const lat = mt * mt * lat1 + 2 * mt * t * ctrlLat + t * t * lat2;
    const lng = mt * mt * lng1 + 2 * mt * t * ctrlLng + t * t * lng2;
    pts.push([lat, lng]);
  }
  return pts;
}

export default function CoverageMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  // --- Lazy gate: only load Leaflet once the map scrolls near the viewport. ---
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      // Start loading a bit before it's fully on screen.
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const rafs: number[] = [];

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    (async () => {
      loadCss(LEAFLET_CSS);
      await loadScript(LEAFLET_JS);
      if (cancelled || !containerRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      if (!L) return;

      // Guard against double-init (fast refresh / re-mount).
      if (mapRef.current) return;

      const allCoords = [HUB.coords, ...DESTINATIONS.map((d) => d.coords)];

      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
      });
      mapRef.current = map;

      // Dark CARTO basemap — free, no key, matches the site's navy theme.
      const tileLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(map);

      // Fade the map in once the first tiles have painted.
      tileLayer.on("load", () => {
        if (!cancelled) setReady(true);
      });
      // Safety fallback in case the 'load' event is missed.
      const readyFallback = window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 2500);
      rafs.push(readyFallback as unknown as number);

      // Fit to all points with padding, then lock the view.
      const bounds = L.latLngBounds(allCoords);
      map.fitBounds(bounds, { padding: [40, 40] });

      // Keep the map static/decorative but let it re-fit on resize.
      const refit = () => map.fitBounds(bounds, { padding: [40, 40] });
      window.addEventListener("resize", refit);

      // --- Draw routes as curved dashed polylines that "draw in" ---
      DESTINATIONS.forEach((dest, i) => {
        const arc = curvedArc(HUB.coords, dest.coords);

        // Base faint arc.
        L.polyline(arc, {
          color: "#5b82ff",
          weight: 2,
          opacity: 0.35,
          className: "cm-arc-base",
        }).addTo(map);

        // Bright animated arc drawn on top (staggered).
        const glow = L.polyline(arc, {
          color: "#2f5bff",
          weight: 2.5,
          opacity: 0.95,
          className: "cm-arc-glow",
        }).addTo(map);

        const glowEl = glow.getElement?.() as SVGPathElement | undefined;
        if (glowEl && !reduceMotion) {
          const len = glowEl.getTotalLength();
          glowEl.style.strokeDasharray = `${len}`;
          glowEl.style.strokeDashoffset = `${len}`;
          glowEl.style.transition = "stroke-dashoffset 1.2s ease-out";
          glowEl.style.transitionDelay = `${0.3 + i * 0.35}s`;
          // Trigger the draw on next frame.
          rafs.push(
            requestAnimationFrame(() => {
              rafs.push(
                requestAnimationFrame(() => {
                  glowEl.style.strokeDashoffset = "0";
                })
              );
            })
          );
        }

        // Destination marker (amber pulse).
        L.marker(dest.coords, {
          icon: L.divIcon({
            className: "cm-marker",
            html: `<span class="cm-city-dot"></span><span class="cm-city-label">${dest.name}</span>`,
            iconSize: [10, 10],
            iconAnchor: [5, 5],
          }),
          interactive: false,
          keyboard: false,
        }).addTo(map);
      });

      // --- Hub marker (blue pulsing ring) ---
      L.marker(HUB.coords, {
        icon: L.divIcon({
          className: "cm-marker cm-marker-hub",
          html: `<span class="cm-hub-pulse"></span><span class="cm-hub-dot"></span><span class="cm-hub-label">${HUB.name} · HQ</span>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(map);

      // --- Shipment pulses travelling along each arc ---
      if (!reduceMotion) {
        DESTINATIONS.forEach((dest, i) => {
          const arc = curvedArc(HUB.coords, dest.coords, 0.2, 120);
          const pulse = L.circleMarker(arc[0], {
            radius: 3.5,
            color: "#ffd27a",
            fillColor: "#ffb020",
            fillOpacity: 1,
            weight: 1,
            className: "cm-shipment",
            interactive: false,
          }).addTo(map);

          const duration = 3600; // ms per trip
          const stagger = i * 700;
          const start = performance.now() + stagger;

          const step = (now: number) => {
            if (cancelled) return;
            const elapsed = now - start;
            if (elapsed >= 0) {
              const t = (elapsed % duration) / duration;
              const idx = Math.min(arc.length - 1, Math.floor(t * arc.length));
              pulse.setLatLng(arc[idx]);
              // Fade near the ends for a "depart / arrive" feel.
              const edge = Math.min(t, 1 - t) * 2; // 0 at ends, 1 mid
              pulse.setStyle({ fillOpacity: 0.25 + 0.75 * Math.min(1, edge * 2) });
            }
            rafs.push(requestAnimationFrame(step));
          };
          rafs.push(requestAnimationFrame(step));
        });
      }

      // Save cleanup for resize listener.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (map as any).__refit = refit;
    })();

    return () => {
      cancelled = true;
      rafs.forEach((r) => cancelAnimationFrame(r));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const map = mapRef.current as any;
      if (map) {
        if (map.__refit) window.removeEventListener("resize", map.__refit);
        map.remove();
        mapRef.current = null;
      }
    };
  }, [inView]);

  return (
    <div ref={wrapRef} className="coverage-map">
      <div
        ref={containerRef}
        className={`coverage-map-canvas ${ready ? "is-ready" : ""}`}
        aria-hidden="true"
      />

      {/* Shimmer skeleton shown until the map tiles have loaded */}
      {!ready && (
        <div className="coverage-map-skeleton" aria-hidden="true">
          <span className="cm-skel-shimmer" />
          <span className="cm-skel-pin" />
          <span className="cm-skel-hint">Loading coverage map…</span>
        </div>
      )}

      <span className="sr-only">
        Coverage map showing freight routes from our Brampton, Ontario hub to
        Montreal, Detroit, Chicago, New York, and Dallas.
      </span>
    </div>
  );
}
