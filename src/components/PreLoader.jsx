import { motion, AnimatePresence } from "framer-motion";
import "./PreLoader.css";

/**
 * A brief, one-time loading sequence: the wordmark draws on like a line
 * on a blueprint, then the whole panel lifts away to reveal the hero.
 */
export default function PreLoader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader__mark">
            <svg viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M6 52 L58 8 L112 52 L166 8 L214 52"
                stroke="#b3854a"
                strokeWidth="1.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              SOBHAREALTY
            </motion.span>
          </div>
          <motion.div
            className="preloader__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
