'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

export default function SerialsPage() {
    const [serials] = useState([
        {
            id: 'SER-001',
            title: 'Nature Weekly',
            frequency: 'Weekly',
            status: 'Active',
            lastIssue: '2025-07-10',
            nextIssue: '2025-07-17',
        },
        {
            id: 'SER-002',
            title: 'IEEE Spectrum',
            frequency: 'Monthly',
            status: 'Inactive',
            lastIssue: '2025-06-01',
            nextIssue: 'N/A',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredSerials = serials.filter(
        (serial) =>
            serial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            serial.frequency.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Serials</h1>
                        <p className="text-gray-600">Manage recurring publications like journals and magazines.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        + Add Serial
                    </button>
                </div>

                {/* Search bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by title or frequency..."
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Frequency</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Last Issue</th>
                                <th className="px-6 py-3">Next Issue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSerials.length > 0 ? (
                                filteredSerials.map((serial) => (
                                    <tr key={serial.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">{serial.id}</td>
                                        <td className="px-6 py-3">{serial.title}</td>
                                        <td className="px-6 py-3">{serial.frequency}</td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${serial.status === 'Active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {serial.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">{serial.lastIssue}</td>
                                        <td className="px-6 py-3">{serial.nextIssue}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
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
