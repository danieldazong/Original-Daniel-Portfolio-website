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
      className="relative min-h-[88vh] md:min-h-screen flex items-start md:items-center justify-center pt-20 md:pt-24 pb-12 hero-grid-bg overflow-hidden"
    >

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
        <div className="relative z-20 animate-hero-rise">
          <img
            id="hero-avatar"
            src={danPortrait}
            alt="Daniel Dazong — AI Solutions Architect"
            className="h-[60vh] md:h-[68vh] w-auto object-contain object-bottom select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

                                                     {/* Bottom content row — aligned to the same max-w-7xl column as the sections below */}
      <div className="absolute bottom-10 left-0 right-0 z-30">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-6 text-center sm:text-left">

          {/* Title Block — centered on mobile, bottom-left on desktop */}
          <div className="max-w-xs mx-auto sm:mx-0">
            <h2 className="font-space font-bold text-2xl md:text-3xl text-text-primary tracking-tight mb-2">
              AI Solutions Architect
            </h2>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Designing digital products that are clear, usable, and conversion focused.
            </p>
          </div>


          {/* Counterweight Block — bottom right */}
          <div className="text-right hidden sm:block animate-fade-in">
            <p className="font-space font-bold text-2xl md:text-3xl text-text-primary tracking-tight leading-none">
              7+ Years
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary mt-2">
              AI & Automation Engineering
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary mt-1">
              Raleigh, NC · Remote
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}


