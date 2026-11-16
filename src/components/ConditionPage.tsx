import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  X,
  Calendar,
  Phone,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { ConditionItem } from '../types';
import { usePractice } from '../context/PracticeContext';
import { SPECIALISTS } from '../data/practiceData';
import { CONDITIONS_DATA, findCondition } from '../data/conditionsData';
import { getConditionHeroImage } from '../data/heroImagesData';
import { MindRestoreEmblem } from './MindRestoreLogo';
import { SEOHead } from './SEOHead';
import {
  CONDITION_META_BY_SLUG,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  VERIFIED_ORGANIZATION,
  buildBreadcrumbSchema,
  sanitizeSchemaText,
} from '../data/seoMetadata';
import { useNavigate, useParams } from '../lib/router';
import { NotFoundPage } from './NotFoundPage';

interface ConditionPageProps {
  condition: ConditionItem;
  onBack: () => void;
  onSelectCondition: (slug: string) => void;
}

export const ConditionPage: React.FC<ConditionPageProps> = ({
  condition,
  onBack,
  onSelectCondition,
}) => {
  const { settings, getWhatsAppLink, getPhoneCallLink, openSpecialistProfile } =
    usePractice();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll to top when condition changes (only if not already at top)
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [condition]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Find specialists associated with this condition
  const specialists = SPECIALISTS.filter((spec) =>
    condition.recommendedSpecialistIds?.includes(spec.id)
  );
  const displaySpecialists = specialists.length > 0 ? specialists : SPECIALISTS.slice(0, 2);

  // Related conditions from the same or other category
  const relatedConditions = CONDITIONS_DATA.filter((c) => c.id !== condition.id).slice(0, 4);

  // High-resolution condition-tailored therapeutic atmosphere hero image
  const heroImage = getConditionHeroImage(condition.slug || condition.id);

  const conditionMeta = CONDITION_META_BY_SLUG[condition.slug] || {
    title: `${condition.title} | Life Reset Pakistan`,
    description: sanitizeSchemaText(
      `Confidential online ${condition.title.toLowerCase()} support in English and Urdu across Pakistan and worldwide via video, phone, or text.`
    ).slice(0, 160),
  };
  const canonicalUrl = `${SITE_URL}/condition/${condition.slug}`;
  const ogImage = heroImage?.src ? `${SITE_URL}${heroImage.src}` : DEFAULT_OG_IMAGE;

  return (
    <article className="min-h-screen bg-[#F8F7F2] text-[#243333] pb-24">
      <SEOHead
        title={conditionMeta.title}
        description={conditionMeta.description}
        canonicalUrl={canonicalUrl}
        ogType="website"
        ogImage={ogImage}
        schemaData={{
          '@context': 'https://schema.org',
          '@graph': [
            VERIFIED_ORGANIZATION,
            {
              '@type': 'WebPage',
              '@id': `${canonicalUrl}#webpage`,
              url: canonicalUrl,
              name: conditionMeta.title,
              description: conditionMeta.description,
              about: { '@id': `${canonicalUrl}#condition` },
              publisher: { '@id': VERIFIED_ORGANIZATION['@id'] },
              inLanguage: 'en-PK',
            },
            {
              '@type': 'MedicalCondition',
              '@id': `${canonicalUrl}#condition`,
              name: condition.title,
              description: conditionMeta.description,
              possibleTreatment: condition.therapeuticModalities?.map((m) => ({
                '@type': 'MedicalTherapy',
                name: sanitizeSchemaText(m.name),
                description: sanitizeSchemaText(m.description),
              })),
            },
            buildBreadcrumbSchema(canonicalUrl, [
              { name: 'Home', url: `${SITE_URL}/` },
              { name: 'Services', url: `${SITE_URL}/services` },
              { name: condition.title, url: canonicalUrl },
            ]),
            ...(condition.faqs && condition.faqs.length > 0
              ? [
                  {
                    '@type': 'FAQPage',
                    '@id': `${canonicalUrl}#faq`,
                    mainEntity: condition.faqs.map((f) => ({
                      '@type': 'Question',
                      name: sanitizeSchemaText(f.question),
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: sanitizeSchemaText(f.answer),
                      },
                    })),
                  },
                ]
              : []),
          ],
        }}
      />

      {/* Top Breadcrumb & Navigation Bar */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-[#286C6A]/10 sticky top-20 z-30 px-4 sm:px-6 lg:px-8 py-3.5 shadow-2xs backdrop-blur-md bg-white/95"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-semibold text-[#1C433E] hover:text-[#122e2a] hover:underline transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-neutral-300">/</span>
            <span className="text-[#526363] shrink-0">Conditions</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-[#1C433E] truncate">{condition.title}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF2ED] text-[#1C433E] border border-[#1C433E]/15">
              {condition.category === 'common-concerns' ? 'Common Concern' : 'Specialised Care'}
            </span>
            <span className="hidden md:inline-block text-neutral-300">|</span>
            <span className="hidden lg:inline text-[#526363] text-[11px]">Strict Confidentiality</span>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C433E]/10 hover:bg-[#1C433E] text-[#1C433E] hover:text-white font-semibold transition-all text-xs cursor-pointer shadow-2xs"
              aria-label="Close condition page"
              title="Close and return to home"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner Section with Condition Therapeutic Atmosphere Background & Subtle Dark Gradient Overlay */}
      <section className="relative overflow-hidden border-b border-[#1C433E]/20 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-white min-h-[460px] flex items-center">
        {/* Background Image with Progressive Responsive Optimization */}
        <div className="absolute inset-0 z-0">
          <picture className="block w-full h-full">
            <source
              media="(max-width: 640px)"
              srcSet={`${heroImage.mobileSrc} 640w`}
              sizes="100vw"
              type="image/webp"
              width={640}
              height={357}
            />
            <source
              media="(min-width: 641px)"
              srcSet={`${heroImage.src} 1280w`}
              sizes="100vw"
              type="image/webp"
              width={heroImage.width}
              height={heroImage.height}
            />
            <img
              src={heroImage.src}
              srcSet={`${heroImage.mobileSrc} 640w, ${heroImage.src} 1280w`}
              sizes="100vw"
              width={heroImage.width}
              height={heroImage.height}
              alt={heroImage.alt}
              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
            />
          </picture>
          {/* Subtle Dark Gradient Overlay: Deep Pine (#112A27) to preserve maximum typographic legibility & contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#112A27]/95 via-[#112A27]/90 to-[#112A27]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112A27] via-transparent to-black/35" />
        </div>

        {/* Foreground Content with Crisp Legibility */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 text-left w-full">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1C433E]/90 text-white border border-white/20 shadow-xs backdrop-blur-xs">
              <MindRestoreEmblem className="w-3.5 h-3.5" />
              <span>Evidence-Informed Clinical Track</span>
            </span>
            {condition.badge && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#112A27]/85 text-[#D8B878] border border-[#D8B878]/35 shadow-xs backdrop-blur-xs">
                {condition.badge}
              </span>
            )}
            {/* Condition Clinical Theme Badge */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-black/45 text-neutral-200 border border-white/10 backdrop-blur-xs">
              <span>🌿 {heroImage.landmark}</span>
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-[1.18] drop-shadow-xs">
              {condition.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#E2ECE7] font-normal leading-relaxed max-w-3xl drop-shadow-xs">
              {condition.twoLineExplanation}
            </p>
          </div>

          {/* Key Clinical Attributes Bar with Frosted Glass Styling */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-[#112A27]/75 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D1E2DA] block">
                Session Format
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                Secure Online Video & Voice
              </span>
            </div>
            <div className="bg-[#112A27]/75 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D1E2DA] block">
                Session Length
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                50 Minutes Private
              </span>
            </div>
            <div className="bg-[#112A27]/75 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D1E2DA] block">
                Practitioner
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                Licensed Clinical Psychologist
              </span>
            </div>
            <div className="bg-[#112A27]/75 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D1E2DA] block">
                Languages
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                English, Urdu & Punjabi
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppLink(
                `Hello Life Reset Pakistan, I would like to book a confidential consultation for ${condition.title} (Est. ${settings.foundedYear || 1981}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#112A27] bg-[#D8B878] hover:bg-[#e0c489] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#112A27]" />
              <span>BOOK A CONFIDENTIAL SESSION</span>
            </a>

            <a
              href={getWhatsAppLink(
                `Hello Life Reset Pakistan, I would like to inquire about booking a confidential consultation for ${condition.title}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#1C433E]/90 hover:bg-[#1C433E] border border-white/20 backdrop-blur-xs rounded-xl shadow-2xs hover:border-white transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WHATSAPP CONSULTATION</span>
            </a>

            <a
              href={getPhoneCallLink()}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#E2ECE7] hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D8B878]" />
              <span>Call: {settings.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 text-left">
        {/* Gentle Guidance Banner */}
        <div className="bg-[#EAF2ED] border-l-4 border-[#1C433E] p-6 rounded-2xl shadow-2xs">
          <div className="flex items-start gap-3.5">
            <HeartHandshake className="w-5 h-5 text-[#1C433E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1C433E]">
                Gentle Guidance from Our Clinical Team
              </h2>
              <p className="text-sm sm:text-base text-[#243333] leading-relaxed">
                {condition.gentleGuidance}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Clinical Overview */}
        {condition.fullOverview && (
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E]">
              Understanding {condition.title}
            </h2>
            <div className="prose prose-neutral max-w-none text-base text-[#415352] leading-[1.75] space-y-4">
              <p>{condition.fullOverview}</p>
              {condition.culturalContext && (
                <div className="bg-white p-5 rounded-2xl border border-[#286C6A]/15 mt-4 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A5C14] block">
                    Cultural Reality & Pakistani Context
                  </span>
                  <p className="text-sm text-[#415352] leading-relaxed">
                    {condition.culturalContext}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Symptoms Breakdown (Emotional, Physical, Behavioral) */}
        {condition.symptomsBreakdown && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
                Clinical Manifestations
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] mt-1">
                How It May Show Up in Daily Life
              </h2>
              <p className="text-sm text-[#526363] mt-1">
                You do not need to experience every symptom to seek support. Recognizing these signs
                is the first step toward healing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Emotional */}
              <div className="bg-white p-6 rounded-2xl border border-[#286C6A]/10 shadow-2xs space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF2ED] text-[#1C433E] flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h3 className="text-base font-bold text-[#1C433E]">Emotional Signs</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#415352]">
                  {condition.symptomsBreakdown.emotional.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C433E] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Physical */}
              <div className="bg-white p-6 rounded-2xl border border-[#286C6A]/10 shadow-2xs space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF2ED] text-[#1C433E] flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h3 className="text-base font-bold text-[#1C433E]">Physical & Somatic</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#415352]">
                  {condition.symptomsBreakdown.physical.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C433E] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Behavioral */}
              <div className="bg-white p-6 rounded-2xl border border-[#286C6A]/10 shadow-2xs space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF2ED] text-[#1C433E] flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h3 className="text-base font-bold text-[#1C433E]">Behavioral Habits</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#415352]">
                  {condition.symptomsBreakdown.behavioral.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C433E] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Evidence-Based Approaches */}
        {condition.therapeuticModalities && condition.therapeuticModalities.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
                Our Clinical Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] mt-1">
                Evidence-Based Approaches We Utilize
              </h2>
              <p className="text-sm text-[#526363] mt-1">
                We do not believe in one-size-fits-all therapy. We customize scientifically
                validated psychological frameworks to your unique personal story.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {condition.therapeuticModalities.map((mod, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#286C6A]/15 hover:border-[#286C6A]/40 transition-colors space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-[#1C433E]">
                    <Sparkles className="w-4 h-4 text-[#D8B878]" />
                    <h3 className="font-heading font-bold text-base">{mod.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#526363] leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Treatment Roadmap (4 Steps) */}
        {condition.treatmentRoadmap && condition.treatmentRoadmap.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#286C6A]/10 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
                The Care Pathway
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] mt-1">
                What to Expect in Your Sessions
              </h2>
              <p className="text-sm text-[#526363] mt-1">
                Therapy with Life Reset Pakistan is collaborative, paced, and clear. You always know where
                you are in your journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {condition.treatmentRoadmap.map((step, idx) => (
                <div key={idx} className="space-y-2 relative">
                  <div className="w-9 h-9 rounded-xl bg-[#1C433E] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-bold text-[#1C433E]">{step.title}</h3>
                  <p className="text-xs text-[#526363] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Who This Care Track Is For */}
        {condition.whoItIsFor && condition.whoItIsFor.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#1C433E]">
              Who Benefits Most from This Track
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {condition.whoItIsFor.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#286C6A]/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1C433E] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#415352]">{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Specialists for this condition */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
              Experienced Clinical Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] mt-1">
              Practicing Specialists for {condition.title}
            </h2>
            <p className="text-sm text-[#526363] mt-1">
              Our clinical psychologists hold verified postgraduate degrees and decades of combined
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displaySpecialists.map((spec) => (
              <div
                key={spec.id}
                className="bg-white rounded-2xl p-6 border border-[#286C6A]/10 shadow-xs flex flex-col justify-between space-y-4 group hover:border-[#1C433E]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={spec.image}
                    alt={spec.name}
                    loading="lazy"
                    decoding="async"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover border border-[#286C6A]/10 shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base text-[#1C433E] group-hover:text-[#14322e]">
                      {spec.name}
                    </h3>
                    <p className="text-xs text-[#526363]">{spec.title}</p>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EAF2ED] text-[#1C433E]">
                      {spec.yearsExperience} Years Clinical Experience
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#526363] leading-relaxed line-clamp-3">{spec.about}</p>

                <div className="pt-3 border-t border-[#286C6A]/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openSpecialistProfile(spec.id)}
                    className="text-xs font-semibold text-[#1C433E] hover:underline"
                  >
                    View Full Profile
                  </button>

                  <a
                    href={getWhatsAppLink(
                      `Hello Life Reset Pakistan, I would like to book a consultation with ${spec.name} for ${condition.title}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1C433E] hover:bg-[#14322e] rounded-lg transition-colors inline-block"
                  >
                    Book with {spec.name.split(',')[0].split(' ')[1] || spec.name.split(',')[0]}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Condition-Specific FAQs */}
        {condition.faqs && condition.faqs.length > 0 && (
          <section className="space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
                Common Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {condition.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#286C6A]/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1C433E] hover:text-[#14322e]"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-[#1C433E] shrink-0 transition-transform ${
                        activeFaq === idx ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#415352] leading-relaxed border-t border-neutral-100 bg-[#FAF9F5]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Crisis Guidance Card */}
        <section className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Important Mental Health Safety Notice</span>
          </div>
          <p className="leading-relaxed">
            Our outpatient practice offers scheduled clinical psychology appointments and is not an
            immediate emergency crisis line. If you or someone you know is in acute danger or
            experiencing suicidal thoughts in Pakistan, please call the{' '}
            <strong>Umang Mental Health Helpline (0311-7786264)</strong> or contact{' '}
            <strong>Rescue 1122</strong> immediately.
          </p>
        </section>

        {/* Embedded Booking Banner for this condition */}
        <section className="bg-[#1C433E] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#D8B878] uppercase tracking-wider">
              Take the First Step Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Begin Your Journey to Healing
            </h2>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
              You do not have to carry {condition.title.toLowerCase()} on your own. Speak with an
              experienced, compassionate clinical psychologist in a strictly confidential space.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <a
              href={getWhatsAppLink(`Hello Life Reset Pakistan, I would like to schedule a session for ${condition.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#1C433E] bg-[#D8B878] hover:bg-[#e2c78f] rounded-xl shadow-md transition-all active:scale-[0.98] inline-block"
            >
              SCHEDULE A SESSION FOR {condition.title.toUpperCase()}
            </a>

            <a
              href={getWhatsAppLink(`Inquiring about consultation for ${condition.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Reception</span>
            </a>
          </div>
        </section>

        {/* Explore Other Conditions Grid */}
        <section className="pt-8 border-t border-[#286C6A]/15 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-bold text-[#1C433E]">
              Explore Other Clinical Focus Areas
            </h2>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#1C433E] hover:underline"
            >
              View All 19 Conditions →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedConditions.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onSelectCondition(rel.slug)}
                className="p-3.5 rounded-xl bg-white border border-[#286C6A]/10 hover:border-[#1C433E] hover:bg-[#EAF2ED] text-left transition-all group"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A5C14] block">
                  {rel.category === 'common-concerns' ? 'Common' : 'Specialised'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#243333] group-hover:text-[#1C433E] line-clamp-1 mt-0.5 block">
                  {rel.title}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

export const ConditionRouteView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const condition = slug ? findCondition(slug) : undefined;

  if (!condition) {
    return <NotFoundPage />;
  }

  return (
    <ConditionPage
      condition={condition}
      onBack={() => {
        navigate('/');
        if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onSelectCondition={(nextSlug) => {
        navigate(`/condition/${nextSlug}`);
        if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    />
  );
};

export default ConditionRouteView;
