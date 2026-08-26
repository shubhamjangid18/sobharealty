import "./Marquee.css";

const ITEMS = [
  "The Woods",
  "Sobha Central",
  "Hartland II",
  "The Pinnacle",
  "Sobha Reserve",
  "Verde",
  "Sobha One",
  "SeaHaven",
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee">
      <div className="marquee__track">
        {track.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <em>◆</em>
          </span>
        ))}
      </div>
    </div>
  );
}
