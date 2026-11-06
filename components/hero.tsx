"use client";

import Image from "next/image";
import { DateBar } from "@/components/date-bar";
import { useLenis } from "lenis/react";
import { useRef } from "react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Vertical parallax on scroll
  useLenis((lenis) => {
    if (!imageRef.current || !contentRef.current) return;
    const scroll = lenis.scroll;
    const narrow = window.innerWidth <= 800;
    if (narrow) {
      imageRef.current.style.transform = "";
      contentRef.current.style.transform = "";
      contentRef.current.style.opacity = "1";
      return;
    }
    if (scroll <= window.innerHeight * 1.5) {
      imageRef.current.style.transform = `translate3d(0, ${scroll * 0.28}px, 0) scale(${1 + scroll * 0.00025})`;
      contentRef.current.style.transform = `translate3d(0, ${scroll * -0.12}px, 0)`;
      contentRef.current.style.opacity = `${Math.max(0, 1 - scroll / (window.innerHeight * 0.85))}`;
    }
  });

  return (
    <section ref={heroRef} className="hero-monsoon" id="top">
      {/* Background Media with Parallax */}
      <div className="hero-background-wrap">
        <div ref={imageRef} className="hero-background-inner">
          <Image
            className="hero-photo is-wide"
            src="/content-hero.webp"
            alt="Rain Homestay at night in the rain, the courtyard wet and the rooms lit"
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <Image
            className="hero-photo is-portrait"
            src="/hero-mobile.webp"
            alt="Rain Homestay at night in the rain, seen through the trees"
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        </div>
        <div className="hero-gradient-overlay" />
        <div className="hero-rain-overlay" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="rain-streak"
              style={{
                left: `${(i * 5.7 + 2) % 100}%`,
                animationDelay: `${(i * 0.38) % 2.8}s`,
                animationDuration: `${1.1 + (i % 5) * 0.25}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Foreground Content */}
      <div ref={contentRef} className="hero-content-container">
        <div className="hero-anchor">
          <div className="hero-title-group">
            <p className="hero-kicker">Kakkanad, Kochi</p>
            <h1 className="hero-headline">
              Where the monsoon <em>lingers.</em>
            </h1>
            <p className="hero-subtitle">A private Homestay. In the heart of Kochi</p>
          </div>

          <div className="hero-booking-dock" id="reserve-bar">
            <DateBar />
          </div>
        </div>
      </div>

      <a href="#sanctuary" className="hero-scroll-cue" aria-label="Scroll to discover the sanctuary">
        <span className="scroll-arrow">↓</span>
      </a>
    </section>
  );
}
