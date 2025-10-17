import React from 'react';
import Card from './common/Card';

const UsersIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const SubscriptionsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const RevenueIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 14v-1m0 1v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.69 16.31c.31-.31.685-.56 1.096-.743m2.428 0c.41-.183.786-.433 1.096-.743" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-gray-50 rounded-lg p-6 flex items-center space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-brand-dark">{value}</p>
        </div>
    </div>
);

const AdminPanel: React.FC = () => {
    // Simulated data
    const totalUsers = 1428;
    const activeSubscriptions = 312;
    const totalRevenue = (activeSubscriptions * 20).toLocaleString('en-IN');

    const transactions = [
        { id: 'TXN72834', user: 'user_abc@example.com', amount: '₹20.00', date: '2024-07-29', status: 'Success' },
        { id: 'TXN72833', user: 'user_xyz@example.com', amount: '₹20.00', date: '2024-07-29', status: 'Success' },
        { id: 'TXN72831', user: 'user_pqr@example.com', amount: '₹20.00', date: '2024-07-28', status: 'Success' },
        { id: 'TXN72830', user: 'user_lmn@example.com', amount: '₹20.00', date: '2024-07-28', status: 'Failed' },
        { id: 'TXN72829', user: 'user_efg@example.com', amount: '₹20.00', date: '2024-07-27', status: 'Success' },
    ];

    const getStatusChipClass = (status: string) => {
        switch (status) {
            case 'Success': return 'bg-green-100 text-green-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card>
            <div className="p-4">
                <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Admin Dashboard</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Total Users" value={totalUsers.toLocaleString()} icon={<UsersIcon />} />
                    <StatCard title="Active Subscriptions" value={activeSubscriptions.toLocaleString()} icon={<SubscriptionsIcon />} />
                    <StatCard title="Total Revenue" value={`₹${totalRevenue}`} icon={<RevenueIcon />} />
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-brand-dark mb-4">Recent Transactions</h3>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{tx.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.user}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipClass(tx.status)}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                 <p className="text-xs text-gray-400 mt-8 text-center">
                    This is a simulated admin panel. All data is for demonstration purposes only.
                </p>
            </div>
        </Card>
    );
};

export default AdminPanel;