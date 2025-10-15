import React from 'react';
import { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'translate', label: 'Translator' },
    { id: 'phrases', label: 'Phrasebook' },
    { id: 'image', label: 'Image ID' },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <div className="flex justify-center bg-white/60 backdrop-blur-sm rounded-full shadow-inner p-1.5 space-x-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 sm:px-6 py-2.5 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 focus:outline-none ${
            activeTab === tab.id
              ? 'bg-brand-blue text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
