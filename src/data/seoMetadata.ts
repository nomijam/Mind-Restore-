export const SITE_URL = 'https://liferesetpakistan.com';
export const DEFAULT_OG_IMAGE =
  'https://liferesetpakistan.com/images/heritage_clinical_consultation_1791269818478.webp';

export const VERIFIED_ORG_DESCRIPTION =
  'Online counselling and mental wellness support in Pakistan and worldwide, in English and Urdu, by video, phone or text.';

export const VERIFIED_ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Life Reset Pakistan',
  url: `${SITE_URL}/`,
  telephone: '+92-326-8791594',
  email: 'care@liferesetpakistan.com',
  description: VERIFIED_ORG_DESCRIPTION,
  logo: `${SITE_URL}/favicon.svg`,
};

export interface RouteSEOMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
}

/**
 * Ensures any dynamic text placed into JSON-LD structured data contains only verified facts
 * (no founding dates, 1981, licences, degrees, practitioner names, reviews, or clinic addresses).
 */
export function sanitizeSchemaText(text: string): string {
  return text
    .replace(/\s*\(e\.g\.?\s*[^)]*(?:Farah Kamran|Tariq Rehman|Ayesha Malik)[^)]*\)/gi, '')
    .replace(/\bDr\.\s*Farah Kamran\b/gi, 'our counselling team')
    .replace(/\bTariq Rehman(?:,\s*M\.?Sc\.?)?/gi, 'our counselling team')
    .replace(/\bAyesha Malik(?:,\s*M\.?Phil\.?)?/gi, 'our female counselling team')
    .replace(/\b(?:M\.?Phil|Ph\.?D|M\.?Sc)\.?/gi, 'postgraduate')
    .replace(/\b(?:advanced\s+)?postgraduate\s+clinical\s+degrees?\s*\([^)]*\)/gi, 'professional counselling training')
    .replace(/\bpostgraduate\s+and\s+postgraduate\s+degrees\b/gi, 'relevant training')
    .replace(/\bfrom\s+prestigious\s+universities\s*\([^)]*\)/gi, 'in mental wellness support')
    .replace(/\bwith\s+(?:certified|qualified)\s+clinical\s+practice\s+registrations\b/gi, 'offering confidential support')
    .replace(/\b(?:registered|qualified)\s+with\s+national\s+psychological\s+associations\b/gi, 'focused on confidential mental wellness support')
    .replace(/\b(?:licensed|certified|registered|accredited)\b/gi, 'dedicated')
    .replace(/since\s*1981|in\s*1981|\(?Est\.?\s*1981\)?|1981/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:])/g, '$1')
    .trim();
}

export function buildBreadcrumbSchema(
  canonicalUrl: string,
  items: { name: string; url: string }[]
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const HOME_ROUTE_META: Record<string, RouteSEOMeta> = {
  home: {
    title: 'Online Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Confidential online counselling and mental wellness support in Pakistan and worldwide, in English and Urdu, by video, phone or text with Life Reset Pakistan.',
    canonicalUrl: `${SITE_URL}/`,
  },
  services: {
    title: 'Online Counselling Services | Life Reset Pakistan',
    description:
      'Explore confidential individual, couples, family, teen, trauma, and assessment counselling online in English and Urdu via video, phone, or WhatsApp text.',
    canonicalUrl: `${SITE_URL}/services`,
  },
  about: {
    title: 'About Life Reset Pakistan | Online Mental Wellness Care',
    description:
      'Learn about Life Reset Pakistan: private online counselling and mental wellness support in English and Urdu across Pakistan and worldwide via video or text.',
    canonicalUrl: `${SITE_URL}/about`,
  },
  'how-it-works': {
    title: 'How Online Counselling Works | Life Reset Pakistan',
    description:
      'See how online counselling works at Life Reset Pakistan: message WhatsApp, match with a specialist, and attend private video, phone, or text sessions.',
    canonicalUrl: `${SITE_URL}/how-it-works`,
  },
  timeline: {
    title: 'Our Care Standards & Journey | Life Reset Pakistan',
    description:
      'Explore our care standards, privacy commitment, and structured digital counselling process supporting individuals and families across Pakistan & worldwide.',
    canonicalUrl: `${SITE_URL}/timeline`,
  },
  tools: {
    title: 'Self-Care & Grounding Tools | Life Reset Pakistan',
    description:
      'Use free interactive grounding, paced breathing, cognitive reframing, and sleep wind-down exercises created by Life Reset Pakistan for daily emotional calm.',
    canonicalUrl: `${SITE_URL}/tools`,
  },
  emergency: {
    title: 'Crisis Helplines & Urgent Support | Life Reset Pakistan',
    description:
      'Review urgent crisis guidance, Pakistan mental health helpline numbers including Umang and 1122, and emergency support contacts shared by Life Reset Pakistan.',
    canonicalUrl: `${SITE_URL}/emergency`,
  },
  contact: {
    title: 'Contact & Book Counselling | Life Reset Pakistan',
    description:
      'Book an online counselling session or message Life Reset Pakistan on WhatsApp +92 326 8791594 or care@liferesetpakistan.com in English or Urdu support.',
    canonicalUrl: `${SITE_URL}/contact`,
  },
};

export const PLANS_PRICING_META: RouteSEOMeta = {
  title: 'Counselling Plans & Pricing | Life Reset Pakistan',
  description:
    'Transparent online counselling fees in Pakistan: single sessions at Rs. 2,500, 5-session packages at Rs. 10,000, and WhatsApp text plans from Rs. 3,500.',
  canonicalUrl: `${SITE_URL}/plans-and-pricing`,
};

export const BLOG_INDEX_META: RouteSEOMeta = {
  title: 'Mental Health Blog & Articles | Life Reset Pakistan',
  description:
    'Read practical mental health articles on anxiety, depression, stress, OCD, grief, and healthy boundaries in English and Urdu context at Life Reset Pakistan.',
  canonicalUrl: `${SITE_URL}/blog`,
  ogImage: `${SITE_URL}/images/resources_wellness_journal_1791220222535.webp`,
};

export const FAQ_PAGE_META: RouteSEOMeta = {
  title: 'Frequently Asked Questions (FAQ) | Life Reset Pakistan',
  description:
    'Find clear answers about online counselling, session confidentiality, booking via WhatsApp, English and Urdu support, and pricing at Life Reset Pakistan.',
  canonicalUrl: `${SITE_URL}/faq`,
};

export const CONDITION_META_BY_SLUG: Record<string, { title: string; description: string }> = {
  'anxiety-counselling': {
    title: 'Anxiety Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Confidential online anxiety counselling in Pakistan and worldwide in English and Urdu. Support for worry, panic, and tension by video, phone, or text.',
  },
  'depression-counselling': {
    title: 'Depression Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Compassionate online depression counselling in English and Urdu for clients in Pakistan and abroad via private video, voice call, or WhatsApp sessions.',
  },
  'stress-burnout': {
    title: 'Stress & Burnout Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Online stress and workplace burnout counselling in Pakistan and worldwide in English and Urdu. Rebuild balance through private video, phone, or text care.',
  },
  'sleep-disorders': {
    title: 'Sleep Problems Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Overcome insomnia, racing thoughts, and sleep disruption with private online counselling in English and Urdu by video, phone, or WhatsApp text support.',
  },
  'health-anxiety': {
    title: 'Health Anxiety Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Private online counselling for health anxiety and symptom worry across Pakistan and abroad, available in English and Urdu via video, phone, or WhatsApp.',
  },
  'anger-management': {
    title: 'Anger Management Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Confidential online anger management and emotional regulation counselling in English and Urdu for clients across Pakistan and abroad via video or text.',
  },
  'phobia-treatment': {
    title: 'Phobia Treatment in Pakistan | Life Reset Pakistan',
    description:
      'Structured online counselling for specific fears and phobias in Pakistan and worldwide, offered in English and Urdu via private video, phone, or text.',
  },
  'ocd-treatment': {
    title: 'OCD Treatment in Pakistan | Life Reset Pakistan',
    description:
      'Confidential online counselling for OCD and intrusive thoughts in Pakistan and worldwide, delivered in English and Urdu via video, phone, or text care.',
  },
  'ptsd-trauma-therapy': {
    title: 'PTSD & Trauma Therapy in Pakistan | Life Reset Pakistan',
    description:
      'Paced, trauma-informed online counselling in English and Urdu for clients in Pakistan and worldwide via confidential video, phone, or WhatsApp sessions.',
  },
  'relationship-breakup': {
    title: 'Relationship Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Navigate breakup recovery and relationship distress with private online counselling in English and Urdu via video, phone, or text at Life Reset Pakistan.',
  },
  'grief-loss': {
    title: 'Grief Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Gentle online grief and bereavement counselling in English and Urdu for clients across Pakistan and abroad via confidential video, phone, or text care.',
  },
  'addiction-counselling': {
    title: 'Addiction Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Private, non-judgmental online addiction and habit recovery counselling in English and Urdu across Pakistan and worldwide via video, phone, or WhatsApp.',
  },
  'anonymous-counselling': {
    title: 'Anonymous Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Discreet, privacy-first online counselling with voice or text options in English and Urdu across Pakistan and worldwide via Life Reset Pakistan support.',
  },
  'female-psychologist': {
    title: 'Female Psychologist in Pakistan | Life Reset Pakistan',
    description:
      'Confidential online sessions with female counsellors in English and Urdu for women, students, and families in Pakistan and worldwide via video or text.',
  },
  'marriage-couple-counselling': {
    title: 'Marriage Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Online marriage and couples counselling in English and Urdu to improve communication and resolve conflict across Pakistan and worldwide via video call.',
  },
  'family-counselling-therapy': {
    title: 'Family Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Online family counselling in English and Urdu helping households navigate generational dynamics and conflict across Pakistan and worldwide via video call.',
  },
  'child-teen-psychologist': {
    title: 'Child Psychologist in Pakistan | Life Reset Pakistan',
    description:
      'Supportive online counselling for children, adolescents, and parents in English and Urdu across Pakistan and worldwide via confidential video or text.',
  },
  'student-counselling': {
    title: 'Student Counselling in Pakistan | Life Reset Pakistan',
    description:
      'Online counselling for university and exam stress, focus, and career transitions in English and Urdu across Pakistan and worldwide via video or WhatsApp.',
  },
};

export const CITY_META_BY_SLUG: Record<string, { title: string; description: string }> = {
  lahore: {
    title: 'Online Counselling in Lahore | Life Reset Pakistan',
    description:
      'Confidential online counselling in Lahore in English and Urdu by video, phone, or WhatsApp text. Flexible private scheduling with Life Reset Pakistan.',
  },
  karachi: {
    title: 'Online Counselling in Karachi | Life Reset Pakistan',
    description:
      'Private online counselling in Karachi in English and Urdu via video, voice call, or WhatsApp text support for anxiety, stress, mood, and relationships.',
  },
  'islamabad-rawalpindi': {
    title: 'Islamabad & Rawalpindi Counselling | Life Reset Pakistan',
    description:
      'Confidential online counselling in Islamabad and Rawalpindi in English and Urdu via private video, phone, or WhatsApp text with Life Reset Pakistan today.',
  },
  faisalabad: {
    title: 'Online Counselling in Faisalabad | Life Reset Pakistan',
    description:
      'Accessible online counselling in Faisalabad in English and Urdu via private video, phone, or WhatsApp text support for individuals, couples, and families.',
  },
  peshawar: {
    title: 'Online Counselling in Peshawar | Life Reset Pakistan',
    description:
      'Private online counselling in Peshawar in English and Urdu by video, voice, or WhatsApp text, offering discreet mental wellness support from your home.',
  },
  multan: {
    title: 'Online Counselling in Multan | Life Reset Pakistan',
    description:
      'Confidential online counselling in Multan in English and Urdu by video, phone, or WhatsApp text for anxiety, stress, mood, and family wellness support.',
  },
  'overseas-worldwide': {
    title: 'Overseas Pakistani Counselling | Life Reset Pakistan',
    description:
      'Culturally attuned online counselling worldwide in English and Urdu by video, phone, or text for overseas Pakistanis across the UK, UAE, USA, and Canada.',
  },
};

export const ARTICLE_META_BY_SLUG: Record<string, { title: string; description: string }> = {
  'understanding-anxiety-roots': {
    title: 'Understanding Anxiety Roots | Life Reset Pakistan',
    description:
      'Learn why persistent anxiety triggers fight-or-flight responses and explore practical cognitive and breathing exercises shared by Life Reset Pakistan.',
  },
  'depression-and-hope': {
    title: 'Navigating Depression & Low Mood | Life Reset Pakistan',
    description:
      'Understand emotional exhaustion, persistent low mood, and gentle behavioural activation steps in this mental wellness article from Life Reset Pakistan.',
  },
  'healthy-boundaries-relationships': {
    title: 'Healthy Boundaries in Families | Life Reset Pakistan',
    description:
      'Practical guidance on setting respectful emotional boundaries in close-knit families and marriages without guilt or conflict, from Life Reset Pakistan.',
  },
  'workplace-burnout-recovery': {
    title: 'Recovering from Burnout | Life Reset Pakistan',
    description:
      'Practical frameworks to recover from workplace exhaustion, manage digital overload, and rebuild sustainable rest routines with Life Reset Pakistan today.',
  },
  'panic-attacks-emergency-toolkit': {
    title: 'Grounding Through Panic Attacks | Life Reset Pakistan',
    description:
      'Learn a practical 4-step somatic grounding and box-breathing routine to calm sudden panic spirals and regain composure, shared by Life Reset Pakistan.',
  },
  'overcoming-social-anxiety-pakistan': {
    title: 'Overcoming Social Anxiety | Life Reset Pakistan',
    description:
      'Practical cognitive reframing strategies for navigating weddings, extended family gatherings, and social evaluation stress with Life Reset Pakistan care.',
  },
  'managing-intrusive-thoughts-ocd': {
    title: 'Managing Intrusive Thoughts & OCD | Life Reset Pakistan',
    description:
      'Understand unwanted intrusive thoughts, reassurance loops, and evidence-informed ERP principles in this clinical wellness guide from Life Reset Pakistan.',
  },
  'grief-loss-emotional-healing': {
    title: 'Grief & Emotional Healing | Life Reset Pakistan',
    description:
      'Compassionate perspectives on mourning bereavement and navigating grief at your own pace without feeling broken, published by Life Reset Pakistan today.',
  },
};

export const NOT_FOUND_META: RouteSEOMeta = {
  title: 'Page Not Found | Life Reset Pakistan',
  description:
    'The requested page could not be found. Return to Life Reset Pakistan for confidential online counselling in English and Urdu by video, phone, or text.',
  canonicalUrl: `${SITE_URL}/404`,
};
