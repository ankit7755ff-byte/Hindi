import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { getProgressData, resetProgressData } from '../services/progressService';
import { ProgressData } from '../types';

const FlameIcon: React.FC<{className?: string}> = ({className = "h-12 w-12 text-orange-500"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 2.5C12.001 2.5 6.635 8.336 6.635 12.645C6.635 17.135 10.332 19.5 12.001 19.5C13.67 19.5 17.367 17.135 17.367 12.645C17.367 8.336 12.001 2.5 12.001 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.332 15.66C10.332 15.66 12.001 13.045 12.001 11.025C12.001 9.00501 10.832 8.00001 10.332 9.50001C9.83201 11 10.332 12.66 10.332 15.66Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; subtext?: string }> = ({ title, value, icon, subtext }) => (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105">
        {icon}
        <p className="text-4xl font-bold text-brand-blue mt-2">{value}</p>
        <p className="text-gray-600 font-semibold">{title}</p>
        {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
    </div>
);

const ProgressTracker: React.FC = () => {
    const [progress, setProgress] = useState<ProgressData>(getProgressData());

    useEffect(() => {
        setProgress(getProgressData());
    }, []);

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all your learning progress? This action cannot be undone.")) {
            const newProgress = resetProgressData();
            setProgress(newProgress);
        }
    };

    const accuracy = progress.totalQuestions > 0 
        ? ((progress.totalCorrect / progress.totalQuestions) * 100).toFixed(0) + '%' 
        : 'N/A';

    return (
        <Card>
            <h2 className="text-2xl font-bold text-center text-brand-dark mb-6">Your Learning Journey</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard 
                    title="Daily Streak"
                    value={progress.streak}
                    icon={<FlameIcon />}
                    subtext={progress.streak > 0 ? "Keep the fire burning!" : "Start a quiz to begin!"}
                />
                 <StatCard 
                    title="Quizzes Completed"
                    value={progress.quizzesCompleted}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                 <StatCard 
                    title="Overall Accuracy"
                    value={accuracy}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    }
                />
            </div>
            
            <div className="text-center">
                <Button onClick={handleReset} variant="secondary">
                    Reset Progress
                </Button>
            </div>
        </Card>
    );
};

export default ProgressTracker;
