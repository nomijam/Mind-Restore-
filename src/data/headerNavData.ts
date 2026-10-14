export interface HeaderConditionItem {
  id: string;
  slug: string;
  title: string;
  category: 'common-concerns' | 'specialised-care';
}

export const HEADER_CONDITIONS: HeaderConditionItem[] = [
  // COMMON CONCERNS (8 items)
  {
    id: 'anxiety-counselling',
    slug: 'anxiety-counselling',
    title: 'Anxiety Counselling',
    category: 'common-concerns',
  },
  {
    id: 'depression-counselling',
    slug: 'depression-counselling',
    title: 'Depression Counselling',
    category: 'common-concerns',
  },
  {
    id: 'stress-burnout',
    slug: 'stress-burnout',
    title: 'Stress & Burnout',
    category: 'common-concerns',
  },
  {
    id: 'sleep-disorders',
    slug: 'sleep-disorders',
    title: 'Sleep Disorders',
    category: 'common-concerns',
  },
  {
    id: 'health-anxiety',
    slug: 'health-anxiety',
    title: 'Health Anxiety',
    category: 'common-concerns',
  },
  {
    id: 'anger-management',
    slug: 'anger-management',
    title: 'Anger Management',
    category: 'common-concerns',
  },
  {
    id: 'phobia-treatment',
    slug: 'phobia-treatment',
    title: 'Phobia Treatment',
    category: 'common-concerns',
  },
  {
    id: 'female-psychologist-online',
    slug: 'female-psychologist-online',
    title: 'Female Psychologist Online',
    category: 'common-concerns',
  },

  // SPECIALISED CARE (11 items)
  {
    id: 'ocd-treatment',
    slug: 'ocd-treatment',
    title: 'OCD Treatment',
    category: 'specialised-care',
  },
  {
    id: 'ptsd-trauma-therapy',
    slug: 'ptsd-trauma-therapy',
    title: 'PTSD & Trauma Therapy',
    category: 'specialised-care',
  },
  {
    id: 'relationship-breakup',
    slug: 'relationship-breakup',
    title: 'Relationship & Breakup',
    category: 'specialised-care',
  },
  {
    id: 'grief-loss',
    slug: 'grief-loss',
    title: 'Grief & Loss',
    category: 'specialised-care',
  },
  {
    id: 'addiction-counselling',
    slug: 'addiction-counselling',
    title: 'Addiction Counselling',
    category: 'specialised-care',
  },
  {
    id: 'anonymous-counselling',
    slug: 'anonymous-counselling',
    title: 'Anonymous Counselling',
    category: 'specialised-care',
  },
  {
    id: 'female-psychologist',
    slug: 'female-psychologist',
    title: 'Female Psychologist',
    category: 'specialised-care',
  },
  {
    id: 'marriage-couple-counselling',
    slug: 'marriage-couple-counselling',
    title: 'Marriage & Couple Counselling',
    category: 'specialised-care',
  },
  {
    id: 'family-counselling-therapy',
    slug: 'family-counselling-therapy',
    title: 'Family Counselling & Therapy',
    category: 'specialised-care',
  },
  {
    id: 'child-teen-psychologist',
    slug: 'child-teen-psychologist',
    title: 'Child & Teen Psychologist',
    category: 'specialised-care',
  },
  {
    id: 'student-counselling',
    slug: 'student-counselling',
    title: 'Student Counselling',
    category: 'specialised-care',
  },
];

export interface HeaderCityItem {
  id: string;
  slug: string;
  name: string;
}

export const HEADER_CITIES: HeaderCityItem[] = [
  { id: 'lahore', slug: 'lahore', name: 'Lahore' },
  { id: 'karachi', slug: 'karachi', name: 'Karachi' },
  { id: 'islamabad-rawalpindi', slug: 'islamabad-rawalpindi', name: 'Islamabad & Rawalpindi' },
  { id: 'faisalabad', slug: 'faisalabad', name: 'Faisalabad' },
  { id: 'multan', slug: 'multan', name: 'Multan' },
  { id: 'peshawar', slug: 'peshawar', name: 'Peshawar' },
  { id: 'sialkot', slug: 'sialkot', name: 'Sialkot' },
  { id: 'gujranwala', slug: 'gujranwala', name: 'Gujranwala' },
  { id: 'overseas-pakistanis', slug: 'overseas-pakistanis', name: 'Overseas Pakistanis (Worldwide Telehealth)' },
];
