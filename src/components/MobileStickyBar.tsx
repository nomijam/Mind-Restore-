import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const MobileStickyBar: React.FC = () => {
  const { openAppointment, getPhoneCallLink, getWhatsAppLink } = usePractice();

  return (
    <div className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-[#F8F7F2]/95 backdrop-blur-md border-t border-[#286C6A]/15 px-3 py-2 shadow-md flex items-center gap-2 h-14">
      {/* 1. CALL */}
      <a
        href={getPhoneCallLink()}
        className="flex-1 h-10 flex items-center justify-center gap-1.5 px-2 text-[11px] font-semibold text-[#243333] bg-white border border-[#243333]/15 rounded-lg active:bg-neutral-100 transition-colors"
        aria-label="Call clinic reception"
      >
        <Phone className="w-3.5 h-3.5 text-[#286C6A]" />
        <span>CALL</span>
      </a>

      {/* 2. WHATSAPP / CONTACT */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-10 flex items-center justify-center gap-1 px-2 text-[11px] font-semibold text-[#243333] bg-[#EAF2ED] border border-[#286C6A]/20 rounded-lg active:bg-[#d8e6dc] transition-colors"
        aria-label="Contact care coordinator on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#286C6A]" />
        <span>CONTACT</span>
      </a>

      {/* 3. BOOK */}
      <button
        onClick={() => openAppointment()}
        className="flex-[1.2] h-10 flex items-center justify-center gap-1.5 px-2 text-[11px] font-semibold text-white bg-[#286C6A] active:bg-[#1f5654] rounded-lg shadow-2xs transition-colors"
        aria-label="Book an appointment"
      >
        <Calendar className="w-3.5 h-3.5 text-[#D8B878]" />
        <span>BOOK</span>
      </button>
    </div>
  );
};
