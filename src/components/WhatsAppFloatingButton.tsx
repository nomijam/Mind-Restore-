import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { getWhatsAppLink } = usePractice();
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Speech prompt */}
      {!minimized && (
        <div className="bg-white rounded-2xl p-3 shadow-lg border border-[#286C6A]/15 max-w-xs text-left animate-in slide-in-from-bottom-2 duration-200 relative group">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(true);
            }}
            className="absolute top-2 right-2 text-[#526363] hover:text-[#1C433E] hover:bg-neutral-100 active:bg-neutral-200 p-1 rounded-full transition-colors cursor-pointer"
            aria-label="Dismiss chat prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#8EAD9A]" />
            <span className="text-[11px] font-semibold text-[#243333]">
              Have a question?
            </span>
          </div>
          <p className="text-xs text-[#526363] pr-4">
            Chat with our clinical team (non-emergency inquiries).
          </p>
        </div>
      )}

      {/* Button */}
      <a
        href={getWhatsAppLink('Hello, I have an inquiry regarding psychological consultations.')}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-3 bg-[#286C6A] hover:bg-[#1f5654] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group focus:outline-none"
        aria-label="Chat with our clinical team on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-[#D8B878]" />
        <span className="text-xs font-semibold tracking-wide uppercase pr-1 hidden sm:inline">
          Chat with Our Team
        </span>
      </a>
    </div>
  );
};
