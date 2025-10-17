export type Tab = 'translate' | 'phrases' | 'image' | 'quiz' | 'progress' | 'profile' | 'referral' | 'invest' | 'services' | 'admin';

export interface TranslationResult {
  hindi: string;
  romanized: string;
}

export interface Phrase {
  english: string;
  hindi: string;

  romanized: string;
}

export type PhraseCategory = 'greetings' | 'travel' | 'food' | 'emergency';

export interface PhraseCategoryDetail {
  id: PhraseCategory;
  label: string;
  emoji: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface ProgressData {
  streak: number;
  lastActivityDate: string | null;
  quizzesCompleted: number;
  totalCorrect: number;
  totalQuestions: number;
}