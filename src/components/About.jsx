import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./About.css";

// Verified construction / luxury real-estate Unsplash images
const MAIN_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop";

// Image that reveals on hover
const HOVER_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop";

const PILLARS = [
  {
    num: "01",
    title: "Structural Integrity",
    body: "Every load-bearing element is engineered beyond code — because what holds a home up should never be the minimum.",
  },
  {
    num: "02",
    title: "Material Provenance",
    body: "We source marble, timber, and hardware from the same ateliers that supply the world's finest hospitality brands.",
  },
  {
    num: "03",
    title: "Lifetime Stewardship",
    body: "Ownership doesn't end at handover. Our after-care team remains available for the life of every residence.",
  },
];

export default function About() {
  const [ref, inView] = useReveal({ threshold: 0.2 });

  const [hovered, setHovered] = useState(false);
  const frameRef = useRef(null);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 22 });
  const shineX = useTransform(rotateY, [-6, 6], [20, 80]);
  const shineY = useTransform(rotateX, [6, -6], [20, 80]);
  const shineBg = useTransform([shineX, shineY], ([x, y]) =>
    `radial-gradient(340px circle at ${x}% ${y}%, rgba(243,220,170,0.14), transparent 60%)`
  );

  const handleMouseMove = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rotateYRaw.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    rotateXRaw.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8);
  };

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__ambient" aria-hidden="true" />

      <div className="container about__grid">

        {/* LEFT — image column */}
        <motion.div
          className="about__visual"
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            ref={frameRef}
            className={`about__frame ${hovered ? "is-hovered" : ""}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              rotateXRaw.set(0);
              rotateYRaw.set(0);
              setHovered(false);
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="about__photo-wrap"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              {/* base image */}
              <motion.img
                src={MAIN_IMAGE}
                alt="Luxury high-rise under construction at dusk"
                className="about__img about__img--base"
                animate={{
                  scale: hovered ? 1.1 : 1,
                  filter: hovered
                    ? "grayscale(0) brightness(0.55) saturate(1.05)"
                    : "grayscale(0.12) brightness(0.82) saturate(1.05)",
                }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* reveal image — wipes in on hover */}
              <motion.img
                src={HOVER_IMAGE}
                alt="Construction site detail"
                className="about__img about__img--hover"
                initial={{ clipPath: "inset(0% 100% 0% 0%)", scale: 1.18 }}
                animate={{
                  clipPath: hovered ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
                  scale: hovered ? 1.04 : 1.18,
                }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="about__photo-grade" />

              <span className={`about__sweep ${hovered ? "is-active" : ""}`} aria-hidden />

              <motion.div
                className="about__caption"
                initial={{ y: "100%" }}
                animate={{ y: hovered ? "0%" : "100%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="about__caption-line" />
                <span className="about__caption-text">
                  {hovered
                    ? "On Site — Craft in Motion"
                    : "Structure in Progress — Precision at Every Stage"}
                </span>
              </motion.div>
            </motion.div>

            <motion.div className="about__sheen" style={{ background: shineBg }} />
          </motion.div>
        </motion.div>

        {/* RIGHT — copy */}
        <div className="about__copy">
          <motion.div
            className="about__overline"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about__overline-rule" />
            <span>Our Philosophy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            We don't build homes.<br />
            <em>We craft inheritances.</em>
          </motion.h2>

          <motion.p
            className="about__lead"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            For over two decades, Sobharealty has treated every commission as a
            permanent mark on the landscape — not a unit to be turned over, but a
            residence to be handed down. Our in-house teams of architects, master
            craftsmen, and material specialists work without subcontractors, so
            every decision traces back to a single source of accountability: us.
          </motion.p>

          <motion.ul
            className="about__pillars"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {PILLARS.map((p, i) => (
              <motion.li
                key={p.num}
                className="about__pillar"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.42 + i * 0.1 }}
              >
                <span className="about__pillar-num">{p.num}</span>
                <div>
                  <span className="about__pillar-title">{p.title}</span>
                  <p className="about__pillar-body">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="about__cta"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
          >
            <motion.a
              href="#projects"
              className="btn btn-solid"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              View Residences
            </motion.a>
            <motion.a
              href="#pillars"
              className="btn"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Craft
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}