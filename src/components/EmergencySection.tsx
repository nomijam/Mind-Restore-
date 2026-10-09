import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const EmergencySection: React.FC = () => {
  const { settings } = usePractice();

  return (
    <section className="py-12 bg-[#F8F7F2] border-b border-[#286C6A]/10 text-left" id="emergency">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D8B878]/60 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f7f2e4] text-[#b88c38] flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-[#243333]">
                Important Emergency Guidance
              </h3>
              <p className="text-xs text-[#526363]">
                Outpatient clinical practice safety notice
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#243333] leading-[1.7] font-normal">
            Please note: this service is not an emergency response service. If you or someone else is in immediate danger, contact your local emergency service or go to the nearest emergency department.
          </p>

          <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#526363]">
            <div className="p-3.5 rounded-xl bg-[#F8F7F2] flex flex-col justify-between">
              <div>
                <span className="font-semibold text-[#243333] block mb-1">Pakistan Mental Health Support:</span>
                <span className="text-xs text-[#243333]">{settings.emergencyNotice.pakistanHotline}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="tel:03117786264"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#286C6A] text-white rounded-lg font-semibold text-xs hover:bg-[#1f5654] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Umang Helpline</span>
                </a>
                <a
                  href="tel:1122"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-700 text-white rounded-lg font-semibold text-xs hover:bg-red-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 1122 Emergency</span>
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F7F2] flex flex-col justify-between">
              <div>
                <span className="font-semibold text-[#243333] block mb-1">International Clients:</span>
                <span className="text-xs text-[#526363] leading-relaxed">{settings.emergencyNotice.internationalAdvice}</span>
              </div>
              <div className="mt-3">
                <span className="text-[11px] text-[#8EAD9A]">Emergency care is available 24/7 via local emergency services worldwide.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
