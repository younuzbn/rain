import Image from "next/image";
import Link from "next/link";

const points = [
  {
    title: "Total group privacy",
    text: "One booking at a time. The house is never shared.",
  },
  {
    title: "Traditional Kerala craft",
    text: "Clay tile, teak pillars, and Athangudi floors.",
  },
  {
    title: "Close to the city",
    text: "About 3 km to Infopark, with the airport about 25 km away.",
  },
];

const photos = [
  {
    src: "/photos/living-wide.webp",
    alt: "The living hall at Rain Homestay, with a long sofa for the group",
    title: "Living hall",
    note: "A sofa for the whole group",
    lead: true,
  },
  {
    src: "/courtyard-rain.webp",
    alt: "Rain falling into the open courtyard at Rain Homestay",
    title: "Rain court",
    note: "Open to the sky",
  },
  {
    src: "/photos/balcony.webp",
    alt: "The curved balcony looking into the trees",
    title: "Balcony",
    note: "Looking into the trees",
  },
];

export function EstateManifesto() {
  return (
    <section className="philosophy" id="sanctuary">
      <div className="philosophy-layout">
        <div className="philosophy-copy">
          <p className="philosophy-kicker">
            <span>The Philosophy</span>
            <span>Padamughal · Kakkanad</span>
          </p>

          <h2 className="philosophy-title">
            The entire estate. Exclusively for your group.
          </h2>

          <p className="philosophy-lead">
            A private house in Satellite Township. Four suites, living halls,
            a kitchen, and a gated compound — reserved for one group at a time.
          </p>

          <ul className="philosophy-points">
            {points.map((point) => (
              <li key={point.title}>
                <strong>{point.title}</strong>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>

          <Link href="/book" className="btn-luxury-primary">
            Reserve the estate
          </Link>
        </div>

        <div className="philosophy-cluster">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className={`philosophy-photo${photo.lead ? " is-lead" : ""}`}
            >
              <div className="philosophy-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={photo.lead ? "(max-width: 900px) 92vw, 28vw" : "(max-width: 900px) 46vw, 16vw"}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption>
                <strong>{photo.title}</strong>
                <span>{photo.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
