/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';

// import About from './components/About'; // Replaced by Projects (/SELECTED WORK) section
import Experience from './components/Experience';
// import Blog from './components/Blog'; // Removed (03 / Writing section)
// import Contact from './components/Contact'; // Removed (04 / Connect section)
import Footer from './components/Footer';
import Projects from './components/Projects';
import Reveal from './components/Reveal';

export default function App() {
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

