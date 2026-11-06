import { Frame } from "@/components/frame";

const bedrooms = [
  { name: "Bedroom 1", position: "18% 70%", speed: 10 },
  { name: "Bedroom 2", position: "80% 40%", speed: -8 },
  { name: "Bedroom 3", position: "30% 80%", speed: 12 },
  { name: "Bedroom 4", position: "50% 20%", speed: -10 },
];

const offers = [
  ["Kitchen", "A kitchen is part of the home."],
  ["4 bedrooms", "The home has four bedrooms."],
  ["Living halls", "Shared halls for the group."],
  ["Parking", "Free parking on the premises for 8–10 cars."],
  ["Verandah", "A long verandah with seating."],
  ["4,000 sq ft", "The home is about 4,000 square feet."],
];

export function Listing() {
  return (
    <section className="section stay" id="stay">
      <span className="wm wm-stay is-stroke" aria-hidden="true">
        Stay
      </span>
      <header className="section-head">
        <p className="kicker">The stay</p>
        <h2>The whole house, for one group.</h2>
        <p className="section-lede">
          Entire home in Satellite Township, Padamughal. Four bedrooms, living
          halls, a kitchen, and a long verandah. Rates are on request.
        </p>
      </header>

      <div className="listing-grid">
        <div className="stay-copy">
          <p className="specs">4 bedrooms · living halls · kitchen · parking for 8–10 cars</p>

          <section className="host-line">
            <h3>Hosted by Rain Homestay</h3>
            <p>
              <a href="tel:+918129730777">+91 81297 30777</a>
              {" · "}
              <a href="mailto:rainhomestaykochi@gmail.com">rainhomestaykochi@gmail.com</a>
            </p>
          </section>

          <div className="highlights">
            <article>
              <h3>Extra spacious</h3>
              <p>About 4,000 sq ft, with four bedrooms and living halls.</p>
            </article>
            <article>
              <h3>Park on the premises</h3>
              <p>Space for 8–10 cars.</p>
            </article>
            <article>
              <h3>Cook at the home</h3>
              <p>A kitchen is included with the stay.</p>
            </article>
          </div>

          <p>
            Breakfast, lunch, and dinner can be added when you request dates.
            Pickup and drop can be added too, including the airport, railway
            stations, and bus stands in Ernakulam.
          </p>

          <div id="sleep">
            <h3>Where you’ll sleep</h3>
            <p className="fine-note">Four bedrooms. The photographs show the home’s verandah.</p>
            <div className="sleep-row">
              {bedrooms.map((room) => (
                <article key={room.name}>
                  <Frame
                    shape="soft"
                    plate="none"
                    position={room.position}
                    speed={room.speed}
                    sizes="(max-width: 800px) 46vw, 16vw"
                    alt={`${room.name}. The photograph shows the verandah at Rain Homestay.`}
                  />
                  <h3>{room.name}</h3>
                  <p>Bedroom</p>
                </article>
              ))}
            </div>
          </div>

          <div id="amenities">
            <h3>What this place offers</h3>
            <ul className="offer-grid">
              {offers.map(([title, detail]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="reviews">
            <h3>Reviews</h3>
            <p>This home does not have guest reviews on this page yet.</p>
          </div>

          <div className="host-card" id="host">
            <h3>Meet your host</h3>
            <p className="host-name">Rain Homestay</p>
            <p>Call or email to ask about a stay.</p>
            <p>
              <a href="tel:+918129730777">+91 81297 30777</a>
              {" · "}
              <a href="mailto:rainhomestaykochi@gmail.com">rainhomestaykochi@gmail.com</a>
            </p>
          </div>

          <div id="rules" className="know-grid">
            <div>
              <h3>House details</h3>
              <p>Entire home. Four bedrooms, living halls, and a kitchen. About 4,000 sq ft.</p>
            </div>
            <div>
              <h3>During your stay</h3>
              <p>Meals and pickup or drop are optional. Add them on the booking page.</p>
            </div>
            <div>
              <h3>Booking</h3>
              <p>Rates are on request. This site keeps your note on the page and does not send it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
