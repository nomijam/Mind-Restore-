import React from 'react';
import { useNavigate } from '../lib/router';
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Phone,
  MessageSquare,
  CreditCard,
  Lock,
  HeartHandshake,
  Calendar,
  Clock,
  Compass,
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import {
  DEFAULT_OG_IMAGE,
  PLANS_PRICING_META,
  SITE_URL,
  VERIFIED_ORGANIZATION,
  buildBreadcrumbSchema,
} from '../data/seoMetadata';
import { PricingSection } from './PricingSection';
import { usePractice } from '../context/PracticeContext';

export const PlansAndPricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, getWhatsAppLink } = usePractice();

  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const coordinatorWhatsAppUrl = getWhatsAppLink(
    'Hello Life Reset Pakistan, I would like guidance on selecting the right counselling plan for my situation.'
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      VERIFIED_ORGANIZATION,
      {
        '@type': 'WebPage',
        '@id': `${PLANS_PRICING_META.canonicalUrl}#webpage`,
        name: PLANS_PRICING_META.title,
        description: PLANS_PRICING_META.description,
        url: PLANS_PRICING_META.canonicalUrl,
        publisher: { '@id': VERIFIED_ORGANIZATION['@id'] },
        mainEntity: {
          '@type': 'OfferCatalog',
          name: 'Online Counselling Plans & Pricing',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Single Video/Voice Counselling Session',
              price: '2500',
              priceCurrency: 'PKR',
              description: 'One 45–60 minute confidential online counselling session by video or voice.',
            },
            {
              '@type': 'Offer',
              name: '5-Session Package (Online Counselling)',
              price: '10000',
              priceCurrency: 'PKR',
              description: 'Five 45–60 minute confidential online counselling sessions in English or Urdu.',
            },
            {
              '@type': 'Offer',
              name: 'Weekly WhatsApp Text Counselling Plan',
              price: '3500',
              priceCurrency: 'PKR',
              description: '7 days of structured WhatsApp text counselling with replies between 9 AM and 9 PM PKT.',
            },
            {
              '@type': 'Offer',
              name: 'Monthly WhatsApp Text Counselling Plan',
              price: '11000',
              priceCurrency: 'PKR',
              description: '30 days of ongoing WhatsApp text support in English or Urdu.',
            },
          ],
        },
      },
      buildBreadcrumbSchema(PLANS_PRICING_META.canonicalUrl, [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Plans & Pricing', url: PLANS_PRICING_META.canonicalUrl },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#243333] text-left">
      <SEOHead
        title={PLANS_PRICING_META.title}
        description={PLANS_PRICING_META.description}
        canonicalUrl={PLANS_PRICING_META.canonicalUrl}
        ogType="website"
        ogImage={DEFAULT_OG_IMAGE}
        schemaData={structuredData}
      />

      {/* Top Breadcrumb & Return Action */}
      <div className="bg-[#1C433E] text-white border-b border-[#286C6A]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBackToHome}
            className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#D1E2DA] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Homepage</span>
          </button>

          <nav aria-label="Breadcrumb" className="text-xs text-[#D1E2DA] flex items-center gap-2 min-h-[44px]">
            <button
              type="button"
              onClick={handleBackToHome}
              className="hover:underline cursor-pointer min-h-[44px] inline-flex items-center"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#D8B878] font-semibold" aria-current="page">
              Plans & Pricing
            </span>
          </nav>
        </div>

        {/* Hero Header Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#D8B878] uppercase bg-white/10 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT MENTAL HEALTH CARE · EST. {settings.foundedYear}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Counselling Plans & Transparent Pricing
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#E2ECE7] font-normal leading-relaxed max-w-2xl mx-auto">
            Ethical, accessible psychological support with complete transparency. No hidden registration fees, surprise bills, or confusing recurring subscriptions.
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B878]">
                <CreditCard className="w-4 h-4" />
                <span>Fixed PKR Rates</span>
              </div>
              <p className="text-[11px] text-[#D1E2DA] leading-snug">
                Transparent local pricing starting at Rs. 2,000/session.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B878]">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Psychologists</span>
              </div>
              <p className="text-[11px] text-[#D1E2DA] leading-snug">
                Certified, postgraduate clinical psychologists in Pakistan.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B878]">
                <Lock className="w-4 h-4" />
                <span>100% Confidential</span>
              </div>
              <p className="text-[11px] text-[#D1E2DA] leading-snug">
                Strict medical privacy protocols in Urdu and English.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B878]">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Booking</span>
              </div>
              <p className="text-[11px] text-[#D1E2DA] leading-snug">
                Instant confirmation directly on your phone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Pricing Section Cards */}
      <div className="bg-[#F8F7F2]">
        <PricingSection />
      </div>

      {/* Additional Dedicated Page Guidance: Payment Methods & Guidance */}
      <section className="py-16 bg-white border-t border-b border-[#286C6A]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-wider text-[#286C6A] uppercase flex items-center justify-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#8A5C14]" />
              <span>ACCEPTED PAYMENT METHODS</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E]">
              Simple, Secure Payment Options Across Pakistan & Overseas
            </h2>
            <p className="text-sm text-[#526363]">
              We facilitate seamless transactions across Pakistan and worldwide so financial logistics never stand between you and essential mental health care.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            {['JazzCash', 'EasyPaisa', 'Bank Transfer', 'SadaPay', 'NayaPay', 'International Cards'].map((method) => (
              <div
                key={method}
                className="p-3.5 rounded-xl bg-[#F8F7F2] border border-[#286C6A]/15 text-xs font-semibold text-[#1C433E] flex flex-col items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8A5C14]" />
                <span>{method}</span>
              </div>
            ))}
          </div>

          {/* Clinical Assurance & What Every Plan Includes */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#EAF2ED]/60 border border-[#286C6A]/20 space-y-6">
            <h3 className="text-lg sm:text-xl font-heading font-bold text-[#1C433E] flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-[#8A5C14]" />
              <span>What Is Guaranteed with Every Counselling Plan</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#334646]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1C433E] shrink-0 mt-0.5" />
                <span>
                  <strong>Full Session Time:</strong> Unrushed 45–60 minute individual sessions conducted in high-definition video or clear voice audio.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1C433E] shrink-0 mt-0.5" />
                <span>
                  <strong>Clinical Continuity:</strong> You stay with the same psychologist across all your sessions for therapeutic rapport.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1C433E] shrink-0 mt-0.5" />
                <span>
                  <strong>Cultural Sensitivity:</strong> Counselors fluent in Pakistani social dynamics, family values, and local challenges.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1C433E] shrink-0 mt-0.5" />
                <span>
                  <strong>Flexible Rescheduling:</strong> Simple 12-hour advance rescheduling via WhatsApp with zero cancellation penalty.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Help Banner for Plan Selection */}
      <section className="py-14 bg-[#1C433E] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#D8B878] uppercase bg-white/10">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>UNSURE WHICH PLAN SUITS YOU?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white max-w-xl mx-auto">
            Speak With Our Clinical Intake Coordinator
          </h2>

          <p className="text-sm sm:text-base text-[#E2ECE7] max-w-lg mx-auto">
            If you are hesitating between single sessions, package care, or text counselling, message our coordinator on WhatsApp for gentle, confidential guidance.
          </p>

          <div className="pt-2">
            <a
              href={coordinatorWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm tracking-wide shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>CHAT WITH INTAKE COORDINATOR ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Links */}
      <div className="py-8 bg-[#F8F7F2] border-t border-[#286C6A]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#243333]">
          <button
            type="button"
            onClick={handleBackToHome}
            className="min-h-[44px] hover:text-[#1C433E] font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Life Reset Pakistan Homepage</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[44px] hover:text-[#1C433E] hover:underline cursor-pointer inline-flex items-center"
            >
              Clinical Services
            </button>
            <span aria-hidden="true">•</span>
            <button
              type="button"
              onClick={() => {
                navigate('/condition/anxiety-disorders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[44px] hover:text-[#1C433E] hover:underline cursor-pointer inline-flex items-center"
            >
              Anxiety Support
            </button>
            <span aria-hidden="true">•</span>
            <button
              type="button"
              onClick={() => {
                navigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[44px] hover:text-[#1C433E] hover:underline cursor-pointer inline-flex items-center"
            >
              Contact & Hours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansAndPricingPage;
