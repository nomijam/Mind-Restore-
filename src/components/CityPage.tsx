import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  X,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Shield,
  Video,
  ChevronRight,
} from 'lucide-react';
import { CityInfo, CITIES_DATA, findCity } from '../data/citiesData';
import { usePractice } from '../context/PracticeContext';
import { SPECIALISTS } from '../data/practiceData';
import { getCityHeroImage } from '../data/heroImagesData';
import { MindRestoreEmblem } from './MindRestoreLogo';
import { SEOHead } from './SEOHead';
import {
  CITY_META_BY_SLUG,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  VERIFIED_ORGANIZATION,
  buildBreadcrumbSchema,
  sanitizeSchemaText,
} from '../data/seoMetadata';
import { useNavigate, useParams } from '../lib/router';
import { NotFoundPage } from './NotFoundPage';

interface CityPageProps {
  city: CityInfo;
  onBack: () => void;
  onSelectCity: (slug: string) => void;
}

export const CityPage: React.FC<CityPageProps> = ({ city, onBack, onSelectCity }) => {
  const { settings, getWhatsAppLink, getPhoneCallLink, openSpecialistProfile } =
    usePractice();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [city]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const specialists = SPECIALISTS.filter((spec) =>
    city.availableSpecialistIds.includes(spec.id)
  );

  const otherCities = CITIES_DATA.filter((c) => c.id !== city.id);

  // High-resolution location-specific landmark image for this city
  const heroImage = getCityHeroImage(city.slug || city.id);

  const cityMeta = CITY_META_BY_SLUG[city.slug] || {
    title: `Online Counselling in ${city.name} | Life Reset Pakistan`,
    description: sanitizeSchemaText(city.description).slice(0, 160),
  };
  const canonicalUrl = `${SITE_URL}/city/${city.slug}`;
  const ogImage = heroImage?.src ? `${SITE_URL}${heroImage.src}` : DEFAULT_OG_IMAGE;

  return (
    <article className="min-h-screen bg-[#F8F7F2] text-[#243333] pb-24 text-left">
      <SEOHead
        title={cityMeta.title}
        description={cityMeta.description}
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
              name: cityMeta.title,
              description: cityMeta.description,
              about: { '@id': `${canonicalUrl}#service` },
              publisher: { '@id': VERIFIED_ORGANIZATION['@id'] },
              inLanguage: 'en-PK',
            },
            {
              '@type': 'Service',
              '@id': `${canonicalUrl}#service`,
              name: `Life Reset Pakistan - ${city.name} Online Counselling`,
              description: cityMeta.description,
              url: canonicalUrl,
              provider: { '@id': VERIFIED_ORGANIZATION['@id'] },
              areaServed: {
                '@type': city.slug === 'overseas-worldwide' ? 'Place' : 'City',
                name: city.name,
              },
            },
            buildBreadcrumbSchema(canonicalUrl, [
              { name: 'Home', url: `${SITE_URL}/` },
              { name: city.name, url: canonicalUrl },
            ]),
            ...(city.faqs && city.faqs.length > 0
              ? [
                  {
                    '@type': 'FAQPage',
                    '@id': `${canonicalUrl}#faq`,
                    mainEntity: city.faqs.map((f) => ({
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

      {/* Top Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-[#1C433E]/10 sticky top-20 z-30 px-4 sm:px-6 lg:px-8 py-3.5 shadow-2xs backdrop-blur-md bg-white/95"
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
            <span className="text-[#526363] shrink-0">Cities</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-[#1C433E] truncate">{city.name}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF2ED] text-[#1C433E] border border-[#1C433E]/15">
              {city.serviceType}
            </span>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C433E]/10 hover:bg-[#1C433E] text-[#1C433E] hover:text-white font-semibold transition-all text-xs cursor-pointer shadow-2xs"
              aria-label="Close city page"
              title="Close and return to home"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner Section with Location Landmark Image & Subtle Dark Gradient Overlay */}
      <section className="relative overflow-hidden border-b border-[#1C433E]/20 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-white min-h-[460px] flex items-center">
        {/* Background Landmark Image with Progressive Optimization */}
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
          {/* Subtle Dark Gradient Overlay: Deep Pine (#112A27) with high readability across mobile & desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#112A27]/95 via-[#112A27]/90 to-[#112A27]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112A27] via-transparent to-black/35" />
        </div>

        {/* Foreground Content with High Contrast Typography */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 text-left w-full">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1C433E]/90 text-white border border-white/20 shadow-xs backdrop-blur-xs">
              <MindRestoreEmblem className="w-3.5 h-3.5" />
              <span>Life Reset Pakistan (Est. 1981)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#112A27]/85 text-[#D8B878] border border-[#D8B878]/35 shadow-xs backdrop-blur-xs">
              <MapPin className="w-3 h-3 text-[#D8B878]" />
              <span>{city.badge}</span>
            </span>
            {/* Landmark Heritage Badge */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-black/45 text-neutral-200 border border-white/10 backdrop-blur-xs">
              <span>📍 {heroImage.landmark}</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-[1.2] drop-shadow-xs">
              {city.headline}
            </h1>
            <p className="text-base sm:text-lg text-[#E2ECE7] font-normal leading-relaxed max-w-3xl drop-shadow-xs">
              {city.subheadline}
            </p>
          </div>

          {/* Key Facts Grid with Frosted Glass Legibility */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-[#112A27]/75 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D1E2DA] block">
                Coverage
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                {city.name} & Nationwide
              </span>
            </div>
            <div className="bg-[#112A27]/75 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D1E2DA] block">
                Session Mode
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                {city.serviceType.split('&')[0]}
              </span>
            </div>
            <div className="bg-[#112A27]/75 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D1E2DA] block">
                Languages
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                {city.languages.join(', ')}
              </span>
            </div>
            <div className="bg-[#112A27]/75 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D1E2DA] block">
                Confidentiality
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                100% Medical Privacy
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppLink(
                `Hello Life Reset Pakistan, I would like to book a confidential consultation from ${city.name} (Est. ${settings.foundedYear || 1981}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#112A27] bg-[#D8B878] hover:bg-[#e0c489] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#112A27]" />
              <span>BOOK APPOINTMENT FOR {city.name.toUpperCase()}</span>
            </a>

            <a
              href={getWhatsAppLink(
                `Hello Life Reset Pakistan, I would like to inquire about booking a confidential consultation from ${city.name}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#1C433E]/90 hover:bg-[#1C433E] border border-white/20 backdrop-blur-xs rounded-xl shadow-2xs hover:border-white transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WHATSAPP RECEPTION</span>
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

      {/* Main Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* City Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E]">
            How We Support Clients in {city.name}
          </h2>
          <p className="text-base text-[#415352] leading-[1.75]">{city.description}</p>

          <div className="bg-white p-6 rounded-2xl border border-[#1C433E]/15 mt-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A5C14] block">
              Local Dynamics & Lifestyle Reality
            </span>
            <p className="text-sm text-[#415352] leading-relaxed">{city.localContext}</p>
          </div>
        </section>

        {/* Formats & Payment Methods */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#1C433E]/10 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-[#1C433E] flex items-center gap-2">
              <Video className="w-4 h-4 text-[#1C433E]" />
              <span>Available Session Formats</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#415352]">
              {city.sessionFormats.map((fmt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1C433E] shrink-0 mt-0.5" />
                  <span>{fmt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#1C433E]/10 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-[#1C433E] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1C433E]" />
              <span>Convenient & Secure Payment Options</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#415352]">
              {city.paymentOptions.map((opt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1C433E] shrink-0 mt-0.5" />
                  <span>{opt}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Practicing Clinical Specialists */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
              Our Clinical Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1C433E] mt-1">
              Specialists Available for {city.name}
            </h2>
            <p className="text-sm text-[#526363] mt-1">
              Consult with senior licensed clinical psychologists combining decades of experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {specialists.map((spec) => (
              <div
                key={spec.id}
                className="bg-white rounded-2xl p-5 border border-[#1C433E]/10 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={spec.image}
                    alt={spec.name}
                    loading="lazy"
                    decoding="async"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-xl object-cover border border-[#1C433E]/15 shrink-0"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#1C433E]">{spec.name}</h3>
                    <p className="text-[11px] text-[#526363]">{spec.title}</p>
                    <span className="text-[10px] text-[#286C6A] font-semibold">
                      {spec.yearsExperience} Yrs Exp.
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => openSpecialistProfile(spec.id)}
                    className="text-xs font-semibold text-[#1C433E] hover:underline"
                  >
                    Profile
                  </button>
                  <a
                    href={getWhatsAppLink(`Hello Life Reset Pakistan, I would like to book a consultation with ${spec.name} from ${city.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-xs font-semibold text-white bg-[#1C433E] hover:bg-[#14322e] rounded-lg transition-colors inline-block"
                  >
                    Book Consult
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        {city.faqs && city.faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#1C433E]">
              Frequently Asked Questions in {city.name}
            </h2>
            <div className="space-y-2.5">
              {city.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#1C433E]/10 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#1C433E]"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-[#1C433E] shrink-0 transition-transform ${
                        activeFaq === idx ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#415352] leading-relaxed border-t border-neutral-100 bg-[#FAF9F5]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Explore Other Cities */}
        <section className="pt-8 border-t border-[#1C433E]/15 space-y-4">
          <h2 className="text-base font-heading font-bold text-[#1C433E]">
            Looking for Services in Other Cities?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {otherCities.map((oc) => (
              <button
                key={oc.id}
                onClick={() => onSelectCity(oc.slug)}
                className="p-3 rounded-xl bg-white border border-[#1C433E]/10 hover:border-[#1C433E] hover:bg-[#EAF2ED] text-left transition-colors"
              >
                <span className="text-xs font-bold text-[#1C433E] block">{oc.name}</span>
                <span className="text-[10px] text-[#526363] block truncate">{oc.serviceType}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

export const CityRouteView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const city = slug ? findCity(slug) : undefined;

  if (!city) {
    return <NotFoundPage />;
  }

  return (
    <CityPage
      city={city}
      onBack={() => {
        navigate('/');
        if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onSelectCity={(nextSlug) => {
        navigate(`/city/${nextSlug}`);
        if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    />
  );
};

export default CityRouteView;
