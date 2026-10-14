/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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

// Below-the-fold sections code-split to dramatically reduce initial JavaScript payload
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
import { Footer } from './components/Footer';

// Dedicated Condition & City Pages (Code-split for performance)
const ConditionPage = React.lazy(() =>
  import('./components/ConditionPage').then((m) => ({ default: m.ConditionPage }))
);
const CityPage = React.lazy(() =>
  import('./components/CityPage').then((m) => ({ default: m.CityPage }))
);

// Modals & Drawers (Code-split so they do not bloat initial bundle)
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

function AppContent() {
  const {
    activeConditionPage,
    closeConditionPage,
    openConditionPage,
    activeCityPage,
    closeCityPage,
    openCityPage,
  } = usePractice();

  React.useEffect(() => {
    let title = 'Life Reset Pakistan | Reset Your Life, Rebuild Your Future';
    let canonical = 'https://liferesetpakistan.com/';

    if (activeConditionPage) {
      title = `${activeConditionPage.title} | Life Reset Pakistan (Est. 1981)`;
      canonical = `https://liferesetpakistan.com/#condition-${activeConditionPage.id}`;
    } else if (activeCityPage) {
      title = `${activeCityPage.name} Online Counselling & Therapy | Life Reset Pakistan`;
      canonical = `https://liferesetpakistan.com/#city-${activeCityPage.id}`;
    }

    document.title = title;

    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', canonical);
    }
  }, [activeConditionPage, activeCityPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#243333] selection:bg-[#286C6A]/20 selection:text-[#243333]">
      {/* Section 8: Heritage Bar */}
      <HeritageBar />

      {/* Section 7: Sticky Header with Conditions Mega Menu */}
      <Header />

      {/* Main Body */}
      <main className="flex-1 pb-16 xl:pb-0">
        <React.Suspense fallback={null}>
          {activeConditionPage ? (
            <ConditionPage
              condition={activeConditionPage}
              onBack={closeConditionPage}
              onSelectCondition={openConditionPage}
            />
          ) : activeCityPage ? (
            <CityPage
              city={activeCityPage}
              onBack={closeCityPage}
              onSelectCity={openCityPage}
            />
          ) : (
            <>
              {/* Section 9 & 10: Hero Section with Microcopy */}
              <Hero />

              {/* Section 11: Trust Section (Established 1981, Professional Care, Confidential, Human) */}
              <TrustSection />

              {/* Section 12: You Are Not Alone Section (Soft Pale Sage #EAF2ED) */}
              <YouAreNotAloneSection />

              {/* Section 13: Conditions Section (19 specialized clinical tracks) */}
              <ConditionsSection />

              {/* Section 14: Services (10 real services) */}
              <ServicesSection />

              {/* Section 17: How Care Works (4 steps) */}
              <HowCareWorks />

              {/* Section 18: 1981 Timeline (Verified Milestones & Placeholders) */}
              <TimelineSection />

              {/* Section 19 & 20: About & Core Values (Four Decades of Experience) */}
              <AboutSection />

              {/* Section 21 & 38: Appointment Booking Section (GHL Pipeline Ready) */}
              <AppointmentSection />

              {/* Section 23: Transparent Pricing Guidance */}
              <PricingSection />

              {/* Section 25: Free Educational Screening Tools */}
              <EducationalToolsSection />

              {/* Section 24: Educational Resources Library */}
              <ResourcesSection />

              {/* Section 26: Testimonials (Verified Client / Anonymous Patient) */}
              <TestimonialsSection />

              {/* Section 27: Frequently Asked Questions (11 Accordions) */}
              <FAQSection />

              {/* Section 28: Clear Non-Alarmist Emergency Guidance */}
              <EmergencySection />

              {/* Section 40: Final Calm CTA ("You Don't Have to Have Everything Figured Out") */}
              <FinalCtaSection />
            </>
          )}
        </React.Suspense>
      </main>

      {/* Section 29: Footer ("Supporting Mental Wellbeing Since 1981.") */}
      <Footer />

      {/* Interactive Modals (Loaded on-demand via Suspense) */}
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

      {/* Section 22: Floating WhatsApp Control */}
      <WhatsAppFloatingButton />

      {/* Section 7 & 36: Mobile Sticky Bottom Bar (CALL, CONTACT, BOOK) */}
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
