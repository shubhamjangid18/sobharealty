import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PreLoader.css";

const WORD = "SOBHAREALTY";
const EASE = [0.76, 0, 0.24, 1];

/**
 * A brief, one-time loading sequence: a brass line draws on like an
 * architect's blueprint, the wordmark reveals letter by letter, a live
 * counter ticks up to 100 — then the whole panel rises up and off the
 * top of the screen (bottom → top) to reveal the hero underneath.
 */
const TICKS = Array.from({ length: 21 });

export default function PreLoader({ show }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!show) return;
    let raf;
    const start = performance.now();
    const duration = 1900;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2.2);
      const val = Math.round(eased * 100);
      setCount(val);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: EASE, delay: 0.35 }}
        >
          {/* background texture + vignette + ambient glow */}
          <span className="preloader__grain" aria-hidden="true" />
          <span className="preloader__vignette" aria-hidden="true" />
          <motion.span
            className="preloader__glow"
            aria-hidden="true"
            animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="preloader__content"
            animate={done ? { scale: 1.04 } : { scale: 1 }}
            exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* rotating dashed ring behind the mark, eases to a stop on completion */}
            <span className="preloader__ring-wrap" aria-hidden="true">
              <motion.svg
                className="preloader__ring"
                viewBox="0 0 120 120"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: done ? 360 * 3 : 360, opacity: 1 }}
                transition={{
                  rotate: { duration: done ? 6 : 9, repeat: done ? 0 : Infinity, ease: done ? EASE : "linear" },
                  opacity: { duration: 0.8 },
                }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#ringGradient)"
                  strokeWidth="0.6"
                  strokeDasharray="4 10"
                />
                <defs>
                  <linearGradient id="ringGradient" x1="0" y1="0" x2="120" y2="120">
                    <stop offset="0%" stopColor="#8a6636" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#e9c98a" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#8a6636" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* monogram at the ring's center */}
              <motion.span
                className="preloader__monogram"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
              >
                <svg viewBox="0 0 40 40" fill="none">
                  <rect
                    x="4" y="4" width="32" height="32"
                    stroke="rgba(233,201,138,0.55)"
                    strokeWidth="0.6"
                    transform="rotate(45 20 20)"
                  />
                  <text
                    x="20" y="25"
                    textAnchor="middle"
                    fontSize="13"
                    fontFamily="var(--font-display, serif)"
                    fontStyle="italic"
                    fill="#e9c98a"
                  >
                    S
                  </text>
                </svg>
              </motion.span>
            </span>

            <div className="preloader__mark">
              <svg viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brassLine" x1="0" y1="0" x2="220" y2="0">
                    <stop offset="0%" stopColor="#8a6636" />
                    <stop offset="50%" stopColor="#e9c98a" />
                    <stop offset="100%" stopColor="#8a6636" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M6 52 L58 8 L112 52 L166 8 L214 52"
                  stroke="url(#brassLine)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>

              <span className="preloader__word-wrap">
                <span className="preloader__word" aria-label={WORD}>
                  {WORD.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="preloader__letter"
                      initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: 0.55 + i * 0.045,
                        duration: 0.55,
                        ease: EASE,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>

                {/* light sweep across the wordmark once it's fully revealed */}
                <motion.span
                  className="preloader__shimmer"
                  initial={{ x: "-140%" }}
                  animate={{ x: "140%" }}
                  transition={{ delay: 1.3, duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                  aria-hidden="true"
                />
              </span>

              <motion.span
                className="preloader__tagline"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
              >
                Permanent Architecture
              </motion.span>
            </div>

            <div className="preloader__progress">
              <div className="preloader__bar-track">
                <span className="preloader__ticks" aria-hidden="true">
                  {TICKS.map((_, i) => (
                    <span key={i} className="preloader__tick" />
                  ))}
                </span>
                <motion.div
                  className="preloader__bar-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: count / 100 }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
                <motion.span
                  className="preloader__bar-dot"
                  animate={{ left: `${count}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="preloader__meta">
                <motion.span
                  className="preloader__count"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {String(count).padStart(3, "0")}
                  <span className="preloader__count-suffix">%</span>
                </motion.span>

                <motion.span
                  className="preloader__status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {done ? "Welcome" : "Curating Excellence"}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* thin brass seam at the very bottom, the last thing to leave frame */}
          <motion.div
            className="preloader__hairline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.7, ease: EASE, delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}