/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from './lib/router';
import { PracticeProvider, usePractice } from './context/PracticeContext';
import { HeritageBar } from './components/HeritageBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import {
  DEFAULT_OG_IMAGE,
  HOME_ROUTE_META,
  SITE_URL,
  VERIFIED_ORGANIZATION,
  buildBreadcrumbSchema,
} from './data/seoMetadata';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MobileStickyBar } from './components/MobileStickyBar';

// Below-the-fold Homepage sections code-split to minimize initial JS & main-thread work
const YouAreNotAloneSection = React.lazy(() =>
  import('./components/YouAreNotAloneSection').then((m) => ({ default: m.YouAreNotAloneSection }))
);
const ConditionsSection = React.lazy(() =>
  import('./components/ConditionsSection').then((m) => ({ default: m.ConditionsSection }))
);
const ServicesSection = React.lazy(() =>
  import('./components/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const HowCareWorks = React.lazy(() =>
  import('./components/HowCareWorks').then((m) => ({ default: m.HowCareWorks }))
);
const TimelineSection = React.lazy(() =>
  import('./components/TimelineSection').then((m) => ({ default: m.TimelineSection }))
);
const AboutSection = React.lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const AppointmentSection = React.lazy(() =>
  import('./components/AppointmentSection').then((m) => ({ default: m.AppointmentSection }))
);
const PricingSection = React.lazy(() =>
  import('./components/PricingSection').then((m) => ({ default: m.PricingSection }))
);
const EducationalToolsSection = React.lazy(() =>
  import('./components/EducationalToolsSection').then((m) => ({ default: m.EducationalToolsSection }))
);
const ResourcesSection = React.lazy(() =>
  import('./components/ResourcesSection').then((m) => ({ default: m.ResourcesSection }))
);
const TestimonialsSection = React.lazy(() =>
  import('./components/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);
const FAQSection = React.lazy(() =>
  import('./components/FAQSection').then((m) => ({ default: m.FAQSection }))
);
const EmergencySection = React.lazy(() =>
  import('./components/EmergencySection').then((m) => ({ default: m.EmergencySection }))
);
const FinalCtaSection = React.lazy(() =>
  import('./components/FinalCtaSection').then((m) => ({ default: m.FinalCtaSection }))
);

// Inner Route Pages (Code-split & preloaded per route via build plugin so Homepage stays lean)
const ConditionRouteView = React.lazy(() =>
  import('./components/ConditionPage').then((m) => ({ default: m.ConditionRouteView }))
);
const CityRouteView = React.lazy(() =>
  import('./components/CityPage').then((m) => ({ default: m.CityRouteView }))
);
const PlansAndPricingPage = React.lazy(() =>
  import('./components/PlansAndPricingPage').then((m) => ({ default: m.PlansAndPricingPage }))
);
const BlogPage = React.lazy(() =>
  import('./components/BlogPage').then((m) => ({ default: m.BlogPage }))
);
const ArticlePage = React.lazy(() =>
  import('./components/ArticlePage').then((m) => ({ default: m.ArticlePage }))
);
const FAQPage = React.lazy(() =>
  import('./components/FAQPage').then((m) => ({ default: m.FAQPage }))
);
const NotFoundPage = React.lazy(() =>
  import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

// Interactive Modals & Admin Portal (Code-split & conditionally mounted only when opened)
const AppointmentModal = React.lazy(() =>
  import('./components/AppointmentModal').then((m) => ({ default: m.AppointmentModal }))
);
const SpecialistProfileModal = React.lazy(() =>
  import('./components/SpecialistProfileModal').then((m) => ({ default: m.SpecialistProfileModal }))
);
const ConditionDetailModal = React.lazy(() =>
  import('./components/ConditionDetailModal').then((m) => ({ default: m.ConditionDetailModal }))
);
const ServiceDetailModal = React.lazy(() =>
  import('./components/ServiceDetailModal').then((m) => ({ default: m.ServiceDetailModal }))
);
const EducationalToolModal = React.lazy(() =>
  import('./components/EducationalToolModal').then((m) => ({ default: m.EducationalToolModal }))
);
const ArticleModal = React.lazy(() =>
  import('./components/ArticleModal').then((m) => ({ default: m.ArticleModal }))
);
const LegalModal = React.lazy(() =>
  import('./components/LegalModal').then((m) => ({ default: m.LegalModal }))
);
const AdminPortal = React.lazy(() =>
  import('./components/AdminPortal').then((m) => ({ default: m.AdminPortal }))
);

/**
 * Scroll manager: handles route transitions and anchor scrolls without forced reflows on initial mount
 */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const rafId = window.requestAnimationFrame(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return () => window.cancelAnimationFrame(rafId);
    }
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return null;
}

/**
 * Home View: Landing page with lean above-the-fold Hero/Trust and lazy below-the-fold sections
 */
interface HomeViewProps {
  scrollTo?: string;
}

const SECTION_LABELS: Record<string, string> = {
  services: 'Services',
  about: 'About',
  'how-it-works': 'How It Works',
  timeline: 'Care Standards',
  tools: 'Self-Care Tools',
  emergency: 'Emergency Support',
  contact: 'Contact',
};

function HomeView({ scrollTo }: HomeViewProps) {
  useEffect(() => {
    if (!scrollTo) return;
    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [scrollTo]);

  const routeKey = scrollTo && HOME_ROUTE_META[scrollTo] ? scrollTo : 'home';
  const meta = HOME_ROUTE_META[routeKey];
  const isSectionRoute = Boolean(scrollTo && SECTION_LABELS[scrollTo]);

  const schemaGraph: Record<string, any>[] = [
    VERIFIED_ORGANIZATION,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Life Reset Pakistan',
      description: VERIFIED_ORGANIZATION.description,
      publisher: { '@id': VERIFIED_ORGANIZATION['@id'] },
      inLanguage: 'en-PK',
    },
    {
      '@type': 'WebPage',
      '@id': `${meta.canonicalUrl}#webpage`,
      url: meta.canonicalUrl,
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': VERIFIED_ORGANIZATION['@id'] },
      inLanguage: 'en-PK',
    },
  ];

  if (isSectionRoute && scrollTo) {
    schemaGraph.push(
      buildBreadcrumbSchema(meta.canonicalUrl, [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: SECTION_LABELS[scrollTo], url: meta.canonicalUrl },
      ])
    );
  }

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.description}
        canonicalUrl={meta.canonicalUrl}
        ogType="website"
        ogImage={DEFAULT_OG_IMAGE}
        schemaData={{
          '@context': 'https://schema.org',
          '@graph': schemaGraph,
        }}
      />

      {/* Above-the-fold Hero & Trust Section */}
      <Hero />
      <TrustSection />

      {/* Mid-page lazy sections */}
      <React.Suspense fallback={<div className="min-h-[600px] bg-[#EAF2ED]" aria-hidden="true" />}>
        <YouAreNotAloneSection />
        <ConditionsSection />
        <ServicesSection />
        <HowCareWorks />
        <TimelineSection />
        <AboutSection />
      </React.Suspense>

      {/* Lower-page lazy sections */}
      <React.Suspense fallback={<div className="min-h-[600px] bg-[#F8F7F2]" aria-hidden="true" />}>
        <AppointmentSection />
        <PricingSection />
        <EducationalToolsSection />
        <ResourcesSection />
        <TestimonialsSection />
        <FAQSection />
        <EmergencySection />
        <FinalCtaSection />
      </React.Suspense>
    </>
  );
}

const PageSuspenseFallback = <div className="min-h-screen bg-[#F8F7F2]" aria-hidden="true" />;

function RouteRedirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
}

function AppContent() {
  const { activeModal } = usePractice();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#243333] selection:bg-[#286C6A]/20 selection:text-[#243333]">
      {/* Accessibility: Skip to Main Content Link for screen readers & keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#1C433E] focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D8B878] font-semibold text-xs"
      >
        Skip to main content
      </a>

      {/* Auto Scroll Manager on navigation */}
      <ScrollManager />

      {/* Heritage Bar */}
      <HeritageBar />

      {/* Sticky Header with Clean Navigation */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 pb-16 xl:pb-0 outline-none">
        <React.Suspense fallback={PageSuspenseFallback}>
          <Routes>
            {/* Main Homepage */}
            <Route path="/" element={<HomeView />} />

            {/* Clean URLs for 18 Clinical Condition Pages + Permanent Redirect for Merged Page */}
            <Route
              path="/condition/female-psychologist-online"
              element={<RouteRedirect to="/condition/female-psychologist" />}
            />
            <Route path="/condition/:slug" element={<ConditionRouteView />} />

            {/* Clean URLs for 7 Regional City Pages */}
            <Route path="/city/:slug" element={<CityRouteView />} />

            {/* Dedicated Plans & Pricing Page (Clean URLs, no '#' required) */}
            <Route path="/plans-and-pricing" element={<PlansAndPricingPage />} />
            <Route path="/pricing" element={<RouteRedirect to="/plans-and-pricing" />} />
            <Route path="/plans-pricing" element={<PlansAndPricingPage />} />
            <Route path="/Plans & Pricing" element={<PlansAndPricingPage />} />
            <Route path="/plans & pricing" element={<PlansAndPricingPage />} />
            <Route path="/Plans-and-Pricing" element={<PlansAndPricingPage />} />

            {/* Dedicated Blog and Individual Article Pages (Clean URLs, no '#' required) */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/Blog" element={<BlogPage />} />
            <Route path="/articles" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />

            {/* Section Anchor Clean Routes */}
            <Route path="/services" element={<HomeView scrollTo="services" />} />
            <Route path="/about" element={<HomeView scrollTo="about" />} />
            <Route path="/how-it-works" element={<HomeView scrollTo="how-it-works" />} />
            <Route path="/timeline" element={<HomeView scrollTo="timeline" />} />
            <Route path="/resources" element={<BlogPage />} />

            {/* Dedicated FAQ Page (Clean URLs, no '#' required) */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/FAQs" element={<FAQPage />} />
            <Route path="/tools" element={<HomeView scrollTo="tools" />} />
            <Route path="/emergency" element={<HomeView scrollTo="emergency" />} />
            <Route path="/contact" element={<HomeView scrollTo="contact" />} />

            {/* 404 Catch-All Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Admin Portal (Loaded ONLY when actively opened) */}
      {activeModal && (
        <React.Suspense fallback={null}>
          {activeModal === 'appointment' && <AppointmentModal />}
          {activeModal === 'specialist' && <SpecialistProfileModal />}
          {activeModal === 'condition' && <ConditionDetailModal />}
          {activeModal === 'service' && <ServiceDetailModal />}
          {activeModal === 'tool' && <EducationalToolModal />}
          {activeModal === 'article' && <ArticleModal />}
          {activeModal === 'legal' && <LegalModal />}
          {activeModal === 'admin' && <AdminPortal />}
        </React.Suspense>
      )}

      {/* Floating WhatsApp Control */}
      <WhatsAppFloatingButton />

      {/* Mobile Sticky Bottom Bar (CALL, CONTACT, BOOK) */}
      <MobileStickyBar />
    </div>
  );
}

export default function App() {
  return (
    <PracticeProvider>
      <AppContent />
    </PracticeProvider>
  );
}
