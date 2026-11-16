import React, { useState, useMemo } from 'react';
import { useNavigate } from '../lib/router';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Search,
  Tag,
  ShieldCheck,
  HeartHandshake,
  MessageSquare,
  Compass,
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import {
  BLOG_INDEX_META,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  VERIFIED_ORGANIZATION,
  buildBreadcrumbSchema,
  sanitizeSchemaText,
} from '../data/seoMetadata';
import { ARTICLES, resourcesImg, resourcesMobileImg } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, getWhatsAppLink } = usePractice();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Anxiety', 'Depression', 'Relationships', 'Stress', 'OCD', 'Grief'];

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        article.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = ARTICLES[0];

  const handleSelectArticle = (slug: string) => {
    navigate(`/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      VERIFIED_ORGANIZATION,
      {
        '@type': 'Blog',
        '@id': `${BLOG_INDEX_META.canonicalUrl}#blog`,
        name: BLOG_INDEX_META.title,
        description: BLOG_INDEX_META.description,
        url: BLOG_INDEX_META.canonicalUrl,
        publisher: { '@id': VERIFIED_ORGANIZATION['@id'] },
        blogPost: ARTICLES.map((art) => ({
          '@type': 'BlogPosting',
          headline: sanitizeSchemaText(art.title),
          description: sanitizeSchemaText(art.excerpt),
          author: { '@id': VERIFIED_ORGANIZATION['@id'] },
          datePublished: art.datePublished || '2026-01-01',
          url: `${SITE_URL}/blog/${art.slug}`,
        })),
      },
      buildBreadcrumbSchema(BLOG_INDEX_META.canonicalUrl, [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Blog', url: BLOG_INDEX_META.canonicalUrl },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#243333] text-left">
      <SEOHead
        title={BLOG_INDEX_META.title}
        description={BLOG_INDEX_META.description}
        canonicalUrl={BLOG_INDEX_META.canonicalUrl}
        ogType="website"
        ogImage={BLOG_INDEX_META.ogImage || DEFAULT_OG_IMAGE}
        schemaData={structuredData}
      />

      {/* Top Breadcrumb & Return Action */}
      <div className="bg-[#1C433E] text-white border-b border-[#286C6A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBackToHome}
            className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#D1E2DA] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Homepage</span>
          </button>

          <nav aria-label="Breadcrumb" className="text-xs text-[#D1E2DA] flex items-center gap-2 min-h-[44px]">
            <button
              type="button"
              onClick={handleBackToHome}
              className="hover:underline cursor-pointer min-h-[44px] inline-flex items-center"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#D8B878] font-semibold" aria-current="page">
              Blog & Articles
            </span>
          </nav>
        </div>

        {/* Hero Header Area */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#D8B878] uppercase bg-white/10 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EVIDENCE-INFORMED PSYCHOEDUCATION · EST. {settings.foundedYear}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Mental Health Blog & Clinical Insights
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#E2ECE7] font-normal leading-relaxed max-w-2xl mx-auto">
            Clinically reviewed articles written by licensed psychologists to demystify emotional symptoms, challenge cultural stigma, and support your personal reset.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#526363] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic..."
              className="w-full pl-9 pr-4 py-2 bg-[#F8F7F2] border border-[#286C6A]/15 rounded-xl text-xs sm:text-sm text-[#243333] placeholder-[#526363] focus:outline-none focus:ring-2 focus:ring-[#1C433E] focus:bg-white"
            />
          </div>
        </div>

        {/* Featured Article Card (if on 'All' category and no search active) */}
        {selectedCategory === 'All' && !searchQuery && featuredArticle && (
          <div
            onClick={() => handleSelectArticle(featuredArticle.slug)}
            className="bg-white rounded-3xl overflow-hidden border border-[#286C6A]/20 shadow-xs hover:border-[#1C433E] hover:shadow-md transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-[#EAF2ED] overflow-hidden min-h-[260px]">
              <img
                src={resourcesImg}
                srcSet={`${resourcesMobileImg} 480w, ${resourcesImg} 800w`}
                sizes="(max-width: 1023px) 100vw, 42vw"
                width={800}
                height={600}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                loading="eager"
                decoding="async"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#1C433E] text-[#D8B878] text-[11px] font-bold tracking-wider uppercase rounded-full shadow-md">
                Featured Clinical Guide
              </span>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#526363]">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#EAF2ED] text-[#1C433E] font-semibold text-[11px]">
                    {featuredArticle.category}
                  </span>
                  <span>{featuredArticle.author}</span>
                  <span aria-hidden="true">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-[#1C433E] group-hover:text-[#286C6A] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-[#526363] leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#286C6A]/10">
                <div className="flex flex-wrap gap-1.5">
                  {featuredArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-[#526363] bg-[#F8F7F2] px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C433E] group-hover:text-[#286C6A]">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#1C433E]">
              {selectedCategory === 'All' ? 'All Clinical Articles' : `${selectedCategory} Articles`}
            </h2>
            <span className="text-xs text-[#526363]">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#286C6A]/15 space-y-3">
              <BookOpen className="w-8 h-8 text-[#526363] mx-auto opacity-60" />
              <h3 className="text-base font-bold text-[#1C433E]">No articles found</h3>
              <p className="text-xs text-[#526363] max-w-sm mx-auto">
                No articles matched "{searchQuery}". Try selecting another category or resetting your search.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => handleSelectArticle(art.slug)}
                  className="bg-white rounded-3xl overflow-hidden border border-[#286C6A]/15 shadow-2xs hover:border-[#1C433E] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-[#EAF2ED] overflow-hidden">
                      <img
                        src={art.image || resourcesImg}
                        srcSet={
                          art.image
                            ? `${art.mobileImage || art.image} 600w, ${art.image} ${art.imageWidth || 1200}w`
                            : `${resourcesMobileImg} 480w, ${resourcesImg} 800w`
                        }
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        width={art.imageWidth || 480}
                        height={art.imageHeight || 360}
                        alt={`Psychoeducation: ${art.title}`}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute top-3 left-3 bg-[#1C433E]/90 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                        {art.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-[#526363]">
                        <span className="font-medium text-[#1C433E]">{art.author}</span>
                        <span aria-hidden="true">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{art.readTime}</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-heading font-bold text-[#243333] group-hover:text-[#1C433E] transition-colors leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-xs text-[#526363] leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#286C6A]/10 mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {art.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#526363] bg-[#F8F7F2] px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1C433E] group-hover:text-[#286C6A]">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* WhatsApp Clinical Consultation Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1C433E] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-semibold text-[#D8B878] uppercase bg-white/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CONFIDENTIAL CLINICAL CARE</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-white">
              Do These Symptoms Sound Familiar?
            </h2>
            <p className="text-xs sm:text-sm text-[#E2ECE7] leading-relaxed">
              Reading about anxiety, burnout, or low mood is often the first step toward recovery. You don't have to carry the emotional burden alone.
            </p>
          </div>

          <a
            href={getWhatsAppLink('Hello Life Reset Pakistan, I was reading your articles and would like to schedule an appointment with a psychologist.')}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.99] shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>DISCUSS ON WHATSAPP</span>
          </a>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="py-8 bg-[#F8F7F2] border-t border-[#286C6A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#526363]">
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
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1C433E] hover:underline cursor-pointer"
            >
              Services
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                navigate('/condition/anxiety-disorders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1C433E] hover:underline cursor-pointer"
            >
              Anxiety Care
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
