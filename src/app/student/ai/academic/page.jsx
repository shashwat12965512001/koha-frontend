'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

const AIAcademicSuggestions = () => {
    const [resources, setResources] = useState([]);
    const mockSuggestions = [
        {
            id: 1,
            title: 'Discrete Mathematics and Its Applications',
            type: 'Textbook',
            relevance: 'Core subject for Semester 3 - CS',
            reason: 'You recently accessed Graph Theory materials',
        },
        {
            id: 2,
            title: 'DSA Lab Manual - PES University',
            type: 'Lecture Notes',
            relevance: 'Ongoing course with weekly assessments',
            reason: 'You searched for Linked Lists and Trees',
        },
        {
            id: 3,
            title: 'Operating Systems - Previous Year Questions',
            type: 'Past Papers',
            relevance: 'Helps prep for mid-sem exam',
            reason: 'Based on your course curriculum',
        },
    ];

    useEffect(() => {
        setResources(mockSuggestions);
    }, []);

    const regenerateSuggestions = () => {
        alert('🎯 New academic suggestions generated!');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🎯 AI Academic Suggestions</h1>
                        <p className="text-sm text-gray-600">Smart picks for your semester 📘</p>
                    </div>
                    <button
                        onClick={regenerateSuggestions}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                    >
                        🔁 Generate More
                    </button>
                </div>

                {resources.length === 0 ? (
                    <p className="text-gray-600">No suggestions right now. Try refreshing!</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {resources.map((res) => (
                            <div
                                key={res.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                            >
                                <h2 className="text-lg font-semibold text-gray-900">{res.title}</h2>
                                <p className="text-sm text-gray-500">{res.type}</p>
                                <p className="mt-2 text-sm text-green-700 font-medium">🎓 {res.relevance}</p>
                                <p className="mt-1 text-sm text-blue-600 italic">💡 {res.reason}</p>
                                <div className="mt-4">
                                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                                        📥 Save Resource
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

export default AIAcademicSuggestions;