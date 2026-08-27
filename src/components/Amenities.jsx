import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "./Amenities.css";

const AMENITIES = [
  {
    title: "Infinity Pool Decks",
    note: "Resort-grade leisure pools on every masterplan",
    tag: "Aqua Leisure",
    // Stunning rooftop infinity pool overlooking city skyline — ultra crisp
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=90&fit=crop",
  },
  {
    title: "Yoga & Meditation Pavilion",
    note: "Dedicated wellness zones set within landscaping",
    tag: "Mindful Living",
    // Serene open-air yoga pavilion with soft morning light
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=90&fit=crop",
  },
  {
    title: "Forest & Adventure Trails",
    note: "Walking and cycling networks through green corridors",
    tag: "Active Nature",
    // Lush misty forest trail — cinematic & moody
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=90&fit=crop",
  },
  {
    title: "Clubhouse & Social Lounge",
    note: "Private spaces for residents to gather and connect",
    tag: "Social Club",
    // Sophisticated dark-toned luxury lounge interior
    img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=90&fit=crop",
  },
  {
    title: "Outdoor Fitness Zones",
    note: "Calisthenics and open-air training areas",
    tag: "Peak Condition",
    // Sleek modern outdoor gym with dramatic lighting
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=90&fit=crop",
  },
  {
    title: "Children's Play Areas",
    note: "Secure, supervised zones for younger residents",
    tag: "Safe Spaces",
    // Luxury resort kids' zone — designer equipment, lush landscaping, golden hour
    img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&q=90&fit=crop",
  },
  {
    title: "Serenity Gardens",
    note: "Curated landscaping designed for quiet reflection",
    tag: "Tranquil Escape",
    // Immaculate Japanese-style garden with water feature
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=90&fit=crop",
  },
  {
    title: "24/7 Concierge & Security",
    note: "Round-the-clock service across every address",
    tag: "Always On",
    // Grand luxury hotel lobby — polished marble, dramatic architecture
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=90&fit=crop",
  },
];

/* ── Cursor-following image bubble (desktop / pointer devices only) ── */
function FloatingImage({ src, visible, x, y }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="amenity-img-bubble"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.78, rotate: 4 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={src} alt="" loading="lazy" />
          <div className="amenity-img-bubble__sheen" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Single amenity row ── */
function AmenityRow({ amenity, index, inView, isActive, onToggle, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      className={`amenity-row${isActive ? " amenity-row--active" : ""}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.055,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onToggle}
      role="button"
      aria-expanded={isActive}
    >
      <span className="amenity-row__index">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* thumbnail — always visible on touch layouts, hidden on desktop */}
      <div className="amenity-row__thumb">
        <img src={amenity.img} alt="" loading="lazy" />
      </div>

      <div className="amenity-row__body">
        <h4 className="amenity-row__title">{amenity.title}</h4>
        <p className="amenity-row__note">{amenity.note}</p>
        <span className="amenity-row__tag amenity-row__tag--inline">{amenity.tag}</span>
      </div>

      <span className="amenity-row__tag">{amenity.tag}</span>

      <div className="amenity-row__arrow">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* desktop: inline image reveal on hover, right-hand strip */}
      <div className="amenity-row__img-wrap">
        <img src={amenity.img} alt={amenity.title} loading="lazy" />
        <div className="amenity-row__img-overlay" />
      </div>

      {/* mobile: full-bleed image panel that expands open on tap */}
      <div className="amenity-row__expand" aria-hidden={!isActive}>
        <div className="amenity-row__expand-inner">
          <img src={amenity.img} alt={amenity.title} loading="lazy" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function Amenities() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeImg, setActiveImg] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleToggle = (i) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      className="amenities-v2"
      id="amenities"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* floating cursor-follow image */}
      <FloatingImage
        src={activeImg}
        visible={!!activeImg}
        x={cursor.x}
        y={cursor.y}
      />

      <div className="container">
        {/* ── Header ── */}
        <div className="amenities-v2__head">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Living, Elevated
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            An amenity for every<br />
            <em>hour of the day</em>
          </motion.h2>

          <motion.p
            className="amenities-v2__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            Eight curated experiences crafted for wellbeing, connection, and leisure.
          </motion.p>
        </div>

        {/* ── List ── */}
        <div className="amenities-v2__list">
          {AMENITIES.map((a, i) => (
            <AmenityRow
              key={a.title}
              amenity={a}
              index={i}
              inView={inView}
              isActive={activeIndex === i}
              onToggle={() => handleToggle(i)}
              onMouseEnter={() => setActiveImg(a.img)}
              onMouseLeave={() => setActiveImg(null)}
            />
          ))}
        </div>

        {/* ── Footer bar ── */}
        <motion.div
          className="amenities-v2__footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <span>All amenities available across every residential address</span>
          <a href="#masterplan" className="amenities-v2__cta">
            Explore Masterplan
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}