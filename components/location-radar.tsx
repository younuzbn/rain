import { nearby } from "@/lib/stay";

const MAPS_URL = "https://maps.app.goo.gl/D8LXB4B44b3U6n28A";
const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=10.008771,76.333028";
const PHONE = "+918129730777";
const WHATSAPP_URL = "https://wa.me/918129730777?text=Hello%20Rain%20Homestay%2C%20I%20would%20like%20to%20enquire%20about%20booking%20dates.";
const EMAIL = "rainhomestaykochi@gmail.com";

export function LocationRadar() {
  return (
    <section className="location-section" id="location">
      <div className="place">
        <div className="place-copy">
          <p className="place-kicker">
            <span>Enviable coordinates</span>
            <span>10.0088° N, 76.3330° E</span>
          </p>
          <h2>Tucked into Satellite Township, minutes from every landmark in Kochi.</h2>
          <p className="place-address">
            Indira Junction, Rajiv Junction, Satellite Township, Padamughal, Kakkanad, Kochi, Kerala 682030.
            A quiet pocket off the main traffic, with a short drive across the city.
          </p>
          <ul className="place-times">
            {nearby.map((dest) => (
              <li key={dest.name}>
                <span>{dest.name}</span>
                <span>
                  {dest.time || dest.distance}
                  {dest.time ? <small>{dest.distance}</small> : null}
                </span>
              </li>
            ))}
          </ul>
          <div className="place-actions">
            <a href={MAPS_URL} target="_blank" rel="noreferrer">
              Google Maps
            </a>
            <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
              Directions
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
          <p className="place-contact">
            <a href={`tel:${PHONE}`}>+91 81297 30777</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
        <div className="place-map">
          <iframe
            title="Rain Homestay on the map"
            src="https://maps.google.com/maps?q=10.008771,76.333028&z=15&hl=en&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
