import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";

const headline = ["Building", "Landmarks,", "Crafted for", "Generations"];

// Each slide now carries its own caption + coordinates, so the little
// "hero__coords" tag can crossfade in new copy every time the
// background image changes — not just the photo itself.
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1768069794857-9306ac167c6e?fm=jpg&q=90&w=2600&auto=format&fit=crop",
    label: "Dubai Marina",
    coords: ["25.0805° N", "55.1403° E"],
  },
  {
    // Real Burj Khalifa night skyline (Unsplash, free license) — replaces
    // the old daytime/highway shot with something that matches the
    // dark, golden-hour tone of the first image.
    src: "https://images.unsplash.com/photo-1781136194181-aea44724c905?fm=jpg&q=90&w=2600&auto=format&fit=crop",
    label: "Downtown Dubai",
    coords: ["25.1972° N", "55.2744° E"],
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.4 },
  },
};

const line = {
  hidden: { y: "115%", opacity: 0, filter: "blur(14px)" },
  show: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  // --- Preload the first background image. Text/CTA motion only starts
  //     once it's actually painted, so the headline never animates in
  //     over a blank/black hero on a slow connection or fresh refresh. ---
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.src = SLIDES[0].src;
    const markLoaded = () => mounted && setLoaded(true);
    img.onload = markLoaded;
    img.onerror = markLoaded; // fail open — never block the hero forever
    if (img.complete) markLoaded();
    return () => {
      mounted = false;
    };
  }, []);

  // --- Background crossfade: swap image every 5s, only once loaded ---
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (!loaded) return;
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [loaded]);

  // --- Replay motion only on: initial refresh, or scrolling UP back to top ---
  const [replayKey, setReplayKey] = useState(0);
  const wentBelowThreshold = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < lastScrollY.current;

      if (y > 220) {
        wentBelowThreshold.current = true;
      }

      // Trigger replay only when: user had scrolled down past the hero,
      // is now scrolling upward, and has arrived back near the top.
      if (goingUp && wentBelowThreshold.current && y < 80) {
        setReplayKey((k) => k + 1);
        wentBelowThreshold.current = false;
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = SLIDES[bgIndex];

  return (
    <section className="hero" id="top">
      <div className="hero__bg">
        <AnimatePresence mode="sync">
          <motion.div
            key={bgIndex}
            className="hero__bg-layer"
            style={{ backgroundImage: `url(${active.src})` }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
      </div>

      <div className="hero__grid" />
      <div className="hero__vignette" />
      <div className="hero__scrim" />

      <div className="hero__content container" key={replayKey}>
        <motion.h1
          variants={container}
          initial="hidden"
          animate={loaded ? "show" : "hidden"}
        >
          {headline.map((word) => (
            <span className="hero__line-wrap" key={word}>
              <motion.span className="hero__line" variants={line}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="hero__sub-row"
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={loaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero__sub-rule" />
          <p className="hero__sub">
            From foundation to façade, every Sobharealty residence is
            engineered with structural precision and finished by hand — a
            rare discipline in a city built for speed.
          </p>
        </motion.div>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="#projects"
            className="btn btn-solid"
            whileHover={{ scale: 1.035, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Explore Residences
          </motion.a>
          <motion.a
            href="#about"
            className="btn"
            whileHover={{ scale: 1.035, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Our Philosophy
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.7, duration: 0.8 }}
      >
        <span className="hero__scroll-line" />
        <span>Scroll</span>
      </motion.div>

      {/* Location tag — crossfades new copy every time the background
          image changes, in sync with the photo crossfade above. */}
      <div className="hero__coords">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            className="hero__coords-inner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__coords-label">{active.label}</span>
            <span>{active.coords[0]}</span>
            <span>{active.coords[1]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}