'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

export default function SettingsPage() {

    const [settings, setSettings] = useState({
        libraryName: '',
        contactEmail: '',
        address: '',
        openingTime: '09:00',
        closingTime: '18:00',

        // Notifications
        emailNotifications: false,
        dueDateReminders: false,
        whatsappAlerts: false,
        weeklyDigest: false,

        // AI Features
        aiRecommendations: false,
        academicSuggestions: false,
        aiSummaries: false,

        // UX
        autoRenew: false,
        darkMode: false,
        showBookCovers: false,
        saveFilters: false,

        // Privacy
        privacyMode: false,
        hideReadingHistory: false,
        autoClearHistory: false,

        // Circulation
        studentLimit: 0,
        facultyLimit: 0,
        loanDays: 0,
        finePerDay: 0,
        blockAfterFine: 0,
        blockAfterOverdue: 0
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/settings/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(settings),
            });

            const data = await res.json();
            if (res.ok) {
                alert("✅ Settings saved successfully");
            } else {
                console.error(data.error);
                alert("❌ Failed to save settings");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Server error");
        }
    };

    const fetchAllSettings = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/settings/');
            const data = await res.json();
            if (res.ok) {
                setSettings(data); // assuming you have a useState for patrons
            } else {
                alert(data.error || 'Failed to fetch patrons');
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };

    useEffect(() => {
        fetchAllSettings();
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
                <p className="text-gray-600 mb-6">Configure your library system settings.</p>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Library Info */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Library Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="libraryName" className="block text-sm font-medium text-gray-700">Library Name</label>
                                <input id="libraryName" name="libraryName" type="text" value={settings.libraryName} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
                                    placeholder="PESU Central Library" />
                            </div>
                            <div>
                                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
                                <input id="contactEmail" name="contactEmail" type="email" value={settings.contactEmail} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
                                    placeholder="admin@pes.edu" />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea id="address" name="address" value={settings.address} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2" rows="2"
                                    placeholder="100 Feet Ring Road, BSK 3rd Stage, Bengaluru" />
                            </div>
                        </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Operating Hours</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700">Opening Time</label>
                                <input id="openingTime" name="openingTime" type="time" value={settings.openingTime} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2" />
                            </div>
                            <div>
                                <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700">Closing Time</label>
                                <input id="closingTime" name="closingTime" type="time" value={settings.closingTime} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2" />
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h2>
                        <div className="space-y-4">

                            {/* Notifications */}
                            <h2 className="text-md font-semibold text-gray-800 mb-2">Notifications</h2>
                            {[
                                { id: 'emailNotifications', label: 'Enable email notifications for reservations' },
                                { id: 'dueDateReminders', label: 'Remind me about due dates' },
                                { id: 'whatsappAlerts', label: 'Send notifications via WhatsApp' },
                                { id: 'weeklyDigest', label: 'Receive weekly new arrivals digest' },
                            ].map(({ id, label }) => (
                                <label key={id} htmlFor={id} className="flex items-center space-x-2">
                                    <input id={id} name={id} type="checkbox" checked={settings[id]} onChange={handleChange}
                                        className="rounded text-blue-600" />
                                    <span className="text-sm text-gray-700">{label}</span>
                                </label>
                            ))}

                            {/* AI Features */}
                            <h2 className="text-md font-semibold text-gray-800 mb-2">AI Features</h2>
                            {[
                                { id: 'aiRecommendations', label: 'Enable AI-based book recommendations' },
                                { id: 'academicSuggestions', label: 'Recommend academic resources' },
                                { id: 'aiSummaries', label: 'Show AI-generated book summaries' },
                            ].map(({ id, label }) => (
                                <label key={id} htmlFor={id} className="flex items-center space-x-2">
                                    <input id={id} name={id} type="checkbox" checked={settings[id]} onChange={handleChange}
                                        className="rounded text-blue-600" />
                                    <span className="text-sm text-gray-700">{label}</span>
                                </label>
                            ))}

                            {/* UX */}
                            <h2 className="text-md font-semibold text-gray-800 mb-2">User Experience</h2>
                            {[
                                { id: 'autoRenew', label: 'Allow auto-renew for eligible books' },
                                { id: 'darkMode', label: 'Enable dark mode' },
                                { id: 'showBookCovers', label: 'Show book covers in search results' },
                                { id: 'saveFilters', label: 'Remember my last search filters' },
                            ].map(({ id, label }) => (
                                <label key={id} htmlFor={id} className="flex items-center space-x-2">
                                    <input id={id} name={id} type="checkbox" checked={settings[id]} onChange={handleChange}
                                        className="rounded text-blue-600" />
                                    <span className="text-sm text-gray-700">{label}</span>
                                </label>
                            ))}

                            {/* Privacy */}
                            <h2 className="text-md font-semibold text-gray-800 mb-2">Privacy</h2>
                            {[
                                { id: 'privacyMode', label: 'Enable privacy-focused mode' },
                                { id: 'hideReadingHistory', label: 'Hide my reading history' },
                                { id: 'autoClearHistory', label: 'Auto-clear history after 30 days' },
                            ].map(({ id, label }) => (
                                <label key={id} htmlFor={id} className="flex items-center space-x-2">
                                    <input id={id} name={id} type="checkbox" checked={settings[id]} onChange={handleChange}
                                        className="rounded text-blue-600" />
                                    <span className="text-sm text-gray-700">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Circulation Policies */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Circulation Policies</h2>
                        <p className="text-sm text-gray-500 mb-4">Configure how lending rules work in your library.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'studentLimit', label: 'Student Max Books' },
                                { id: 'facultyLimit', label: 'Faculty Max Books' },
                                { id: 'loanDays', label: 'Loan Duration (days)' },
                                { id: 'finePerDay', label: 'Fine per Day (₹)' },
                                { id: 'blockAfterFine', label: 'Block After Fine (₹)' },
                                { id: 'blockAfterOverdue', label: 'Block After Overdue Books' },
                            ].map(({ id, label }) => (
                                <div key={id}>
                                    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                                    <input
                                        id={id}
                                        name={id}
                                        type="number"
                                        value={settings[id]}
                                        onChange={handleChange}
                                        className="mt-1 w-full border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button type="submit" onClick={handleSubmit}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200">
                            Save Settings
                        </button>
                    </div>
                </form>

            </div>
        </AuthenticatedLayout>
    );
}
