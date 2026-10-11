export interface HeroImageData {
  id: string;
  src: string;
  alt: string;
  landmark: string;
  description: string;
}

// ==========================================
// CITIES HERO BACKGROUND IMAGES (Every City Has Unique Landmark & Local Atmosphere)
// ==========================================
export const CITY_HERO_IMAGES: Record<string, HeroImageData> = {
  lahore: {
    id: 'lahore',
    src: '/src/assets/images/hero_lahore_badshahi_1791725023747.jpg',
    alt: 'Badshahi Mosque and historic Lahore Mughal architecture at twilight with warm lantern reflections in Gulberg and Old City Lahore, Pakistan',
    landmark: 'Badshahi Mosque & Lahore Heritage Practice (Est. 1981)',
    description: 'Centrally located in Lahore since 1981, offering in-person clinic appointments and secure online tele-mental health.'
  },
  karachi: {
    id: 'karachi',
    src: '/src/assets/images/hero_karachi_sea_1791725039726.jpg',
    alt: 'Clifton Sea View coastline and Karachi Arabian Sea evening lights with serene waves and modern city skyline in Karachi, Pakistan',
    landmark: 'Clifton Promenade & Arabian Sea Coastline, Karachi',
    description: 'Serving professionals, university students, and families across Clifton, DHA, Gulshan, and PECHS via encrypted telehealth.'
  },
  'islamabad-rawalpindi': {
    id: 'islamabad-rawalpindi',
    src: '/src/assets/images/hero_islamabad_faisal_1791725059621.jpg',
    alt: 'Faisal Mosque with marble minarets nestled at the base of lush green Margalla Hills in federal capital Islamabad, Pakistan',
    landmark: 'Faisal Mosque & Margalla Hills National Park, Islamabad',
    description: 'Confidential clinical consultations for civil servants, development sector professionals, diplomats, and Twin Cities families.'
  },
  faisalabad: {
    id: 'faisalabad',
    src: '/src/assets/images/hero_faisalabad_tower_1791725140269.jpg',
    alt: 'Historic Victorian Clock Tower Ghanta Ghar in the central square of Faisalabad Punjab Pakistan surrounded by historic bazaars',
    landmark: 'Clock Tower Ghanta Ghar, Faisalabad',
    description: 'Discreet, 100% private tele-mental health care for business leaders, textile professionals, and students in Faisalabad.'
  },
  peshawar: {
    id: 'peshawar',
    src: '/src/assets/images/hero_peshawar_heritage_1791725084396.jpg',
    alt: 'Islamia College historic red-brick heritage architecture with ornate clock tower and domes under golden sunset in Peshawar KP Pakistan',
    landmark: 'Islamia College & Heritage Architecture, Peshawar',
    description: 'Culturally respectful psychotherapy honoring Pashtun traditions, offering confidential video and audio consultations across KP.'
  },
  multan: {
    id: 'multan',
    src: '/src/assets/images/hero_multan_saints_1791725110440.jpg',
    alt: 'Mausoleum of Shah Rukn-e-Alam in Multan Pakistan with grand terracotta dome and glazed cobalt blue kashi tiles in golden afternoon light',
    landmark: 'Tomb of Shah Rukn-e-Alam, Multan',
    description: 'Direct access to senior Lahore-trained clinical psychologists from the privacy of your home in Multan and South Punjab.'
  },
  'overseas-worldwide': {
    id: 'overseas-worldwide',
    src: '/src/assets/images/hero_overseas_global_1791725172444.jpg',
    alt: 'Global suspension bridge and international metropolis skyline with glowing digital connection lines symbolizing global telehealth for overseas Pakistanis',
    landmark: 'Global Telehealth Bridge · UK, USA, Gulf, Canada & Worldwide',
    description: 'Culturally native psychotherapy in Urdu and English for diaspora Pakistanis navigating expatriate stress and family dynamics.'
  }
};

// ==========================================
// CONDITIONS HERO BACKGROUND IMAGES (Every Condition Has Unique Relevant Scene)
// ==========================================
export const CONDITION_HERO_IMAGES: Record<string, HeroImageData> = {
  'anxiety-counselling': {
    id: 'anxiety-counselling',
    src: '/src/assets/images/hero_calm_sanctuary_1791725209855.jpg',
    alt: 'Tranquil mist lifting over serene pine mountain forest at sunrise with warm golden light, symbol of nervous system calming and anxiety relief',
    landmark: 'Calm Sanctuary · Nervous System Regulation',
    description: 'Gentle, evidence-based coping techniques for panic, persistent worry, and physical tension.'
  },
  'depression-counselling': {
    id: 'depression-counselling',
    src: '/src/assets/images/hero_therapy_haven_1791725247627.jpg',
    alt: 'Warm natural morning sunlight streaming through sheer curtains onto a cozy armchair with soft blanket and green plants, symbolizing emotional dawn and renewal',
    landmark: 'Dawn of Hope · Emotional Renewal & Behavioral Activation',
    description: 'Compassionate, structured recovery from exhaustion, loss of interest, and emotional heaviness.'
  },
  'stress-burnout': {
    id: 'stress-burnout',
    src: '/src/assets/images/hero_calm_sanctuary_1791725209855.jpg',
    alt: 'Quiet unhurried mountain landscape with soft morning light through pine trees, restoring depleted reserves from workplace burnout',
    landmark: 'Restorative Stillness · Depletion Recovery',
    description: 'Evidence-informed pacing and boundaries for corporate and academic burnout.'
  },
  'sleep-disorders': {
    id: 'sleep-disorders',
    src: '/src/assets/images/hero_therapy_haven_1791725247627.jpg',
    alt: 'Peaceful, dimly lit calming study sanctuary with warm lamp glow, soft cushions, and restful quietude for natural sleep restoration',
    landmark: 'Circadian Haven · CBT-I Restful Conditioning',
    description: 'Non-pharmacological cognitive behavioral interventions for chronic insomnia and bedtime racing thoughts.'
  },
  'health-anxiety': {
    id: 'health-anxiety',
    src: '/src/assets/images/hero_therapy_session_1791220159037.jpg',
    alt: 'Confidential clinical discussion room with licensed psychologist providing evidence-based somatic reassurance',
    landmark: 'Clinical Grounding · Somatic Symptom Reassurance',
    description: 'Breaking the cycle of excessive symptom checking, internet reassurance-seeking, and bodily catastrophizing.'
  },
  'anger-management': {
    id: 'anger-management',
    src: '/src/assets/images/hero_calm_sanctuary_1791725209855.jpg',
    alt: 'Deep emerald mountain valley with gentle breeze and calm morning clarity, symbolizing temper regulation and emotional mastery',
    landmark: 'Emotional Cooling · Impulse Regulation',
    description: 'Cognitive reframing, arousal identification, and assertive non-aggressive communication tools.'
  },
  'phobia-treatment': {
    id: 'phobia-treatment',
    src: '/src/assets/images/hero_calm_sanctuary_1791725209855.jpg',
    alt: 'Open mountain vista with gentle morning path and expansive blue sky, symbolizing gradual systematic desensitization and freedom from fear',
    landmark: 'Expansive Horizons · Systematic Desensitization',
    description: 'Gradual, clinician-guided exposure therapy for specific phobias, agoraphobia, and flight or social fears.'
  },
  'female-psychologist-online': {
    id: 'female-psychologist-online',
    src: '/src/assets/images/hero_therapy_haven_1791725247627.jpg',
    alt: 'Private, dignified consultation sanctuary with warm seating and soft lighting, designed for women seeking confidential mental healthcare',
    landmark: 'Discreet Sanctuary · Female Psychological Care',
    description: 'Safe, modest, and non-judgmental space with senior female licensed clinical psychologists.'
  },
  'ocd-treatment': {
    id: 'ocd-treatment',
    src: '/src/assets/images/hero_therapy_haven_1791725247627.jpg',
    alt: 'Harmonious, orderly consultation haven with warm bookshelves and soft ambient light, reflecting psychological flexibility and ERP progress',
    landmark: 'Psychological Clarity · Exposure & Response Prevention (ERP)',
    description: 'Gold-standard ERP therapy for intrusive thoughts, contamination doubts, symmetry obsessions, and mental compulsions.'
  },
  'ptsd-trauma-therapy': {
    id: 'ptsd-trauma-therapy',
    src: '/src/assets/images/hero_therapy_haven_1791725247627.jpg',
    alt: 'Warm, safe and sheltering therapeutic room with soft textures, warm oak accents, and peaceful sunlight, supporting nervous system stabilization',
    landmark: 'Safe Harbor · Trauma Processing & Somatic Grounding',
    description: 'Trauma-informed care using evidence-based stabilisation, narrative reframing, and safety establishment.'
  },
  'relationship-breakup': {
    id: 'relationship-breakup',
    src: '/src/assets/images/hero_couple_dialogue_1791725291461.jpg',
    alt: 'Compassionate therapeutic space for exploring relational distress, separation grief, and rediscovering personal emotional resilience',
    landmark: 'Relational Healing · Grief Processing & Self-Rebuilding',
    description: 'Navigating separation pain, uncoupling grief, betrayal trauma, and rebuilding healthy emotional boundaries.'
  },
  'grief-loss': {
    id: 'grief-loss',
    src: '/src/assets/images/hero_calm_sanctuary_1791725209855.jpg',
    alt: 'Gentle sunrise through mountain morning mist, quiet reverence and enduring hope honoring the memory of loved ones',
    landmark: 'Reverent Space · Bereavement & Meaning Reconstruction',
    description: 'Gentle pacing for profound grief, bereavement after illness, and honoring attachment without judgment.'
  },
  'addiction-counselling': {
    id: 'addiction-counselling',
    src: '/src/assets/images/hero_calm_sanctuary_1791725209855.jpg',
    alt: 'Sturdy winding trail leading up a tranquil green ridge toward the rising sun, symbolizing the steady journey of recovery and renewal',
    landmark: 'Journey of Renewal · Relapse Prevention & Behavioral Retraining',
    description: 'Confidential motivational interviewing, urge-surfing techniques, and relapse prevention strategies.'
  },
  'anonymous-counselling': {
    id: 'anonymous-counselling',
    src: '/src/assets/images/heritage_clinical_consultation_1791269818478.jpg',
    alt: 'Heritage private consultation room with warm classic wooden paneling and strict medical privacy safeguards',
    landmark: 'Strict Discretion · Pseudonymous & Audio-Only Option',
    description: 'Complete privacy without identity disclosure. Audio-only consultations for sensitive personal concerns.'
  },
  'female-psychologist': {
    id: 'female-psychologist',
    src: '/src/assets/images/hero_therapy_haven_1791725247627.jpg',
    alt: 'Warm, welcoming clinical therapy room with plush armchair and natural light, dedicated to women mental health in Pakistan',
    landmark: 'Dedicated Care · Culturally Attuned Female Clinicians',
    description: 'Specialized consultations addressing postpartum mood, family pressures, academic expectations, and self-worth.'
  },
  'marriage-couple-counselling': {
    id: 'marriage-couple-counselling',
    src: '/src/assets/images/hero_couple_dialogue_1791725291461.jpg',
    alt: 'Compassionate couples therapy room with two comfortable armchairs facing each other by warm table and books, emotional attunement in progress',
    landmark: 'Attuned Connection · Gottman-Informed Marital Repair',
    description: 'De-escalating recurring arguments, rebuilding emotional safety, and navigating joint family challenges constructively.'
  },
  'family-counselling-therapy': {
    id: 'family-counselling-therapy',
    src: '/src/assets/images/hero_couple_dialogue_1791725291461.jpg',
    alt: 'Warm family therapy seating arrangement with natural daylight, promoting empathetic multi-generational dialogue',
    landmark: 'Systemic Harmony · Multi-Generational Dialogue',
    description: 'Systemic family therapy bridging parental expectations with young adult autonomy in Pakistani households.'
  },
  'child-teen-psychologist': {
    id: 'child-teen-psychologist',
    src: '/src/assets/images/hero_teen_counseling_1791725335471.jpg',
    alt: 'Warm, colorful and reassuring child & teen counseling room with sketchbooks, soft pastel cushions, study desk, and gentle garden window view',
    landmark: 'Creative Haven · Youth Emotional Regulation & Play-Informed Care',
    description: 'Safe, engaging space for behavioral challenges, school refusal, emotional dysregulation, and adolescent anxiety.'
  },
  'student-counselling': {
    id: 'student-counselling',
    src: '/src/assets/images/hero_teen_counseling_1791725335471.jpg',
    alt: 'Inspiring study space with notebooks, sketchpad, wooden desk, and natural morning sunlight, supporting academic and youth mental clarity',
    landmark: 'Academic Grounding · Exam Pressure & Future Clarity',
    description: 'Targeted support for CSS exam anxiety, board exam panic, MDCAT/ECAT pressure, and university transition.'
  }
};

/**
 * Get hero image data for any city
 */
export function getCityHeroImage(slugOrId: string): HeroImageData {
  const clean = (slugOrId || '').toLowerCase().trim();
  if (CITY_HERO_IMAGES[clean]) {
    return CITY_HERO_IMAGES[clean];
  }
  // Fallback to Lahore heritage
  return CITY_HERO_IMAGES.lahore;
}

/**
 * Get hero image data for any condition track
 */
export function getConditionHeroImage(slugOrId: string): HeroImageData {
  const clean = (slugOrId || '').toLowerCase().trim();
  if (CONDITION_HERO_IMAGES[clean]) {
    return CONDITION_HERO_IMAGES[clean];
  }
  // Generic fallback to calm sanctuary
  return CONDITION_HERO_IMAGES['anxiety-counselling'];
}
