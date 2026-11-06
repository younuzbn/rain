"use client";

import { useEffect, useState } from "react";

const KEY = "rain-homestay-intro";

export function Loader() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(KEY) === "1";
    if (reduce || seen) {
      const hide = window.setTimeout(() => setPhase("gone"), 0);
      return () => window.clearTimeout(hide);
    }

    const leave = window.setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setPhase("leave");
    }, 1100);
    const done = window.setTimeout(() => setPhase("gone"), 1850);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "gone") return null;

  const dismiss = () => {
    sessionStorage.setItem(KEY, "1");
    setPhase("leave");
    window.setTimeout(() => setPhase("gone"), 750);
  };

  return (
    <div className={`loader ${phase === "leave" ? "is-leaving" : ""}`}>
      <p className="kicker">Kakkanad, Kochi</p>
      <p className="loader-word" aria-label="Rain">
        {"Rain".split("").map((letter, index) => (
          <span key={letter} style={{ animationDelay: `${index * 0.08}s` }}>
            {letter}
          </span>
        ))}
      </p>
      <span className="loader-rule" />
      <button type="button" className="loader-enter" onClick={dismiss}>
        Enter the house
      </button>
      <noscript>
        <style>{`.loader{display:none !important}`}</style>
      </noscript>
    </div>
  );
}
