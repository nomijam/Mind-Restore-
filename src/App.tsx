/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { PracticeProvider, usePractice } from './context/PracticeContext';
import { HeritageBar } from './components/HeritageBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { YouAreNotAloneSection } from './components/YouAreNotAloneSection';
import { ConditionsSection } from './components/ConditionsSection';
import { ServicesSection } from './components/ServicesSection';
import { HowCareWorks } from './components/HowCareWorks';
import { TimelineSection } from './components/TimelineSection';
import { AboutSection } from './components/AboutSection';
import { AppointmentSection } from './components/AppointmentSection';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { NotFoundPage } from './components/NotFoundPage';
import { findCondition } from './data/conditionsData';
import { findCity } from './data/citiesData';

// Below-the-fold sections code-split for performance
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

// Dedicated Condition, City, and Plans & Pricing Pages (Code-split)
const ConditionPage = React.lazy(() =>
  import('./components/ConditionPage').then((m) => ({ default: m.ConditionPage }))
);
const CityPage = React.lazy(() =>
  import('./components/CityPage').then((m) => ({ default: m.CityPage }))
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

// Modals & Drawers (Code-split)
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

// Floating & Mobile Controls
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MobileStickyBar } from './components/MobileStickyBar';

/**
 * Scroll manager: handles route transitions and anchor scrolls
 */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }
    }
    // Only scroll to top if there's no hash
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return null;
}

/**
 * Home View: Landing page with all clinical sections and below-the-fold content
 */
interface HomeViewProps {
  scrollTo?: string;
}

function HomeView({ scrollTo }: HomeViewProps) {
  useEffect(() => {
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 120);
      }
    }
  }, [scrollTo]);

  return (
    <>
      <SEOHead
        title="Life Reset Pakistan | Reset Your Life, Rebuild Your Future"
        description="Life Reset Pakistan: Professional, confidential and accessible online psychological support for individuals, couples and families in Pakistan and worldwide (Est. 1981)."
        canonicalUrl="https://liferesetpakistan.com/"
      />

      {/* Hero Section with Microcopy */}
      <Hero />

      {/* Trust Section (Established 1981, Professional Care, Confidential, Human) */}
      <TrustSection />

      {/* You Are Not Alone Section (Soft Pale Sage) */}
      <YouAreNotAloneSection />

      {/* Conditions Section (19 specialized clinical tracks) */}
      <ConditionsSection />

      {/* Services (10 real services) */}
      <ServicesSection />

      {/* How Care Works (4 steps) */}
      <HowCareWorks />

      {/* 1981 Timeline */}
      <TimelineSection />

      {/* About & Core Values */}
      <AboutSection />

      {/* Appointment Booking Section */}
      <AppointmentSection />

      {/* Below-the-fold lazy sections */}
      <React.Suspense fallback={<div className="min-h-[400px] bg-[#F8F7F2]" aria-hidden="true" />}>
        {/* Transparent Pricing Guidance */}
        <PricingSection />

        {/* Free Educational Screening Tools */}
        <EducationalToolsSection />

        {/* Educational Resources Library */}
        <ResourcesSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Clear Emergency Guidance */}
        <EmergencySection />

        {/* Final Calm CTA */}
        <FinalCtaSection />
      </React.Suspense>
    </>
  );
}

/**
 * Condition Page View (Clean URL /condition/:slug)
 */
function ConditionView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const condition = slug ? findCondition(slug) : undefined;

  if (!condition) {
    return <NotFoundPage />;
  }

  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
      <ConditionPage
        condition={condition}
        onBack={() => {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCondition={(nextSlug) => {
          navigate(`/condition/${nextSlug}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </React.Suspense>
  );
}

/**
 * City Page View (Clean URL /city/:slug)
 */
function CityView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const city = slug ? findCity(slug) : undefined;

  if (!city) {
    return <NotFoundPage />;
  }

  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
      <CityPage
        city={city}
        onBack={() => {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCity={(nextSlug) => {
          navigate(`/city/${nextSlug}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </React.Suspense>
  );
}

function AppContent() {
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
        <Routes>
          {/* Main Homepage */}
          <Route path="/" element={<HomeView />} />

          {/* Clean URLs for 19 Clinical Condition Pages */}
          <Route path="/condition/:slug" element={<ConditionView />} />

          {/* Clean URLs for 7 Regional City Pages */}
          <Route path="/city/:slug" element={<CityView />} />

          {/* Dedicated Plans & Pricing Page (Clean URLs, no '#' required) */}
          <Route
            path="/plans-and-pricing"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <PlansAndPricingPage />
              </React.Suspense>
            }
          />
          <Route
            path="/pricing"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <PlansAndPricingPage />
              </React.Suspense>
            }
          />
          <Route
            path="/plans-pricing"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <PlansAndPricingPage />
              </React.Suspense>
            }
          />
          <Route
            path="/Plans & Pricing"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <PlansAndPricingPage />
              </React.Suspense>
            }
          />
          <Route
            path="/plans & pricing"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <PlansAndPricingPage />
              </React.Suspense>
            }
          />
          <Route
            path="/Plans-and-Pricing"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <PlansAndPricingPage />
              </React.Suspense>
            }
          />
          {/* Dedicated Blog and Individual Article Pages (Clean URLs, no '#' required) */}
          <Route
            path="/blog"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <BlogPage />
              </React.Suspense>
            }
          />
          <Route
            path="/Blog"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <BlogPage />
              </React.Suspense>
            }
          />
          <Route
            path="/articles"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <BlogPage />
              </React.Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <ArticlePage />
              </React.Suspense>
            }
          />
          <Route
            path="/article/:slug"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <ArticlePage />
              </React.Suspense>
            }
          />
          <Route path="/services" element={<HomeView scrollTo="services" />} />
          <Route path="/about" element={<HomeView scrollTo="about" />} />
          <Route path="/how-it-works" element={<HomeView scrollTo="how-it-works" />} />
          <Route path="/timeline" element={<HomeView scrollTo="timeline" />} />
          <Route
            path="/resources"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <BlogPage />
              </React.Suspense>
            }
          />
          {/* Dedicated FAQ Page (Clean URLs, no '#' required) */}
          <Route
            path="/faq"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <FAQPage />
              </React.Suspense>
            }
          />
          <Route
            path="/FAQ"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <FAQPage />
              </React.Suspense>
            }
          />
          <Route
            path="/faqs"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <FAQPage />
              </React.Suspense>
            }
          />
          <Route
            path="/FAQs"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#F8F7F2]" />}>
                <FAQPage />
              </React.Suspense>
            }
          />
          <Route path="/tools" element={<HomeView scrollTo="tools" />} />
          <Route path="/emergency" element={<HomeView scrollTo="emergency" />} />
          <Route path="/contact" element={<HomeView scrollTo="contact" />} />

          {/* 404 Catch-All Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <React.Suspense fallback={null}>
        <AppointmentModal />
        <SpecialistProfileModal />
        <ConditionDetailModal />
        <ServiceDetailModal />
        <EducationalToolModal />
        <ArticleModal />
        <LegalModal />
        <AdminPortal />
      </React.Suspense>

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
