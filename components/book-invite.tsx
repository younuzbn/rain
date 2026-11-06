"use client";

import { DateBar } from "@/components/date-bar";

const PHONE = "+918129730777";
const WHATSAPP_URL =
  "https://wa.me/918129730777?text=Hello%20Rain%20Homestay%2C%20I%20would%20like%20to%20check%20availability%20and%20rates%20for%20the%20entire%20home.";

const facts = [
  { label: "The house", value: "One group at a time" },
  { label: "Transfer", value: "Pickup and drop · ₹1,500" },
  { label: "Meals", value: "₹200 a person" },
];

export function BookInvite() {
  return (
    <section className="reserve" id="reserve">
      <div className="reserve-inner">
        <p className="reserve-kicker">Private estate</p>
        <h2 className="reserve-title">Reserve the entire house.</h2>
        <p className="reserve-lead">
          4,000 sq ft in Satellite Township, Padamughal. Four bedrooms, three bathrooms, living halls, a kitchen, and
          parking for 8–10 cars. The house is never shared.
        </p>

        <ul className="reserve-facts">
          {facts.map((fact) => (
            <li key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </li>
          ))}
        </ul>

        <div className="hero-booking-dock">
          <DateBar />
        </div>

        <div className="reserve-links">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={`tel:${PHONE}`}>Call +91 81297 30777</a>
        </div>

        <p className="reserve-note">
          Satellite Township, Padamughal, Kakkanad, Kochi · ₹10,000 a night · Nothing is charged on this site
        </p>
      </div>
    </section>
  );
}
