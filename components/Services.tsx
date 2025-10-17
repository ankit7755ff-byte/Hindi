import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';

type ServiceType = 'mobile' | 'dth' | 'lpg' | 'donate' | 'feedback';

const MobileIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const DthIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.217 10.373a1.25 1.25 0 011.566 0l1.373 1.374a1.25 1.25 0 010 1.566L9.63 17.84a1.25 1.25 0 01-1.566 0L3.54 13.316a1.25 1.25 0 010-1.566l1.373-1.374a1.25 1.25 0 011.566 0L10 14.12l1.217-3.747z" />
    </svg>
);

const LpgIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5-2.964-6.964m11.928 11.928A8 8 0 016.343 7.343m11.314 11.314l1.414-1.414m-1.414 1.414L16 16m-4-4h.01M9 16h.01" />
    </svg>
);

const HeartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const FeedbackIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
);


const ServiceButton: React.FC<{ label: string; icon: React.ReactNode; isActive: boolean; onClick: () => void; }> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 p-4 flex flex-col items-center justify-center space-y-2 rounded-lg transition-all duration-300 ${
            isActive ? 'bg-brand-blue text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
        {icon}
        <span className="font-semibold text-sm">{label}</span>
    </button>
);

const Services: React.FC = () => {
    const [activeService, setActiveService] = useState<ServiceType>('mobile');

    // Utility payment state
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileAmount, setMobileAmount] = useState('');
    const [dthId, setDthId] = useState('');
    const [dthAmount, setDthAmount] = useState('');
    const [lpgId, setLpgId] = useState('');

    // Donate state
    const presetAmounts = [50, 100, 250, 500];
    const [donationAmount, setDonationAmount] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

    // Feedback state
    const [feedbackName, setFeedbackName] = useState('');
    const [feedbackEmail, setFeedbackEmail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
    const [isFeedbackSuccess, setIsFeedbackSuccess] = useState(false);

    const handleAction = (service: ServiceType) => {
        switch (service) {
            case 'mobile':
                if (mobileNumber && mobileAmount) alert(`Simulated recharge of ₹${mobileAmount} for ${mobileNumber} successful!`);
                else alert('Please fill in all fields for mobile recharge.');
                break;
            case 'dth':
                if (dthId && dthAmount) alert(`Simulated DTH recharge of ₹${dthAmount} for ID ${dthId} successful!`);
                else alert('Please fill in all fields for DTH recharge.');
                break;
            case 'lpg':
                 if (lpgId) alert(`Simulated LPG cylinder booking for consumer ID ${lpgId} successful!`);
                 else alert('Please enter your LPG consumer ID.');
                break;
        }
    };

    const handleDonationAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setDonationAmount(value);
        setSelectedPreset(null);
    };
    
    const handlePresetClick = (preset: number) => {
        setDonationAmount(String(preset));
        setSelectedPreset(preset);
    };

    const handleDonate = () => {
        const numericAmount = parseFloat(donationAmount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            alert(`Thank you for your generous simulated donation of ₹${numericAmount.toFixed(2)}!`);
        } else {
            alert('Please enter a valid donation amount.');
        }
    };

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedbackName || !feedbackEmail || !feedbackMessage) {
            alert('Please fill out all fields.');
            return;
        }

        setIsFeedbackLoading(true);
        setIsFeedbackSuccess(false);

        setTimeout(() => {
            setIsFeedbackLoading(false);
            setIsFeedbackSuccess(true);
            setFeedbackName('');
            setFeedbackEmail('');
            setFeedbackMessage('');
            setTimeout(() => setIsFeedbackSuccess(false), 3000);
        }, 1500);
    };

    const renderForm = () => {
        switch (activeService) {
            case 'mobile':
                return (
                    <div className="space-y-4">
                         <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter Mobile Number" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-saffron" />
                         <input type="number" value={mobileAmount} onChange={(e) => setMobileAmount(e.target.value)} placeholder="Enter Amount (₹)" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-saffron" />
                         <div className="text-center py-2 px-4 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                            🎉 Zero Platform Fees on all recharges!
                         </div>
                        <Button onClick={() => handleAction('mobile')} variant="primary" className="w-full">Recharge Now</Button>
                    </div>
                );
            case 'dth':
                 return (
                    <div className="space-y-4">
                         <input type="text" value={dthId} onChange={(e) => setDthId(e.target.value)} placeholder="Enter Subscriber ID" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-saffron" />
                         <input type="number" value={dthAmount} onChange={(e) => setDthAmount(e.target.value)} placeholder="Enter Amount (₹)" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-saffron" />
                         <div className="text-center py-2 px-4 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                            🎉 Zero Platform Fees on all recharges!
                         </div>
                        <Button onClick={() => handleAction('dth')} variant="primary" className="w-full">Recharge Now</Button>
                    </div>
                );
            case 'lpg':
                 return (
                    <div className="space-y-4">
                         <input type="text" value={lpgId} onChange={(e) => setLpgId(e.target.value)} placeholder="Enter LPG Consumer ID" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-saffron" />
                        <Button onClick={() => handleAction('lpg')} variant="secondary" className="w-full">Book Cylinder</Button>
                    </div>
                );
            case 'donate':
                return (
                    <div className="text-center">
                        <p className="font-semibold text-gray-700 text-sm mb-3">Choose an amount or enter your own</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {presetAmounts.map((preset) => (
                                <button 
                                    key={preset}
                                    onClick={() => handlePresetClick(preset)}
                                    className={`p-3 border-2 rounded-lg font-semibold transition-all duration-200 ${
                                        selectedPreset === preset 
                                        ? 'bg-brand-saffron text-white border-transparent' 
                                        : 'bg-white text-brand-blue border-gray-300 hover:border-brand-saffron'
                                    }`}
                                >
                                    ₹{preset}
                                </button>
                            ))}
                        </div>
                         <div className="mt-4 relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-xl">₹</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={donationAmount}
                                onChange={handleDonationAmountChange}
                                placeholder="Custom Amount"
                                className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg text-xl text-center focus:ring-2 focus:ring-brand-saffron focus:border-transparent transition duration-200"
                            />
                        </div>
                        <div className="mt-6">
                            <Button onClick={handleDonate} variant="primary" disabled={parseFloat(donationAmount) <= 0 || donationAmount === ''}>
                                Donate Now
                            </Button>
                        </div>
                    </div>
                );
            case 'feedback':
                return (
                    <div>
                        <form onSubmit={handleFeedbackSubmit} className="w-full space-y-4 text-left">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" value={feedbackName} onChange={(e) => setFeedbackName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Your Name" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" value={feedbackEmail} onChange={(e) => setFeedbackEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="you@example.com" required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Feedback</label>
                                <textarea id="message" rows={4} value={feedbackMessage} onChange={(e) => setFeedbackMessage(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Your feedback here..." required />
                            </div>
                            <div className="text-center pt-2">
                                <Button type="submit" variant="secondary" isLoading={isFeedbackLoading} disabled={isFeedbackLoading || (!feedbackName || !feedbackEmail || !feedbackMessage)}>
                                    Submit Feedback
                                </Button>
                            </div>
                        </form>
                        {isFeedbackSuccess && (
                            <div className="mt-6 w-full p-4 bg-green-100 border border-green-400 text-green-800 rounded-md text-center">
                                Thank you for your feedback!
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-center text-brand-dark mb-6">Utilities & More</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 justify-center gap-2 sm:gap-4 mb-8">
                    <ServiceButton label="Mobile" icon={<MobileIcon className="w-8 h-8"/>} isActive={activeService === 'mobile'} onClick={() => setActiveService('mobile')} />
                    <ServiceButton label="DTH" icon={<DthIcon className="w-8 h-8"/>} isActive={activeService === 'dth'} onClick={() => setActiveService('dth')} />
                    <ServiceButton label="LPG" icon={<LpgIcon className="w-8 h-8"/>} isActive={activeService === 'lpg'} onClick={() => setActiveService('lpg')} />
                    <ServiceButton label="Donate" icon={<HeartIcon className="w-8 h-8 text-red-500"/>} isActive={activeService === 'donate'} onClick={() => setActiveService('donate')} />
                    <ServiceButton label="Feedback" icon={<FeedbackIcon className="w-8 h-8"/>} isActive={activeService === 'feedback'} onClick={() => setActiveService('feedback')} />
                </div>

                <div className="mt-4">
                    {renderForm()}
                </div>

                 <p className="text-xs text-gray-400 mt-8 text-center">
                    Disclaimer: All services on this page are for demonstration purposes only. No real transactions are made.
                </p>
            </div>
        </Card>
    );
};

export default Services;