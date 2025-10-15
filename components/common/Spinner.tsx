
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-16 h-16 border-4 border-brand-saffron border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
