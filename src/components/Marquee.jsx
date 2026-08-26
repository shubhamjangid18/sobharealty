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
  // Duplicate the list to create a seamless infinite loop
  const track = [...ITEMS, ...ITEMS];

  return (
    <section className="marquee" aria-label="Featured developments">
      {/* Ambient effects */}
      <div className="marquee__glow marquee__glow--left" />
      <div className="marquee__glow marquee__glow--right" />

      {/* Edge fades */}
      <div className="marquee__fade marquee__fade--left" />
      <div className="marquee__fade marquee__fade--right" />

      <div className="marquee__viewport">
        <div className="marquee__track">
          {track.map((item, i) => (
            <div className="marquee__item" key={`${item}-${i}`}>
              <span className="marquee__name">{item}</span>

              <span className="marquee__diamond" aria-hidden="true">
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}