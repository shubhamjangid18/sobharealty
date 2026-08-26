import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";


/**
 * Reveal — premium scroll-triggered motion wrapper.
 * Blur + rise + fade entrance, same feel as the Hero headline.
 *
 * Usage:
 *   <Reveal><h2>Our Philosophy</h2></Reveal>
 *   <Reveal direction="left" delay={0.2}><Card /></Reveal>
 *   <Reveal as="p" distance={20} duration={1.2}>Some text</Reveal>
 */
export default function Reveal({
  children,
  as = "div",
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 1.0,
  blur = 10,
  threshold = 0.2,
  once = true,
  className = "",
}) {
  const [ref, inView] = useReveal({ threshold, once });

  const offsets = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };
  const { x, y } = offsets[direction] || offsets.up;

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y, filter: `blur(${blur}px)` }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, x, y, filter: `blur(${blur}px)` }
      }
      transition={{
        duration,
        delay: inView ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}