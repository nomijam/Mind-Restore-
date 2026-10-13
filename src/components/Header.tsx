import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Calendar,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  MapPin,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { MindRestoreLogo, MindRestoreEmblem } from './MindRestoreLogo';
import { CONDITIONS_DATA } from '../data/conditionsData';
import { CITIES_DATA } from '../data/citiesData';

export const Header: React.FC = () => {
  const {
    settings,
    openAppointment,
    getPhoneCallLink,
    openConditionPage,
    closeConditionPage,
    activeConditionPage,
    openCityPage,
    closeCityPage,
    activeCityPage,
  } = usePractice();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Desktop dropdown states
  const [conditionsDropdownOpen, setConditionsDropdownOpen] = useState(false);
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  // Mobile submenus
  const [mobileConditionsOpen, setMobileConditionsOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setConditionsDropdownOpen(false);
        setCitiesDropdownOpen(false);
        setAboutDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConditionsDropdownOpen(false);
        setCitiesDropdownOpen(false);
        setAboutDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filter conditions into Common Concerns and Specialised Care
  const commonConcerns = CONDITIONS_DATA.filter((c) => c.category === 'common-concerns');
  const specialisedCare = CONDITIONS_DATA.filter((c) => c.category === 'specialised-care');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setConditionsDropdownOpen(false);
    setCitiesDropdownOpen(false);
    setAboutDropdownOpen(false);

    // If currently viewing a condition or city page, return to home first
    if (activeConditionPage) {
      closeConditionPage();
    }
    if (activeCityPage) {
      closeCityPage();
    }

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectCondition = (slug: string) => {
    setConditionsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (activeCityPage) {
      closeCityPage();
    }
    openConditionPage(slug);
  };

  const handleSelectCity = (slug: string) => {
    setCitiesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (activeConditionPage) {
      closeConditionPage();
    }
    openCityPage(slug);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#1C433E]/10 shadow-xs'
          : 'bg-[#F8F7F2] border-b border-[#1C433E]/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: MindSukoon Official Logo (Est. 1981) */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center transition-transform hover:opacity-95 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C433E]"
              aria-label="MindSukoon Established 1981 - Home"
            >
              <MindRestoreLogo variant="horizontal" size="md" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-[14px] font-medium text-[#526363]">
            {/* 1. CONDITIONS MEGA DROPDOWN (MindSukoon Deep Pine & Heritage Gold Branding) */}
            <div
              className="relative"
              onMouseEnter={() => {
                setConditionsDropdownOpen(true);
                setCitiesDropdownOpen(false);
                setAboutDropdownOpen(false);
              }}
              onMouseLeave={() => setConditionsDropdownOpen(false)}
            >
              <button
                onClick={() => setConditionsDropdownOpen(!conditionsDropdownOpen)}
                aria-expanded={conditionsDropdownOpen}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold tracking-wide transition-all ${
                  conditionsDropdownOpen || activeConditionPage
                    ? 'bg-[#112A27] text-white shadow-md border border-[#D8B878]/30'
                    : 'text-[#1C433E] hover:bg-[#EAF2ED]'
                }`}
              >
                <span>Conditions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    conditionsDropdownOpen
                      ? 'rotate-180 text-[#D8B878]'
                      : activeConditionPage
                      ? 'text-[#D8B878]'
                      : 'text-[#1C433E]'
                  }`}
                />
              </button>

              {/* Conditions Dropdown Menu styled with MindSukoon Dark Heritage Pine (#112A27) and Gold (#D8B878) */}
              {conditionsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-[630px] bg-[#112A27] text-white rounded-2xl shadow-2xl border border-[#1C433E]/80 p-7 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{ boxShadow: '0 25px 50px -12px rgba(17, 42, 39, 0.65)' }}
                >
                  <div className="grid grid-cols-2 gap-8 text-left">
                    {/* Column 1: COMMON CONCERNS */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1C433E]">
                        <span className="text-[11px] font-bold tracking-wider text-[#D8B878] uppercase flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#D8B878]" />
                          <span>COMMON CONCERNS</span>
                        </span>
                        <span className="text-[10px] text-[#A3C2B1] font-medium">8 Separate Pages</span>
                      </div>
                      <ul className="space-y-1">
                        {commonConcerns.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => handleSelectCondition(item.slug)}
                              className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs sm:text-[13px] font-normal transition-colors flex items-center justify-between group ${
                                activeConditionPage?.slug === item.slug
                                  ? 'bg-[#1C433E] text-[#D8B878] font-semibold'
                                  : 'text-[#E2ECE7] hover:text-white hover:bg-[#1C433E]/60'
                              }`}
                            >
                              <span>{item.title}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#D8B878] transition-all" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: SPECIALISED CARE */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1C433E]">
                        <span className="text-[11px] font-bold tracking-wider text-[#D8B878] uppercase flex items-center gap-1.5">
                          <Shield className="w-3 h-3 text-[#D8B878]" />
                          <span>SPECIALISED CARE</span>
                        </span>
                        <span className="text-[10px] text-[#A3C2B1] font-medium">11 Separate Pages</span>
                      </div>
                      <ul className="space-y-1">
                        {specialisedCare.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => handleSelectCondition(item.slug)}
                              className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs sm:text-[13px] font-normal transition-colors flex items-center justify-between group ${
                                activeConditionPage?.slug === item.slug
                                  ? 'bg-[#1C433E] text-[#D8B878] font-semibold'
                                  : 'text-[#E2ECE7] hover:text-white hover:bg-[#1C433E]/60'
                              }`}
                            >
                              <span>{item.title}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#D8B878] transition-all" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom MindSukoon Reassurance Bar */}
                  <div className="mt-5 pt-3.5 border-t border-[#1C433E] flex items-center justify-between text-[11px] text-[#A3C2B1]">
                    <span className="flex items-center gap-1.5">
                      <MindRestoreEmblem className="w-3.5 h-3.5" colorTheme="light" />
                      <span>Every session is 100% confidential under clinical ethics</span>
                    </span>
                    <button
                      onClick={() => handleNavClick({ preventDefault: () => {} } as any, '#conditions')}
                      className="text-[#D8B878] hover:underline font-semibold"
                    >
                      Browse All 19 Tracks →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. CITIES DROPDOWN (Connected to Dedicated City Pages) */}
            <div
              className="relative"
              onMouseEnter={() => {
                setCitiesDropdownOpen(true);
                setConditionsDropdownOpen(false);
                setAboutDropdownOpen(false);
              }}
              onMouseLeave={() => setCitiesDropdownOpen(false)}
            >
              <button
                onClick={() => setCitiesDropdownOpen(!citiesDropdownOpen)}
                aria-expanded={citiesDropdownOpen}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  citiesDropdownOpen || activeCityPage
                    ? 'bg-[#112A27] text-white shadow-md border border-[#D8B878]/30'
                    : 'text-[#526363] hover:text-[#1C433E] hover:bg-[#EAF2ED]'
                }`}
              >
                <span>Cities</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    citiesDropdownOpen
                      ? 'rotate-180 text-[#D8B878]'
                      : activeCityPage
                      ? 'text-[#D8B878]'
                      : 'text-[#286C6A]'
                  }`}
                />
              </button>

              {citiesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-80 bg-[#112A27] text-white rounded-2xl shadow-2xl border border-[#1C433E]/80 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left"
                  style={{ boxShadow: '0 25px 50px -12px rgba(17, 42, 39, 0.65)' }}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1C433E]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D8B878]">
                      PAKISTAN & GLOBAL TELEHEALTH
                    </span>
                    <span className="text-[10px] text-[#A3C2B1]">Dedicated Pages</span>
                  </div>

                  <div className="space-y-1">
                    {CITIES_DATA.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => handleSelectCity(city.slug)}
                        className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between group ${
                          activeCityPage?.slug === city.slug
                            ? 'bg-[#1C433E] text-[#D8B878]'
                            : 'hover:bg-[#1C433E]/60 text-[#E2ECE7]'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold block group-hover:text-white">
                            {city.name}
                          </span>
                          <span className="text-[10px] text-[#A3C2B1] block">
                            {city.serviceType}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#D8B878] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. PRICING */}
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, '#pricing')}
              className="px-3 py-2 text-xs sm:text-[13px] font-medium text-[#526363] hover:text-[#1C433E] transition-colors"
            >
              Plans & Pricing
            </a>

            {/* 4. BLOG / RESOURCES */}
            <a
              href="#resources"
              onClick={(e) => handleNavClick(e, '#resources')}
              className="px-3 py-2 text-xs sm:text-[13px] font-medium text-[#526363] hover:text-[#1C433E] transition-colors"
            >
              Blog
            </a>

            {/* 5. FAQ */}
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, '#faq')}
              className="px-3 py-2 text-xs sm:text-[13px] font-medium text-[#526363] hover:text-[#1C433E] transition-colors"
            >
              FAQ
            </a>

            {/* 6. ABOUT DROPDOWN (MindSukoon Deep Pine & Gold Styling) */}
            <div
              className="relative"
              onMouseEnter={() => {
                setAboutDropdownOpen(true);
                setConditionsDropdownOpen(false);
                setCitiesDropdownOpen(false);
              }}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                aria-expanded={aboutDropdownOpen}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  aboutDropdownOpen
                    ? 'bg-[#112A27] text-white shadow-md border border-[#D8B878]/30'
                    : 'text-[#526363] hover:text-[#1C433E] hover:bg-[#EAF2ED]'
                }`}
              >
                <span>About</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    aboutDropdownOpen ? 'rotate-180 text-[#D8B878]' : 'text-[#286C6A]'
                  }`}
                />
              </button>

              {aboutDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-64 bg-[#112A27] text-white rounded-2xl shadow-2xl border border-[#1C433E]/80 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left space-y-1"
                  style={{ boxShadow: '0 25px 50px -12px rgba(17, 42, 39, 0.65)' }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D8B878] block px-2 pb-1.5 border-b border-[#1C433E]">
                    MINDSUKOON HERITAGE
                  </span>
                  <a
                    href="#about"
                    onClick={(e) => handleNavClick(e, '#about')}
                    className="block p-2 rounded-xl hover:bg-[#1C433E] text-xs font-medium text-[#E2ECE7] hover:text-[#D8B878] transition-colors"
                  >
                    Our History (Est. 1981)
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={(e) => handleNavClick(e, '#how-it-works')}
                    className="block p-2 rounded-xl hover:bg-[#1C433E] text-xs font-medium text-[#E2ECE7] hover:text-[#D8B878] transition-colors"
                  >
                    How Care Works
                  </a>
                  <a
                    href="#timeline"
                    onClick={(e) => handleNavClick(e, '#timeline')}
                    className="block p-2 rounded-xl hover:bg-[#1C433E] text-xs font-medium text-[#E2ECE7] hover:text-[#D8B878] transition-colors"
                  >
                    Archival Timeline
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getPhoneCallLink()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1C433E] hover:text-[#14322e] border border-[#1C433E]/20 rounded-xl hover:border-[#1C433E] hover:bg-[#EAF2ED] transition-all whitespace-nowrap shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#1C433E]" />
              <span>CALL US</span>
            </a>

            <button
              onClick={() => openAppointment()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#1C433E] hover:bg-[#153430] rounded-xl shadow-xs hover:shadow-md transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D8B878]" />
              <span>BOOK AN APPOINTMENT</span>
            </button>
          </div>

      {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => openAppointment()}
              className="sm:hidden inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-[#1C433E] rounded-md"
            >
              BOOK
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#243333] hover:bg-black/5 active:bg-black/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C433E] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#1C433E]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with MindSukoon Palette */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#1C433E]/10 bg-[#F8F7F2] px-6 py-4 space-y-4 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto">
          {/* Top close header inside mobile drawer */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1C433E]/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C433E]">
              MindSukoon Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[#526363] hover:text-[#1C433E] hover:bg-[#EAF2ED] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-2 text-left">
            {/* Mobile Conditions Expandable */}
            <div className="border-b border-[#1C433E]/10 pb-2">
              <button
                onClick={() => setMobileConditionsOpen(!mobileConditionsOpen)}
                className="w-full flex items-center justify-between text-base font-semibold text-[#1C433E] py-2"
              >
                <span>Conditions (19 Separate Pages)</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileConditionsOpen ? 'rotate-180 text-[#D8B878]' : ''
                  }`}
                />
              </button>

              {mobileConditionsOpen && (
                <div className="pl-2 pt-2 space-y-4 text-xs">
                  <div>
                    <span className="font-bold text-[#D8B878] tracking-wider uppercase block mb-1.5">
                      COMMON CONCERNS (8 Tracks)
                    </span>
                    <ul className="space-y-1 text-[#243333]">
                      {commonConcerns.map((c) => (
                        <li key={c.id}>
                          <button
                            onClick={() => handleSelectCondition(c.slug)}
                            className="w-full text-left py-1 text-neutral-700 hover:text-[#1C433E]"
                          >
                            • {c.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[#D8B878] tracking-wider uppercase block mb-1.5">
                      SPECIALISED CARE (11 Tracks)
                    </span>
                    <ul className="space-y-1 text-[#243333]">
                      {specialisedCare.map((c) => (
                        <li key={c.id}>
                          <button
                            onClick={() => handleSelectCondition(c.slug)}
                            className="w-full text-left py-1 text-neutral-700 hover:text-[#1C433E]"
                          >
                            • {c.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Cities Expandable */}
            <div className="border-b border-[#1C433E]/10 pb-2">
              <button
                onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
                className="w-full flex items-center justify-between text-base font-semibold text-[#1C433E] py-2"
              >
                <span>Cities & Global Telehealth</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileCitiesOpen ? 'rotate-180 text-[#D8B878]' : ''
                  }`}
                />
              </button>

              {mobileCitiesOpen && (
                <div className="pl-3 pt-1 space-y-1 text-xs">
                  {CITIES_DATA.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleSelectCity(city.slug)}
                      className="w-full text-left py-1 text-[#526363] hover:text-[#1C433E]"
                    >
                      {city.name} ({city.serviceType})
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, '#pricing')}
              className="text-base font-medium text-[#243333] py-2 border-b border-[#1C433E]/10 hover:text-[#1C433E]"
            >
              Counselling Plans & Pricing
            </a>

            <a
              href="#resources"
              onClick={(e) => handleNavClick(e, '#resources')}
              className="text-base font-medium text-[#243333] py-2 border-b border-[#1C433E]/10 hover:text-[#1C433E]"
            >
              Blog & Resources
            </a>

            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, '#faq')}
              className="text-base font-medium text-[#243333] py-2 border-b border-[#1C433E]/10 hover:text-[#1C433E]"
            >
              FAQ
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-base font-medium text-[#243333] py-2 border-b border-[#1C433E]/10 hover:text-[#1C433E]"
            >
              About MindSukoon (Est. 1981)
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={getPhoneCallLink()}
              className="w-full flex items-center justify-center gap-2 py-3 border border-[#1C433E]/20 text-[#1C433E] rounded-xl text-xs font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {settings.phoneDisplay}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAppointment();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1C433E] text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              <Calendar className="w-4 h-4 text-[#D8B878]" />
              <span>BOOK AN APPOINTMENT</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
