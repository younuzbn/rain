const closer = [
  ["Infopark, Kakkanad", "The technology park in Kakkanad."],
  ["Edappally", "The junction, with the metro station."],
  ["LuLu Mall, Edappally", "The mall beside Edappally."],
  ["Ernakulam Junction", "The South railway station."],
  ["Cochin International Airport", "At Nedumbassery."],
];

const places = [
  ["Chinese fishing nets", "The cantilever nets on the shore."],
  ["Fort Kochi Beach", "The sea on one side, the nets on the other."],
  ["St. Francis Church", "The oldest European church in India, a short walk from the water."],
  ["Princess Street", "Porches, galleries, and small shops."],
  ["Jew Town", "Spice shops, antique windows, and the Paradesi Synagogue."],
  ["Mattancherry Palace", "Murals in the palace kept by the rajas of Kochi."],
  ["Santa Cruz Basilica", "In Fort Kochi, on the longer way through the old city."],
];

export function Kochi() {
  return (
    <section className="section nearby" id="kochi">
      <span className="wm wm-nets is-rose" aria-hidden="true">
        Kochi
      </span>
      <header className="section-head">
        <p className="kicker">Nearby</p>
        <h2>Around Kochi.</h2>
        <p className="section-lede">
          The house is in Padamughal, Kakkanad. The old city is a separate part of Kochi.
        </p>
      </header>
      <h3 className="nearby-label">Closer to the house</h3>
      <ul className="nearby-list">
        {closer.map(([place, note]) => (
          <li key={place}>
            <strong>{place}</strong>
            <span>{note}</span>
          </li>
        ))}
      </ul>
      <h3 className="nearby-label">The old city</h3>
      <ul className="nearby-list">
        {places.map(([place, note]) => (
          <li key={place}>
            <strong>{place}</strong>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
