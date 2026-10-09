import React from 'react';
import { HeartHandshake, ArrowRight } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const YouAreNotAloneSection: React.FC = () => {
  const { openAppointment } = usePractice();

  return (
    <section className="py-20 bg-[#EAF2ED] border-b border-[#286C6A]/10 text-center" id="support">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#286C6A] shadow-xs mx-auto mb-2">
          <HeartHandshake className="w-6 h-6 stroke-[2]" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#243333] tracking-tight text-balance">
          Sometimes, Life Becomes Difficult to Handle Alone.
        </h2>

        <p className="text-base sm:text-lg text-[#526363] leading-[1.7] max-w-[720px] mx-auto font-normal">
          You may be dealing with anxiety, persistent sadness, relationship difficulties, stress, trauma, family concerns or simply feeling that something isn't right.
        </p>

        <p className="text-base sm:text-lg text-[#243333] font-medium max-w-[650px] mx-auto pt-1">
          You don't need to have all the answers before asking for help.
        </p>

        <div className="pt-4">
          <button
            onClick={() => openAppointment('Initial Psychological Inquiry')}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs hover:shadow transition-all"
          >
            <span>TALK TO A PROFESSIONAL</span>
            <ArrowRight className="w-4 h-4 text-[#D8B878]" />
          </button>
        </div>
      </div>
    </section>
  );
};
