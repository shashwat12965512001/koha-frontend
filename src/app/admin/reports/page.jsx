'use client';

import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const mockData = [
    { date: '2025-07-18', action: 'Issued', book: 'Clean Code', user: 'John Doe', status: 'Returned' },
    { date: '2025-07-17', action: 'Returned', book: 'Atomic Habits', user: 'Jane Smith', status: 'Returned' },
    { date: '2025-07-16', action: 'Issued', book: 'Design Patterns', user: 'Mike Ross', status: 'Overdue' },
    { date: '2025-07-14', action: 'Issued', book: 'Refactoring', user: 'Anna Lee', status: 'Returned' },
    { date: '2025-07-12', action: 'Returned', book: 'Deep Work', user: 'Sara Kim', status: 'Returned' },
];

export default function ReportsPage() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [category, setCategory] = useState('');
    const [filteredData, setFilteredData] = useState(mockData);

    useEffect(() => {
        let filtered = mockData;

        if (fromDate) {
            filtered = filtered.filter(item => new Date(item.date) >= new Date(fromDate));
        }

        if (toDate) {
            filtered = filtered.filter(item => new Date(item.date) <= new Date(toDate));
        }

        if (category) {
            filtered = filtered.filter(item => item.action === category);
        }

        setFilteredData(filtered);
    }, [fromDate, toDate, category]);

    const downloadCSV = () => {
        const csvRows = [
            ['Date', 'Action', 'Book', 'User', 'Status'],
            ...filteredData.map(row => [row.date, row.action, row.book, row.user, row.status])
        ];
        const blob = new Blob([
            csvRows.map(row => row.join(',')).join('\n')
        ], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'library-report.csv';
        link.click();
    };

    const issuedCount = filteredData.filter(d => d.action === 'Issued').length;
    const returnedCount = filteredData.filter(d => d.action === 'Returned').length;
    const overdueCount = filteredData.filter(d => d.status === 'Overdue').length;
    const uniquePatrons = new Set(filteredData.map(d => d.user)).size;

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Library Reports</h1>
                <p className="text-gray-600 mb-6">Filter, view, and download detailed library data.</p>

                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex gap-4">
                        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border border-gray-300 rounded px-3 py-2 text-sm" />
                        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border border-gray-300 rounded px-3 py-2 text-sm" />
                        <select value={category} onChange={e => setCategory(e.target.value)} className="border border-gray-300 rounded px-3 py-2 text-sm">
                            <option value="">All Categories</option>
                            <option value="Issued">Issued</option>
                            <option value="Returned">Returned</option>
                        </select>
                    </div>
                    <button onClick={downloadCSV} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                        ⬇ Download CSV
                    </button>
                </div>

                {/* Summary Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
                        <div className="text-sm font-medium">Books Issued</div>
                        <div className="text-xl font-bold">{issuedCount}</div>
                    </div>
                    <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center">
                        <div className="text-sm font-medium">Books Returned</div>
                        <div className="text-xl font-bold">{returnedCount}</div>
                    </div>
                    <div className="bg-red-100 text-red-800 p-4 rounded shadow text-center">
                        <div className="text-sm font-medium">Overdue</div>
                        <div className="text-xl font-bold">{overdueCount}</div>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 p-4 rounded shadow text-center">
                        <div className="text-sm font-medium">Unique Patrons</div>
                        <div className="text-xl font-bold">{uniquePatrons}</div>
                    </div>
                </div>

                {/* Report Table */}
                <div className="bg-white shadow rounded-lg overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Action</th>
                                <th className="px-4 py-3">Book</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredData.map((entry, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-4 py-2">{entry.date}</td>
                                    <td className="px-4 py-2">{entry.action}</td>
                                    <td className="px-4 py-2">{entry.book}</td>
                                    <td className="px-4 py-2">{entry.user}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${entry.status === 'Returned' ? 'bg-green-100 text-green-800' :
                                                entry.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {entry.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
