'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import { cn } from '~/src/util';
import { Sparkles, RefreshCw } from 'lucide-react';

import { cards } from '../constants';
import type { WizardAnswers } from '../models';
import { useCardStore } from '../store';
import {
  calculateProgress,
  getNextStep,
  getPrevStep,
  questions,
  type QuestionOption,
} from './questions';

function WizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('card');

  const card = useMemo(() => cards.find((c) => c.id === cardId), [cardId]);

  const wizardStep = useCardStore((s) => s.wizardStep);
  const wizardAnswers = useCardStore((s) => s.wizardAnswers);
  const setWizardStep = useCardStore((s) => s.setWizardStep);
  const setWizardAnswer = useCardStore((s) => s.setWizardAnswer);
  const startWizard = useCardStore((s) => s.startWizard);
  const resetWizard = useCardStore((s) => s.resetWizard);

  // Track initialization to prevent stale state flash
  const [isInitialized, setIsInitialized] = useState(false);

  // Message generation state
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize wizard on mount
  useEffect(() => {
    startWizard();
    setIsInitialized(true);
    return () => resetWizard();
  }, [startWizard, resetWizard]);

  const currentQuestion = useMemo(
    () => {
      // Find all questions for this step
      const stepQuestions = questions.filter((q) => q.step === wizardStep);
      // Return the one whose showIf condition passes (or has no showIf)
      return stepQuestions.find((q) => !q.showIf || q.showIf(wizardAnswers));
    },
    [wizardStep, wizardAnswers]
  );

  // Resolve options dynamically (filters based on previous answers)
  const resolvedOptions = currentQuestion?.getOptions
    ? currentQuestion.getOptions(wizardAnswers)
    : currentQuestion?.options;

  const progress = useMemo(
    () => calculateProgress(wizardStep, wizardAnswers),
    [wizardStep, wizardAnswers]
  );

  const canGoBack = useMemo(
    () => getPrevStep(wizardStep, wizardAnswers) !== null,
    [wizardStep, wizardAnswers]
  );

  const canGoNext = useMemo(() => {
    if (!currentQuestion) return wizardStep === 'preview';

    const answer = wizardAnswers[currentQuestion.id as keyof WizardAnswers];

    if (!currentQuestion.required) return true;

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    return answer !== undefined && answer !== '';
  }, [currentQuestion, wizardAnswers, wizardStep]);

  const handleBack = useCallback(() => {
    const prevStep = getPrevStep(wizardStep, wizardAnswers);
    if (prevStep) {
      setWizardStep(prevStep);
    } else {
      // Go back to card gallery
      router.back();
    }
  }, [wizardStep, wizardAnswers, setWizardStep, router]);

  const handleNext = useCallback(() => {
    const nextStep = getNextStep(wizardStep, wizardAnswers);
    if (nextStep) {
      setWizardStep(nextStep);
    }
  }, [wizardStep, wizardAnswers, setWizardStep]);

  // Auto-advance on single-select grid questions
  const handleGridSelect = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      setWizardAnswer(currentQuestion.id as keyof WizardAnswers, value);
      // Auto-advance after brief delay
      setTimeout(() => {
        const nextStep = getNextStep(wizardStep, { ...wizardAnswers, [currentQuestion.id]: value });
        if (nextStep) {
          setWizardStep(nextStep);
        }
      }, 200);
    },
    [currentQuestion, wizardStep, wizardAnswers, setWizardAnswer, setWizardStep]
  );

  const handleMultiSelect = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      const current = (wizardAnswers[currentQuestion.id as keyof WizardAnswers] as string[]) ?? [];
      const maxSelect = currentQuestion.maxSelect ?? Infinity;

      let newValue: string[];
      if (current.includes(value)) {
        newValue = current.filter((v) => v !== value);
      } else if (current.length < maxSelect) {
        newValue = [...current, value];
      } else {
        return;
      }

      setWizardAnswer(currentQuestion.id as keyof WizardAnswers, newValue);
    },
    [currentQuestion, wizardAnswers, setWizardAnswer]
  );

  const handleChipSelect = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      const current = (wizardAnswers[currentQuestion.id as keyof WizardAnswers] as string[]) ?? [];

      const newValue = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setWizardAnswer(currentQuestion.id as keyof WizardAnswers, newValue);
    },
    [currentQuestion, wizardAnswers, setWizardAnswer]
  );

  const handleTextChange = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      setWizardAnswer(currentQuestion.id as keyof WizardAnswers, value);
    },
    [currentQuestion, setWizardAnswer]
  );

  const handleTextSubmit = useCallback(() => {
    if (canGoNext) {
      handleNext();
    }
  }, [canGoNext, handleNext]);

  const handleFormChange = useCallback(
    (fieldId: string, value: string) => {
      setWizardAnswer(fieldId as keyof WizardAnswers, value);
    },
    [setWizardAnswer]
  );

  const handleGenerateMessage = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Extract relationship-specific details from wizard answers
      const relationshipDetails: Record<string, string> = {};
      const relationshipFieldKeys = [
        // Dating
        'datingDuration', 'howMet', 'whatLikeMost', 'datingIntensity',
        // Partner
        'partnerType', 'partnerDuration', 'recentMoment', 'theirThing', 'partnerInsideJoke',
        // Friend
        'friendDuration', 'friendHowMet', 'friendSpecial', 'friendMemory',
        // Parent
        'whichParent', 'parentMeaning', 'parentLesson', 'parentAlways',
        // Child
        'childAge', 'childPhase', 'childProud', 'childKindOf',
        // Sibling
        'siblingType', 'birthOrder', 'siblingDynamic', 'siblingMemory', 'siblingJoke',
        // Grandparent
        'whichGrandparent', 'grandparentStyle', 'grandparentMemory', 'grandparentAlways',
        // Professional
        'professionalWho', 'professionalContext', 'professionalDid', 'professionalTone',
        // Other
        'otherRelationship', 'otherContext', 'otherSpecial',
      ];

      for (const key of relationshipFieldKeys) {
        const value = wizardAnswers[key as keyof WizardAnswers];
        if (typeof value === 'string' && value.trim()) {
          relationshipDetails[key] = value;
        }
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: wizardAnswers.name,
          relationship: wizardAnswers.relationshipType,
          occasion: wizardAnswers.occasion,
          vibes: wizardAnswers.vibes,
          humorType: wizardAnswers.humorType,
          heartfeltDepth: wizardAnswers.heartfeltDepth,
          quickTraits: wizardAnswers.quickTraits,
          coupleMode: wizardAnswers.coupleMode,
          senderName: wizardAnswers.senderName,
          coupleStory: wizardAnswers.coupleStory,
          relationshipDetails: Object.keys(relationshipDetails).length > 0 ? relationshipDetails : undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedMessage(data.message);
      }
    } catch {
      // Silently fail
    } finally {
      setIsGenerating(false);
    }
  }, [wizardAnswers]);

  const handleViewCards = useCallback(() => {
    // Store message in session for the card page to use
    if (generatedMessage) {
      sessionStorage.setItem('wizardMessage', generatedMessage);
      sessionStorage.setItem('wizardAnswers', JSON.stringify(wizardAnswers));
    }
    router.push('/card');
  }, [generatedMessage, wizardAnswers, router]);

  // Show loading until initialized to prevent stale state flash
  if (!isInitialized) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-stone-50">
        <div className="size-8 animate-spin rounded-full border-2 border-stone-300 border-t-stone-800" />
      </div>
    );
  }

  // Preview step - generate message and show results
  if (wizardStep === 'preview') {
    return (
      <div className="flex min-h-dvh flex-col bg-stone-50">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-stone-50/95 px-4 py-4 backdrop-blur-sm sm:px-6">
          <button
            onClick={handleBack}
            className="flex size-10 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-700"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="mx-4 h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200 sm:mx-8">
            <motion.div
              className="h-full bg-stone-700"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="w-10" />
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-8 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg text-center"
          >
            {!generatedMessage && !isGenerating && (
              <>
                <div className="mb-6 text-6xl">✨</div>
                <h1 className="mb-3 text-3xl font-medium text-stone-800">
                  Let&apos;s write your message
                </h1>
                <p className="mb-8 text-lg text-stone-600">
                  Based on what you told us, we&apos;ll craft something that sounds like you.
                </p>
                <button
                  onClick={handleGenerateMessage}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-800 py-4 text-lg font-medium text-white transition-all hover:bg-stone-700"
                >
                  <Sparkles className="size-5" />
                  Generate Message
                </button>
              </>
            )}

            {isGenerating && (
              <>
                <div className="mb-6 animate-pulse text-6xl">✨</div>
                <h1 className="mb-3 text-3xl font-medium text-stone-800">
                  Writing your message...
                </h1>
                <p className="text-lg text-stone-600">
                  Just a moment while we craft something special.
                </p>
              </>
            )}

            {generatedMessage && !isGenerating && (
              <>
                <h1 className="mb-6 text-2xl font-medium text-stone-800">
                  Here&apos;s your message for {wizardAnswers.name}
                </h1>
                <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 text-left shadow-sm">
                  <p className="whitespace-pre-wrap text-lg leading-relaxed text-stone-700">
                    {generatedMessage}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleViewCards}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-800 py-4 text-lg font-medium text-white transition-all hover:bg-stone-700"
                  >
                    Choose a Card
                  </button>
                  <button
                    onClick={handleGenerateMessage}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white py-3 text-stone-700 transition-all hover:bg-stone-50"
                  >
                    <RefreshCw className="size-4" />
                    Try a different message
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-stone-50/95 px-4 py-4 backdrop-blur-sm sm:px-6">
        <button
          onClick={handleBack}
          className="flex size-10 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-700"
        >
          <ArrowLeft className="size-5" />
        </button>

        {/* Progress bar */}
        <div className="mx-4 h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200 sm:mx-8">
          <motion.div
            className="h-full bg-stone-700"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="w-10" /> {/* Spacer for symmetry */}
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-8 sm:px-6">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="flex w-full max-w-2xl flex-col items-center"
            >
              {/* Question */}
              <div className="mb-10 text-center">
                <h1 className="text-3xl font-medium text-stone-800 sm:text-4xl">
                  {currentQuestion.title}
                </h1>
                {currentQuestion.subtitle && (
                  <p className="mt-3 text-lg text-stone-500">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              {/* Input */}
              <div className="w-full">
                {currentQuestion.type === 'text' && (
                  <div className="mx-auto max-w-md">
                    <input
                      type="text"
                      value={(wizardAnswers[currentQuestion.id as keyof WizardAnswers] as string) ?? ''}
                      onChange={(e) => handleTextChange(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                      placeholder={currentQuestion.placeholder}
                      autoFocus
                      className="w-full border-b-2 border-stone-300 bg-transparent py-4 text-center text-2xl text-stone-800 placeholder:text-stone-400 focus:border-stone-700 focus:outline-none"
                    />
                    <button
                      onClick={handleNext}
                      disabled={!canGoNext}
                      className={cn(
                        'mt-8 w-full rounded-full py-4 text-lg font-medium transition-all',
                        canGoNext
                          ? 'bg-stone-800 text-white hover:bg-stone-700'
                          : 'cursor-not-allowed bg-stone-200 text-stone-400'
                      )}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {currentQuestion.type === 'textarea' && (
                  <div className="mx-auto max-w-lg">
                    <textarea
                      value={(wizardAnswers[currentQuestion.id as keyof WizardAnswers] as string) ?? ''}
                      onChange={(e) => handleTextChange(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      autoFocus
                      rows={4}
                      className="w-full resize-none rounded-xl border-2 border-stone-300 bg-white px-4 py-4 text-lg text-stone-800 placeholder:text-stone-400 focus:border-stone-700 focus:outline-none"
                    />
                    <button
                      onClick={handleNext}
                      className={cn(
                        'mt-8 w-full rounded-full py-4 text-lg font-medium transition-all',
                        'bg-stone-800 text-white hover:bg-stone-700'
                      )}
                    >
                      {canGoNext ? 'Continue' : 'Skip'}
                    </button>
                  </div>
                )}

                {currentQuestion.type === 'grid' && (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.03 } },
                    }}
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
                  >
                    {(resolvedOptions as QuestionOption<string>[])?.map((option) => {
                      const isSelected =
                        wizardAnswers[currentQuestion.id as keyof WizardAnswers] === option.value;
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            show: { opacity: 1, scale: 1 },
                          }}
                          onClick={() => handleGridSelect(option.value)}
                          className={cn(
                            'flex flex-col items-center justify-center gap-2 rounded-2xl border-2 px-4 py-6 transition-all',
                            'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2',
                            isSelected
                              ? 'border-stone-800 bg-stone-800 text-white'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                          )}
                        >
                          {option.emoji && (
                            <span className="text-4xl" role="img" aria-hidden>
                              {option.emoji}
                            </span>
                          )}
                          <span className="text-center text-sm font-medium leading-tight sm:text-base">
                            {option.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}

                {currentQuestion.type === 'multiSelect' && (
                  <>
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.03 } },
                      }}
                      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
                    >
                      {(resolvedOptions as QuestionOption<string>[])?.map((option) => {
                        const selected =
                          (wizardAnswers[currentQuestion.id as keyof WizardAnswers] as string[]) ?? [];
                        const isSelected = selected.includes(option.value);
                        return (
                          <motion.button
                            key={option.value}
                            type="button"
                            variants={{
                              hidden: { opacity: 0, scale: 0.95 },
                              show: { opacity: 1, scale: 1 },
                            }}
                            onClick={() => handleMultiSelect(option.value)}
                            className={cn(
                              'flex flex-col items-center justify-center gap-2 rounded-2xl border-2 px-4 py-6 transition-all',
                              'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2',
                              isSelected
                                ? 'border-stone-800 bg-stone-800 text-white'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                            )}
                          >
                            {option.emoji && (
                              <span className="text-4xl" role="img" aria-hidden>
                                {option.emoji}
                              </span>
                            )}
                            <span className="text-center text-sm font-medium leading-tight sm:text-base">
                              {option.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                    <button
                      onClick={handleNext}
                      disabled={!canGoNext}
                      className={cn(
                        'mx-auto mt-8 block w-full max-w-md rounded-full py-4 text-lg font-medium transition-all',
                        canGoNext
                          ? 'bg-stone-800 text-white hover:bg-stone-700'
                          : 'cursor-not-allowed bg-stone-200 text-stone-400'
                      )}
                    >
                      Continue
                    </button>
                  </>
                )}

                {currentQuestion.type === 'list' && (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.04 } },
                    }}
                    className="mx-auto flex max-w-lg flex-col gap-3"
                  >
                    {(resolvedOptions as QuestionOption<string>[])?.map((option) => {
                      const isSelected =
                        wizardAnswers[currentQuestion.id as keyof WizardAnswers] === option.value;
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            show: { opacity: 1, x: 0 },
                          }}
                          onClick={() => handleGridSelect(option.value)}
                          className={cn(
                            'rounded-xl border-2 px-6 py-4 text-left transition-all',
                            'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2',
                            isSelected
                              ? 'border-stone-800 bg-stone-800 text-white'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                          )}
                        >
                          <span className="font-medium">{option.label}</span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}

                {currentQuestion.type === 'chips' && (
                  <>
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.02 } },
                      }}
                      className="flex flex-wrap justify-center gap-2"
                    >
                      {(resolvedOptions as QuestionOption<string>[])?.map((option) => {
                        const selected =
                          (wizardAnswers[currentQuestion.id as keyof WizardAnswers] as string[]) ?? [];
                        const isSelected = selected.includes(option.value);
                        return (
                          <motion.button
                            key={option.value}
                            type="button"
                            variants={{
                              hidden: { opacity: 0, scale: 0.9 },
                              show: { opacity: 1, scale: 1 },
                            }}
                            onClick={() => handleChipSelect(option.value)}
                            className={cn(
                              'flex items-center gap-2 rounded-full border px-4 py-2 transition-all',
                              'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2',
                              isSelected
                                ? 'border-stone-800 bg-stone-800 text-white'
                                : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                            )}
                          >
                            {option.emoji && (
                              <span className="text-lg" role="img" aria-hidden>
                                {option.emoji}
                              </span>
                            )}
                            <span className="text-sm font-medium">{option.label}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                    <button
                      onClick={handleNext}
                      className="mx-auto mt-8 block w-full max-w-md rounded-full bg-stone-800 py-4 text-lg font-medium text-white transition-all hover:bg-stone-700"
                    >
                      {canGoNext ? 'Continue' : 'Skip'}
                    </button>
                  </>
                )}

                {currentQuestion.type === 'form' && currentQuestion.fields && (
                  <div className="mx-auto max-w-lg">
                    <div className="flex flex-col gap-8">
                      {currentQuestion.fields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex flex-col gap-3"
                        >
                          <label className="text-sm font-medium text-stone-600">
                            {field.label}
                          </label>

                          {field.type === 'pills' && field.options && (
                            <div className="flex flex-wrap gap-2">
                              {field.options.map((option) => {
                                const isSelected = wizardAnswers[field.id as keyof WizardAnswers] === option.value;
                                return (
                                  <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleFormChange(field.id, option.value)}
                                    className={cn(
                                      'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                                      'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2',
                                      isSelected
                                        ? 'border-stone-800 bg-stone-800 text-white'
                                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                                    )}
                                  >
                                    {option.label}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {field.type === 'text' && (
                            <input
                              type="text"
                              value={(wizardAnswers[field.id as keyof WizardAnswers] as string) ?? ''}
                              onChange={(e) => handleFormChange(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              className={cn(
                                'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-800',
                                'placeholder:text-stone-400',
                                'focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200',
                                'transition-colors'
                              )}
                            />
                          )}

                          {field.type === 'textarea' && (
                            <textarea
                              value={(wizardAnswers[field.id as keyof WizardAnswers] as string) ?? ''}
                              onChange={(e) => handleFormChange(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              rows={3}
                              className={cn(
                                'w-full resize-none rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-800',
                                'placeholder:text-stone-400',
                                'focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200',
                                'transition-colors'
                              )}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <button
                      onClick={handleNext}
                      className="mt-10 w-full rounded-full bg-stone-800 py-4 text-lg font-medium text-white transition-all hover:bg-stone-700"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-stone-50">
          <div className="size-8 animate-spin rounded-full border-2 border-stone-300 border-t-stone-800" />
        </div>
      }
    >
      <WizardContent />
    </Suspense>
  );
}
