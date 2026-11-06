const keeps = [
  ["Breakfast", "Fruit, coffee, and a Kerala morning."],
  ["The court", "Left open, so the rain has a place."],
  ["The city", "Directions to the nets, the synagogue, or a quiet lunch."],
  ["Evenings", "A backwater day or Kathakali, only when you ask."],
];

export function Keeps() {
  return (
    <section className="section keeps" id="stay">
      <header className="section-head">
        <p className="kicker">At the house</p>
        <h2>What is already here.</h2>
      </header>
      <ul className="amenity-list">
        {keeps.map(([term, detail]) => (
          <li key={term}>
            <strong>{term}</strong>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
