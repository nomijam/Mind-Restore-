import React from 'react';
import { X, Calendar, Phone, ShieldCheck, CheckCircle2, Clock, Globe, Video, User } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const SpecialistProfileModal: React.FC = () => {
  const { activeModal, selectedSpecialist, closeModal, openAppointment, getPhoneCallLink } =
    usePractice();

  if (activeModal !== 'specialist' || !selectedSpecialist) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1C433E]/15 relative text-left cursor-default"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#1C433E]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MindRestoreEmblem className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C433E]">
              Mind Restore · Specialist Profile & Verified Credentials
            </span>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 text-[#243333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C433E] cursor-pointer"
            aria-label="Close specialist profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Lockup */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src={selectedSpecialist.image}
              alt={selectedSpecialist.name}
              referrerPolicy="no-referrer"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover object-top border border-[#286C6A]/15 shadow-xs shrink-0"
            />

            <div className="space-y-2 flex-1">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#243333]">
                {selectedSpecialist.name}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
                {selectedSpecialist.title}
              </p>

              <div className="flex items-center gap-2 text-xs text-[#526363]">
                <ShieldCheck className="w-4 h-4 text-[#286C6A]" />
                <span className="font-semibold text-[#243333]">Registration:</span>
                <span>{selectedSpecialist.registrationNumber}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#526363]">
                <Clock className="w-4 h-4 text-[#286C6A]" />
                <span>{selectedSpecialist.yearsExperience} Years Clinical Practice</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#526363]">
                <Globe className="w-4 h-4 text-[#286C6A]" />
                <span>Languages: {selectedSpecialist.languages.join(' · ')}</span>
              </div>

              {/* Actions */}
              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    closeModal();
                    openAppointment(undefined, selectedSpecialist.id);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#D8B878]" />
                  <span>BOOK APPOINTMENT</span>
                </button>

                <a
                  href={getPhoneCallLink()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#243333] bg-[#F8F7F2] hover:bg-[#EAF2ED] border border-[#286C6A]/20 rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4 text-[#286C6A]" />
                  <span>CONTACT US</span>
                </a>
              </div>
            </div>
          </div>

          {/* Academic Qualifications & Clinical Credentials */}
          <div className="bg-[#F8F7F2] rounded-2xl p-6 border border-[#286C6A]/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#526363] mb-3">
              Verified Academic Degrees & Specialized Training
            </h3>
            <ul className="space-y-2 text-xs text-[#243333]">
              {selectedSpecialist.credentials.map((cred, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8EAD9A] shrink-0" />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Biography */}
          <div className="space-y-3">
            <h3 className="text-xl font-heading font-bold text-[#243333]">
              Professional Biography
            </h3>
            <p className="text-sm text-[#526363] leading-[1.7] font-normal">
              {selectedSpecialist.about}
            </p>
          </div>

          {/* Areas of Focus & Therapeutic Approaches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#286C6A]/10">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#526363] mb-2.5">
                Areas of Focus
              </h4>
              <div className="flex flex-wrap gap-1 text-xs text-[#243333] font-medium">
                {selectedSpecialist.specialization.map((spec, i) => (
                  <span key={i} className="after:content-['·'] last:after:content-none after:ml-1">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#526363] mb-2.5">
                Therapeutic Approaches
              </h4>
              <ul className="space-y-1 text-xs text-[#243333]">
                {selectedSpecialist.therapeuticApproaches.map((app, i) => (
                  <li key={i}>• {app}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Who They Work With & Formats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#286C6A]/10">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#526363] mb-2">
                Who They Work With
              </h4>
              <p className="text-xs text-[#526363]">
                {selectedSpecialist.whoTheyWorkWith.join(' · ')}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#526363] mb-2">
                Session Formats & Availability
              </h4>
              <p className="text-xs text-[#526363] mb-1">
                <strong className="text-[#243333]">Formats: </strong>
                {selectedSpecialist.sessionFormats.join(', ')}
              </p>
              <p className="text-xs text-[#526363]">
                <strong className="text-[#243333]">Schedule: </strong>
                {selectedSpecialist.availability}
              </p>
            </div>
          </div>

          {/* Ethics Reassurance */}
          <div className="p-4 rounded-xl bg-[#EAF2ED] border border-[#286C6A]/15 text-xs text-[#526363] leading-[1.6]">
            <strong>Ethics & Privacy Notice:</strong> Consultations with {selectedSpecialist.name} adhere to international psychotherapeutic privacy standards. Psychological counselling does not involve prescribing medical pharmaceuticals.
          </div>
        </div>
      </div>
    </div>
  );
};
