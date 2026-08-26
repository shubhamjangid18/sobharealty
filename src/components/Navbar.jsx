import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Sobha<span>realty</span>
        </motion.a>

        <nav className="navbar__links">
          {LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover="hover"
              style={{ position: "relative", display: "inline-block" }}
            >
              {link.label}
              <motion.span
                variants={{
                  hover: { scaleX: 1, opacity: 1 },
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -4,
                  height: 1,
                  background: "currentColor",
                  transformOrigin: "left",
                }}
              />
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="#contact"
          className="btn navbar__cta"
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Enquire Now
        </motion.a>

        <button
          className={`navbar__burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile ${open ? "is-open" : ""}`}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn btn-solid" onClick={() => setOpen(false)}>
          Enquire Now
        </a>
      </div>
    </motion.header>
  );
}