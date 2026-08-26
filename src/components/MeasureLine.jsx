// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import "./MeasureLine.css";

// /**
//  * MeasureLine — the page's signature element.
//  * A fixed vertical tape-measure that runs down the left edge of the
//  * viewport on desktop, its brass fill rising with scroll progress —
//  * a nod to the plumb lines and site levels of a construction survey.
//  * Hidden on touch/narrow layouts where it would only compete for space.
//  */
// export default function MeasureLine() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const onScroll = () => {
//       const h = document.documentElement;
//       const scrollable = h.scrollHeight - h.clientHeight;
//       setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const ticks = Array.from({ length: 11 });

//   return (
//     <div className="measure-line" aria-hidden="true">
//       <div className="measure-line__track">
//         {ticks.map((_, i) => (
//           <span
//             key={i}
//             className="measure-line__tick"
//             style={{ opacity: i % 5 === 0 ? 0.6 : 0.28 }}
//           />
//         ))}
//         <motion.div
//           className="measure-line__fill"
//           style={{ scaleY: progress }}
//         />
//         <motion.div
//           className="measure-line__dot"
//           style={{ top: `${progress * 100}%` }}
//         />
//       </div>
//       <span className="measure-line__label">
//         {String(Math.round(progress * 100)).padStart(2, "0")}
//       </span>
//     </div>
//   );
// }
