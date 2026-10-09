import React from 'react';
import { Calendar, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const FinalCtaSection: React.FC = () => {
  const { openAppointment, getPhoneCallLink, settings } = usePractice();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#EAF2ED] border-b border-[#286C6A]/10 text-center" id="final-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
          Confidential Consultation
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#243333] tracking-tight text-balance">
          You Don't Have to Have Everything Figured Out.
        </h2>

        <p className="text-base sm:text-lg text-[#526363] leading-[1.7] max-w-[680px] mx-auto font-normal">
          Whether you're looking for support for yourself or someone you care about, taking the first step can begin with a simple conversation.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openAppointment()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs hover:shadow transition-all"
          >
            <Calendar className="w-4 h-4 text-[#D8B878]" />
            <span>BOOK AN APPOINTMENT</span>
          </button>

          <button
            onClick={handleContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-wider text-[#243333] bg-white border border-[#243333]/15 hover:border-[#286C6A] rounded-xl transition-all"
          >
            <span>CONTACT OUR TEAM</span>
          </button>
        </div>

        {/* Small line from Section 40 */}
        <p className="text-xs text-[#526363] pt-4 font-medium">
          Supporting mental wellbeing since {settings.foundedYear}.
        </p>
      </div>
    </section>
  );
};
