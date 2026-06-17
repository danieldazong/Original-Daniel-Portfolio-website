/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
// import About from './components/About'; // Replaced by Projects (/SELECTED WORK) section
import Experience from './components/Experience';
// import Blog from './components/Blog'; // Removed (03 / Writing section)
// import Contact from './components/Contact'; // Removed (04 / Connect section)
import Footer from './components/Footer';
import Projects from './components/Projects';

export default function App() {
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

