import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  schemaData?: Record<string, any> | Record<string, any>[];
}

const DEFAULT_TITLE = 'Life Reset Pakistan | Reset Your Life, Rebuild Your Future (Est. 1981)';
const DEFAULT_DESCRIPTION =
  'Life Reset Pakistan: Professional, confidential and accessible online psychological support for individuals, couples and families in Pakistan and worldwide (Est. 1981).';
const BASE_URL = 'https://liferesetpakistan.com';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl = BASE_URL,
  ogType = 'website',
  schemaData,
}) => {
  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    const setMetaTag = (selector: string, attr: 'name' | 'property', attrValue: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

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
  }, [title, description, canonicalUrl, ogType, schemaData]);

  return null;
};
