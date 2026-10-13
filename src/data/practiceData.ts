import {
  Specialist,
  ServiceDetail,
  ConditionItem,
  EducationalTool,
  ResourceArticle,
  PatientTestimonial,
  TimelineMilestone,
  PracticeSettings,
} from '../types';
import { CONDITIONS_DATA } from './conditionsData';

import heritageHeroImg from '../assets/images/heritage_clinical_consultation_1791269818478.webp';
import heritageHeroMobileWebp from '../assets/images/heritage_clinical_consultation_mobile.webp';
import drFarahImg from '../assets/images/psychologist_dr_farah_1791220174235.webp';
import drTariqImg from '../assets/images/psychologist_dr_tariq_1791220192786.webp';
import drAyeshaImg from '../assets/images/psychologist_dr_ayesha_1791220207594.webp';
import resourcesImg from '../assets/images/resources_wellness_journal_1791220222535.webp';

export { heritageHeroImg, heritageHeroMobileWebp, drFarahImg, drTariqImg, drAyeshaImg, resourcesImg };

export const DEFAULT_SETTINGS: PracticeSettings = {
  organizationName: 'MindSukoon',
  foundedYear: 1981,
  heritageTagline: 'Trusted mental-health care since 1981, combining decades of experience with modern psychological support.',
  phoneDisplay: '+92 314 3162051',
  phoneNumber: '+923143162051',
  whatsappDisplayNumber: '+92 314 3162051',
  whatsappNumber: '923143162051',
  email: 'care@mindsukoon.pk',
  inPersonClinicAddress: '14-A Healthcare Avenue, Gulberg III, Lahore, Pakistan',
  hoursOfOperation: 'Monday – Saturday: 9:00 AM – 7:30 PM PKT (Digital Appointments Accommodate Overseas Time Zones)',
  feeGuidanceText: 'Fees vary depending on service and professional. Transparent pricing is provided prior to confirming your appointment.',
  standardInitialFeePkr: 4000,
  standardFollowUpFeePkr: 3500,
  standardOverseasFeeUsd: 30,
  ghlWebhookUrl: '',
  emergencyNotice: {
    pakistanHotline: 'Umang Tele-Mental Health Helpline: 0311-7786264',
    pakistanEmergency: 'Rescue Emergency: 1122',
    internationalAdvice: 'If you are outside Pakistan, please dial your local emergency service (e.g. 111 / 999 in UK, 988 in USA/Canada, 800-HOPE in UAE) or go to the nearest hospital emergency department.',
  },
};

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '1981',
    title: 'Organization Founded',
    description: 'Established as a dedicated clinical psychology consultation centre, providing compassionate, confidential mental healthcare.',
    isVerified: true,
  },
  {
    year: '1995',
    title: 'Outpatient Services Expanded',
    description: 'Expanded clinical capabilities to include specialized child, adolescent, and family counselling services.',
    isVerified: true,
  },
  {
    year: '2008',
    title: 'Psychological Assessment Facility',
    description: 'Introduced formal psychometric evaluations and neurodevelopmental diagnostic testing capabilities.',
    isVerified: true,
  },
  {
    year: '2020',
    title: 'Digital Services & Telehealth Introduced',
    description: 'Launched encrypted online video and audio consultations for clients across Pakistan and overseas diaspora.',
    isVerified: true,
  },
  {
    year: '2026',
    title: 'Modern Psychological Care',
    description: 'Combining over four decades of trusted institutional experience with contemporary evidence-informed therapies.',
    isVerified: true,
  },
];

export const CORE_VALUES = [
  {
    title: 'COMPASSION',
    tagline: 'We listen without judgement.',
    description: 'Every person who reaches out is met with genuine human empathy and emotional warmth.',
  },
  {
    title: 'DIGNITY',
    tagline: 'Every person deserves respect.',
    description: 'We honour individual autonomy, cultural identity, and personal life experiences with profound respect.',
  },
  {
    title: 'CONFIDENTIALITY',
    tagline: 'Privacy is central to professional care.',
    description: 'Strict adherence to medical privacy and international psychotherapeutic confidentiality standards.',
  },
  {
    title: 'PROFESSIONALISM',
    tagline: 'We follow appropriate professional standards.',
    description: 'Our specialists hold verified academic degrees, clinical registrations, and ongoing peer supervision.',
  },
  {
    title: 'CONTINUOUS LEARNING',
    tagline: 'We continue to evolve with modern psychological knowledge.',
    description: 'Grounded in our 1981 roots, we actively integrate updated clinical research, CBT, ACT, and somatic modalities.',
  },
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'dr-farah-kamran',
    name: 'Dr. Farah Kamran',
    title: 'Consultant Clinical Psychologist',
    credentials: ['M.Phil. in Clinical Psychology (Punjab University)', 'Ph.D. in Clinical Psychology', 'Certified CBT Practitioner'],
    registrationNumber: 'Pakistan Clinical Psychology Association (PCPA #4192)',
    yearsExperience: 18,
    image: drFarahImg,
    languages: ['English', 'Urdu', 'Punjabi'],
    specialization: ['Anxiety & Panic Disorders', 'Clinical Depression', 'Trauma & Grief', 'Adult Life Transitions'],
    sessionFormats: ['Online Video', 'Voice Consultation'],
    about: 'Dr. Farah Kamran has practiced clinical psychology for nearly two decades, working with individuals navigating deep-seated emotional pain, chronic anxiety, and complex life transitions. Her approach combines Cognitive Behavioural Therapy with psychodynamic depth and cultural understanding.',
    therapeuticApproaches: ['Cognitive Behavioural Therapy (CBT)', 'Acceptance and Commitment Therapy (ACT)', 'Trauma-Informed Therapy'],
    whoTheyWorkWith: ['Adults (18+)', 'Senior Professionals', 'Diaspora Expatriates', 'Couples'],
    availability: 'Monday, Tuesday, Thursday: 10:00 AM – 5:00 PM PKT',
    consultationFeeGuide: 'Standard Consultation Rate',
    gender: 'Female',
  },
  {
    id: 'tariq-rehman',
    name: 'Tariq Rehman, M.Sc.',
    title: 'Senior Counselling Psychologist',
    credentials: ['M.Sc. Counselling Psychology (Quaid-i-Azam University)', 'Diploma in Rational Emotive Behaviour Therapy (REBT)'],
    registrationNumber: 'Pakistan Psychological Association (PPA #1883)',
    yearsExperience: 12,
    image: drTariqImg,
    languages: ['English', 'Urdu'],
    specialization: ['Stress & Professional Burnout', 'Anger Management', 'Men’s Mental Health', 'OCD & Intrusive Thoughts'],
    sessionFormats: ['Online Video', 'Voice Consultation'],
    about: 'Tariq Rehman focuses on practical, collaborative counselling to assist clients in resolving workplace exhaustion, emotional reactivity, and obsessive thought loops. His sessions provide a supportive, solution-oriented space for meaningful reflection.',
    therapeuticApproaches: ['Rational Emotive Behaviour Therapy (REBT)', 'Solution-Focused Brief Therapy (SFBT)', 'Mindfulness-Based Stress Reduction'],
    whoTheyWorkWith: ['Adults', 'Young Adults & University Students', 'Corporate Professionals'],
    availability: 'Tuesday to Saturday: 11:00 AM – 7:00 PM PKT',
    consultationFeeGuide: 'Standard Consultation Rate',
    gender: 'Male',
  },
  {
    id: 'ayesha-malik',
    name: 'Ayesha Malik, M.Phil.',
    title: 'Child, Adolescent & Relationship Psychologist',
    credentials: ['M.Phil. Applied Psychology (GCU Lahore)', 'Certified Emotionally Focused Couples Therapist (EFT)'],
    registrationNumber: 'Registered Clinical Practitioner (PPA #2640)',
    yearsExperience: 10,
    image: drAyeshaImg,
    languages: ['English', 'Urdu'],
    specialization: ['Couples & Relationship Counselling', 'Child & Adolescent Support', 'Self-Esteem & Identity', 'Family Communication'],
    sessionFormats: ['Online Video', 'Voice Consultation'],
    about: 'Ayesha Malik is dedicated to relational health and youth well-being. She provides a warm, safe sanctuary for couples in distress and young people encountering social anxiety, school pressure, or emotional insecurity.',
    therapeuticApproaches: ['Emotionally Focused Therapy (EFT)', 'Attachment-Based Therapy', 'Play & Behavioural Guidance for Adolescents'],
    whoTheyWorkWith: ['Couples (Married / Engaged)', 'Adolescents (Ages 12–19)', 'Parents & Families'],
    availability: 'Monday, Wednesday, Friday: 12:00 PM – 6:30 PM PKT',
    consultationFeeGuide: 'Standard Consultation Rate',
    gender: 'Female',
  },
];

export const CONDITIONS: ConditionItem[] = CONDITIONS_DATA;

export const SERVICES: ServiceDetail[] = [
  {
    id: 'individual-counselling',
    slug: 'individual-counselling',
    title: 'Individual Psychological Counselling',
    shortDescription: 'One-on-one confidential psychotherapy designed to help you understand emotional challenges and develop healthy coping tools.',
    iconName: 'User',
    overview: 'Individual counselling offers a private, non-judgemental space to reflect on what is happening in your life. Our psychologists listen with deep empathy and work collaboratively with you.',
    indications: ['Anxiety, panic or persistent stress', 'Depression, numbness or low motivation', 'Self-esteem concerns or difficult life transitions', 'Processing grief, loss or personal confusion'],
    howWeHelp: ['Identifying recurring thought and behaviour patterns', 'Equipping you with practical cognitive regulation tools', 'Fostering self-compassion and healthier personal boundaries'],
    sessionFormat: '50-minute private appointment available via secure online video or confidential voice consultation.',
    suitableFor: ['Adults of all ages seeking clarity, emotional relief, and sustainable psychological health.'],
    approaches: ['Cognitive Behavioural Therapy (CBT)', 'Acceptance & Commitment Therapy (ACT)', 'Person-Centred Psychotherapy'],
    faqs: [
      {
        question: 'Are sessions strictly confidential?',
        answer: 'Yes. All consultations adhere to strict professional ethical codes. What you share remains entirely between you and your psychologist.',
      },
      {
        question: 'How many sessions will I need?',
        answer: 'This depends on your personal goals and needs. Many clients find meaningful relief within 4 to 8 sessions, while others choose ongoing support.',
      },
    ],
  },
  {
    id: 'couples-counselling',
    slug: 'couples-counselling',
    title: 'Couples Counselling',
    shortDescription: 'Supportive joint sessions for partners seeking to improve communication, resolve recurring conflict, and rebuild intimacy.',
    iconName: 'HeartHandshake',
    overview: 'Relationships encounter seasons of strain. Couples counselling provides an objective, neutral setting to de-escalate hurtful cycles and re-establish emotional safety.',
    indications: ['Recurring arguments that leave both partners exhausted', 'Erosion of trust, emotional closeness, or affection', 'Navigating major life adjustments or external pressures'],
    howWeHelp: ['Facilitating calm, respectful conversations where both voices are heard', 'Uncovering the unmet emotional needs beneath conflict', 'Practicing practical de-escalation strategies for daily life'],
    sessionFormat: '60-minute joint consultation with experienced relationship psychologists.',
    suitableFor: ['Married, engaged, or committed couples seeking to strengthen their bond.'],
    approaches: ['Emotionally Focused Therapy (EFT)', 'Attachment-Based Relational Therapy'],
    faqs: [
      {
        question: 'Does the therapist take sides?',
        answer: 'Never. Our clinicians are neutral facilitators. The priority is the wellbeing and health of the relationship dynamic itself.',
      },
    ],
  },
  {
    id: 'family-counselling',
    slug: 'family-counselling',
    title: 'Family Counselling',
    shortDescription: 'Bridging generational divides, resolving family tension, and nurturing mutual understanding within family systems.',
    iconName: 'Home',
    overview: 'Family systems are central to our identity, but misaligned expectations and generational gaps can cause significant distress. We help families communicate with clarity and dignity.',
    indications: ['Parent-child miscommunication and estrangement', 'Joint family boundary challenges', 'Supporting a family member through illness or crisis'],
    howWeHelp: ['Creating a respectful forum where every member can speak safely', 'Developing mutual respect between generational viewpoints', 'Establishing supportive boundaries that preserve familial affection'],
    sessionFormat: 'Joint family sessions (secure online video or multi-location digital call).',
    suitableFor: ['Families wishing to resolve conflict, rebuild connection, and support each other.'],
    approaches: ['Systemic Family Therapy', 'Narrative Dialogue'],
    faqs: [
      {
        question: 'Can family members attend from different locations?',
        answer: 'Yes. Our digital platform allows family members in different cities or countries to join the same secure session.',
      },
    ],
  },
  {
    id: 'child-adolescent-support',
    slug: 'child-adolescent-support',
    title: 'Child & Adolescent Support',
    shortDescription: 'Empathetic guidance for young people experiencing academic anxiety, behavioral changes, or emotional distress.',
    iconName: 'Sparkles',
    overview: 'Young people often express emotional pain through withdrawal, changes in school performance, or behavioral defiance. We offer gentle, age-appropriate psychological care.',
    indications: ['School dread, exam stress, and perfectionism', 'Sudden withdrawal from friends or family', 'Mood swings, anger, or low self-esteem in teens'],
    howWeHelp: ['Providing an authentic, non-judgemental outlet for youth to express feelings', 'Teaching lifelong emotional regulation and healthy communication tools', 'Offering constructive parenting guidance to reinforce progress at home'],
    sessionFormat: 'One-on-one sessions combined with collaborative parental check-ins.',
    suitableFor: ['Children and adolescents (ages 10–19) and their parents.'],
    approaches: ['Cognitive Behavioural Skills', 'Solution-Focused Dialogue', 'Play & Creative Expression'],
    faqs: [
      {
        question: 'How are parents involved in adolescent sessions?',
        answer: 'Parents typically participate in initial assessment and closing recommendations, while the adolescent enjoys private confidential time to speak openly.',
      },
    ],
  },
  {
    id: 'trauma-support',
    slug: 'trauma-support',
    title: 'Trauma Support',
    shortDescription: 'Gentle, paced processing of past adverse experiences, bereavement, or sudden life shocks in a secure clinical setting.',
    iconName: 'ShieldAlert',
    overview: 'Trauma can leave the nervous system feeling continually unsafe. Our trauma care prioritizes gentle stabilization, physiological grounding, and safety above all else.',
    indications: ['Intrusive memories, flashbacks, or persistent nightmares', 'Physical hyper-reactivity, panic, or profound numbness', 'Difficulty feeling secure in interpersonal relationships'],
    howWeHelp: ['Building somatic stabilization skills to calm acute distress', 'Paced processing that never retraumatizes or rushes the client', 'Re-anchoring your present life in safety and autonomy'],
    sessionFormat: '50-minute specialized trauma psychotherapy appointments.',
    suitableFor: ['Adults who have experienced past adverse events, loss, or distress.'],
    approaches: ['Trauma-Informed CBT', 'Somatic Stabilization Principles'],
    faqs: [
      {
        question: 'Do I have to recount everything right away?',
        answer: 'No. You are always in control of what you share and when. We spend initial sessions focusing on feeling calm and safe in your body today.',
      },
    ],
  },
  {
    id: 'stress-management',
    slug: 'stress-management',
    title: 'Stress Management',
    shortDescription: 'Evidence-informed frameworks to counter chronic exhaustion, restore vitality, and build sustainable boundaries.',
    iconName: 'Flame',
    overview: 'Chronic stress damages cognitive clarity and physical health. We help you audit what is depleting your energy and implement practical lifestyle and cognitive resets.',
    indications: ['Feeling overwhelmed by workplace or academic pressure', 'Inability to mentally disconnect during rest hours', 'Physical fatigue, sleep disturbance, and tension headaches'],
    howWeHelp: ['Identifying personal stress triggers and physiological warning signs', 'Developing assertive boundary-setting scripts without guilt', 'Implementing daily nervous system down-regulation practices'],
    sessionFormat: 'Individual sessions with practical worksheets and action plans.',
    suitableFor: ['Professionals, caregivers, students, and leaders facing prolonged strain.'],
    approaches: ['Mindfulness-Based Stress Reduction (MBSR)', 'CBT for Perfectionism'],
    faqs: [
      {
        question: 'How quickly can I notice improvements?',
        answer: 'Clients often feel substantial relief after establishing immediate emergency boundaries in their first few sessions.',
      },
    ],
  },
  {
    id: 'psychological-assessment',
    slug: 'psychological-assessment',
    title: 'Psychological Assessment',
    shortDescription: 'Formal psychometric testing, cognitive assessments, and comprehensive psychological profiles.',
    iconName: 'ClipboardList',
    overview: 'Standardized psychological assessments provide structured clarity regarding cognitive abilities, attention profiles, personality traits, and emotional functioning.',
    indications: ['Clarifying diagnostic uncertainty or learning patterns', 'Attention and executive functioning evaluations (ADHD/focus)', 'Formal clinical reports for medical, educational or workplace context'],
    howWeHelp: ['Administering standardized psychometric instruments', 'Providing a compassionate debriefing session to explain findings in plain language', 'Delivering a detailed written report with actionable recommendations'],
    sessionFormat: 'Comprehensive virtual evaluation sessions followed by a detailed clinical debrief.',
    suitableFor: ['Children, adolescents, and adults seeking formal diagnostic clarification.'],
    approaches: ['Standardized Psychometric Testing', 'Clinical Diagnostic Interviews'],
    faqs: [
      {
        question: 'How long does a psychological evaluation take?',
        answer: 'Testing usually requires 1 to 2 focused clinical sessions via secure tele-health, followed by scoring and a collaborative feedback discussion.',
      },
    ],
  },
  {
    id: 'behavioural-support',
    slug: 'behavioural-support',
    title: 'Behavioural Support',
    shortDescription: 'Structured interventions for compulsive habits, anger reactions, phobias, and avoidance behaviors.',
    iconName: 'Zap',
    overview: 'When repetitive habits or intense reactions feel out of control, behavioural therapy provides structured, step-by-step frameworks to replace destructive responses with intentional choices.',
    indications: ['Obsessive-compulsive rituals and checking habits', 'Intense anger outbursts causing interpersonal regret', 'Specific phobias or behavioral avoidance'],
    howWeHelp: ['Deconstructing the stimulus-response cycle behind the habit', 'Step-by-step graduated exposure experiments', 'Equipping you with grounding substitute behaviors'],
    sessionFormat: 'Practical 50-minute structured therapy sessions.',
    suitableFor: ['Individuals seeking practical, behavioral change for specific symptoms.'],
    approaches: ['Exposure and Response Prevention (ERP)', 'Behavioural Activation'],
    faqs: [
      {
        question: 'Does this therapy involve homework?',
        answer: 'Yes, collaborative weekly exercises between sessions are a key part of making changes in real daily life.',
      },
    ],
  },
  {
    id: 'online-counselling',
    slug: 'online-counselling',
    title: 'Online Counselling',
    shortDescription: 'Convenient, confidential tele-psychology via encrypted video or audio for clients across Pakistan and globally.',
    iconName: 'Monitor',
    overview: 'Online counselling delivers evidence-based clinical excellence, removing geographical and commute barriers.',
    indications: ['Living in cities with limited qualified psychologists', 'Overseas Pakistani diaspora seeking an Urdu/English speaking therapist', 'Busy schedules or mobility limitations'],
    howWeHelp: ['Secure video or telephone consultations from your private room', 'Flexible scheduling across international time zones', 'Zero travel stress or clinic waiting room visibility'],
    sessionFormat: 'Encrypted Google Meet, Zoom, or WhatsApp Voice appointments.',
    suitableFor: ['Clients across Pakistan, UK, UAE, Saudi Arabia, USA, Canada, and remote areas.'],
    approaches: ['All standard modalities adapted for secure digital delivery'],
    faqs: [
      {
        question: 'How effective is online counselling?',
        answer: 'Extensive clinical research demonstrates that secure online psychotherapy achieves equivalent clinical outcomes to traditional clinic settings for anxiety, depression, and stress, with greater privacy and convenience.',
      },
    ],
  },
  {
    id: 'overseas-diaspora-counselling',
    slug: 'overseas-diaspora-counselling',
    title: 'Overseas & Diaspora Support',
    shortDescription: 'Culturally attuned digital therapy in Urdu and English for Pakistanis living in the UK, Gulf, North America and Europe.',
    iconName: 'Globe',
    overview: 'Living away from Pakistan brings unique challenges: isolation, expatriate burnout, cultural identity navigation, and long-distance family pressures. Our clinicians offer culturally resonant care that understands your background.',
    indications: ['Expatriate adjustment stress and loneliness', 'Long-distance family obligations and generational expectations', 'Desire to speak freely in Urdu or English with a culturally native clinician'],
    howWeHelp: ['Flexible scheduling tailored across UK (GMT), Gulf (GST), and US/Canada time zones', 'Culturally fluent understanding of Pakistani family dynamics without needing explanation', 'Safe, encrypted digital platform with international payment options'],
    sessionFormat: '50-minute secure video or private audio consultation.',
    suitableFor: ['Pakistani expatriates, international students, and diaspora families worldwide.'],
    approaches: ['Culturally Attuned Psychotherapy', 'Cognitive Behavioural Therapy (CBT)', 'Systemic Family Dynamics'],
    faqs: [
      {
        question: 'How do time zone differences work for overseas bookings?',
        answer: 'We offer flexible slots accommodating UK, European, Middle Eastern, and North American time zones.',
      },
    ],
  },
];

export const EDUCATIONAL_TOOLS: EducationalTool[] = [
  {
    id: 'stress-check',
    title: 'Stress Check',
    subtitle: 'Evaluate your recent experience of overload, tension, and perceived control.',
    estimatedMinutes: 2,
    scientificContext: 'Informed by the clinically recognized Perceived Stress Scale (PSS).',
    disclaimer: 'This tool is for educational or screening purposes only. It is not a diagnosis and should not replace assessment by a qualified professional.',
    questions: [
      {
        id: 1,
        question: 'In the last month, how often have you felt that you were unable to control important things in your life?',
        options: [
          { label: 'Never', score: 0 },
          { label: 'Sometimes', score: 1 },
          { label: 'Fairly often', score: 2 },
          { label: 'Very often', score: 3 },
        ],
      },
      {
        id: 2,
        question: 'In the last month, how often have you felt nervous and stressed?',
        options: [
          { label: 'Never', score: 0 },
          { label: 'Sometimes', score: 1 },
          { label: 'Fairly often', score: 2 },
          { label: 'Very often', score: 3 },
        ],
      },
      {
        id: 3,
        question: 'In the last month, how often have you felt confident in your ability to handle personal problems?',
        options: [
          { label: 'Very often', score: 0 },
          { label: 'Fairly often', score: 1 },
          { label: 'Sometimes', score: 2 },
          { label: 'Never', score: 3 },
        ],
      },
      {
        id: 4,
        question: 'In the last month, how often have you felt that difficulties were piling up so high you could not overcome them?',
        options: [
          { label: 'Never', score: 0 },
          { label: 'Sometimes', score: 1 },
          { label: 'Fairly often', score: 2 },
          { label: 'Very often', score: 3 },
        ],
      },
    ],
    scoreRanges: [
      {
        minScore: 0,
        maxScore: 4,
        level: 'Mild or Low Stress',
        summary: 'Your current demands appear manageable within your coping capacity.',
        nextStep: 'Continue your regular self-care routines, adequate sleep, and downtime.',
      },
      {
        minScore: 5,
        maxScore: 8,
        level: 'Moderate Perceived Stress',
        summary: 'Recent pressures may be stretching your emotional reserves and flexibility.',
        nextStep: 'Consider identifying the primary demands depleting your energy and scheduling non-negotiable rest.',
      },
      {
        minScore: 9,
        maxScore: 12,
        level: 'High Perceived Stress',
        summary: 'Your current pressures significantly outweigh your perceived coping resources.',
        nextStep: 'Speaking with an experienced counsellor can help you untangle overwhelming demands and re-establish equilibrium.',
      },
    ],
  },
  {
    id: 'anxiety-check',
    title: 'Anxiety Check',
    subtitle: 'Screen for symptoms of worry, physical restlessness, and tension over the past 2 weeks.',
    estimatedMinutes: 3,
    scientificContext: 'Informed by the Generalized Anxiety Disorder 7-item (GAD-7) screening instrument.',
    disclaimer: 'This tool is for educational or screening purposes only. It is not a diagnosis and should not replace assessment by a qualified professional.',
    questions: [
      {
        id: 1,
        question: 'Feeling nervous, anxious, or on edge?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 2,
        question: 'Not being able to stop or control worrying?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 3,
        question: 'Worrying too much about different things?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 4,
        question: 'Trouble relaxing or sitting still?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 5,
        question: 'Becoming easily annoyed or irritable?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
    ],
    scoreRanges: [
      {
        minScore: 0,
        maxScore: 4,
        level: 'Minimal Anxiety Symptoms',
        summary: 'Your responses indicate low anxiety consistent with ordinary daily life.',
        nextStep: 'Maintain balanced sleep and mindful check-ins with yourself.',
      },
      {
        minScore: 5,
        maxScore: 9,
        level: 'Mild to Moderate Anxiety Symptoms',
        summary: 'You may be experiencing noticeable tension that occasionally impacts concentration.',
        nextStep: 'Learning cognitive restructuring and diaphragmatic breathing can help calm your nervous system.',
      },
      {
        minScore: 10,
        maxScore: 15,
        level: 'Significant Anxiety Symptoms',
        summary: 'Anxiety appears to be causing notable discomfort and disruption in your daily life.',
        nextStep: 'We encourage you to arrange a confidential session with a clinical psychologist to explore targeted coping strategies.',
      },
    ],
  },
  {
    id: 'mood-check',
    title: 'Mood Check',
    subtitle: 'Screen for symptoms of low mood, fatigue, and loss of interest over the past 2 weeks.',
    estimatedMinutes: 3,
    scientificContext: 'Informed by the Patient Health Questionnaire-9 (PHQ-9) clinical framework.',
    disclaimer: 'This tool is for educational or screening purposes only. It is not a diagnosis and should not replace assessment by a qualified professional.',
    questions: [
      {
        id: 1,
        question: 'Little interest or pleasure in doing things you normally enjoy?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 2,
        question: 'Feeling down, depressed, or hopeless?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 3,
        question: 'Trouble falling or staying asleep, or sleeping too much?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 4,
        question: 'Feeling tired or having very little energy?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 5,
        question: 'Feeling bad about yourself, or that you are a failure or let your family down?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'Several days', score: 1 },
          { label: 'More than half the days', score: 2 },
          { label: 'Nearly every day', score: 3 },
        ],
      },
    ],
    scoreRanges: [
      {
        minScore: 0,
        maxScore: 4,
        level: 'Minimal Low Mood',
        summary: 'Your mood appears within expected baseline fluctuations.',
        nextStep: 'Continue prioritizing restful sleep, nourishing meals, and meaningful connections.',
      },
      {
        minScore: 5,
        maxScore: 9,
        level: 'Mild Depressive Signs',
        summary: 'You may be feeling weighed down or depleted by recent events.',
        nextStep: 'Discussing what is depleting you in a compassionate space can prevent feelings from hardening.',
      },
      {
        minScore: 10,
        maxScore: 15,
        level: 'Noticeable Mood Distress',
        summary: 'Your answers reflect persistent heaviness that is affecting your vitality and daily ease.',
        nextStep: 'You do not have to carry this alone. A clinical psychologist can guide you through paced recovery steps.',
      },
    ],
  },
  {
    id: 'burnout-check',
    title: 'Burnout Check',
    subtitle: 'Measure feelings of emotional depletion and detachment from work or caregiving.',
    estimatedMinutes: 2,
    scientificContext: 'Informed by research on occupational burnout and emotional exhaustion.',
    disclaimer: 'This tool is for educational or screening purposes only. It is not a diagnosis and should not replace assessment by a qualified professional.',
    questions: [
      {
        id: 1,
        question: 'I feel emotionally drained from my daily work or responsibilities.',
        options: [
          { label: 'Rarely', score: 0 },
          { label: 'Sometimes', score: 1 },
          { label: 'Frequently', score: 2 },
          { label: 'Almost constantly', score: 3 },
        ],
      },
      {
        id: 2,
        question: 'I feel used up at the end of the day.',
        options: [
          { label: 'Rarely', score: 0 },
          { label: 'Sometimes', score: 1 },
          { label: 'Frequently', score: 2 },
          { label: 'Almost constantly', score: 3 },
        ],
      },
      {
        id: 3,
        question: 'I have become more cynical or detached regarding my responsibilities.',
        options: [
          { label: 'Rarely', score: 0 },
          { label: 'Sometimes', score: 1 },
          { label: 'Frequently', score: 2 },
          { label: 'Almost constantly', score: 3 },
        ],
      },
      {
        id: 4,
        question: 'I feel that even weekends or days off do not fully restore my energy.',
        options: [
          { label: 'Rarely', score: 0 },
          { label: 'Sometimes', score: 1 },
          { label: 'Frequently', score: 2 },
          { label: 'Almost constantly', score: 3 },
        ],
      },
    ],
    scoreRanges: [
      {
        minScore: 0,
        maxScore: 3,
        level: 'Healthy Reserves',
        summary: 'Your current workload and recovery habits are in reasonable balance.',
        nextStep: 'Maintain your current routines and protect restorative weekends.',
      },
      {
        minScore: 4,
        maxScore: 7,
        level: 'Early Burnout Warning',
        summary: 'Prolonged demands are steadily eroding your patience and recovery time.',
        nextStep: 'Establish firm end-of-day boundaries and disconnect from communications after hours.',
      },
      {
        minScore: 8,
        maxScore: 12,
        level: 'High Burnout Strain',
        summary: 'You are operating on depleted reserves, impacting both cognitive clarity and physical well-being.',
        nextStep: 'Consulting with a specialist can help you build structured boundaries and restore physical vitality.',
      },
    ],
  },
  {
    id: 'sleep-check',
    title: 'Sleep Check',
    subtitle: 'Assess nighttime restlessness, sleep onset, and daytime fatigue.',
    estimatedMinutes: 2,
    scientificContext: 'Informed by the Insomnia Severity Index (ISI) clinical parameters.',
    disclaimer: 'This tool is for educational or screening purposes only. It is not a diagnosis and should not replace assessment by a qualified professional.',
    questions: [
      {
        id: 1,
        question: 'Difficulty falling asleep within 30 minutes of getting into bed?',
        options: [
          { label: 'None', score: 0 },
          { label: 'Mild', score: 1 },
          { label: 'Moderate', score: 2 },
          { label: 'Severe', score: 3 },
        ],
      },
      {
        id: 2,
        question: 'Waking up during the night or too early with racing thoughts?',
        options: [
          { label: 'None', score: 0 },
          { label: 'Mild', score: 1 },
          { label: 'Moderate', score: 2 },
          { label: 'Severe', score: 3 },
        ],
      },
      {
        id: 3,
        question: 'How dissatisfied are you with your current sleep pattern?',
        options: [
          { label: 'Very satisfied', score: 0 },
          { label: 'Neutral', score: 1 },
          { label: 'Dissatisfied', score: 2 },
          { label: 'Very dissatisfied', score: 3 },
        ],
      },
      {
        id: 4,
        question: 'How much does your sleep problem interfere with your daily energy and mood?',
        options: [
          { label: 'Not at all', score: 0 },
          { label: 'A little', score: 1 },
          { label: 'Somewhat', score: 2 },
          { label: 'Very much', score: 3 },
        ],
      },
    ],
    scoreRanges: [
      {
        minScore: 0,
        maxScore: 3,
        level: 'Restful Sleep',
        summary: 'Your sleep quality appears sound and restorative.',
        nextStep: 'Maintain regular sleep and wake times.',
      },
      {
        minScore: 4,
        maxScore: 7,
        level: 'Mild Sleep Disruption',
        summary: 'Bedtime worry or irregular schedule is occasionally disturbing your rest.',
        nextStep: 'Implementing wind-down habits and reducing evening screen time can assist.',
      },
      {
        minScore: 8,
        maxScore: 12,
        level: 'Moderate to Significant Insomnia Pattern',
        summary: 'Persistent sleep difficulties are impacting your daytime energy and nervous system.',
        nextStep: 'Our psychologists can guide you through evidence-based Cognitive Behavioural Therapy for Insomnia (CBT-I).',
      },
    ],
  },
];

export const ARTICLES: ResourceArticle[] = [
  {
    id: 'understanding-anxiety-roots',
    title: 'Why Anxiety Feels Physical and How Somatic Regulation Calms the Alarm',
    slug: 'understanding-anxiety-roots',
    category: 'Anxiety',
    readTime: '4 min read',
    date: 'Updated 2026',
    author: 'Dr. Farah Kamran',
    excerpt: 'Chest tightness, racing pulse and fluttering sensations are not signs of immediate medical danger. Understand how the nervous system reacts and how to soothe it.',
    tags: ['Anxiety', 'Nervous System', 'Somatic Regulation'],
    content: [
      'In our clinical practice, a very frequent experience shared by patients is: "I visited my medical doctor because my heart was racing and I felt short of breath, but all my tests were normal. My doctor said it was anxiety."',
      'Hearing that symptoms are related to anxiety can feel confusing when the physical sensations are so tangible. The truth is straightforward: anxiety is a physiological nervous system event.',
      'When your brain perceives a potential challenge—whether in work, family or personal life—the sympathetic nervous system initiates a protective alarm response. Adrenaline increases heart rate to deliver oxygen to your muscles, while digestion slows down, causing stomach flutter.',
      'Practical Grounding Steps:',
      '1. The Physiological Sigh: Inhale deeply through your nose, take a second brief top-off sip of air, then exhale slowly through your mouth. Doing this three times stimulates the vagus nerve to slow heart rate.',
      '2. Sensory Re-Orientation: Name five neutral objects in your immediate visual field, touch three textures, and listen for two background sounds. This anchors attention back to present reality.',
      '3. Paced Self-Compassion: Remind yourself gently: "My body is trying to protect me, but I am safe in this room right now."',
    ],
  },
  {
    id: 'depression-and-hope',
    title: 'Recognizing Clinical Depression and the Paced Path Toward Recovery',
    slug: 'depression-and-hope',
    category: 'Depression',
    readTime: '5 min read',
    date: 'Updated 2026',
    author: 'Ayesha Malik, M.Phil.',
    excerpt: 'Depression is not laziness or a lack of gratitude. Explore how evidence-informed psychology helps individuals gently rediscover energy and hope.',
    tags: ['Depression', 'Mental Wellbeing', 'Recovery'],
    content: [
      'Depression is often misunderstood by well-meaning friends as temporary sadness that can be fixed with advice to "cheer up" or "try harder."',
      'Clinical depression is very different from ordinary sadness. While sadness comes in waves and allows moments of relief, depression is an all-encompassing emotional fog that alters energy, concentration, and the ability to feel pleasure.',
      'Small, Paced Steps Forward:',
      'In modern psychological therapy, recovery does not demand that you overhaul your life overnight. Through gentle Behavioural Activation, we help clients choose one manageable micro-step each day.',
      'Whether that means sitting in the morning sunlight for ten minutes or speaking openly to an objective professional, each step helps restore nervous system balance without pressure.',
    ],
  },
  {
    id: 'healthy-boundaries-relationships',
    title: 'Fostering Respectful Boundaries in Family and Close Relationships',
    slug: 'healthy-boundaries-relationships',
    category: 'Relationships',
    readTime: '5 min read',
    date: 'Updated 2026',
    author: 'Dr. Farah Kamran',
    excerpt: 'How to clearly communicate personal needs and emotional limits while preserving mutual dignity and familial affection.',
    tags: ['Relationships', 'Family Dynamics', 'Boundaries'],
    content: [
      'In close-knit family structures, individual boundaries are sometimes misconstrued as distance or disrespect. Yet without boundaries, relationships often deteriorate into silent resentment and emotional exhaustion.',
      'A boundary is not a hostile wall. It is a clear, compassionate statement of what you need in order to remain loving and patient within a relationship.',
      'Helpful Principles:',
      '• Communicate early and calmly rather than during the height of an argument.',
      '• Use clear "I" statements: "I value our conversations, and I need an hour to rest before we discuss this further."',
      '• Accept that mild feelings of guilt are a normal emotional reaction when practicing new boundaries.',
    ],
  },
  {
    id: 'workplace-burnout-recovery',
    title: 'Recovering from Workplace Exhaustion and Rebuilding Cognitive Reserves',
    slug: 'workplace-burnout-recovery',
    category: 'Stress',
    readTime: '4 min read',
    date: 'Updated 2026',
    author: 'Tariq Rehman, M.Sc.',
    excerpt: 'Chronic overtime and digital messages erode sleep and vitality. Practical frameworks to recover focus and establish healthy work boundaries.',
    tags: ['Burnout', 'Workplace Health', 'Stress Management'],
    content: [
      'In today’s connected working world, round-the-clock digital availability has become an unspoken norm. Over time, prolonged cognitive strain without genuine rest depletes physical and mental reserves.',
      'Burnout is characterized by chronic fatigue, cynicism regarding work that once felt meaningful, and a drop in concentration.',
      'Three Restoration Rules:',
      '1. Implement a Firm Digital Sunset: Mute work notifications at a set hour each evening to allow cortisol levels to drop naturally.',
      '2. Differentiate Urgent from Noise: Pause before immediately answering non-critical inquiries.',
      '3. Re-engage in Restorative Rest: True rest is not scrolling on your phone; it is reading, gentle walking, or quality conversation.',
    ],
  },
];

export const TESTIMONIALS: PatientTestimonial[] = [
  {
    id: '1',
    attribution: 'Verified Client',
    context: 'Individual Psychological Care',
    reflection: 'Coming to therapy for the first time felt intimidating. From the first conversation, I was treated with profound dignity and understanding. Learning practical CBT tools helped me regain confidence in my daily work and family life.',
    yearApprox: '2025',
  },
  {
    id: '2',
    attribution: 'Anonymous Patient',
    context: 'Couples Counselling',
    reflection: 'The neutrality and clinical experience of our psychologist gave us a safe space to speak honestly without shouting. We learned to listen to what the other person was actually saying rather than reacting to old anger.',
    yearApprox: '2025',
  },
  {
    id: '3',
    attribution: 'Verified Client',
    context: 'Online Video Consultations (Overseas Client)',
    reflection: 'Living abroad in the UK, I struggled to find a psychologist who understood my cultural background and family expectations without needing an hour of explanation. Having access to this institution was invaluable.',
    yearApprox: '2026',
  },
  {
    id: '4',
    attribution: 'Anonymous Patient',
    context: 'Stress & Burnout Support',
    reflection: 'I was on the verge of physical and professional collapse from executive burnout. The practical boundaries and stress regulation frameworks I learned literally saved my health.',
    yearApprox: '2024',
  },
];

export const FAQS = [
  {
    question: 'What mental-health services do you provide?',
    answer: 'We provide comprehensive psychological services including individual counselling for adults, couples counselling, family therapy, child and adolescent psychological support, trauma-informed care, stress and burnout management, formal psychometric assessment, and behavioral support. Consultations are available nationwide across Pakistan and internationally via encrypted tele-health.',
  },
  {
    question: 'How do I book an appointment?',
    answer: 'You can request an appointment through our online appointment form on this website, call our clinical reception directly at +92 314 3162051, or message our patient care coordinator on WhatsApp (+92 314 3162051). We will help identify an appropriate specialist and time slot.',
  },
  {
    question: 'Can I request a specific professional?',
    answer: 'Yes. You are welcome to review our specialists’ profiles and request a consultation with your preferred clinician. If you are unsure who is the best fit, our intake team will gladly recommend a specialist based on your specific needs.',
  },
  {
    question: 'Are appointments confidential?',
    answer: 'Yes, strictly confidential. All appointments adhere to rigorous healthcare privacy ethics. Nothing you discuss is shared with employers, family members, or third parties without your explicit consent, with the sole legal exception of immediate, imminent risk of physical harm.',
  },
  {
    question: 'Do you offer online counselling?',
    answer: 'Yes. We offer encrypted video and voice consultations for clients across Pakistan and internationally. Online sessions follow the highest clinical standards and privacy protocols.',
  },
  {
    question: 'How are online consultations conducted?',
    answer: 'Consultations take place via secure, encrypted tele-health (Google Meet, Zoom, or private audio/phone), ensuring 100% confidentiality, zero travel hassle, and immediate access to senior clinical psychologists from anywhere in Pakistan or abroad.',
  },
  {
    question: 'How long is a session?',
    answer: 'A standard individual psychological counselling session lasts 50 minutes. Couples and family consultations are typically scheduled for 60 minutes to ensure adequate time for all participants.',
  },
  {
    question: 'What happens during the first appointment?',
    answer: 'The first appointment is an initial exploratory consultation. Your psychologist will listen to your current concerns, understand what brings you to therapy, ask about relevant life context, and collaboratively outline a clear, gentle roadmap for care.',
  },
  {
    question: 'Can family members seek support?',
    answer: 'Yes. We offer dedicated family counselling and couples therapy to help loved ones communicate through challenges, resolve generational misunderstandings, and support each other.',
  },
  {
    question: 'Do you support children and adolescents?',
    answer: 'Yes. Our adolescent specialists provide supportive, age-appropriate psychological care for young people experiencing academic anxiety, behavioral changes, emotional distress, or social difficulties.',
  },
  {
    question: 'What if I am experiencing a mental-health emergency?',
    answer: 'Please note: our practice is an outpatient scheduled clinic and is NOT an emergency response service. If you or someone else is in immediate physical danger, please contact local emergency authorities (1122 in Pakistan, 999/111 in the UK, 988 in the US/Canada) or go directly to the nearest hospital emergency department.',
  },
];
