import React, { useState } from 'react';
import { X, Shield, FileText, AlertTriangle, Eye, BookOpen } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const LegalModal: React.FC = () => {
  const { activeModal, selectedLegalTab, closeModal, settings } = usePractice();
  const [tab, setTab] = useState<'privacy' | 'terms' | 'disclaimer' | 'accessibility' | 'editorial'>(selectedLegalTab);

  if (activeModal !== 'legal') return null;

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
          <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
            Legal, Clinical & Accessibility Governance
          </span>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 text-[#243333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C433E] cursor-pointer"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#286C6A]/10 px-6 bg-[#F8F7F2] overflow-x-auto">
          {[
            { id: 'disclaimer', label: 'Medical Disclaimer', icon: AlertTriangle },
            { id: 'editorial', label: 'Editorial & Review Policy', icon: BookOpen },
            { id: 'privacy', label: 'Privacy Policy', icon: Shield },
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'accessibility', label: 'Accessibility Statement', icon: Eye },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`py-3.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                tab === item.id
                  ? 'border-[#286C6A] text-[#286C6A] bg-white'
                  : 'border-transparent text-[#526363] hover:text-[#243333]'
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#526363] leading-[1.7]">
          {tab === 'editorial' && (
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-[#243333]">
                Editorial Policy & Clinical Review Standards
              </h3>
              <p>
                <strong>1. Evidence-Informed Medical Sourcing:</strong> All psychoeducational articles and mental health resources published by {settings.organizationName} are grounded in reputable, evidence-based psychological science. We reference authoritative international guidelines including the American Psychological Association (APA), World Health Organization (WHO), and peer-reviewed psychiatric literature.
              </p>
              <p>
                <strong>2. Qualified Professional Authorship:</strong> Content is authored or clinically reviewed by credentialed psychologists holding recognized academic degrees (M.Sc., M.Phil., Ph.D.) and accredited clinical registrations. Author and reviewer names, qualifications, and review dates are stated transparently on educational materials.
              </p>
              <p>
                <strong>3. Non-Diagnostic Educational Purpose:</strong> All online articles, coping guides, and interactive reflection checks are provided strictly for educational purposes and emotional literacy. They do not constitute formal psychiatric evaluations, personalized treatment plans, or clinical diagnoses.
              </p>
              <p>
                <strong>4. Corrections, Integrity & Conflict of Interest:</strong> Life Reset Pakistan maintains editorial independence. We do not accept sponsored pharmaceutical promotions or misleading commercial endorsements. If factual updates or clinical clarifications are identified, articles are promptly revised with an updated review timestamp.
              </p>
            </div>
          )}

          {tab === 'disclaimer' && (
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-[#243333]">
                Medical, Diagnostic & Crisis Disclaimer
              </h3>
              <p>
                <strong>1. Outpatient Service:</strong> {settings.organizationName} is an outpatient psychological practice. We do not operate an emergency crisis response room. In situations involving acute risk of self-harm or immediate physical danger, contact local emergency services (1122 in Pakistan, 999 in the UK, 988 in North America).
              </p>
              <p>
                <strong>2. Psychotherapy Standards:</strong> Our specialists provide psychotherapeutic counselling and psychological assessment. Psychologists do not prescribe medications. If pharmacotherapy is indicated, our team coordinates with licensed medical psychiatrists.
              </p>
              <p>
                <strong>3. Screening Tools:</strong> Educational checks on this website are designed solely to foster self-awareness. They do not constitute formal medical or psychiatric diagnoses.
              </p>
            </div>
          )}

          {tab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-[#243333]">
                Privacy & Confidentiality Standards
              </h3>
              <p>
                <strong>1. Confidentiality:</strong> All interactions between patients and our clinical team are held in strict medical privacy. Information is never released to employers, family members, or third parties without explicit authorization.
              </p>
              <p>
                <strong>2. Ethical Boundaries:</strong> Confidentiality is legally and ethically subject to limits only in exceptional circumstances involving imminent threat to human life or mandatory child safeguarding requirements.
              </p>
              <p>
                <strong>3. Data Security:</strong> Contact details gathered for appointments are managed securely and never shared or sold.
              </p>
            </div>
          )}

          {tab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-[#243333]">
                Terms of Clinical Service
              </h3>
              <p>
                <strong>1. Mutual Respect:</strong> Therapy requires a safe, collaborative environment. Respectful communication is expected from all participants.
              </p>
              <p>
                <strong>2. Punctuality:</strong> Sessions begin and end on time to respect subsequent patients.
              </p>
              <p>
                <strong>3. Rescheduling:</strong> Appointments may be rescheduled with 24 hours advance notice without penalty.
              </p>
            </div>
          )}

          {tab === 'accessibility' && (
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-[#243333]">
                Accessibility & Cognitive Inclusivity Statement
              </h3>
              <p>
                <strong>1. Cognitive Accessibility:</strong> In accordance with healthcare accessibility recommendations, our website is built with short sentences, predictable navigation, high contrast ratios (WCAG AA), and generous spacing to prevent cognitive overload.
              </p>
              <p>
                <strong>2. Assistive Technology:</strong> Screen readers, keyboard-only navigation, and text enlargement are supported across all pages.
              </p>
              <p>
                <strong>3. Continuous Improvement:</strong> If you encounter any accessibility difficulty, please notify our reception team and we will accommodate your needs promptly.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#F8F7F2] border-t border-[#286C6A]/10 text-right">
          <button
            onClick={closeModal}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
