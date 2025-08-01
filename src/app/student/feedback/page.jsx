'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

const FeedbackSupport = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'General',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Connect to backend
        console.log('Feedback submitted:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', type: 'General', message: '' });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">💬 Feedback / Support</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Got a suggestion, bug report, or need help? We’d love to hear from you.
                </p>

                {submitted && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-700 font-medium">
                        ✅ Thank you! Your feedback has been received.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Your Name <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Your Email <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Type of Feedback</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>General</option>
                            <option>Suggestion</option>
                            <option>Bug Report</option>
                            <option>Support</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Write your feedback or issue here..."
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default FeedbackSupport;