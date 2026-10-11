import React from 'react';
import { X, Calendar, Phone, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const ServiceDetailModal: React.FC = () => {
  const { activeModal, selectedService, closeModal, openAppointment, getPhoneCallLink } =
    usePractice();

  if (activeModal !== 'service' || !selectedService) return null;

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
              Mind Restore · Clinical Service Guide
            </span>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 text-[#243333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C433E] cursor-pointer"
            aria-label="Close service modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-heading font-bold text-[#243333]">
              {selectedService.title}
            </h2>
            <p className="text-base text-[#526363] leading-[1.68] font-normal">
              {selectedService.overview}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  closeModal();
                  openAppointment(selectedService.title);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-all"
              >
                <Calendar className="w-4 h-4 text-[#D8B878]" />
                <span>REQUEST APPOINTMENT FOR THIS SERVICE</span>
              </button>

              <a
                href={getPhoneCallLink()}
                className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-semibold text-[#243333] bg-[#F8F7F2] hover:bg-[#EAF2ED] border border-[#286C6A]/20 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4 text-[#286C6A]" />
                <span>SPEAK WITH INTAKE</span>
              </a>
            </div>
          </div>

          {/* When This Support May Help */}
          <div className="bg-[#F8F7F2] rounded-2xl p-6 border border-[#286C6A]/10 space-y-3">
            <h3 className="text-sm font-heading font-bold text-[#243333]">
              Common Reasons People Seek This Care
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#526363]">
              {selectedService.indications.map((ind, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#286C6A] shrink-0 mt-0.5" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How Our Specialists Help */}
          <div className="space-y-3">
            <h3 className="text-lg font-heading font-bold text-[#243333]">
              How Our Clinicians Support You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedService.howWeHelp.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-[#286C6A]/15 text-xs text-[#526363] leading-[1.65]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Session Format & Modalities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#286C6A]/10">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#526363] mb-1.5">
                Session Format
              </h4>
              <p className="text-xs text-[#243333] leading-[1.65]">
                {selectedService.sessionFormat}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#526363] mb-1.5">
                Therapeutic Approaches
              </h4>
              <p className="text-xs text-[#286C6A] font-medium leading-[1.65]">
                {selectedService.approaches.join(' · ')}
              </p>
            </div>
          </div>

          {/* Service Specific FAQs */}
          {selectedService.faqs.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#286C6A]/10">
              <h3 className="text-base font-heading font-bold text-[#243333]">
                Questions Regarding This Service
              </h3>
              <div className="space-y-2.5">
                {selectedService.faqs.map((f, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#F8F7F2] border border-[#286C6A]/10 text-xs text-[#526363] space-y-1">
                    <p className="font-semibold text-[#243333]">{f.question}</p>
                    <p className="leading-[1.65]">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
