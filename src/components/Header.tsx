/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
   const labelRef = useRef<HTMLSpanElement>(null);
  const [labelWidth, setLabelWidth] = useState<number>(0);

  // Sliding-pill hover indicator for the dropdown
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    // Index of the currently active section within NAV_ITEMS (for the resting pill position)
  const activeIndex = NAV_ITEMS.findIndex((i) => i.href === `#${activeSection}`);

  // The pill follows the hovered item; when nothing is hovered it rests on the active item.
  const indicatorIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  // Position/size of the sliding white pill, measured from the target item
  const indicator =
    indicatorIndex >= 0 && itemRefs.current[indicatorIndex]
      ? {
          top: itemRefs.current[indicatorIndex]!.offsetTop,
          height: itemRefs.current[indicatorIndex]!.offsetHeight,
        }
      : null;



  const currentLabel = activeSection
    ? NAV_ITEMS.find((i) => i.href === `#${activeSection}`)?.label ?? 'Menu'
    : 'Menu';
    // Reset the sliding hover pill whenever the menu closes
  useEffect(() => {
    if (!menuOpen) setHoverIndex(null);
  }, [menuOpen]);



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

    // Watch the footer ("Have a project in mind?" / #contact). Hide the floating CTA
  // while the footer is on screen so it never collides with the footer's own buttons.
  useEffect(() => {
    const footerEl = document.getElementById('contact');
    if (!footerEl) {
      setFooterVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(footerEl);
    return () => observer.disconnect();
  }, [location.pathname]);

    // Scroll-aware auto-hide: hide the floating CTA while the user is actively
  // scrolling (so it never covers content mid-page), then bring it back shortly
  // after scrolling stops. Keeps the button available without colliding with text.
  useEffect(() => {
    let stopTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => setIsScrolling(false), 220);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(stopTimer);
    };
  }, []);

  // Logo click: if on another page (e.g. /work) → go home; if already home → scroll to top (Hero)
  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveSection('');
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
    // CTA ("Let's collaborate" / "Let's Talk") behaviour:
  // - on any page other than /contact → navigate to /contact
  // - if already on /contact → smooth-scroll to the form instead of a dead navigation
  const handleCtaClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveSection('');
    if (location.pathname === '/contact') {
      const formEl = document.getElementById('contact-form');
      if (formEl) {
        const offset = 90;
        const top = formEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/contact');
    }
  };


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
    <>
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
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
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
            className="flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-text-primary text-surface shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <span
              className="relative block overflow-hidden font-space font-semibold text-sm tracking-tight transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: labelWidth ? `${labelWidth}px` : 'auto' }}
            >
              {/* Hidden measurer — sets the target width (not visible) */}
              <span
                ref={labelRef}
                aria-hidden="true"
                className="invisible absolute left-0 top-0 whitespace-nowrap"
              >
                {currentLabel}
              </span>
              {/* Visible animated label */}
              <span
                key={currentLabel}
                className="block whitespace-nowrap animate-label-swap"
              >
                {currentLabel}
              </span>
            </span>


                        <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-surface text-text-primary overflow-hidden">
              {/* Three dots — visible when closed */}
              <MoreHorizontal
                className="absolute w-4 h-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen
                    ? 'rotate(-90deg) scale(0.5)'
                    : 'rotate(0deg) scale(1)',
                }}
              />
              {/* X — visible when open */}
              <X
                className="absolute w-4 h-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen
                    ? 'rotate(0deg) scale(1)'
                    : 'rotate(90deg) scale(0.5)',
                }}
              />
            </span>

          </button>

                    {/* Dropdown panel */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 mt-3 w-56 origin-top rounded-2xl bg-text-primary text-surface border border-white/15 shadow-2xl p-2 transition-all duration-300 ${
              menuOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >

                    <nav
              ref={navRef}
              className="relative flex flex-col"
              onMouseLeave={() => setHoverIndex(null)}
            >
                            {/* Shared sliding white pill — glides between items with elastic overshoot */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 rounded-xl bg-surface"
                style={{
                  top: indicator
                    ? indicator.top + indicator.height / 2
                    : 0,
                  height: indicator ? indicator.height : 0,
                  transform: 'translateY(-50%)',
                  opacity: indicator ? 1 : 0,
                  transition:
                    'top 0.4s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
                }}
              />


              {NAV_ITEMS.map((item, index) => {
                const id = item.href.substring(1);
                const isActive = activeSection === id;
                const isHovered = hoverIndex === index;
                return (
                  <a
                    key={item.href}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => setHoverIndex(index)}
                    className={`relative z-10 flex items-center justify-between px-4 py-3 rounded-xl font-sans text-sm font-medium transition-colors duration-200 ${
                      isHovered || (isActive && hoverIndex === null)
                        ? 'text-text-primary'
                        : 'text-zinc-300'
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight
                      className={`w-4 h-4 transition-all duration-200 ${
                        isHovered || (isActive && hoverIndex === null)
                          ? 'text-text-primary opacity-100'
                          : 'opacity-60'
                      }`}
                    />
                  </a>
                );
              })}


                                                                             {/* CTA inside dropdown — distinct lift + subtle fill shift (Option A) — opens the Contact page */}
                                          <a
                href="/contact"
                onClick={handleCtaClick}
                onMouseEnter={() => setHoverIndex(null)}
                className="group/talk relative z-10 mt-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 text-surface font-sans text-sm font-semibold border border-zinc-700 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-700 hover:border-zinc-600 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {location.pathname === '/contact' ? 'Go to form' : "Let's Talk"}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/talk:translate-x-0.5 group-hover/talk:-translate-y-0.5" />
              </a>



            </nav>
          </div>
        </div>

                                                {/* Let's Talk — top right (hidden on small screens) — opens the Contact page */}
                       <a
          id="nav-cta-desktop"
          href="/contact"
          onClick={handleCtaClick}
          className="group/cta relative hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-surface font-sans text-xs font-semibold overflow-hidden shadow-sm border border-transparent hover:border-text-primary transition-colors duration-300"
        >



          {/* White elastic fill — slides up on hover, retracts down on leave */}
          <span
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-surface translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          />

          {/* Subtle "available" pulse — turns black when the white fill is up */}
          <span className="relative z-10 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white group-hover/cta:bg-text-primary opacity-60 animate-ping transition-colors duration-300" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white group-hover/cta:bg-text-primary transition-colors duration-300" />
          </span>

          <span className="relative z-10 transition-colors duration-300 group-hover/cta:text-text-primary">
            Let's collaborate
          </span>
          <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-colors duration-300 group-hover/cta:text-text-primary" />
        </a>



                  </div>
    </header>

                  {/* Mobile-only floating "Let's collaborate" CTA — fixed to bottom-center, OUTSIDE the header so it anchors to the viewport bottom (hidden on md and up). Hidden on /contact (redundant) and auto-hidden when the footer is in view (avoids colliding with footer/in-page buttons). Stronger floating treatment (ring + heavier shadow) so it never reads as an in-page content button. */}
      {location.pathname !== '/contact' && (
        <a
          id="nav-cta-mobile"
          href="/contact"
          onClick={handleCtaClick}
          aria-label="Let's collaborate"
                    className={`group/fab md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] inline-flex items-center gap-2 whitespace-nowrap px-6 py-3.5 rounded-full bg-text-primary text-surface font-sans text-sm font-semibold shadow-2xl ring-1 ring-white/15 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            footerVisible || isScrolling
              ? 'opacity-0 translate-y-6 pointer-events-none'
              : 'opacity-100 translate-y-0 pointer-events-auto'
          }`}
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          {/* Subtle "available" pulse dot */}
          <span className="flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-white opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>

          <span>Let's collaborate</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
    </>
  );
}



