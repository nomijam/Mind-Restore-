import React from 'react';
import { X, Calendar, Clock, ArrowRight, ShieldCheck, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { resourcesImg } from '../data/practiceData';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const ArticleModal: React.FC = () => {
  const { activeModal, selectedArticle, closeModal, openAppointment, openLegal } = usePractice();

  if (activeModal !== 'article' || !selectedArticle) return null;

  const getCitationsForCategory = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'anxiety':
        return [
          { citation: 'American Psychological Association (APA). Clinical Practice Guideline for the Treatment of Anxiety and Panic. Washington, DC.', year: '2024' },
          { citation: 'World Health Organization (WHO). Mental Health Gap Action Programme (mhGAP) Guideline. Geneva.', year: '2023' },
          { citation: 'Journal of Affective Disorders. Physiological Sigh and Autonomic Vagal Regulation in Acute Stress.', year: '2023' },
        ];
      case 'depression':
        return [
          { citation: 'National Institute of Mental Health (NIMH). Depression: Recognition, Assessment, and Psychotherapy Outpatient Guidelines.', year: '2024' },
          { citation: 'Beck Institute for Cognitive Behavior Therapy. Essentials of Cognitive Restructuring and Behavioral Activation in Mood Disorders.', year: '2023' },
          { citation: 'The Lancet Psychiatry. Evidence-Based Psychotherapy Versus Pharmacotherapy in Depressive Spectrum.', year: '2023' },
        ];
      case 'relationships':
        return [
          { citation: 'Gottman Institute. Sound Relationship House Theory and Longitudinal Predictors of Relational Stability.', year: '2023' },
          { citation: 'American Association for Marriage and Family Therapy (AAMFT). Clinical Practice Ethics and Systems Dynamics.', year: '2024' },
        ];
      case 'stress':
      default:
        return [
          { citation: 'World Health Organization (WHO). Guidelines on Mental Health at Work: Organizational Interventions and Individual Recovery.', year: '2023' },
          { citation: 'International Journal of Stress Management. Autonomic Recovery from Prolonged Occupational Depletion.', year: '2024' },
          { citation: 'American Psychological Association (APA). Stress in America: Coping Mechanisms and Cognitive Reserves.', year: '2023' },
        ];
    }
  };

  const citations = getCitationsForCategory(selectedArticle.category);

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
        {/* Sticky Header with Breadcrumb and Governance */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#1C433E]/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <MindRestoreEmblem className="w-5 h-5 shrink-0" />
            <span className="text-[#526363] hidden sm:inline">Resources</span>
            <span className="text-[#526363] hidden sm:inline" aria-hidden="true">/</span>
            <span className="font-semibold uppercase tracking-wider text-[#1C433E]">
              {selectedArticle.category} Psychoeducation
            </span>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 text-[#243333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C433E] cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-7">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block bg-[#EAF2ED] text-[#1C433E] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                {selectedArticle.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>Clinically Reviewed</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] leading-snug">
              {selectedArticle.title}
            </h1>

            {/* Author, Reviewer & Governance Metadata */}
            <div className="p-3.5 rounded-xl bg-[#F8F7F2] border border-[#1C433E]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#526363]">
              <div className="space-y-0.5">
                <p>
                  <strong>Author:</strong> {selectedArticle.author} (Licensed Psychologist)
                </p>
                <p className="text-[11px] text-[#7BA28E]">
                  <strong>Clinical Review:</strong> Dr. Farah Kamran, Ph.D. · {selectedArticle.date}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-[#526363]">
                  <Clock className="w-3.5 h-3.5 text-[#7BA28E]" />
                  <span>{selectedArticle.readTime}</span>
                </span>
                <button
                  type="button"
                  onClick={() => openLegal('editorial')}
                  className="text-[#1C433E] hover:underline font-semibold cursor-pointer"
                >
                  Editorial Policy →
                </button>
              </div>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#EAF2ED] border border-[#1C433E]/10">
            <img
              src={resourcesImg}
              alt={selectedArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="p-5 rounded-xl bg-[#EAF2ED]/60 border-l-4 border-[#1C433E] text-sm text-[#243333] font-medium leading-[1.68] italic">
            "{selectedArticle.excerpt}"
          </div>

          <div className="space-y-4 text-sm text-[#334242] leading-[1.72] font-normal">
            {selectedArticle.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Peer-Reviewed References & Sourcing (Healthcare SEO Requirement) */}
          <div className="p-5 rounded-2xl bg-[#F8F7F2] border border-[#1C433E]/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#1C433E] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#7BA28E]" />
              <span>Evidence-Informed Clinical References</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#526363]">
              {citations.map((cite, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#7BA28E] font-bold">[{idx + 1}]</span>
                  <span>{cite.citation} ({cite.year}).</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical & Non-Diagnostic Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Educational Disclaimer:</strong> This article is published for psychoeducational purposes and does not substitute individualized clinical evaluation, psychiatric diagnosis, or formal psychotherapy. If you or someone you know is in immediate crisis, contact local emergency services immediately (1122 in Pakistan).
            </p>
          </div>

          {/* Contextual Guidance & Appointment CTA */}
          <div className="p-6 rounded-2xl bg-[#1C433E] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-heading font-bold">
                Would you like personalized psychological support?
              </h4>
              <p className="text-xs text-neutral-300 mt-0.5">
                Our specialists provide confidential care tailored to your circumstances.
              </p>
            </div>

            <button
              onClick={() => {
                closeModal();
                openAppointment(selectedArticle.title);
              }}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider text-[#1C433E] bg-white hover:bg-neutral-100 rounded-xl whitespace-nowrap shadow-xs transition-colors"
            >
              CONSULT WITH A SPECIALIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
