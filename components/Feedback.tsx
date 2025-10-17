import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';

const FeedbackIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
);

const Feedback: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        setIsLoading(true);
        setIsSuccess(false);

        // Simulate API call
        setTimeout(() => {
            console.log('Feedback submitted:', { name, email, message });
            setIsLoading(false);
            setIsSuccess(true);
            setName('');
            setEmail('');
            setMessage('');

            // Hide success message after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    };

    return (
        <Card>
            <div className="flex flex-col items-center text-center p-4">
                <FeedbackIcon />
                <h2 className="text-3xl font-bold text-brand-dark mt-4">We Value Your Feedback</h2>
                <p className="text-gray-600 mt-2 max-w-md mx-auto">
                    Have a suggestion or found a bug? Let us know! We're always looking to improve.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 w-full max-w-lg space-y-4 text-left">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Feedback</label>
                        <textarea
                            id="message"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                            placeholder="Your feedback here..."
                            required
                        />
                    </div>
                    <div className="text-center pt-2">
                        <Button type="submit" variant="secondary" isLoading={isLoading} disabled={isLoading || (!name || !email || !message)}>
                            Submit Feedback
                        </Button>
                    </div>
                </form>

                {isSuccess && (
                    <div className="mt-6 w-full max-w-lg p-4 bg-green-100 border border-green-400 text-green-800 rounded-md text-center">
                        Thank you for your feedback! We appreciate you taking the time to help us improve.
                    </div>
                )}
            </div>
        </Card>
    );
};

export default Feedback;