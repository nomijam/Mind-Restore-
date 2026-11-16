import React, { createContext, useContext, useEffect } from 'react';
import {
  DEFAULT_OG_IMAGE,
  HOME_ROUTE_META,
} from '../data/seoMetadata';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  robots?: string;
  schemaData?: Record<string, any> | Record<string, any>[];
}

export interface CollectedHeadData {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  robots: string;
  schemaData?: Record<string, any> | Record<string, any>[];
}

const HeadCollectorContext = createContext<{ current: CollectedHeadData | null } | null>(null);

export const HeadCollectorProvider: React.FC<{
  collector: { current: CollectedHeadData | null };
  children: React.ReactNode;
}> = ({ collector, children }) => (
  <HeadCollectorContext.Provider value={collector}>{children}</HeadCollectorContext.Provider>
);

const DEFAULT_TITLE = HOME_ROUTE_META.home.title;
const DEFAULT_DESCRIPTION = HOME_ROUTE_META.home.description;
const BASE_URL = HOME_ROUTE_META.home.canonicalUrl;
const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl = BASE_URL,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  robots = DEFAULT_ROBOTS,
  schemaData,
}) => {
  const headCollector = useContext(HeadCollectorContext);
  if (headCollector) {
    headCollector.current = {
      title,
      description,
      canonicalUrl,
      ogType,
      ogImage,
      robots,
      schemaData,
    };
  }

  useEffect(() => {
    // 1. Page Title
    document.title = title;

    const setMetaTag = (
      selector: string,
      attr: 'name' | 'property',
      attrValue: string,
      content: string
    ) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Meta Description & Robots
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', robots);

    // 3. Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Life Reset Pakistan');

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 6. Dynamic JSON-LD Structured Data
    const scriptId = 'seo-page-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalUrl, ogType, ogImage, robots, schemaData]);

  return null;
};
