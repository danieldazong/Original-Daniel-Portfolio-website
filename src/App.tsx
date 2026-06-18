/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

// Shared slide variants — forward goes IN from the right, leaves OUT to the right.
const pageVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

const pageTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};


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

function AnimatedRoutes() {
  const location = useLocation();

  // Jump to top whenever the route changes (e.g. navigating to /work)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

      return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/work"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <WorkPage />
              </motion.div>
            }
          />
        </Routes>
      </div>
    </AnimatePresence>
  );

}

export default function App() {
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

  return <AnimatedRoutes />;
}

