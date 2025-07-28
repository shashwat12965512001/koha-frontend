'use client';

import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const MyBorrowedBooks = () => {
    const borrowedBooksMock = [
        {
            id: 1,
            title: 'Clean Code',
            author: 'Robert C. Martin',
            cover:
                'https://m.media-amazon.com/images/I/41jEbK-jG+L._SY445_SX342_.jpg',
            borrowDate: '2025-07-15',
            dueDate: '2025-08-05',
        },
        {
            id: 2,
            title: 'Atomic Habits',
            author: 'James Clear',
            cover:
                'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg',
            borrowDate: '2025-07-10',
            dueDate: '2025-07-27',
        },
    ];

    const [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(borrowedBooksMock);
    }, []);

    const calculateDaysLeft = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
        return diff;
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">📚 My Borrowed Books</h1>

                {books.length === 0 ? (
                    <p className="text-gray-600">You haven’t borrowed any books yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {books.map((book) => {
                            const daysLeft = calculateDaysLeft(book.dueDate);
                            const isOverdue = daysLeft < 0;

                            return (
                                <div
                                    key={book.id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex gap-4"
                                >
                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="w-24 h-32 object-cover rounded"
                                    />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                            <p className="text-sm text-gray-600">by {book.author}</p>
                                            <p className="text-sm mt-2">
                                                <span className="font-medium">Borrowed:</span> {book.borrowDate}
                                            </p>
                                            <p className={`text-sm ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                                                <span className="font-medium">Due:</span> {book.dueDate} (
                                                {isOverdue ? `Overdue by ${-daysLeft} days` : `${daysLeft} days left`})
                                            </p>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                                                Renew
                                            </button>
                                            <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200">
                                                Return
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default MyBorrowedBooks;