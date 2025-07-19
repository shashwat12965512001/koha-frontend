'use client';

import { useState } from 'react';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const dummyBooks = [
    {
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        cover: 'https://covers.openlibrary.org/b/id/13518203-L.jpg',
    },
    {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        cover: 'https://covers.openlibrary.org/b/id/10087982-L.jpg',
    },
    {
        title: 'Design Patterns',
        author: 'Erich Gamma',
        cover: 'https://covers.openlibrary.org/b/id/8231996-L.jpg',
    },
    {
        title: 'You Don’t Know JS',
        author: 'Kyle Simpson',
        cover: 'https://covers.openlibrary.org/b/id/8311835-L.jpg',
    },
    {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        cover: 'https://covers.openlibrary.org/b/id/8281994-L.jpg',
    },
];

export default function CatalogPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBooks = dummyBooks.filter(
        (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Catalog</h1>
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredBooks.map((book, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                                    <p className="text-sm text-gray-500">by {book.author}</p>
                                    <button className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">No books found.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
