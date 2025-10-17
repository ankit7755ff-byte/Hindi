import React from 'react';
import { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isAdmin: boolean;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, isAdmin }) => {
  const allTabs: { id: Tab; label: string }[] = [
    { id: 'translate', label: 'Translator' },
    { id: 'phrases', label: 'Phrasebook' },
    { id: 'image', label: 'Image ID' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'progress', label: 'Progress' },
    { id: 'profile', label: 'My Profile' },
    { id: 'referral', label: 'Refer & Earn' },
    { id: 'invest', label: 'Invest & Earn' },
    { id: 'services', label: 'Services' },
    { id: 'admin', label: 'Admin Panel' },
  ];

  const visibleTabs = isAdmin ? allTabs : allTabs.filter(tab => tab.id !== 'admin');

  return (
    <div className="flex justify-center bg-white/60 backdrop-blur-sm rounded-full shadow-inner p-1.5 space-x-1 flex-wrap">
      {visibleTabs.map((tab) => (
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