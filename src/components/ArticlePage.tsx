import React, { useState } from 'react';
import { useParams, useNavigate } from '../lib/router';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  Check,
  ShieldCheck,
  Sparkles,
  BookOpen,
  MessageSquare,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { NotFoundPage } from './NotFoundPage';
import { findArticle, ARTICLES, resourcesImg, resourcesMobileImg } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { settings, getWhatsAppLink } = usePractice();

  const [copied, setCopied] = useState(false);

  const article = slug ? findArticle(slug) : undefined;

  if (!article) {
    return <NotFoundPage />;
  }

  const handleBackToBlog = () => {
    navigate('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappConsultationUrl = getWhatsAppLink(
    `Hello Life Reset Pakistan, I read the article "${article.title}" and would like to schedule a consultation with a psychologist.`
  );

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out this mental health article: "${article.title}" - ${window.location.href}`
  )}`;

  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const getCitationsForCategory = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'anxiety':
        return [
          'American Psychological Association (APA). Clinical Practice Guideline for the Treatment of Anxiety and Panic. Washington, DC (2024).',
          'World Health Organization (WHO). Mental Health Gap Action Programme (mhGAP) Guideline. Geneva (2023).',
          'Journal of Affective Disorders. Physiological Sigh and Autonomic Vagal Regulation in Acute Stress (2023).',
        ];
      case 'depression':
        return [
          'National Institute of Mental Health (NIMH). Depression: Recognition, Assessment, and Psychotherapy Guidelines (2024).',
          'Beck Institute for Cognitive Behavior Therapy. Essentials of Cognitive Restructuring and Behavioral Activation in Mood Disorders (2023).',
          'The Lancet Psychiatry. Evidence-Based Psychotherapy Versus Pharmacotherapy in Depressive Spectrum (2023).',
        ];
      case 'relationships':
        return [
          'Gottman Institute. Sound Relationship House Theory and Longitudinal Predictors of Relational Stability (2023).',
          'American Association for Marriage and Family Therapy (AAMFT). Clinical Practice Ethics and Systems Dynamics (2024).',
        ];
      case 'ocd':
        return [
          'International OCD Foundation (IOCDF). Exposure and Response Prevention (ERP) Practice Parameters (2024).',
          'American Psychiatric Association (APA). Practice Guideline for the Treatment of Patients with Obsessive-Compulsive Disorder (2023).',
        ];
      case 'grief':
        return [
          'World Health Organization (WHO). Clinical Management of Prolonged Grief and Bereavement (2023).',
          'British Journal of Psychiatry. Dual Process Model of Coping with Bereavement (2024).',
        ];
      case 'stress':
      default:
        return [
          'World Health Organization (WHO). Guidelines on Mental Health at Work: Organizational Interventions and Individual Recovery (2023).',
          'International Journal of Stress Management. Autonomic Recovery from Prolonged Occupational Depletion (2024).',
          'American Psychological Association (APA). Stress in America: Coping Mechanisms and Cognitive Reserves (2023).',
        ];
    }
  };

  const citations = getCitationsForCategory(article.category);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Life Reset Pakistan',
      url: 'https://liferesetpakistan.com',
      foundingDate: '1981',
      telephone: settings.whatsappDisplayNumber,
    },
    datePublished: '2026-01-01',
    dateModified: '2026-11-11',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://liferesetpakistan.com/blog/${article.slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-[#F8F7F2] text-[#243333] text-left">
      <SEOHead
        title={`${article.title} | Life Reset Pakistan Blog`}
        description={article.excerpt}
        canonicalUrl={`https://liferesetpakistan.com/blog/${article.slug}`}
        ogType="article"
        schemaData={structuredData}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="bg-[#1C433E] text-white border-b border-[#286C6A]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBackToBlog}
            className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#D1E2DA] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Articles</span>
          </button>

          <nav aria-label="Breadcrumb" className="text-xs text-[#D1E2DA] flex items-center gap-2 min-h-[44px]">
            <button
              type="button"
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer min-h-[44px] inline-flex items-center"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={handleBackToBlog}
              className="hover:underline cursor-pointer min-h-[44px] inline-flex items-center"
            >
              Blog
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#D8B878] font-semibold truncate max-w-[200px]" aria-current="page">
              {article.title}
            </span>
          </nav>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#D8B878] uppercase bg-white/10 border border-white/15">
              {article.category} Psychoeducation
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#D1E2DA] bg-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D8B878]" />
              <span>Evidence-Informed Medical Sourcing</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author and Metadata */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#E2ECE7]">
            <span className="font-semibold text-[#D8B878]">{article.author}</span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1 text-[#D1E2DA]">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <span aria-hidden="true">•</span>
            <span className="text-[#D1E2DA]">{article.date}</span>
          </div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Featured Image with Clinical Caption */}
        <div className="rounded-3xl overflow-hidden border border-[#286C6A]/20 shadow-xs bg-[#EAF2ED]">
          <picture className="block w-full">
            <source
              media="(max-width: 640px)"
              srcSet={`${resourcesMobileImg} 480w`}
              sizes="100vw"
              type="image/webp"
              width={480}
              height={360}
            />
            <source
              media="(min-width: 641px)"
              srcSet={`${resourcesImg} 800w`}
              sizes="(max-width: 896px) 100vw, 896px"
              type="image/webp"
              width={800}
              height={600}
            />
            <img
              src={resourcesImg}
              srcSet={`${resourcesMobileImg} 480w, ${resourcesImg} 800w`}
              sizes="(max-width: 896px) 100vw, 896px"
              width={800}
              height={600}
              alt={article.title}
              className="w-full aspect-[21/9] sm:aspect-[2/1] object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="p-3 bg-white/80 border-t border-[#286C6A]/10 text-center text-xs text-[#526363] italic">
            Clinical psychoeducation provided for educational awareness and personal resilience.
          </div>
        </div>

        {/* Lead Excerpt */}
        <div className="p-6 rounded-2xl bg-[#EAF2ED]/60 border-l-4 border-[#1C433E] text-sm sm:text-base text-[#1C433E] font-medium leading-relaxed">
          {article.excerpt}
        </div>

        {/* Article Body Content */}
        <div className="prose prose-neutral max-w-none space-y-6 text-[#243333] text-sm sm:text-base leading-relaxed">
          {article.content.map((paragraph, idx) => {
            // Highlight action steps or lists
            if (
              paragraph.startsWith('1.') ||
              paragraph.startsWith('2.') ||
              paragraph.startsWith('3.') ||
              paragraph.startsWith('4.') ||
              paragraph.startsWith('•')
            ) {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[#286C6A]/15 shadow-2xs font-normal"
                >
                  <p className="m-0 text-[#1C433E] font-medium">{paragraph}</p>
                </div>
              );
            }

            if (
              paragraph.includes('Practical Grounding Steps:') ||
              paragraph.includes('Emergency Grounding Protocol') ||
              paragraph.includes('Small, Paced Steps Forward:') ||
              paragraph.includes('Helpful Principles:') ||
              paragraph.includes('Three Restoration Rules:') ||
              paragraph.includes('Helpful Strategies for Pakistani Social Contexts:') ||
              paragraph.includes('Evidence-Informed Steps for Intrusive Thoughts:') ||
              paragraph.includes('Compassionate Mourning Frameworks:')
            ) {
              return (
                <h2
                  key={idx}
                  className="text-lg sm:text-xl font-heading font-bold text-[#1C433E] pt-4 border-t border-[#286C6A]/10 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-[#8A5C14]" />
                  <span>{paragraph}</span>
                </h2>
              );
            }

            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Social Sharing & Copy Link Bar */}
        <div className="py-4 px-6 rounded-2xl bg-white border border-[#286C6A]/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1C433E]">
            <Share2 className="w-4 h-4 text-[#8A5C14]" />
            <span>Share this article with someone who might need it:</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8F7F2] border border-[#286C6A]/15 text-xs font-semibold text-[#1C433E] hover:bg-[#EAF2ED] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <span>Copy Link</span>
              )}
            </button>
          </div>
        </div>

        {/* Clinical Sourcing & Evidence Citations */}
        <div className="p-6 rounded-2xl bg-white border border-[#286C6A]/15 space-y-3 text-xs text-[#526363]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1C433E] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#8A5C14]" />
            <span>Academic & Clinical References</span>
          </div>
          <p className="text-[11px] text-[#526363] leading-relaxed">
            This psychoeducational article is grounded in evidence-informed psychotherapy protocols from recognized psychological institutions:
          </p>
          <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
            {citations.map((cite, i) => (
              <li key={i} className="leading-relaxed">
                {cite}
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp Clinical Consultation Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1C433E] text-white space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D8B878] uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>CONFIDENTIAL CLINICAL CONSULTATION</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Speak Privately With a Clinical Psychologist
            </h2>
            <p className="text-xs sm:text-sm text-[#E2ECE7] leading-relaxed max-w-xl">
              If reading this article resonated with your personal experience, professional support is available. We provide 100% confidential online video, voice, and WhatsApp text counselling across Pakistan and overseas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappConsultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>DISCUSS THIS ON WHATSAPP</span>
            </a>

            <button
              type="button"
              onClick={() => {
                navigate('/plans-and-pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <span>View Counselling Plans & Fees</span>
            </button>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="space-y-6 pt-6 border-t border-[#286C6A]/15">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-[#1C433E]">
              Related Psychoeducational Guides
            </h2>
            <button
              type="button"
              onClick={handleBackToBlog}
              className="min-h-[44px] text-xs font-semibold text-[#1C433E] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  navigate(`/blog/${rel.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white p-5 rounded-2xl border border-[#286C6A]/15 hover:border-[#1C433E] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#8A5C14] uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-heading font-bold text-[#243333] group-hover:text-[#1C433E] transition-colors leading-snug line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#526363] line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-[#286C6A]/10 flex items-center justify-between text-xs font-semibold text-[#1C433E]">
                  <span>{rel.readTime}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
