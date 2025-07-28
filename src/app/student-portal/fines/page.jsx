'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

const FineSummary = () => {
    const [fines, setFines] = useState([]);
    const finesMock = [
        {
            id: 1,
            title: 'Clean Code',
            dueDate: '2025-07-20',
            returnedDate: '2025-07-25',
            fineAmount: 50,
        },
        {
            id: 2,
            title: 'AI: A Modern Approach',
            dueDate: '2025-07-18',
            returnedDate: '2025-07-18',
            fineAmount: 0,
        },
        {
            id: 3,
            title: 'Operating System Concepts',
            dueDate: '2025-07-10',
            returnedDate: '2025-07-17',
            fineAmount: 70,
        },
    ];

    useEffect(() => {
        // Replace with API call
        setFines(finesMock);
    }, []);

    const totalFine = fines.reduce((sum, book) => sum + book.fineAmount, 0);

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🧾 Fine Summary</h1>

                {fines.length === 0 ? (
                    <p className="text-gray-600">No fines! You're a perfect library citizen 😇</p>
                ) : (
                    <>
                        <div className="space-y-4 mb-6">
                            {fines.map((book) => (
                                <div
                                    key={book.id}
                                    className="border border-gray-200 rounded-lg bg-white shadow-sm p-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                            <p className="text-sm text-gray-600">
                                                Due: <span className="font-medium">{book.dueDate}</span>
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Returned: <span className="font-medium">{book.returnedDate}</span>
                                            </p>
                                        </div>
                                        <div
                                            className={`text-right text-lg font-bold ${book.fineAmount > 0 ? 'text-red-600' : 'text-green-600'
                                                }`}
                                        >
                                            ₹{book.fineAmount}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center border-t pt-4 border-gray-300">
                            <p className="text-lg font-semibold text-gray-800">Total Fine</p>
                            <p
                                className={`text-xl font-bold ${totalFine > 0 ? 'text-red-600' : 'text-green-600'
                                    }`}
                            >
                                ₹{totalFine}
                            </p>
                        </div>

                        {totalFine > 0 && (
                            <div className="mt-6 flex gap-4">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                                    💳 Pay Now
                                </button>
                                <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200">
                                    ❓ Raise Issue
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default FineSummary;