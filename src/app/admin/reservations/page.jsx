'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const reservations = [
    {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        reservedOn: '2025-07-15',
        status: 'Active',
    },
    {
        id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        reservedOn: '2025-07-10',
        status: 'Collected',
    },
    {
        id: 3,
        title: 'The Pragmatic Programmer',
        author: 'Andy Hunt',
        reservedOn: '2025-07-05',
        status: 'Cancelled',
    },
];

export default function ReservationsPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Reservations</h1>
                <p className="text-gray-600 mb-6">Manage your book reservations.</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-4 py-3 border-b">Book</th>
                                <th className="text-left px-4 py-3 border-b">Author</th>
                                <th className="text-left px-4 py-3 border-b">Reserved On</th>
                                <th className="text-left px-4 py-3 border-b">Status</th>
                                <th className="text-left px-4 py-3 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((res) => (
                                <tr key={res.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 border-b font-medium text-gray-800">{res.title}</td>
                                    <td className="px-4 py-3 border-b text-gray-600">{res.author}</td>
                                    <td className="px-4 py-3 border-b text-gray-600">{res.reservedOn}</td>
                                    <td className="px-4 py-3 border-b">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-medium ${res.status === 'Active'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : res.status === 'Collected'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {res.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 border-b">
                                        {res.status === 'Active' ? (
                                            <button className="text-sm text-red-600 hover:underline">Cancel</button>
                                        ) : (
                                            <span className="text-gray-400 text-sm">—</span>
                                        )}
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
