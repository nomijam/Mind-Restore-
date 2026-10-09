import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { ARTICLES, resourcesImg } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const ResourcesSection: React.FC = () => {
  const { openArticle } = usePractice();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Anxiety',
    'Depression',
    'Relationships',
    'Stress',
    'Mental Health',
  ];

  const filteredArticles =
    selectedCategory === 'All'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section className="py-20 bg-white border-b border-[#286C6A]/10 text-left" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
              Clinical Library & Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
              Educational Mental Health Resources
            </h2>
            <p className="text-base text-[#526363] font-normal">
              Clinically reviewed articles written by licensed psychologists to demystify emotional symptoms and support recovery.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#286C6A] text-white shadow-2xs'
                    : 'bg-[#F8F7F2] text-[#243333] hover:bg-[#EAF2ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => openArticle(art.id)}
              className="bg-[#F8F7F2] rounded-2xl overflow-hidden border border-[#286C6A]/10 shadow-xs hover:border-[#286C6A]/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] bg-[#EAF2ED] overflow-hidden">
                  <img
                    src={resourcesImg}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-[#286C6A] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#526363] mb-2">
                    <span>{art.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base font-heading font-bold text-[#243333] group-hover:text-[#286C6A] transition-colors mb-2.5 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#526363] leading-[1.65] font-normal line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openArticle(art.id);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#286C6A] hover:text-[#1f5654] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
