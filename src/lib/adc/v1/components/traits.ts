/**
 * ADC v1 — Personality Trait Injectors
 *
 * Maps quick traits to natural language descriptions for personalization.
 */

import type { QuickTrait } from '../../types';

/** Trait descriptions — human-readable personality markers */
export const TRAIT_DESCRIPTIONS: Record<QuickTrait, string> = {
  bookworm: 'loves reading',
  coffeeAddict: 'runs on coffee',
  dogPerson: 'adores dogs',
  catPerson: 'loves cats',
  foodie: 'passionate about food',
  adventurer: 'loves adventure and travel',
  homebody: 'enjoys cozy time at home',
  nightOwl: 'comes alive at night',
  earlyBird: 'rises with the sun',
  techie: 'loves technology',
  creative: 'has an artistic soul',
  fitness: 'dedicated to fitness',
};

/**
 * Build personality context from quick traits
 */
export function buildTraitsContext(quickTraits?: string[]): string {
  if (!quickTraits?.length) {
    return '';
  }

  const descriptions = quickTraits
    .map((t) => TRAIT_DESCRIPTIONS[t as QuickTrait] || t)
    .join(', ');

  return `\nAbout them: ${descriptions}.`;
}

/** Human-readable labels for relationship detail fields */
const FIELD_LABELS: Record<string, string> = {
  // Dating
  datingDuration: 'Been dating',
  howMet: 'How they met',
  whatLikeMost: 'What they like about them',
  datingIntensity: 'Card intensity',
  // Partner
  partnerType: 'Partner type',
  partnerDuration: 'Together for',
  recentMoment: 'Recent moment together',
  theirThing: 'Their thing',
  partnerInsideJoke: 'Inside joke',
  // Friend
  friendDuration: 'Friends for',
  friendHowMet: 'How they met',
  friendSpecial: 'What makes them a good friend',
  friendMemory: 'A shared memory',
  // Parent
  whichParent: 'Which parent',
  parentMeaning: 'What they mean',
  parentLesson: 'A lesson they taught',
  parentAlways: 'They always',
  // Child
  childAge: 'Age',
  childPhase: 'Current phase',
  childProud: 'Proud of',
  childKindOf: 'Kind of kid',
  // Sibling
  siblingType: 'Sibling type',
  birthOrder: 'Birth order',
  siblingDynamic: 'Their dynamic',
  siblingMemory: 'Childhood memory',
  siblingJoke: 'Inside joke',
  // Grandparent
  whichGrandparent: 'Which grandparent',
  grandparentStyle: 'Relationship style',
  grandparentMemory: 'A memory',
  grandparentAlways: 'They always',
  // Professional
  professionalWho: 'Who they are',
  professionalContext: 'Context',
  professionalDid: 'What they did',
  professionalTone: 'Tone',
  // Other
  otherRelationship: 'How they know them',
  otherContext: 'Context',
  otherSpecial: 'What makes them special',
};

/**
 * Build relationship details context from dynamic Q&A answers
 */
export function buildRelationshipContext(
  relationshipDetails?: Record<string, string>,
): string {
  if (!relationshipDetails || Object.keys(relationshipDetails).length === 0) {
    return '';
  }

  const entries = Object.entries(relationshipDetails)
    .filter(([, value]) => value && value.trim())
    .map(([key, value]) => {
      const label = FIELD_LABELS[key] || key;
      return `${label}: ${value}`;
    });

  if (entries.length === 0) {
    return '';
  }

  return `\nPersonal details shared:\n- ${entries.join('\n- ')}`;
}

/**
 * Build legacy details context (for backward compatibility)
 */
export function buildDetailsContext(details?: string): string {
  if (!details) {
    return '';
  }
  return `\nAdditional context: ${details}`;
}
