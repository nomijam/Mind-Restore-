import { ConditionItem } from '../types';

export const CONDITIONS_DATA: ConditionItem[] = [
  // ==========================================
  // COMMON CONCERNS (8 items)
  // ==========================================
  {
    id: 'anxiety-counselling',
    slug: 'anxiety-counselling',
    title: 'Anxiety Counselling',
    category: 'common-concerns',
    twoLineExplanation: 'Persistent worry, panic attacks, chest tightness, or racing thoughts that interfere with your daily peace of mind.',
    iconName: 'Activity',
    relatedServiceId: 'individual-counselling',
    badge: 'High Clinical Demand · Online Tele-Health',
    gentleGuidance: 'Anxiety is your nervous system’s alarm system stuck on high alert. Through structured psychological care, you can retrain catastrophic thoughts and regain physical calm.',
    signs: [
      'Frequent racing thoughts, worst-case scenario catastrophizing, and restless mind',
      'Physical tension, palpitations, shallow breathing, or sudden panic surges',
      'Difficulty falling asleep or waking up with an immediate knot in your stomach',
      'Avoiding social gatherings, workplace presentations, or stressful phone calls'
    ],
    fullOverview: 'Anxiety is one of the most prevalent yet treatable psychological challenges in Pakistan. Many people endure chronic tension silently, assuming that constant worry is just a personality trait or an inevitable reaction to societal pressures, family obligations, and career demands. At Life Reset Pakistan, our licensed clinical psychologists offer a non-judgmental, structured therapeutic pathway to deconstruct anxious thought loops, quiet physiological hyper-arousal, and restore emotional stability.',
    culturalContext: 'In Pakistani households, chronic anxiety is often dismissed as "zyada sochna" (overthinking) or lack of willpower. In reality, anxiety involves biological nervous system dysregulation and learned cognitive filters. Seeking professional therapy is a proactive, courageous act of health care.',
    symptomsBreakdown: {
      emotional: [
        'Persistent sense of impending dread or danger without an identifiable cause',
        'Feeling constantly irritable, on edge, or emotionally depleted',
        'Fear of losing control, fainting, or having a health emergency in public',
        'Overwhelming need for constant reassurance from partners or family members'
      ],
      physical: [
        'Palpitations, elevated heart rate, and chest tightness',
        'Chronic muscle stiffness across neck, shoulders, and jaw',
        'Digestive discomfort, acid reflux, or nervous stomach (IBS symptoms)',
        'Trembling hands, lightheadedness, and cold sweats during stress spikes'
      ],
      behavioral: [
        'Procrastinating or avoiding important meetings, exams, or social events',
        'Repetitive checking of locks, emails, messages, or news for false certainty',
        'Difficulty sitting still or unwinding without screen distractions',
        'Overworking as a distraction to suppress uncomfortable inner feelings'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Cognitive Behavioural Therapy (CBT)',
        description: 'Identifies cognitive distortions (such as catastrophizing and mind-reading) and equips you with structured reframing methods.'
      },
      {
        name: 'Acceptance & Commitment Therapy (ACT)',
        description: 'Teaches psychological flexibility and mindful acceptance of somatic sensations so anxious feelings lose their paralyzing power.'
      },
      {
        name: 'Somatic & Polyvagal Grounding',
        description: 'Vagus nerve regulation techniques, diaphragm pacing, and progressive neuromuscular release to settle physical fight-or-flight.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Compassionate Diagnostic Intake',
        description: 'We evaluate your anxiety triggers, family history, sleep patterns, and daily stressors in a calm, pressure-free session.'
      },
      {
        step: '02',
        title: 'Nervous System Stabilization',
        description: 'You acquire immediate physiological calming tools to manage panic episodes and daytime tension surges.'
      },
      {
        step: '03',
        title: 'Cognitive Restructuring & Exposure',
        description: 'Gradual desensitization to avoided situations and systematic dismantling of deep-seated core beliefs.'
      },
      {
        step: '04',
        title: 'Long-Term Relapse Prevention',
        description: 'Building sustainable emotional boundaries, lifestyle rhythm, and self-soothing tools for lasting resilience.'
      }
    ],
    whoItIsFor: [
      'Professionals navigating workplace stress and high-stakes performance pressure',
      'University students dealing with exams, MDCAT, CSS, or future career uncertainty',
      'Homemakers and working women balancing complex family and marital expectations',
      'Overseas Pakistanis managing cultural dislocation, loneliness, and career strain'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'tariq-rehman'],
    faqs: [
      {
        question: 'Can anxiety be treated without psychiatric medication?',
        answer: 'Yes. Evidence-based psychotherapy (such as CBT and ACT) is considered a gold-standard first-line treatment for mild to moderate anxiety. For severe anxiety, our psychologists can coordinate collaboratively with consulting psychiatrists if medical support is indicated.'
      },
      {
        question: 'How many sessions will I need before feeling relief?',
        answer: 'Most clients notice significant relief in physical panic and day-to-day worry within 4 to 6 sessions as practical calming strategies take effect, with 8 to 12 sessions recommended for lasting cognitive change.'
      },
      {
        question: 'Are online video sessions as effective as traditional clinic visits?',
        answer: 'Extensive clinical research demonstrates that secure video psychotherapy delivers proven clinical effectiveness for anxiety, offering the added comfort of speaking from your private room.'
      }
    ],
    keywords: ['anxiety counselling Pakistan', 'anxiety treatment Lahore', 'online psychologist for panic attacks', 'anxiety therapy Islamabad Karachi']
  },

  {
    id: 'depression-counselling',
    slug: 'depression-counselling',
    title: 'Depression Counselling',
    category: 'common-concerns',
    twoLineExplanation: 'Pervasive low mood, loss of interest in life, emotional numbness, and feeling drained of energy and motivation.',
    iconName: 'CloudRain',
    relatedServiceId: 'individual-counselling',
    badge: 'Compassionate Evidence-Based Care',
    gentleGuidance: 'Depression is not a failure of character, a spiritual deficit, or simple laziness. It is a real neurobiological and psychological condition that heals with paced, empathetic support.',
    signs: [
      'Pervasive emptiness, unexplained crying spells, or emotional numbness',
      'Loss of interest in hobbies, conversations, and everyday pleasures (anhedonia)',
      'Severe morning exhaustion where getting out of bed feels like moving mountains',
      'Excessive self-blame, worthlessness, or feeling like a burden to loved ones'
    ],
    fullOverview: 'Clinical depression is more than temporary sadness; it is an invisible weight that slows thinking, drains vitality, and colors future prospects with hopelessness. In Pakistan, individuals experiencing depression frequently suffer in silence due to cultural misconceptions that equate depression with a lack of gratitude or faith. At Life Reset Pakistan, our practitioners provide a safe, respectful sanctuary where you do not have to put on a brave face. We help you gradually rebuild energy, process suppressed grief, and reconnect with meaningful living.',
    culturalContext: 'Often in our society, well-meaning relatives tell struggling individuals to "stay busy" or "count their blessings." While social connection is vital, clinical depression requires evidence-based psychological treatment that addresses cognitive loops and neurochemical exhaustion.',
    symptomsBreakdown: {
      emotional: [
        'Persistent sadness, gloom, or chronic emotional numbness',
        'Intense feelings of guilt, shame, or self-reproach over past decisions',
        'Loss of emotional warmth toward spouse, children, or close friends',
        'Passive thoughts of wanting to disappear or sleep without waking up'
      ],
      physical: [
        'Profound, unyielding fatigue that does not improve after sleep',
        'Significant appetite changes (either unintended weight loss or comfort bingeing)',
        'Slowed speech, delayed physical movements, or heavy limbs',
        'Chronic headaches, diffuse body aches, and low immunity'
      ],
      behavioral: [
        'Isolating in your room and avoiding phone calls or family gatherings',
        'Neglecting personal hygiene, grooming, or routine domestic tasks',
        'Difficulty making even minor decisions such as what to eat or wear',
        'Abandoning goals, studies, or workplace responsibilities'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Behavioral Activation (BA)',
        description: 'Gently breaking the cycle of lethargy and isolation through manageable micro-steps that restore dopamine and mastery.'
      },
      {
        name: 'Cognitive Behavioural Therapy (CBT)',
        description: 'Challenging deep-seated cognitive filters of hopelessness, perceived incompetence, and unhelpful rumination.'
      },
      {
        name: 'Compassion-Focused Therapy (CFT)',
        description: 'Cultivating internal warmth and soothing the harsh inner critic that drives persistent self-hatred and shame.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Safe Pacing & Normalization',
        description: 'Establishing an empathetic therapeutic bond where your struggle is validated without judgment or unsolicited advice.'
      },
      {
        step: '02',
        title: 'Micro-Routine Reconstruction',
        description: 'Implementing gentle daily anchors for sleep, light exposure, nutrition, and small uplifting activities.'
      },
      {
        step: '03',
        title: 'Cognitive Core Work',
        description: 'Unpacking underlying emotional wounds, unresolved losses, and distorted self-beliefs.'
      },
      {
        step: '04',
        title: 'Relational Re-engagement',
        description: 'Safely re-entering social connections, career pursuits, and personal values with ongoing maintenance tools.'
      }
    ],
    whoItIsFor: [
      'Individuals enduring chronic low mood, numbness, or loss of purpose',
      'Postpartum mothers dealing with postnatal depression and overwhelming guilt',
      'Young adults experiencing career stagnation or quarter-life existential crises',
      'Seniors navigating loneliness, health transitions, or bereavement'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'ayesha-malik'],
    faqs: [
      {
        question: 'What if I have zero energy to even talk during sessions?',
        answer: 'Our therapists meet you exactly where you are. There is no pressure to perform or speak eloquently. Sessions can be gentle, quiet, and paced around what you can comfortably share.'
      },
      {
        question: 'Can therapy help if I have had depression for several years?',
        answer: 'Yes. Even chronic or recurrent depressive episodes respond meaningfully to structured therapeutic approaches such as Behavioral Activation and Compassion-Focused Therapy.'
      },
      {
        question: 'Is my consultation kept confidential from my family?',
        answer: 'Strictly 100% confidential. As licensed clinical psychologists, we adhere to international ethical standards. Nothing you discuss is shared with family, employers, or third parties.'
      }
    ],
    keywords: ['depression counselling Pakistan', 'therapist for depression Lahore', 'clinical depression treatment Karachi', 'online psychologist depression']
  },

  {
    id: 'stress-burnout',
    slug: 'stress-burnout',
    title: 'Stress & Burnout',
    category: 'common-concerns',
    twoLineExplanation: 'Exhaustion from relentless workplace demands, caregiving duties, or toxic environments leaving you emotionally depleted.',
    iconName: 'Flame',
    relatedServiceId: 'stress-management',
    badge: 'Executive & Lifestyle Wellness',
    gentleGuidance: 'Burnout is not a personal weakness; it is the natural consequence of giving continuously without replenishing your psychological reserves.',
    signs: [
      'Waking up feeling drained even after 8 hours in bed',
      'Cynicism, detachment, and dread towards your job or family obligations',
      'Brain fog, memory lapses, and dropping productivity on simple tasks',
      'Frequent tension headaches, irritability, and snapping at colleagues or family'
    ],
    fullOverview: 'Modern professional and familial life in Pakistan often demands relentless availability. Corporate deadlines, financial inflation, competitive academic tracks, and intense family expectations can push the autonomic nervous system into chronic overload. When stress shifts into clinical burnout, rest alone is no longer enough to recover. Life Reset Pakistan provides executive and personal stress counselling to help you establish firm boundaries, restore vitality, and build sustainable work-life alignment.',
    culturalContext: 'In South Asian society, saying "no" to authority figures, extended relatives, or workplace demands is often penalized as disrespect. Learning assertiveness and healthy boundary-setting is essential for preserving long-term mental and physical wellbeing.',
    symptomsBreakdown: {
      emotional: [
        'Pervasive emotional exhaustion and feeling emotionally numb',
        'Loss of passion for projects that previously brought excitement and pride',
        'Persistent cynicism, sarcasm, or resentment towards colleagues or clients',
        'Imposter syndrome and fear that you can no longer keep up'
      ],
      physical: [
        'Chronic neck, back, and shoulder pain from sustained physical tension',
        'Frequent colds, lowered immunity, and persistent fatigue',
        'Unregulated caffeine or sugar reliance to push through the workday',
        'Insomnia or restless sleep filled with work-related anxiety dreams'
      ],
      behavioral: [
        'Checking office emails late at night and during family meals',
        'Procrastinating on high-priority tasks due to cognitive overwhelm',
        'Withdrawing socially because interacting with people feels exhausting',
        'Irritability and short temper over minor household inconveniences'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Mindfulness-Based Stress Reduction (MBSR)',
        description: 'Cultivating presence and physiological down-regulation to detach from relentless cognitive hyper-arousal.'
      },
      {
        name: 'Assertiveness & Boundary Setting',
        description: 'Concrete communication scripts to say no gracefully, set limits on after-hours demands, and protect your energy.'
      },
      {
        name: 'Rational Emotive Behaviour Therapy (REBT)',
        description: 'Dismantling perfectionist demands and the unrealistic belief that your personal worth equals your output.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Energy & Stress Audit',
        description: 'Mapping where your vital energy is leaking across workplace, social, and domestic spheres.'
      },
      {
        step: '02',
        title: 'Emergency Boundary Implementation',
        description: 'Instituting non-negotiable boundaries around sleep, screen curfew, and decompression windows.'
      },
      {
        step: '03',
        title: 'Perfectionism Restructuring',
        description: 'Re-evaluating internal rules and "should" statements that drive over-functioning and people-pleasing.'
      },
      {
        step: '04',
        title: 'Sustainable Career & Life Architecture',
        description: 'Designing a realistic workflow, restorative habits, and emotional buffering systems for lifelong stamina.'
      }
    ],
    whoItIsFor: [
      'Tech professionals, software engineers, and corporate executives in high-stress roles',
      'Doctors, surgeons, and healthcare workers facing clinical fatigue',
      'Entrepreneurs and business leaders carrying round-the-clock financial responsibility',
      'Caregivers looking after elderly parents or special-needs family members'
    ],
    recommendedSpecialistIds: ['tariq-rehman', 'dr-farah-kamran'],
    faqs: [
      {
        question: 'Do I have to quit my job to recover from burnout?',
        answer: 'Not necessarily. Most burnout clients recover effectively by modifying internal perfectionism, asserting healthy boundaries, and optimizing emotional recovery rituals while remaining in their careers.'
      },
      {
        question: 'How is burnout different from clinical depression?',
        answer: 'Burnout is primarily rooted in chronic situational exhaustion and environment mismatch, while depression affects all life areas and includes pervasive worthlessness. However, untreated burnout can lead to depression.'
      },
      {
        question: 'Can I do evening or weekend sessions to fit my work schedule?',
        answer: 'Yes, our clinic provides flexible scheduling including late afternoon and weekend video consultation slots for working professionals.'
      }
    ],
    keywords: ['burnout counselling Pakistan', 'stress management psychologist Lahore', 'workplace stress therapy Islamabad', 'executive counselling Pakistan']
  },

  {
    id: 'sleep-disorders',
    slug: 'sleep-disorders',
    title: 'Sleep Disorders',
    category: 'common-concerns',
    twoLineExplanation: 'Chronic insomnia, middle-of-the-night awakenings, bedtime anxiety, and waking unrefreshed despite hours in bed.',
    iconName: 'BedDouble',
    relatedServiceId: 'stress-management',
    badge: 'CBT-I Non-Pharmacological Protocol',
    gentleGuidance: 'Sleep is a natural biological drive that functions best when we stop trying to force it. Our psychological methods reset your circadian rhythm without reliance on sleeping pills.',
    signs: [
      'Tossing and turning for over 45 minutes trying to fall asleep',
      'Sudden nighttime awakenings accompanied by an adrenaline surge and racing thoughts',
      'Dreading bedtime during the afternoon because you anticipate another sleepless night',
      'Severe daytime brain fog, caffeine dependency, and unpredictable mood swings'
    ],
    fullOverview: 'Sleep is the foundation of emotional resilience, cognitive clarity, and physical health. When insomnia strikes, the bed transforms from a place of sanctuary into an arena of frustration and dread. Many people in Pakistan turn to over-the-counter sleep aids or benzodiazepines, which provide temporary sedation but fail to address the underlying psychological drivers of chronic insomnia. Life Reset Pakistan utilizes Cognitive Behavioural Therapy for Insomnia (CBT-I)—the internationally recognized gold standard for lasting sleep restoration.',
    culturalContext: 'Late dinners, family visits extending past midnight, and excessive screen exposure in bed are common cultural patterns in Pakistani cities that disrupt sleep hygiene. We help you adapt proven sleep science to fit your cultural and familial lifestyle.',
    symptomsBreakdown: {
      emotional: [
        'Heightened anxiety and dread as evening approaches regarding whether you will sleep',
        'Severe daytime irritability, short temper, and low frustration tolerance',
        'Feeling helpless and discouraged after another restless night',
        'Anxious clock-watching and calculating hours of sleep remaining'
      ],
      physical: [
        'Heavy eyelids, persistent tension headaches, and dry eyes during the day',
        'Gastric acidity and digestive sluggishness linked to circadian disruption',
        'Sudden micro-sleeps or drooping alertness while driving or in meetings',
        'Restless legs and physical agitation when lying down in bed'
      ],
      behavioral: [
        'Spending hours in bed scrolling on mobile phones in an effort to feel sleepy',
        'Taking long irregular afternoon naps that destroy nighttime sleep pressure',
        'Consuming excessive tea, chai, or energy drinks late in the afternoon',
        'Relying on sleeping tablets or cough syrups to force unconsciousness'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Cognitive Behavioural Therapy for Insomnia (CBT-I)',
        description: 'Reconditioning the psychological association between the bed and sleep rather than wakefulness and worry.'
      },
      {
        name: 'Sleep Restriction & Stimulus Control',
        description: 'Scientific scheduling to consolidate fragmented sleep into deep, continuous, restorative cycles.'
      },
      {
        name: 'Cognitive Restructuring for Bedtime Rumination',
        description: 'Targeting catastrophic thoughts such as "If I don\'t sleep right now, my entire tomorrow will be ruined."'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Sleep Diary & Architecture Assessment',
        description: 'Tracking sleep latency, awakenings, sleep efficiency, and circadian rhythm patterns over 7 to 10 days.'
      },
      {
        step: '02',
        title: 'Stimulus Control Realignment',
        description: 'Rebuilding the brain’s neurological connection: bed equals sleep, not tossing, worry, or screen time.'
      },
      {
        step: '03',
        title: 'Worry Time & Bedtime Cognitive Offloading',
        description: 'Techniques to clear racing thoughts before your head hits the pillow.'
      },
      {
        step: '04',
        title: 'Sleep Consolidation & Long-Term Freedom',
        description: 'Stabilizing natural sleep cycles so you can fall asleep effortlessly without medication.'
      }
    ],
    whoItIsFor: [
      'Individuals suffering from chronic sleep-onset or sleep-maintenance insomnia',
      'Night-shift workers and overseas professionals with disrupted circadian schedules',
      'Students experiencing pre-exam insomnia and bedtime anxiety',
      'People wishing to taper safely off sleeping pills under psychological guidance'
    ],
    recommendedSpecialistIds: ['tariq-rehman', 'dr-farah-kamran'],
    faqs: [
      {
        question: 'Is CBT-I as effective as prescription sleeping pills?',
        answer: 'Clinical trials worldwide show CBT-I is equally effective as medication in the short term, and significantly superior in the long term because it trains your brain’s natural sleep mechanisms without tolerance or dependence.'
      },
      {
        question: 'How quickly can I expect improvement in my sleep?',
        answer: 'Most clients experience noticeable consolidation of sleep within 2 to 3 weeks of adhering to stimulus control and sleep scheduling protocols.'
      },
      {
        question: 'Can CBT-I be done via online sessions?',
        answer: 'Absolutely. CBT-I is a structured educational and behavioral therapy that delivers outstanding outcomes via telehealth video sessions.'
      }
    ],
    keywords: ['sleep disorder psychologist Pakistan', 'insomnia treatment Lahore', 'CBT-I Pakistan', 'online sleep therapy Karachi']
  },

  {
    id: 'health-anxiety',
    slug: 'health-anxiety',
    title: 'Health Anxiety',
    category: 'common-concerns',
    twoLineExplanation: 'Obsessive worry about serious illness, constant body checking, Googling symptoms, and fear of medical tests.',
    iconName: 'ShieldAlert',
    relatedServiceId: 'individual-counselling',
    badge: 'Specialized Hypochondria & Somatic Care',
    gentleGuidance: 'Your symptoms are real, but their cause is an overactive nervous system, not the fatal illness your mind fears. We help you break the reassurance cycle.',
    signs: [
      'Compulsive Googling of minor physical sensations (headaches, twitches, aches)',
      'Frequent visits to different doctors and labs seeking clean test results',
      'Temporary relief from normal lab reports followed immediately by new doubt',
      'Obsessive checking of pulse, blood pressure, moles, or lymph nodes throughout the day'
    ],
    fullOverview: 'Health anxiety (often referred to clinically as Illness Anxiety Disorder) is an exhausting cycle where benign, normal bodily fluctuations are interpreted by the brain as proof of a catastrophic medical condition (such as cancer, heart attack, or neurological disease). In Pakistan, easy access to private diagnostic labs and doctor hopping often fuels the cycle, leaving individuals with mounting bills and persistent terror. At Life Reset Pakistan, we help clients understand how hyper-vigilance amplifies bodily sensations, break the checking cycle, and regain peace.',
    culturalContext: 'In South Asian families, discussing health scares frequently elicits dramatic reactions or superstitious explanations ("nazar" or black magic), which further amplifies health panic. We provide a grounded, scientific psychological approach.',
    symptomsBreakdown: {
      emotional: [
        'Overwhelming dread upon noticing any unexpected physical sensation',
        'Intense fear of leaving children or family behind due to sudden illness',
        'Severe anxiety while awaiting medical laboratory or imaging results',
        'Feeling misunderstood by medical doctors who say "it\'s all in your head"'
      ],
      physical: [
        'Somatic symptoms amplified by adrenaline: chest tightness, dizziness, tingling',
        'Hypersensitivity to natural heartbeat sounds and digestive gurgles',
        'Lump in the throat sensation (globus pharyngeus) caused by vocal cord muscle tension',
        'Physical fatigue from continuous physiological hyper-vigilance'
      ],
      behavioral: [
        'Constantly asking spouse or family members: "Does this look normal to you?"',
        'Measuring blood pressure, oxygen saturation, or heart rate multiple times an hour',
        'Avoiding medical checkups or hospitals out of terror that a fatal diagnosis will be found',
        'Spending hours reading medical forums and case reports late at night'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Exposure & Response Prevention (ERP) for Health Anxiety',
        description: 'Gradually stepping back from compulsive symptom Googling, pulse checks, and doctor visits while tolerating physical uncertainty.'
      },
      {
        name: 'Cognitive Behavioural Therapy (CBT)',
        description: 'Reframing catastrophic misinterpretations of normal autonomic bodily signals.'
      },
      {
        name: 'Interoceptive Exposure',
        description: 'Gently simulating mild bodily sensations (like elevated heart rate from brisk movement) to retrain the brain that physical sensations are safe.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Vicious Cycle Mapping',
        description: 'Analyzing the loop between physical trigger, catastrophic thought, anxiety surge, and compulsive checking.'
      },
      {
        step: '02',
        title: 'Reassurance Taper Protocol',
        description: 'Systematically reducing medical Googling, family reassurance requests, and device checking.'
      },
      {
        step: '03',
        title: 'Somatic Demystification',
        description: 'Understanding the biology of how hyper-focus magnifies tingling, twitches, and heart rhythms.'
      },
      {
        step: '04',
        title: 'Uncertainty Tolerance Mastery',
        description: 'Embracing healthy living without the illusion of 100% biological guarantee, freeing your mind to enjoy life.'
      }
    ],
    whoItIsFor: [
      'Individuals who have received clear medical clean-bills from doctors but remain terrified of illness',
      'People who lost a loved one to illness and now fear the same fate',
      'Young parents panicked about their own health or their children’s minor symptoms',
      'Individuals exhausted by high diagnostic laboratory and specialist bills'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'tariq-rehman'],
    faqs: [
      {
        question: 'Are my physical sensations fake or imagined?',
        answer: 'Not at all. Your physical sensations—such as heart palpitations, muscle twitches, or dizziness—are 100% physically real. However, they are caused by stress hormones and autonomic arousal, not the lethal diseases your anxiety fears.'
      },
      {
        question: 'What if I actually have a real medical problem?',
        answer: 'We advocate for standard, healthy medical checkups. The difference in therapy is that we help you distinguish between sensible medical advice and anxious compulsive reassurance seeking.'
      },
      {
        question: 'How do I stop Googling my symptoms?',
        answer: 'Our therapists provide concrete behavioral delay protocols and alternative cognitive responses that make resisting the urge to Google manageable and empowering.'
      }
    ],
    keywords: ['health anxiety psychologist Pakistan', 'hypochondria treatment Lahore', 'cardiophobia therapy Islamabad', 'illness anxiety doctor Karachi']
  },

  {
    id: 'anger-management',
    slug: 'anger-management',
    title: 'Anger Management',
    category: 'common-concerns',
    twoLineExplanation: 'Impulsive emotional outbursts, chronic irritability, marital clashes, and deep regret after losing your temper.',
    iconName: 'Zap',
    relatedServiceId: 'individual-counselling',
    badge: 'Constructive Emotional Regulation',
    gentleGuidance: 'Anger is a normal human emotion; destructive expression is not. We help you discover the vulnerable emotions beneath your anger and master calm communication.',
    signs: [
      'Snapping quickly over minor inconveniences or perceived disrespect',
      'Physical sensations of intense heat, jaw clenching, and trembling during arguments',
      'Deep shame, guilt, and regret after saying hurtful things to loved ones',
      'Relationship tension, distancing by your children, or friction with colleagues'
    ],
    fullOverview: 'Anger is rarely a standalone emotion. In clinical psychology, anger is understood as a "secondary emotion"—a protective armor that masks deeper feelings of hurt, powerlessness, exhaustion, betrayal, or fear. In Pakistan, men in particular are often socialized to believe anger is the only acceptable emotional expression, leading to marital breakdown, damaged relationships with children, and workplace disciplinary issues. Life Reset Pakistan provides evidence-based anger regulation therapy that equips you with emotional pause mechanisms, empathetic communication tools, and somatic cooling strategies.',
    culturalContext: 'In South Asian cultures, anger by heads of households or senior figures is sometimes normalized as authority ("ghussa ana qudrati hai"). However, chronic anger damages cardiovascular health and destroys domestic emotional safety. Our therapy is respectful, practical, and highly transformational.',
    symptomsBreakdown: {
      emotional: [
        'Sudden, overwhelming surges of rage that feel impossible to restrain in the moment',
        'Persistent underlying irritability and low tolerance for errors by others',
        'Post-outburst remorse, guilt, and fear of damaging relationships irreparably',
        'Feeling misunderstood, unappreciated, or taken for granted by family'
      ],
      physical: [
        'Rapid heart rate, facial flushing, and adrenaline rush before an outburst',
        'Tension in the jaw, clenched fists, and tightness across the chest',
        'Headaches and stomach knots following heated confrontations',
        'Exhaustion and physical heaviness after adrenaline crashes'
      ],
      behavioral: [
        'Raising your voice, shouting, slamming doors, or breaking objects',
        'Using harsh, cutting insults that you later deeply regret',
        'Giving prolonged cold shoulders or silent treatment to punish others',
        'Impulsive driving or reckless behavior when agitated'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Cognitive Behavioural Therapy (CBT)',
        description: 'Identifying cognitive triggers like rigid expectations ("they must respect me") and entitlement traps.'
      },
      {
        name: 'Somatic Cooling & Physiological De-escalation',
        description: 'Biofeedback-informed pause techniques and physical grounding before the prefrontal cortex shuts down.'
      },
      {
        name: 'Nonviolent & Assertive Communication',
        description: 'Learning to express legitimate boundaries and needs clearly and calmly without aggression or hostility.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Trigger & Threshold Profiling',
        description: 'Identifying your unique physiological warning signs (the 0-to-10 anger scale) before an explosion happens.'
      },
      {
        step: '02',
        title: 'Emergency Circuit Breaker Protocols',
        description: 'Mastering the strategic timeout and somatic cooling tools during heated moments at home or work.'
      },
      {
        step: '03',
        title: 'Uncovering the Primary Wound',
        description: 'Exploring what is truly hurting underneath the rage: fear of abandonment, exhaustion, or old grief.'
      },
      {
        step: '04',
        title: 'Restorative Relational Repair',
        description: 'Rebuilding safety and trust with your spouse, children, or colleagues through mature communication.'
      }
    ],
    whoItIsFor: [
      'Men and fathers noticing that their spouses or children walk on eggshells around them',
      'Professionals whose quick tempers are threatening their workplace reputation and career',
      'Couples caught in explosive argument cycles that damage intimacy',
      'Individuals dealing with pent-up frustration and road rage'
    ],
    recommendedSpecialistIds: ['tariq-rehman', 'ayesha-malik'],
    faqs: [
      {
        question: 'Will therapy make me passive or unable to stand up for myself?',
        answer: 'Not at all. Anger management teaches assertiveness, which is far more powerful than aggression. You learn to command respect through quiet confidence and clear boundaries rather than shouting.'
      },
      {
        question: 'How long does it take to gain control over my temper?',
        answer: 'Most clients learn immediate physical circuit breakers within the first 2 to 3 sessions, with substantial long-term shift in reactivity achieved over 6 to 8 sessions.'
      },
      {
        question: 'Can my spouse or partner participate in sessions?',
        answer: 'Yes. Where appropriate, joint relationship sessions can help both partners establish healthy communication rules and mutual de-escalation agreements.'
      }
    ],
    keywords: ['anger management counselling Pakistan', 'anger therapist Lahore', 'ghussa control psychologist Karachi', 'men anger counselling Islamabad']
  },

  {
    id: 'phobia-treatment',
    slug: 'phobia-treatment',
    title: 'Phobia Treatment',
    category: 'common-concerns',
    twoLineExplanation: 'Intense, irrational fear of specific situations (flying, public speaking, needles, driving, elevators, animals) causing severe avoidance.',
    iconName: 'Compass',
    relatedServiceId: 'individual-counselling',
    badge: 'Gentle Systematic Desensitization',
    gentleGuidance: 'Phobias are conditioned fear responses stored in the brain’s amygdala. You can safely unlearn the panic through paced, supportive desensitization.',
    signs: [
      'Immediate terror, racing pulse, and urge to flee when facing the feared object or situation',
      'Organizing your entire travel, work, or lifestyle routine around avoiding triggers',
      'Knowing logically that the danger is minimal, yet feeling helpless against the physical terror',
      'Anticipatory dread days or weeks before an inevitable exposure (e.g., flight or presentation)'
    ],
    fullOverview: 'A specific phobia is far more severe than normal dislike or nervousness. It is an overwhelming, involuntary panic response triggered by a specific stimulus—such as flying on an airplane, public speaking, driving on motorways, elevators, medical needles, dental visits, or certain animals/insects. In Pakistan, people frequently alter their career trajectories or miss family weddings and pilgrimages to avoid facing their phobias. Life Reset Pakistan uses gentle, evidence-based Systematic Desensitization and graded exposure to free you from debilitating avoidance.',
    culturalContext: 'Phobias in Pakistan are sometimes mocked as "nakhray" (pretentiousness) or "darrpok hona" (cowardice). Our psychologists treat your fear with clinical dignity, creating a safe step-by-step roadmap where you remain in complete control at all times.',
    symptomsBreakdown: {
      emotional: [
        'Paralyzing terror or impending sense of catastrophe upon encountering the trigger',
        'Humiliation and embarrassment over having a severe reaction in front of peers',
        'Intense anticipatory anxiety weeks before a mandatory event (like a business flight)',
        'Feeling trapped and desperate when exit routes are constrained'
      ],
      physical: [
        'Violent heart pounding, dizziness, and shortness of breath',
        'Nausea, dry mouth, and shaking hands or trembling knees',
        'Hot flashes, profuse sweating, and tunnel vision',
        'Feeling detached from your body (depersonalization) during peak fear'
      ],
      behavioral: [
        'Refusing overseas jobs, Umrah/Hajj travel, or business trips due to flight phobia',
        'Climbing dozens of flights of stairs to avoid stepping into an elevator',
        'Postponing life-saving medical procedures or dental care due to needle/procedure phobia',
        'Taking long circuitous routes to avoid bridges, tunnels, or open spaces'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Systematic Desensitization & Graded Exposure',
        description: 'Building an exposure hierarchy from least threatening to most challenging, moving forward only when calm is achieved.'
      },
      {
        name: 'Cognitive Behavioural Therapy (CBT)',
        description: 'Dismantling catastrophic over-estimations of danger and under-estimations of your coping ability.'
      },
      {
        name: 'Applied Tension Technique',
        description: 'Specific physiological protocol for blood-injury-needle phobia to prevent fainting by maintaining blood pressure.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Fear Hierarchy Construction',
        description: 'Ranking your fear triggers on a Subjective Units of Distress (SUDS) scale from 10 to 100.'
      },
      {
        step: '02',
        title: 'Mastering Down-Regulation Tools',
        description: 'Training in diaphragmatic breathing and cognitive grounding to counter adrenaline spikes.'
      },
      {
        step: '03',
        title: 'Graded Imaginal & In-Vivo Steps',
        description: 'Paced, collaborative steps through the hierarchy with full therapist holding and support.'
      },
      {
        step: '04',
        title: 'Real-World Graduation',
        description: 'Successfully engaging the target scenario (taking the flight, giving the talk) with sustained confidence.'
      }
    ],
    whoItIsFor: [
      'Professionals whose fear of public speaking (glossophobia) is holding back promotions',
      'Travelers and families avoiding air travel (aviophobia) or highway driving',
      'Individuals terrified of elevators, enclosed rooms (claustrophobia), or open crowds (agoraphobia)',
      'Patients delaying vital healthcare due to needle or dental phobia'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'tariq-rehman'],
    faqs: [
      {
        question: 'Will I be forced to face my biggest fear right away?',
        answer: 'Never. In clinical exposure therapy, you maintain 100% control. We never rush or surprise you. We only advance to the next step when you feel completely comfortable with the current one.'
      },
      {
        question: 'Can phobia therapy be conducted online via video?',
        answer: 'Yes. Online therapy is highly effective for phobias because you can practice exposure exercises directly in your real environment with live therapist guidance.'
      },
      {
        question: 'How many sessions does phobia treatment typically require?',
        answer: 'Specific phobias often respond remarkably quickly—many clients conquer their phobia within 4 to 8 focused sessions.'
      }
    ],
    keywords: ['phobia treatment Pakistan', 'fear of flying therapist Lahore', 'public speaking phobia Islamabad', 'claustrophobia psychologist Karachi']
  },

  {
    id: 'female-psychologist-online',
    slug: 'female-psychologist-online',
    title: 'Female Psychologist Online',
    category: 'common-concerns',
    twoLineExplanation: 'Confidential, culturally safe online sessions with qualified female clinical psychologists for women across Pakistan and overseas.',
    iconName: 'UserCheck',
    relatedServiceId: 'individual-counselling',
    badge: 'Confidential Safe Sanctuary for Women',
    gentleGuidance: 'Every woman deserves a private, non-judgmental space to speak her truth. Our experienced female psychologists understand the cultural, familial, and emotional realities of Pakistani women.',
    signs: [
      'Hesitation to speak with male clinicians due to cultural comfort, modesty, or privacy',
      'Navigating complex marital stress, in-law dynamics, or postpartum depression',
      'Living in remote cities or overseas without access to qualified Pakistani female therapists',
      'Carrying heavy domestic and professional responsibilities with no safe outlet for yourself'
    ],
    fullOverview: 'In Pakistan, women often carry the emotional weight of extended households, marital expectations, childcare, and professional duties—often while silencing their own psychological pain. For many women, consulting a male psychologist or traveling to a physical clinic raises logistical hurdles, family privacy concerns, and cultural discomfort. Life Reset Pakistan provides a dedicated online care track led by senior registered female clinical psychologists. Sessions are conducted over encrypted video or voice calls, allowing you to speak freely from the safety and privacy of your room.',
    culturalContext: 'We recognize the intricate cultural landscape of Pakistani families—joint family pressures, rishta anxieties, divorce stigmas, and gendered emotional expectations. Our female clinicians provide deeply respectful, culturally intelligent therapy that honours your values while empowering your mental wellbeing.',
    symptomsBreakdown: {
      emotional: [
        'Feeling emotionally trapped, unheard, or taken for granted within family roles',
        'Postpartum anxiety, baby blues, or overwhelming guilt as a new mother',
        'Grief following miscarriage, marital breakdown, or domestic disappointment',
        'Chronic self-sacrifice leading to resentment, depression, and loss of identity'
      ],
      physical: [
        'Persistent tension headaches and migraines triggered by domestic friction',
        'Somatic fatigue and exhaustion from uninterrupted caregiving demands',
        'Sleep disruptions from nighttime worrying about children and marital harmony',
        'Unexplained aches, nausea, or appetite changes linked to chronic stress'
      ],
      behavioral: [
        'Crying in private or in the bathroom so family members do not notice',
        'Difficulty saying no to unreasonable extended family demands due to fear of conflict',
        'Isolating from old friends and letting personal aspirations fade away',
        'Over-controlling minor household details to cope with underlying lack of agency'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Culturally Sensitive Person-Centred Psychotherapy',
        description: 'Unconditional positive regard and emotional validation in an authentic, empathetic setting.'
      },
      {
        name: 'Cognitive Behavioural Therapy (CBT)',
        description: 'Rebuilding healthy self-worth, emotional regulation, and assertiveness scripts.'
      },
      {
        name: 'Perinatal & Maternal Mental Health Protocols',
        description: 'Specialized psychological care for pregnancy, postpartum depression, and maternal adjustment.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Private & Secure Consultation Setup',
        description: 'Establishing your confidential online connection (video or audio-only based on your preference).'
      },
      {
        step: '02',
        title: 'Validation & Emotional Unburdening',
        description: 'A non-judgmental space to voice everything you have been keeping inside without fear of gossip.'
      },
      {
        step: '03',
        title: 'Empowerment & Boundary Frameworks',
        description: 'Developing practical strategies to manage family tensions and protect your inner tranquility.'
      },
      {
        step: '04',
        title: 'Sustained Wellbeing & Self-Compassion',
        description: 'Cultivating sustainable self-care rituals and relational harmony for lasting emotional health.'
      }
    ],
    whoItIsFor: [
      'Pakistani women seeking a female clinical psychologist they can relate to comfortably',
      'Mothers navigating postpartum mood changes and parenting stress',
      'Young women and university students dealing with marriage pressures and career aspirations',
      'Pakistani diaspora and overseas women feeling isolated in foreign countries'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'ayesha-malik'],
    faqs: [
      {
        question: 'Can I do audio-only sessions if I do not wish to turn on my video camera?',
        answer: 'Yes, absolutely. We fully respect your comfort and privacy. You are welcome to conduct consultations via secure voice call without video.'
      },
      {
        question: 'Will anyone in my family be informed about my sessions?',
        answer: 'Never. Our clinical confidentiality is ironclad. We do not contact your family or share any notes or records with anyone.'
      },
      {
        question: 'What qualifications do your female psychologists hold?',
        answer: 'Our female psychologists hold advanced postgraduate clinical degrees (M.Phil. and Ph.D. in Clinical Psychology) with certified clinical practice registrations and up to 18 years of clinical experience.'
      }
    ],
    keywords: ['female psychologist online Pakistan', 'lady psychologist Lahore Karachi', 'female therapist Islamabad', 'online counselling for Pakistani women']
  },

  // ==========================================
  // SPECIALISED CARE (11 items)
  // ==========================================
  {
    id: 'ocd-treatment',
    slug: 'ocd-treatment',
    title: 'OCD Treatment',
    category: 'specialised-care',
    twoLineExplanation: 'Repetitive, intrusive distressing thoughts paired with compulsive rituals (checking, washing, counting, mental loops) performed to relieve anxiety.',
    iconName: 'Repeat',
    relatedServiceId: 'behavioural-support',
    badge: 'ERP Gold Standard Treatment',
    gentleGuidance: 'Intrusive thoughts are not your character or desires; they are neurological misfires. Exposure and Response Prevention (ERP) helps you reclaim your life.',
    signs: [
      'Horrific, blasphemous, aggressive, or contamination thoughts that cause intense guilt',
      'Compulsive rituals like excessive hand-washing, checking locks, or repetitive prayers (wudu)',
      'Spending hours seeking reassurance from loved ones: "Did I do something wrong?"',
      'Mental compulsions like counting, reciting silent phrases, or mentally replaying events'
    ],
    fullOverview: 'Obsessive-Compulsive Disorder (OCD) is one of the most misunderstood and debilitating psychological conditions. In Pakistan, OCD frequently manifests as religious scrupulosity (obsessions regarding purity, repetitive wudu, involuntary doubts about faith or blasphemous thoughts) as well as contamination fears, symmetry obsessions, and catastrophic checking rituals. Sufferers often live in agonizing shame, believing they are sinful or evil. In reality, OCD is an egodystonic neurobiological anxiety condition. Life Reset Pakistan specializes in Exposure and Response Prevention (ERP)—the scientifically proven gold standard for OCD recovery.',
    culturalContext: 'Scrupulosity OCD (religious obsessions) is extremely common in Pakistan and is often misdiagnosed as spiritual weakness or demonic influence. Our clinicians understand Islamic religious nuances and work with clients to untangle religious practice from compulsive OCD rituals.',
    symptomsBreakdown: {
      emotional: [
        'Overwhelming guilt, disgust, and terror over intrusive mental images or thoughts',
        'Intense anxiety when a ritual is interrupted or not completed "just right"',
        'Deep shame and belief that having the thought means you secretly want it to happen',
        'Mental exhaustion from constant vigilance against unwanted mental intrusions'
      ],
      physical: [
        'Raw, bleeding hands from excessive washing, bleaching, or scalding water',
        'Severe muscle tension, headaches, and physical weariness from prolonged rituals',
        'Elevated pulse and rapid breathing when an obsession is triggered',
        'Exhaustion after repeating physical motions (locking doors, turning off switches)'
      ],
      behavioral: [
        'Repeating ablution (wudu) or prayers (namaz) repeatedly for 30–60 minutes',
        'Compulsive checking of gas valves, stoves, locks, or electrical plugs',
        'Constantly asking family members: "Are you sure my hands are clean? Did I touch that?"',
        'Avoiding knives, children, religious sites, or public bathrooms out of trigger fear'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Exposure & Response Prevention (ERP)',
        description: 'Systematically exposing you to the trigger thought while guiding you to delay and eliminate the compulsive ritual.'
      },
      {
        name: 'Inference-Based CBT (I-CBT)',
        description: 'Deconstructing the doubt-generation process and distinguishing imaginary OCD doubts from real sensory facts.'
      },
      {
        name: 'Acceptance & Commitment Therapy (ACT) for OCD',
        description: 'Defusing from thoughts and living according to core values despite the background chatter of the OCD brain.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Comprehensive OCD Subtype Mapping',
        description: 'Differentiating obsessions from compulsions across scrupulosity, contamination, harm, or symmetry themes.'
      },
      {
        step: '02',
        title: 'ERP Hierarchy & Micro-Exposures',
        description: 'Creating a calibrated ladder of exposure exercises tailored to your triggers without flooding.'
      },
      {
        step: '03',
        title: 'Compulsion Taper & Response Prevention',
        description: 'Eliminating mental checking, reassurance seeking, and physical rituals step by step.'
      },
      {
        step: '04',
        title: 'Habituation & Freedom Maintenance',
        description: 'Strengthening cognitive tolerance so intrusive thoughts arise, pass, and trigger zero emotional disruption.'
      }
    ],
    whoItIsFor: [
      'Individuals struggling with religious scrupulosity and repetitive prayer/wudu compulsions',
      'People with contamination OCD and excessive hand-washing, sanitizing, or cleaning routines',
      'Clients troubled by intrusive harm, sexual, or relationship doubts',
      'Those spending hours checking locks, appliances, and work files'
    ],
    recommendedSpecialistIds: ['tariq-rehman', 'dr-farah-kamran'],
    faqs: [
      {
        question: 'Does having blasphemous or horrific intrusive thoughts mean I am a bad person?',
        answer: 'No. Clinical science shows that OCD attacks what you value most. The fact that the thought causes you intense distress proves it is egodystonic—the absolute opposite of who you are and what you desire.'
      },
      {
        question: 'Why has talk therapy not worked for my OCD in the past?',
        answer: 'Standard talk therapy often analyzes the meaning of thoughts, which inadvertently functions as an OCD compulsion (rumination). OCD requires specialized ERP to break the neurological cycle.'
      },
      {
        question: 'How successful is ERP therapy for OCD?',
        answer: 'ERP is the most scientifically validated treatment for OCD worldwide, with clinical success rates of 70% to 80% in substantially reducing ritual time and distress.'
      }
    ],
    keywords: ['OCD treatment Pakistan', 'ERP therapy Lahore', 'scrupulosity OCD psychologist Karachi', 'obsessive compulsive disorder therapy Islamabad']
  },

  {
    id: 'ptsd-trauma-therapy',
    slug: 'ptsd-trauma-therapy',
    title: 'PTSD & Trauma Therapy',
    category: 'specialised-care',
    twoLineExplanation: 'Flashbacks, emotional numbness, hyper-vigilance, and distressing memories resulting from adverse life shocks, accidents, or abuse.',
    iconName: 'Shield',
    relatedServiceId: 'trauma-support',
    badge: 'Trauma-Informed Phased Care',
    gentleGuidance: 'Trauma is not what happened to you; it is how your nervous system adapted to survive. We pace therapy gently around safety—you will never be forced to relive memories prematurely.',
    signs: [
      'Intrusive memories, vivid flashbacks, or nightmare replays of past terrifying events',
      'Extreme startle reflex, jumpiness, and feeling constantly on guard for danger',
      'Emotional detachment, feeling numb, or feeling disconnected from your body',
      'Severe avoidance of places, people, smells, or conversations that remind you of the event'
    ],
    fullOverview: 'Trauma can stem from a single overwhelming event (such as a severe road accident, medical emergency, sudden death of a loved one, or violent assault) or chronic relational adversity (childhood neglect, domestic emotional abuse, or prolonged marital invalidation). When trauma is unprocessed, the brain’s amygdala remains stuck in emergency mode, treating past events as current threats. Life Reset Pakistan provides phased, trauma-informed clinical care that prioritizes stabilization, somatic regulation, and gentle narrative integration.',
    culturalContext: 'In Pakistan, people are frequently told to "forget the past and move forward" ("jo ho gaya so ho gaya"). However, the body keeps the score. Unprocessed trauma cannot simply be willed away; it requires specialized psychological processing in a safe, compassionate container.',
    symptomsBreakdown: {
      emotional: [
        'Intense emotional waves of fear, grief, anger, or sudden emotional shut-down',
        'Persistent belief that the world is entirely dangerous and no one can be trusted',
        'Deep survivor’s guilt, shame, or irrational self-blame regarding what took place',
        'Inability to experience joy, tenderness, or emotional intimacy'
      ],
      physical: [
        'Exaggerated startle response to sudden noises, car horns, or unexpected knocks',
        'Chronic hyper-arousal, elevated baseline heart rate, and digestive tension',
        'Insomnia plagued by recurring nightmares and night sweats',
        'Physical tremors or somatic flashbacks when encountering sensory reminders'
      ],
      behavioral: [
        'Avoiding entire neighborhoods, hospitals, roads, or people linked to the trauma',
        'Isolating from loved ones and feeling like an alien in your own life',
        'Hyper-vigilance: always sitting facing the door and scanning for threats in public',
        'Emotional dissociation: spacing out, losing track of time during stressful moments'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Phase-Oriented Trauma Therapy',
        description: 'Clear three-phase model: Phase 1 Safety & Grounding; Phase 2 Memory Processing; Phase 3 Integration & Reconnection.'
      },
      {
        name: 'Trauma-Focused Cognitive Behavioural Therapy (TF-CBT)',
        description: 'Restructuring catastrophic trauma beliefs (shame, guilt, helplessness) into adaptive narrative meaning.'
      },
      {
        name: 'Somatic Grounding & Polyvagal Regulation',
        description: 'Re-establishing bodily safety so nervous system fight, flight, and freeze reactions can down-regulate.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Safety & Somatic Anchoring',
        description: 'Building reliable grounding anchors so you can calm your nervous system before addressing any memories.'
      },
      {
        step: '02',
        title: 'Resource Installation',
        description: 'Strengthening your emotional coping bank and internal resilience mechanisms.'
      },
      {
        step: '03',
        title: 'Paced Memory Desensitization',
        description: 'Gently processing traumatic fragments without flooding, moving memories from active alarm to past history.'
      },
      {
        step: '04',
        title: 'Post-Traumatic Growth & Integration',
        description: 'Rebuilding your life, trust in relationships, and forward momentum with renewed autonomy.'
      }
    ],
    whoItIsFor: [
      'Survivors of road traffic accidents, natural disasters, or medical traumas',
      'Individuals carrying scars from emotional, physical, or domestic adversity',
      'Those who experienced sudden, shocking bereavement or community loss',
      'Adults processing childhood neglect or complex relational wounds'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'ayesha-malik'],
    faqs: [
      {
        question: 'Will I be forced to describe traumatic details in my first session?',
        answer: 'Absolutely not. In trauma-informed clinical care, safety comes first. We never push you to recount traumatic details until you feel fully prepared, grounded, and in control.'
      },
      {
        question: 'Can trauma from 10 or 20 years ago still be healed?',
        answer: 'Yes. Neuroplasticity allows the brain to heal and re-file traumatic memories into narrative memory at any stage of life.'
      },
      {
        question: 'Are sessions conducted in complete confidentiality?',
        answer: 'Yes. Your trust and privacy are sacred. All trauma sessions adhere to the strictest clinical ethical confidentiality standards.'
      }
    ],
    keywords: ['PTSD therapy Pakistan', 'trauma psychologist Lahore', 'trauma counselling Islamabad', 'TF-CBT therapist Karachi']
  },

  {
    id: 'relationship-breakup',
    slug: 'relationship-breakup',
    title: 'Relationship & Breakup',
    category: 'specialised-care',
    twoLineExplanation: 'Navigating painful breakups, divorce transitions, emotional heartbreak, detachment, and rebuilding self-worth.',
    iconName: 'HeartHandshake',
    relatedServiceId: 'couples-counselling',
    badge: 'Relational Healing & Self-Rebuilding',
    gentleGuidance: 'Heartbreak is genuine psychological pain with neurochemical withdrawal. We guide you through grief, detachment, and rebuilding your independent identity.',
    signs: [
      'Obsessive replaying of past conversations, photos, and "what went wrong" questions',
      'Intense emotional rollercoaster: rage, deep despair, bargaining, and numbness',
      'Loss of appetite, disrupted sleep, and physical ache in the center of your chest',
      'Struggling to detach, compulsive social media checking, and fear of being forever alone'
    ],
    fullOverview: 'The ending of an intimate relationship—whether a broken engagement, long-term breakup, or legal divorce—can feel like an emotional earthquake. In Pakistan, breakup distress is often intensified by societal judgment, family embarrassment, and lack of open dialogue about romantic relationships. The brain processes romantic heartbreak through the same neurological pathways as physical pain and chemical withdrawal. Life Reset Pakistan provides compassionate, practical guidance to help you process grief, break compulsive contact cycles, and rebuild self-worth.',
    culturalContext: 'In South Asian society, broken engagements or divorces frequently bring intense familial pressure and social stigma, particularly for young adults and women. We provide a stigma-free, confidential haven where your pain is validated without judgment.',
    symptomsBreakdown: {
      emotional: [
        'Profound sorrow, sudden crying spells in private, and emotional devastation',
        'Paralyzing fear that you will never find love, respect, or marriage again',
        'Deep erosion of self-esteem: "Was I not enough? What did I do wrong?"',
        'Alternating between intense anger at the ex-partner and desperate yearning to reconnect'
      ],
      physical: [
        'Literal "broken heart syndrome" sensations: acute chest tightness and shallow breathing',
        'Severe loss of appetite and rapid weight loss or emotional over-eating',
        'Insomnia characterized by waking up in the early hours with immediate dread',
        'Chronic physical fatigue and lethargy throughout the day'
      ],
      behavioral: [
        'Compulsively monitoring their last seen status, social media stories, or mutual friends',
        'Re-reading old chat archives and looking at photographs for hours late at night',
        'Drafting long emotional messages or impulsively calling during vulnerable hours',
        'Withdrawing from mutual friend circles and avoiding social gatherings'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Attachment-Informed Psychotherapy',
        description: 'Understanding anxious or avoidant attachment dynamics that keep you locked in emotional agony.'
      },
      {
        name: 'Grief Processing & Radical Acceptance (DBT)',
        description: 'Navigating the stages of relational loss and letting go of bargaining with reality.'
      },
      {
        name: 'Self-Worth & Boundary Reconstruction',
        description: 'Refocusing energy inward to rebuild autonomy, self-respect, and healthy future relational standards.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Emergency Emotional First Aid',
        description: 'Immediate stabilization strategies to handle acute waves of grief, panic, and urge to reach out.'
      },
      {
        step: '02',
        title: 'Detachment & Clean Boundary Setting',
        description: 'Implementing healthy digital and mental boundaries to stop reopening emotional wounds.'
      },
      {
        step: '03',
        title: 'Grief & Relational Reflection',
        description: 'Objectively evaluating the relationship without rose-colored glasses to understand lessons learned.'
      },
      {
        step: '04',
        title: 'Self-Reclamation & Flourishing',
        description: 'Re-discovering your individual passions, rebuilding confidence, and looking forward with hope.'
      }
    ],
    whoItIsFor: [
      'Individuals dealing with broken engagements, broken relationships, or difficult divorces',
      'People struggling to let go of toxic, emotionally unavailable, or intermittent partners',
      'Young adults navigating family-mandated relationship endings',
      'Anyone seeking to rebuild confidence and self-love after emotional heartbreak'
    ],
    recommendedSpecialistIds: ['ayesha-malik', 'dr-farah-kamran'],
    faqs: [
      {
        question: 'Why does a breakup feel like physical pain?',
        answer: 'Neuroimaging research shows that social rejection activates the dorsal anterior cingulate cortex—the exact brain region that processes physical pain. Your pain is biologically real.'
      },
      {
        question: 'How do I stop checking my ex-partner\'s social media?',
        answer: 'Our therapists provide concrete neuro-behavioral redirection tools and accountability frameworks that break the compulsive dopamine-seeking loop.'
      },
      {
        question: 'How many sessions will it take to feel like myself again?',
        answer: 'While grief has its own timeline, most clients report a major reduction in acute emotional distress and regain clarity within 4 to 6 sessions.'
      }
    ],
    keywords: ['breakup counselling Pakistan', 'divorce therapy Lahore', 'relationship heartbreak psychologist Karachi', 'online breakup support Islamabad']
  },

  {
    id: 'grief-loss',
    slug: 'grief-loss',
    title: 'Grief & Loss',
    category: 'specialised-care',
    twoLineExplanation: 'The profound ache of losing a parent, child, spouse, health, or major life chapter, navigating mourning with gentle support.',
    iconName: 'Moon',
    relatedServiceId: 'individual-counselling',
    badge: 'Compassionate Bereavement Holding',
    gentleGuidance: 'Grief is not a disease to cure or a problem to solve; it is love with nowhere to go. We accompany you through mourning at your own pace.',
    signs: [
      'Overwhelming waves of sorrow, yearning, or physical numbness following a loss',
      'Difficulty accepting the finality of the loss or feeling detached from reality',
      'Guilt over things left unsaid, past regrets, or moments of feeling momentarily okay',
      'Struggling to resume daily work, meals, or social routines months after the event'
    ],
    fullOverview: 'Bereavement is among the most profound human experiences. Whether you have lost a parent, a child, a spouse, a sibling, or experienced the loss of health or livelihood, grief can feel disorienting and exhausting. In Pakistan, the initial days of mourning (qul, chehlum) provide communal presence, but once relatives return to their daily routines, the bereaved person is often left in profound isolation. Life Reset Pakistan offers specialized grief therapy to witness your pain, untangle unresolved grief, and help you integrate the loss into your continuing life story.',
    culturalContext: 'In South Asian society, well-meaning individuals often urge the grieving person to stop crying ("sabar karo", "ro mat"). However, healthy mourning requires expressing sorrow rather than suppressing it. Sabr is finding meaning in the storm, not choking back tears. Our therapy honors both faith and human emotional reality.',
    symptomsBreakdown: {
      emotional: [
        'Sudden, unpredictable waves of weeping triggered by scents, dates, or memories',
        'Deep anger or confusion regarding why this happened to your loved one',
        'Complicated guilt: "Could I have saved them? Did I do enough?"',
        'Profound loneliness and feeling that no one truly understands your emptiness'
      ],
      physical: [
        'A hollow, heavy feeling in the chest or pit of the stomach',
        'Extreme physical fatigue, low stamina, and heavy limbs',
        'Appetite suppression or digestive upset following the loss',
        'Sleep disruptions, vivid dreams of the deceased, or waking in shock'
      ],
      behavioral: [
        'Preserving the deceased person\'s room and belongings untouched for long periods',
        'Avoiding places, photos, or people associated with the loss',
        'Struggling to find motivation for career, family, or personal self-care',
        'Withdrawing from family gatherings where the absence feels amplified'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Worden’s Tasks of Mourning Model',
        description: 'Accepting the reality of loss, working through grief pain, adjusting to an altered environment, and finding an enduring connection.'
      },
      {
        name: 'Dual Process Model of Grief',
        description: 'Balancing loss-orientation (processing pain) with restoration-orientation (rebuilding daily life) in healthy oscillation.'
      },
      {
        name: 'Compassionate Narrative Therapy',
        description: 'Honoring the legacy of your loved one while resolving unfinished business or unspoken regrets.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Unconditional Holding Space',
        description: 'A sanctuary to share your sorrow, memories, and tears without anyone rushing you to "be strong."'
      },
      {
        step: '02',
        title: 'Guilt & Regret Deconstruction',
        description: 'Addressing the painful "what-ifs" and rationalizing the limits of human control with self-compassion.'
      },
      {
        step: '03',
        title: 'Daily Life Restructuring',
        description: 'Creating gentle routines to restore sleep, nutrition, and small moments of peace.'
      },
      {
        step: '04',
        title: 'Continuing Bonds & Legacy',
        description: 'Creating an enduring, internal spiritual connection that honors your loved one as you move forward.'
      }
    ],
    whoItIsFor: [
      'Individuals mourning the death of parents, spouses, children, or close siblings',
      'Families navigating sudden, traumatic, or premature losses',
      'People experiencing complicated or prolonged grief lasting many months or years',
      'Individuals grieving the loss of health, fertility, career, or life dreams'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'tariq-rehman'],
    faqs: [
      {
        question: 'Is it wrong to still be crying months after a loss?',
        answer: 'Not at all. Grief does not follow an arbitrary calendar. Everyone mourns on their own timeline, and waves of sorrow months or years later are normal expressions of lasting love.'
      },
      {
        question: 'Does going to grief therapy mean I am trying to forget my loved one?',
        answer: 'Never. Therapy is not about forgetting; it is about finding a way to carry their memory with tenderness and peace rather than paralyzing torment.'
      },
      {
        question: 'Can therapy help if I feel guilty about their death?',
        answer: 'Yes. Bereavement guilt is extremely common. Our therapists help you gently examine those feelings and distinguish realistic responsibility from the helplessness of loss.'
      }
    ],
    keywords: ['grief counselling Pakistan', 'bereavement therapist Lahore', 'loss counselling Karachi', 'grief psychologist Islamabad']
  },

  {
    id: 'addiction-counselling',
    slug: 'addiction-counselling',
    title: 'Addiction Counselling',
    category: 'specialised-care',
    twoLineExplanation: 'Support for substance dependency, smoking/vaping, gaming, screen addiction, or compulsive behavioral habits with non-judgmental care.',
    iconName: 'Sparkles',
    relatedServiceId: 'individual-counselling',
    badge: 'Confidential Harm Reduction & Recovery',
    gentleGuidance: 'Addiction is an attempt to soothe an underlying emotional ache. We provide private, non-judgmental psychological care focused on root causes and sustainable recovery.',
    signs: [
      'Difficulty controlling or stopping a substance or behavior despite negative consequences',
      'Strong cravings and needing higher amounts or frequency to achieve the same relief',
      'Neglecting responsibilities, academic performance, or family relationships',
      'Feelings of guilt, secrecy, lying to loved ones, and failed attempts to quit alone'
    ],
    fullOverview: 'Addiction—whether to tobacco, vaping, alcohol, prescription medications, cannabis, gaming, pornography, or screens—is fundamentally a coping mechanism for underlying psychological pain, boredom, trauma, or emotional isolation. In Pakistan, addiction is heavily moralized and treated as a criminal or shameful flaw, leading families to hide the problem until crisis occurs. Life Reset Pakistan provides confidential outpatient psychological therapy utilizing Motivational Interviewing and relapse prevention to help individuals regain control and reconstruct their lives.',
    culturalContext: 'Due to severe stigma in Pakistan, individuals struggling with dependencies often avoid seeking help out of fear of family alienation or societal ostracization. Our outpatient sessions are strictly confidential, offering an empathetic, non-punitive environment.',
    symptomsBreakdown: {
      emotional: [
        'Intense anxiety, irritability, or mood swings when unable to engage in the habit',
        'Deep shame, self-disgust, and remorse following a relapse or excessive use',
        'Feeling that you cannot cope with everyday stress without your chemical or digital anchor',
        'Emotional detachment and loss of interest in genuine relationships'
      ],
      physical: [
        'Physical cravings, restlessness, and insomnia during withdrawal periods',
        'Changes in sleep cycles, daytime sluggishness, and lowered immunity',
        'Bloodshot eyes, weight fluctuations, and physical fatigue',
        'Tremors or palpitations when trying to cut back rapidly'
      ],
      behavioral: [
        'Hiding substances, devices, or spending money secretly without partner knowledge',
        'Skipping classes, work shifts, or family obligations to indulge in the habit',
        'Spending increasing hours thinking about, obtaining, or recovering from the habit',
        'Failed attempts to quit, followed by rationalizing "just one more time"'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Motivational Interviewing (MI)',
        description: 'Resolving ambivalence about change and building authentic, internally driven commitment to recovery.'
      },
      {
        name: 'Cognitive Behavioural Therapy for Addiction (CBT-A)',
        description: 'Identifying high-risk triggers, cognitive rationalizations ("I deserve this today"), and urge surfing.'
      },
      {
        name: 'Relapse Prevention Planning (RPP)',
        description: 'Constructing behavioral safety nets, emergency contact protocols, and healthy dopamine alternatives.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Non-Judgmental Functional Assessment',
        description: 'Uncovering what emotional need the habit is currently serving: anxiety relief, numbness, or stimulation.'
      },
      {
        step: '02',
        title: 'Trigger Mapping & Urge Surfing',
        description: 'Learning to ride the wave of cravings without acting out, using physiological substitution techniques.'
      },
      {
        step: '03',
        title: 'Root Trauma & Emotional Processing',
        description: 'Healing the core wounds (loneliness, depression, shame) that fueled the dependency in the first place.'
      },
      {
        step: '04',
        title: 'Lifestyle & Dopamine Reconstruction',
        description: 'Establishing rewarding routines, healthy social support, and lasting sobriety/balance tools.'
      }
    ],
    whoItIsFor: [
      'Individuals wishing to quit smoking, vaping, or cannabis dependency privately',
      'Young adults and students dealing with compulsive gaming, social media, or screen addiction',
      'People struggling with prescription tranquilizers or painkillers',
      'Family members seeking guidance on how to support an addicted loved one without enabling'
    ],
    recommendedSpecialistIds: ['tariq-rehman', 'dr-farah-kamran'],
    faqs: [
      {
        question: 'Do I have to go to an in-patient rehab center?',
        answer: 'For mild to moderate behavioral habits and outpatient-manageable addictions, psychological counselling is highly effective and allows you to continue working and living at home without disruption.'
      },
      {
        question: 'Is my consultation reported to any authority or family member?',
        answer: 'Strictly no. All sessions are 100% confidential under clinical ethics. Nothing is shared with family or outside entities.'
      },
      {
        question: 'What happens if I experience a slip or relapse during therapy?',
        answer: 'Relapse is viewed clinically as valuable data to examine triggers, not a moral failure. We analyze what happened without judgment and strengthen your recovery plan.'
      }
    ],
    keywords: ['addiction counselling Pakistan', 'quit smoking therapist Lahore', 'gaming addiction psychologist Karachi', 'substance dependency support Islamabad']
  },

  {
    id: 'anonymous-counselling',
    slug: 'anonymous-counselling',
    title: 'Anonymous Counselling',
    category: 'specialised-care',
    twoLineExplanation: 'Completely private, stigma-free therapy where you can consult using an alias or voice-only mode with zero fear of exposure.',
    iconName: 'Lock',
    relatedServiceId: 'individual-counselling',
    badge: '100% Confidential · Aliases Welcome',
    gentleGuidance: 'Your privacy is supreme. If shame, family prominence, or fear of societal judgment has kept you from therapy, this private pathway is designed for you.',
    signs: [
      'Deep desire to talk to a psychologist, but terrified someone in your social circle will find out',
      'Living in a high-profile, conservative, or tight-knit community where privacy is precarious',
      'Struggling with issues considered deeply taboo in Pakistani society',
      'Wanting voice-only or encrypted chat consultations under an alias without video'
    ],
    fullOverview: 'In Pakistan, mental health stigma and fear of gossip often prevent people from seeking the professional care they desperately need. Whether you are a public figure, a prominent family member, or someone navigating deeply sensitive personal matters (such as domestic distress, identity questions, or marital secrets), you should never have to sacrifice privacy for mental health care. Life Reset Pakistan offers a dedicated Anonymous Counselling option where you are welcome to use a pseudonym/alias, conduct sessions via audio call, and maintain complete confidentiality.',
    culturalContext: 'We recognize that "log kya kahenge" (what will people say) is a very real societal barrier in Pakistan. Our anonymous clinical track removes this fear entirely, giving you a secure, professional therapeutic space.',
    symptomsBreakdown: {
      emotional: [
        'Carrying a heavy secret or emotional burden alone for months or years',
        'Intense anxiety about social reputation, family honor, or career repercussions',
        'Feeling completely isolated with no trusted person to confide in',
        'Deep shame about personal desires, past mistakes, or relationship struggles'
      ],
      physical: [
        'Persistent tension headaches and clenched jaw from chronic secrecy',
        'Insomnia caused by rumination and fear of being discovered or judged',
        'Gastrointestinal distress and knots in the stomach',
        'Physical tremors when personal topics are brought up in family settings'
      ],
      behavioral: [
        'Deleting browsing history compulsively after looking up mental health help',
        'Avoiding clinics or public counseling centers for fear of running into acquaintances',
        'Using anonymous online forums to seek advice from unqualified strangers',
        'Suppressing emotional breakdowns until you are alone in your car or room'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Person-Centred Rogerian Therapy',
        description: 'Unconditional positive regard, complete non-judgment, and total empathetic presence.'
      },
      {
        name: 'Acceptance & Commitment Therapy (ACT)',
        description: 'Navigating guilt, shame, and values alignment without self-condemnation.'
      },
      {
        name: 'Solution-Focused Brief Therapy (SFBT)',
        description: 'Direct, practical problem-solving tailored to your immediate circumstances.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Zero-Trace Secure Intake',
        description: 'Connect using your chosen pseudonym and preferred contact method (audio-only, secure link).'
      },
      {
        step: '02',
        title: 'Safe Disclosure & Catharsis',
        description: 'Finally speaking the unspeakable in a confidential, pressure-free clinical container.'
      },
      {
        step: '03',
        title: 'Cognitive & Emotional Clarity',
        description: 'Untangling the practical realities of your situation from shame and fear of judgment.'
      },
      {
        step: '04',
        title: 'Actionable Moving Forward Plan',
        description: 'Developing sustainable coping, boundary protection, and peace of mind on your own terms.'
      }
    ],
    whoItIsFor: [
      'Individuals in high-visibility positions, business leaders, and public personalities',
      'People navigating deeply sensitive family, marital, or personal matters',
      'Anyone who feels more comfortable starting therapy without sharing their full identity',
      'Overseas Pakistanis who want absolute discretion from home country networks'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'tariq-rehman', 'ayesha-malik'],
    faqs: [
      {
        question: 'Do I need to provide my real name or CNIC number?',
        answer: 'No. For psychological counseling, you are welcome to use any first name or alias you are comfortable with. We do not demand government identification.'
      },
      {
        question: 'Can I do audio-only without turning on my video camera?',
        answer: 'Yes. Many clients choose voice-only consultations to maintain total privacy and ease during their sessions.'
      },
      {
        question: 'How do I pay securely without revealing my full identity?',
        answer: 'We provide simple digital payment methods (online banking, JazzCash, EasyPaisa, or international card payment links) that ensure your transaction remains secure and discreet.'
      }
    ],
    keywords: ['anonymous counselling Pakistan', 'confidential psychologist Lahore', 'private online therapy Karachi', 'secret counselling Islamabad']
  },

  {
    id: 'female-psychologist',
    slug: 'female-psychologist',
    title: 'Female Psychologist',
    category: 'specialised-care',
    twoLineExplanation: 'Confidential online clinical psychology consultations specifically with licensed female practitioners for women, teens, and families.',
    iconName: 'User',
    relatedServiceId: 'individual-counselling',
    badge: 'Clinical Excellence · Online Tele-Health',
    gentleGuidance: 'Our experienced female psychologists offer clinical expertise paired with deep cultural sensitivity for women, adolescents, and couples.',
    signs: [
      'Specific preference to consult an experienced female clinical psychologist',
      'Needing care for marital strain, motherhood, teenage daughter support, or family conflict',
      'Desire for a private video session or audio-only consultation from home',
      'Looking for a practitioner with verifiable clinical degrees and registered credentials'
    ],
    fullOverview: 'Finding the right therapist is the single most critical factor in successful psychological outcomes. Many patients in Pakistan—including women, young girls, couples, and parents—feel significantly more understood, safe, and comfortable when working with a female clinician. Life Reset Pakistan is led by experienced senior female clinical psychologists, including Dr. Farah Kamran (18 years clinical experience) and Ayesha Malik (10 years experience). Our clinicians combine rigorous evidence-based science with warm, compassionate holding.',
    culturalContext: 'Cultural modesty, shared gender experiences, and deep familiarity with Pakistani domestic realities allow our female psychologists to understand the unspoken nuances of your life without lengthy explanations.',
    symptomsBreakdown: {
      emotional: [
        'Anxiety, depression, low self-esteem, or social dread in young women and mothers',
        'Emotional exhaustion from navigating relational expectations and in-law dynamics',
        'Parental worry regarding a teenage daughter’s emotional withdrawal or academic drop',
        'Grief and sadness that you feel uncomfortable sharing with male clinicians'
      ],
      physical: [
        'Somatic manifestations of stress: chronic tension, fatigue, and headaches',
        'Sleep disruptions linked to domestic or marital worry',
        'Loss of appetite or nervous stomach during stressful periods',
        'Physical lethargy and lack of motivation'
      ],
      behavioral: [
        'Hesitation to attend mixed social events due to social anxiety or low confidence',
        'Struggling to voice needs assertively in domestic or work environments',
        'Putting everyone else’s needs first until you collapse from exhaustion',
        'Avoiding discussing sensitive personal health matters out of shyness'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Cognitive Behavioural Therapy (CBT)',
        description: 'Practical, evidence-based cognitive restructuring for depression, anxiety, and self-worth.'
      },
      {
        name: 'Emotionally Focused Relational Therapy (EFT)',
        description: 'Fostering deep emotional safety, repair, and secure attachment bonds.'
      },
      {
        name: 'Adolescent & Young Adult Guidance',
        description: 'Developmentally tailored interventions for teenage girls, university students, and young brides.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Empathetic Clinical Discovery',
        description: 'A relaxed, warm initial conversation to understand your story, values, and goals.'
      },
      {
        step: '02',
        title: 'Collaborative Formulation',
        description: 'Mapping out the root causes and designing a realistic, step-by-step care plan.'
      },
      {
        step: '03',
        title: 'Skill-Building & Emotional Healing',
        description: 'Mastering emotional regulation, self-compassion, and communication tools.'
      },
      {
        step: '04',
        title: 'Empowered Autonomy & Growth',
        description: 'Stepping forward into your life with confidence, clarity, and peace of mind.'
      }
    ],
    whoItIsFor: [
      'Women seeking a qualified female clinical psychologist for individual psychotherapy',
      'Parents seeking supportive counselling for their teenage daughters',
      'Couples seeking joint counselling with an emotionally focused female psychologist',
      'Clients across Pakistan and overseas looking for specialized female psychological consultations'
    ],
    recommendedSpecialistIds: ['dr-farah-kamran', 'ayesha-malik'],
    faqs: [
      {
        question: 'Are female psychologist appointments available online across Pakistan?',
        answer: 'Yes. Confidential video and private audio consultations are available with senior female licensed clinical psychologists across all Pakistani cities and overseas.'
      },
      {
        question: 'What are the credentials of your female psychologists?',
        answer: 'Our clinicians hold M.Phil. and Ph.D. degrees in Clinical and Applied Psychology from prestigious universities (GCU Lahore, Quaid-i-Azam University) and are registered with national psychological associations.'
      },
      {
        question: 'Can parents consult on behalf of a teenage daughter?',
        answer: 'Yes. Parents can participate in initial consultations and joint reviews while ensuring the young person has her own confidential therapeutic space.'
      }
    ],
    keywords: ['female psychologist Lahore', 'best lady psychologist Pakistan', 'female clinical psychologist Karachi', 'female counsellor Islamabad']
  },

  {
    id: 'marriage-couple-counselling',
    slug: 'marriage-couple-counselling',
    title: 'Marriage & Couple Counselling',
    category: 'specialised-care',
    twoLineExplanation: 'Resolving recurring marital conflict, joint-family friction, communication breakdown, and rebuilding affection and intimacy.',
    iconName: 'Heart',
    relatedServiceId: 'couples-counselling',
    badge: 'Neutral, Compassionate Marital Care',
    gentleGuidance: 'A struggling marriage is not necessarily a broken one. When both partners have a safe, neutral space to hear and be heard, profound healing is possible.',
    signs: [
      'Having the exact same escalating argument repeatedly without ever finding a resolution',
      'Emotional distance, cold silence, or living like roommates under the same roof',
      'Friction surrounding extended joint-family interference, in-law boundaries, and money',
      'Erosion of trust, affection, or consideration of separation or divorce'
    ],
    fullOverview: 'Marriage in Pakistan is a union not only of two individuals, but of two extended family systems. High cultural expectations, in-law dynamics, financial pressures, and differing communication styles frequently place immense strain on couples. Over time, unresolved hurt turns into emotional walls, defensive criticism, and contempt. Life Reset Pakistan offers evidence-based Marriage and Couples Counselling using Emotionally Focused Therapy (EFT) and Gottman-informed methods. Our psychologists remain strictly neutral, creating an emotionally safe environment where both partners can step out of the attack-defend cycle.',
    culturalContext: 'In South Asian families, marital disputes are often brought before elders or in-laws, which can inadvertently heighten defensiveness and take sides. Professional counselling offers an objective, confidential, third-party setting where both voices are respected equally.',
    symptomsBreakdown: {
      emotional: [
        'Feeling constantly criticized, misunderstood, or unappreciated by your partner',
        'Deep loneliness within the marriage—feeling emotionally abandoned',
        'Dread coming home from work due to anticipated tension and hostility',
        'Lingering resentment from past conflicts, broken promises, or betrayal'
      ],
      physical: [
        'Acute tension, stomach knots, and heart racing during home discussions',
        'Physical fatigue and headaches after marathon arguments',
        'Loss of physical closeness, affection, and intimacy',
        'Insomnia caused by going to bed feeling angry or emotionally disconnected'
      ],
      behavioral: [
        'Engaging in prolonged silent treatments lasting days or weeks',
        'Bringing up mistakes from years ago during current minor disagreements',
        'Triangulating parents or in-laws into personal marital arguments',
        'Sleeping in separate rooms and leading parallel, emotionally disconnected lives'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Emotionally Focused Therapy for Couples (EFT)',
        description: 'De-escalating the negative cycle (pursue-withdraw) and uncovering the attachment longings underneath surface anger.'
      },
      {
        name: 'Gottman Method Relational Interventions',
        description: 'Dismantling the Four Horsemen (Criticism, Contempt, Defensiveness, Stonewalling) and building fond affection.'
      },
      {
        name: 'Systemic Joint-Family Boundary Architecture',
        description: 'Formulating mutually agreed-upon boundaries with in-laws and extended relatives to protect the marital core.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Joint Intake & Pattern Identification',
        description: 'Mapping the couple’s recurring conflict dance without assigning blame or picking sides.'
      },
      {
        step: '02',
        title: 'Individual Emotional Check-Ins',
        description: 'Short private sessions with each partner to understand individual history and emotional needs.'
      },
      {
        step: '03',
        title: 'Joint De-escalation & Softened Startups',
        description: 'Practicing calm, vulnerable communication in real-time within the therapy session.'
      },
      {
        step: '04',
        title: 'Rebuilding Intimacy & Shared Vision',
        description: 'Restoring affection, mutual admiration, and a collaborative plan for future challenges.'
      }
    ],
    whoItIsFor: [
      'Married couples experiencing high-conflict arguments or chronic emotional distance',
      'Newlywed couples navigating joint family integration and boundary setting',
      'Couples recovering from broken trust, emotional detachment, or infidelity',
      'Engaged couples seeking pre-marital counseling for a strong foundation'
    ],
    recommendedSpecialistIds: ['ayesha-malik', 'dr-farah-kamran'],
    faqs: [
      {
        question: 'Does the psychologist take sides between husband and wife?',
        answer: 'Never. Our clinicians are neutral, objective facilitators. Our "client" is the health of the relationship itself. We never blame, shame, or take sides.'
      },
      {
        question: 'What if my spouse is reluctant to attend therapy?',
        answer: 'This is very common. You can begin with an individual session to learn de-escalation strategies. Often, when one partner begins responding calmly, the other feels safe enough to join.'
      },
      {
        question: 'Can couples attend online if we are in different locations?',
        answer: 'Yes. Our digital platform allows partners to join from separate screens/cities if one is traveling or working overseas.'
      }
    ],
    keywords: ['marriage counselling Pakistan', 'couples therapy Lahore', 'relationship psychologist Islamabad', 'marital counselling Karachi']
  },

  {
    id: 'family-counselling-therapy',
    slug: 'family-counselling-therapy',
    title: 'Family Counselling & Therapy',
    category: 'specialised-care',
    twoLineExplanation: 'Bridging generational divides, parent-child discord, joint-family tensions, and creating mutual respect and peace at home.',
    iconName: 'Users',
    relatedServiceId: 'family-counselling',
    badge: 'Systemic Harmony & Generational Healing',
    gentleGuidance: 'Family is our greatest source of support and sometimes our deepest source of pain. We help families communicate with dignity without breaking bonds.',
    signs: [
      'Constant friction between parents and adult or adolescent children over life choices',
      'Joint family friction, mother-in-law / daughter-in-law communication barriers',
      'Sibling disputes, inheritance tension, or caregiver fatigue in elder care',
      'A family member undergoing mental health or medical crises affecting the whole home'
    ],
    fullOverview: 'In Pakistani culture, the family is the cornerstone of life. However, rapid generational shifts, modern career aspirations, and changing lifestyle norms can create painful friction between traditional parental expectations and younger generations. When miscommunication turns into estrangement or constant shouting, the entire household suffers. Life Reset Pakistan provides Systemic Family Therapy that honors family unity and respect while creating healthy emotional boundaries where every member’s dignity is preserved.',
    culturalContext: 'We recognize that Western family therapy models emphasizing radical individualism often fail in South Asian contexts. Our systemic model respects filial piety and family collectivism while eliminating toxic guilt and communication gridlocks.',
    symptomsBreakdown: {
      emotional: [
        'Persistent household tension where everyone walks on eggshells',
        'Parents feeling heartbroken, disrespected, or shut out by their children',
        'Adult children feeling suffocated, controlled, or guilty for wanting autonomy',
        'Bitterness and unspoken grudges lingering across family members for years'
      ],
      physical: [
        'Physical stress reactions before family gatherings, dinners, or holidays',
        'Headaches and stomach distress resulting from shouting matches at home',
        'Exhaustion among family caregivers looking after ailing relatives',
        'Sleep disruptions across the household following evening clashes'
      ],
      behavioral: [
        'Shutting doors, silent treatment, and refusal to sit together for family meals',
        'Using third parties (aunts, uncles, siblings) as messengers instead of direct talk',
        'Ultimatums, emotional blackmail, and threats of breaking ties',
        'Explosive arguments over marriage choices, career paths, or financial control'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Systemic Family Therapy',
        description: 'Analyzing the family as an interconnected emotional system rather than pinpointing one individual as the problem.'
      },
      {
        name: 'Structural Family Therapy',
        description: 'Clarifying healthy generational boundaries and authority lines while dismantling dysfunctional enmeshment.'
      },
      {
        name: 'Narrative Family Dialogue',
        description: 'Allowing parents and children to voice their perspectives safely and rewrite shared family narratives.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Family System Genogram & Assessment',
        description: 'Understanding generational history, unspoken rules, and core conflict patterns.'
      },
      {
        step: '02',
        title: 'Establishing Respectful Communication Rules',
        description: 'Instituting non-negotiable ground rules: no shouting, no historical dredging, no interruptions.'
      },
      {
        step: '03',
        title: 'Facilitated Cross-Generational Dialogue',
        description: 'Guided conversations where parents voice their fears and youth voice their aspirations safely.'
      },
      {
        step: '04',
        title: 'Collaborative Family Agreement',
        description: 'Establishing sustainable boundaries and mutual respect that keep the family united and peaceful.'
      }
    ],
    whoItIsFor: [
      'Families navigating conflicts between parents and teenage or young adult children',
      'Joint family households struggling with in-law boundaries and domestic friction',
      'Families supporting a loved one through a mental health condition',
      'Blended families or families facing major life transitions'
    ],
    recommendedSpecialistIds: ['ayesha-malik', 'dr-farah-kamran'],
    faqs: [
      {
        question: 'Can family therapy be conducted if some members live in different cities?',
        answer: 'Yes. Our digital platform allows family members in Lahore, Karachi, Islamabad, or abroad in the UK, UAE, or US to join the same secure session.'
      },
      {
        question: 'Will parents feel attacked or disrespected during sessions?',
        answer: 'Never. Our therapists ensure deep cultural respect and reverence for parents while helping bridge misunderstandings constructively.'
      },
      {
        question: 'How many family members can participate in a session?',
        answer: 'Sessions can include 2 to 6 family members depending on the clinical objectives of the session.'
      }
    ],
    keywords: ['family counselling Pakistan', 'family therapy Lahore', 'joint family psychologist Karachi', 'parent child counselling Islamabad']
  },

  {
    id: 'child-teen-psychologist',
    slug: 'child-teen-psychologist',
    title: 'Child & Teen Psychologist',
    category: 'specialised-care',
    twoLineExplanation: 'Support for children and adolescents experiencing academic anxiety, behavioral changes, ADHD, screen addiction, or emotional distress.',
    iconName: 'Smile',
    relatedServiceId: 'child-adolescent-support',
    badge: 'Gentle Youth Psychology & Parent Guidance',
    gentleGuidance: 'Young people often express emotional pain through behavioral changes, withdrawal, or anger. We provide a warm, relatable space to help them flourish.',
    signs: [
      'Sudden drop in school grades, exam panic, or refusal to attend school',
      'Emotional outbursts, door slamming, aggression, or complete withdrawal into devices',
      'Noticeable changes in appetite, sleep, or personal hygiene in a teenager',
      'Frequent complaints of stomach aches or headaches with no medical cause'
    ],
    fullOverview: 'Adolescence and childhood are formative stages vulnerable to immense modern pressures. Today’s Pakistani youth face relentless academic competition (O/A Levels, Matric/FSc, entrance exams), social media comparison, cyberbullying, body image concerns, and parental expectations. When young people struggle, they rarely say "I am depressed"; instead, they become irritable, rebellious, quiet, or somatic. Life Reset Pakistan provides specialized child and adolescent psychology led by senior practitioners who know how to connect with youth without condescension.',
    culturalContext: 'Parents in Pakistan often alternate between strict discipline and helplessness when facing teen distress. We work collaboratively with both the young person and the parents to rebuild emotional trust and healthy communication.',
    symptomsBreakdown: {
      emotional: [
        'Overwhelming exam anxiety, panic attacks before school, or test phobia',
        'Intense mood swings, emotional volatility, or depressive apathy',
        'Severe imposter syndrome, body dissatisfaction, and low self-esteem',
        'Feeling misunderstood, isolated, and alien from family and peers'
      ],
      physical: [
        'Recurrent morning tummy aches, nausea, or headaches to avoid school',
        'Sleep reversal: staying up all night on screens and sleeping all day',
        'Nervous tics, nail biting, hair pulling (trichotillomania), or restlessness',
        'Slumped posture, low energy, and physical sluggishness'
      ],
      behavioral: [
        'Excessive gaming, TikTok/social media bingeing, and device defiance',
        'Secrecy, locked doors, and refusing to communicate with parents',
        'Sudden changes in peer group, risky behaviors, or skipping classes',
        'Drop in academic performance, incomplete homework, and defiance'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Adolescent Cognitive Behavioural Therapy (CBT)',
        description: 'Age-appropriate cognitive reframing for perfectionism, social anxiety, and academic stress.'
      },
      {
        name: 'Emotion Coaching & Parent Guidance',
        description: 'Equipping parents with empathetic listening methods that reduce teen rebellion and build trust.'
      },
      {
        name: 'Behavioural Activation & Executive Functioning',
        description: 'Building practical routines for focus, study habits, digital boundaries, and emotional self-regulation.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Initial Parent Consultation',
        description: 'Meeting with parents to understand developmental history, concerns, and home dynamics.'
      },
      {
        step: '02',
        title: 'Rapport Building with the Young Person',
        description: 'Establishing an authentic, confidential, safe connection where the teen feels heard, not judged.'
      },
      {
        step: '03',
        title: 'Skill-Building & Coping Toolkits',
        description: 'Teaching practical anxiety regulation, self-worth, and communication strategies.'
      },
      {
        step: '04',
        title: 'Joint Parent-Youth Bridge Sessions',
        description: 'Facilitating honest, calm conversations at home to establish healthy mutual expectations.'
      }
    ],
    whoItIsFor: [
      'Children and adolescents (ages 10–19) experiencing anxiety, moodiness, or withdrawal',
      'Students struggling with academic pressure, O/A Levels, or school refusal',
      'Teens dealing with social anxiety, bullying, or peer relational difficulties',
      'Parents seeking guidance on positive, empathetic parenting'
    ],
    recommendedSpecialistIds: ['ayesha-malik', 'tariq-rehman'],
    faqs: [
      {
        question: 'Will my teenager talk openly to a psychologist?',
        answer: 'Our child and adolescent specialists are exceptionally skilled at creating a warm, relatable, non-judgmental space. Most young people open up quickly once they realize the therapist is an ally who genuinely listens.'
      },
      {
        question: 'Are sessions with teens kept confidential from parents?',
        answer: 'Yes, with safety exceptions. Teens have their own confidential space so they can be honest. We share general progress and guidance with parents without betraying the teen’s specific confidences, unless there is imminent risk of harm.'
      },
      {
        question: 'Can sessions be held online for busy school schedules?',
        answer: 'Yes. Online sessions are very popular and comfortable for tech-savvy teenagers after school hours.'
      }
    ],
    keywords: ['child psychologist Pakistan', 'teen counselling Lahore', 'adolescent therapist Karachi', 'student child psychologist Islamabad']
  },

  {
    id: 'student-counselling',
    slug: 'student-counselling',
    title: 'Student Counselling',
    category: 'specialised-care',
    twoLineExplanation: 'MDCAT, CSS, university exam stress, career confusion, hostel life adjustment, imposter syndrome, and academic burnout.',
    iconName: 'GraduationCap',
    relatedServiceId: 'stress-management',
    badge: 'Academic Resilience & Career Focus',
    gentleGuidance: 'Your worth is not defined by a single exam score or degree. We help you overcome performance panic, conquer procrastination, and reclaim clarity.',
    signs: [
      'Paralyzing dread and anxiety surrounding MDCAT, CSS, university exams, or board results',
      'Chronic procrastination followed by all-nighters, panic attacks, and exhaustion',
      'Imposter syndrome: feeling you do not belong among high-achieving university peers',
      'Homesickness, isolation, or difficulty adapting to hostel and university life'
    ],
    fullOverview: 'Students in Pakistan bear an enormous burden of societal and familial expectations. With intense competition for limited medical college, engineering, and civil service slots, students frequently push themselves to mental and physical collapse. When exam anxiety strikes, the brain’s working memory shuts down, causing students to freeze during the exact tests they studied months for. Life Reset Pakistan offers specialized Student Counselling to help young adults master focus, dismantle toxic perfectionism, manage academic stress, and navigate career transitions.',
    culturalContext: 'In Pakistan, family sacrifices for education often translate into immense guilt for students ("if I fail, I ruin my family"). Our clinicians help students reframe this pressure, build genuine self-worth, and perform at their peak without panic.',
    symptomsBreakdown: {
      emotional: [
        'Acute terror before exams—blanking out during test papers despite thorough preparation',
        'Paralyzing fear of letting down parents, family, or teachers',
        'Deep imposter syndrome and chronic self-doubt in university seminars',
        'Loss of motivation, feeling that no matter how hard you study, it will never be enough'
      ],
      physical: [
        'Nausea, dizziness, and diarrhea (nervous stomach) on morning exam days',
        'Disrupted sleep, nightmares of failing or arriving late to exam halls',
        'Constant physical fatigue from excessive caffeine and energy drink consumption',
        'Headaches and eye strain from uninterrupted cramming'
      ],
      behavioral: [
        'Procrastinating on revision by scrolling social media, followed by intense self-hatred',
        'Isolating in hostel rooms, skipping lectures, and avoiding study groups',
        'Over-studying without breaks, leading to diminishing returns and cognitive burnout',
        'Considering dropping out or feeling paralyzed when deciding future career steps'
      ]
    },
    therapeuticModalities: [
      {
        name: 'Performance Cognitive Behavioural Therapy',
        description: 'Targeting catastrophic "all-or-nothing" thinking and performance-related cognitive freezes.'
      },
      {
        name: 'Attention & Executive Function Scheduling',
        description: 'Structured Pomodoro rhythms, spaced repetition psychology, and proactive rest.'
      },
      {
        name: 'Acceptance & Commitment Therapy (ACT) for Career Values',
        description: 'Decoupling self-worth from academic grades and aligning efforts with authentic passions.'
      }
    ],
    treatmentRoadmap: [
      {
        step: '01',
        title: 'Academic Stress Diagnostic',
        description: 'Pinpointing where the freeze occurs: study habits, self-doubt, family pressure, or test-taking panic.'
      },
      {
        step: '02',
        title: 'Cognitive De-catastrophizing',
        description: 'Dismantling the belief that your life is over if an exam does not go 100% according to plan.'
      },
      {
        step: '03',
        title: 'Peak-State Focus Conditioning',
        description: 'Training in bio-grounding to keep working memory online under exam hall pressure.'
      },
      {
        step: '04',
        title: 'Career & Life Alignment',
        description: 'Building long-term self-belief and adaptable career pathways for life after graduation.'
      }
    ],
    whoItIsFor: [
      'MDCAT, NUMS, and engineering university entry exam aspirants',
      'CSS and PMS competitive examination candidates',
      'University undergraduate and postgraduate students facing thesis/exam burnout',
      'Hostel students navigating loneliness and culture shock in new cities'
    ],
    recommendedSpecialistIds: ['tariq-rehman', 'ayesha-malik'],
    faqs: [
      {
        question: 'Can therapy help me if my mind goes blank during exams?',
        answer: 'Yes! "Mind blanking" is an acute autonomic freeze response where adrenaline floods the prefrontal cortex. We teach concrete physical resets that restore working memory within 60 seconds.'
      },
      {
        question: 'Are special discounted student rates available?',
        answer: 'Life Reset Pakistan offers accessible guidance and educational tools, with flexible consultation options designed to support aspiring students.'
      },
      {
        question: 'Can I do sessions online around my study schedule?',
        answer: 'Yes, our psychologists offer flexible late-afternoon and weekend online video appointments tailored to student timetables.'
      }
    ],
    keywords: ['student counselling Pakistan', 'MDCAT exam stress psychologist Lahore', 'CSS anxiety therapy Islamabad', 'university student counsellor Karachi']
  }
];

// Helper to look up a condition by id or slug (with backward-compatible fallbacks)
export function findCondition(idOrSlug: string): ConditionItem | undefined {
  if (!idOrSlug) return undefined;
  const clean = idOrSlug.toLowerCase().trim();

  // Direct match
  const direct = CONDITIONS_DATA.find((c) => c.id === clean || c.slug === clean);
  if (direct) return direct;

  // Backward-compatible alias lookups for earlier IDs
  const aliasMap: Record<string, string> = {
    anxiety: 'anxiety-counselling',
    depression: 'depression-counselling',
    'stress-burnout': 'stress-burnout',
    'sleep-difficulties': 'sleep-disorders',
    sleep: 'sleep-disorders',
    'trauma-ptsd': 'ptsd-trauma-therapy',
    trauma: 'ptsd-trauma-therapy',
    ocd: 'ocd-treatment',
    'relationship-difficulties': 'relationship-breakup',
    relationship: 'relationship-breakup',
    'family-concerns': 'family-counselling-therapy',
    family: 'family-counselling-therapy',
    'grief-loss': 'grief-loss',
    grief: 'grief-loss',
    'anger-management': 'anger-management',
    anger: 'anger-management',
    'self-esteem': 'depression-counselling',
    'life-transitions': 'stress-burnout',
    phobia: 'phobia-treatment',
    addiction: 'addiction-counselling',
    student: 'student-counselling',
    child: 'child-teen-psychologist',
    marriage: 'marriage-couple-counselling',
    couples: 'marriage-couple-counselling',
    female: 'female-psychologist'
  };

  const aliasedId = aliasMap[clean];
  if (aliasedId) {
    return CONDITIONS_DATA.find((c) => c.id === aliasedId || c.slug === aliasedId);
  }

  // Fallback substring search
  return CONDITIONS_DATA.find(
    (c) => c.id.includes(clean) || clean.includes(c.id) || c.title.toLowerCase().includes(clean)
  );
}
