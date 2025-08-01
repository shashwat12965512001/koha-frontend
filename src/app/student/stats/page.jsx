'use client';

import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const UsageStats = () => {
    const [stats, setStats] = useState(null);
    const mockStats = {
        totalBooksRead: 42,
        activeStreak: 8, // in days
        totalReadingHours: 127, // est. in hours
        monthlyData: [
            { month: 'Jan', books: 3 },
            { month: 'Feb', books: 4 },
            { month: 'Mar', books: 6 },
            { month: 'Apr', books: 2 },
            { month: 'May', books: 7 },
            { month: 'Jun', books: 5 },
            { month: 'Jul', books: 8 },
        ],
    };

    useEffect(() => {
        // simulate fetch
        setStats(mockStats);
    }, []);

    if (!stats) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">📊 Usage Stats</h1>
                <p className="text-sm text-gray-600 mb-6">Your reading trends and stats at a glance.</p>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <p className="text-sm text-gray-600">Total Books Read</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.totalBooksRead}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <p className="text-sm text-gray-600">Active Reading Streak</p>
                        <p className="text-3xl font-bold text-green-600">{stats.activeStreak} days</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <p className="text-sm text-gray-600">Estimated Reading Hours</p>
                        <p className="text-3xl font-bold text-purple-600">{stats.totalReadingHours} hrs</p>
                    </div>
                </div>

                {/* Monthly Breakdown */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">📅 Monthly Reading Activity</h2>
                    <div className="grid grid-cols-7 text-center text-sm text-gray-700 gap-2">
                        {stats.monthlyData.map((entry) => (
                            <div key={entry.month} className="bg-blue-50 rounded-lg py-3">
                                <p className="font-medium">{entry.books}</p>
                                <p className="text-xs text-gray-500">{entry.month}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UsageStats;