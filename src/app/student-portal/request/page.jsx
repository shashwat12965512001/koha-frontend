'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

const RequestBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        edition: '',
        reason: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Connect to backend (Firebase/Flask) here
        console.log("Book request submitted:", formData);
        setSubmitted(true);
        setFormData({ title: '', author: '', edition: '', reason: '' });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">📬 Request a Book</h1>
                <p className="text-sm text-gray-600 mb-6">Can’t find a book? Submit a request and we’ll try to get it for you.</p>

                {submitted && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-700 font-medium">
                        ✅ Request submitted successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Book Title<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Eg: Atomic Habits"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Author<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="author"
                            required
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Eg: James Clear"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Edition <span className="text-gray-500 text-xs">(optional)</span></label>
                        <input
                            type="text"
                            name="edition"
                            value={formData.edition}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Eg: 2nd Edition"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Reason for Request <span className="text-gray-500 text-xs">(optional)</span></label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Why do you want this book?"
                            rows={4}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default RequestBook;