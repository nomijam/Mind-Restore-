import React, { useState } from 'react';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const FAQSection: React.FC = () => {
  const { getWhatsAppLink, getPhoneCallLink, settings } = usePractice();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white border-b border-[#286C6A]/10 text-left" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            Clarity & Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#526363] font-normal max-w-[620px] mx-auto">
            Essential information regarding our clinical practice, confidentiality, and appointment scheduling.
          </p>
        </div>

        {/* 11 FAQ Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-[#F8F7F2] rounded-xl border border-[#286C6A]/10 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-[#EAF2ED]/50 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-base text-[#243333]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#286C6A] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#526363] leading-[1.7] border-t border-[#286C6A]/10 animate-in fade-in duration-150 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#EAF2ED] border border-[#286C6A]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-base font-heading font-bold text-[#243333]">
              Have a specific question not covered here?
            </h3>
            <p className="text-xs text-[#526363] mt-0.5">
              Our clinical intake team is available to assist you Monday through Saturday.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={getPhoneCallLink()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#243333] bg-white border border-[#286C6A]/20 hover:border-[#286C6A] rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#286C6A]" />
              <span>Call Reception</span>
            </a>

            <a
              href={getWhatsAppLink('Hello, I have a question regarding your psychological services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D8B878]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
