import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FloatingCTA.css";

export default function PremiumFloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floating-cta-container"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <motion.a
            href="#contact"
            className="floating-cta"
            onMouseMove={handleMouseMove}
            whileHover={{
              y: -6,
              boxShadow:
                "0 24px 48px rgba(0, 0, 0, 0.25), 0 0 40px rgba(0, 0, 0, 0.08)",
            }}
            whileTap={{ scale: 0.96, y: -3 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="cta-content">
              <i className="ti ti-arrow-right"></i>
              <span>Enquire Now</span>
            </span>
            <motion.div
              className="cta-highlight"
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </motion.a>

          {/* Floating animation indicator */}
          <motion.div
            className="floating-pulse"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}