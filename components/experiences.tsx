const services = [
  {
    index: "01",
    title: "Airport and station",
    text: "A private car from the gate to the house.",
    facts: ["Pickup and drop · ₹1,500", "Airport · 25 km", "Ernakulam Junction · 9 km"],
  },
  {
    index: "02",
    title: "Kerala meals",
    text: "Home cooking, arranged before you arrive.",
    facts: ["Breakfast, lunch, or dinner · ₹200 a person", "Kitchen is yours to use", "Swiggy and Zomato deliver"],
  },
  {
    index: "03",
    title: "Near Infopark",
    text: "Quiet rooms, about 3 km from the tech campuses.",
    facts: ["Infopark · 3 km", "Fibre Wi-Fi", "Parking for 8–10 cars"],
  },
  {
    index: "04",
    title: "Around Kochi",
    text: "The old city and the mall are a short drive.",
    facts: ["Fort Kochi · 13 km", "LuLu Mall · 7 km", "Backwater trips on request"],
  },
];

export function Experiences() {
  return (
    <section className="experiences-section" id="experiences">
      <div className="care">
        <div className="care-head">
          <p className="care-kicker">
            <span>Bespoke hospitality</span>
            <span>Kerala transfers and meals</span>
          </p>
          <div className="care-intro">
            <h2>
              Thoughtful touches that turn a stay into an unforgettable memory.
            </h2>
            <p>
              Whether you land late or gather the family, the caretakers look
              after the whole group.
            </p>
          </div>
        </div>

        <div className="care-grid">
          {services.map((service) => (
            <article key={service.index} className="care-card">
              <span className="care-index">{service.index}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
