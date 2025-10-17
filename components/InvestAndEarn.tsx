import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';

const GrowthIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);


const InvestAndEarn: React.FC = () => {
    const [amount, setAmount] = useState('');

    const monthlyReturn = useMemo(() => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            return numericAmount * 0.02;
        }
        return 0;
    }, [amount]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only numbers and a single decimal point
        const value = e.target.value.replace(/[^0-9.]/g, '');
        setAmount(value);
    };

    const handleInvest = () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            alert(`Thank you for your simulated investment of ₹${numericAmount.toFixed(2)}!`);
        } else {
            alert('Please enter a valid investment amount.');
        }
    };

    return (
        <Card>
            <div className="flex flex-col items-center text-center p-4">
                <GrowthIcon />
                <h2 className="text-3xl font-bold text-brand-dark mt-4">Invest & Earn with Namaste Hindi</h2>
                <p className="text-gray-600 mt-2 max-w-md mx-auto">
                    Invest in our learning platform and earn a guaranteed 2% monthly return on your investment. Grow your savings while supporting education!
                </p>

                <div className="mt-8 w-full max-w-sm">
                    <label className="font-semibold text-gray-700 text-sm" htmlFor="investment-amount">Enter Investment Amount (₹)</label>
                    <div className="mt-2 relative">
                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-xl">₹</span>
                        <input
                            id="investment-amount"
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="e.g., 5000"
                            className="w-full p-3 pl-8 border-2 border-gray-200 rounded-lg text-xl text-right focus:ring-2 focus:ring-brand-green focus:border-transparent transition duration-200"
                        />
                    </div>
                </div>

                <div className="mt-6 bg-green-50 border-2 border-dashed border-brand-green rounded-lg p-4 w-full max-w-sm">
                    <p className="text-lg font-semibold text-brand-green">Potential Monthly Return</p>
                    <p className="text-4xl font-bold text-brand-dark my-1">
                        ₹{monthlyReturn.toFixed(2)}
                    </p>
                </div>
                
                <div className="mt-8">
                    <Button onClick={handleInvest} variant="secondary" disabled={monthlyReturn <= 0}>
                        Invest Now
                    </Button>
                </div>

                <p className="text-xs text-gray-400 mt-8">
                    Disclaimer: This is a simulated investment feature for demonstration purposes only. No real money is involved or processed.
                </p>
            </div>
        </Card>
    );
};

export default InvestAndEarn;
