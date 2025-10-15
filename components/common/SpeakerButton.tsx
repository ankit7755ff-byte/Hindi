
import React from 'react';

interface SpeakerButtonProps {
  textToSpeak: string;
  lang?: string;
}

const SpeakerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);


const SpeakerButton: React.FC<SpeakerButtonProps> = ({ textToSpeak, lang = 'hi-IN' }) => {
  const handleSpeak = () => {
    if ('speechSynthesis' in window && textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang;
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  return (
    <button
      onClick={handleSpeak}
      className="p-2 rounded-full text-brand-blue hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-colors duration-200"
      aria-label="Listen to pronunciation"
    >
        <SpeakerIcon className="w-6 h-6" />
    </button>
  );
};

export default SpeakerButton;
