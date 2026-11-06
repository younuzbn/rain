import { Frame } from "@/components/frame";

export function Manifesto() {
  return (
    <section className="section manifesto" id="house">
      <p className="kicker">The house</p>
      <h2>A lime-washed pause between the sea wind and the spice streets.</h2>
      <div className="manifesto-grid">
        <div className="manifesto-copy">
          <p>
            Six rooms share a verandah long enough to lose an afternoon, and a
            courtyard that keeps a square of sky. Teak, lime wash, clay tiles.
          </p>
          <p>
            Kochi does the rest. The fishing nets rise at the beach, pepper
            hangs in the air toward Jew Town, and rain arrives as if it had a
            key.
          </p>
        </div>
        <div className="manifesto-frame">
          <Frame
            shape="soft"
            plate="none"
            position="34% 58%"
            speed={16}
            sizes="(max-width: 979px) 92vw, 40vw"
            caption="Late light on the verandah"
          />
        </div>
      </div>
    </section>
  );
}
