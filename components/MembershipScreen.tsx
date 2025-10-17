import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';

const PremiumIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v2" />
    </svg>
);

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-green mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const QrCodeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 256 256">
        <path fill="currentColor" d="M64 64h32v32H64zm32 96h32v32h-32zm-64 0h32v32H32zm0-64h32v32H32zm64 0h32v32H96zM32 32h64v32H32zm134.1 82.1L150.6 98.6a8 8 0 0 0-11.3 0L123.8 114a8 8 0 0 0-2.3 5.7a8.1 8.1 0 0 0 2.3 5.7l15.5 15.5a8 8 0 0 0 11.3 0l15.5-15.5a8 8 0 0 0 2.3-11.3ZM224 32h-64v32h32v32h32zm-32 160h32v32h-32zm-32-32h32v32h-32zm64-32h-32v32h32zm-64-32h32v32h-32zm-64-64v32H32V96h32v32h32V96h32v64H96v32h64v-32h32v-32h32v-32h-32V96h-32V64h32V32h-32v32h-32v32h-32V64H96V32H64v32H32v32h32Z"/>
    </svg>
);

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const WalletIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

interface MembershipScreenProps {
  onSubscribe: () => void;
}

const MembershipScreen: React.FC<MembershipScreenProps> = ({ onSubscribe }) => {
  const features = [
    'Unlimited AI Translations',
    'Full Phrasebook Access',
    'Image Identification Feature',
    'All Quiz Categories',
    'Track Your Progress',
    'Ad-Free Experience',
  ];
  const upiId = 'namaste-hindi@upi';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-center py-12">
        <Card className="w-full">
            <div className="flex flex-col items-center text-center p-4">
                <PremiumIcon />
                <h1 className="text-3xl font-bold text-brand-dark mt-4">Unlock Your Full Potential</h1>
                <p className="text-gray-600 mt-2">
                    Join Namaste Hindi Premium to access all features and accelerate your learning.
                </p>

                <div className="my-8 text-left w-full max-w-xs">
                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <CheckIcon />
                                <span className="text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="bg-blue-50 border-2 border-brand-blue rounded-lg p-6 w-full max-w-sm">
                    <p className="text-lg font-semibold text-brand-blue">Monthly Membership</p>
                    <p className="text-5xl font-bold text-brand-dark my-2">
                        ₹20<span className="text-xl font-normal text-gray-500">/month</span>
                    </p>
                    <p className="text-xs text-gray-500">Cancel anytime. No hidden fees.</p>
                </div>

                <div className="mt-8 w-full max-w-sm">
                    <p className="font-semibold text-gray-700">Pay with UPI</p>
                    <div className="flex items-center justify-center space-x-4 mt-2">
                        <div className="w-24 h-24 p-2 bg-white rounded-lg border">
                            <QrCodeIcon className="w-full h-full text-brand-dark" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm text-gray-600">Scan QR or use UPI ID:</p>
                            <div className="flex items-center bg-gray-100 rounded-md p-2 mt-1 relative">
                                <span className="font-mono text-brand-blue">{upiId}</span>
                                <button onClick={handleCopy} className="ml-2 p-1 rounded-md text-brand-blue hover:bg-gray-200" aria-label="Copy UPI ID">
                                    <CopyIcon className="w-5 h-5" />
                                </button>
                                {copied && (
                                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-xs rounded-md px-2 py-1 shadow-lg">
                                        Copied!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-2 text-sm text-gray-500">OR</span>
                        </div>
                    </div>
                     <button
                        onClick={onSubscribe}
                        className="w-full flex items-center justify-center p-3 bg-[#6739B7] text-white rounded-lg font-semibold hover:bg-[#5f34a8] transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6739B7]"
                    >
                        <WalletIcon className="w-6 h-6 mr-3" />
                        Pay using PhonePe
                    </button>
                </div>

                <div className="mt-8">
                    <Button onClick={onSubscribe} variant="primary" className="w-full max-w-sm text-lg">
                        I have paid, Subscribe Now
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">Click after paying via QR/UPI ID.</p>
                </div>
            </div>
        </Card>
    </div>
  );
};

export default MembershipScreen;