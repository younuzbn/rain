const features = [
  ["Bedrooms", "Four bedrooms."],
  ["Halls", "Living halls for guests."],
  ["Kitchen", "A kitchen in the home."],
  ["Parking", "On-site parking for 8–10 cars."],
  ["Area", "About 4,000 sq ft."],
  ["Verandah", "Seating along the verandah."],
];

export function Features() {
  return (
    <section className="section features" id="features">
      <header className="section-head">
        <p className="kicker">What this place offers</p>
        <h2>Included with the home.</h2>
      </header>
      <ul className="feature-grid">
        {features.map(([title, detail]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
