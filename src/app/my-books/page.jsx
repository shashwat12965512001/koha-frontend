'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const borrowedBooks = [
    {
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        cover: 'https://covers.openlibrary.org/b/id/8235116-L.jpg',
        dueDate: '2025-08-01',
        status: 'On Time',
    },
    {
        title: 'The Mythical Man-Month',
        author: 'Frederick P. Brooks Jr.',
        cover: 'https://covers.openlibrary.org/b/id/8364170-L.jpg',
        dueDate: '2025-07-20',
        status: 'Overdue',
    },
    {
        title: 'Refactoring',
        author: 'Martin Fowler',
        cover: 'https://covers.openlibrary.org/b/id/9336045-L.jpg',
        dueDate: '2025-07-28',
        status: 'On Time',
    },
];

export default function MyBooksPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Books</h1>
                <p className="text-gray-600 mb-6">
                    View your borrowed books and reading history.
                </p>

                {borrowedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {borrowedBooks.map((book, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                                    <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Due Date: <span className="font-medium">{book.dueDate}</span>
                                    </p>
                                    <p
                                        className={`text-sm font-semibold ${book.status === 'Overdue'
                                                ? 'text-red-600'
                                                : 'text-green-600'
                                            }`}
                                    >
                                        {book.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">You haven't borrowed any books yet.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
