import { useRef, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./Footer.css";

/* ── Nav columns — each link has a label + target section ID ──
   The id must match the `id` attribute on your page sections.
   External links (Careers, Press, social) use full URLs.       */
const COLUMNS = [
  {
    title: "Residences",
    links: [
      { label: "Apartments",         href: "#apartments" },
      { label: "Villas",             href: "#villas" },
      { label: "Villaments",         href: "#villaments" },
      { label: "Penthouses",         href: "#penthouses" },
      { label: "Commercial Leasing", href: "#commercial-leasing" },
    ],
  },
  {
    title: "Communities",
    links: [
      { label: "Sobha Hartland", href: "#sobha-hartland" },
      { label: "Sobha Central",  href: "#sobha-central" },
      { label: "Sobha Reserve",  href: "#sobha-reserve" },
      { label: "Sobha One",      href: "#sobha-one" },
      { label: "Sobha City",     href: "#sobha-city" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",         href: "#about" },
      { label: "Craftsmanship", href: "#craftsmanship" },
      { label: "Careers",       href: "https://careers.sobharealty.com", external: true },
      { label: "Press",         href: "https://www.sobharealty.com/news", external: true },
      { label: "Contact",       href: "#contact" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/sobharealty",        icon: "IG" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/sobha-realty", icon: "LI" },
  { label: "YouTube",   href: "https://www.youtube.com/@SobhaRealty",          icon: "YT" },
  { label: "TikTok",    href: "https://www.tiktok.com/@sobharealty",           icon: "TK" },
];

const STATS = [
  { value: "40+",   label: "Years of Craftsmanship" },
  { value: "130M+", label: "Sq. ft. Delivered" },
  { value: "27K+",  label: "Homes Built" },
];

function Stat({ value, label, delay, inView }) {
  return (
    <motion.div
      className="footer__stat"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="footer__stat-val">{value}</span>
      <span className="footer__stat-label">{label}</span>
    </motion.div>
  );
}

/* ── Smooth scroll to a section by ID, with optional px offset for fixed headers ── */
function scrollToSection(href, offset = 80) {
  if (!href.startsWith("#")) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  const id = href.slice(1);
  if (id === "top" || id === "") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Footer() {
  /* ── The outer wrapper is the scroll track ── */
  const sceneRef   = useRef(null);
  const contentRef = useRef(null);
  const inView     = useInView(contentRef, { once: true, margin: "-60px" });

  const handleLink = useCallback((e, href, external) => {
    if (external) return; // let browser handle target="_blank"
    e.preventDefault();
    scrollToSection(href);
  }, []);

  /* subtle scale on the bg image as user scrolls through the empty zone */
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    /*
      .footer-scene  — position: relative, holds two children:
        1. .footer-sticky-bg  — sticky 100vh, image only, no text
        2. .footer-content    — normal flow, slides up over the sticky bg
    */
    <div className="footer-scene" ref={sceneRef}>

      {/* ══════════════════════════════════════
          1. STICKY IMAGE — full viewport, no text
             Visible as soon as testimonials end.
             Stays stuck while .footer-content scrolls up over it.
      ══════════════════════════════════════ */}
      <div className="footer-sticky-bg">
        <motion.div
          className="footer-sticky-bg__img"
          style={{ scale: imgScale, opacity: imgOpacity }}
        >
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=85"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </motion.div>

        {/* Dark gradient — heavier at bottom so content below reads cleanly */}
        <div className="footer-sticky-bg__gradient" />

        {/* Scroll hint — fades out as user scrolls */}
        <motion.div
          className="footer-sticky-bg__hint"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]) }}
        >
          <span className="footer-sticky-bg__hint-label">Scroll to explore</span>
          <div className="footer-sticky-bg__hint-line" />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          2. FOOTER CONTENT — slides up over the stuck image
      ══════════════════════════════════════ */}
      <footer className="footer" ref={contentRef}>

        {/* Stats bar */}
        <div className="container footer__stats-bar">
          {STATS.map((s, i) => (
            <Stat key={s.label} {...s} delay={0.05 + i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Main nav block */}
        <div className="container footer__top">
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#top"
              className="footer__logo"
              aria-label="Sobha Realty — back to top"
              onClick={(e) => handleLink(e, "#top")}
            >
              Sobha<em>realty</em>
            </a>
            <p>
              Building landmark residences across the UAE with uncompromising
              craftsmanship, since day one.
            </p>

            <div className="footer__subscribe">
              <label htmlFor="footer-email" className="footer__subscribe-label">
                Stay informed
              </label>
              <div className="footer__subscribe-row">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Your email address"
                  className="footer__subscribe-input"
                />
                <button className="footer__subscribe-btn" type="button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          <div className="footer__cols">
            {COLUMNS.map((col, i) => (
              <motion.div
                className="footer__col"
                key={col.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="footer__col-title">{col.title}</span>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="footer__col-link"
                        onClick={(e) => handleLink(e, link.href, link.external)}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        aria-label={link.external ? `${link.label} — opens in new tab` : link.label}
                      >
                        <span className="footer__col-link-inner">
                          {link.label}
                          {link.external && (
                            <svg
                              className="footer__col-link-ext"
                              width="9" height="9"
                              viewBox="0 0 9 9" fill="none"
                              aria-hidden="true"
                            >
                              <path d="M1 8L8 1M8 1H3M8 1V6"
                                stroke="currentColor"
                                strokeWidth="1.1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="footer__divider container"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Bottom bar */}
        <div className="container footer__bottom">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            © {new Date().getFullYear()} Sobharealty LLC. All rights reserved.
            <span className="footer__sep">·</span>
            <a href="#privacy" className="footer__legal-link">Privacy</a>
            <span className="footer__sep">·</span>
            <a href="#terms" className="footer__legal-link">Terms</a>
          </motion.p>

          <div className="footer__socials">
            {SOCIALS.map((s, i) => (
              <motion.a
                href={s.href}
                key={s.label}
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} — opens in new tab`}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.07 }}
                whileHover={{ y: -2 }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Signature wordmark */}
        <div
          className={`footer__wordmark-wrap${inView ? " is-visible" : ""}`}
          aria-hidden="true"
        >
          {/* thin brass rule — editorial breath before the giant type */}
          <motion.span
            className="footer__wordmark-rule"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div
            className="footer__wordmark"
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.3, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="footer__wordmark-sobha">SOBHA</span>
            <span className="footer__wordmark-realty">realty</span>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}