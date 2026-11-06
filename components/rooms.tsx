import Link from "next/link";
import { Frame } from "@/components/frame";

const cards = [
  {
    title: "Four bedrooms",
    detail: "The house has four bedrooms for the group staying together.",
    position: "22% 60%",
  },
  {
    title: "Living halls",
    detail: "Shared halls sit with the bedrooms and the kitchen.",
    position: "48% 42%",
  },
  {
    title: "The verandah",
    detail: "A long verandah with seating. These photographs show that verandah.",
    position: "70% 38%",
  },
];

export function Rooms() {
  return (
    <section className="section rooms" id="rooms">
      <header className="section-head">
        <p className="kicker">The house</p>
        <h2>Rooms, halls, and the verandah.</h2>
        <p className="section-lede">
          About 4,000 sq ft in Padamughal, with a kitchen and parking for 8–10 cars.
          Rates are on request.
        </p>
        <Link className="btn" href="/book">
          Request the home
        </Link>
      </header>
      <div className="house-cards">
        {cards.map((card) => (
          <article key={card.title}>
            <Frame
              shape="soft"
              plate="none"
              position={card.position}
              speed={16}
              sizes="(max-width: 800px) 92vw, 30vw"
              alt={`${card.title} at Rain Homestay. The photograph shows the verandah.`}
            />
            <h3>{card.title}</h3>
            <p>{card.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
