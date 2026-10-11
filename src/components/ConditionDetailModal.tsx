import React from 'react';
import { X, Calendar, Check, ArrowRight, HeartHandshake } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const ConditionDetailModal: React.FC = () => {
  const { activeModal, selectedCondition, closeModal, openAppointment, openConditionPage } =
    usePractice();

  if (activeModal !== 'condition' || !selectedCondition) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1C433E]/15 relative text-left cursor-default"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#1C433E]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MindRestoreEmblem className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C433E]">
              Mind Restore · Clinical Condition Overview
            </span>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 text-[#243333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C433E] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-7">
          <div className="space-y-3">
            <h2 className="text-3xl font-heading font-bold text-[#243333]">
              {selectedCondition.title}
            </h2>
            <p className="text-base text-[#526363] leading-[1.68] font-normal">
              {selectedCondition.twoLineExplanation}
            </p>
          </div>

          {/* Gentle Guidance Box */}
          <div className="p-5 rounded-2xl bg-[#EAF2ED] border border-[#286C6A]/15 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
              Gentle Guidance from Our Team
            </h3>
            <p className="text-sm text-[#243333] leading-[1.7]">
              {selectedCondition.gentleGuidance}
            </p>
          </div>

          {/* Signs and Manifestations */}
          <div className="space-y-3">
            <h3 className="text-base font-heading font-bold text-[#243333]">
              Common Ways This May Show Up in Daily Life
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#526363]">
              {selectedCondition.signs.map((sign, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-[#F8F7F2] border border-[#286C6A]/10">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#EAF2ED] text-[#286C6A] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supportive Action Banner */}
          <div className="p-6 rounded-2xl bg-[#243333] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-heading font-bold">
                Would you like to discuss what you're feeling?
              </h4>
              <p className="text-xs text-neutral-300 mt-0.5">
                Our specialists provide a compassionate, pressure-free initial conversation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  closeModal();
                  openConditionPage(selectedCondition.slug);
                }}
                className="px-4 py-3 text-xs font-semibold tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl whitespace-nowrap transition-all"
              >
                VIEW FULL PAGE
              </button>

              <button
                onClick={() => {
                  closeModal();
                  openAppointment(selectedCondition.title);
                }}
                className="px-6 py-3 text-xs font-semibold tracking-wider text-[#243333] bg-white hover:bg-neutral-100 rounded-xl whitespace-nowrap shadow-xs transition-all"
              >
                TALK TO A PROFESSIONAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
