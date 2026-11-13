import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const MobileStickyBar: React.FC = () => {
  const { openAppointment, getPhoneCallLink, getWhatsAppLink } = usePractice();

  return (
    <div className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-[#F8F7F2]/95 backdrop-blur-md border-t border-[#1C433E]/15 px-3 py-2 shadow-md flex items-center gap-2 min-h-[64px]">
      {/* 1. CALL */}
      <a
        href={getPhoneCallLink()}
        className="flex-1 min-h-[48px] h-12 flex items-center justify-center gap-1.5 px-3 text-xs font-semibold text-[#1C433E] bg-white border border-[#1C433E]/20 rounded-xl active:bg-neutral-100 transition-colors cursor-pointer"
        aria-label="Call clinic reception"
      >
        <Phone className="w-4 h-4 text-[#1C433E]" />
        <span>CALL</span>
      </a>

      {/* 2. WHATSAPP / CONTACT / CHAT */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[48px] h-12 flex items-center justify-center gap-1.5 px-3 text-xs font-semibold text-[#1C433E] bg-[#EAF2ED] border border-[#1C433E]/25 rounded-xl active:bg-[#d8e6dc] transition-colors cursor-pointer"
        aria-label="Chat with care coordinator on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 text-[#1C433E]" />
        <span>CHAT</span>
      </a>

      {/* 3. BOOK */}
      <a
        href={getWhatsAppLink('Hello Life Reset Pakistan, I would like to book a confidential consultation (Est. 1981).')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[1.2] min-h-[48px] h-12 flex items-center justify-center gap-1.5 px-3 text-xs font-semibold text-white bg-[#1C433E] active:bg-[#14322e] rounded-xl shadow-xs transition-colors cursor-pointer"
        aria-label="Book an appointment on WhatsApp"
      >
        <Calendar className="w-4 h-4 text-[#D8B878]" />
        <span>BOOK</span>
      </a>
    </div>
  );
};
