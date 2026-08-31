import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./Projects.css";

const PROJECTS = [
  {
    name: "The Woods",
    type: "Wellness Villas",
    location: "Sobha Sanctuary, Dubai",
    img: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sobha Central",
    type: "Sky Residences",
    location: "Sheikh Zayed Road, Dubai",
    img: "https://images.unsplash.com/photo-1739900292622-a7f860175aad?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "The Pinnacle",
    type: "Waterfront Apartments",
    location: "Sobha Central, Dubai",
    img: "https://images.unsplash.com/photo-1660217327743-31db0be68384?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sobha Reserve",
    type: "Signature Villas",
    location: "Wadi Al Safa, Dubai",
    img: "https://images.unsplash.com/photo-1640880997996-c166edb0ba5e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Riverside Crescent",
    type: "Canal Apartments",
    location: "Hartland II, Dubai",
    img: "https://images.unsplash.com/photo-1743819458014-f5cf74f175e3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "The Orchard",
    type: "Garden Villas",
    location: "Sobha City, Abu Dhabi",
    img: "https://images.unsplash.com/photo-1743819455744-05417bf55cea?auto=format&fit=crop&w=1200&q=80",
  },
];

function ProjectCard({ p }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-1.2, 0, 1.2]);
  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [26, 0, -10]);

  return (
    <motion.a
      ref={cardRef}
      href="#contact"
      className="project-card"
      style={{ y: cardY, rotate }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="project-card__media">
        <motion.div
          className="project-card__img"
          style={{ backgroundImage: `url(${p.img})`, y: imgY }}
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="project-card__scrim" />
        <div className="project-card__grid-overlay" />
        <motion.span
          className="project-card__arrow"
          aria-hidden="true"
          variants={{ hover: { x: 3, y: -3, rotate: 45, backgroundColor: "var(--brass)", color: "var(--ink)" } }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          ↗
        </motion.span>
        <motion.span
          className="project-card__tag"
          variants={{ hover: { opacity: 1, y: 0 } }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          View Residence
        </motion.span>
      </div>
      <div className="project-card__body">
        <div>
          <h3>{p.name}</h3>
          <p>{p.location}</p>
        </div>
        <span className="project-card__type">{p.type}</span>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const [revealRef, inView] = useReveal({ threshold: 0.1 });
  const sectionRef = useRef(null);

  // Merge useReveal's ref (an object, not a callback) with our own
  // sectionRef so both the IntersectionObserver and useScroll can attach
  // to the same DOM node without one clobbering the other.
  const setSectionRefs = useCallback(
    (node) => {
      sectionRef.current = node;
      if (typeof revealRef === "function") {
        revealRef(node);
      } else if (revealRef && "current" in revealRef) {
        revealRef.current = node;
      }
    },
    [revealRef]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="projects" id="projects" ref={setSectionRefs}>
      <span className="projects__rail" aria-hidden="true">
        <motion.span className="projects__rail-fill" style={{ height: railFill }} />
      </span>

      <div className="container">
        <motion.div className="projects__head" style={{ y: headY }}>
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Residences
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Landmark addresses across the UAE
            </motion.h2>
          </div>
          <motion.p
            className="projects__intro"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            A curated portfolio of villas, apartments and waterfront
            residences — each built on the same foundation of craftsmanship,
            wherever it stands.
          </motion.p>
        </motion.div>

        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <ProjectCard p={p} key={p.name} />
          ))}
        </div>
      </div>
    </section>
  );
}