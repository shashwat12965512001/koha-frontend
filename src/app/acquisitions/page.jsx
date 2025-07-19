'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

export default function AcquisitionsPage() {
    const [search, setSearch] = useState('');
    const [purchases] = useState([
        {
            id: 'PO-001',
            vendor: 'ABC Publishers',
            title: 'Introduction to Algorithms',
            quantity: 10,
            cost: '₹5,000',
            status: 'Pending',
            date: '2025-07-18',
        },
        {
            id: 'PO-002',
            vendor: 'Pearson Books',
            title: 'Clean Code',
            quantity: 5,
            cost: '₹2,500',
            status: 'Received',
            date: '2025-07-15',
        },
    ]);

    const filtered = purchases.filter(
        (item) =>
            item.vendor.toLowerCase().includes(search.toLowerCase()) ||
            item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Acquisitions</h1>
                        <p className="text-gray-600">Manage book orders and vendors.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        + New Purchase
                    </button>
                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by vendor or book title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
                    />
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Vendor</th>
                                <th className="px-6 py-3">Book Title</th>
                                <th className="px-6 py-3">Qty</th>
                                <th className="px-6 py-3">Cost</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((purchase) => (
                                    <tr key={purchase.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">{purchase.id}</td>
                                        <td className="px-6 py-3">{purchase.vendor}</td>
                                        <td className="px-6 py-3">{purchase.title}</td>
                                        <td className="px-6 py-3">{purchase.quantity}</td>
                                        <td className="px-6 py-3">{purchase.cost}</td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${purchase.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : purchase.status === 'Received'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {purchase.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">{purchase.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-500 px-6 py-4">
                                        No results found.
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
