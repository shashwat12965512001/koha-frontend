'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

const SearchCatalog = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [books, setBooks] = useState([]);
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.authors.toLowerCase().includes(query.toLowerCase())
    );
    const renderStatus = (status) => {
        const colors = {
            Available: 'text-green-600',
            Issued: 'text-yellow-600',
            Reserved: 'text-indigo-600',
            'Out of Stock': 'text-red-600',
            Lost: 'text-red-700',
            Damaged: 'text-orange-600',
        };

        return (
            <p className={`text-sm font-semibold mt-1 ${colors[status] || 'text-gray-600'}`}>
                {status}
            </p>
        );
    };
    const renderButton = (id, status) => {
        switch (status) {
            case 'Available':
                return (
                    <button onClick={() => handleIssueBook(id)} className="mt-4 w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium">
                        Issue Book
                    </button>
                );
            case 'Issued':
                return (
                    <button className="mt-4 w-full py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 text-sm font-medium">
                        Notify Me
                    </button>
                );
            case 'Reserved':
                return (
                    <button className="mt-4 w-full py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 text-sm font-medium">
                        Reserve Book
                    </button>
                );
            case 'Out of Stock':
                return (
                    <button className="mt-4 w-full py-2 rounded-md bg-gray-400 text-white cursor-not-allowed text-sm font-medium">
                        Remind Me
                    </button>
                );
            default:
                return null;
        }
    };
    const fetchBooks = async (page) => {
        try {
            const res = await fetch(`http://localhost:5000/api/inventory/all?page=${page}&limit=10`);
            const data = await res.json();
            console.log(data);
            setBooks(data.books);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("Error fetching books:", err);
        }
    };
    const fetchAllSettings = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/settings/');
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                alert(data.error || 'Failed to fetch patrons');
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };
    const fetchIssuedBookCount = async (studentId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/issue/count/${studentId}`);
            const data = await res.json();
            if (res.ok) {
                return data.count; // This will be a number
            } else {
                console.error(data.error || 'Failed to get issued book count');
            }
        } catch (err) {
            console.error('Error fetching book count:', err);
        }
    };
    const handleIssueBook = async (bookId) => {
        try {
            const studentId = JSON.parse(localStorage.getItem('user')).id;
            const settings = await fetchAllSettings();
            const issuedCount = await fetchIssuedBookCount(studentId);
            if (settings.studentLimit && issuedCount >= settings.studentLimit) {
                alert(`❌ You have reached the limit of ${settings.studentLimit} books issued.`);
                return;
            }
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + (settings.loanDays || 14));
            const response = await fetch('http://localhost:5000/api/issue/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId,
                    inventoryId: bookId,
                    dueDate,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Book issued successfully!');
                fetchBooks(page);
            } else {
                alert(`❌ Issue failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Error issuing book:', error);
            alert('❌ Something went wrong. Please try again.');
        }
    };
    useEffect(() => {
        fetchBooks(page);
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">🔍 Search Catalog</h1>

                <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {
                    books.length === 0 ? (
                        <p className="text-gray-600">No books found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {
                                books.length > 0 &&
                                filteredBooks.map((book, index) => (
                                    <div
                                        key={book._id || index}
                                        className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all"
                                    >
                                        <img className="w-32 h-32 object-cover mb-2" src={book.coverImageUrl ? `http://localhost:5000${book.coverImageUrl}` : '/assets/img/cover.png'} alt="logo" />
                                        <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                                        <p className="text-sm text-gray-600 mb-2">by {book.authors}</p>
                                        <p className="text-sm">
                                            Category: <span className="font-medium">{book.category}</span>
                                        </p>
                                        {renderStatus(book.status)}
                                        {renderButton(book._id, book.status)}
                                    </div>
                                ))}
                        </div>
                    )}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Prev
                </button>
                <span className="px-4 py-2 text-gray-700 font-medium">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Next
                </button>
            </div>

        </AuthenticatedLayout>
    );
};

export default SearchCatalog;