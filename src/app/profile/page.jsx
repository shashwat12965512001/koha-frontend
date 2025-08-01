'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');

    const user = {
        name: 'Arjun Mehta',
        email: 'arjun@pes.edu',
        role: 'Librarian',
        joined: '2023-08-10',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AM',
        phone: '+91-9876543210',
        permissions: ['Issue Books', 'Return Books', 'Edit Books'],
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-6">
                    <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500">{user.role}</p>
                        <p className="text-sm text-gray-400">Joined on {user.joined}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit Profile</button>
                </div>

                {/* Tabs */}
                <div className="mt-6">
                    <div className="flex space-x-4 border-b mb-4">
                        {['profile', 'activity', 'settings'].map((tab) => (
                            <button
                                key={tab}
                                className={`pb-2 capitalize ${activeTab === tab
                                        ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                                        : 'text-gray-500'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'profile' && (
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <div>
                                <label className="text-gray-500 text-sm">Email</label>
                                <p className="text-gray-800">{user.email}</p>
                            </div>
                            <div>
                                <label className="text-gray-500 text-sm">Phone</label>
                                <p className="text-gray-800">{user.phone}</p>
                            </div>
                            <div>
                                <label className="text-gray-500 text-sm">Role</label>
                                <p className="text-gray-800">{user.role}</p>
                            </div>
                            <div>
                                <label className="text-gray-500 text-sm">Permissions</label>
                                <ul className="list-disc pl-5 text-gray-800">
                                    {user.permissions.map((perm, idx) => (
                                        <li key={idx}>{perm}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="text-gray-500 text-sm">No recent activity found.</p>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="text-gray-500 text-sm">Settings options will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
