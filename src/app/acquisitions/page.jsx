'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState, useEffect } from 'react';

export default function AcquisitionsPage() {
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchases, setPurchases] = useState([]);

    const filtered = purchases.filter(
        (item) =>
            item.vendor.toLowerCase().includes(search.toLowerCase()) ||
            item.title.toLowerCase().includes(search.toLowerCase())
    );

    const [form, setForm] = useState({
        title: '',
        issn: '',
        publisher: '',
        frequency: '',
        startDate: '',
        endDate: '',
        lastIssueDate: '',
        nextIssueDate: '',
        subscriptionNumber: '',
        price: '',
        vendor: '',
        language: '',
        status: 'Active',
        format: '',
        location: '',
        notes: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/acquisitions/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Acquisition added successfully!');
                console.log('Success:', data);

                setIsModalOpen(false);

                setForm({
                    title: '',
                    authors: '',
                    publisher: '',
                    publicationYear: '',
                    isbn: '',
                    edition: '',
                    category: '',
                    language: '',
                    format: '',
                    vendor: '',
                    invoiceNumber: '',
                    acquisitionDate: '',
                    quantity: '',
                    unitPrice: '',
                    shelfLocation: '',
                    notes: ''
                });

                setPurchases(prev => [data.acquisition, ...prev]);
            } else {
                console.error('❌ Error:', data.error);
            }
        } catch (error) {
            console.error('❌ Network error:', error);
            alert('Network error. Please try again.');
        }
        console.log('Submitted:', form);
    };

    useEffect(() => {
        const fetchAcquisitions = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/acquisitions/');
                const data = await response.json();
                setPurchases(data);
            } catch (error) {
                console.error('❌ Error fetching acquisitions:', error);
            }
        };

        fetchAcquisitions();
    }, []);

    return (
        <AuthenticatedLayout>
            {/* Main modal */}
            <div
                id="add-new-acquisition"
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
                                Add New Acquisition
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {/* Title */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Book Title</label>
                                    <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full p-2 border rounded-md" placeholder="e.g. Data Structures in C" />
                                </div>

                                {/* Authors */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Authors</label>
                                    <input type="text" name="authors" value={form.authors} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="e.g. E. Balagurusamy" />
                                </div>

                                {/* Publisher */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Publisher</label>
                                    <input type="text" name="publisher" value={form.publisher} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Publication Year */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Publication Year</label>
                                    <input type="number" name="publicationYear" value={form.publicationYear} onChange={handleChange} className="w-full p-2 border rounded-md" />
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

                                {/* Category */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Category</label>
                                    <input type="text" name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Language</label>
                                    <input type="text" name="language" value={form.language} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Format */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Format</label>
                                    <input type="text" name="format" value={form.format} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="e.g. Hardcover, Paperback" />
                                </div>

                                {/* Vendor */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Vendor</label>
                                    <input type="text" name="vendor" value={form.vendor} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Invoice Number */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Invoice Number</label>
                                    <input type="text" name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Acquisition Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Acquisition Date</label>
                                    <input type="date" name="acquisitionDate" value={form.acquisitionDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Quantity</label>
                                    <input type="number" name="quantity" required value={form.quantity} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Unit Price */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Unit Price</label>
                                    <input type="number" name="unitPrice" required value={form.unitPrice} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Total Cost (auto or manual) */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Total Cost</label>
                                    <input type="number" name="totalCost" value={form.totalCost} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Shelf Location */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Shelf Location</label>
                                    <input type="text" name="shelfLocation" value={form.shelfLocation} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Notes */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Additional Notes</label>
                                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full p-2 border rounded-md" />
                                </div>
                            </div>

                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add Acquisition
                            </button>
                        </form>

                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Acquisitions</h1>
                        <p className="text-gray-600">Manage book orders and vendors.</p>
                    </div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Purchase
                    </button>

                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by vendor or book title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
                    />
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Vendor</th>
                                <th className="px-6 py-3">Book Title</th>
                                <th className="px-6 py-3">Qty</th>
                                <th className="px-6 py-3">Cost</th>
                                <th className="px-6 py-3">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                purchases.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-gray-500 px-6 py-4">
                                            No acquisitions found. Please add a new purchase.
                                        </td>
                                    </tr>
                                ) :
                                    filtered.length > 0 ? (
                                        filtered.map((purchase, index) => (
                                            <tr key={purchase._id || index} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-3">AC-{index + 1}</td>
                                                <td className="px-6 py-3">{purchase.vendor}</td>
                                                <td className="px-6 py-3">{purchase.title}</td>
                                                <td className="px-6 py-3">{purchase.quantity}</td>
                                                <td className="px-6 py-3">{purchase.totalCost}</td>
                                                <td className="px-6 py-3">{new Date(purchase.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center text-gray-500 px-6 py-4">
                                                No results found.
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
