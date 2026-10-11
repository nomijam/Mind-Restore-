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
  CONDITIONS,
  EDUCATIONAL_TOOLS,
  ARTICLES,
  TESTIMONIALS,
  TIMELINE_MILESTONES,
  CORE_VALUES,
} from '../data/practiceData';
import { findCondition } from '../data/conditionsData';
import { findCity, CityInfo } from '../data/citiesData';

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
  openAppointment: (prefillReason?: string, specialistId?: string) => void;
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
        if (
          !parsed.organizationName ||
          parsed.organizationName === 'Institute of Psychological Care' ||
          parsed.organizationName.includes('Sukoon')
        ) {
          parsed.organizationName = 'Mind Restore';
        }
        if (parsed.email === 'care@psychologicalcare.org.pk') {
          parsed.email = 'care@mindrestore.pk';
        }
        if (
          !parsed.phoneNumber ||
          parsed.phoneNumber.includes('3575') ||
          parsed.phoneNumber.includes('3003162051') ||
          parsed.phoneNumber === '+924235751981' ||
          parsed.phoneNumber === '+923003162051'
        ) {
          parsed.phoneDisplay = '+92 314 3162051';
          parsed.phoneNumber = '+923143162051';
        }
        if (
          !parsed.whatsappNumber ||
          parsed.whatsappNumber.includes('1231981') ||
          parsed.whatsappNumber.includes('3003162051') ||
          parsed.whatsappNumber === '923001231981' ||
          parsed.whatsappNumber === '923003162051'
        ) {
          parsed.whatsappDisplayNumber = '+92 314 3162051';
          parsed.whatsappNumber = '923143162051';
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

  // Handle URL hash changes for direct condition deep links e.g. #/condition/anxiety-counselling or #/city/lahore
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/condition/')) {
        const slug = hash.replace('#/condition/', '');
        const cond = findCondition(slug);
        if (cond) {
          setActiveConditionPage(cond);
          setSelectedCondition(cond);
          setActiveCityPage(null);
        }
      } else if (hash.startsWith('#/city/')) {
        const slug = hash.replace('#/city/', '');
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

  const openAppointment = (reason?: string, specialistId?: string) => {
    if (reason) setPrefillReason(reason);
    if (specialistId) setPrefillSpecialistId(specialistId);
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

  const openConditionPage = (conditionIdOrSlug: string) => {
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

  const openCityPage = (cityIdOrSlug: string) => {
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

  const openConditionDetail = (conditionId: string) => {
    const c = findCondition(conditionId);
    if (c) {
      // Direct full-page navigation as requested: "I need every page for every different page for every condition"
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

    const waText = encodeURIComponent(
      `Hello, my name is ${inquiry.fullName}.\n` +
      `I have submitted an appointment request for ${settings.organizationName}.\n` +
      `• Reason for contact: ${inquiry.reasonForContact}\n` +
      `• Preferred format: ${inquiry.preferredAppointmentType}\n` +
      `• Contact method: ${inquiry.preferredContactMethod}\n` +
      `Please let me know the next available appointment.`
    );
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
