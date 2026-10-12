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
import { PricingSection } from './components/PricingSection';
import { EducationalToolsSection } from './components/EducationalToolsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { EmergencySection } from './components/EmergencySection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';

// Dedicated Condition Page Component
import { ConditionPage } from './components/ConditionPage';
import { CityPage } from './components/CityPage';

// Modals & Drawers
import { AppointmentModal } from './components/AppointmentModal';
import { SpecialistProfileModal } from './components/SpecialistProfileModal';
import { ConditionDetailModal } from './components/ConditionDetailModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { EducationalToolModal } from './components/EducationalToolModal';
import { ArticleModal } from './components/ArticleModal';
import { LegalModal } from './components/LegalModal';
import { AdminDrawer } from './components/AdminDrawer';

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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#243333] selection:bg-[#286C6A]/20 selection:text-[#243333]">
      {/* Section 8: Heritage Bar */}
      <HeritageBar />

      {/* Section 7: Sticky Header with Conditions Mega Menu */}
      <Header />

      {/* Main Body */}
      <main className="flex-1 pb-16 xl:pb-0">
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
      </main>

      {/* Section 29: Footer ("Supporting Mental Wellbeing Since 1981.") */}
      <Footer />

      {/* Interactive Modals */}
      <AppointmentModal />
      <SpecialistProfileModal />
      <ConditionDetailModal />
      <ServiceDetailModal />
      <EducationalToolModal />
      <ArticleModal />
      <LegalModal />
      <AdminDrawer />

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
