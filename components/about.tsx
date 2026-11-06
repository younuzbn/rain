import { Frame } from "@/components/frame";

const facts = [
  ["Type", "Entire home"],
  ["Bedrooms", "4"],
  ["Area", "4,000 sq ft"],
  ["Parking", "8–10 cars"],
];

export function About() {
  return (
    <section className="section about" id="house">
      <span className="wm wm-rain is-rose" aria-hidden="true">
        Rain
      </span>
      <div className="about-layout">
        <header className="section-head">
          <p className="kicker">The home</p>
          <h2>A stay in Padamughal, Kakkanad.</h2>
          <p className="section-lede">
            Rain Homestay is an entire home in Satellite Township, with four
            bedrooms, living halls, and a kitchen. Kochi is a short drive away.
          </p>
        </header>
        <Frame
          shape="soft"
          plate="none"
          position="70% 40%"
          speed={-22}
          sizes="(max-width: 899px) 80vw, 34vw"
          alt="A close view of the verandah seating at Rain Homestay."
        />
      </div>
      <dl className="facts">
        {facts.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
