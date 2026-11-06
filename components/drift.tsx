const lineA = ["Monsoon", "Verandah", "Fort Kochi", "Laterite", "Arabian Sea", "Clay tile"];
const lineB = ["Jew Town", "Pepper", "Courtyard", "Cheena vala", "Lime wash", "Rain"];

function Row({
  words,
  shift,
  stroke = false,
}: {
  words: string[];
  shift: string;
  stroke?: boolean;
}) {
  const repeated = [...words, ...words, ...words, ...words];
  return (
    <div
      className={`drift-row ${stroke ? "is-stroke" : ""}`}
      style={{ ["--shift" as string]: shift }}
    >
      {repeated.map((word, index) => (
        <span key={`${word}-${index}`}>{word}</span>
      ))}
    </div>
  );
}

export function Drift() {
  return (
    <section className="drift" aria-hidden="true">
      <Row words={lineA} shift="0.22" />
      <Row words={lineB} shift="-0.16" stroke />
    </section>
  );
}
