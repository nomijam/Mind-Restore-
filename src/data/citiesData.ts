export interface CityInfo {
  id: string;
  slug: string;
  name: string;
  badge: string;
  headline: string;
  subheadline: string;
  serviceType: 'Online Tele-Mental Health' | 'Global Telehealth';
  clinicLocation?: string;
  description: string;
  localContext: string;
  sessionFormats: string[];
  languages: string[];
  paymentOptions: string[];
  availableSpecialistIds: string[];
  faqs: { question: string; answer: string }[];
}

export const CITIES_DATA: CityInfo[] = [
  {
    id: 'lahore',
    slug: 'lahore',
    name: 'Lahore',
    badge: 'Clinical Practice Established 1981 · Online Telehealth',
    headline: 'Online Psychological Counselling & Therapy in Lahore',
    subheadline:
      'Confidential online video and audio psychotherapy for individuals, couples, and families across Lahore and surrounding areas.',
    serviceType: 'Online Tele-Mental Health',
    description:
      'Lahore is where our clinical practice was founded in 1981. For over four decades, Life Reset Pakistan has provided high-trust, ethical psychotherapy in Lahore. Through secure, encrypted digital video and confidential voice consultations from the comfort of your home, our licensed clinical psychologists offer compassionate, evidence-based care.',
    localContext:
      'Living in Lahore brings vibrant culture alongside modern lifestyle pressures—traffic strain, competitive academic institutions (LUMS, FC College, King Edward, GCU), extended family expectations, and fast-paced professional demands. Our clinicians understand the unique domestic and social dynamics of Lahori households.',
    sessionFormats: [
      'Encrypted HD Video Consultation',
      'Confidential Voice Consultation',
      'Couples & Family Digital Sessions'
    ],
    languages: ['Urdu', 'English', 'Punjabi'],
    paymentOptions: ['Online Bank Transfer (Raast / IBFT)', 'JazzCash', 'EasyPaisa', 'Visa / MasterCard'],
    availableSpecialistIds: ['dr-farah-kamran', 'tariq-rehman', 'ayesha-malik'],
    faqs: [
      {
        question: 'How do Lahore residents connect for confidential consultations?',
        answer: 'You receive a secure, one-click encrypted video link or voice connection via WhatsApp or email. You can consult from your private room without traveling across Lahore traffic.'
      },
      {
        question: 'What session formats are available for Lahore clients?',
        answer: 'We offer encrypted HD video calls as well as voice-only consultations for clients who prefer audio privacy or have varying internet bandwidth.'
      },
      {
        question: 'How do I book a consultation in Lahore?',
        answer: 'You can book through our online intake form or directly message our reception via WhatsApp at +92 314 3162051.'
      }
    ]
  },
  {
    id: 'karachi',
    slug: 'karachi',
    name: 'Karachi',
    badge: 'Confidential Online Video Psychotherapy across Karachi',
    headline: 'Online Psychological Counselling for Karachi Residents',
    subheadline:
      'Evidence-based psychotherapy and counselling delivered via secure, encrypted digital video directly to your home in Clifton, DHA, Gulshan, PECHS, and across Karachi.',
    serviceType: 'Online Tele-Mental Health',
    description:
      'Karachi is Pakistan’s bustling economic metropolis, where high-pressure corporate deadlines, demanding commutes, and economic stressors often leave little room for self-care. Life Reset Pakistan provides confidential online psychotherapy tailored to Karachi professionals, university students, and families, removing the burden of traversing city traffic.',
    localContext:
      'Our Karachi clients frequently navigate acute workplace burnout, corporate performance anxiety, marital strain in nuclear and joint setups, and security-related chronic hyper-arousal. Online sessions provide a private sanctuary without stepping into traffic on Shahrah-e-Faisal.',
    sessionFormats: [
      'Encrypted HD Video Consultation',
      'Voice-Only Confidential Consultation',
      'Flexible Evening & Weekend Timings'
    ],
    languages: ['Urdu', 'English'],
    paymentOptions: ['Online Bank Transfer (Raast / IBFT)', 'JazzCash', 'EasyPaisa', 'Visa / MasterCard'],
    availableSpecialistIds: ['dr-farah-kamran', 'tariq-rehman', 'ayesha-malik'],
    faqs: [
      {
        question: 'Are online video sessions as effective as traditional clinic visits?',
        answer: 'Yes. Clinical studies confirm that evidence-based modalities like CBT, ACT, and ERP are just as effective online as traditional clinic consultations, while offering complete privacy from friends and colleagues.'
      },
      {
        question: 'Are evening or after-work slots available for corporate professionals?',
        answer: 'Yes, our clinicians offer flexible evening and Saturday consultation slots tailored to professional schedules.'
      },
      {
        question: 'Can I do audio-only sessions if I have internet bandwidth issues?',
        answer: 'Yes, our platform smoothly supports voice-only consultations if connectivity fluctuates or if you prefer voice privacy.'
      }
    ]
  },
  {
    id: 'islamabad-rawalpindi',
    slug: 'islamabad-rawalpindi',
    name: 'Islamabad & Rawalpindi',
    badge: 'Federal Capital & Twin Cities Clinical Care',
    headline: 'Psychological Support for Islamabad & Rawalpindi',
    subheadline:
      'Confidential psychotherapy and mental wellness care for government professionals, diplomats, development sector workers, and families in the Twin Cities.',
    serviceType: 'Online Tele-Mental Health',
    description:
      'Life Reset Pakistan provides structured, private psychological counselling for residents of Islamabad (F, G, E, and Bahria sectors) and Rawalpindi. Our senior clinicians work extensively with civil servants, development sector and NGO professionals, tech entrepreneurs, and university students facing stress and emotional strain.',
    localContext:
      'Clients in Islamabad and Rawalpindi often experience unique career pressures—competitive civil service examinations (CSS), high-stakes public sector responsibilities, relocation adjustments for expatriates and diplomats, and balancing traditional twin-city family expectations.',
    sessionFormats: [
      'Encrypted HD Video Consultation',
      'Voice-Only Confidential Consultation',
      'Couples Joint Digital Sessions'
    ],
    languages: ['English', 'Urdu', 'Punjabi'],
    paymentOptions: ['Online Bank Transfer (Raast / IBFT)', 'JazzCash', 'EasyPaisa', 'Visa / MasterCard'],
    availableSpecialistIds: ['dr-farah-kamran', 'tariq-rehman', 'ayesha-malik'],
    faqs: [
      {
        question: 'Is strict discretion maintained for government and diplomatic personnel?',
        answer: 'Absolute 100% discretion. We adhere to international clinical confidentiality ethics; no records are disclosed to departments, agencies, or third parties.'
      },
      {
        question: 'Do you offer support for CSS exam anxiety and burnout?',
        answer: 'Yes. Our senior counselling psychologist Tariq Rehman specializes in academic performance conditioning, mind-blanking prevention, and exam stress management.'
      }
    ]
  },
  {
    id: 'faisalabad',
    slug: 'faisalabad',
    name: 'Faisalabad',
    badge: 'Confidential Tele-Mental Health for Faisalabad',
    headline: 'Online Clinical Psychology in Faisalabad',
    subheadline:
      'Discreet, culturally respectful mental wellness support for business leaders, textile professionals, homemakers, and students across Faisalabad.',
    serviceType: 'Online Tele-Mental Health',
    description:
      'In industrial and commercial hubs like Faisalabad, mental health concerns are often kept hidden due to strong social ties and fear of community gossip. Life Reset Pakistan offers a secure digital bridge, connecting you with elite clinical psychologists based in Lahore without anyone in your local circle knowing.',
    localContext:
      'Commercial entrepreneurship, family business succession friction, marital and joint family conflicts, and academic pressure are common themes among our Faisalabad clients.',
    sessionFormats: ['Encrypted HD Video Consultation', 'Confidential Voice Consultation'],
    languages: ['Urdu', 'Punjabi', 'English'],
    paymentOptions: ['Online Bank Transfer (Raast / IBFT)', 'JazzCash', 'EasyPaisa'],
    availableSpecialistIds: ['tariq-rehman', 'dr-farah-kamran', 'ayesha-malik'],
    faqs: [
      {
        question: 'Will anyone in Faisalabad know that I am consulting a psychologist?',
        answer: 'No. Sessions take place privately on your phone or laptop. We never share names, contacts, or clinical records with anyone.'
      }
    ]
  },
  {
    id: 'peshawar',
    slug: 'peshawar',
    name: 'Peshawar',
    badge: 'Culturally Grounded Psychological Support',
    headline: 'Online Mental Health Counselling in Peshawar & KP',
    subheadline:
      'Respectful, compassionate psychotherapy for individuals and families in Peshawar and Khyber Pakhtunkhwa, honoring local culture and traditions.',
    serviceType: 'Online Tele-Mental Health',
    description:
      'Life Reset Pakistan provides confidential online psychological care for clients in Peshawar, Hayatabad, Mardan, and across Khyber Pakhtunkhwa. We understand that modesty, honor, and family privacy are sacred values in KP, and our clinicians provide deeply respectful, non-judgmental guidance.',
    localContext:
      'Our clinicians address trauma recovery, domestic stress, female mental wellness, and student anxiety while deeply honoring Pashtun cultural ethos and Islamic principles.',
    sessionFormats: ['Encrypted HD Video Consultation', 'Voice-Only Consultation for Privacy'],
    languages: ['Urdu', 'English', 'Pashto-sensitive care'],
    paymentOptions: ['Online Bank Transfer (Raast / IBFT)', 'JazzCash', 'EasyPaisa'],
    availableSpecialistIds: ['dr-farah-kamran', 'ayesha-malik', 'tariq-rehman'],
    faqs: [
      {
        question: 'Can female clients consult a female psychologist with voice-only mode?',
        answer: 'Yes, absolutely. Our female clients frequently opt for voice-only calls with Dr. Farah Kamran or Ayesha Malik to ensure total comfort and privacy.'
      }
    ]
  },
  {
    id: 'multan',
    slug: 'multan',
    name: 'Multan',
    badge: 'Confidential Care for South Punjab',
    headline: 'Online Psychological Services in Multan',
    subheadline:
      'Evidence-based clinical psychology, depression and anxiety support for Multan, Bahawalpur, and South Punjab.',
    serviceType: 'Online Tele-Mental Health',
    description:
      'Access senior, qualified clinical psychologists from the comfort and privacy of your home in Multan. Avoid long travel to other cities while receiving the highest standard of evidence-based psychological therapy.',
    localContext:
      'Addressing anxiety, depression, agricultural/commercial business stress, marital compatibility, and youth career anxiety in South Punjab.',
    sessionFormats: ['Encrypted HD Video Consultation', 'Confidential Voice Consultation'],
    languages: ['Urdu', 'Punjabi / Saraiki-sensitive', 'English'],
    paymentOptions: ['Online Bank Transfer (Raast / IBFT)', 'JazzCash', 'EasyPaisa'],
    availableSpecialistIds: ['dr-farah-kamran', 'tariq-rehman'],
    faqs: [
      {
        question: 'How easy is it to connect from Multan?',
        answer: 'You receive a one-click private link via WhatsApp or email. No complicated software download is required.'
      }
    ]
  },
  {
    id: 'overseas-worldwide',
    slug: 'overseas-worldwide',
    name: 'Overseas Pakistanis (Worldwide)',
    badge: 'Global Diaspora Care · UK, USA, Gulf, Canada & Worldwide',
    headline: 'Psychological Support for Overseas Pakistanis Worldwide',
    subheadline:
      'Therapy in your native language with clinicians who truly understand Pakistani cultural values, family dynamics, and diaspora identity.',
    serviceType: 'Global Telehealth',
    description:
      'Living abroad in the United Kingdom, United States, UAE, Saudi Arabia, Canada, or Australia often brings distinct psychological challenges: cultural isolation, diaspora identity conflict, loneliness, long-distance family guilt, and finding a local therapist who truly understands South Asian joint family dynamics and Muslim values. Life Reset Pakistan offers international video appointments tailored to global time zones.',
    localContext:
      'Western therapists often misunderstand cultural expectations around parent reverence, rishta arrangements, and extended family duties. Our registered psychologists provide culturally native psychotherapy that bridges your Eastern heritage with your Western lifestyle.',
    sessionFormats: [
      'Flexible Global Time Zone Video Sessions',
      'Confidential Audio Consultation',
      'Couples Relational Therapy across Borders'
    ],
    languages: ['English', 'Urdu', 'Punjabi'],
    paymentOptions: ['International Debit/Credit Cards (Stripe)', 'International Wire', 'PayPal / Remittance'],
    availableSpecialistIds: ['dr-farah-kamran', 'tariq-rehman', 'ayesha-malik'],
    faqs: [
      {
        question: 'How do time zones work for overseas clients?',
        answer: 'We coordinate appointments across UK (GMT), Gulf (GST), Europe (CET), and North American time zones (EST/PST) with dedicated early morning and late evening PKT slots.'
      },
      {
        question: 'How do I pay from outside Pakistan?',
        answer: 'We provide secure international card payment links in USD, GBP, or AED.'
      },
      {
        question: 'Why choose a Pakistani clinical psychologist while living abroad?',
        answer: 'You never have to spend half your session explaining what "in-laws," "izzat," or family expectations mean. Shared cultural grounding accelerates deep healing.'
      }
    ]
  }
];

export function findCity(idOrSlug: string): CityInfo | undefined {
  if (!idOrSlug) return undefined;
  const clean = idOrSlug.toLowerCase().trim();
  return CITIES_DATA.find((c) => c.id === clean || c.slug === clean);
}
