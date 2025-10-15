
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 mb-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-brand-blue tracking-tight">
        Namaste <span className="text-brand-saffron">Hindi</span>
      </h1>
      <p className="mt-2 text-lg text-gray-600">Your AI-powered guide to learning Hindi</p>
    </header>
  );
};

export default Header;
