import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const TimelineSection: React.FC = () => {
  const { settings, openAppointment } = usePractice();

  const handleScrollToPricing = () => {
    const el = document.querySelector('#pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F8F7F2] border-b border-[#286C6A]/10 text-left" id="timeline">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#1C433E] uppercase bg-[#EAF2ED] border border-[#1C433E]/15 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B878]" />
            <span>INSTITUTIONAL HERITAGE · ESTABLISHED {settings.foundedYear}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1C433E] tracking-tight">
            Our Journey Since {settings.foundedYear}
          </h2>

          <p className="text-base sm:text-lg text-[#526363] font-normal leading-relaxed max-w-[620px] mx-auto">
            From our founding over four decades ago in Lahore to today's modern online psychological practice, our commitment to clinical excellence and patient dignity has remained constant.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative border-l-2 border-[#1C433E]/20 ml-4 sm:ml-8 space-y-8 sm:space-y-10 pl-6 sm:pl-12">
          {TIMELINE_MILESTONES.map((item, idx) => {
            const displayYear =
              !item.year || item.year.includes('VERIFIED')
                ? 'Year to be confirmed'
                : item.year;

            const isCurrentEra = item.year === '2026';

            return (
              <div key={idx} className="relative group">
                {/* Timeline Pin Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[55px] top-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-3 transition-transform duration-200 group-hover:scale-125 ${
                    isCurrentEra
                      ? 'bg-[#D8B878] border-[#1C433E] shadow-sm'
                      : 'bg-white border-[#1C433E] shadow-2xs'
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mx-auto my-auto mt-0.5 sm:mt-1 ${
                      isCurrentEra ? 'bg-[#1C433E]' : 'bg-[#286C6A]'
                    }`}
                  />
                </div>

                {/* Milestone Card */}
                <div
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-200 ${
                    isCurrentEra
                      ? 'bg-white border-2 border-[#D8B878]/60 shadow-md ring-1 ring-[#D8B878]/20'
                      : 'bg-white border border-[#286C6A]/15 shadow-2xs hover:shadow-sm hover:border-[#286C6A]/30'
                  }`}
                >
                  {/* Top Bar: Prominent Teal Milestone Year + Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#286C6A]/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1C433E] tracking-tight">
                        {displayYear}
                      </span>
                      {isCurrentEra && (
                        <span className="text-[11px] font-semibold text-[#8EAD9A] uppercase tracking-wide">
                          (Current Era)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#EAF2ED] text-[#1C433E] border border-[#1C433E]/15">
                        Milestone 0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Milestone Title */}
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-[#243333] mt-4 mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Milestone Description */}
                  <p className="text-sm sm:text-base text-[#526363] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-14 text-center text-xs text-[#526363] flex items-center justify-center gap-2 max-w-xl mx-auto">
          <ShieldCheck className="w-4 h-4 text-[#286C6A] shrink-0" />
          <span>
            Documented timeline reflects verified developmental milestones in our outpatient psychological care practice since {settings.foundedYear}.
          </span>
        </div>

        {/* Bottom Call to Actions */}
        <div className="mt-8 pt-8 border-t border-[#286C6A]/10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleScrollToPricing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider text-[#1C433E] bg-white border border-[#286C6A]/20 hover:border-[#286C6A] hover:bg-[#EAF2ED] rounded-xl transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
          >
            <span>EXPLORE COUNSELLING PLANS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#286C6A]" />
          </button>

          <button
            type="button"
            onClick={() => openAppointment('Appointment Request via Heritage Timeline')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider text-white bg-[#1C433E] hover:bg-[#122e2a] rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            <Calendar className="w-4 h-4 text-[#D8B878]" />
            <span>BOOK A CONFIDENTIAL CONSULTATION</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
