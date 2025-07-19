'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function CirculationPage() {
    const [search, setSearch] = useState('');

    const usersWithLoans = [
        {
            id: 'U001',
            name: 'Ananya Sharma',
            email: 'ananya@pes.edu',
            loans: [
                {
                    book: 'The Pragmatic Programmer',
                    issueDate: '2025-07-15',
                    dueDate: '2025-07-22',
                },
                {
                    book: 'Design Patterns',
                    issueDate: '2025-07-10',
                    dueDate: '2025-07-20',
                }
            ]
        },
        {
            id: 'U002',
            name: 'Rahul Verma',
            email: 'rahul@pes.edu',
            loans: [
                {
                    book: 'Artificial Intelligence: A Modern Approach',
                    issueDate: '2025-07-05',
                    dueDate: '2025-07-12',
                }
            ]
        },
    ];

    const filtered = usersWithLoans.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const getDaysLeft = (dueDate) => {
        const today = dayjs();
        const due = dayjs(dueDate);
        return due.diff(today, 'day');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Circulation Overview</h1>
                        <p className="text-gray-600">View borrowed books and return timelines.</p>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by user name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
                    />
                </div>

                {/* Borrowed Books Table View */}
                <div className="bg-white shadow rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Book</th>
                                <th className="px-6 py-3">Issue Date</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Days Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.flatMap(user =>
                                    user.loans.map((loan, idx) => {
                                        const daysLeft = getDaysLeft(loan.dueDate);
                                        return (
                                            <tr key={`${user.id}-${idx}`} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-3">{user.name}</td>
                                                <td className="px-6 py-3">{user.email}</td>
                                                <td className="px-6 py-3">{loan.book}</td>
                                                <td className="px-6 py-3">{loan.issueDate}</td>
                                                <td className="px-6 py-3">{loan.dueDate}</td>
                                                <td className="px-6 py-3">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-semibold 
                                            ${daysLeft < 0
                                                                ? 'bg-red-100 text-red-700'
                                                                : daysLeft <= 2
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : 'bg-green-100 text-green-700'
                                                            }`}
                                                    >
                                                        {daysLeft < 0 ? `${-daysLeft} days overdue` : `${daysLeft} days left`}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No active borrowings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Policies Section */}
                <div className='mt-8'>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Circulation Policies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-sm text-gray-500 mb-2">Who Can Borrow</h3>
                            <ul className="text-gray-700 text-sm list-disc list-inside">
                                <li><strong>Students:</strong> Up to 3 books</li>
                                <li><strong>Faculty:</strong> Up to 10 books</li>
                                <li><strong>Guests:</strong> 1 book</li>
                            </ul>
                        </div>

                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-sm text-gray-500 mb-2">Loan Duration</h3>
                            <ul className="text-gray-700 text-sm list-disc list-inside">
                                <li><strong>Students:</strong> 14 days</li>
                                <li><strong>Faculty:</strong> 30 days</li>
                                <li><strong>Guests:</strong> 7 days</li>
                            </ul>
                        </div>

                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-sm text-gray-500 mb-2">Fine Rules</h3>
                            <ul className="text-gray-700 text-sm list-disc list-inside">
                                <li><strong>Overdue Fine:</strong> ₹2 per day per book</li>
                                <li><strong>Lost Book:</strong> ₹500 + book cost</li>
                            </ul>
                        </div>

                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-sm text-gray-500 mb-2">Block Rules</h3>
                            <ul className="text-gray-700 text-sm list-disc list-inside">
                                <li>Blocked if fine exceeds ₹200</li>
                                <li>Blocked if 3 or more books are overdue</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
