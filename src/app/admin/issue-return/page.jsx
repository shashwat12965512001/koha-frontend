'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';
import { format, addDays, isAfter } from 'date-fns';

export default function IssueReturnPage() {
    const [barcode, setBarcode] = useState('');
    const [patron, setPatron] = useState('');
    const [loanDays, setLoanDays] = useState(14);
    const [issuedBooks, setIssuedBooks] = useState([
        {
            id: 101,
            barcode: '9780131103627',
            patron: 'Arjun Mehta',
            issueDate: '2025-07-10',
            dueDate: '2025-07-17',
            returned: false,
        },
        {
            id: 102,
            barcode: '9780321751041',
            patron: 'Sneha Reddy',
            issueDate: '2025-07-01',
            dueDate: '2025-07-15',
            returned: false,
        },
        {
            id: 103,
            barcode: '9781491950357',
            patron: 'Ravi Kumar',
            issueDate: '2025-06-25',
            dueDate: '2025-07-05',
            returned: true,
        }
    ]);


    const today = new Date();
    const dueDate = addDays(today, loanDays);

    const handleIssue = () => {
        if (!barcode || !patron) return alert('Please scan barcode and select patron.');

        setIssuedBooks(prev => [
            ...prev,
            {
                id: Date.now(),
                barcode,
                patron,
                issueDate: format(today, 'yyyy-MM-dd'),
                dueDate: format(dueDate, 'yyyy-MM-dd'),
                returned: false,
            }
        ]);
        setBarcode('');
    };

    const handleReturn = (id) => {
        setIssuedBooks(prev =>
            prev.map(book =>
                book.id === id ? { ...book, returned: true } : book
            )
        );
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Issue / Return Management</h1>
                <p className="text-gray-600 mb-6">Scan barcodes to issue or return books in real-time.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Scan / Enter Book Barcode</label>
                        <input
                            type="text"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            placeholder="e.g., 9780131103627"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Patron</label>
                        <select
                            value={patron}
                            onChange={(e) => setPatron(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">-- Select --</option>
                            <option value="Arjun Mehta">Arjun Mehta</option>
                            <option value="Sneha Reddy">Sneha Reddy</option>
                            <option value="Ravi Kumar">Ravi Kumar</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Loan Duration (days)</label>
                        <select
                            value={loanDays}
                            onChange={(e) => setLoanDays(Number(e.target.value))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value={7}>7 days</option>
                            <option value={14}>14 days</option>
                            <option value={30}>30 days</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleIssue}
                            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Issue Book
                        </button>
                    </div>
                </div>

                {/* Issued Books Table */}
                <div className="bg-white shadow rounded-lg overflow-auto mt-6">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Barcode</th>
                                <th className="px-6 py-3">Patron</th>
                                <th className="px-6 py-3">Issue Date</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issuedBooks.map(book => {
                                const isOverdue = isAfter(new Date(), new Date(book.dueDate));
                                return (
                                    <tr key={book.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">{book.barcode}</td>
                                        <td className="px-6 py-3">{book.patron}</td>
                                        <td className="px-6 py-3">{book.issueDate}</td>
                                        <td className="px-6 py-3">{book.dueDate}</td>
                                        <td className="px-6 py-3">
                                            {book.returned ? (
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600">
                                                    Returned
                                                </span>
                                            ) : isOverdue ? (
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                                                    Overdue
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                                    Issued
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">
                                            {!book.returned && (
                                                <button
                                                    onClick={() => handleReturn(book.id)}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Mark as Returned
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
