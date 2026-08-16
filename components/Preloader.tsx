"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { company } from "@/lib/company";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    // Respect reduced motion — skip the intro entirely.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setDone(true);
      setRemove(true);
      return;
    }

    // Show for a brief, tasteful beat, then fade out.
    const finish = () => setDone(true);
    const minShow = window.setTimeout(finish, 1400);

    // Also ensure it clears once the window fully loads (whichever is later
    // is handled by the timer + this listener both calling finish()).
    window.addEventListener("load", finish, { once: true });

    return () => {
      window.clearTimeout(minShow);
      window.removeEventListener("load", finish);
    };
  }, []);

  // After the fade-out transition, unmount so it never blocks interaction.
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setRemove(true), 700);
    return () => window.clearTimeout(t);
  }, [done]);

  useEffect(() => {
    // Lock scroll while the intro is visible.
    if (remove) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [remove]);

  if (remove) return null;

  return (
    <div className={`preloader ${done ? "is-done" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-logo">
          <Image
            src="/images/logo.png"
            alt={company.name}
            width={260}
            height={118}
            priority
          />
        </div>
        <div className="preloader-bar">
          <span className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
