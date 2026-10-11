import React from 'react';
import { ShieldCheck, Globe, Calendar, ArrowRight, UserCheck, Video } from 'lucide-react';
import { SPECIALISTS } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const SpecialistsSection: React.FC = () => {
  const { openSpecialistProfile, openAppointment } = usePractice();

  return (
    <section className="py-20 bg-[#F8F7F2] border-b border-[#286C6A]/10" id="specialists">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            Clinical Governance & Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            Meet the People Behind the Care
          </h2>
          <p className="text-base text-[#526363] font-normal max-w-[650px] mx-auto">
            Our clinicians hold verified university postgraduate degrees, professional board registrations, and extensive clinical experience.
          </p>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {SPECIALISTS.map((spec) => (
            <div
              key={spec.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#286C6A]/10 shadow-xs hover:shadow-sm hover:border-[#286C6A]/30 transition-all flex flex-col justify-between group"
            >
              {/* Photo */}
              <div
                onClick={() => openSpecialistProfile(spec.id)}
                className="relative aspect-[4/3] bg-[#EAF2ED] overflow-hidden cursor-pointer"
              >
                <img
                  src={spec.image}
                  alt={`${spec.name} - ${spec.title} at Mind Restore`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                />

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#243333]/85 via-transparent to-transparent p-4 text-white">
                  <p className="text-xs font-medium text-neutral-200">
                    {spec.yearsExperience} Years Clinical Practice
                  </p>
                  <p className="text-[11px] text-[#D8B878]">
                    {spec.registrationNumber}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div
                  onClick={() => openSpecialistProfile(spec.id)}
                  className="cursor-pointer"
                >
                  <h3 className="text-xl font-heading font-bold text-[#243333] group-hover:text-[#286C6A] transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#286C6A] uppercase tracking-wider mb-2">
                    {spec.title}
                  </p>

                  <p className="text-xs text-[#526363] mb-3">
                    {spec.credentials[0]} · {spec.credentials[1] || ''}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-[#243333] mb-3">
                    <Globe className="w-3.5 h-3.5 text-[#286C6A] shrink-0" />
                    <span>Languages: </span>
                    <span className="font-medium text-[#526363]">{spec.languages.join(' · ')}</span>
                  </div>

                  <div className="mb-2">
                    <p className="text-[11px] font-semibold text-[#526363] uppercase tracking-wider mb-1">
                      Specialization
                    </p>
                    <p className="text-xs text-[#243333] font-medium leading-relaxed">
                      {spec.specialization.slice(0, 3).join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#286C6A]/10 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => openSpecialistProfile(spec.id)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#243333] bg-[#F8F7F2] border border-[#243333]/15 hover:border-[#286C6A] hover:bg-white rounded-lg transition-colors text-center"
                  >
                    VIEW PROFILE
                  </button>

                  <button
                    onClick={() => openAppointment(undefined, spec.id)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-lg transition-colors text-center shadow-2xs"
                  >
                    BOOK APPOINTMENT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-[#526363] max-w-xl mx-auto">
          All clinicians undergo regular peer supervision and practice within international codes of psychological ethics.
        </div>
      </div>
    </section>
  );
};
