'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

export default function InventoryPage() {
    const [search, setSearch] = useState('');
    const [inventory, setInventory] = useState([
        {
            id: 'INV-001',
            title: 'Design Patterns',
            author: 'Erich Gamma',
            status: 'Available',
            location: 'Shelf A1',
        },
        {
            id: 'INV-002',
            title: 'Deep Learning',
            author: 'Ian Goodfellow',
            status: 'Lost',
            location: 'Shelf B3',
        },
        {
            id: 'INV-003',
            title: 'The Art of Computer Programming',
            author: 'Donald Knuth',
            status: 'Damaged',
            location: 'Shelf C2',
        },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setInventory(prev =>
            prev.map(book =>
                book.id === id ? { ...book, status: newStatus } : book
            )
        );
    };

    const filteredBooks = inventory.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
                        <p className="text-gray-600">Track and manage book stock, locations, and conditions.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        + Add New Book
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
                    />
                </div>

                <div className="bg-white shadow rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Author</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Shelf</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.length > 0 ? (
                                filteredBooks.map(book => (
                                    <tr key={book.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">{book.id}</td>
                                        <td className="px-6 py-3">{book.title}</td>
                                        <td className="px-6 py-3">{book.author}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${book.status === 'Available' ? 'bg-green-100 text-green-700' :
                                                book.status === 'Lost' ? 'bg-red-100 text-red-700' :
                                                    book.status === 'Damaged' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-200 text-gray-600'
                                                }`}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">{book.location}</td>
                                        <td className="px-6 py-3">
                                            <select
                                                value={book.status}
                                                onChange={(e) => handleStatusChange(book.id, e.target.value)}
                                                className="text-sm border rounded px-2 py-1"
                                            >
                                                <option value="Available">Available</option>
                                                <option value="Lost">Lost</option>
                                                <option value="Damaged">Damaged</option>
                                                <option value="Replaced">Replaced</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className=" mt-5 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
