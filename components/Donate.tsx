import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';

const HeartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);


const Donate: React.FC = () => {
    const presetAmounts = [50, 100, 250, 500];
    const [amount, setAmount] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
    
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setAmount(value);
        setSelectedPreset(null);
    };
    
    const handlePresetClick = (preset: number) => {
        setAmount(String(preset));
        setSelectedPreset(preset);
    };

    const handleDonate = () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            alert(`Thank you for your generous simulated donation of ₹${numericAmount.toFixed(2)}!`);
        } else {
            alert('Please enter a valid donation amount.');
        }
    };

    return (
        <Card>
            <div className="flex flex-col items-center text-center p-4">
                <HeartIcon />
                <h2 className="text-3xl font-bold text-brand-dark mt-4">Support Our Mission</h2>
                <p className="text-gray-600 mt-2 max-w-md mx-auto">
                    Your generous contribution helps us cover server costs, develop new features, and continue providing a great learning experience.
                </p>

                <div className="mt-8 w-full max-w-sm">
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
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Custom Amount"
                            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg text-xl text-center focus:ring-2 focus:ring-brand-saffron focus:border-transparent transition duration-200"
                        />
                    </div>
                </div>
                
                <div className="mt-8">
                    <Button onClick={handleDonate} variant="primary" disabled={parseFloat(amount) <= 0 || amount === ''}>
                        Donate Now
                    </Button>
                </div>

                <p className="text-xs text-gray-400 mt-8">
                    Disclaimer: This is a simulated donation feature. No real money is processed.
                </p>
            </div>
        </Card>
    );
};

export default Donate;
