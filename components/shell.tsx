"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import "lenis/dist/lenis.css";

const options = {
  autoRaf: true,
  lerp: 0.09,
  anchors: { offset: -76 },
  stopInertiaOnNavigate: true,
};

function applyScroll(scroll: number, limit: number) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.style.setProperty("--scroll", reduce ? "0" : scroll.toFixed(1));
  root.style.setProperty("--scroll-max", String(Math.max(1, limit)));
  }

function ScrollEffects() {
  useLenis((lenis) => {
    applyScroll(lenis.scroll, lenis.limit);
  });

  useEffect(() => {
    const onResize = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      applyScroll(window.scrollY, max);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return null;
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={options}>
      <ScrollEffects />
      {children}
    </ReactLenis>
  );
}
