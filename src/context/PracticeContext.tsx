import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  PracticeSettings,
  Specialist,
  ServiceDetail,
  ConditionItem,
  EducationalTool,
  ResourceArticle,
  AppointmentInquiry,
} from '../types';
import { DEFAULT_SETTINGS } from '../data/settingsData';
import { HEADER_CONDITIONS, HEADER_CITIES } from '../data/headerNavData';
import { useNavigate, useLocation } from '../lib/router';

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

  // Dedicated Condition & City route indicators
  activeConditionPage: { slug: string; title: string } | null;
  openConditionPage: (conditionIdOrSlug: string) => void;
  closeConditionPage: () => void;

  activeCityPage: { slug: string; name: string } | null;
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

const SPECIALIST_NAMES: Record<string, string> = {
  'dr-farah-kamran': 'Dr. Farah Kamran, Ph.D.',
  'dr-tariq-mahmood': 'Dr. Tariq Mahmood, Ph.D.',
  'ms-ayesha-siddiqui': 'Ms. Ayesha Siddiqui, M.Phil',
};

export const PracticeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hasInitializedSettings = useRef(false);
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
          parsed.phoneNumber.includes('3000000000') ||
          parsed.phoneNumber === '+924235751981' ||
          parsed.phoneNumber === '+923143162051' ||
          parsed.phoneNumber === '+923003162051' ||
          parsed.phoneNumber === '+923000000000'
        ) {
          parsed.phoneDisplay = '+92 326 8791594';
          parsed.phoneNumber = '+923268791594';
        }
        if (
          !parsed.whatsappNumber ||
          parsed.whatsappNumber.includes('1231981') ||
          parsed.whatsappNumber.includes('3143162051') ||
          parsed.whatsappNumber.includes('3003162051') ||
          parsed.whatsappNumber.includes('3000000000') ||
          parsed.whatsappNumber === '923001231981' ||
          parsed.whatsappNumber === '923143162051' ||
          parsed.whatsappNumber === '923003162051' ||
          parsed.whatsappNumber === '923000000000'
        ) {
          parsed.whatsappDisplayNumber = '+92 326 8791594';
          parsed.whatsappNumber = '923268791594';
        }
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [activeModal, setActiveModal] = useState<PracticeContextType['activeModal']>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<ConditionItem | null>(null);
  const [selectedTool, setSelectedTool] = useState<EducationalTool | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);
  const [selectedLegalTab, setSelectedLegalTab] = useState<'privacy' | 'terms' | 'disclaimer' | 'accessibility' | 'editorial'>('disclaimer');

  // Derive active condition/city route metadata from lightweight headerNavData
  const activeConditionSlug = location.pathname.startsWith('/condition/')
    ? location.pathname.replace(/^\/condition\//, '').split('/')[0].split('#')[0]
    : null;
  const activeConditionPage = activeConditionSlug
    ? HEADER_CONDITIONS.find((c) => c.slug === activeConditionSlug || c.id === activeConditionSlug) || null
    : null;

  const activeCitySlug = location.pathname.startsWith('/city/')
    ? location.pathname.replace(/^\/city\//, '').split('/')[0].split('#')[0]
    : null;
  const activeCityPage = activeCitySlug
    ? HEADER_CITIES.find((c) => c.slug === activeCitySlug || c.id === activeCitySlug) || null
    : null;

  const [prefillReason, setPrefillReason] = useState<string>('');
  const [prefillSpecialistId, setPrefillSpecialistId] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Backward compatibility: automatically redirect any legacy hash URLs to clean URLs
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    if (hash.startsWith('#/condition/')) {
      const slug = hash.replace('#/condition/', '');
      navigate(`/condition/${slug}`, { replace: true });
    } else if (hash.startsWith('#/city/')) {
      const slug = hash.replace('#/city/', '');
      navigate(`/city/${slug}`, { replace: true });
    } else if (hash.startsWith('#condition-')) {
      const slug = hash.replace('#condition-', '');
      navigate(`/condition/${slug}`, { replace: true });
    } else if (hash.startsWith('#city-')) {
      const slug = hash.replace('#city-', '');
      navigate(`/city/${slug}`, { replace: true });
    } else if (hash === '#pricing' || hash === '#/pricing' || hash === '#/plans-and-pricing' || hash === '#plans-and-pricing') {
      navigate('/plans-and-pricing', { replace: true });
    } else if (hash === '#resources' || hash === '#/resources' || hash === '#blog' || hash === '#/blog') {
      navigate('/blog', { replace: true });
    } else if (hash.startsWith('#/blog/')) {
      const slug = hash.replace('#/blog/', '');
      navigate(`/blog/${slug}`, { replace: true });
    } else if (hash.startsWith('#/article/')) {
      const slug = hash.replace('#/article/', '');
      navigate(`/blog/${slug}`, { replace: true });
    } else if (hash === '#faq' || hash === '#/faq' || hash === '#faqs' || hash === '#/faqs') {
      navigate('/faq', { replace: true });
    }
  }, [location.pathname, location.hash, navigate]);

  // Avoid redundant synchronous localStorage write on initial mount
  useEffect(() => {
    if (!hasInitializedSettings.current) {
      hasInitializedSettings.current = true;
      return;
    }
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

    let message = `Hello Life Reset Pakistan, I would like to book a confidential consultation (Est. ${settings.foundedYear || 1981}).`;
    if (plan) {
      message = `Hello Life Reset Pakistan, I would like to book an appointment for the "${plan}" plan.`;
    } else if (specialistId) {
      const specName = SPECIALIST_NAMES[specialistId] || specialistId;
      message = `Hello Life Reset Pakistan, I would like to book a consultation with ${specName}.`;
    } else if (reason) {
      message = `Hello Life Reset Pakistan, I would like to book a consultation regarding ${reason}.`;
    }

    const whatsappUrl = getWhatsAppLink(message);
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const openServiceDetail = (serviceId: string) => {
    import('../data/practiceData').then(({ SERVICES }) => {
      const s = SERVICES.find((item) => item.id === serviceId || item.slug === serviceId);
      if (s) {
        setSelectedService(s);
        setActiveModal('service');
      }
    });
  };

  const openSpecialistProfile = (specialistId: string) => {
    import('../data/practiceData').then(({ SPECIALISTS }) => {
      const spec = SPECIALISTS.find((item) => item.id === specialistId);
      if (spec) {
        setSelectedSpecialist(spec);
        setActiveModal('specialist');
      }
    });
  };

  const openConditionPage = (conditionIdOrSlug: string) => {
    const clean = (conditionIdOrSlug || '').toLowerCase().trim();
    const match = HEADER_CONDITIONS.find((c) => c.id === clean || c.slug === clean);
    const slug = match?.slug || clean;
    if (slug) {
      navigate(`/condition/${slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeConditionPage = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCityPage = (cityIdOrSlug: string) => {
    const clean = (cityIdOrSlug || '').toLowerCase().trim();
    const match = HEADER_CITIES.find((c) => c.id === clean || c.slug === clean);
    const slug = match?.slug || clean;
    if (slug) {
      navigate(`/city/${slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeCityPage = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openConditionDetail = (conditionId: string) => {
    openConditionPage(conditionId);
  };

  const openEducationalTool = (toolId: string) => {
    import('../data/practiceData').then(({ EDUCATIONAL_TOOLS }) => {
      const t = EDUCATIONAL_TOOLS.find((item) => item.id === toolId);
      if (t) {
        setSelectedTool(t);
        setActiveModal('tool');
      }
    });
  };

  const openArticle = (articleId: string) => {
    import('../data/practiceData').then(({ ARTICLES }) => {
      const art = ARTICLES.find((item) => item.id === articleId || item.slug === articleId);
      if (art) {
        navigate(`/blog/${art.slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
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
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
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

    try {
      const existing = JSON.parse(localStorage.getItem('inst_1981_inquiries') || '[]');
      existing.unshift(submission);
      localStorage.setItem('inst_1981_inquiries', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {
      console.warn('Could not save inquiry locally', e);
    }

    // Save appointment inquiry to Supabase backend lazily on form submission
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
