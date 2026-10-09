import React from 'react';
import { Quote, Calendar } from 'lucide-react';
import { TESTIMONIALS } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const TestimonialsSection: React.FC = () => {
  const { openAppointment } = usePractice();
  return (
    <section className="py-20 bg-[#F8F7F2] border-b border-[#286C6A]/10 text-left" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            Patient Reflections
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            What Our Patients Say
          </h2>
          <p className="text-base text-[#526363] font-normal max-w-[650px] mx-auto">
            Honest reflections from individuals and couples who have engaged with our psychological services.
          </p>
        </div>

        {/* 4 Dignified Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-7 border border-[#286C6A]/10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-5 h-5 text-[#8EAD9A] mb-4" />
                <p className="text-xs text-[#243333] leading-[1.7] italic mb-6 font-normal">
                  "{t.reflection}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#286C6A]/10">
                <p className="text-xs font-heading font-bold text-[#286C6A]">
                  {t.attribution}
                </p>
                <p className="text-[11px] text-[#526363]">
                  {t.context}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-[#526363] max-w-lg mx-auto">
          Identifiers and personal details have been modified to protect patient confidentiality. Clinical outcomes vary for each individual and rely on collaborative engagement.
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openAppointment('Appointment Request via Patient Reflections')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-all"
          >
            <Calendar className="w-4 h-4 text-[#D8B878]" />
            <span>BEGIN YOUR CONFIDENTIAL CONSULTATION</span>
          </button>

          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider text-[#243333] bg-white border border-[#286C6A]/20 hover:border-[#286C6A] hover:bg-[#EAF2ED] rounded-xl transition-all"
          >
            <span>SPEAK WITH INTAKE TEAM</span>
          </button>
        </div>
      </div>
    </section>
  );
};
