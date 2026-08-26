import { useEffect, useState } from "react";
import PreLoader from "./components/PreLoader.jsx";
// import MeasureLine from "./components/MeasureLine.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Pillars from "./components/Pillars.jsx";
import Stats from "./components/Stats.jsx";
import Projects from "./components/Projects.jsx";
import Amenities from "./components/Amenities.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import FloatingCTA from "./components/FloatingCTA.jsx";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PreLoader show={loading} />
      {/* <MeasureLine /> */}
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Pillars />
        <Stats />
        <Projects />
        <Amenities />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <FloatingCTA />
    </>
  );
}
