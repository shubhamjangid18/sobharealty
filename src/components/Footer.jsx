import { useRef, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./Footer.css";

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */
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
      { label: "Sobha Central",  href: "#sobha-central"  },
      { label: "Sobha Reserve",  href: "#sobha-reserve"  },
      { label: "Sobha One",      href: "#sobha-one"      },
      { label: "Sobha City",     href: "#sobha-city"     },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",         href: "#about"         },
      { label: "Craftsmanship", href: "#craftsmanship" },
      { label: "Careers", href: "https://careers.sobharealty.com", external: true },
      { label: "Press",   href: "https://www.sobharealty.com/news", external: true },
      { label: "Contact",       href: "#contact"       },
    ],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sobharealty",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sobha-realty",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SobhaRealty",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@sobharealty",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1-.04z"/>
      </svg>
    ),
  },
];

const STATS = [
  { value: "40+",   label: "Years of Craftsmanship" },
  { value: "130M+", label: "Sq. ft. Delivered"       },
  { value: "27K+",  label: "Homes Built"             },
];


/* ══════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════ */
function scrollToSection(href, offset = 80) {
  if (!href.startsWith("#")) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  const id = href.slice(1);
  if (!id || id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
}

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


/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
export default function Footer() {
  const sceneRef   = useRef(null);
  const contentRef = useRef(null);
  const inView     = useInView(contentRef, { once: true, margin: "-60px" });

  const handleLink = useCallback((e, href, external) => {
    if (external) return;
    e.preventDefault();
    scrollToSection(href);
  }, []);

  /* scroll-driven animations on the sticky panel */
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  const imgScale   = useTransform(scrollYProgress, [0, 0.5],             [1.12, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.10],            [0, 1]);

  /* Dubai copy: fade IN as image appears, fade OUT as footer card slides up */
  const copyOpacity = useTransform(scrollYProgress, [0.04, 0.18, 0.36, 0.50], [0, 1, 1, 0]);
  const copyY       = useTransform(scrollYProgress, [0.04, 0.20],              [44, 0]);
  const copyScale   = useTransform(scrollYProgress, [0.04, 0.20],              [0.95, 1]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.26, 0.40],     [1, 1, 0]);

  return (
    <div className="footer-scene" ref={sceneRef}>

      {/* ══════════════════════════════════════
          STICKY PANEL — Dubai drone + investment copy
          ══════════════════════════════════════ */}
      <div className="footer-sticky-bg">

        {/* Drone image of Dubai */}
        <motion.div
          className="footer-sticky-bg__img"
          style={{ scale: imgScale, opacity: imgOpacity }}
        >
          <img
            src="https://assets.guideofdubai.com/uploads/Dubai-Drone-Photography-Locations--Capture-the-City-from-Above.webp-OsO7zE.webp"
            alt="Dubai skyline aerial view at dusk"
            loading="lazy"
          />
        </motion.div>

        {/* gradient overlays */}
        <div className="footer-sticky-bg__gradient" />
        <div className="footer-dubai-overlay" />

        {/* ── Investment copy ── */}
        <motion.div
          className="footer-sticky-bg__copy"
          style={{ opacity: copyOpacity, y: copyY, scale: copyScale }}
        >
          {/* Eyebrow with flanking lines */}
          <div className="footer-dubai-kicker">
            <span className="footer-dubai-kicker__line" />
            {/* <span>WELCOME TO DUBAI!</span> */}
            <span className="footer-dubai-kicker__line footer-dubai-kicker__line--right" />
          </div>

          {/* Main ROI figure */}
          <div className="footer-dubai-investment">
            <span className="footer-dubai-investment__amount">$600 Million USD</span>
            <span className="footer-dubai-investment__label">Annually ROI</span>
          </div>

          {/* Gold rule */}
          <span className="footer-dubai-rule" />

          {/* Body copy */}
          <p className="footer-dubai-description">
            We care about your money and give the highest return on your investment.
          </p>

          {/* CTA */}
          <motion.a
            href="#contact"
            className="footer-dubai-cta"
            onClick={(e) => handleLink(e, "#contact")}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Explore Opportunities</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div className="footer-sticky-bg__hint" style={{ opacity: hintOpacity }}>
          <span className="footer-sticky-bg__hint-label">Scroll to explore</span>
          <div className="footer-sticky-bg__hint-line" />
          <span className="footer-sticky-bg__hint-arrow">↓</span>
        </motion.div>

      </div>


      {/* ══════════════════════════════════════
          FOOTER CARD — slides up over image
          ══════════════════════════════════════ */}
      <footer className="footer" ref={contentRef}>

        <div className="container footer__top">

          {/* Brand */}
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#top" className="footer__logo" onClick={(e) => handleLink(e, "#top")}>
              Sobha<em>realty</em>
            </a>

            <p>
              Building landmark residences across the UAE with uncompromising
              craftsmanship, since day one.
            </p>

            <div className="footer__cta-group">
              <motion.button
                type="button"
                className="footer__enquire-btn"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("#contact")}
              >
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

              <div className="footer__subscribe">
                <label htmlFor="footer-email" className="footer__subscribe-label">Stay informed</label>
                <div className="footer__subscribe-row">
                  <input id="footer-email" type="email" placeholder="Your email address"
                    className="footer__subscribe-input"/>
                  <button className="footer__subscribe-btn" type="button" aria-label="Subscribe">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nav columns */}
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
                      >
                        <span className="footer__col-link-inner">
                          {link.label}
                          {link.external && (
                            <svg className="footer__col-link-ext" width="9" height="9"
                              viewBox="0 0 9 9" fill="none" aria-hidden="true">
                              <path d="M1 8L8 1M8 1H3M8 1V6" stroke="currentColor"
                                strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
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

          {/* Stats bar — full width, below the 2-col grid */}
          <div className="footer__stats-bar footer__stats-bar--bottom">
            {STATS.map((s, i) => (
              <Stat key={s.label} {...s} delay={0.05 + i * 0.1} inView={inView} />
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="container footer__bottom">
          <motion.p
            className="footer__legal"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            © {new Date().getFullYear()} Sobharealty LLC. All rights reserved.
          </motion.p>

          <div className="footer__socials">
            {SOCIALS.map((s, i) => (
              <motion.a
                href={s.href}
                key={s.label}
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.52 + i * 0.06 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Credit */}
        <motion.div
          className="footer__credit"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Crafted with care by{" "}
          <a href="#" className="footer__credit-link" onClick={(e) => e.preventDefault()}>
            CreadorDesigns
          </a>
        </motion.div>

        {/* Signature wordmark */}
        <div
          className={`footer__wordmark-wrap${inView ? " is-visible" : ""}`}
          aria-hidden="true"
        >
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