import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./About.css";

const SITE_IMAGE =
  "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?fm=jpg&q=90&w=2000&auto=format&fit=crop";

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

export default function About() {
  const [ref, inView] = useReveal({ threshold: 0.25 });
  const years = useCountUp(27, inView);

  const frameRef = useRef(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 22 });
  const shineX = useTransform(rotateY, [-6, 6], [20, 80]);
  const shineY = useTransform(rotateX, [6, -6], [20, 80]);

  const handleMouseMove = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * 12);
    rotateXRaw.set(-py * 12);
  };

  const handleMouseLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container about__grid">
        <motion.div
          className="about__visual"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            ref={frameRef}
            className="about__frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="about__photo"
              style={{ backgroundImage: `url(${SITE_IMAGE})` }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <motion.div
                className="about__photo-inner"
                initial={{ scale: 1.22 }}
                animate={inView ? { scale: 1 } : {}}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ backgroundImage: `url(${SITE_IMAGE})` }}
              />
            </motion.div>

            <motion.div
              className="about__sheen"
              style={{
                background: useTransform(
                  [shineX, shineY],
                  ([x, y]) =>
                    `radial-gradient(340px circle at ${x}% ${y}%, rgba(243,239,228,0.16), transparent 60%)`
                ),
              }}
            />

            <span className="about__frame-corner about__frame-corner--tl" />
            <span className="about__frame-corner about__frame-corner--br" />
          </motion.div>
        </motion.div>

        <div className="about__copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            We treat every home as a piece of{" "}
            <em>permanent architecture</em>, not a product.
          </motion.h2>

          <motion.p
            className="about__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            At Sobharealty, we understand that true excellence lies in the
            meticulous attention to detail and the artistry of
            craftsmanship. Guided by a commitment to perfection, we believe
            in building not just structures but immersive experiences
            where every nuance, from the pour of the foundation to the
            grain of the door hinge, is thoughtfully considered.
          </motion.p>

          <motion.div
            className="about__cta"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
          >
            <motion.a
              href="#pillars"
              className="btn"
              whileHover={{ scale: 1.035, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Discover Our Craft
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}