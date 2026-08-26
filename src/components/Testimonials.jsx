import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import "./Testimonials.css";

/* ── Human testimonials, restructured as short two-part stories:
   what they were dealing with before, and what changed after. ── */
const PEOPLE = [
  {
    name: "Robert Hale",
    meta: "38 years old, HR Analyst",
    tag: "Homeowner since 2023",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    s1: "The Search",
    s1text:
      "Wanted somewhere he could actually unwind after work, but every listing nearby was either a tower with no green space or a house with a two-hour commute.",
    s2: "The Difference",
    s2text:
      "Found a three-bedroom eight minutes from the metro with a trail right outside. Says the commute finally stopped feeling like a tax on his evenings.",
  },
  {
    name: "Marie Costa",
    meta: "31 years old, UX Lead",
    tag: "Homeowner since 2022",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    s1: "The Search",
    s1text:
      "Worked remotely and needed real natural light and a room she could close a door on — most apartments she toured had neither.",
    s2: "The Difference",
    s2text:
      "Picked a corner unit facing the gardens. Her whole team now asks what's behind her on video calls.",
  },
  {
    name: "Thomas Reyes",
    meta: "45 years old, Civil Engineer",
    tag: "Homeowner since 2021",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
    s1: "The Search",
    s1text:
      "Two teenagers, one dog, and a shrinking list of places with both good schools and somewhere for the dog to actually run.",
    s2: "The Difference",
    s2text:
      "The trail network settled it. Says it's the first place both kids have asked to stay in on a Friday night.",
  },
  {
    name: "Priya Nair",
    meta: "29 years old, Product Manager",
    tag: "Homeowner since 2023",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
    s1: "The Search",
    s1text:
      "Wanted a first home that didn't feel like a starter — somewhere she wouldn't need to move again in three years.",
    s2: "The Difference",
    s2text:
      "The pool decks and clubhouse changed how her weekends look entirely. Calls it the best financial decision she's made.",
  },
  {
    name: "Daniel Kim",
    meta: "41 years old, Founder",
    tag: "Investor since 2020",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80",
    s1: "The Search",
    s1text:
      "Bought purely as an investment, expecting to rent it out and rarely visit — standard yield play, nothing sentimental.",
    s2: "The Difference",
    s2text:
      "Rental demand outperformed every projection his advisor gave him. Now spends most long weekends there himself.",
  },
  {
    name: "Sarah Mitchell",
    meta: "36 years old, COO",
    tag: "Homeowner since 2022",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    s1: "The Search",
    s1text:
      "Relocating for work with almost no runway — needed to view, decide, and move inside of six weeks, paperwork included.",
    s2: "The Difference",
    s2text:
      "Move-in day took ninety minutes, start to finish. No surprises, no fine print she hadn't already seen coming.",
  },
  {
    name: "Jonathan Reid",
    meta: "52 years old, Managing Director",
    tag: "Homeowner since 2019",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
    s1: "The Search",
    s1text:
      "Had been burned before by developers who treated compliance and paperwork as an afterthought, rushed through at signing.",
    s2: "The Difference",
    s2text:
      "Every document was ready before he asked for it. Says it's the only closing he's been through that felt calm.",
  },
  {
    name: "Ananya Rao",
    meta: "34 years old, Architect",
    tag: "Homeowner since 2023",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    s1: "The Search",
    s1text:
      "Two young kids and a long list of places that looked family-friendly in photos but had nowhere safe for them to actually play outside.",
    s2: "The Difference",
    s2text:
      "Her kids made friends at the play area before the family had finished unpacking their first box.",
  },
];

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 2h4v4M14 2 9 7M6 14H2v-4M2 14l5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AUTOPLAY_MS = 4800;

export default function Testimonials() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const total = PEOPLE.length;

  const goTo = useCallback((i) => {
    setActive(((i % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  /* auto-advance, single line — pauses on hover / touch / manual nav */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -40) next();
    else if (delta > 40) prev();
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 1200);
  };

  /* shortest signed distance from active, so the loop wraps both ways */
  const offsetOf = (i) => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <section className="testimonials-v2" id="testimonials" ref={sectionRef}>
      <div className="testimonials-v2__glow" />

      <div className="container">
        {/* ── Header ── */}
        <div className="testimonials-v2__head">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Resident Testimonials
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            What They're<br /><em>Saying</em>
          </motion.h2>

          <motion.p
            className="testimonials-v2__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            Real homeowners, real move-in days — told in their own words.
          </motion.p>
        </div>

        <motion.span
          className="t-flag"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          {total} Verified Stories
        </motion.span>

        {/* ── Coverflow stack ── */}
        <motion.div
          className="t-stage"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.32 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {PEOPLE.map((p, i) => {
            const offset = offsetOf(i);
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            const style = {
              "--x": `${offset * 58}%`,
              "--rot": `${offset * -10}deg`,
              "--scale": abs === 0 ? 1 : abs === 1 ? 0.84 : 0.7,
              "--op": abs === 0 ? 1 : abs === 1 ? 0.5 : 0.22,
              "--blur": abs === 0 ? "0px" : abs === 1 ? "1.5px" : "3px",
              zIndex: 10 - abs,
            };

            return (
              <button
                key={p.name}
                className={`t-slide${offset === 0 ? " t-slide--active" : ""}`}
                style={style}
                onClick={() => offset !== 0 && goTo(i)}
                aria-hidden={offset !== 0}
                tabIndex={offset === 0 ? 0 : -1}
              >
                <div className="t-slide__top">
                  <img className="t-slide__photo" src={p.avatar} alt={p.name} loading="lazy" />
                  <div>
                    <h4 className="t-slide__name">{p.name}</h4>
                    <p className="t-slide__meta">{p.meta}</p>
                    <p className="t-slide__tag">{p.tag}</p>
                  </div>
                </div>

                <div className="t-slide__block">
                  <p className="t-slide__label">{p.s1}</p>
                  <p className="t-slide__text">{p.s1text}</p>
                </div>

                <div className="t-slide__block">
                  <p className="t-slide__label">{p.s2}</p>
                  <p className="t-slide__text">{p.s2text}</p>
                </div>
              </button>
            );
          })}

          <button className="t-stage__expand" aria-label="View all testimonials">
            <ExpandIcon />
          </button>
        </motion.div>

        {/* ── Avatar navigator, single line, no scrollbar ── */}
        <motion.div
          className="t-nav"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          {PEOPLE.map((p, i) => (
            <button
              key={p.name}
              className={`t-nav__dot${i === active ? " t-nav__dot--active" : ""}`}
              onClick={() => { goTo(i); setPaused(true); setTimeout(() => setPaused(false), 1500); }}
              aria-label={`Show ${p.name}'s story`}
              aria-current={i === active}
            >
              <img src={p.avatar} alt="" loading="lazy" />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}