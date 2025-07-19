'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

export default function SettingsPage() {
    // Circulation policy states
    const [studentLimit, setStudentLimit] = useState(3);
    const [facultyLimit, setFacultyLimit] = useState(10);
    const [loanDays, setLoanDays] = useState(14);
    const [finePerDay, setFinePerDay] = useState(2);
    const [blockAfterFine, setBlockAfterFine] = useState(200);
    const [blockAfterOverdue, setBlockAfterOverdue] = useState(3);

    const handleCirculationSave = () => {
        // You can integrate this with Firebase or MongoDB
        console.log({
            studentLimit,
            facultyLimit,
            loanDays,
            finePerDay,
            blockAfterFine,
            blockAfterOverdue,
        });
        alert('Circulation settings saved!');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
                <p className="text-gray-600 mb-6">Configure your library system settings.</p>

                <form className="space-y-8">

                    {/* Library Info */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Library Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Library Name</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="PESU Central Library" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                                <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="admin@pes.edu" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows="2" placeholder="100 Feet Ring Road, BSK 3rd Stage, Bengaluru" />
                            </div>
                        </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Operating Hours</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Opening Time</label>
                                <input type="time" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="09:00" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Closing Time</label>
                                <input type="time" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="18:00" />
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                                <span className="text-sm text-gray-700">Enable email notifications for reservations</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded text-blue-600" />
                                <span className="text-sm text-gray-700">Allow auto-renew for eligible books</span>
                            </label>
                        </div>
                    </div>

                    {/* 📚 Circulation Policies */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Circulation Policies</h2>
                        <p className="text-sm text-gray-500 mb-4">Configure how lending rules work in your library.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Student Max Books</label>
                                <input
                                    type="number"
                                    value={studentLimit}
                                    onChange={e => setStudentLimit(e.target.value)}
                                    className="mt-1 w-full border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Faculty Max Books</label>
                                <input
                                    type="number"
                                    value={facultyLimit}
                                    onChange={e => setFacultyLimit(e.target.value)}
                                    className="mt-1 w-full border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Loan Duration (days)</label>
                                <input
                                    type="number"
                                    value={loanDays}
                                    onChange={e => setLoanDays(e.target.value)}
                                    className="mt-1 w-full border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fine per Day (₹)</label>
                                <input
                                    type="number"
                                    value={finePerDay}
                                    onChange={e => setFinePerDay(e.target.value)}
                                    className="mt-1 w-full border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Block After Fine (₹)</label>
                                <input
                                    type="number"
                                    value={blockAfterFine}
                                    onChange={e => setBlockAfterFine(e.target.value)}
                                    className="mt-1 w-full border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Block After Overdue Books</label>
                                <input
                                    type="number"
                                    value={blockAfterOverdue}
                                    onChange={e => setBlockAfterOverdue(e.target.value)}
                                    className="mt-1 w-full border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit for all settings */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
