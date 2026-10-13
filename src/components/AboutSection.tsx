import React from 'react';
import { Heart, Shield, Award, BookOpen, Compass, CheckCircle } from 'lucide-react';
import { CORE_VALUES } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const AboutSection: React.FC = () => {
  const { settings, openAppointment } = usePractice();

  const getValueIcon = (title: string) => {
    switch (title) {
      case 'COMPASSION':
        return <Heart className="w-5 h-5 text-[#286C6A]" />;
      case 'DIGNITY':
        return <Compass className="w-5 h-5 text-[#286C6A]" />;
      case 'CONFIDENTIALITY':
        return <Shield className="w-5 h-5 text-[#286C6A]" />;
      case 'PROFESSIONALISM':
        return <Award className="w-5 h-5 text-[#286C6A]" />;
      case 'CONTINUOUS LEARNING':
        return <BookOpen className="w-5 h-5 text-[#286C6A]" />;
      default:
        return <Heart className="w-5 h-5 text-[#286C6A]" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-[#286C6A]/10 text-left" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* About Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
              Our History & Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
              More Than Four Decades of Mental Health Experience
            </h2>
            <p className="text-base text-[#526363] leading-[1.7] max-w-[700px] font-normal">
              Established in {settings.foundedYear}, {settings.organizationName} has built its identity around professional care, human dignity and a commitment to mental wellbeing.
            </p>
            <p className="text-sm text-[#526363] leading-[1.7] max-w-[700px] font-normal">
              For generations, our clinicians have worked to demystify psychological care in Pakistan, breaking taboos through quiet, ethical professionalism. Today, our practice bridges traditional outpatient excellence with contemporary tele-mental health, ensuring that anyone seeking support can access qualified psychological care regardless of geographical barriers.
            </p>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#243333] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#286C6A]" />
                <span>Established in {settings.foundedYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#286C6A]" />
                <span>Modern, Evidence-Informed Practice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#286C6A]" />
                <span>Strict Healthcare Privacy Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#286C6A]" />
                <span>Encrypted Video & Voice Digital Consultations</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => openAppointment('General Clinical Consultation')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>BOOK CONFIDENTIAL CONSULTATION</span>
              </button>

              <button
                onClick={() => {
                  const el = document.querySelector('#timeline');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#243333] bg-[#F8F7F2] hover:bg-[#EAF2ED] border border-[#286C6A]/20 rounded-xl transition-colors cursor-pointer"
              >
                <span>VIEW 1981 TIMELINE</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#EAF2ED] p-8 rounded-3xl border border-[#1C433E]/15 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-white p-1.5 border border-[#1C433E]/10 flex items-center justify-center shadow-2xs">
                <MindRestoreEmblem className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-[#1C433E]">
                  Our Clinical Mission
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-[#1C433E] font-bold">
                  MindSukoon · Established 1981
                </span>
              </div>
            </div>
            <p className="text-sm text-[#243333] leading-[1.7] font-normal">
              "To provide accessible, evidence-informed and compassionate psychological support where every patient is treated with dignity, active listening, and rigorous confidentiality."
            </p>
            <div className="pt-3 border-t border-[#1C433E]/15 text-xs text-[#526363] space-y-1">
              <p><strong>Clinical Facility:</strong> Gulberg III, Lahore</p>
              <p><strong>Digital Practice:</strong> Serving Pakistan and Overseas Clients</p>
              <p><strong>Languages:</strong> Urdu, English, Punjabi</p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.querySelector('#services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 text-xs font-semibold text-[#1C433E] bg-white hover:bg-neutral-50 border border-[#1C433E]/20 rounded-xl transition-all shadow-2xs"
              >
                EXPLORE ALL CLINICAL SERVICES
              </button>
            </div>
          </div>
        </div>

        {/* Section 20: 5 Core Value Cards */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
              Ethical Foundations
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#243333]">
              The Core Values That Guide Our Care
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CORE_VALUES.map((val) => (
              <div
                key={val.title}
                className="bg-[#F8F7F2] rounded-2xl p-6 border border-[#286C6A]/10 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white text-[#286C6A] flex items-center justify-center mb-4 border border-[#286C6A]/10">
                    {getValueIcon(val.title)}
                  </div>
                  <h4 className="text-xs font-heading font-bold text-[#286C6A] tracking-wider uppercase mb-1">
                    {val.title}
                  </h4>
                  <p className="text-xs font-medium text-[#243333] mb-2">
                    {val.tagline}
                  </p>
                  <p className="text-[11px] text-[#526363] leading-[1.6]">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
