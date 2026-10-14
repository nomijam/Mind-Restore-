export interface ConditionCardItem {
  id: string;
  slug: string;
  title: string;
  category: "common-concerns" | "specialised-care";
  twoLineExplanation: string;
  iconName: string;
}

export const CONDITIONS_CARDS: ConditionCardItem[] = [
  {
    "id": "anxiety-counselling",
    "slug": "anxiety-counselling",
    "title": "Anxiety Counselling",
    "category": "common-concerns",
    "twoLineExplanation": "Persistent worry, panic attacks, chest tightness, or racing thoughts that interfere with your daily peace of mind.",
    "iconName": "Activity"
  },
  {
    "id": "depression-counselling",
    "slug": "depression-counselling",
    "title": "Depression Counselling",
    "category": "common-concerns",
    "twoLineExplanation": "Pervasive low mood, loss of interest in life, emotional numbness, and feeling drained of energy and motivation.",
    "iconName": "CloudRain"
  },
  {
    "id": "stress-burnout",
    "slug": "stress-burnout",
    "title": "Stress & Burnout",
    "category": "common-concerns",
    "twoLineExplanation": "Exhaustion from relentless workplace demands, caregiving duties, or toxic environments leaving you emotionally depleted.",
    "iconName": "Flame"
  },
  {
    "id": "sleep-disorders",
    "slug": "sleep-disorders",
    "title": "Sleep Disorders",
    "category": "common-concerns",
    "twoLineExplanation": "Chronic insomnia, middle-of-the-night awakenings, bedtime anxiety, and waking unrefreshed despite hours in bed.",
    "iconName": "BedDouble"
  },
  {
    "id": "health-anxiety",
    "slug": "health-anxiety",
    "title": "Health Anxiety",
    "category": "common-concerns",
    "twoLineExplanation": "Obsessive worry about serious illness, constant body checking, Googling symptoms, and fear of medical tests.",
    "iconName": "ShieldAlert"
  },
  {
    "id": "anger-management",
    "slug": "anger-management",
    "title": "Anger Management",
    "category": "common-concerns",
    "twoLineExplanation": "Impulsive emotional outbursts, chronic irritability, marital clashes, and deep regret after losing your temper.",
    "iconName": "Zap"
  },
  {
    "id": "phobia-treatment",
    "slug": "phobia-treatment",
    "title": "Phobia Treatment",
    "category": "common-concerns",
    "twoLineExplanation": "Intense, irrational fear of specific situations (flying, public speaking, needles, driving, elevators, animals) causing severe avoidance.",
    "iconName": "Compass"
  },
  {
    "id": "female-psychologist-online",
    "slug": "female-psychologist-online",
    "title": "Female Psychologist Online",
    "category": "common-concerns",
    "twoLineExplanation": "Confidential, culturally safe online sessions with qualified female clinical psychologists for women across Pakistan and overseas.",
    "iconName": "UserCheck"
  },
  {
    "id": "ocd-treatment",
    "slug": "ocd-treatment",
    "title": "OCD Treatment",
    "category": "specialised-care",
    "twoLineExplanation": "Repetitive, intrusive distressing thoughts paired with compulsive rituals (checking, washing, counting, mental loops) performed to relieve anxiety.",
    "iconName": "Repeat"
  },
  {
    "id": "ptsd-trauma-therapy",
    "slug": "ptsd-trauma-therapy",
    "title": "PTSD & Trauma Therapy",
    "category": "specialised-care",
    "twoLineExplanation": "Flashbacks, emotional numbness, hyper-vigilance, and distressing memories resulting from adverse life shocks, accidents, or abuse.",
    "iconName": "Shield"
  },
  {
    "id": "relationship-breakup",
    "slug": "relationship-breakup",
    "title": "Relationship & Breakup",
    "category": "specialised-care",
    "twoLineExplanation": "Navigating painful breakups, divorce transitions, emotional heartbreak, detachment, and rebuilding self-worth.",
    "iconName": "HeartHandshake"
  },
  {
    "id": "grief-loss",
    "slug": "grief-loss",
    "title": "Grief & Loss",
    "category": "specialised-care",
    "twoLineExplanation": "The profound ache of losing a parent, child, spouse, health, or major life chapter, navigating mourning with gentle support.",
    "iconName": "Moon"
  },
  {
    "id": "addiction-counselling",
    "slug": "addiction-counselling",
    "title": "Addiction Counselling",
    "category": "specialised-care",
    "twoLineExplanation": "Support for substance dependency, smoking/vaping, gaming, screen addiction, or compulsive behavioral habits with non-judgmental care.",
    "iconName": "Sparkles"
  },
  {
    "id": "anonymous-counselling",
    "slug": "anonymous-counselling",
    "title": "Anonymous Counselling",
    "category": "specialised-care",
    "twoLineExplanation": "Completely private, stigma-free therapy where you can consult using an alias or voice-only mode with zero fear of exposure.",
    "iconName": "Lock"
  },
  {
    "id": "female-psychologist",
    "slug": "female-psychologist",
    "title": "Female Psychologist",
    "category": "specialised-care",
    "twoLineExplanation": "Confidential online clinical psychology consultations specifically with licensed female practitioners for women, teens, and families.",
    "iconName": "User"
  },
  {
    "id": "marriage-couple-counselling",
    "slug": "marriage-couple-counselling",
    "title": "Marriage & Couple Counselling",
    "category": "specialised-care",
    "twoLineExplanation": "Resolving recurring marital conflict, joint-family friction, communication breakdown, and rebuilding affection and intimacy.",
    "iconName": "Heart"
  },
  {
    "id": "family-counselling-therapy",
    "slug": "family-counselling-therapy",
    "title": "Family Counselling & Therapy",
    "category": "specialised-care",
    "twoLineExplanation": "Bridging generational divides, parent-child discord, joint-family tensions, and creating mutual respect and peace at home.",
    "iconName": "Users"
  },
  {
    "id": "child-teen-psychologist",
    "slug": "child-teen-psychologist",
    "title": "Child & Teen Psychologist",
    "category": "specialised-care",
    "twoLineExplanation": "Support for children and adolescents experiencing academic anxiety, behavioral changes, ADHD, screen addiction, or emotional distress.",
    "iconName": "Smile"
  },
  {
    "id": "student-counselling",
    "slug": "student-counselling",
    "title": "Student Counselling",
    "category": "specialised-care",
    "twoLineExplanation": "MDCAT, CSS, university exam stress, career confusion, hostel life adjustment, imposter syndrome, and academic burnout.",
    "iconName": "GraduationCap"
  }
];
