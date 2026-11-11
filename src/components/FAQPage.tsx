import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  ChevronDown,
  Search,
  HelpCircle,
  ShieldCheck,
  MessageSquare,
  Phone,
  Clock,
  CreditCard,
  AlertTriangle,
  HeartHandshake,
  Lock,
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { FAQS } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

interface CategorizedFAQ {
  question: string;
  answer: string;
  category: 'General' | 'Appointments' | 'Confidentiality' | 'Fees' | 'Emergency';
}

const EXTENDED_FAQS: CategorizedFAQ[] = [
  {
    question: 'What mental-health services do you provide?',
    answer:
      'We provide comprehensive psychological services including individual counselling for adults, couples counselling, family therapy, child and adolescent psychological support, trauma-informed care, stress and burnout management, formal psychometric assessment, and behavioral support. Consultations are available nationwide across Pakistan and internationally via encrypted tele-health.',
    category: 'General',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'You can message our clinical intake coordinator directly on WhatsApp (+92 326 8791594), submit an online intake form on this website, or call our reception. We will help identify an appropriate psychologist, discuss scheduling preferences, and confirm your session within hours.',
    category: 'Appointments',
  },
  {
    question: 'Can I request a specific professional or psychologist?',
    answer:
      'Yes. You are welcome to review our specialists’ credentials and request a consultation with your preferred clinician (e.g. Dr. Farah Kamran, Tariq Rehman, or Ayesha Malik). If you are unsure who is the best fit for your specific concern, our intake coordinator will recommend a specialist with relevant clinical experience.',
    category: 'Appointments',
  },
  {
    question: 'Are online appointments strictly confidential?',
    answer:
      'Yes, 100% strictly confidential. All appointments adhere to rigorous healthcare privacy ethics and international psychological standards. Nothing you discuss is shared with employers, family members, or third parties without your explicit consent, with the sole legal exception of imminent risk of physical self-harm or harm to others.',
    category: 'Confidentiality',
  },
  {
    question: 'Do you offer online tele-health counselling across Pakistan and overseas?',
    answer:
      'Yes. We offer encrypted video, voice audio, and WhatsApp text consultations for clients throughout Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta, and beyond) as well as overseas Pakistanis in the UK, UAE, USA, Canada, and Europe.',
    category: 'Appointments',
  },
  {
    question: 'How are online tele-health consultations conducted?',
    answer:
      'Sessions take place via secure, encrypted video or confidential phone/WhatsApp audio according to your comfort. There is no waiting room or travel stress, and sessions can be attended from the privacy of your home.',
    category: 'Appointments',
  },
  {
    question: 'How long does a counselling session last?',
    answer:
      'A standard individual psychological counselling session lasts 45–60 minutes. Couples and family consultations are typically scheduled for 60 minutes to ensure adequate time for all participants.',
    category: 'General',
  },
  {
    question: 'What happens during my very first appointment?',
    answer:
      'The initial appointment is a warm, collaborative exploratory consultation. Your psychologist will listen to your current concerns, understand what brings you to therapy, explore relevant life context, and discuss a gentle, paced roadmap for care tailored to your goals.',
    category: 'General',
  },
  {
    question: 'What are your counselling fees and payment methods?',
    answer:
      'We maintain fully transparent pricing with no hidden charges or recurring subscriptions. Single video/voice sessions are Rs. 2,500, a 5-session package is Rs. 10,000 (effective Rs. 2,000/session), and weekly/monthly WhatsApp text counselling plans start at Rs. 3,500. We accept EasyPaisa, JazzCash, Bank Transfer, SadaPay, NayaPay, and International Credit/Debit cards.',
    category: 'Fees',
  },
  {
    question: 'Can I reschedule an appointment if an emergency arises?',
    answer:
      'Yes. We understand that life happens. We offer flexible rescheduling with at least 12 hours advance notice via WhatsApp with zero cancellation fees or penalties.',
    category: 'Appointments',
  },
  {
    question: 'Can family members or spouses seek joint support?',
    answer:
      'Yes. We offer dedicated family counselling and couples therapy to help loved ones resolve communication breakdowns, navigate marital challenges, heal generational misunderstandings, and rebuild trust.',
    category: 'General',
  },
  {
    question: 'Do you support adolescents and students facing academic stress?',
    answer:
      'Yes. Our adolescent specialists provide supportive, age-appropriate psychological care for young people dealing with exam anxiety, social pressure, mood fluctuations, emotional distress, and self-esteem challenges.',
    category: 'General',
  },
  {
    question: 'What if I am experiencing an acute psychological crisis or emergency?',
    answer:
      'Please note: Life Reset Pakistan is an outpatient scheduled appointment practice and is NOT an emergency response unit. If you or someone you know is in immediate physical danger, please contact local emergency authorities (1122 in Pakistan, 999 in the UK, 988 in the US/Canada) or visit the nearest hospital emergency room immediately.',
    category: 'Emergency',
  },
];

export const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, getWhatsAppLink, getPhoneCallLink } = usePractice();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]);

  const categories = ['All', 'General', 'Appointments', 'Confidentiality', 'Fees', 'Emergency'];

  const filteredFaqs = useMemo(() => {
    return EXTENDED_FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'All' || faq.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'Life Reset Pakistan Frequently Asked Questions',
    description:
      'Comprehensive clinical FAQ covering online counselling, confidentiality, psychologist qualifications, fees, and appointment scheduling in Pakistan.',
    url: 'https://liferesetpakistan.com/faq',
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Life Reset Pakistan',
      url: 'https://liferesetpakistan.com',
      foundingDate: '1981',
      telephone: settings.whatsappDisplayNumber,
    },
    mainEntity: EXTENDED_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const coordinatorWhatsAppUrl = getWhatsAppLink(
    'Hello Life Reset Pakistan, I have a question about your counselling services that was not answered in the FAQ.'
  );

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#243333] text-left">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Life Reset Pakistan"
        description="Find clear answers to common questions about online psychological counselling, confidentiality, fees, psychologist qualifications, and appointments at Life Reset Pakistan (Est. 1981)."
        canonicalUrl="https://liferesetpakistan.com/faq"
        schemaData={structuredData}
      />

      {/* Top Breadcrumb & Return Action */}
      <div className="bg-[#1C433E] text-white border-b border-[#286C6A]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#A3C2B1] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Homepage</span>
          </button>

          <nav aria-label="Breadcrumb" className="text-xs text-[#A3C2B1] flex items-center gap-2">
            <button
              type="button"
              onClick={handleBackToHome}
              className="hover:underline cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#D8B878] font-semibold" aria-current="page">
              Frequently Asked Questions
            </span>
          </nav>
        </div>

        {/* Hero Header Area */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#D8B878] uppercase bg-white/10 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLINICAL CLARITY & CONFIDENTIALITY · EST. {settings.foundedYear}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#E2ECE7] font-normal leading-relaxed max-w-xl mx-auto">
            Essential guidance regarding our clinical philosophy, strict patient confidentiality, online tele-mental health sessions, and transparent fee policies.
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 text-left">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B878]">
                <Lock className="w-4 h-4" />
                <span>100% Confidential</span>
              </div>
              <p className="text-[11px] text-[#A3C2B1] leading-snug">
                Strict medical privacy protocols for all sessions.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B878]">
                <ShieldCheck className="w-4 h-4" />
                <span>Licensed Clinicians</span>
              </div>
              <p className="text-[11px] text-[#A3C2B1] leading-snug">
                Postgraduate clinical psychologists (Est. 1981).
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B878]">
                <CreditCard className="w-4 h-4" />
                <span>Transparent Fees</span>
              </div>
              <p className="text-[11px] text-[#A3C2B1] leading-snug">
                Clear PKR pricing without hidden recurring charges.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B878]">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Care</span>
              </div>
              <p className="text-[11px] text-[#A3C2B1] leading-snug">
                Fast responses and simple booking via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main FAQ Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Search & Category Filter Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#286C6A]/15 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1C433E] text-white shadow-2xs font-semibold'
                    : 'bg-[#F8F7F2] text-[#334646] hover:bg-[#EAF2ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[#526363] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2 bg-[#F8F7F2] border border-[#286C6A]/15 rounded-xl text-xs sm:text-sm text-[#243333] placeholder-[#526363] focus:outline-none focus:ring-2 focus:ring-[#1C433E] focus:bg-white"
            />
          </div>
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#286C6A]/15 space-y-3">
              <HelpCircle className="w-8 h-8 text-[#526363] mx-auto opacity-60" />
              <h3 className="text-base font-bold text-[#1C433E]">No questions found</h3>
              <p className="text-xs text-[#526363] max-w-sm mx-auto">
                No questions matched "{searchQuery}". Try selecting another category or resetting your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C433E] text-white text-xs font-semibold hover:bg-[#286C6A] transition-colors cursor-pointer"
              >
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndexes.includes(index);
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-[#286C6A]/15 overflow-hidden shadow-2xs transition-all hover:border-[#1C433E]/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#EAF2ED]/30 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#8A5C14] uppercase tracking-wider block">
                        {faq.category}
                      </span>
                      <span className="font-heading font-semibold text-base sm:text-lg text-[#1C433E] block leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-[#8A5C14] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#445555] leading-relaxed border-t border-[#286C6A]/10 animate-in fade-in duration-150 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* WhatsApp Clinical Coordinator Assistance Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1C433E] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-semibold text-[#D8B878] uppercase bg-white/10">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>DIRECT INTAKE ASSISTANCE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Have a Specific Question Not Listed Here?
            </h3>
            <p className="text-xs sm:text-sm text-[#E2ECE7] leading-relaxed">
              Our clinical intake team is available on WhatsApp to answer questions regarding your symptoms, scheduling, psychologist matching, or payment logistics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={coordinatorWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ASK ON WHATSAPP</span>
            </a>

            <a
              href={getPhoneCallLink()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>

        {/* Quick Link Pillars to Other Sections */}
        <div className="p-6 rounded-2xl bg-white border border-[#286C6A]/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <button
            type="button"
            onClick={() => {
              navigate('/plans-and-pricing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-4 rounded-xl hover:bg-[#EAF2ED]/50 transition-colors text-left space-y-1 cursor-pointer group"
          >
            <span className="text-xs font-bold text-[#1C433E] group-hover:text-[#286C6A] block">
              Plans & Pricing →
            </span>
            <span className="text-[11px] text-[#526363] block">
              View single session and multi-session package rates.
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              navigate('/blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-4 rounded-xl hover:bg-[#EAF2ED]/50 transition-colors text-left space-y-1 cursor-pointer group"
          >
            <span className="text-xs font-bold text-[#1C433E] group-hover:text-[#286C6A] block">
              Mental Health Blog →
            </span>
            <span className="text-[11px] text-[#526363] block">
              Read evidence-informed psychoeducational articles.
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              navigate('/services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-4 rounded-xl hover:bg-[#EAF2ED]/50 transition-colors text-left space-y-1 cursor-pointer group"
          >
            <span className="text-xs font-bold text-[#1C433E] group-hover:text-[#286C6A] block">
              Clinical Services →
            </span>
            <span className="text-[11px] text-[#526363] block">
              Explore individual, couples, and family therapies.
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="py-8 bg-[#F8F7F2] border-t border-[#286C6A]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#526363]">
          <button
            type="button"
            onClick={handleBackToHome}
            className="hover:text-[#1C433E] font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                navigate('/plans-and-pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1C433E] hover:underline cursor-pointer"
            >
              Plans & Pricing
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                navigate('/blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1C433E] hover:underline cursor-pointer"
            >
              Blog
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                navigate('/emergency');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1C433E] hover:underline cursor-pointer"
            >
              Emergency Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
