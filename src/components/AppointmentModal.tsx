import React from 'react';
import { X } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { AppointmentSection } from './AppointmentSection';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const AppointmentModal: React.FC = () => {
  const { activeModal, closeModal } = usePractice();

  if (activeModal !== 'appointment') return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#1C433E]/15 relative text-left cursor-default"
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#1C433E]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MindRestoreEmblem className="w-6 h-6" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C433E]">
              MindSukoon · Confidential Appointment Request
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

        <div className="p-4 sm:p-6">
          <AppointmentSection isModal onClose={closeModal} />
        </div>
      </div>
    </div>
  );
};
