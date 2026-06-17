/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { ArrowUpRight, MoreHorizontal, X } from 'lucide-react';
import logo from '../assets/images/Logo.webp';


interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);

  // Scroll: shadow + scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 120;

      for (const item of NAV_ITEMS) {
        const id = item.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    const onClickOutside = (e: globalThis.MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
        <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-surface/80 backdrop-blur-md border-b border-zinc-200/60 shadow-sm'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >

               <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">


        {/* Name/Logo — top left */}
        <a
          id="nav-logo"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('');
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
                    <img
            src={logo}
            alt="Daniel Dazong logo"
            className="w-8 h-8 object-contain select-none transition-transform duration-200 group-hover:scale-105"
          />

                    <span className="font-space font-bold text-lg tracking-tight text-text-primary hidden sm:inline">
            DANIEL DAZONG
          </span>

        </a>

        {/* Centered pill nav */}
        <div
          ref={pillRef}
          className="absolute left-1/2 -translate-x-1/2 z-50"
        >
          {/* Collapsed pill */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-text-primary text-surface shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <span className="font-space font-semibold text-sm tracking-tight">
              {activeSection
                ? NAV_ITEMS.find((i) => i.href === `#${activeSection}`)?.label ?? 'Menu'
                : 'Menu'}
            </span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-surface text-text-primary transition-transform duration-300">
              {menuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <MoreHorizontal className="w-4 h-4" />
              )}
            </span>
          </button>

          {/* Dropdown panel */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 mt-3 w-56 origin-top rounded-2xl bg-text-primary text-surface shadow-2xl p-2 transition-all duration-300 ${
              menuOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const id = item.href.substring(1);
                const isActive = activeSection === id;
                return (
                                    <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`group/item flex items-center justify-between px-4 py-3 rounded-xl font-sans text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-surface text-text-primary'
                        : 'text-zinc-300 hover:bg-surface hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className="w-4 h-4 opacity-60 transition-colors group-hover/item:text-text-primary group-hover/item:opacity-100" />
                  </a>

                );
              })}

              {/* CTA inside dropdown */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent-blue text-surface font-sans text-sm font-semibold hover:bg-accent-blue-hover transition-colors"
              >
                Let's Talk
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>

                {/* Let's Talk — top right (hidden on small screens) */}
        <a
          id="nav-cta-desktop"
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-surface font-sans text-xs font-semibold hover:bg-zinc-700 transition-all duration-200 shadow-sm"
        >
                    {/* Subtle white "available" pulse */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Let's collaborate
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>


      </div>
    </header>
  );
}
