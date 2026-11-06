"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { StayIcon } from "@/components/stay-icon";
import {
  allAmenities,
  amenityByName,
  amenityGroups,
  featuredAmenities,
  inr,
  listingCopy,
  nearby,
  rates,
} from "@/lib/stay";

export function PlaceStory({ showBookLink = false }: { showBookLink?: boolean }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const amenityRef = useRef<HTMLDialogElement>(null);
  const amenityCount = allAmenities().length;

  return (
    <div className="place-story">
      <section className="stay-block">
        <ul className="stay-highlights">
          {listingCopy.highlights.map((item) => (
            <li key={item.title}>
              <StayIcon name={item.icon} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="stay-block">
        <h2>About this space</h2>
        <div className={aboutOpen ? "stay-about is-open" : "stay-about"}>
          {listingCopy.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h3>The space</h3>
          {listingCopy.space.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h3>Guest access</h3>
          <p>{listingCopy.access}</p>
          <h3>Other things to note</h3>
          <ul className="stay-near">
            <li>
              <span>Self check-in</span>
              <span>The host shares the way in</span>
            </li>
            {nearby.map((place) => (
              <li key={place.name}>
                <span>{place.name}</span>
                <span>{[place.distance, place.time].filter(Boolean).join(" · ")}</span>
              </li>
            ))}
          </ul>
          <p>{listingCopy.around}</p>
        </div>
        <button type="button" className="stay-more" onClick={() => setAboutOpen((value) => !value)}>
          {aboutOpen ? "Show less" : "Show more"}
        </button>
      </section>

      <section className="stay-block">
        <h2>What this place offers</h2>
        <ul className="stay-offers">
          {featuredAmenities.map((name) => {
            const item = amenityByName(name);
            if (!item) return null;
            return (
              <li key={name}>
                <StayIcon name={item.icon} />
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
        <button type="button" className="stay-outline" onClick={() => amenityRef.current?.showModal()}>
          Show all {amenityCount} amenities
        </button>
      </section>

      <section className="stay-block">
        <h2>Things to know</h2>
        <div className="stay-know">
          <article>
            <StayIcon name="key" />
            <h3>Self check-in</h3>
            <p>The host shares how to enter once the dates are confirmed. A request on this page does not hold the house.</p>
          </article>
          <article>
            <StayIcon name="home" />
            <h3>House rules</h3>
            <p>One group at a time. The kitchen is yours to use. Nothing is charged on this website.</p>
          </article>
          <article>
            <StayIcon name="pin" />
            <h3>Getting around</h3>
            <p>Infopark is about 3 km away. Fort Kochi is about 13 km. The airport is about 25 km. Uber, Rapido, Swiggy, and Zomato reach the house.</p>
          </article>
        </div>
        <p className="place-rate-line">
          {inr(rates.nightly)} a night for the whole house. Pickup and drop {inr(rates.transfer)}. Breakfast, lunch, or dinner{" "}
          {inr(rates.meal)} a person.
        </p>
        {showBookLink && (
          <Link href="/book" className="stay-outline place-book-link">
            Check these dates
          </Link>
        )}
      </section>

      <dialog className="stay-dialog" ref={amenityRef}>
        <div className="stay-dialog-head">
          <h2>What this place offers</h2>
          <button type="button" onClick={() => amenityRef.current?.close()} aria-label="Close amenities">
            ×
          </button>
        </div>
        <div className="stay-dialog-body">
          {amenityGroups.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name} className={item.available ? "" : "is-off"}>
                    <StayIcon name={item.icon} />
                    <span>
                      <strong>{item.available ? item.name : `Unavailable: ${item.name}`}</strong>
                      {item.note && <small>{item.note}</small>}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </dialog>
    </div>
  );
}
