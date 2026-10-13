import React from 'react';
import { Award, Shield, UserCheck, Heart, ArrowRight } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const TrustSection: React.FC = () => {
  const { settings, openAppointment } = usePractice();

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cards = [
    {
      title: `ESTABLISHED ${settings.foundedYear}`,
      description: 'Decades of experience supporting mental wellbeing across generations of individuals and families.',
      icon: Award,
      actionLabel: 'View Heritage Timeline',
      onClick: () => scrollTo('#timeline'),
    },
    {
      title: 'PROFESSIONAL CARE',
      description: 'Support delivered by qualified mental-health professionals with accredited academic qualifications.',
      icon: UserCheck,
      actionLabel: 'Explore Our Services',
      onClick: () => scrollTo('#services'),
    },
    {
      title: 'CONFIDENTIAL',
      description: 'Your privacy and dignity are treated with care under strict clinical confidentiality guidelines.',
      icon: Shield,
      actionLabel: 'Confidential Inquiry',
      onClick: () => openAppointment('Confidential Clinical Inquiry'),
    },
    {
      title: 'HUMAN APPROACH',
      description: 'We listen first, understand your situation and help you identify the next step at your own pace.',
      icon: Heart,
      actionLabel: 'Our Care Philosophy',
      onClick: () => scrollTo('#about'),
    },
  ];

  return (
    <section className="py-18 bg-[#F8F7F2] border-b border-[#286C6A]/10" id="trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            Four Decades of Clinical Dedication
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            Experience You Can Trust. Care You Can Feel.
          </h2>
          <p className="text-base text-[#526363] font-normal max-w-[650px] mx-auto">
            Our practice was established in {settings.foundedYear} with a focus on ethical care, clinical excellence, and respect for every patient.
          </p>
        </div>

        {/* 4 Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-7 border border-[#286C6A]/10 shadow-xs hover:border-[#286C6A]/30 transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EAF2ED] text-[#286C6A] flex items-center justify-center mb-5 group-hover:bg-[#d8e6dc] transition-colors">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <h3 className="text-xs font-heading font-bold text-[#286C6A] tracking-wider uppercase mb-2">
                    {card.title}
                  </h3>

                  <p className="text-sm text-[#526363] leading-[1.68] font-normal mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#286C6A]/10">
                  <button
                    onClick={card.onClick}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#286C6A] hover:text-[#1f5654] transition-colors focus:outline-none"
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
