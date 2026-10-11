export interface Specialist {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  registrationNumber: string;
  yearsExperience: number;
  image: string;
  languages: string[];
  specialization: string[];
  sessionFormats: ('Online Video' | 'Voice Consultation')[];
  about: string;
  therapeuticApproaches: string[];
  whoTheyWorkWith: string[];
  availability: string;
  consultationFeeGuide: string;
  gender: 'Female' | 'Male';
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  iconName: string;
  overview: string;
  indications: string[];
  howWeHelp: string[];
  sessionFormat: string;
  suitableFor: string[];
  approaches: string[];
  faqs: { question: string; answer: string }[];
}

export interface ConditionItem {
  id: string;
  slug: string;
  title: string;
  category: 'common-concerns' | 'specialised-care';
  twoLineExplanation: string;
  iconName: string;
  relatedServiceId: string;
  signs: string[];
  gentleGuidance: string;

  // Dedicated Condition Page attributes
  badge?: string;
  fullOverview?: string;
  culturalContext?: string;
  symptomsBreakdown?: {
    emotional: string[];
    physical: string[];
    behavioral: string[];
  };
  therapeuticModalities?: {
    name: string;
    description: string;
  }[];
  treatmentRoadmap?: {
    step: string;
    title: string;
    description: string;
  }[];
  whoItIsFor?: string[];
  recommendedSpecialistIds?: string[];
  faqs?: { question: string; answer: string }[];
  keywords?: string[];
}

export interface EducationalTool {
  id: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  scientificContext: string;
  disclaimer: string;
  questions: {
    id: number;
    question: string;
    options: { label: string; score: number }[];
  }[];
  scoreRanges: {
    minScore: number;
    maxScore: number;
    level: string;
    summary: string;
    nextStep: string;
  }[];
}

export interface ResourceArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface PatientTestimonial {
  id: string;
  attribution: string;
  context: string;
  reflection: string;
  yearApprox?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  isVerified: boolean;
}

export interface AppointmentInquiry {
  fullName: string;
  phone: string;
  email: string;
  preferredContactMethod: 'WhatsApp' | 'Phone Call' | 'Email';
  reasonForContact: string;
  preferredAppointmentType: 'Online Video' | 'Voice Consultation';
  preferredDate?: string;
  message?: string;
  consent: boolean;
  timestamp: string;
  ghlPipelineStage: string;
  ghlTags: string[];
}

export interface PracticeSettings {
  organizationName: string;
  foundedYear: number;
  heritageTagline: string;
  phoneDisplay: string;
  phoneNumber: string;
  whatsappNumber: string;
  whatsappDisplayNumber: string;
  email: string;
  inPersonClinicAddress: string;
  hoursOfOperation: string;
  feeGuidanceText: string;
  standardInitialFeePkr: number;
  standardFollowUpFeePkr: number;
  standardOverseasFeeUsd: number;
  ghlWebhookUrl?: string;
  emergencyNotice: {
    pakistanHotline: string;
    pakistanEmergency: string;
    internationalAdvice: string;
  };
}
