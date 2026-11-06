const items = [
  "Entire home",
  "Four bedrooms",
  "Padamughal",
  "4,000 sq ft",
  "Parking for 8–10 cars",
  "Kakkanad",
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
