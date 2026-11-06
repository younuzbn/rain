import { Drop } from "@/components/marks";

const words = [
  "Monsoon",
  "Verandah",
  "Fort Kochi",
  "Laterite",
  "Arabian Sea",
  "Clay tiles",
  "Jew Town",
  "Pepper",
  "Courtyard",
  "Cheena vala",
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="ticker-group" aria-hidden={hidden}>
      {words.map((word) => (
        <span key={word} className="ticker-item">
          <span>{word}</span>
          <Drop className="drop" />
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
