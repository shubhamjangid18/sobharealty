import { useEffect, useRef, useState } from "react";

/**
 * useCountUp — animates a number from 0 to `end` once `start` is true.
 * Uses a quint ease-out curve so the count settles gently, matching the
 * rest of the site's premium easing.
 */
export default function useCountUp(end, { start = false, duration = 1800 } = {}) {
  const [value, setValue] = useState(0);
  const frame = useRef(null);
  const played = useRef(false);

  useEffect(() => {
    if (!start || played.current) return undefined;
    played.current = true;

    const startTime = performance.now();
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(end * easeOutQuint(progress)));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [start, end, duration]);

  return value;
}
