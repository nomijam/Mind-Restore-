import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Shield, MessageCircle } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { MindRestoreLogo } from './MindRestoreLogo';

export const Header: React.FC = () => {
  const { settings, openAppointment, getPhoneCallLink, openAdmin } = usePractice();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Specialists', href: '#specialists' },
    { label: 'Conditions', href: '#conditions' },
    { label: 'Resources', href: '#resources' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#286C6A]/10 shadow-xs'
          : 'bg-[#F8F7F2] border-b border-[#286C6A]/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Mind Restore Official Logo (Est. 1981) */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center transition-transform hover:opacity-95 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C433E]"
              aria-label="Mind Restore Established 1981 - Home"
            >
              <MindRestoreLogo variant="horizontal" size="md" />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-[14px] font-medium text-[#526363]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#1C433E] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1C433E] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </a>
            ))}
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
              onClick={() => openAppointment()}
              className="sm:hidden inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-[#286C6A] rounded-md"
            >
              BOOK
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#243333] hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#286C6A]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#286C6A]/10 bg-[#F8F7F2] px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2.5 text-left">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-[#243333] py-2 border-b border-black/5 hover:text-[#286C6A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAppointment();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#286C6A] rounded-lg shadow-xs"
            >
              <Calendar className="w-4 h-4 text-[#D8B878]" />
              BOOK AN APPOINTMENT
            </button>

            <a
              href={getPhoneCallLink()}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#243333] bg-white border border-[#243333]/15 rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#286C6A]" />
              CALL {settings.phoneDisplay}
            </a>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdmin();
              }}
              className="text-xs text-[#8EAD9A] hover:text-[#286C6A] underline"
            >
              Institutional Settings & Intake Configuration
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
