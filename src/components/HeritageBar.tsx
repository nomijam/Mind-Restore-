import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const HeritageBar: React.FC = () => {
  const { settings } = usePractice();

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside aria-label="Heritage Note" className="bg-[#EAF2ED] text-[#243333] border-b border-[#286C6A]/10 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#286C6A] inline-block" />
          <button
            onClick={() => scrollTo('#timeline')}
            className="font-medium text-[12px] sm:text-[13px] tracking-wide text-[#286C6A] hover:underline focus:outline-none"
          >
            Trusted Mental Health Care Since {settings.foundedYear}
          </button>
          <span className="hidden sm:inline text-[#286C6A]" aria-hidden="true">·</span>
          <span className="hidden sm:inline text-[#526363] text-[12px]">
            Four Decades of Clinical Experience and Human Compassion
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[12px] text-[#526363]">
          <button
            onClick={() => scrollTo('#services')}
            className="hover:text-[#286C6A] hover:underline focus:outline-none transition-colors"
          >
            Outpatient Practice & Tele-Mental Health
          </button>
          <span className="text-[#286C6A]" aria-hidden="true">·</span>
          <span className="font-medium text-[#243333]">Urdu & English</span>
        </div>
      </div>
    </aside>
  );
};
