import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import useCountUp from "../hooks/useCountUp";
import "./Stats.css";

const STATS = [
  { end: 6800, suffix: "+", label: "Units Delivered", note: "handed over on schedule" },
  { end: 27, suffix: "", label: "Years Building", note: "since our first foundation" },
  { end: 45, suffix: "M", label: "Sq. Ft. Under Development", note: "across active communities" },
  { end: 4.7, suffix: "", label: "Client Rating", note: "average across verified reviews", decimal: true },
];

function StatItem({ stat, inView, index }) {
  const value = useCountUp(stat.decimal ? stat.end * 10 : stat.end, {
    start: inView,
    duration: 1600 + index * 150,
  });
  const display = stat.decimal ? (value / 10).toFixed(1) : value.toLocaleString();

  return (
    <motion.div
      className="stat"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
    >
      <span className="stat__value">
        {display}
        <em>{stat.suffix}</em>
      </span>
      <span className="stat__label">{stat.label}</span>
      <span className="stat__note">{stat.note}</span>
    </motion.div>
  );
}

export default function Stats() {
  const [ref, inView] = useReveal({ threshold: 0.4 });

  return (
    <section className="stats" ref={ref}>
      <div className="container stats__grid">
        {STATS.map((stat, i) => (
          <StatItem stat={stat} inView={inView} index={i} key={stat.label} />
        ))}
      </div>
    </section>
  );
}