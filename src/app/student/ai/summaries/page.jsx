'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

const AIBookSummaries = () => {
    const [summaries, setSummaries] = useState([]);
    const mockSummaries = [
        {
            id: 1,
            title: 'The Pragmatic Programmer',
            summary: `A guide for developers to adopt practical habits and write better code. It encourages taking ownership of your work, staying curious, and continuously learning.`,
            readingTime: '2 min',
        },
        {
            id: 2,
            title: 'Introduction to Algorithms',
            summary: `This book covers a wide range of algorithms in depth. The AI summary highlights its coverage of sorting, dynamic programming, and graph algorithms with practical applications.`,
            readingTime: '3 min',
        },
        {
            id: 3,
            title: 'Deep Work',
            summary: `Focuses on the value of deep, undistracted work in a distracted world. The AI suggests techniques to build a habit of deep focus and eliminate shallow tasks.`,
            readingTime: '2.5 min',
        },
    ];

    useEffect(() => {
        setSummaries(mockSummaries);
    }, []);

    const regenerate = (title) => {
        alert(`🔁 Regenerating summary for "${title}"...`);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">🧠 AI Book Summaries</h1>
                <p className="text-sm text-gray-600 mb-6">Quick summaries of your books, powered by AI ✨</p>

                {summaries.length === 0 ? (
                    <p className="text-gray-600">No summaries yet. Interact with books to generate one!</p>
                ) : (
                    <div className="space-y-6">
                        {summaries.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                    <span className="text-sm text-gray-500">{book.readingTime} read</span>
                                </div>
                                <p className="text-sm text-gray-700">{book.summary}</p>

                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => regenerate(book.title)}
                                        className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        🔁 Regenerate
                                    </button>
                                    <button className="text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200">
                                        🔊 Listen (Coming soon)
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

export default AIBookSummaries;