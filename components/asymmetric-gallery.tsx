"use client";

import Image from "next/image";
import { useState } from "react";

const frames = [
  { key: "exterior", src: "/photos/exterior.webp", title: "The house", note: "Front of the homestay, under the trees." },
  { key: "drive", src: "/photos/exterior-drive.webp", title: "The driveway", note: "Cobblestone court in front of the house." },
  { key: "balcony", src: "/photos/balcony.webp", title: "Balcony", note: "A curved balcony looking into the trees." },
  { key: "swing", src: "/photos/balcony-swing-2.webp", title: "Swing terrace", note: "A swing under the grid roof." },
  { key: "swing-side", src: "/photos/balcony-swing.webp", title: "Swing terrace", note: "Another view of the covered terrace." },
  { key: "sitting", src: "/photos/balcony-hall.webp", title: "Balcony sitting room", note: "Cane chairs and a round glass table." },
  { key: "living", src: "/photos/living-wide.webp", title: "Living hall", note: "A long sofa for the whole group." },
  { key: "living-side", src: "/photos/living.webp", title: "Living hall", note: "The hall from the television wall." },
  { key: "dining", src: "/photos/dining.webp", title: "Dining hall", note: "A glass-top table and ten chairs." },
  { key: "dining-wide", src: "/photos/dining-wide.webp", title: "Dining hall", note: "The table under the chandelier." },
  { key: "dining-basin", src: "/photos/dining-basin.webp", title: "Dining hall", note: "The dining hall and the wash basin beside it." },
  { key: "kitchen", src: "/photos/kitchen.webp", title: "Kitchen", note: "Gas stove, fridge, and sink." },
  { key: "kitchen-wide", src: "/photos/kitchen-wide.webp", title: "Kitchen", note: "The cooking counter and the windows." },
  { key: "teak", src: "/photos/bedroom-teak.webp", title: "Teak bedroom", note: "Air-conditioned bedroom with a teak bed." },
  { key: "teak-wide", src: "/photos/bedroom-teak-wide.webp", title: "Teak bedroom", note: "The same bedroom from the door." },
  { key: "black", src: "/photos/bedroom-black.webp", title: "Black wood bedroom", note: "Air-conditioned bedroom with a black wood bed." },
  { key: "wardrobe", src: "/photos/bedroom-wardrobe.webp", title: "Wardrobe bedroom", note: "Air-conditioned bedroom with a wardrobe and mirror." },
  { key: "wardrobe-close", src: "/photos/bedroom-wardrobe-close.webp", title: "Wardrobe bedroom", note: "Wardrobe, door, and mirror in the same bedroom." },
];

export function AsymmetricGallery() {
  const [open, setOpen] = useState<(typeof frames)[number] | null>(null);

  return (
    <section className="asymmetric-gallery-section" id="gallery">
      <div className="archive">
        <div className="archive-copy">
          <p className="archive-kicker">
            <span>Visual archive</span>
            <span>Architectural perspectives</span>
          </p>
          <h2>The house, photographed as it is.</h2>
          <p>
            The front, the balcony, the halls, the kitchen, and the bedrooms.
            One house in Padamughal, Kakkanad.
          </p>
        </div>

        {frames.map((frame) => (
          <button
            key={frame.key}
            type="button"
            className="archive-frame"
            onClick={() => setOpen(frame)}
          >
            <Image
              src={frame.src}
              alt={frame.title}
              fill
              sizes="(max-width: 959px) 92vw, 40vw"
              style={{ objectFit: "cover" }}
            />
            <span>{frame.title}</span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="lightbox-overlay"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setOpen(null)}
              aria-label="Close photo"
            >
              Close
            </button>
            <div className="lightbox-image-box">
              <Image
                src={open.src}
                alt={open.title}
                fill
                sizes="95vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="lightbox-caption">
              <h3>{open.title}</h3>
              <p>{open.note}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
