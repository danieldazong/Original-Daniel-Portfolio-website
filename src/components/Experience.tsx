/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Plus } from 'lucide-react';
import { EXPERIENCE_DATA, CAPABILITIES } from '../data';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openId, setOpenId] = useState<string | null>(EXPERIENCE_DATA[0]?.id ?? null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  // Index of the currently open role — drives the progress spine fill
  const activeIndex = EXPERIENCE_DATA.findIndex((e) => e.id === openId);
  const progressPct =
    activeIndex < 0
      ? 0
      : ((activeIndex + 1) / EXPERIENCE_DATA.length) * 100;

  return (
       <section ref={sectionRef} id="experience" className="py-24 md:py-32 hero-grid-bg relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="bg-surface/80 backdrop-blur-sm border border-border-custom shadow-sm p-8 md:p-14 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">


          {/* Left — Capabilities */}
          <div>
            <h2 className="hero-display text-text-primary text-4xl md:text-5xl mb-4">
              Capabilities
            </h2>

            {/* Intro line — balances the column weight */}
                        <p className="font-sans text-base text-text-secondary leading-relaxed max-w-md mb-6">
              AI Solutions Engineer with 7+ years across AI systems, automation, and cloud
              security — turning operational complexity into scalable, intelligent solutions.
            </p>

            <div className="flex flex-col">
              {CAPABILITIES.map((cap, index) => (
                <div
                  key={cap.id}
                  className="group relative flex items-center justify-between py-6 border-t border-border-custom last:border-b cursor-default"
                  style={{
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s',
                    transitionDelay: `${index * 0.08}s`,
                    transform: visible ? 'translateY(0)' : 'translateY(24px)',
                    opacity: visible ? 1 : 0
                  }}
                >
                  <div className="flex flex-col">
                    <h3 className="font-space font-bold text-xl md:text-2xl text-text-primary tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      {cap.title}
                    </h3>
                    <p className="font-sans text-sm text-text-secondary mt-1 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 group-hover:mt-2 transition-all duration-300">
                      {cap.description}
                    </p>
                  </div>

                  {/* Hover cue — number fades out, arrow slides in */}
                  <div className="relative flex items-center justify-center w-8 shrink-0">
                    <span className="absolute font-mono text-sm text-text-secondary/60 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-1">
                      0{index + 1}
                    </span>
                    <ArrowRight className="absolute w-4 h-4 text-accent-blue opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Experience accordion timeline */}
          <div>
            <h2 className="hero-display text-text-primary text-4xl md:text-5xl mb-10">
              Experience
            </h2>

                        {/* Timeline spine (base track) */}
                        <div className="relative pl-10">
              {/* Base spine */}
                           <span className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-border-custom" />
                                         {/* Progress fill — accent colored, fades out softly at the bottom */}
              <span
                className="absolute left-0 top-0 w-0.5 rounded-full bg-accent-blue transition-all duration-500 ease-out"
                style={{
                  height: `${progressPct}%`,
                  WebkitMaskImage:
                    'linear-gradient(to bottom, #000 70%, transparent 100%)',
                  maskImage:
                    'linear-gradient(to bottom, #000 70%, transparent 100%)'
                }}
              />




              {EXPERIENCE_DATA.map((exp, index) => {
                const isOpen = openId === exp.id;
                return (
                  <div
                    key={exp.id}
                    className="relative pb-2"
                    style={{
                      transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s',
                      transitionDelay: `${index * 0.12}s`,
                      transform: visible ? 'translateY(0)' : 'translateY(24px)',
                      opacity: visible ? 1 : 0
                    }}
                  >
                                                            {/* Timeline dot — centered on the spine (row sits 2.5rem right of spine) */}
                    <span
                      className={`absolute top-7 w-3 h-3 rounded-full border-2 bg-bg transition-colors duration-300 ${
                        isOpen ? 'border-accent-blue bg-accent-blue' : 'border-text-secondary/40'
                      }`}
                      style={{ left: '-38px', transform: 'translateX(-50%)' }}
                    />






                                        {/* Accordion header (clickable, subtle editorial hover cue) */}
                    <button
                      onClick={() => toggle(exp.id)}
                      className="relative w-full flex items-start justify-between gap-4 py-6 text-left border-b border-border-custom cursor-pointer group"
                    >
                      <div className="flex flex-col transition-transform duration-300 group-hover:translate-x-1.5">
                        <span className="font-mono text-[11px] text-text-secondary uppercase tracking-wider mb-1">
                          {exp.period}
                        </span>
                        <h3 className="font-space font-bold text-lg md:text-xl text-text-primary tracking-tight group-hover:text-accent-blue transition-colors">
                          {exp.role}
                        </h3>
                        <span className="font-sans text-sm text-text-secondary">
                          {exp.organization}
                        </span>
                      </div>

                      <Plus
                        className={`w-5 h-5 shrink-0 mt-1 text-text-secondary transition-transform duration-300 ${
                          isOpen ? 'rotate-45 text-accent-blue' : 'rotate-0'
                        }`}
                      />
                    </button>


                    {/* Accordion body (smooth expand) */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-out"
                      style={{
                        maxHeight: isOpen ? '420px' : '0px',
                        opacity: isOpen ? 1 : 0
                      }}
                    >
                      <div className="pt-5 pb-2 space-y-2">
                        {exp.bulletPoints.map((bullet, i) => (
                          <p key={i} className="font-sans text-sm text-text-secondary leading-relaxed">
                            {bullet}
                          </p>
                        ))}
                      </div>

                                                                  <div className="flex items-baseline gap-3 mt-6 pt-4 pb-2 border-t border-border-custom/60">
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary/50 shrink-0 pt-px">
                          Stack
                        </span>
                        <p className="font-sans text-[13px] text-text-secondary/80 leading-relaxed">
                          {exp.skillsUsed.join("   ·   ")}
                        </p>
                      </div>


                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 mt-12 font-sans text-sm font-semibold text-text-primary"
            >
              Let's work together
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

                  </div>
        </div>
      </div>
    </section>
  );
}

