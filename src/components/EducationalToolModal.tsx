import React, { useState } from 'react';
import { X, Check, Calendar, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const EducationalToolModal: React.FC = () => {
  const { activeModal, selectedTool, closeModal, openAppointment } = usePractice();

  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  if (activeModal !== 'tool' || !selectedTool) return null;

  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);

  const matchedRange = selectedTool.scoreRanges.find(
    (range) => totalScore >= range.minScore && totalScore <= range.maxScore
  ) || selectedTool.scoreRanges[selectedTool.scoreRanges.length - 1];

  const handleSelectOption = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleReset = () => {
    setAnswers({});
    setIsCalculated(false);
  };

  const isComplete = Object.keys(answers).length === selectedTool.questions.length;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#286C6A]/15 relative text-left cursor-default"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#286C6A]/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
              Self-Reflection Screening Resource
            </span>
            <h2 className="text-lg font-heading font-bold text-[#243333]">
              {selectedTool.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 text-[#243333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C433E] cursor-pointer"
            aria-label="Close tool modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Section 25 Mandatory Notice */}
          <div className="p-4 rounded-xl bg-[#F8F7F2] border border-[#D8B878]/70 text-xs text-[#243333] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#b88c38] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#243333]">Clinical Disclaimer: </strong>
              {selectedTool.disclaimer}
            </div>
          </div>

          {!isCalculated ? (
            <div className="space-y-6">
              <p className="text-xs text-[#526363]">
                Please choose the response that best reflects your experience over the past 2 weeks:
              </p>

              {selectedTool.questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-[#F8F7F2] border border-[#286C6A]/10 space-y-3">
                  <p className="text-sm font-medium text-[#243333]">
                    {idx + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {q.options.map((opt) => (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => handleSelectOption(q.id, opt.score)}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          answers[q.id] === opt.score
                            ? 'bg-[#286C6A] text-white border-[#286C6A] shadow-xs'
                            : 'bg-white border-[#286C6A]/15 text-[#243333] hover:border-[#286C6A]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#526363]">
                  {Object.keys(answers).length} of {selectedTool.questions.length} answered
                </span>

                <button
                  onClick={() => setIsCalculated(true)}
                  disabled={!isComplete}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-all disabled:opacity-40"
                >
                  <span>CALCULATE SUMMARY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Result View */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-2xl bg-[#EAF2ED] border border-[#286C6A]/20 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
                  Assessment Outcome: {totalScore} Points
                </span>
                <h3 className="text-2xl font-heading font-bold text-[#243333]">
                  {matchedRange.level}
                </h3>
                <p className="text-sm text-[#243333] leading-[1.68]">
                  {matchedRange.summary}
                </p>
                <div className="pt-2 text-xs text-[#526363] border-t border-[#286C6A]/15">
                  <strong className="text-[#243333]">Recommended Step: </strong>
                  {matchedRange.nextStep}
                </div>
              </div>

              {/* Consultation Invite */}
              <div className="p-6 rounded-2xl bg-[#243333] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-heading font-bold">
                    Would you like to discuss these results?
                  </h4>
                  <p className="text-xs text-neutral-300">
                    A qualified clinician can review your reflections in a safe, confidential setting.
                  </p>
                </div>

                <button
                  onClick={() => {
                    closeModal();
                    openAppointment(selectedTool.title);
                  }}
                  className="px-6 py-3 text-xs font-semibold tracking-wider text-[#243333] bg-white hover:bg-neutral-100 rounded-xl whitespace-nowrap shadow-xs"
                >
                  TALK TO A PROFESSIONAL
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-[#526363] hover:text-[#243333]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Check
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
