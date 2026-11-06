import Image from "next/image";
import Link from "next/link";

const rooms = [
  {
    index: "01",
    name: "Teak bedroom",
    bed: "Teak bed",
    view: "Air conditioned",
    image: "/photos/bedroom-teak.webp",
    alt: "Bedroom with a teak bed and white linen",
  },
  {
    index: "02",
    name: "Black wood bedroom",
    bed: "Black wood bed",
    view: "Air conditioned",
    image: "/photos/bedroom-black.webp",
    alt: "Bedroom with a black wood bed",
  },
  {
    index: "03",
    name: "Wardrobe bedroom",
    bed: "Wardrobe and mirror",
    view: "Air conditioned",
    image: "/photos/bedroom-wardrobe.webp",
    alt: "Bedroom with a wardrobe and a dressing mirror",
  },
  {
    index: "04",
    name: "Teak bedroom",
    bed: "Teak bed and side tables",
    view: "Air conditioned",
    image: "/photos/bedroom-teak-wide.webp",
    alt: "The teak bedroom seen from the door",
  },
];

export function SuitesShowcase() {
  return (
    <section className="suites-section" id="suites">
      <div className="stay">
        <div className="stay-head">
          <p className="stay-kicker">
            <span>Accommodations</span>
            <span>Four bedrooms, three with air conditioning</span>
          </p>
          <div className="stay-intro">
            <h2>Spaces designed for deep rest, surrounded by gentle rain.</h2>
            <p>
              When you reserve Rain Homestay, you reserve all four suites
              exclusively. The house is yours alone.
            </p>
          </div>
        </div>

        <div className="stay-grid">
          {rooms.map((room) => (
            <article key={room.index} className="stay-card">
              <div className="stay-photo">
                <Image
                  src={room.image}
                  alt={room.alt}
                  fill
                  sizes="(max-width: 700px) 92vw, 22vw"
                  style={{ objectFit: "cover" }}
                />
                <span>{room.index}</span>
              </div>
              <h3>{room.name}</h3>
              <p>{room.bed}</p>
              <p>{room.view}</p>
            </article>
          ))}
        </div>

        <article className="stay-shared">
          <div className="stay-shared-photo">
            <Image
              src="/photos/kitchen.webp"
              alt="The kitchen with a gas stove, fridge, and sink"
              fill
              sizes="(max-width: 800px) 92vw, 46vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="stay-shared-copy">
            <p className="stay-kicker">
              <span>The whole house</span>
            </p>
            <h3>The kitchen, for the whole group.</h3>
            <p>
              A gas stove, fridge, and sink stay with the booking. The dining
              hall next door has a glass-top table for the group.
            </p>
            <Link href="/book" className="btn-luxury-primary">
              Request dates
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
