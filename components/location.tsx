const MAPS_URL = "https://maps.app.goo.gl/D8LXB4B44b3U6n28A";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=10.008771,76.333028";
const PHONE = "+918129730777";
const EMAIL = "rainhomestaykochi@gmail.com";

export function Location() {
  return (
    <section className="section location" id="location">
      <span className="wm wm-kochi is-rose" aria-hidden="true">
        Kochi
      </span>
      <header className="section-head">
        <p className="kicker">Where you’ll be</p>
        <h2>Padamughal, Kakkanad.</h2>
        <address>
          Indira Junction, Rajiv Junction
          <br />
          Satellite Township, Padamughal
          <br />
          Kakkanad, Kochi, Kerala 682030
        </address>
      </header>
      <div className="location-layout">
        <div className="map-frame">
          <iframe
            title="Map of Rain Homestay, Satellite Township, Padamughal"
            src="https://maps.google.com/maps?q=10.008771,76.333028&z=16&hl=en&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="location-meta">
          <p>
            <span>Phone</span>
            <a href={`tel:${PHONE}`}>+91 81297 30777</a>
          </p>
          <p>
            <span>Email</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <a className="btn" href={MAPS_URL} target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
          <a className="textlink" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}
