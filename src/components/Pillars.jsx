import { useRef } from "react";
import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./Pillars.css";

// Small inline icons — kept as simple stroke paths (no icon library
// dependency) so each pillar gets a distinct visual anchor instead of
// just a numeral.
const ICONS = {
  craft: (
    <svg viewBox="0 0 40 40" fill="none">
      <path
        d="M8 32L24 16M24 16l4-4 6 6-4 4M24 16l-4-4M12 28l-4 4M28 12l4-4 4 4-4 4-4-4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M20 8v4M20 28v4M8 20h4M28 20h4M12.3 12.3l2.8 2.8M24.9 24.9l2.8 2.8M12.3 27.7l2.8-2.8M24.9 15.1l2.8-2.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 40 40" fill="none">
      <path
        d="M20 6l4.5 3.4L30 10l1.6 5.4L36 19l-4.4 3.6L30 28l-5.5.6L20 32l-4.5-3.4L10 28l-1.6-5.4L4 19l4.4-3.6L10 10l5.5-.6L20 6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M15 20l3.5 3.5L26 15.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const PILLARS = [
  {
    step: "01",
    icon: "craft",
    title: "Craftsmanship",
    body:
      "Every material, texture and finish is selected and inspected by hand — down to the hinge, the tile grout and the window frame. Nothing ships unless it meets the standard we'd accept in our own homes.",
  },
  {
    step: "02",
    icon: "design",
    title: "Thoughtful Design",
    body:
      "A home is not a structure; it is a piece of considered architecture. Layouts are stress-tested against how people actually live, then subjected to rigorous quality review at every stage of construction.",
  },
  {
    step: "03",
    icon: "quality",
    title: "Signature Quality",
    body:
      "We manufacture much of what we build with — from stone to fittings — so we control the entire chain of quality, not just the assembly. The result is a consistency few developers can match.",
  },
];

function PillarCard({ p, i, inView }) {
  const cardRef = useRef(null);

  // Cursor-tracked spotlight — set as CSS custom properties directly on
  // the node so the glow follows the mouse without a re-render per pixel.
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  };

  return (
    <motion.article
      ref={cardRef}
      className="pillar"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.15 + i * 0.12,
      }}
      whileHover={{ y: -10 }}
    >
      <span className="pillar__watermark">{p.step}</span>
      <span className="pillar__spotlight" />

      <motion.span
        className="pillar__icon"
        initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.28 + i * 0.12,
        }}
      >
        {ICONS[p.icon]}
      </motion.span>

      <span className="pillar__step">{p.step}</span>
      <h3>{p.title}</h3>
      <p>{p.body}</p>

      <motion.div
        className="pillar__line"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />

      <span className="pillar__corner" />
    </motion.article>
  );
}

export default function Pillars() {
  const [ref, inView] = useReveal({ threshold: 0.15 });

  return (
    <section className="pillars" id="pillars" ref={ref}>
      <div className="container">
        <div className="pillars__head">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            From Concept to Completion
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            The pillars that define our build
          </motion.h2>
        </div>

        {/* Progress timeline — a quiet visual echo of "Concept to
            Completion", filling left-to-right as the section reveals. */}
        <div className="pillars__timeline" aria-hidden="true">
          <motion.span
            className="pillars__timeline-fill"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ transformOrigin: "left" }}
          />
          {PILLARS.map((p, i) => (
            <motion.span
              key={p.step}
              className="pillars__timeline-dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2 + i * 0.35,
              }}
            />
          ))}
        </div>

        <div className="pillars__list">
          {PILLARS.map((p, i) => (
            <PillarCard p={p} i={i} inView={inView} key={p.step} />
          ))}
        </div>
      </div>
    </section>
  );
}