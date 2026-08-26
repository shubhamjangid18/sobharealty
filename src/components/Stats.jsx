import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import useCountUp from "../hooks/useCountUp";
import "./Stats.css";

const STATS = [
  {
    end: 6800,
    suffix: "+",
    label: "Units Delivered",
    note: "handed over on schedule",
  },
  {
    end: 27,
    suffix: "",
    label: "Years Building",
    note: "since our first foundation",
  },
  {
    end: 45,
    suffix: "M",
    label: "Sq. Ft. Under Development",
    note: "across active communities",
  },
  {
    end: 4.7,
    suffix: "",
    label: "Client Rating",
    note: "average across verified reviews",
    decimal: true,
  },
];

function StatItem({ stat, inView, index }) {
  const value = useCountUp(
    stat.decimal ? stat.end * 10 : stat.end,
    {
      start: inView,
      duration: 1400 + index * 120,
    }
  );

  const display = stat.decimal
    ? (value / 10).toFixed(1)
    : value.toLocaleString();

  return (
    <motion.article
      className="stat"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="stat__top">
        <span className="stat__number">0{index + 1}</span>
        <span className="stat__top-line" />
      </div>

      <div className="stat__value-wrap">
        <span className="stat__value">
          {display}
          {stat.suffix && <em>{stat.suffix}</em>}
        </span>
      </div>

      <span className="stat__label">{stat.label}</span>

      <span className="stat__note">
        <span className="stat__dot" />
        {stat.note}
      </span>
    </motion.article>
  );
}

export default function Stats() {
  const [ref, inView] = useReveal({
    threshold: 0.2,
  });

  return (
    <section className="stats" ref={ref} aria-label="Company statistics">
      <div className="stats__glow stats__glow--one" />
      <div className="stats__glow stats__glow--two" />

      <div className="stats__inner container">
        <motion.div
          className="stats__header"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="stats__eyebrow">
            <span className="stats__line" />
            AT A GLANCE
            <span className="stats__line stats__line--right" />
          </span>

          <h2>
            Experience measured
            <em> in numbers.</em>
          </h2>

          <p>
            Decades of experience, thousands of homes, and a reputation built
            one project at a time.
          </p>
        </motion.div>

        <div className="stats__grid">
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              inView={inView}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="stats__footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.65,
            delay: 0.4,
          }}
        >
          <span>EST. 1999</span>
          <span className="stats__footer-line" />
          <span>BUILDING WITH PURPOSE</span>
        </motion.div>
      </div>
    </section>
  );
}
