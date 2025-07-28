'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

const SearchCatalog = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const booksMock = [
        {
            id: 1,
            title: 'The Pragmatic Programmer',
            author: 'Andy Hunt, Dave Thomas',
            category: 'Programming',
            available: true,
        },
        {
            id: 2,
            title: 'Introduction to Machine Learning',
            author: 'Ethem Alpaydin',
            category: 'AI/ML',
            available: false,
        },
        {
            id: 3,
            title: 'Design Patterns',
            author: 'Erich Gamma et al.',
            category: 'Software Engineering',
            available: true,
        },
    ];

    useEffect(() => {
        // Replace with real fetch
        setBooks(booksMock);
        setFiltered(booksMock);
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        const result = books.filter((book) =>
            book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value)
        );
        setFiltered(result);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">🔍 Search Catalog</h1>

                <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={query}
                    onChange={handleSearch}
                />

                {filtered.length === 0 ? (
                    <p className="text-gray-600">No books found matching your search.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filtered.map((book) => (
                            <div
                                key={book.id}
                                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all"
                            >
                                <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                                <p className="text-sm">
                                    Category: <span className="font-medium">{book.category}</span>
                                </p>
                                <p
                                    className={`text-sm font-semibold mt-1 ${book.available ? 'text-green-600' : 'text-red-600'
                                        }`}
                                >
                                    {book.available ? 'Available' : 'Out of Stock'}
                                </p>

                                <button
                                    disabled={!book.available}
                                    className={`mt-4 w-full py-2 rounded-md text-sm font-medium ${book.available
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {book.available ? 'Reserve' : 'Unavailable'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default SearchCatalog;