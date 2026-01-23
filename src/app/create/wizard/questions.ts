import type {
  FormField,
  HeartfeltDepth,
  HumorType,
  OccasionType,
  QuickTrait,
  RelationshipType,
  VibeType,
  WizardStep,
} from '../models';

export type QuestionType = 'text' | 'textarea' | 'grid' | 'pills' | 'multiSelect' | 'chips' | 'list' | 'form';

export interface QuestionOption<T = string> {
  value: T;
  label: string;
  emoji?: string;
  description?: string;
}

export interface QuestionConfig {
  id: string;
  step: WizardStep;
  type: QuestionType;
  title: string;
  subtitle?: string;
  placeholder?: string;
  required: boolean;
  maxSelect?: number;
  options?: QuestionOption[];
  getOptions?: (answers: Record<string, unknown>) => QuestionOption[];
  showIf?: (answers: Record<string, unknown>) => boolean;
  fields?: FormField[];
}

// Relationship categories for filtering
export const ROMANTIC_RELATIONSHIPS: RelationshipType[] = ['partner', 'dating'];

// Occasions only valid for romantic relationships
export const ROMANTIC_ONLY_OCCASIONS: OccasionType[] = ['anniversary', 'valentine'];

// Vibes only valid for romantic relationships
export const ROMANTIC_ONLY_VIBES: VibeType[] = ['spicy'];

// Relationship options with emojis
export const relationshipOptions: QuestionOption<RelationshipType>[] = [
  { value: 'partner', label: 'Partner/Spouse', emoji: '💑' },
  { value: 'friend', label: 'A friend', emoji: '👯' },
  { value: 'parent', label: 'My parent', emoji: '👨‍👩‍👧' },
  { value: 'child', label: 'My child', emoji: '👶' },
  { value: 'sibling', label: 'Sibling', emoji: '👫' },
  { value: 'professional', label: 'Coworker/Professional', emoji: '💼' },
  { value: 'dating', label: "Someone I'm dating", emoji: '🌱' },
  { value: 'grandparent', label: 'Grandparent', emoji: '👴' },
  { value: 'other', label: 'Someone else', emoji: '✨' },
];

// Occasion options with emojis
export const occasionOptions: QuestionOption<OccasionType>[] = [
  { value: 'birthday', label: 'Their birthday', emoji: '🎂' },
  { value: 'valentine', label: "Valentine's Day", emoji: '💝' },
  { value: 'anniversary', label: 'Our anniversary', emoji: '💑' },
  { value: 'holiday', label: 'A holiday', emoji: '🎄' },
  { value: 'support', label: "They're going through something", emoji: '🫂' },
  { value: 'achievement', label: 'They achieved something', emoji: '🏆' },
  { value: 'miss', label: 'I miss them', emoji: '💭' },
  { value: 'justBecause', label: 'No reason — just because', emoji: '💫' },
  { value: 'apology', label: 'I messed up', emoji: '😬' },
  { value: 'thanks', label: 'To say thank you', emoji: '🙏' },
  { value: 'congratulations', label: 'Congratulations', emoji: '🎉' },
];

// Vibe options with emojis
export const vibeOptions: QuestionOption<VibeType>[] = [
  { value: 'funny', label: 'Funny', emoji: '😄' },
  { value: 'heartfelt', label: 'Heartfelt', emoji: '💝' },
  { value: 'spicy', label: 'Spicy', emoji: '🌶️' },
  { value: 'weird', label: 'Weird', emoji: '🦑' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏' },
  { value: 'nostalgic', label: 'Nostalgic', emoji: '📷' },
  { value: 'encouraging', label: 'Encouraging', emoji: '✨' },
  { value: 'apologetic', label: 'Apologetic', emoji: '🥺' },
  { value: 'proud', label: 'Proud', emoji: '🌟' },
  { value: 'playful', label: 'Playful', emoji: '🎈' },
];

// Humor type options
export const humorTypeOptions: QuestionOption<HumorType>[] = [
  { value: 'insideJokes', label: "Inside jokes only we'd get" },
  { value: 'playfulTeasing', label: 'Playful teasing/light roast' },
  { value: 'absurdist', label: 'Absurdist/weird humor' },
  { value: 'dryDeadpan', label: 'Dry/deadpan' },
  { value: 'selfDeprecating', label: 'Self-deprecating' },
  { value: 'wholesomeSilly', label: 'Wholesome/silly' },
];

// Heartfelt depth options
export const heartfeltDepthOptions: QuestionOption<HeartfeltDepth>[] = [
  { value: 'warmLight', label: 'Keep it warm but light' },
  { value: 'feelSeen', label: 'I want them to feel seen' },
  { value: 'mightCry', label: "I might cry writing this and that's okay" },
];

// Quick traits options
export const quickTraitOptions: QuestionOption<QuickTrait>[] = [
  { value: 'dogPerson', label: 'Dog person', emoji: '🐕' },
  { value: 'catPerson', label: 'Cat person', emoji: '🐈' },
  { value: 'coffeeAddict', label: 'Coffee addict', emoji: '☕' },
  { value: 'teaDrinker', label: 'Tea drinker', emoji: '🍵' },
  { value: 'gymRat', label: 'Gym rat', emoji: '💪' },
  { value: 'hatesMornings', label: 'Hates mornings', emoji: '😴' },
  { value: 'alwaysLate', label: 'Always late', emoji: '⏰' },
  { value: 'plantParent', label: 'Plant parent', emoji: '🪴' },
  { value: 'gamer', label: 'Gamer', emoji: '🎮' },
  { value: 'bookworm', label: 'Bookworm', emoji: '📚' },
  { value: 'foodie', label: 'Foodie', emoji: '🍜' },
  { value: 'homebody', label: 'Homebody', emoji: '🏠' },
  { value: 'overthinker', label: 'Overthinker', emoji: '🤔' },
  { value: 'crierAtMovies', label: 'Crier at movies', emoji: '🎬' },
  { value: 'neatFreak', label: 'Neat freak', emoji: '✨' },
  { value: 'creativeMess', label: 'Creative mess', emoji: '🎨' },
  { value: 'workaholic', label: 'Workaholic', emoji: '💼' },
  { value: 'adventureSeeker', label: 'Adventure seeker', emoji: '🏔️' },
  { value: 'introvert', label: 'Introvert', emoji: '🌙' },
  { value: 'lifeOfTheParty', label: 'Life of the party', emoji: '🎉' },
];

// Filter occasions based on relationship
export function getFilteredOccasions(
  relationshipType: RelationshipType | undefined
): QuestionOption<OccasionType>[] {
  if (!relationshipType) return occasionOptions;

  const isRomantic = ROMANTIC_RELATIONSHIPS.includes(relationshipType);

  if (isRomantic) return occasionOptions;

  return occasionOptions.filter(
    (option) => !ROMANTIC_ONLY_OCCASIONS.includes(option.value)
  );
}

// Filter vibes based on relationship
export function getFilteredVibes(
  relationshipType: RelationshipType | undefined
): QuestionOption<VibeType>[] {
  if (!relationshipType) return vibeOptions;

  const isRomantic = ROMANTIC_RELATIONSHIPS.includes(relationshipType);

  if (isRomantic) return vibeOptions;

  return vibeOptions.filter(
    (option) => !ROMANTIC_ONLY_VIBES.includes(option.value)
  );
}

// Question configurations
export const questions: QuestionConfig[] = [
  {
    id: 'name',
    step: 'name',
    type: 'text',
    title: "Who's this card for?",
    subtitle: "We'll use their name in the message",
    placeholder: 'Their name',
    required: true,
  },
  {
    id: 'relationshipType',
    step: 'relationship',
    type: 'grid',
    title: 'Who are they to you?',
    subtitle: 'Helps us match the right tone',
    required: true,
    options: relationshipOptions,
  },
  {
    id: 'occasion',
    step: 'occasion',
    type: 'grid',
    title: "What's the occasion?",
    subtitle: "We'll tailor the message to the moment",
    required: true,
    getOptions: (answers) =>
      getFilteredOccasions(answers.relationshipType as RelationshipType | undefined),
  },
  {
    id: 'coupleMode',
    step: 'coupleMode',
    type: 'grid',
    title: 'Is this card about you as a couple?',
    subtitle: "We can make it feel like it's from both of you",
    required: true,
    options: [
      { value: 'yes', label: "Yes, it's about us", emoji: '💑' },
      { value: 'no', label: 'Just for them', emoji: '💌' },
    ],
    showIf: (answers) =>
      ROMANTIC_RELATIONSHIPS.includes(answers.relationshipType as RelationshipType) &&
      answers.occasion === 'valentine',
  },
  {
    id: 'senderName',
    step: 'senderName',
    type: 'text',
    title: "What's your name?",
    subtitle: 'So we can personalize the message from you',
    placeholder: 'Your name',
    required: true,
    showIf: (answers) => answers.coupleMode === 'yes',
  },
  {
    id: 'coupleStory',
    step: 'coupleStory',
    type: 'textarea',
    title: 'What makes your love story special?',
    subtitle: 'Share one detail we can weave into your message',
    placeholder: 'How you met, an inside joke, a pet name, a favorite memory...',
    required: false,
    showIf: (answers) => answers.coupleMode === 'yes',
  },
  {
    id: 'vibes',
    step: 'vibe',
    type: 'multiSelect',
    title: 'What vibe are you going for?',
    subtitle: 'This shapes the whole message — pick up to 2',
    required: true,
    maxSelect: 2,
    getOptions: (answers) =>
      getFilteredVibes(answers.relationshipType as RelationshipType | undefined),
  },
  {
    id: 'humorType',
    step: 'humorType',
    type: 'list',
    title: 'What kind of funny?',
    subtitle: 'So we match their humor',
    required: false,
    options: humorTypeOptions,
    showIf: (answers) => {
      const vibes = answers.vibes as string[] | undefined;
      return vibes?.includes('funny') ?? false;
    },
  },
  {
    id: 'heartfeltDepth',
    step: 'heartfeltDepth',
    type: 'list',
    title: 'How deep should we go?',
    subtitle: 'From light to tears — you choose',
    required: false,
    options: heartfeltDepthOptions,
    showIf: (answers) => {
      const vibes = answers.vibes as string[] | undefined;
      return (vibes?.includes('heartfelt') && !vibes?.includes('funny')) ?? false;
    },
  },
  {
    id: 'quickTraits',
    step: 'quickTraits',
    type: 'chips',
    title: 'Any quick traits?',
    subtitle: 'We might weave these in — optional',
    required: false,
    options: quickTraitOptions,
  },
  // Relationship-specific detail questions
  {
    id: 'datingDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about them',
    subtitle: 'These details help us write something personal',
    required: false,
    showIf: (answers) => answers.relationshipType === 'dating',
    fields: [
      {
        id: 'datingDuration',
        type: 'pills',
        label: 'How long have you been seeing each other?',
        options: [
          { value: 'justMet', label: 'Just met' },
          { value: 'fewDates', label: 'A few dates' },
          { value: 'coupleMonths', label: 'Couple months' },
          { value: 'gettingSerious', label: 'Getting serious' },
        ],
      },
      {
        id: 'howMet',
        type: 'text',
        label: 'How did you meet?',
        placeholder: 'At a party, on an app, through friends...',
      },
      {
        id: 'whatLikeMost',
        type: 'text',
        label: 'What do you like most about them?',
        placeholder: 'Their laugh, how they listen, their ambition...',
      },
      {
        id: 'datingIntensity',
        type: 'pills',
        label: 'How intense should the card be?',
        options: [
          { value: 'light', label: 'Keep it light' },
          { value: 'flirty', label: 'Flirty' },
          { value: 'earnest', label: 'Earnest' },
        ],
      },
    ],
  },
  {
    id: 'partnerDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about your partner',
    subtitle: 'These details help us write something personal',
    required: false,
    showIf: (answers) => answers.relationshipType === 'partner',
    fields: [
      {
        id: 'partnerType',
        type: 'pills',
        label: 'What type of partner?',
        options: [
          { value: 'spouse', label: 'Spouse' },
          { value: 'longTermPartner', label: 'Long-term partner' },
          { value: 'engaged', label: 'Engaged' },
        ],
      },
      {
        id: 'partnerDuration',
        type: 'pills',
        label: 'How long have you been together?',
        options: [
          { value: 'under1Year', label: 'Under 1 year' },
          { value: '1to5Years', label: '1-5 years' },
          { value: '5to10Years', label: '5-10 years' },
          { value: 'over10Years', label: '10+ years' },
        ],
      },
      {
        id: 'recentMoment',
        type: 'text',
        label: 'A recent moment you loved together?',
        placeholder: 'That trip, the lazy Sunday, a random Tuesday...',
      },
      {
        id: 'theirThing',
        type: 'text',
        label: 'What\'s "their thing"?',
        placeholder: 'Always dancing, the morning coffee ritual, their laugh...',
      },
      {
        id: 'partnerInsideJoke',
        type: 'text',
        label: 'Any inside joke or pet name?',
        placeholder: 'Something only you two would get...',
      },
    ],
  },
  {
    id: 'friendDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about your friend',
    subtitle: 'These details help us write something personal',
    required: false,
    showIf: (answers) => answers.relationshipType === 'friend',
    fields: [
      {
        id: 'friendDuration',
        type: 'pills',
        label: 'How long have you been friends?',
        options: [
          { value: 'newFriend', label: 'Pretty new' },
          { value: 'fewYears', label: 'A few years' },
          { value: 'longTime', label: 'A long time' },
          { value: 'forever', label: 'Forever' },
        ],
      },
      {
        id: 'friendHowMet',
        type: 'text',
        label: 'How did you meet?',
        placeholder: 'School, work, through someone, randomly...',
      },
      {
        id: 'friendSpecial',
        type: 'text',
        label: 'What makes them a good friend?',
        placeholder: 'Always there, makes me laugh, no judgment...',
      },
      {
        id: 'friendMemory',
        type: 'text',
        label: 'A memory you share?',
        placeholder: 'That road trip, the late night talks, that one time...',
      },
    ],
  },
  {
    id: 'parentDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about your parent',
    subtitle: 'These details help us write something personal',
    required: false,
    showIf: (answers) => answers.relationshipType === 'parent',
    fields: [
      {
        id: 'whichParent',
        type: 'pills',
        label: 'Which parent?',
        options: [
          { value: 'mom', label: 'Mom' },
          { value: 'dad', label: 'Dad' },
          { value: 'stepParent', label: 'Step-parent' },
          { value: 'parentFigure', label: 'Parent figure' },
        ],
      },
      {
        id: 'parentMeaning',
        type: 'text',
        label: 'What do they mean to you?',
        placeholder: 'My rock, my biggest supporter, always believed in me...',
      },
      {
        id: 'parentLesson',
        type: 'text',
        label: 'A lesson they taught you?',
        placeholder: 'Work hard, be kind, never give up...',
      },
      {
        id: 'parentAlways',
        type: 'text',
        label: '"They always..."',
        placeholder: 'Know what to say, make the best food, call at the right time...',
      },
    ],
  },
  {
    id: 'childDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about your child',
    subtitle: 'These details help us write something personal',
    required: false,
    showIf: (answers) => answers.relationshipType === 'child',
    fields: [
      {
        id: 'childAge',
        type: 'pills',
        label: 'How old are they?',
        options: [
          { value: 'baby', label: 'Baby/Toddler' },
          { value: 'kid', label: 'Kid (3-12)' },
          { value: 'teen', label: 'Teenager' },
          { value: 'adult', label: 'Adult' },
        ],
      },
      {
        id: 'childPhase',
        type: 'text',
        label: 'What phase are they in?',
        placeholder: 'Starting school, learning to drive, first job...',
      },
      {
        id: 'childProud',
        type: 'text',
        label: 'Something that made you proud?',
        placeholder: 'How they handled something, their kindness, their growth...',
      },
      {
        id: 'childKindOf',
        type: 'text',
        label: '"They\'re the kind of kid who..."',
        placeholder: 'Makes friends easily, asks a million questions, lights up a room...',
      },
    ],
  },
  {
    id: 'siblingDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about your sibling',
    subtitle: 'These details help us write something personal',
    required: false,
    showIf: (answers) => answers.relationshipType === 'sibling',
    fields: [
      {
        id: 'siblingType',
        type: 'pills',
        label: 'What kind of sibling?',
        options: [
          { value: 'brother', label: 'Brother' },
          { value: 'sister', label: 'Sister' },
          { value: 'stepSibling', label: 'Step-sibling' },
          { value: 'halfSibling', label: 'Half-sibling' },
        ],
      },
      {
        id: 'birthOrder',
        type: 'pills',
        label: 'Birth order?',
        options: [
          { value: 'older', label: 'They\'re older' },
          { value: 'younger', label: 'They\'re younger' },
          { value: 'twin', label: 'We\'re twins' },
        ],
      },
      {
        id: 'siblingDynamic',
        type: 'text',
        label: 'What\'s your dynamic now?',
        placeholder: 'Super close, reconnecting, friendly rivals...',
      },
      {
        id: 'siblingMemory',
        type: 'text',
        label: 'A childhood memory?',
        placeholder: 'Building forts, fighting over the remote, road trips...',
      },
      {
        id: 'siblingJoke',
        type: 'text',
        label: 'An inside joke?',
        placeholder: 'Something that still makes you both laugh...',
      },
    ],
  },
  {
    id: 'grandparentDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about your grandparent',
    subtitle: 'These details help us write something personal',
    required: false,
    showIf: (answers) => answers.relationshipType === 'grandparent',
    fields: [
      {
        id: 'whichGrandparent',
        type: 'pills',
        label: 'Which grandparent?',
        options: [
          { value: 'grandma', label: 'Grandma' },
          { value: 'grandpa', label: 'Grandpa' },
          { value: 'nana', label: 'Nana/Nanna' },
          { value: 'papa', label: 'Papa/Pop' },
        ],
      },
      {
        id: 'grandparentStyle',
        type: 'pills',
        label: 'Their relationship style?',
        options: [
          { value: 'spoiler', label: 'The spoiler' },
          { value: 'storyteller', label: 'The storyteller' },
          { value: 'advisor', label: 'The wise advisor' },
          { value: 'adventurer', label: 'Still adventurous' },
        ],
      },
      {
        id: 'grandparentMemory',
        type: 'text',
        label: 'A memory with them?',
        placeholder: 'Summer visits, their cooking, learning from them...',
      },
      {
        id: 'grandparentAlways',
        type: 'text',
        label: '"They always..."',
        placeholder: 'Have candy, tell the best stories, give the best hugs...',
      },
    ],
  },
  {
    id: 'professionalDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about them',
    subtitle: 'These details help us write something appropriate',
    required: false,
    showIf: (answers) => answers.relationshipType === 'professional',
    fields: [
      {
        id: 'professionalWho',
        type: 'pills',
        label: 'Who are they?',
        options: [
          { value: 'boss', label: 'Boss/Manager' },
          { value: 'coworker', label: 'Coworker' },
          { value: 'mentor', label: 'Mentor' },
          { value: 'client', label: 'Client' },
          { value: 'employee', label: 'Employee' },
        ],
      },
      {
        id: 'professionalContext',
        type: 'text',
        label: 'What\'s the context?',
        placeholder: 'Leaving the company, promotion, project completion...',
      },
      {
        id: 'professionalDid',
        type: 'text',
        label: 'What did they do?',
        placeholder: 'Helped me grow, delivered an amazing project, supported the team...',
      },
      {
        id: 'professionalTone',
        type: 'pills',
        label: 'How formal should it be?',
        options: [
          { value: 'casual', label: 'Pretty casual' },
          { value: 'warmPro', label: 'Warm but professional' },
          { value: 'formal', label: 'Formal' },
        ],
      },
    ],
  },
  {
    id: 'otherDetails',
    step: 'relationshipQuestions',
    type: 'form',
    title: 'Tell us about them',
    subtitle: 'These details help us write something personal',
    required: false,
    showIf: (answers) => answers.relationshipType === 'other',
    fields: [
      {
        id: 'otherRelationship',
        type: 'text',
        label: 'How do you know them?',
        placeholder: 'Neighbor, teacher, coach, distant relative...',
      },
      {
        id: 'otherContext',
        type: 'text',
        label: 'What\'s the context for this card?',
        placeholder: 'They helped me out, celebrating something, just grateful...',
      },
      {
        id: 'otherSpecial',
        type: 'text',
        label: 'What makes them special?',
        placeholder: 'Their kindness, their impact on me, what they did...',
      },
    ],
  },
];

// Step order for navigation
export const stepOrder: WizardStep[] = [
  'name',
  'relationship',
  'occasion',
  'coupleMode',
  'senderName',
  'coupleStory',
  'relationshipQuestions',
  'vibe',
  'humorType',
  'heartfeltDepth',
  'quickTraits',
  'preview',
];

// Get next step considering conditional logic
export function getNextStep(
  currentStep: WizardStep,
  answers: Record<string, unknown>
): WizardStep | null {
  const currentIndex = stepOrder.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === stepOrder.length - 1) return null;

  for (let i = currentIndex + 1; i < stepOrder.length; i++) {
    const nextStep = stepOrder[i];
    // Find ALL questions for this step (handles multiple conditional questions like relationshipQuestions)
    const stepQuestions = questions.filter((q) => q.step === nextStep);

    if (stepQuestions.length === 0) {
      // No questions for this step (like preview), include it
      return nextStep;
    }

    // Check if ANY question for this step should be shown
    const hasVisibleQuestion = stepQuestions.some(
      (q) => !q.showIf || q.showIf(answers)
    );

    if (hasVisibleQuestion) {
      return nextStep;
    }
  }

  return 'preview';
}

// Get previous step considering conditional logic
export function getPrevStep(
  currentStep: WizardStep,
  answers: Record<string, unknown>
): WizardStep | null {
  const currentIndex = stepOrder.indexOf(currentStep);
  if (currentIndex <= 0) return null;

  for (let i = currentIndex - 1; i >= 0; i--) {
    const prevStep = stepOrder[i];
    // Find ALL questions for this step (handles multiple conditional questions like relationshipQuestions)
    const stepQuestions = questions.filter((q) => q.step === prevStep);

    if (stepQuestions.length === 0) {
      // No questions for this step, include it
      return prevStep;
    }

    // Check if ANY question for this step should be shown
    const hasVisibleQuestion = stepQuestions.some(
      (q) => !q.showIf || q.showIf(answers)
    );

    if (hasVisibleQuestion) {
      return prevStep;
    }
  }

  return null;
}

// Calculate progress percentage
export function calculateProgress(
  currentStep: WizardStep,
  answers: Record<string, unknown>
): number {
  const activeSteps = stepOrder.filter((step) => {
    const stepQuestions = questions.filter((q) => q.step === step);
    // Step is active if it has no questions OR any question should be shown
    return stepQuestions.length === 0 || stepQuestions.some((q) => !q.showIf || q.showIf(answers));
  });

  const currentIndex = activeSteps.indexOf(currentStep);
  if (currentIndex === -1) return 0;

  return Math.round(((currentIndex + 1) / activeSteps.length) * 100);
}
