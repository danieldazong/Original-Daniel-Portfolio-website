/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, MouseEvent } from 'react';
import { ArrowUpRight, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const EMAIL = 'dazong.daniel@gmail.com';
const LINKEDIN_URL = 'https://linkedin.com'; /* TODO: replace with your LinkedIn URL */
const GITHUB_URL = 'https://github.com'; /* TODO: replace with your GitHub URL */
const PORTFOLIO_URL = '#home'; /* TODO: replace with your Portfolio URL */

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} id="main-footer" className="bg-bg pt-12">
            {/* Dark rounded-top CTA panel */}
      <section
        id="contact"
        className="relative bg-zinc-900 text-zinc-400 rounded-t-[2.5rem] md:rounded-t-[3.5rem] overflow-hidden"
      >
        {/* Giant brand watermark — bleeds off the bottom edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden"
        >
          <span className="hero-display text-zinc-800/40 leading-none whitespace-nowrap text-[22vw] md:text-[20vw] translate-y-[22%]">
            DANIEL DAZONG
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 md:pt-28 md:pb-16">


          {/* CTA block */}
          <div
            className="flex flex-col items-center text-center"
            style={{
              transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s',
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              opacity: visible ? 1 : 0
            }}
          >
                        <h2 className="hero-display text-surface text-4xl md:text-6xl lg:text-7xl mb-6 leading-[0.95]">
              Have a project<br />in mind?
            </h2>
            <p className="font-sans text-base md:text-lg text-zinc-500 max-w-sm mb-10 leading-relaxed">
              Available for AI, automation, and engineering work — let's talk.
            </p>


            {/* Email CTA — fill-sweep on hover */}
            <a
              href={`mailto:${EMAIL}`}
              className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-surface text-text-primary font-sans text-sm md:text-base font-semibold overflow-hidden transition-colors"
            >
              <span className="absolute inset-0 bg-accent-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-surface">
                {EMAIL}
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:text-surface group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-800 mt-20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                            {/* Identity + location */}
              <div className="text-center md:text-left">
                <h3 className="font-sans font-bold text-base text-surface tracking-tight">
                  Daniel Dazong
                </h3>
                <p className="font-sans text-sm text-zinc-500 mt-1">
                  AI Solutions Engineer · Raleigh, NC
                </p>
              </div>


              {/* Social rails */}
              <div className="flex items-center gap-5">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-zinc-400 hover:text-surface transition-colors"
                  aria-label="Email"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-surface transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-surface transition-colors"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                                <a
                  href={PORTFOLIO_URL}
                  className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 hover:text-surface transition-colors"
                >
                  Portfolio
                </a>

              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                            <p className="font-sans text-sm text-zinc-600">
                © {new Date().getFullYear()} Daniel Dazong · Built with React & Tailwind CSS
              </p>


              <button
                onClick={scrollToTop}
                className="group inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-zinc-400 hover:text-surface transition-colors cursor-pointer"
                aria-label="Scroll back to top"
              >
                Back to top
                <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </footer>
  );
}
