'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const patrons = [
    {
        name: 'Shreya Verma',
        email: 'shreya.verma@pes.edu',
        status: 'Active',
        role: 'Student',
    },
    {
        name: 'Rohit Sharma',
        email: 'rohit.sharma@pes.edu',
        status: 'Blocked',
        role: 'Faculty',
    },
    {
        name: 'Neha Patel',
        email: 'neha.patel@pes.edu',
        status: 'Active',
        role: 'Student',
    },
];

export default function PatronsPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Patrons</h1>
                <p className="text-gray-600 mb-6">Manage library members and patrons.</p>

                <div className="flex justify-end items-center mb-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        + Add User
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {patrons.map((patron, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-800">{patron.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{patron.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{patron.role}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${patron.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {patron.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button className="text-blue-600 hover:underline text-sm">View</button>
                                        <button className="text-red-600 hover:underline text-sm">
                                            {patron.status === 'Active' ? 'Block' : 'Unblock'}
                                        </button>
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
