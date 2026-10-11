import React from 'react';
import { Mail, MessageSquare, UserCheck, CalendarCheck, ArrowRight } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const HowCareWorks: React.FC = () => {
  const { openAppointment } = usePractice();

  const steps = [
    {
      stepNumber: '01',
      title: 'Reach Out',
      description: 'Contact us or request an appointment through our confidential online form or clinical phone line.',
      icon: Mail,
    },
    {
      stepNumber: '02',
      title: 'Initial Conversation',
      description: 'We learn about your needs, scheduling preferences, and help identify the appropriate service and specialist.',
      icon: MessageSquare,
    },
    {
      stepNumber: '03',
      title: 'Meet Your Professional',
      description: 'Begin your session with an appropriate member of our team online via secure tele-health.',
      icon: UserCheck,
    },
    {
      stepNumber: '04',
      title: 'Continue Your Care',
      description: 'Where appropriate, your professional can help you establish a longer-term support plan tailored to your personal goals.',
      icon: CalendarCheck,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#286C6A]/10" id="how-care-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            A Clear, Predictable Path
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            Getting Started Is Simpler Than You Think
          </h2>
          <p className="text-base text-[#526363] font-normal max-w-[650px] mx-auto">
            Taking the first step can feel unfamiliar. We have designed our intake process to be calm, supportive and transparent.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="bg-[#F8F7F2] rounded-2xl p-7 border border-[#286C6A]/10 shadow-xs hover:border-[#286C6A]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-heading font-bold text-[#D8B878]">
                      {step.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white text-[#286C6A] flex items-center justify-center border border-[#286C6A]/10">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  <h3 className="text-base font-heading font-bold text-[#243333] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#526363] leading-[1.68] font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#286C6A]/10 text-[11px] text-[#526363]">
                  {idx === 0 && 'Simple 2-minute request'}
                  {idx === 1 && 'Friendly intake coordinator'}
                  {idx === 2 && 'Encrypted video or voice tele-health'}
                  {idx === 3 && 'At your comfortable pace'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => openAppointment()}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-all"
          >
            <span>TAKE THE FIRST STEP</span>
            <ArrowRight className="w-4 h-4 text-[#D8B878]" />
          </button>
        </div>
      </div>
    </section>
  );
};
