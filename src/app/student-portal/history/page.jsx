'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState, useEffect } from 'react';

const ReadingHistory = () => {
    const [history, setHistory] = useState([]);
    const mockHistory = [
        {
            id: 1,
            title: 'Clean Code',
            author: 'Robert C. Martin',
            issuedDate: '2025-07-01',
            returnedDate: '2025-07-20',
            status: 'Returned',
        },
        {
            id: 2,
            title: 'Introduction to Algorithms',
            author: 'CLRS',
            issuedDate: '2025-07-10',
            returnedDate: null,
            status: 'Reading',
        },
        {
            id: 3,
            title: 'Operating Systems: Three Easy Pieces',
            author: 'Remzi H. Arpaci-Dusseau',
            issuedDate: '2025-06-15',
            returnedDate: null,
            status: 'Overdue',
        },
    ];

    const getStatusBadge = (status) => {
        const base = 'px-2 py-1 text-xs font-semibold rounded';
        switch (status) {
            case 'Returned':
                return `${base} bg-green-100 text-green-700`;
            case 'Reading':
                return `${base} bg-blue-100 text-blue-700`;
            case 'Overdue':
                return `${base} bg-red-100 text-red-700`;
            default:
                return `${base} bg-gray-100 text-gray-700`;
        }
    };

    useEffect(() => {
        setHistory(mockHistory);
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">📚 Reading History</h1>
                <p className="text-sm text-gray-600 mb-6">Track your journey through the library.</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                            <tr>
                                <th className="px-4 py-3">Book Title</th>
                                <th className="px-4 py-3">Author</th>
                                <th className="px-4 py-3">Issued On</th>
                                <th className="px-4 py-3">Returned On</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {history.map((entry) => (
                                <tr key={entry.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">{entry.title}</td>
                                    <td className="px-4 py-3">{entry.author}</td>
                                    <td className="px-4 py-3">{entry.issuedDate}</td>
                                    <td className="px-4 py-3">{entry.returnedDate || '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className={getStatusBadge(entry.status)}>{entry.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ReadingHistory;