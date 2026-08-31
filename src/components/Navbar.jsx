import { useEffect, useRef, useState } from "react";
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
  const scrollYRef = useRef(0);

  /* ============================================================
     SCROLL DETECTION
     ============================================================ */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ============================================================
     LOCK PAGE SCROLL WHEN MOBILE MENU IS OPEN

     Uses the position:fixed technique instead of plain
     overflow:hidden — this is the only approach that reliably
     stops background rubber-band scrolling on iOS Safari, which
     is what caused the menu to look "broken" over some sections.
     Scrollbar width is also compensated so the page doesn't
     visibly shift when the scrollbar disappears.
     ============================================================ */

  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      const y = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, y);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  /* ============================================================
     ESC KEY
     ============================================================ */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  /* ============================================================
     CLOSE MENU AUTOMATICALLY IF RESIZED PAST DESKTOP BREAKPOINT
     ============================================================ */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* ========================================================
          MAIN NAVBAR
          ======================================================== */}

      <motion.header
        className={`navbar ${scrolled ? "navbar--solid" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 1.1,
        }}
      >
        <div className="navbar__inner container">
          {/* ====================================================
              LOGO
              ==================================================== */}

          <motion.a
            href="#top"
            className="navbar__logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
          >
            Sobha<span>realty</span>
          </motion.a>

          {/* ====================================================
              DESKTOP NAVIGATION
              ==================================================== */}

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
                  delay: 1.3 + i * 0.06,
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

          {/* ====================================================
              DESKTOP CTA
              ==================================================== */}

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
        </div>
      </motion.header>

      {/* ========================================================
          MOBILE HAMBURGER / CLOSE BUTTON

          Sits outside .navbar in its own fixed layer, with the
          highest z-index in the header/menu stack — this keeps
          it clickable to close the menu regardless of which
          section is scrolled behind it.
          ======================================================== */}

      <motion.button
        type="button"
        className={`navbar__burger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      >
        <span />
        <span />
        <span />
      </motion.button>

      {/* ========================================================
          MOBILE MENU
          ======================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
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
                    delay: 0.18 + i * 0.07,
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
                  delay: 0.18 + LINKS.length * 0.07,
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
    </>
  );
}