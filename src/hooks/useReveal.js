import { useEffect, useRef, useState } from "react";

/**
 * useReveal — lightweight IntersectionObserver hook that flips `inView`
 * to true once an element crosses the given threshold, then (by default)
 * disconnects so the reveal animation only ever plays once per element.
 */
export default function useReveal({ threshold = 0.2, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}
