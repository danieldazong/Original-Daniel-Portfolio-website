/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import { ABOUT_INTRO, ABOUT_BIO, ABOUT_STATS } from '../data';
import danPortrait from '../assets/images/dan-portfolio.png';

export default function About() {
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 hero-grid-bg border-y border-border-custom relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column — Hey + short intro */}
          <div className="lg:col-span-4 flex flex-col order-2 lg:order-1">
            <h2 className="hero-display text-text-primary text-6xl md:text-7xl leading-none mb-2">
              Hey!
            </h2>
            <div className="w-12 h-1 bg-accent-blue rounded-full mb-8" />

            <p className="font-sans text-lg text-text-primary leading-relaxed font-medium">
              {ABOUT_INTRO}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="p-2 rounded-md border border-border-custom bg-surface text-text-primary hover:text-accent-blue hover:border-accent-blue/40 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="p-2 rounded-md border border-border-custom bg-surface text-text-primary hover:text-accent-blue hover:border-accent-blue/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="p-2 rounded-md border border-border-custom bg-surface text-text-primary hover:text-accent-blue hover:border-accent-blue/40 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Center Column — Portrait */}
          <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-border-custom shadow-xl">
              <img
                src={danPortrait}
                alt="Daniel Dazong — AI Solutions Engineer"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column — Tight bio + stats + CTA */}
          <div className="lg:col-span-4 flex flex-col order-3">
            <div className="space-y-4">
              {ABOUT_BIO.map((paragraph, index) => (
                <p key={index} className="font-sans text-base md:text-lg text-text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stat cards — the attention grabbers */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {ABOUT_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="hero-display text-text-primary text-2xl md:text-3xl leading-none">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[11px] md:text-xs text-text-secondary mt-1 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleScrollToContact}
              className="group inline-flex items-center gap-2 mt-8 w-fit font-sans text-sm font-semibold text-text-primary cursor-pointer"
            >
              Get Started
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-border-custom bg-surface group-hover:bg-accent-blue group-hover:text-surface group-hover:border-accent-blue transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
