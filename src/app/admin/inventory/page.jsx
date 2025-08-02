'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState, useEffect } from 'react';

export default function InventoryPage() {
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [categories, setcategories] = useState([]);
    const [acquisitions, setacquisitions] = useState([]);
    const [form, setForm] = useState({
        title: '',
        subtitle: '',
        author: '',
        publisher: '',
        isbn: '',
        language: '',
        edition: '',
        publishedYear: '',
        category: '',
        genre: '',
        format: '',
        pages: '',
        summary: '',
        coverImageFile: null,
        coverImagePreview: null,
        shelfLocation: '',
        accessionNumber: '',
        barcode: '',
        bookStatus: 'Available',
        numberOfCopies: '',
        availableCopies: '',
        addedAt: '',
        notes: '',
        tags: [{ value: '' }],
        acquisitions: '',
    });
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        // Handle file input (cover image)
        if (type === 'file') {
            const file = files[0];
            setForm((prev) => ({
                ...prev,
                coverImageFile: file,
                coverImagePreview: URL.createObjectURL(file),
            }));
            return;
        }

        // Handle repeatable component like tags (name="tags-0", "tags-1", etc.)
        if (name.startsWith('tags-')) {
            const index = parseInt(name.split('-')[1], 10);
            const updatedTags = [...form.tags];
            updatedTags[index].value = value;
            setForm((prev) => ({
                ...prev,
                tags: updatedTags,
            }));
            return;
        }

        // For all other inputs
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Normal fields (except special ones)
            Object.keys(form).forEach((key) => {
                if (['coverImageFile', 'coverImagePreview', 'tags', 'category', 'acquisitions'].includes(key)) return;
                formData.append(`data[${key}]`, form[key]);
            });

            // Tags (Repeatable Component - fix based on actual field name in shared.tag)
            form.tags.forEach((tag, index) => {
                if (tag.value) {
                    formData.append(`data[tags][${index}][value]`, tag.value); // ← use correct key here
                }
            });

            // Relations (only if selected)
            if (form.category) {
                formData.append('data[category]', form.category);
            }

            if (form.acquisitions) {
                formData.append('data[acquisitions]', form.acquisitions);
            }

            // Media file
            if (form.coverImageFile) {
                formData.append('files.coverImage', form.coverImageFile);
            }

            const token = localStorage.getItem('token');
            if (!token) {
                alert('Missing auth token. Please login again.');
                return;
            }

            const response = await fetch('http://localhost:1337/api/books', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Book added successfully!');
                console.log('Success:', data);

                // Reset form
                setForm({
                    title: '',
                    subtitle: '',
                    author: '',
                    publisher: '',
                    isbn: '',
                    language: '',
                    edition: '',
                    publishedYear: '',
                    category: '',
                    genre: '',
                    format: '',
                    pages: '',
                    summary: '',
                    coverImageFile: null,
                    coverImagePreview: null,
                    shelfLocation: '',
                    accessionNumber: '',
                    barcode: '',
                    bookStatus: 'Available',
                    numberOfCopies: '',
                    availableCopies: '',
                    addedAt: '',
                    notes: '',
                    tags: [{ value: '' }],
                    acquisitions: '',
                });

                setIsModalOpen(false);
                setInventory((prev) => [data.data, ...prev]);
            } else {
                console.error('❌ Error:', data.error);
                alert(data.error.message || 'Failed to add book.');
            }
        } catch (error) {
            console.error('❌ Network error:', error);
            alert('Network error. Please try again.');
        }
    };
    const filteredBooks = inventory.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Missing auth token. Please login again.');
                return;
            }

            const res = await fetch(`http://localhost:1337/api/books/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                alert('🗑️ Book deleted successfully!');
                setInventory(prev => prev.filter(book => book.id !== id));
            } else {
                console.error('❌ Error:', data.error);
                alert(data.error?.message || 'Failed to delete book');
            }
        } catch (err) {
            console.error('❌ Network error:', err);
            alert('Network error. Please try again.');
        }
    };
    const getAllAcquisitions = async () => {
        try {
            const response = await fetch('http://localhost:1337/api/acquisitions?populate=*'); // populate if you want related data

            if (response.ok) {
                const result = await response.json();
                return result.data; // Strapi returns data inside .data
            }
            console.log('❌ Failed to fetch acquisitions:', response.statusText);
        } catch (error) {
            console.error('❌ Failed to fetch acquisitions:', error);
            return [];
        }
    };
    const getAllCategories = async () => {
        try {
            const response = await fetch('http://localhost:1337/api/categories?populate=*');

            if (response.ok) {
                const result = await response.json();
                return result.data || [];
            }
            console.log('❌ Failed to fetch categories:', response.statusText);
        } catch (error) {
            console.error('❌ Failed to fetch categories:', error);
            return [];
        }
    };
    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:1337/api/books?populate=*', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log('✅ All Books:', data.data); // .data is the array of books
                return data.data;
            } else {
                console.error('❌ Error fetching books:', data.error);
                return [];
            }
        } catch (err) {
            console.error('❌ Network error:', err);
            return [];
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const [acqData, catData, books] = await Promise.all([
                getAllAcquisitions(),
                getAllCategories(),
                fetchBooks(),
            ]);

            setacquisitions(acqData);
            setcategories(catData);
            setInventory(books);
        };

        fetchData();
    }, []);

    return (
        <AuthenticatedLayout>
            {/* Main modal */}
            <div
                tabIndex="-1"
                aria-hidden={!isModalOpen}
                className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isModalOpen ? "" : "hidden"
                    } overflow-y-auto overflow-x-hidden`}>

                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add New Book
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit} className="p-4 md:p-5" encType="multipart/form-data">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {/* Title */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Title</label>
                                    <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                                </div>

                                {/* Subtitle */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Subtitle</label>
                                    <input type="text" name="subtitle" value={form.subtitle} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Author */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Author</label>
                                    <input type="text" name="author" value={form.author} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Publisher */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Publisher</label>
                                    <input type="text" name="publisher" value={form.publisher} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* ISBN */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">ISBN</label>
                                    <input type="text" name="isbn" value={form.isbn} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Edition */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Edition</label>
                                    <input type="text" name="edition" value={form.edition} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Published Year */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Published Year</label>
                                    <input type="number" name="publishedYear" value={form.publishedYear} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Pages */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Pages</label>
                                    <input type="number" name="pages" value={form.pages} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Language</label>
                                    <select name="language" value={form.language} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="">Select a language</option>
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Kannada">Kannada</option>
                                    </select>
                                </div>

                                {/* Genre */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Genre</label>
                                    <select name="genre" value={form.genre} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="">Select a genre</option>
                                        <option value="Fiction">Fiction</option>
                                        <option value="Non-fiction">Non-fiction</option>
                                        <option value="Sci-fi">Sci-fi</option>
                                        <option value="Biography">Biography</option>
                                    </select>
                                </div>

                                {/* Format */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Format</label>
                                    <select name="format" value={form.format} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="">Select a format</option>
                                        <option value="Paperback">Paperback</option>
                                        <option value="Hardcover">Hardcover</option>
                                        <option value="eBook">eBook</option>
                                    </select>
                                </div>

                                {/* Category (Relation) */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Category</label>
                                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="">Select a category</option>
                                        {Array.isArray(categories) && categories.length > 0 && categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Book Status */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Book Status</label>
                                    <select name="bookStatus" value={form.bookStatus} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="Available">Available</option>
                                        <option value="Issued">Issued</option>
                                        <option value="Lost">Lost</option>
                                        <option value="Damaged">Damaged</option>
                                    </select>
                                </div>

                                {/* Accession Number */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Accession Number</label>
                                    <input type="text" name="accessionNumber" value={form.accessionNumber} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Barcode */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Barcode</label>
                                    <input type="text" name="barcode" value={form.barcode} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Shelf Location */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Shelf Location</label>
                                    <input type="text" name="shelfLocation" value={form.shelfLocation} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Number of Copies */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Number of Copies</label>
                                    <input type="number" name="numberOfCopies" value={form.numberOfCopies} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Available Copies */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Available Copies</label>
                                    <input type="number" name="availableCopies" value={form.availableCopies} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Added At */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Added At</label>
                                    <input type="date" name="addedAt" value={form.addedAt} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Cover Image */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Upload Cover Image</label>
                                    <input
                                        type="file"
                                        name="coverImage"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setForm((prev) => ({
                                                ...prev,
                                                coverImageFile: file,
                                                coverImagePreview: URL.createObjectURL(file),
                                            }));
                                        }}
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {form.coverImagePreview && (
                                        <img src={form.coverImagePreview} alt="Preview" className="mt-2 max-h-48 rounded shadow border" />
                                    )}
                                </div>

                                {/* Tags (Repeatable Component) */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Tags</label>
                                    {form.tags.map((tag, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                name={`tags-${index}`}
                                                value={tag.value}
                                                onChange={(e) => {
                                                    const newTags = [...form.tags];
                                                    newTags[index].value = e.target.value;
                                                    setForm((prev) => ({ ...prev, tags: newTags }));
                                                }}
                                                className="w-full p-2 border rounded-md"
                                                placeholder="Tag name"
                                            />
                                            <button
                                                type="button"
                                                className="text-red-500"
                                                onClick={() => {
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        tags: form.tags.filter((_, i) => i !== index),
                                                    }));
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                tags: [...prev.tags, { value: '' }],
                                            }))
                                        }
                                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                                    >
                                        + Add Tag
                                    </button>
                                </div>

                                {/* Summary */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Summary</label>
                                    <textarea name="summary" value={form.summary} onChange={handleChange} rows={5} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Notes */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Notes</label>
                                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Acquisition Relation (optional dropdown) */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Acquisition</label>
                                    <select name="acquisitions" value={form.acquisitions} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="">Select acquisition</option>
                                        {Array.isArray(acquisitions) && acquisitions.length > 0 && acquisitions.map((a) => (
                                            <option key={a.id} value={a.id}>{a.identifier || `Acquisition ${a.id}`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
                        <p className="text-gray-600">Track and manage book stock, locations, and conditions.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
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
                                <th className="px-6 py-3">Cover</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Author</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Shelf</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inventory.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            No books available in the inventory.
                                        </td>
                                    </tr>
                                ) :
                                    inventory.length > 0 && filteredBooks.length > 0 ? (
                                        filteredBooks.map((book, index) => (
                                            console.log(book),
                                            <tr key={book.id || index} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-3">INV-{index + 1}</td>
                                                <td className="px-6 py-3"><img className='w-16' src={book.coverImageUrl ? `http://localhost:5000${book.coverImageUrl}` : '/assets/img/cover.png'} alt="cover" /></td>
                                                <td className="px-6 py-3">{book.title}</td>
                                                <td className="px-6 py-3">{book.author}</td>
                                                <td className="px-6 py-3">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${book.bookStatus === 'Available' ? 'bg-green-100 text-green-700' :
                                                        book.bookStatus === 'Lost' ? 'bg-red-100 text-red-700' :
                                                            book.bookStatus === 'Damaged' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-gray-200 text-gray-600'
                                                        }`}>
                                                        {book.bookStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3">{book.shelfLocation}</td>
                                                <td className="px-6 py-3">
                                                    <button onClick={() => handleDelete(book.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-red-600 mx-auto hover:scale-110 transition">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m3 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h14zM10 11v6M14 11v6" />
                                                        </svg>
                                                    </button>
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
            </div>
        </AuthenticatedLayout>
    );
}
