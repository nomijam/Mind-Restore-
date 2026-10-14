import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Check, Clock, UserCheck } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { heritageHeroImg, heritageHeroMobileWebp } from '../data/practiceData';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const Hero: React.FC = () => {
  const { settings, openAppointment } = usePractice();

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#F8F7F2] pt-8 pb-16 lg:pt-14 lg:pb-22 border-b border-[#286C6A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Clear, Calm, Dignified Messaging */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Eyebrow: LIFE RESET PAKISTAN · ESTABLISHED 1981 */}
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wider text-[#1C433E] uppercase bg-white px-4 py-2 rounded-full border border-[#1C433E]/15 shadow-2xs">
              <MindRestoreEmblem className="w-4 h-4 text-[#1C433E]" />
              <span>LIFE RESET PAKISTAN · ESTABLISHED {settings.foundedYear}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            {/* H1: Trusted Mental Health Care, With Experience That Spans Generations */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#1C433E] tracking-tight leading-[1.14] text-balance">
              Trusted Mental Health Care, With Experience That Spans Generations.
            </h1>

            {/* Paragraph with cognitive accessibility constraint (650-750px max width) */}
            <p className="text-base sm:text-lg text-[#526363] leading-[1.68] max-w-[700px] font-normal">
              Your mental wellbeing deserves understanding, privacy and professional care. Our experienced team provides compassionate support using modern, evidence-informed approaches.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openAppointment()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-wider text-white bg-[#1C433E] hover:bg-[#153430] active:bg-[#112a27] rounded-xl shadow-xs hover:shadow-md transition-all group"
              >
                <Calendar className="w-4 h-4 text-[#D8B878]" />
                <span>BOOK AN APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={handleExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider text-[#1C433E] bg-white border border-[#1C433E]/20 hover:border-[#1C433E] hover:bg-[#EAF2ED] rounded-xl transition-all shadow-2xs"
              >
                <span>EXPLORE OUR SERVICES</span>
              </button>
            </div>

            {/* Microcopy: "Not sure where to start? Explore our services →" */}
            <div className="pt-1 text-xs text-[#526363] flex items-center gap-1.5">
              <span>Not sure where to start?</span>
              <button
                onClick={handleExploreClick}
                className="font-medium text-[#286C6A] hover:underline inline-flex items-center gap-1"
              >
                Explore our services <span aria-hidden="true">→</span>
              </button>
            </div>

              {/* Below Buttons Trust Elements (Section 9) */}
              <div className="pt-5 border-t border-[#286C6A]/10">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#3E5050] font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#286C6A]" />
                    <span>Established in {settings.foundedYear}</span>
                  </div>
                  <span className="text-[#286C6A]" aria-hidden="true">·</span>
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#286C6A]" />
                    <span>Experienced Professionals</span>
                  </div>
                  <span className="text-[#286C6A]" aria-hidden="true">·</span>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#286C6A]" />
                    <span>Confidential Care</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic, Dignified Clinical Interaction Photograph */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border border-[#1C433E]/15 shadow-xl bg-white group">
                  <picture>
                    <source
                      media="(max-width: 640px)"
                      srcSet="/images/heritage_clinical_consultation_mobile.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/images/heritage_clinical_consultation_1791269818478.webp"
                      type="image/webp"
                    />
                    <img
                      src="/images/heritage_clinical_consultation_1791269818478.webp"
                      alt="A qualified clinical psychologist in a calm, respectful consultation with a patient at Life Reset Pakistan"
                      referrerPolicy="no-referrer"
                      className="w-full h-[400px] sm:h-[460px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={640}
                      height={460}
                    />
                  </picture>

                {/* Subtle calm caption strip */}
                <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-[#1C433E]/10 text-left">
                  <p className="text-xs font-heading font-semibold text-[#1C433E]">
                    Compassionate Outpatient Care & In-Depth Clinical Consultations
                  </p>
                  <p className="text-[11px] text-[#526363] mt-0.5">
                    Available across Pakistan and worldwide through secure digital tele-health.
                  </p>
                </div>
              </div>

              {/* Floating Official Life Reset Pakistan Seal (Direct Logo Artwork) */}
              <div className="hidden sm:flex flex-col items-center absolute -top-5 -right-5 bg-white/95 backdrop-blur-md border border-[#1C433E]/15 p-4 rounded-2xl shadow-xl max-w-[190px] text-center transition-transform hover:-translate-y-0.5 duration-200">
                <MindRestoreEmblem className="w-12 h-12 mb-1" />
                <span className="font-heading font-extrabold text-[#1C433E] text-sm leading-tight tracking-tight">
                  Life Reset Pakistan
                </span>
                <div className="flex items-center justify-center gap-1.5 mt-1 w-full">
                  <span className="h-[1px] w-3 bg-[#286C6A]/60" aria-hidden="true" />
                  <span className="text-[9px] font-bold text-[#1C433E] uppercase tracking-wider">
                    EST. 1981
                  </span>
                  <span className="h-[1px] w-3 bg-[#286C6A]/60" aria-hidden="true" />
                </div>
                <span className="text-[9.5px] text-[#526363] mt-1 font-medium">
                  Licensed Clinical Care
                </span>
              </div>

              {/* Floating Confidential Care Badge */}
              <div className="flex items-center gap-2.5 absolute -bottom-4 -left-3 sm:-left-4 bg-white/95 backdrop-blur-md border border-[#1C433E]/15 px-3.5 py-2.5 rounded-xl text-xs text-[#1C433E] shadow-md">
                <ShieldCheck className="w-4 h-4 text-[#286C6A] shrink-0" />
                <div>
                  <p className="font-semibold text-[11px] text-[#1C433E] leading-tight">
                    Strict Confidentiality
                  </p>
                  <p className="text-[10px] text-[#526363]">
                    Encrypted Video & Voice Tele-Health
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
