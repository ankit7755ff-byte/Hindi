import { ProgressData } from '../types';

const PROGRESS_KEY = 'namasteHindiProgress';

const getTodayDateString = (): string => new Date().toISOString().split('T')[0];

const getYesterdayDateString = (): string => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
};

export const getProgressData = (): ProgressData => {
    try {
        const data = localStorage.getItem(PROGRESS_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Failed to parse progress data from localStorage", error);
    }
    // Default data if none exists
    return {
        streak: 0,
        lastActivityDate: null,
        quizzesCompleted: 0,
        totalCorrect: 0,
        totalQuestions: 0,
    };
};

export const saveProgressData = (data: ProgressData): void => {
    try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save progress data to localStorage", error);
    }
};

export const updateProgressOnQuizCompletion = (score: number, totalQuestionsInQuiz: number): void => {
    const data = getProgressData();
    const today = getTodayDateString();

    // Only update streak if the last activity was not today
    if (data.lastActivityDate !== today) {
        const yesterday = getYesterdayDateString();
        if (data.lastActivityDate === yesterday) {
            // Consecutive day
            data.streak += 1;
        } else {
            // Missed a day or first time
            data.streak = 1;
        }
        data.lastActivityDate = today;
    }
    
    data.quizzesCompleted += 1;
    data.totalCorrect += score;
    data.totalQuestions += totalQuestionsInQuiz;

    saveProgressData(data);
};

export const resetProgressData = (): ProgressData => {
    const initialData: ProgressData = {
        streak: 0,
        lastActivityDate: null,
        quizzesCompleted: 0,
        totalCorrect: 0,
        totalQuestions: 0,
    };
    saveProgressData(initialData);
    return initialData;
};
