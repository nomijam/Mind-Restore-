import React from 'react';
import { X, Calendar, Clock, ArrowRight } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { resourcesImg } from '../data/practiceData';

export const ArticleModal: React.FC = () => {
  const { selectedArticle, closeModal, openAppointment } = usePractice();

  if (!selectedArticle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#286C6A]/15 relative text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#286C6A]/10 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
            {selectedArticle.category} Guidance
          </span>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-neutral-100 text-[#243333] transition-colors"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#243333] leading-snug">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-[#526363] pt-1">
              <span>By {selectedArticle.author}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.date}</span>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#EAF2ED]">
            <img
              src={resourcesImg}
              alt={selectedArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5 rounded-xl bg-[#F8F7F2] border-l-4 border-[#286C6A] text-sm text-[#243333] font-medium leading-[1.68] italic">
            "{selectedArticle.excerpt}"
          </div>

          <div className="space-y-4 text-sm text-[#526363] leading-[1.7] font-normal">
            {selectedArticle.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Contextual Guidance */}
          <div className="p-6 rounded-2xl bg-[#EAF2ED] border border-[#286C6A]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-heading font-bold text-[#243333]">
                Would you like personalized psychological support?
              </h4>
              <p className="text-xs text-[#526363] mt-0.5">
                Our specialists provide confidential care tailored to your circumstances.
              </p>
            </div>

            <button
              onClick={() => {
                closeModal();
                openAppointment(selectedArticle.title);
              }}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl whitespace-nowrap shadow-xs"
            >
              CONSULT WITH A SPECIALIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
