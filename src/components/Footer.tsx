import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Settings } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { MindRestoreLogo } from './MindRestoreLogo';

export const Footer: React.FC = () => {
  const {
    settings,
    openServiceDetail,
    openLegal,
    openAdmin,
    getPhoneCallLink,
    activeConditionPage,
    closeConditionPage,
    openConditionPage,
  } = usePractice();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (activeConditionPage) {
      closeConditionPage();
    }
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <footer className="bg-[#1C433E] text-white pt-16 pb-12 text-left" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top Message with Logo */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <MindRestoreLogo variant="horizontal" size="lg" lightMode={true} />
            <p className="text-xs text-neutral-300 max-w-lg font-light leading-relaxed">
              Four decades of ethical clinical psychology, patient dignity, and evidence-informed psychotherapeutic care for individuals, couples and families.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#A3C2B1]">
              <span className="font-semibold block text-white mb-0.5">Nationwide & Worldwide Tele-Health</span>
              <span>Encrypted digital video & confidential voice sessions.</span>
            </div>
          </div>
        </div>

        {/* 5 Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-white/10 text-xs">
          {/* Column 1: ABOUT */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-[#D8B878] uppercase tracking-wider text-[11px]">
              ABOUT
            </h3>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">Our History</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">Our Mission</a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="hover:text-white transition-colors">Plans & Pricing</a>
              </li>
              <li>
                <a href="#timeline" onClick={(e) => handleNavClick(e, '#timeline')} className="hover:text-white transition-colors">1981 Timeline</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openAdmin()}
                  className="hover:text-[#D8B878] transition-colors text-left cursor-pointer flex items-center gap-1"
                  aria-label="Staff & Administrator Portal"
                >
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: SERVICES */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-[#D8B878] uppercase tracking-wider text-[11px]">
              SERVICES
            </h3>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <button onClick={() => openServiceDetail('individual-counselling')} className="hover:text-white text-left transition-colors">
                  Counselling
                </button>
              </li>
              <li>
                <button onClick={() => openServiceDetail('psychological-assessment')} className="hover:text-white text-left transition-colors">
                  Psychological Assessment
                </button>
              </li>
              <li>
                <button onClick={() => openServiceDetail('family-counselling')} className="hover:text-white text-left transition-colors">
                  Family Support
                </button>
              </li>
              <li>
                <button onClick={() => openServiceDetail('couples-counselling')} className="hover:text-white text-left transition-colors">
                  Relationship Support
                </button>
              </li>
              <li>
                <button onClick={() => openServiceDetail('online-counselling')} className="hover:text-white text-left transition-colors">
                  Online Counselling
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-[#D8B878] uppercase tracking-wider text-[11px]">
              RESOURCES
            </h3>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <a href="#resources" onClick={(e) => handleNavClick(e, '#resources')} className="hover:text-white transition-colors">Articles</a>
              </li>
              <li>
                <a href="#tools" onClick={(e) => handleNavClick(e, '#tools')} className="hover:text-white transition-colors">Educational Tools</a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#emergency" onClick={(e) => handleNavClick(e, '#emergency')} className="hover:text-white transition-colors">Emergency Information</a>
              </li>
            </ul>
          </div>

          {/* Column 4: LEGAL */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-[#D8B878] uppercase tracking-wider text-[11px]">
              LEGAL & GOVERNANCE
            </h3>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <button onClick={() => openLegal('editorial')} className="hover:text-white text-left transition-colors cursor-pointer">
                  Editorial & Review Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('disclaimer')} className="hover:text-white text-left transition-colors cursor-pointer">
                  Medical Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('privacy')} className="hover:text-white text-left transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('terms')} className="hover:text-white text-left transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('accessibility')} className="hover:text-white text-left transition-colors cursor-pointer">
                  Accessibility Statement
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACT */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h3 className="font-heading font-bold text-[#D8B878] uppercase tracking-wider text-[11px]">
              CONTACT
            </h3>
            <ul className="space-y-2 text-neutral-300 text-[11px]">
              <li className="flex items-start gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#8EAD9A] shrink-0 mt-0.5" />
                <a href={getPhoneCallLink()} className="hover:text-white hover:underline transition-colors">
                  {settings.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#8EAD9A] shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email}`} className="hover:text-white hover:underline transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8EAD9A] shrink-0 mt-0.5" />
                <span>{settings.inPersonClinicAddress}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8EAD9A] shrink-0 mt-0.5" />
                <span>{settings.hoursOfOperation}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} {settings.organizationName} (Est. {settings.foundedYear}). All rights reserved.</p>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[11px]">Strict Outpatient Clinical Standards</span>
            <button
              onClick={() => openAdmin()}
              className="text-[#D8B878] hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-[#D8B878]/30 cursor-pointer"
              title="Life Reset Pakistan Administrator Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D8B878]" />
              <span>Admin Sign-up / Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
