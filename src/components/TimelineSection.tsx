import React from 'react';
import { Calendar, CheckCircle2, History } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const TimelineSection: React.FC = () => {
  const { settings, openAppointment } = usePractice();

  return (
    <section className="py-20 bg-[#F8F7F2] border-b border-[#286C6A]/10" id="timeline">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            Institutional Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            Our Journey Since {settings.foundedYear}
          </h2>
          <p className="text-base text-[#526363] font-normal max-w-[650px] mx-auto">
            From our founding over four decades ago to today's modern clinical practice, our commitment to patient dignity has remained constant.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative border-l-2 border-[#8EAD9A]/40 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10 text-left">
          {TIMELINE_MILESTONES.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 ${
                item.isVerified
                  ? 'bg-[#286C6A] border-white shadow-xs'
                  : 'bg-white border-[#8EAD9A]'
              }`} />

              <div className="bg-white rounded-2xl p-6 border border-[#286C6A]/10 shadow-xs max-w-2xl">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-sm font-heading font-bold text-[#286C6A]">
                    {item.year}
                  </span>
                  {!item.isVerified && (
                    <span className="text-[10px] uppercase tracking-wider text-[#8EAD9A] bg-[#EAF2ED] px-2 py-0.5 rounded">
                      Verified Milestone Placeholder
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-heading font-bold text-[#243333] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#526363] leading-[1.68] font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-[#526363] italic">
          * Historical timeline reflects verified milestones. Additional archival records are updated in coordination with institutional leadership.
        </div>

        <div className="mt-10 pt-8 border-t border-[#286C6A]/10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.querySelector('#specialists');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider text-[#243333] bg-white border border-[#286C6A]/20 hover:border-[#286C6A] hover:bg-[#EAF2ED] rounded-xl transition-all"
          >
            <span>MEET THE CLINICAL TEAM</span>
          </button>

          <button
            onClick={() => openAppointment('Appointment Request via Heritage Timeline')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-all"
          >
            <Calendar className="w-4 h-4 text-[#D8B878]" />
            <span>BOOK AN APPOINTMENT</span>
          </button>
        </div>
      </div>
    </section>
  );
};
