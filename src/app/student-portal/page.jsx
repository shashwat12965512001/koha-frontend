'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const StudentDashboard = () => {
    const stats = [
        { title: 'Books Issued', value: '5', icon: '📖', color: 'bg-blue-500' },
        { title: 'Books Reserved', value: '2', icon: '📌', color: 'bg-yellow-500' },
        { title: 'Overdue Books', value: '1', icon: '⚠️', color: 'bg-red-500' },
        { title: 'Total Fines', value: '₹40', icon: '💸', color: 'bg-green-500' }
    ];

    const recentActivity = [
        { action: 'Issued', book: 'Introduction to Algorithms', time: '2 days ago' },
        { action: 'Returned', book: 'The Pragmatic Programmer', time: '4 days ago' },
        { action: 'Reserved', book: 'Clean Code', time: '5 days ago' },
        { action: 'Overdue Notice', book: 'Operating System Concepts', time: '7 days ago' }
    ];

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome, Student 👋</h1>
                    <p className="text-gray-600">Here's your current library activity and info.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-full text-white text-xl`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Your Activity</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-gray-900">{activity.action}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-700">{activity.book}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium">
                                Reserve a Book
                            </button>
                            <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium">
                                Renew a Book
                            </button>
                            <button className="w-full text-left p-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-medium">
                                Pay Fines
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminders</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Return "Computer Networks" by Aug 2</li>
                            <li>Renew "Database Systems" before Aug 5</li>
                            <li>Overdue fine of ₹20 pending</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudentDashboard;