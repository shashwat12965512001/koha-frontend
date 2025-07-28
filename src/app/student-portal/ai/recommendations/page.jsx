'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

const AIRecommendations = () => {
    const [books, setBooks] = useState([]);
    const mockRecommendations = [
        {
            id: 1,
            title: 'Deep Learning with Python',
            author: 'François Chollet',
            reason: 'Based on your interest in AI & Machine Learning',
        },
        {
            id: 2,
            title: 'Atomic Habits',
            author: 'James Clear',
            reason: 'You borrowed productivity books recently',
        },
        {
            id: 3,
            title: 'Sapiens: A Brief History of Humankind',
            author: 'Yuval Noah Harari',
            reason: 'You like history + philosophy genres',
        },
    ];

    useEffect(() => {
        setBooks(mockRecommendations);
    }, []);

    const refreshRecommendations = () => {
        alert('🔄 New recommendations generated!');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📚 AI Recommendations</h1>
                        <p className="text-sm text-gray-600">Books you might love, powered by AI 🧠</p>
                    </div>
                    <button
                        onClick={refreshRecommendations}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        🔄 Refresh
                    </button>
                </div>

                {books.length === 0 ? (
                    <p className="text-gray-600">No recommendations right now. Try refreshing!</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                            >
                                <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                <p className="text-sm text-gray-600">by {book.author}</p>
                                <p className="mt-2 text-sm text-blue-700 italic">💡 {book.reason}</p>
                                <div className="mt-4">
                                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                                        📥 Reserve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default AIRecommendations;