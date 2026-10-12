import React from 'react';
import {
  CheckCircle2,
  Video,
  MessageCircle,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Phone,
  HeartHandshake,
} from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  effectivePrice?: string;
  duration: string;
  badge?: string;
  highlighted?: boolean;
  category: 'video' | 'text';
  ctaText: string;
  features: string[];
}

export const PricingSection: React.FC = () => {
  const { openAppointment, getWhatsAppLink, settings } = usePractice();

  const videoPlans: PricingPlan[] = [
    {
      id: 'single-session',
      name: 'Single Session',
      price: 'Rs. 2,500',
      duration: '45–60 minutes per session',
      category: 'video',
      ctaText: 'Book Single Session',
      features: [
        'One 45–60 minute online counselling session',
        'Qualified clinical psychologist',
        'Urdu or English counselling',
        'Confidential and private consultation',
        'WhatsApp voice or video session',
      ],
    },
    {
      id: 'five-session-package',
      name: '5-Session Package',
      price: 'Rs. 10,000',
      originalPrice: 'Rs. 12,500',
      savings: 'Rs. 2,500 (20% OFF)',
      effectivePrice: 'Effective Rs. 2,000 per session',
      duration: 'Five 45–60 min sessions',
      badge: 'MOST POPULAR — BEST VALUE',
      highlighted: true,
      category: 'video',
      ctaText: 'Book 5-Session Package',
      features: [
        'Five 45–60 minute online counselling sessions',
        'Same qualified psychologist throughout',
        'Personalized counselling support plan',
        'Priority appointment scheduling',
        'Between-session WhatsApp check-ins',
        'Progress tracking and session summaries',
      ],
    },
  ];

  const textPlans: PricingPlan[] = [
    {
      id: 'weekly-text-plan',
      name: 'Weekly Text Plan',
      price: 'Rs. 3,500',
      duration: '7 days',
      category: 'text',
      ctaText: 'Start Weekly Plan',
      features: [
        'WhatsApp text-based counselling',
        'Replies daily, 9 AM–9 PM PKT',
        'Urdu or English communication',
        'Private and confidential conversations',
      ],
    },
    {
      id: 'monthly-text-plan',
      name: 'Monthly Text Plan',
      price: 'Rs. 11,000',
      originalPrice: 'Rs. 14,000 (four weekly plans)',
      savings: 'Rs. 3,000 compared with four weekly plans',
      duration: '30 days',
      badge: 'BEST FOR ONGOING SUPPORT',
      highlighted: true,
      category: 'text',
      ctaText: 'Start Monthly Plan',
      features: [
        'Same psychologist throughout the month',
        'Priority WhatsApp replies, 9 AM–9 PM PKT',
        'Weekly progress check-ins',
        'Urdu or English communication',
        'Personalized ongoing emotional support',
      ],
    },
  ];

  const handleBookPlan = (plan: PricingPlan) => {
    const planDetail = `${plan.name} (${plan.price})`;
    openAppointment(planDetail, undefined, planDetail);
  };

  const getPlanWhatsAppLink = (plan: PricingPlan) => {
    const msg = `Hello MindSukoon, I would like to book the ${plan.name} (${plan.price}). Please guide me through scheduling and payment.`;
    return getWhatsAppLink(msg);
  };

  return (
    <section className="py-20 bg-[#F8F7F2] border-b border-[#286C6A]/10 text-left" id="pricing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#1C433E] uppercase bg-[#EAF2ED] border border-[#1C433E]/15">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B878]" />
            <span>COUNSELLING PLANS & TRANSPARENT PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1C433E] tracking-tight">
            Clear, Compassionate Mental Health Pricing
          </h2>
          <p className="text-base sm:text-lg text-[#526363] font-normal leading-relaxed max-w-[680px] mx-auto">
            Choose a confidential and structured counselling plan designed around your emotional needs and schedule. No hidden costs or confusing subscription renewals.
          </p>
        </div>

        {/* ========================================================= */}
        {/* PART 1: ONLINE COUNSELLING SESSION PLANS (VOICE & VIDEO) */}
        {/* ========================================================= */}
        <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#286C6A]/15 shadow-xs">
          {/* Sub-header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#286C6A]/10">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-bold tracking-wider text-[#286C6A] uppercase flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#D8B878]" />
                <span>VOICE & VIDEO SESSIONS</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] tracking-tight">
                Online Counselling Session Plans
              </h3>
              <p className="text-sm text-[#526363] leading-relaxed">
                Connect with qualified psychologists from the comfort of your home. Choose a confidential and flexible counselling plan designed around your mental wellness needs.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs text-[#526363] bg-[#F8F7F2] px-3.5 py-2 rounded-xl border border-[#286C6A]/10">
              <ShieldCheck className="w-4 h-4 text-[#286C6A]" />
              <span>100% Confidential · Encrypted</span>
            </div>
          </div>

          {/* Cards Grid: 2 Side-by-Side on Desktop, 1 per Row on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {videoPlans.map((plan) => {
              const isHighlight = plan.highlighted;

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative group ${
                    isHighlight
                      ? 'bg-[#112A27] text-white border-2 border-[#D8B878] shadow-lg ring-1 ring-[#D8B878]/30'
                      : 'bg-[#F8F7F2] text-[#243333] border border-[#286C6A]/15 shadow-2xs hover:shadow-sm hover:border-[#286C6A]/30'
                  }`}
                >
                  {/* Highlight Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 bg-[#D8B878] text-[#112A27] text-[10px] sm:text-[11px] font-heading font-bold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-xs">
                      {plan.badge}
                    </div>
                  )}

                  {/* Top: Plan Title, Duration & Pricing */}
                  <div className="space-y-5">
                    <div>
                      <h4
                        className={`text-xl sm:text-2xl font-heading font-bold tracking-tight ${
                          isHighlight ? 'text-white' : 'text-[#1C433E]'
                        }`}
                      >
                        {plan.name}
                      </h4>
                      <p
                        className={`text-xs mt-1 flex items-center gap-1.5 ${
                          isHighlight ? 'text-[#A3C2B1]' : 'text-[#526363]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Duration: {plan.duration}</span>
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span
                          className={`text-3xl sm:text-4xl font-heading font-extrabold tracking-tight ${
                            isHighlight ? 'text-[#D8B878]' : 'text-[#1C433E]'
                          }`}
                        >
                          {plan.price}
                        </span>
                        {plan.originalPrice && (
                          <span
                            className={`text-sm line-through ${
                              isHighlight ? 'text-neutral-400' : 'text-neutral-400'
                            }`}
                          >
                            {plan.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Savings & Effective Rate Badges */}
                      {(plan.savings || plan.effectivePrice) && (
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {plan.savings && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D8B878]/20 text-[#D8B878] border border-[#D8B878]/40">
                              Savings: {plan.savings}
                            </span>
                          )}
                          {plan.effectivePrice && (
                            <span
                              className={`text-[11px] font-medium ${
                                isHighlight ? 'text-[#E2ECE7]' : 'text-[#286C6A]'
                              }`}
                            >
                              • {plan.effectivePrice}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 pt-3">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block ${
                          isHighlight ? 'text-[#A3C2B1]' : 'text-[#286C6A]'
                        }`}
                      >
                        What’s Included:
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isHighlight ? 'text-[#D8B878]' : 'text-[#286C6A]'
                              }`}
                            />
                            <span className={isHighlight ? 'text-[#E2ECE7]' : 'text-[#526363]'}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom CTAs: Aligned across cards */}
                  <div className="pt-8 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleBookPlan(plan)}
                      className={`w-full py-3.5 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] ${
                        isHighlight
                          ? 'bg-[#D8B878] hover:bg-[#e0c489] text-[#112A27] shadow-md hover:shadow-lg'
                          : 'bg-[#1C433E] hover:bg-[#122e2a] text-white hover:shadow-md'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={getPlanWhatsAppLink(plan)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 text-center text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 ${
                        isHighlight
                          ? 'text-[#A3C2B1] hover:text-white'
                          : 'text-[#526363] hover:text-[#1C433E]'
                      }`}
                    >
                      <MessageCircle className="w-3 h-3 text-[#25D366]" />
                      <span>Or book directly via WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 2: TEXT COUNSELLING PLANS (PREFER TYPING OVER TALKING?) */}
        {/* ========================================================= */}
        <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#286C6A]/15 shadow-xs">
          {/* Sub-header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#286C6A]/10">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-bold tracking-wider text-[#286C6A] uppercase flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-[#D8B878]" />
                <span>TEXT COUNSELLING PLANS</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] tracking-tight">
                Prefer Typing Over Talking?
              </h3>
              <p className="text-base font-heading font-semibold text-[#286C6A]">
                Message Your Psychologist
              </p>
              <p className="text-sm text-[#526363] leading-relaxed">
                Sometimes writing about your feelings is easier than speaking. Connect with a psychologist through private WhatsApp messages at your own pace.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs text-[#526363] bg-[#F8F7F2] px-3.5 py-2 rounded-xl border border-[#286C6A]/10">
              <Clock className="w-4 h-4 text-[#286C6A]" />
              <span>Daily Replies · 9 AM – 9 PM PKT</span>
            </div>
          </div>

          {/* Cards Grid: 2 Side-by-Side on Desktop, 1 per Row on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {textPlans.map((plan) => {
              const isHighlight = plan.highlighted;

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative group ${
                    isHighlight
                      ? 'bg-[#112A27] text-white border-2 border-[#D8B878] shadow-lg ring-1 ring-[#D8B878]/30'
                      : 'bg-[#F8F7F2] text-[#243333] border border-[#286C6A]/15 shadow-2xs hover:shadow-sm hover:border-[#286C6A]/30'
                  }`}
                >
                  {/* Highlight Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 bg-[#D8B878] text-[#112A27] text-[10px] sm:text-[11px] font-heading font-bold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-xs">
                      {plan.badge}
                    </div>
                  )}

                  {/* Top: Plan Title, Duration & Pricing */}
                  <div className="space-y-5">
                    <div>
                      <h4
                        className={`text-xl sm:text-2xl font-heading font-bold tracking-tight ${
                          isHighlight ? 'text-white' : 'text-[#1C433E]'
                        }`}
                      >
                        {plan.name}
                      </h4>
                      <p
                        className={`text-xs mt-1 flex items-center gap-1.5 ${
                          isHighlight ? 'text-[#A3C2B1]' : 'text-[#526363]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Duration: {plan.duration}</span>
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span
                          className={`text-3xl sm:text-4xl font-heading font-extrabold tracking-tight ${
                            isHighlight ? 'text-[#D8B878]' : 'text-[#1C433E]'
                          }`}
                        >
                          {plan.price}
                        </span>
                        {plan.originalPrice && (
                          <span
                            className={`text-xs sm:text-sm line-through ${
                              isHighlight ? 'text-neutral-400' : 'text-neutral-400'
                            }`}
                          >
                            {plan.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Savings Pill */}
                      {plan.savings && (
                        <div className="pt-0.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D8B878]/20 text-[#D8B878] border border-[#D8B878]/40">
                            Savings: {plan.savings}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 pt-3">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block ${
                          isHighlight ? 'text-[#A3C2B1]' : 'text-[#286C6A]'
                        }`}
                      >
                        Plan Highlights:
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isHighlight ? 'text-[#D8B878]' : 'text-[#286C6A]'
                              }`}
                            />
                            <span className={isHighlight ? 'text-[#E2ECE7]' : 'text-[#526363]'}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom CTAs: Aligned across cards */}
                  <div className="pt-8 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleBookPlan(plan)}
                      className={`w-full py-3.5 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] ${
                        isHighlight
                          ? 'bg-[#D8B878] hover:bg-[#e0c489] text-[#112A27] shadow-md hover:shadow-lg'
                          : 'bg-[#1C433E] hover:bg-[#122e2a] text-white hover:shadow-md'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={getPlanWhatsAppLink(plan)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 text-center text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 ${
                        isHighlight
                          ? 'text-[#A3C2B1] hover:text-white'
                          : 'text-[#526363] hover:text-[#1C433E]'
                      }`}
                    >
                      <MessageCircle className="w-3 h-3 text-[#25D366]" />
                      <span>Or start directly on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* REASSURANCE BAR & PAYMENT / ETHICS POLICY STRIP */}
        {/* ========================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#EAF2ED] border border-[#1C433E]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#1C433E] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#286C6A]" />
              <span>Ethical Standards & Payment Simplicity</span>
            </div>
            <p className="text-xs sm:text-sm text-[#526363] max-w-xl">
              Bank transfer, EasyPaisa, JazzCash, and international debit/credit cards accepted. Confidential intake and fee confirmation prior to your initial session.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openAppointment('Custom Consultation Inquiry')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1C433E] hover:bg-[#122e2a] transition-colors shadow-2xs cursor-pointer"
            >
              Ask a Clinical Intake Question
            </button>
            <a
              href={getWhatsAppLink('Hello MindSukoon, I have a question regarding your counselling fees and booking process.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#1C433E] bg-white hover:bg-neutral-50 border border-[#1C433E]/15 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
