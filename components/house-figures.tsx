"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const stats = [
  { value: "4,000", label: "Sq ft under one roof" },
  { value: "04", label: "Private suites" },
  { value: "80 ft", label: "Timber verandah" },
  { value: "1", label: "Group at a time" },
];

const spaces = [
  {
    index: "01",
    title: "Balcony",
    text: "A curved balcony looking into the trees.",
    image: "/photos/balcony.webp",
    href: "/#verandah",
  },
  {
    index: "02",
    title: "Rain court",
    text: "Open to the sky at the centre of the house.",
    image: "/courtyard-rain.webp",
    href: "/#verandah",
  },
  {
    index: "03",
    title: "Living hall",
    text: "A long sofa for the whole group.",
    image: "/photos/living-wide.webp",
    href: "/#verandah",
  },
  {
    index: "04",
    title: "Bedrooms",
    text: "Teak and black wood beds. Three rooms have air conditioning.",
    image: "/photos/bedroom-teak.webp",
    href: "/#suites",
  },
];

export function HouseFigures() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollRow = (direction: number) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * Math.min(row.clientWidth * 0.8, 320), behavior: "smooth" });
  };

  return (
    <section className="house-figures" id="house">
      <div className="house-figures-top">
        <div className="house-intro">
          <p className="house-kicker">The house</p>
          <h2>A private home, kept for one group.</h2>
          <p>
            Four bedrooms, living halls, a kitchen, and a gated compound in
            Satellite Township, Kakkanad. When you book, the house is yours alone.
          </p>
        </div>

        <ul className="house-stats">
          {stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="house-spaces-head">
        <h3>Spaces in the house</h3>
        <div className="house-space-arrows">
          <button type="button" onClick={() => scrollRow(-1)} aria-label="Previous spaces">
            ←
          </button>
          <button type="button" onClick={() => scrollRow(1)} aria-label="Next spaces">
            →
          </button>
        </div>
      </div>

      <div className="house-space-row" ref={rowRef}>
        {spaces.map((space) => (
          <Link key={space.index} href={space.href} className="house-space-card">
            <div className="house-space-photo">
              <Image
                src={space.image}
                alt={space.title}
                fill
                sizes="(max-width: 800px) 78vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <span className="house-space-index">{space.index}</span>
            </div>
            <h4>{space.title}</h4>
            <p>{space.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
