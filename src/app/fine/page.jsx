'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

export default function FinePage() {
    const [search, setSearch] = useState('');
    const [fines, setFines] = useState([
        {
            id: 1,
            name: 'Arjun Mehta',
            email: 'arjun@pes.edu',
            overdueBooks: 2,
            fineAmount: 80,
            paid: false,
        },
        {
            id: 2,
            name: 'Sneha Reddy',
            email: 'sneha@pes.edu',
            overdueBooks: 1,
            fineAmount: 40,
            paid: true,
        },
        {
            id: 3,
            name: 'Ravi Kumar',
            email: 'ravi@pes.edu',
            overdueBooks: 0,
            fineAmount: 0,
            paid: false,
        },
    ]);

    const handleOverride = (id) => {
        const amount = prompt('Enter new fine amount:');
        if (!isNaN(amount)) {
            setFines(prev =>
                prev.map(f =>
                    f.id === id ? { ...f, fineAmount: parseInt(amount) } : f
                )
            );
        }
    };

    const handleMarkPaid = (id) => {
        setFines(prev =>
            prev.map(f =>
                f.id === id ? { ...f, paid: true } : f
            )
        );
    };

    const filtered = fines.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Fine Management</h1>
                    <p className="text-gray-600">Track and manage overdue fines per user.</p>
                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
                    />
                </div>

                {/* Fine Table */}
                <div className="bg-white shadow rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Overdue Books</th>
                                <th className="px-6 py-3">Fine Amount (₹)</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map(user => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">{user.name}</td>
                                        <td className="px-6 py-3">{user.email}</td>
                                        <td className="px-6 py-3">{user.overdueBooks}</td>
                                        <td className="px-6 py-3 font-semibold text-gray-800">₹{user.fineAmount}</td>
                                        <td className="px-6 py-3">
                                            {user.fineAmount === 0 ? (
                                                <span className="text-green-600 font-medium">No Fine</span>
                                            ) : user.paid ? (
                                                <span className="text-green-600 font-medium">Paid</span>
                                            ) : (
                                                <span className="text-red-600 font-medium">Unpaid</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-center space-x-3">
                                            <button
                                                onClick={() => handleOverride(user.id)}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                Override
                                            </button>
                                            {!user.paid && user.fineAmount > 0 && (
                                                <button
                                                    onClick={() => handleMarkPaid(user.id)}
                                                    className="text-sm text-green-600 hover:underline"
                                                >
                                                    Mark Paid
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No matching records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
