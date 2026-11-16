import React from 'react';
import { Link } from '../lib/router';
import { ArrowLeft, Home, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { SEOHead } from './SEOHead';
import { DEFAULT_OG_IMAGE, NOT_FOUND_META } from '../data/seoMetadata';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const NotFoundPage: React.FC = () => {
  const { settings, getWhatsAppLink, getPhoneCallLink } = usePractice();

  return (
    <article className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-center bg-[#F8F7F2]">
      <SEOHead
        title={NOT_FOUND_META.title}
        description={NOT_FOUND_META.description}
        canonicalUrl={NOT_FOUND_META.canonicalUrl}
        ogType="website"
        ogImage={DEFAULT_OG_IMAGE}
        robots="noindex, follow"
      />

      <div className="max-w-xl mx-auto space-y-7">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#EAF2ED] border border-[#1C433E]/15 shadow-sm">
          <MindRestoreEmblem className="w-10 h-10 text-[#1C433E]" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold tracking-wider text-[#1C433E] uppercase bg-[#EAF2ED] px-3.5 py-1 rounded-full border border-[#1C433E]/15">
            Error 404 · Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#1C433E] tracking-tight">
            We Couldn't Find That Page, But You Are Not Alone.
          </h1>
          <p className="text-sm sm:text-base text-[#526363] leading-relaxed max-w-md mx-auto">
            The page you requested may have been moved or updated during our website modernization.
            Our clinical team is here to help you find the guidance you need.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#1C433E] hover:bg-[#153430] rounded-xl shadow-xs hover:shadow-md transition-all"
          >
            <Home className="w-4 h-4 text-[#D8B878]" />
            <span>RETURN TO HOMEPAGE</span>
          </Link>

          <a
            href={getWhatsAppLink('Hello Life Reset Pakistan, I encountered a 404 link and would like to speak with care coordination.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#1C433E] bg-white border border-[#1C433E]/20 hover:bg-[#EAF2ED] rounded-xl transition-all shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WHATSAPP SUPPORT</span>
          </a>
        </div>

        <div className="pt-6 border-t border-[#1C433E]/10 flex flex-wrap items-center justify-center gap-4 text-xs text-[#526363]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#286C6A]" />
            <span>Established 1981</span>
          </span>
          <span>·</span>
          <a
            href={getPhoneCallLink()}
            className="hover:text-[#1C433E] hover:underline flex items-center gap-1 font-medium"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Reception: {settings.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </article>
  );
};
