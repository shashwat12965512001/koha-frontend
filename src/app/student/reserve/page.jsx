'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState, useEffect } from 'react';

const ReserveBooks = () => {
    const [reservedBooks, setReservedBooks] = useState([]);
    const reservedBooksMock = [
        {
            id: 1,
            title: 'Deep Learning',
            author: 'Ian Goodfellow',
            availableFrom: '2025-08-10',
        },
        {
            id: 2,
            title: 'The Mythical Man-Month',
            author: 'Frederick P. Brooks',
            availableFrom: '2025-08-05',
        },
    ];

    useEffect(() => {
        setReservedBooks(reservedBooksMock);
    }, []);

    const handleRemove = (id) => {
        setReservedBooks((prev) => prev.filter((book) => book.id !== id));
    };

    const handleConfirmReservation = () => {
        alert('📚 Reservation Confirmed!');
        setReservedBooks([]);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">📥 Reserve Books</h1>

                {reservedBooks.length === 0 ? (
                    <p className="text-gray-600">You have no books in your reservation list.</p>
                ) : (
                    <>
                        <div className="space-y-4 mb-6">
                            {reservedBooks.map((book) => (
                                <div
                                    key={book.id}
                                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                                >
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                        <p className="text-sm text-gray-600">by {book.author}</p>
                                        <p className="text-sm text-blue-600 mt-1">
                                            Available from: <strong>{book.availableFrom}</strong>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(book.id)}
                                        className="text-sm text-red-600 hover:text-red-800"
                                    >
                                        ❌ Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleConfirmReservation}
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md"
                        >
                            ✅ Confirm Reservation
                        </button>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default ReserveBooks;