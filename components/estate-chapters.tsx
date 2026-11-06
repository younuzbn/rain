import Image from "next/image";

const chapters = [
  {
    title: "the balcony",
    place: "Kakkanad, Kochi",
    coords: ["10.0088° N", "76.3330° E"],
    image: "/photos/balcony.webp",
    alt: "Curved balcony at Rain Homestay looking into the trees",
    text: "A curved white balcony above the garden, open to the trees around the house.",
  },
  {
    title: "the rain court",
    place: "Satellite Township",
    coords: ["10.0088° N", "76.3330° E"],
    image: "/courtyard-rain.webp",
    alt: "Open courtyard at Rain Homestay with rain falling onto river stone",
    text: "An open court in the middle of the house, where the monsoon falls onto river stone.",
  },
];

export function EstateChapters() {
  return (
    <section className="estate-chapters" aria-label="The balcony and the rain court">
      {chapters.map((chapter) => (
        <article key={chapter.title} className="estate-chapter">
          <div className="estate-chapter-media">
            <Image
              src={chapter.image}
              alt={chapter.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="estate-chapter-shade" aria-hidden="true" />

          <div className="chapter-meta">
            <p>
              {chapter.coords[0]}
              <br />
              {chapter.coords[1]}
            </p>
            <p>{chapter.place}</p>
          </div>

          <div className="estate-chapter-copy">
            <h2>{chapter.title}</h2>
            <div className="chapter-aside">
              <p>{chapter.text}</p>
              <span>Rain Homestay</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
