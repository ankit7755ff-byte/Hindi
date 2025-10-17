import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';

interface MyProfileProps {
    onLogout: () => void;
}

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const MyProfile: React.FC<MyProfileProps> = ({ onLogout }) => {
    const [name, setName] = useState('Guest User');
    const [email, setEmail] = useState('guest@example.com');
    const [isEditing, setIsEditing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2500);
    };

    return (
        <Card>
            <div className="flex flex-col items-center p-4">
                <h2 className="text-3xl font-bold text-brand-dark mb-6">My Profile</h2>
                
                <div className="relative mb-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="w-24 h-24 text-gray-400"/>
                    </div>
                </div>

                <div className="w-full max-w-md space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            readOnly={!isEditing}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm read-only:bg-gray-100 read-only:cursor-not-allowed focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly={!isEditing}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm read-only:bg-gray-100 read-only:cursor-not-allowed focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Subscription Status</label>
                        <div className="mt-1 flex items-center">
                             <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Premium Member
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
                   {isEditing ? (
                        <Button onClick={handleSave} variant="primary" className="w-full">Save Changes</Button>
                   ) : (
                        <Button onClick={() => setIsEditing(true)} variant="secondary" className="w-full">Edit Profile</Button>
                   )}
                    <Button onClick={onLogout} className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400">Logout</Button>
                </div>
                {isSuccess && (
                     <div className="mt-6 w-full max-w-md p-3 bg-green-100 border border-green-400 text-green-800 rounded-md text-center">
                        Profile updated successfully!
                    </div>
                )}
            </div>
        </Card>
    );
};

export default MyProfile;
