import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PracticeSettings,
  Specialist,
  ServiceDetail,
  ConditionItem,
  EducationalTool,
  ResourceArticle,
  AppointmentInquiry,
} from '../types';
import {
  DEFAULT_SETTINGS,
  SPECIALISTS,
  SERVICES,
  EDUCATIONAL_TOOLS,
  ARTICLES,
  TESTIMONIALS,
  TIMELINE_MILESTONES,
  CORE_VALUES,
} from '../data/practiceData';
import type { CityInfo } from '../data/citiesData';
// Note: findCondition, findCity, and saveAppointmentToSupabase are dynamically imported on demand to keep initial bundle lean

interface PracticeContextType {
  settings: PracticeSettings;
  updateSettings: (newSettings: Partial<PracticeSettings>) => void;
  resetSettings: () => void;

  // Active Interactive Views
  activeModal: 'appointment' | 'service' | 'specialist' | 'condition' | 'tool' | 'article' | 'legal' | 'admin' | null;
  selectedService: ServiceDetail | null;
  selectedSpecialist: Specialist | null;
  selectedCondition: ConditionItem | null;
  selectedTool: EducationalTool | null;
  selectedArticle: ResourceArticle | null;
  selectedLegalTab: 'privacy' | 'terms' | 'disclaimer' | 'accessibility' | 'editorial';

  // Dedicated Condition Page
  activeConditionPage: ConditionItem | null;
  openConditionPage: (conditionIdOrSlug: string) => void;
  closeConditionPage: () => void;

  // Dedicated City Page
  activeCityPage: CityInfo | null;
  openCityPage: (cityIdOrSlug: string) => void;
  closeCityPage: () => void;

  // Navigation Handlers
  openAppointment: (prefillReason?: string, specialistId?: string, plan?: string) => void;
  openServiceDetail: (serviceId: string) => void;
  openSpecialistProfile: (specialistId: string) => void;
  openConditionDetail: (conditionId: string) => void;
  openEducationalTool: (toolId: string) => void;
  openArticle: (articleId: string) => void;
  openLegal: (tab: 'privacy' | 'terms' | 'disclaimer' | 'accessibility' | 'editorial') => void;
  openAdmin: () => void;
  closeModal: () => void;

  // Prefilled states for appointment flow
  prefillReason: string;
  prefillSpecialistId: string;
  selectedPlan: string | null;
  setSelectedPlan: (plan: string | null) => void;

  // Appointment Submission (GHL Ready)
  submitAppointment: (inquiry: Omit<AppointmentInquiry, 'timestamp' | 'ghlPipelineStage' | 'ghlTags'>) => {
    success: boolean;
    whatsappUrl: string;
    payload: AppointmentInquiry;
  };

  getWhatsAppLink: (message?: string) => string;
  getPhoneCallLink: () => string;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

export const PracticeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PracticeSettings>(() => {
    try {
      const saved = localStorage.getItem('inst_1981_practice_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.organizationName || parsed.organizationName !== 'Life Reset Pakistan') {
          parsed.organizationName = 'Life Reset Pakistan';
        }
        if (!parsed.email || !parsed.email.includes('liferesetpakistan.com')) {
          parsed.email = 'care@liferesetpakistan.com';
        }
        if (
          !parsed.phoneNumber ||
          parsed.phoneNumber.includes('3575') ||
          parsed.phoneNumber.includes('3143162051') ||
          parsed.phoneNumber.includes('3003162051') ||
          parsed.phoneNumber === '+924235751981' ||
          parsed.phoneNumber === '+923143162051' ||
          parsed.phoneNumber === '+923003162051'
        ) {
          parsed.phoneDisplay = '+92300 0000000';
          parsed.phoneNumber = '+923000000000';
        }
        if (
          !parsed.whatsappNumber ||
          parsed.whatsappNumber.includes('1231981') ||
          parsed.whatsappNumber.includes('3143162051') ||
          parsed.whatsappNumber.includes('3003162051') ||
          parsed.whatsappNumber === '923001231981' ||
          parsed.whatsappNumber === '923143162051' ||
          parsed.whatsappNumber === '923003162051'
        ) {
          parsed.whatsappDisplayNumber = '+92300 0000000';
          parsed.whatsappNumber = '923000000000';
        }
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [activeModal, setActiveModal] = useState<PracticeContextType['activeModal']>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<ConditionItem | null>(null);
  const [activeConditionPage, setActiveConditionPage] = useState<ConditionItem | null>(null);
  const [activeCityPage, setActiveCityPage] = useState<CityInfo | null>(null);
  const [selectedTool, setSelectedTool] = useState<EducationalTool | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);
  const [selectedLegalTab, setSelectedLegalTab] = useState<'privacy' | 'terms' | 'disclaimer' | 'accessibility' | 'editorial'>('disclaimer');

  const [prefillReason, setPrefillReason] = useState<string>('');
  const [prefillSpecialistId, setPrefillSpecialistId] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Handle URL hash changes for direct condition deep links e.g. #/condition/anxiety-counselling or #/city/lahore
  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/condition/')) {
        const slug = hash.replace('#/condition/', '');
        const { findCondition } = await import('../data/conditionsData');
        const cond = findCondition(slug);
        if (cond) {
          setActiveConditionPage(cond);
          setSelectedCondition(cond);
          setActiveCityPage(null);
        }
      } else if (hash.startsWith('#/city/')) {
        const slug = hash.replace('#/city/', '');
        const { findCity } = await import('../data/citiesData');
        const city = findCity(slug);
        if (city) {
          setActiveCityPage(city);
          setActiveConditionPage(null);
        }
      } else if (hash === '' || hash === '#home') {
        setActiveConditionPage(null);
        setActiveCityPage(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('inst_1981_practice_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not save settings to localStorage', e);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<PracticeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('inst_1981_practice_settings');
  };

  const openAppointment = (reason?: string, specialistId?: string, plan?: string) => {
    if (reason) setPrefillReason(reason);
    if (specialistId) setPrefillSpecialistId(specialistId);
    if (plan) setSelectedPlan(plan);
    else if (reason && reason.includes('Rs.')) setSelectedPlan(reason);
    setActiveModal('appointment');
  };

  const openServiceDetail = (serviceId: string) => {
    const s = SERVICES.find((item) => item.id === serviceId || item.slug === serviceId);
    if (s) {
      setSelectedService(s);
      setActiveModal('service');
    }
  };

  const openSpecialistProfile = (specialistId: string) => {
    const spec = SPECIALISTS.find((item) => item.id === specialistId);
    if (spec) {
      setSelectedSpecialist(spec);
      setActiveModal('specialist');
    }
  };

  const openConditionPage = async (conditionIdOrSlug: string) => {
    const { findCondition } = await import('../data/conditionsData');
    const c = findCondition(conditionIdOrSlug);
    if (c) {
      setActiveConditionPage(c);
      setSelectedCondition(c);
      window.location.hash = `#/condition/${c.slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeConditionPage = () => {
    setActiveConditionPage(null);
    if (window.location.hash.startsWith('#/condition/')) {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCityPage = async (cityIdOrSlug: string) => {
    const { findCity } = await import('../data/citiesData');
    const c = findCity(cityIdOrSlug);
    if (c) {
      setActiveCityPage(c);
      setActiveConditionPage(null);
      window.location.hash = `#/city/${c.slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeCityPage = () => {
    setActiveCityPage(null);
    if (window.location.hash.startsWith('#/city/')) {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openConditionDetail = async (conditionId: string) => {
    const { findCondition } = await import('../data/conditionsData');
    const c = findCondition(conditionId);
    if (c) {
      setSelectedCondition(c);
      setActiveConditionPage(c);
      window.location.hash = `#/condition/${c.slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openEducationalTool = (toolId: string) => {
    const t = EDUCATIONAL_TOOLS.find((item) => item.id === toolId);
    if (t) {
      setSelectedTool(t);
      setActiveModal('tool');
    }
  };

  const openArticle = (articleId: string) => {
    const art = ARTICLES.find((item) => item.id === articleId || item.slug === articleId);
    if (art) {
      setSelectedArticle(art);
      setActiveModal('article');
    }
  };

  const openLegal = (tab: 'privacy' | 'terms' | 'disclaimer' | 'accessibility' | 'editorial') => {
    setSelectedLegalTab(tab);
    setActiveModal('legal');
  };

  const openAdmin = () => {
    setActiveModal('admin');
  };

  // Global keyboard listener for Escape key to close any modal or active overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeModal) {
          closeModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedCondition(null);
    setSelectedService(null);
    setSelectedSpecialist(null);
    setSelectedTool(null);
    setSelectedArticle(null);
    setSelectedPlan(null);
  };

  const getWhatsAppLink = (message?: string) => {
    const defaultMsg =
      `Hello, I would like to inquire about booking a confidential consultation with ${settings.organizationName} (Est. 1981).`;
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/${settings.whatsappNumber}?text=${text}`;
  };

  const getPhoneCallLink = () => {
    return `tel:${settings.phoneNumber}`;
  };

  const submitAppointment = (inquiry: Omit<AppointmentInquiry, 'timestamp' | 'ghlPipelineStage' | 'ghlTags'>) => {
    // Generate GHL tags matching Section 38 requirements
    const sanitizedReason = inquiry.reasonForContact.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const typeTag = `type-${inquiry.preferredAppointmentType.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const ghlTags = [
      `concern-${sanitizedReason}`,
      typeTag,
      'source-website-appointment-request',
      'est-1981-intake',
    ];

    const submission: AppointmentInquiry = {
      ...inquiry,
      timestamp: new Date().toISOString(),
      ghlPipelineStage: 'NEW INQUIRY',
      ghlTags,
    };

    // Store inquiry locally for clinic intake review
    try {
      const existing = JSON.parse(localStorage.getItem('inst_1981_inquiries') || '[]');
      existing.unshift(submission);
      localStorage.setItem('inst_1981_inquiries', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {
      console.warn('Could not save inquiry locally', e);
    }

    // Save appointment inquiry to Supabase backend asynchronously
    import('../lib/supabase')
      .then(({ saveAppointmentToSupabase }) => saveAppointmentToSupabase(inquiry))
      .then((res) => {
        if (res.success) {
          console.log(`[Supabase] Success: saved inquiry to table '${res.table}'`);
        } else {
          console.warn('[Supabase] Sync status:', res.message);
        }
      })
      .catch((err) => {
        console.warn('[Supabase] Connection error:', err);
      });

    // Dispatch webhook to GoHighLevel endpoint if configured
    if (settings.ghlWebhookUrl) {
      fetch(settings.ghlWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pipeline: 'NEW INQUIRY',
          contact: submission,
        }),
      }).catch((err) => console.log('GHL webhook simulated:', err));
    }

    const details = [
      `Hello, my name is ${inquiry.fullName}.`,
      `I have submitted an appointment request for ${settings.organizationName}.`,
      inquiry.selectedPlan ? `• Selected Plan: ${inquiry.selectedPlan}` : null,
      `• Reason for contact: ${inquiry.reasonForContact}`,
      `• Preferred format: ${inquiry.preferredAppointmentType}`,
      inquiry.preferredLanguage ? `• Preferred language: ${inquiry.preferredLanguage}` : null,
      inquiry.preferredDate ? `• Preferred timing: ${inquiry.preferredDate}` : null,
      `• Contact method: ${inquiry.preferredContactMethod}`,
      `Please let me know the next available appointment.`
    ].filter(Boolean).join('\n');
    const waText = encodeURIComponent(details);
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${waText}`;

    return {
      success: true,
      whatsappUrl,
      payload: submission,
    };
  };

  return (
    <PracticeContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        activeModal,
        selectedService,
        selectedSpecialist,
        selectedCondition,
        activeConditionPage,
        openConditionPage,
        closeConditionPage,
        activeCityPage,
        openCityPage,
        closeCityPage,
        selectedTool,
        selectedArticle,
        selectedLegalTab,
        openAppointment,
        openServiceDetail,
        openSpecialistProfile,
        openConditionDetail,
        openEducationalTool,
        openArticle,
        openLegal,
        openAdmin,
        closeModal,
        prefillReason,
        prefillSpecialistId,
        selectedPlan,
        setSelectedPlan,
        submitAppointment,
        getWhatsAppLink,
        getPhoneCallLink,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
};
