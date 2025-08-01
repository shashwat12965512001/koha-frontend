'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

export default function SerialsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [serials, setSerials] = useState([]);

    const filteredSerials = serials.filter(
        (serial) =>
            serial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            serial.frequency.toLowerCase().includes(searchTerm.toLowerCase())
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
            const response = await fetch('http://localhost:5000/api/serials/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Serial added successfully!');
                console.log('Success:', data);

                // Optional: close modal or reset form
                setForm({
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

                setSerials(prev => [data.serial, ...prev]);

                setIsModalOpen(false);
            } else {
                console.error('❌ Error:', data.error);
                alert(data.error || 'Failed to add serial.');
            }
        } catch (error) {
            console.error('❌ Network error:', error);
            alert('Network error. Please try again.');
        }
    };

    const fetchAcquisitions = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/serials/');
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched serials:', data);
                setSerials(data || []);
            } else {
                console.error('Failed to fetch serials:', response.statusText);
                alert('Failed to fetch serials. Please try again later.');
            }
        } catch (error) {
            console.error('Failed to fetch serials:', error);
        }
    }

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this serial?");
        if (!confirm) return;

        try {
            const response = await fetch(`http://localhost:5000/api/serials/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("✅ Serial deleted successfully");
                setSerials(prev => prev.filter(serial => serial._id !== id));
            } else {
                console.error("❌ Failed to delete serial");
            }
        } catch (err) {
            console.error("❌ Error deleting serial:", err);
        }
    };

    useEffect(() => {
        fetchAcquisitions();
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
                                Add New Serial
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
                                {/* Serial Title */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Serial Title</label>
                                    <input onChange={handleChange} value={form.title} type="text" name="title" required className="w-full p-2 border rounded-md" placeholder="e.g. Nature Weekly" />
                                </div>

                                {/* ISSN */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">ISSN</label>
                                    <input onChange={handleChange} value={form.issn} type="text" name="issn" className="w-full p-2 border rounded-md" placeholder="e.g. 1234-5678" />
                                </div>

                                {/* Publisher */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Publisher</label>
                                    <input onChange={handleChange} value={form.publisher} type="text" name="publisher" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Frequency */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Frequency</label>
                                    <select onChange={handleChange} value={form.frequency} name="frequency" className="w-full p-2 border rounded-md" required>
                                        <option value="">Select Frequency</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Biweekly">Biweekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Annually">Annually</option>
                                        <option value="Irregular">Irregular</option>
                                    </select>
                                </div>

                                {/* Start Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Start Date</label>
                                    <input onChange={handleChange} value={form.startDate} type="date" name="startDate" className="w-full p-2 border rounded-md" required />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">End Date</label>
                                    <input onChange={handleChange} value={form.endDate} type="date" name="endDate" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Last Issue Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Last Issue Received</label>
                                    <input onChange={handleChange} value={form.lastIssueDate} type="date" name="lastIssueDate" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Next Expected Issue Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Next Issue Expected</label>
                                    <input onChange={handleChange} value={form.nextIssueDate} type="date" name="nextIssueDate" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Subscription Number */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Subscription Number</label>
                                    <input onChange={handleChange} value={form.subscriptionNumber} type="text" name="subscriptionNumber" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Subscription Price */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Subscription Price</label>
                                    <input onChange={handleChange} value={form.price} type="number" name="price" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Vendor */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Vendor</label>
                                    <input onChange={handleChange} value={form.vendor} type="text" name="vendor" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Language</label>
                                    <input onChange={handleChange} value={form.language} type="text" name="language" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Status</label>
                                    <select onChange={handleChange} value={form.status} name="status" className="w-full p-2 border rounded-md">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Suspended">Suspended</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Format */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Format</label>
                                    <select onChange={handleChange} value={form.format} name="format" className="w-full p-2 border rounded-md">
                                        <option value="">Select Format</option>
                                        <option value="Print">Print</option>
                                        <option value="Electronic">Electronic</option>
                                        <option value="Print + Electronic">Print + Electronic</option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Shelf Location</label>
                                    <input onChange={handleChange} value={form.location} type="text" name="location" className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Notes */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Notes</label>
                                    <textarea onChange={handleChange} value={form.notes} name="notes" rows={3} className="w-full p-2 border rounded-md" placeholder="Remarks, instructions or additional info..." />
                                </div>
                            </div>

                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add Serial
                            </button>
                        </form>

                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Serials</h1>
                        <p className="text-gray-600">Manage recurring publications like journals and magazines.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
                        + Add Serial
                    </button>
                </div>

                {/* Search bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by title or frequency..."
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Frequency</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Last Issue</th>
                                <th className="px-6 py-3">Next Issue</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                serials.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            No serials available. Please add a new serial.
                                        </td>
                                    </tr>
                                ) :
                                    serials.length > 0 && filteredSerials.length > 0 ? (
                                        filteredSerials.map((serial, index) => (
                                            <tr key={serial._id || index} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-3">SER-{index + 1}</td>
                                                <td className="px-6 py-3">{serial.title}</td>
                                                <td className="px-6 py-3">{serial.frequency}</td>
                                                <td className="px-6 py-3">
                                                    <span
                                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${serial.status === 'Active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : serial.status === 'Inactive'
                                                                ? 'bg-gray-200 text-gray-700'
                                                                : serial.status === 'Suspended'
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : serial.status === 'Cancelled'
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                    >
                                                        {serial.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3">{new Date(serial.lastIssueDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                                <td className="px-6 py-3">{new Date(serial.nextIssueDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                                <td className="px-6 py-3">
                                                    <button onClick={() => handleDelete(serial._id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-red-600 mx-auto hover:scale-110 transition">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m3 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h14zM10 11v6M14 11v6" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                No matching records found.
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
