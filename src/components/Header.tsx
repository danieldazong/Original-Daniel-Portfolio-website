/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';


interface NavItem {
  label: string;
  href: string;
  count?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience', count: '9yr' },
  { label: 'Blog', href: '#blog', count: '12' },
  { label: 'Contact', href: '#contact' },
];


export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for glassmorphic effect & active scrollspy
  useEffect(() => {
    const handleScroll = () => {
      // 1. Update shadow/backdrop
      setScrolled(window.scrollY > 20);

      // 2. Scroll-spy calculation
      const scrollPosition = window.scrollY + 120; // offset for nav height

      // Check which section we are in
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

      // Special case: Top of the page
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md shadow-sm border-b border-border-custom py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Name/Logo */}
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
          <div className="w-8 h-8 bg-accent-blue rounded-sm flex items-center justify-center text-surface font-extrabold font-space shadow-sm transition-transform duration-200 group-hover:scale-105">
            A
          </div>
                    <span className="font-space font-bold text-lg tracking-tight text-text-primary group-hover:text-accent-blue transition-colors relative py-0.5">
            DANIEL DAZONG
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue transition-all duration-300 group-hover:w-full"></span>
          </span>

        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const id = item.href.substring(1);
            const isActive = activeSection === id;
            return (
                            <a
                key={item.href}
                id={`nav-link-${id}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans text-sm font-medium transition-colors relative py-1 inline-flex items-center gap-1 ${
                  isActive
                    ? 'text-accent-blue'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
                {item.count && (
                  <span className="text-[10px] font-mono text-text-secondary/70 align-super">
                    [{item.count}]
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue rounded" />
                )}
              </a>

            );
          })}
        </nav>

        {/* Contact CTA */}
        <div className="hidden md:block">
                    <a
            id="nav-cta-desktop"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-surface font-sans text-xs font-semibold hover:bg-zinc-700 transition-all duration-200 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
          >
            Let's Talk
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 top-[60px] z-40 bg-bg md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full bg-surface px-6 py-8 border-b border-border-custom shadow-lg">
          <nav id="mobile-nav" className="flex flex-col space-y-6">
            {NAV_ITEMS.map((item) => {
              const id = item.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  id={`mobile-nav-link-${id}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-space text-lg font-bold tracking-tight transition-colors py-2 ${
                    isActive ? 'text-accent-blue border-l-4 border-accent-blue pl-4' : 'text-text-secondary pl-4 hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="pt-6 border-t border-border-custom pl-4">
              <a
                id="nav-cta-mobile"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center inline-flex justify-center items-center gap-2 px-5 py-3 rounded-md bg-accent-blue text-surface font-sans text-sm font-semibold hover:bg-accent-blue-hover transition-colors"
              >
                Let's Work Together
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
