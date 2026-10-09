import React from 'react';
import { ShieldCheck, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const PricingSection: React.FC = () => {
  const { settings, openAppointment, getPhoneCallLink } = usePractice();

  return (
    <section className="py-20 bg-white border-b border-[#286C6A]/10 text-left" id="pricing">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            Financial Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            Consultation Fees & Policies
          </h2>
          <p className="text-base text-[#526363] font-normal max-w-[650px] mx-auto">
            We are committed to clear, upfront communication regarding fees so you never encounter unexpected costs.
          </p>
        </div>

        <div className="bg-[#F8F7F2] rounded-3xl p-8 sm:p-12 border border-[#286C6A]/15 text-center sm:text-left space-y-6">
          <div className="max-w-2xl space-y-3">
            <h3 className="text-xl font-heading font-bold text-[#243333]">
              Fees Vary Depending on Service and Professional
            </h3>
            <p className="text-sm text-[#526363] leading-[1.7]">
              Because our clinical team includes specialists with differing levels of post-doctoral specialization (individual therapy, couples counselling, adolescent care, and formal psychometric assessment), exact consultation fees vary based on the service requested.
            </p>
          </div>

          {/* Standard Institutional Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
            <div className="p-5 rounded-2xl bg-white border border-[#286C6A]/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-[#8EAD9A] uppercase">
                  Initial Evaluation
                </span>
                <p className="text-base font-heading font-bold text-[#243333] mt-1">
                  Standard Clinical Intake
                </p>
                <p className="text-xs text-[#526363] mt-1">
                  50-minute comprehensive assessment and collaborative treatment plan.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#286C6A]/10">
                <button
                  onClick={() => openAppointment('Initial Clinical Intake Evaluation')}
                  className="w-full py-2 text-xs font-semibold text-[#286C6A] bg-[#EAF2ED] hover:bg-[#286C6A] hover:text-white rounded-lg transition-colors"
                >
                  Book Initial Intake
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#286C6A]/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-[#8EAD9A] uppercase">
                  Follow-up Sessions
                </span>
                <p className="text-base font-heading font-bold text-[#243333] mt-1">
                  Ongoing Psychotherapy
                </p>
                <p className="text-xs text-[#526363] mt-1">
                  Weekly or bi-weekly 50-minute structured sessions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#286C6A]/10">
                <button
                  onClick={() => openAppointment('Ongoing Psychotherapy Follow-up')}
                  className="w-full py-2 text-xs font-semibold text-[#286C6A] bg-[#EAF2ED] hover:bg-[#286C6A] hover:text-white rounded-lg transition-colors"
                >
                  Book Ongoing Care
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#286C6A]/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-[#8EAD9A] uppercase">
                  Digital & Overseas
                </span>
                <p className="text-base font-heading font-bold text-[#243333] mt-1">
                  Tele-Health Consultations
                </p>
                <p className="text-xs text-[#526363] mt-1">
                  Secure digital appointments with flexible scheduling for diaspora clients.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#286C6A]/10">
                <button
                  onClick={() => openAppointment('Tele-Health Digital Consultation')}
                  className="w-full py-2 text-xs font-semibold text-[#286C6A] bg-[#EAF2ED] hover:bg-[#286C6A] hover:text-white rounded-lg transition-colors"
                >
                  Book Tele-Health
                </button>
              </div>
            </div>
          </div>

          {/* Prompt CTA: "CONTACT US FOR CURRENT FEES" */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#286C6A]/10">
            <div className="flex items-center gap-2 text-xs text-[#526363]">
              <ShieldCheck className="w-4 h-4 text-[#286C6A] shrink-0" />
              <span>Full fee disclosure provided before any appointment is scheduled.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => openAppointment('Fee Inquiry & Schedule')}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl transition-all shadow-xs"
              >
                CONTACT US FOR CURRENT FEES
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
