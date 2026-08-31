import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Craft", href: "#pillars" },
  { label: "Residences", href: "#projects" },
  { label: "Amenities", href: "#amenities" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      className={`navbar ${scrolled ? "navbar--solid" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
    >
      <div className="navbar__inner container">
        <motion.a
          href="#top"
          className="navbar__logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={closeMenu}
        >
          Sobha<span>realty</span>
        </motion.a>

        <nav className="navbar__links">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="navbar__link"
              whileHover="hover"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 1.3 + i * 0.06 
              }}
              onClick={closeMenu}
            >
              <motion.span
                className="navbar__link-label"
                variants={{ hover: { y: -18 } }}
                transition={{ duration: 0.35 }}
              >
                {link.label}
              </motion.span>
              <motion.span
                className="navbar__link-label navbar__link-label--ghost"
                aria-hidden="true"
                variants={{ hover: { y: -18 } }}
                transition={{ duration: 0.35 }}
              >
                {link.label}
              </motion.span>
              <motion.span
                className="navbar__link-underline"
                variants={{ hover: { scaleX: 1, opacity: 1 } }}
                initial={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="#contact"
          className="btn navbar__cta"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.62 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={closeMenu}
        >
          <span>Enquire Now</span>
        </motion.a>

        <button
          className={`navbar__burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="navbar__mobile"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="navbar__mobile-grid" aria-hidden="true" />

            <div className="navbar__mobile-content">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ 
                    duration: 0.55, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: 0.18 + i * 0.07 
                  }}
                  whileHover={{ x: 8 }}
                  whileTap={{ x: 4 }}
                >
                  <span className="navbar__mobile-no">0{i + 1}</span>
                  <span className="navbar__mobile-label">{link.label}</span>
                  <motion.span 
                    className="navbar__mobile-arrow"
                    initial={{ opacity: 0, x: -8 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    ↗
                  </motion.span>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="navbar__mobile-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                href="#contact"
                className="btn btn-solid navbar__mobile-cta"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ 
                  duration: 0.55, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: 0.18 + LINKS.length * 0.07 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enquire Now
              </motion.a>

              <motion.p
                className="navbar__mobile-foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Sobha<span>realty</span> — Dubai, UAE
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}