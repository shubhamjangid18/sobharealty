import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FloatingCTA.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          className="floating-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Enquire Now</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}