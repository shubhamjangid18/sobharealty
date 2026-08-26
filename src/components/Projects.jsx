import { motion } from "framer-motion";
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

export default function Projects() {
  const [ref, inView] = useReveal({ threshold: 0.1 });

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <div className="projects__head">
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
              Landmark addresses across
              <br /> the UAE
            </motion.h2>
          </div>
          <motion.p
            className="projects__intro"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            A curated portfolio of villas, apartments and waterfront
            residences each built on the same foundation of craftsmanship,
            wherever it stands.
          </motion.p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <motion.a
              href="#contact"
              className="project-card"
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 3) * 0.12,
              }}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className="project-card__media">
                <motion.div
                  className="project-card__img"
                  style={{ backgroundImage: `url(${p.img})` }}
                  initial={{ scale: 1.18, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.4, delay: (i % 3) * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  variants={{ hover: { scale: 1.1 } }}
                  whileHover="hover"
                  {...{ transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                />
                <div className="project-card__scrim" />
                <div className="project-card__grid-overlay" />
                <span className="project-card__no">0{i + 1}</span>
                <motion.span
                  className="project-card__arrow"
                  aria-hidden="true"
                  variants={{ hover: { x: 4, y: -4, rotate: 45, backgroundColor: "var(--brass)", color: "var(--ink)" } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  ↗
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
          ))}
        </div>
      </div>
    </section>
  );
}