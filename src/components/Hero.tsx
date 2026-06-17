/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight } from 'lucide-react';
import danPortrait from '../assets/images/dan-portfolio2.webp';


export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 hero-grid-bg overflow-hidden"
    >
      {/* Status Pill — top left */}
      <div className="absolute top-24 left-6 md:left-12 z-30 animate-fade-in">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-text-primary border border-border-custom text-sm font-medium font-sans shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          Available for New Project
        </span>
      </div>

      {/* Layered Hero Composition */}
      <div className="relative w-full max-w-6xl mx-auto px-6 flex items-center justify-center">
                {/* Giant Name — sits BEHIND the portrait */}
        <h1
          id="hero-title"
          className="hero-name absolute inset-0 z-10 flex items-center justify-center text-center select-none pointer-events-none whitespace-nowrap animate-slide-up"
        >
          <span className="hero-name-outline">Daniel</span>
          <span className="hero-name-solid">&nbsp;Dazong</span>
        </h1>


        {/* Portrait — sits IN FRONT of the name */}
        <div className="relative z-20 animate-fade-in-scale">
          <img
            id="hero-avatar"
            src={danPortrait}
            alt="Daniel Dazong — AI Developer"
            className="h-[60vh] md:h-[68vh] w-auto object-contain object-bottom select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

            {/* Title Block — bottom left */}
      <div className="absolute bottom-10 left-6 md:left-12 z-30 max-w-xs">
        <h2 className="font-space font-bold text-2xl md:text-3xl text-text-primary tracking-tight mb-2">
          AI Developer
        </h2>
        <p className="font-sans text-sm text-text-secondary leading-relaxed mb-5">
          Designing digital products that are clear, usable, and conversion focused.
        </p>

        {/* Let's collaborate button */}
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text-primary text-surface font-sans text-sm font-semibold shadow-md hover:bg-accent-blue transition-colors"
        >
          Let's collaborate
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
