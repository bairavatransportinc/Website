"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** The final display value, e.g. "48", "24/7", "100%", "2023" */
  value: string;
};

/**
 * Counts up numeric values on scroll into view. Non-numeric values
 * (like "24/7") are shown as-is with a fade. Preserves any suffix/prefix
 * such as "%" or "+".
 */
export default function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  // Parse a leading integer and remember the surrounding text.
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";
  const isPureNumber = target !== null && /^\d[\d,]*.*$/.test(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isPureNumber || target === null || reduce) {
      setDisplay(value);
      return;
    }

    // Start from 0 until visible.
    setDisplay("0" + suffix);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            io.unobserve(entry.target);

            const duration = 1400;
            const start = performance.now();
            const isYear = target > 1900;

            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              // easeOutExpo — snappy, premium finish
              const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
              const current = Math.round(eased * target);
              setDisplay(
                (isYear ? current.toString() : current.toLocaleString()) +
                  suffix
              );
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [isPureNumber, target, suffix, value]);

  return <span ref={ref}>{display}</span>;
}
