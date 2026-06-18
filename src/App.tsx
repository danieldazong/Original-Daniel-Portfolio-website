/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';

// import About from './components/About'; // Replaced by Projects (/SELECTED WORK) section
import Experience from './components/Experience';
// import Blog from './components/Blog'; // Removed (03 / Writing section)
// import Contact from './components/Contact'; // Removed (04 / Connect section)
import Footer from './components/Footer';
import Projects from './components/Projects';
import WorkPage from './pages/WorkPage';

function Home() {
  return (
    <div className="min-h-screen bg-bg text-text-primary antialiased font-sans">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  // Smooth scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Jump to top whenever the route changes (e.g. navigating to /work)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<WorkPage />} />
    </Routes>
  );
}
