import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Translator from './components/Translator';
import Phrasebook from './components/Phrasebook';
import ImageIdentifier from './components/ImageIdentifier';
import Quiz from './components/Quiz';
import ProgressTracker from './components/ProgressTracker';
import Referral from './components/Referral';
import MembershipScreen from './components/MembershipScreen';
import InvestAndEarn from './components/InvestAndEarn';
import Services from './components/Services';
import AdminPanel from './components/AdminPanel';
import MyProfile from './components/MyProfile';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('translate');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminUser = urlParams.get('admin') === 'true';
    setIsAdmin(isAdminUser);

    const subscriptionStatus = localStorage.getItem('namasteHindiSubscription');
    if (subscriptionStatus === 'true' || isAdminUser) {
      setIsSubscribed(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubscribe = () => {
    localStorage.setItem('namasteHindiSubscription', 'true');
    setIsSubscribed(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('namasteHindiSubscription');
    setIsSubscribed(false);
    setActiveTab('translate');
  };

  const handleSetTab = (tab: Tab) => {
    if (tab === 'admin' && !isAdmin) {
      setActiveTab('translate');
    } else {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    if (activeTab === 'admin' && !isAdmin) {
        return <Translator />;
    }

    switch (activeTab) {
      case 'translate':
        return <Translator />;
      case 'phrases':
        return <Phrasebook />;
      case 'image':
        return <ImageIdentifier />;
      case 'quiz':
        return <Quiz />;
      case 'progress':
        return <ProgressTracker />;
      case 'profile':
        return <MyProfile onLogout={handleLogout} />;
      case 'referral':
        return <Referral />;
      case 'invest':
        return <InvestAndEarn />;
      case 'services':
        return <Services />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Translator />;
    }
  };
  
  if (isLoading) {
    return (
        <div className="min-h-screen bg-brand-light flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-saffron border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }


  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {isSubscribed ? (
        <div className="w-full max-w-4xl mx-auto">
          <Header />
          <main>
            <Tabs activeTab={activeTab} setActiveTab={handleSetTab} isAdmin={isAdmin} />
            <div className="mt-6">
              {renderContent()}
            </div>
          </main>
          <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Gemini API. Designed for learning and exploration.</p>
            {isAdmin && <p className="text-brand-saffron mt-2 font-semibold">Admin Mode Active</p>}
          </footer>
        </div>
      ) : (
        <MembershipScreen onSubscribe={handleSubscribe} />
      )}
    </div>
  );
};

export default App;