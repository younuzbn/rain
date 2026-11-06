import { Frame } from "@/components/frame";

const pictures = [
  { label: "The colonnade", position: "28% 40%", speed: 14 },
  { label: "Cushioned seating", position: "8% 72%", speed: -10 },
  { label: "Golden hour", position: "78% 36%", speed: 12 },
  { label: "Chairs and railing", position: "88% 78%", speed: -8 },
  { label: "Patterned tiles", position: "22% 88%", speed: 10 },
  { label: "The long roof", position: "55% 18%", speed: -12 },
];

export function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <span className="wm wm-look is-stroke" aria-hidden="true">
        Look
      </span>
      <header className="section-head">
        <p className="kicker">Gallery</p>
        <h2>The verandah, from a few angles.</h2>
        <p className="section-lede">Seating, tiles, and the view past the roof.</p>
      </header>
      <div className="gallery-stage">
        {pictures.map((picture) => (
          <Frame
            key={picture.label}
            shape="soft"
            plate="none"
            position={picture.position}
            speed={picture.speed}
            sizes="(max-width: 799px) 92vw, 30vw"
            alt={`Verandah at Rain Homestay: ${picture.label.toLowerCase()}.`}
            caption={picture.label}
          />
        ))}
      </div>
    </section>
  );
}
