/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { PROJECTS, PROJECT_FILTERS } from '../data';

const COLLAPSED_COUNT = 2;


export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState(false);

  // Preload every project image on mount so tab switches / "Show more"
  // display instantly from cache — no fetch flicker.
  useEffect(() => {
    PROJECTS.forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);


  const filtered =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  // Show-more only applies on the "All" tab; filtered tabs show everything.
  const isCollapsible = activeFilter === 'all' && filtered.length > COLLAPSED_COUNT;
  const visibleProjects =
    isCollapsible && !expanded ? filtered.slice(0, COLLAPSED_COUNT) : filtered;
  const remaining = filtered.length - COLLAPSED_COUNT;


  return (
        <section
      id="work"
      className="py-24 md:py-32 hero-grid-bg relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">

                {/* Centered heading with faded watermark directly behind */}
        <div className="relative flex items-center justify-center mb-12 h-[120px] md:h-[160px]">
          {/* Faded watermark */}
          <span className="portfolio-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            PORTFOLIO
          </span>
          {/* Bold centered heading */}
          <h2 className="portfolio-heading relative z-10 text-text-primary text-4xl md:text-6xl lg:text-7xl text-center">
            /SELECTED WORK
          </h2>
        </div>

                {/* Filter tabs (left) + View All Work button (right) on one row */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {/* Filter tabs — text links with underline on active */}
          <div className="flex flex-wrap items-center gap-6">
            {PROJECT_FILTERS.map((filter) => (
                            <button
                key={filter.key}
                onClick={() => {
                  setActiveFilter(filter.key);
                  setExpanded(false);
                }}
                className={`relative pb-1 font-sans text-sm transition-colors cursor-pointer ${
                  activeFilter === filter.key
                    ? 'font-semibold text-text-primary'
                    : 'font-medium text-text-secondary hover:text-text-primary'
                }`}
              >

                {filter.label}
                {activeFilter === filter.key && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-text-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* View All Work — pill button, right-aligned */}
          <a
            href="#work"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-custom bg-surface font-sans text-sm font-semibold text-text-primary hover:border-text-primary/40 transition-colors whitespace-nowrap"
          >
            View All Work
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>



                {/* Project grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visibleProjects.map((project, index) => {
            // Only the cards revealed by "Show more" (on the All tab) get the
            // fade-in. Tab filtering renders instantly — no animation, no delay.
            const isRevealCard =
              activeFilter === 'all' && expanded && index >= COLLAPSED_COUNT;

            return (
              <a
                key={`${activeFilter}-${project.id}`}
                href={project.link || '#'}
                className="group flex flex-col rounded-none border border-border-custom bg-surface overflow-hidden hover:border-text-primary/30 hover:shadow-md transition-all duration-300"
                style={
                  isRevealCard
                    ? {
                        animation: 'fade-in-scale 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
                        animationDelay: `${(index - COLLAPSED_COUNT) * 0.07}s`,
                        opacity: 0
                      }
                    : undefined
                }
              >




                             {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                  src={project.image}
                  alt={project.title}
                  decoding="sync"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded font-mono text-[10px] font-semibold uppercase tracking-wider bg-surface/90 backdrop-blur text-text-primary border border-border-custom">
                  {project.category === 'real' ? 'Automation' : 'AI App'}
                </span>
              </div>


              {/* Body */}
              <div className="flex flex-col gap-3 p-5">
                <h3 className="font-space text-lg font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full font-sans text-xs font-medium text-text-secondary bg-bg border border-border-custom"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
                      </a>
            );
          })}
        </div>

                {/* Show more / less toggle — only on the All tab when there are extra projects */}
        {isCollapsible && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-border-custom bg-surface font-sans text-sm font-semibold text-text-primary hover:border-text-primary/40 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {expanded ? (
                <>
                  Show less
                  <Minus className="w-4 h-4 transition-transform group-hover:scale-110" />
                </>
              ) : (
                <>
                  Show {remaining} more {remaining === 1 ? 'project' : 'projects'}
                  <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                </>
              )}
            </button>
          </div>
        )}


      </div>
    </section>
  );
}
