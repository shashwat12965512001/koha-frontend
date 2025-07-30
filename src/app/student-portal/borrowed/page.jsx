'use client';

import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const MyBorrowedBooks = () => {
    const [books, setBooks] = useState([]);
    const calculateDaysLeft = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
        return diff;
    };
    const fetchBookId = async (studentId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/issue/all/${studentId}`);
            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                console.error('Error:', data.error);
                alert(data.error || 'Failed to fetch issued books');
                return [];
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
            alert('Something went wrong while fetching issued books.');
            return [];
        }
    };
    const loadIssuedBooks = async () => {
        const studentId = JSON.parse(localStorage.getItem('user')).id;
        const books = await fetchBookId(studentId);
        setBooks(books);
    };
    useEffect(() => {
        loadIssuedBooks();
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">📚 My Borrowed Books</h1>

                {books.length === 0 ? (
                    <p className="text-gray-600">You haven’t borrowed any books yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {books.map((book, index) => {
                            const due = new Date(book.dueDate).toLocaleDateString();
                            const issue = new Date(book.issueDate).toLocaleDateString();
                            const daysLeft = calculateDaysLeft(book.dueDate);
                            const isOverdue = daysLeft < 0;
                            book = book.bookId;
                            return (
                                <div
                                    key={book._id || index}
                                    className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex gap-4"
                                >
                                    <img
                                        src={book.coverImageUrl ? book.coverImageUrl : '/assets/img/cover.png'}
                                        alt={book.title}
                                        className="w-24 h-32 object-cover rounded"
                                    />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                            <p className="text-sm text-gray-600">by {book.authors}</p>
                                            <p className="text-sm mt-2">
                                                <span className="font-medium">Borrowed:</span> {issue}
                                            </p>
                                            <p className={`text-sm ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                                                <span className="font-medium">Due:</span> {due} (
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