import React, { useState, useCallback } from 'react';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion, PhraseCategory } from '../types';
import { PHRASE_CATEGORIES } from '../constants';
import Card from './common/Card';
import Button from './common/Button';
import Spinner from './common/Spinner';

type QuizState = 'idle' | 'loading' | 'active' | 'finished';

const Quiz: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory>('greetings');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [error, setError] = useState<string | null>(null);

  const startQuiz = useCallback(async () => {
    setQuizState('loading');
    setError(null);
    try {
      const fetchedQuestions = await generateQuiz(selectedCategory);
      if (fetchedQuestions.length === 0) {
        throw new Error("No questions were generated.");
      }
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setQuizState('active');
    } catch (err) {
      setError('Failed to start the quiz. Please try again.');
      setQuizState('idle');
    }
  }, [selectedCategory]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizState('finished');
    }
  };

  const resetQuiz = () => {
    setQuizState('idle');
    setQuestions([]);
  };

  const getOptionClasses = (index: number) => {
    if (selectedAnswer === null) {
      return 'bg-white hover:bg-blue-50 border-gray-300';
    }
    const isCorrect = index === questions[currentQuestionIndex].correctAnswerIndex;
    const isSelected = index === selectedAnswer;

    if (isCorrect) return 'bg-green-200 border-green-400';
    if (isSelected && !isCorrect) return 'bg-red-200 border-red-400';
    
    return 'bg-white border-gray-300 opacity-60';
  };

  const renderContent = () => {
    switch (quizState) {
      case 'loading':
        return <Spinner />;
      case 'active':
        const currentQuestion = questions[currentQuestionIndex];
        return (
          <div>
            <div className="flex justify-between items-center mb-4 text-gray-600">
                <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
                <span>Score: {score}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6">{currentQuestion.question}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 font-hindi text-2xl border-2 rounded-lg text-center transition-all duration-300 ${getOptionClasses(index)}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer !== null && (
              <div className="text-center mt-6">
                <Button onClick={nextQuestion}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              </div>
            )}
          </div>
        );
      case 'finished':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue mb-2">Quiz Complete!</h2>
            <p className="text-xl text-gray-700 mb-4">You scored {score} out of {questions.length}.</p>
            <Button onClick={resetQuiz}>Play Again</Button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Hindi Knowledge Quiz</h2>
            <p className="text-gray-600 mb-6">Select a category and test your skills!</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {PHRASE_CATEGORIES.map(({ id, label, emoji }) => (
                <button
                    key={id}
                    onClick={() => setSelectedCategory(id)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    selectedCategory === id
                        ? 'bg-brand-saffron text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {emoji} {label}
                </button>
                ))}
            </div>
            <Button onClick={startQuiz} variant="secondary">Start Quiz</Button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        );
    }
  };

  return (
    <Card>
      <div className="min-h-[300px] flex flex-col justify-center">
        {renderContent()}
      </div>
    </Card>
  );
};

export default Quiz;
