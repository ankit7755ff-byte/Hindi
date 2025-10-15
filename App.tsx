import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Translator from './components/Translator';
import Phrasebook from './components/Phrasebook';
import ImageIdentifier from './components/ImageIdentifier';
import Quiz from './components/Quiz';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('translate');

  const renderContent = () => {
    switch (activeTab) {
      case 'translate':
        return <Translator />;
      case 'phrases':
        return <Phrasebook />;
      case 'image':
        return <ImageIdentifier />;
      case 'quiz':
        return <Quiz />;
      default:
        return <Translator />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-6">
            {renderContent()}
          </div>
        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Gemini API. Designed for learning and exploration.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
