'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

const DueReminders = () => {
    const [dueBooks, setDueBooks] = useState([]);
    const dueBooksMock = [
        {
            id: 1,
            title: 'The Art of Computer Programming',
            author: 'Donald Knuth',
            dueDate: '2025-08-01',
        },
        {
            id: 2,
            title: 'Introduction to Algorithms',
            author: 'Cormen, Leiserson, Rivest',
            dueDate: '2025-07-25', // Past due for demo
        },
    ];

    useEffect(() => {
        // Fetch from backend/Firebase
        setDueBooks(dueBooksMock);
    }, []);

    const calculateDays = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">📅 Due Reminders</h1>

                {dueBooks.length === 0 ? (
                    <p className="text-gray-600">You have no upcoming due books. Chill 😌</p>
                ) : (
                    <div className="space-y-4">
                        {dueBooks.map((book) => {
                            const daysLeft = calculateDays(book.dueDate);
                            const isOverdue = daysLeft < 0;

                            return (
                                <div
                                    key={book.id}
                                    className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 flex justify-between items-center"
                                >
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                        <p className="text-sm text-gray-600">by {book.author}</p>
                                        <p
                                            className={`text-sm mt-1 ${isOverdue ? 'text-red-600' : 'text-yellow-600'
                                                }`}
                                        >
                                            Due: <strong>{book.dueDate}</strong> (
                                            {isOverdue
                                                ? `Overdue by ${-daysLeft} days`
                                                : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                                            )
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                                            Renew
                                        </button>
                                        <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
                                            Return
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default DueReminders;