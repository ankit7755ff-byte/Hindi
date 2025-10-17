import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';

const GiftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
);

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 112.632-3.005M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Referral: React.FC = () => {
    const referralCode = 'HINDILEARN24';
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy code. Please copy it manually.');
        });
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Learn Hindi with Namaste Hindi!',
            text: `I'm learning Hindi with this cool AI-powered app. Use my code ${referralCode} and we both get ₹10!`,
            url: 'https://aistudio.google.com/',
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // This error is thrown when the user cancels the share dialog.
                // It's not a true error, so we can safely ignore it and not log it.
                if ((err as Error).name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        } else {
            // Fallback for desktop or unsupported browsers
            alert('Sharing is not supported on this browser. Use the copy button to share your code!');
        }
    };

    return (
        <Card>
            <div className="flex flex-col items-center text-center p-4">
                <GiftIcon />
                <h2 className="text-3xl font-bold text-brand-dark mt-4">Invite Friends, Earn Rewards!</h2>
                <p className="text-gray-600 mt-2 max-w-md mx-auto">
                    Share your love for learning Hindi! For every friend that signs up using your code, you both earn ₹10.
                </p>

                <div className="mt-8 w-full max-w-sm">
                    <label className="font-semibold text-gray-700 text-sm" htmlFor="referral-code">Your Unique Referral Code</label>
                    <div className="mt-2 flex items-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-3 relative">
                        <span id="referral-code" className="flex-grow font-mono text-xl tracking-widest text-brand-blue">{referralCode}</span>
                        <button 
                            onClick={handleCopy} 
                            className="p-2 rounded-md text-brand-blue hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            aria-label="Copy referral code"
                        >
                            <CopyIcon />
                        </button>
                         {copied && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-sm rounded-md px-3 py-1 shadow-lg transition-opacity duration-300">
                                Copied!
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <Button onClick={handleShare} variant="secondary">
                        <div className="flex items-center">
                            <ShareIcon />
                            <span>Share Now</span>
                        </div>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default Referral;