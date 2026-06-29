/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef, ReactNode, FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResourceDownloadModal from '../components/ResourceDownloadModal';
import { RESOURCES, RESOURCE_FILTERS } from '../data';
import { Resource } from '../types';

interface CardRevealProps {
  children: ReactNode;
  index: number;
  className?: string;
  onClick: () => void;
}

const CardReveal: FC<CardRevealProps> = ({ children, index, className, onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -25% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={className}
      style={{
        transition:
          'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: `${(index % 2) * 120 + 150}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </button>
  );
};

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Resource | null>(null);

  useEffect(() => {
    RESOURCES.forEach((r) => {
      const img = new Image();
      img.src = r.image;
    });
  }, []);

  const filtered =
    activeFilter === 'all'
      ? RESOURCES
      : RESOURCES.filter((r) => r.resourceType === activeFilter);

  return (
    <div className="min-h-screen bg-bg text-text-primary antialiased font-sans">
      <Header />

      <main className="pb-28 md:pb-0">
        <section
          id="resources"
          className="pt-28 pb-20 md:pt-36 md:pb-32 hero-grid-bg relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative">

            <Link
              to="/"
              className="group inline-flex items-center gap-2 mb-8 font-sans text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>

            <div className="relative flex items-center justify-center mb-12 h-[120px] md:h-[160px]">
              <span className="portfolio-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                RESOURCES
              </span>
              <h2 className="portfolio-heading relative z-10 text-text-primary text-4xl md:text-6xl lg:text-7xl text-center">
                /RESOURCES
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-4 mb-10">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 sm:gap-6">
                {RESOURCE_FILTERS.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((resource, index) => (
                <CardReveal
                  key={`${activeFilter}-${resource.id}`}
                  index={index}
                  onClick={() => setSelected(resource)}
                  className="group flex flex-col text-left rounded-none border border-border-custom bg-surface overflow-hidden hover:border-text-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-bg">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      decoding="sync"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 select-none"
                      referrerPolicy="no-referrer"
                    />

                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded font-mono text-[10px] font-semibold uppercase tracking-wider bg-surface/90 backdrop-blur text-text-primary border border-border-custom">
                      {resource.resourceType === 'automation' ? 'Automation' : 'Notion'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 p-5">
                    <h3 className="font-space text-lg font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                      {resource.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full font-sans text-xs font-medium text-text-secondary bg-bg border border-border-custom"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardReveal>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />

      <ResourceDownloadModal resource={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
