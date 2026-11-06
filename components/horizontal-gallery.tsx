"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";

type SlideItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  width: number;
  height: number;
  specs: string[];
  description: string;
};

const slides: SlideItem[] = [
  {
    id: "house",
    number: "01",
    title: "The house",
    subtitle: "Satellite Township, Kakkanad",
    tagline: "A white house under the trees, kept for one group.",
    image: "/photos/exterior.webp",
    width: 2000,
    height: 1500,
    specs: ["Gated compound", "Parking for 8–10 cars", "One group at a time"],
    description:
      "The front of Rain Homestay in Padamughal. Curved balconies, a covered sit-out, and the trees around the compound.",
  },
  {
    id: "balcony",
    number: "02",
    title: "The balcony",
    subtitle: "Curved upper balcony",
    tagline: "White railings and a view into the trees.",
    image: "/photos/balcony.webp",
    width: 2000,
    height: 1500,
    specs: ["Upper balcony", "Garden trees", "Open to the breeze"],
    description:
      "The upper balcony wraps the front of the house. From here the group looks out over the trees around Satellite Township.",
  },
  {
    id: "swing",
    number: "03",
    title: "Swing terrace",
    subtitle: "Covered upper terrace",
    tagline: "A swing under the open grid roof.",
    image: "/photos/balcony-swing-2.webp",
    width: 1500,
    height: 2000,
    specs: ["Hanging swing", "Grid skylight", "Palm view"],
    description: "A covered terrace on the upper floor, with a swing and a view toward the palms.",
  },
  {
    id: "sitting",
    number: "04",
    title: "Balcony sitting room",
    subtitle: "Curved window room",
    tagline: "Cane chairs around a glass table.",
    image: "/photos/balcony-hall.webp",
    width: 2000,
    height: 1500,
    specs: ["Cane chairs", "Round glass table", "Windows on the trees"],
    description: "A small sitting room on the balcony, with cane chairs and windows looking into the trees.",
  },
  {
    id: "living",
    number: "05",
    title: "Living hall",
    subtitle: "The main hall",
    tagline: "A long sofa for the whole group.",
    image: "/photos/living-wide.webp",
    width: 2000,
    height: 1125,
    specs: ["L-shaped sofa", "For the whole group", "Ground floor"],
    description: "The living hall holds a long sofa and a low table. It is the room the group shares.",
  },
  {
    id: "dining",
    number: "06",
    title: "Dining hall",
    subtitle: "Table for the group",
    tagline: "A glass-top table with ten chairs.",
    image: "/photos/dining.webp",
    width: 2000,
    height: 1125,
    specs: ["Glass-top table", "Ten chairs", "Next to the kitchen"],
    description: "The dining hall has a long glass-top table. Meals for the group are served here.",
  },
  {
    id: "kitchen",
    number: "07",
    title: "Kitchen",
    subtitle: "Cook for the house",
    tagline: "A gas stove, fridge, and sink for the group.",
    image: "/photos/kitchen.webp",
    width: 2000,
    height: 1125,
    specs: ["Gas stove", "Fridge", "The kitchen is yours"],
    description: "The kitchen is part of the booking. A gas stove, fridge, sink, and cupboards are ready for the group.",
  },
  {
    id: "bedrooms",
    number: "08",
    title: "Bedrooms",
    subtitle: "Four bedrooms",
    tagline: "Three bedrooms have air conditioning.",
    image: "/photos/bedroom-teak.webp",
    width: 1500,
    height: 2000,
    specs: ["Teak bed", "Air conditioning", "White linen"],
    description:
      "The house has four bedrooms. Three have air conditioning. This one has a teak bed and white linen.",
  },
];

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Hook into Lenis smooth scrolling for horizontal progress calculation
  useLenis(() => {
    if (!containerRef.current || !trackRef.current) return;
    if (window.innerWidth <= 800) {
      trackRef.current.style.transform = "";
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = rect.height - windowH;

    if (totalDist <= 0) return;

    // Calculate progress through this section (0 to 1)
    const current = -rect.top;
    const progress = Math.min(Math.max(current / totalDist, 0), 1);
    setScrollProgress(progress);

    // Determine active slide index
    const index = Math.min(
      Math.floor(progress * slides.length),
      slides.length - 1
    );
    setActiveIndex(index);

    // Apply translation to track
    const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
    if (maxTranslate > 0) {
      const x = progress * maxTranslate;
      trackRef.current.style.transform = `translate3d(${-x}px, 0, 0)`;
    }
  });

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const containerTop = scrollTop + rect.top;
    const totalDist = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = index / (slides.length - 1);
    const targetScroll = containerTop + targetProgress * totalDist;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="horizontal-parallax-wrapper"
      id="verandah"
      aria-label="House spaces"
    >
      <div className="horizontal-sticky-frame">
        {/* Top Header Strip inside sticky frame */}
        <div className="horizontal-nav-bar">
          <div className="horizontal-controls">
            <span className="slide-counter">
              <span className="current">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="divider">/</span>
              <span className="total">{String(slides.length).padStart(2, "0")}</span>
            </span>
            <div className="control-buttons">
              <button
                type="button"
                className="btn-icon"
                disabled={activeIndex === 0}
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                aria-label="Previous architectural slide"
              >
                ←
              </button>
              <button
                type="button"
                className="btn-icon"
                disabled={activeIndex === slides.length - 1}
                onClick={() => scrollToIndex(Math.min(slides.length - 1, activeIndex + 1))}
                aria-label="Next architectural slide"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal sliding track */}
        <div ref={trackRef} className="horizontal-track">
          {slides.map((slide, index) => {
            // Parallax offset inside card image based on relative position
            const cardOffset = (scrollProgress * (slides.length - 1) - index) * 20;

            return (
              <article key={slide.id} className="horizontal-card" data-index={index}>
                <div
                  className="card-media-box"
                  style={{ ["--photo-ratio" as string]: `${slide.width} / ${slide.height}` }}
                >
                  <div
                    className="card-media-inner"
                    style={{
                      transform: `scale(1.12) translate3d(${cardOffset * -0.6}%, 0, 0)`,
                    }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 65vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-media-overlay" />
                </div>

                <div className="card-content-box">
                  <div className="card-head">
                    <p className="card-subtitle">{slide.subtitle}</p>
                    <h3 className="card-title">{slide.title}</h3>
                    <p className="card-tagline">{slide.tagline}</p>
                  </div>

                  <p className="card-description">{slide.description}</p>

                  <ul className="card-specs-list">
                    {slide.specs.map((spec) => (
                      <li key={spec}>
                        <span className="spec-dot" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="card-footer-meta">
                    <span className="estate-mark">Rain Homestay · Kochi</span>
                    <a href="#book" className="card-reserve-link">
                      Reserve this space →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
