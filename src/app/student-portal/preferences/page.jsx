'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

const Preferences = () => {
    const [preferences, setPreferences] = useState({
        darkMode: false,
        fontSize: 'medium',
        reminders: true,
        newBookAlerts: true,
        aiRecommendations: true,
        aiSummaries: true,
        shareReadingStats: false,
    });

    const handleToggle = (key) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleFontSizeChange = (e) => {
        setPreferences((prev) => ({
            ...prev,
            fontSize: e.target.value,
        }));
    };

    const savePreferences = () => {
        alert('✅ Preferences saved successfully!');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">⚙️ Preferences</h1>
                <p className="text-sm text-gray-600 mb-6">Customize your experience</p>

                {/* UI Settings */}
                <div className="bg-white shadow rounded-lg border border-gray-200 p-5 space-y-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">🎨 UI Settings</h2>
                    <div className="flex justify-between items-center">
                        <span>Dark Mode</span>
                        <input
                            type="checkbox"
                            checked={preferences.darkMode}
                            onChange={() => handleToggle('darkMode')}
                            className="w-5 h-5"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Font Size</span>
                        <select
                            value={preferences.fontSize}
                            onChange={handleFontSizeChange}
                            className="border rounded px-2 py-1"
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium (default)</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white shadow rounded-lg border border-gray-200 p-5 space-y-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">🔔 Notifications</h2>
                    <div className="flex justify-between items-center">
                        <span>Due Date Reminders</span>
                        <input
                            type="checkbox"
                            checked={preferences.reminders}
                            onChange={() => handleToggle('reminders')}
                            className="w-5 h-5"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span>New Book Alerts</span>
                        <input
                            type="checkbox"
                            checked={preferences.newBookAlerts}
                            onChange={() => handleToggle('newBookAlerts')}
                            className="w-5 h-5"
                        />
                    </div>
                </div>

                {/* AI Settings */}
                <div className="bg-white shadow rounded-lg border border-gray-200 p-5 space-y-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">🧠 AI Features</h2>
                    <div className="flex justify-between items-center">
                        <span>Enable AI Recommendations</span>
                        <input
                            type="checkbox"
                            checked={preferences.aiRecommendations}
                            onChange={() => handleToggle('aiRecommendations')}
                            className="w-5 h-5"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Enable AI Summaries</span>
                        <input
                            type="checkbox"
                            checked={preferences.aiSummaries}
                            onChange={() => handleToggle('aiSummaries')}
                            className="w-5 h-5"
                        />
                    </div>
                </div>

                {/* Privacy */}
                <div className="bg-white shadow rounded-lg border border-gray-200 p-5 space-y-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">🔒 Privacy Settings</h2>
                    <div className="flex justify-between items-center">
                        <span>Allow sharing reading stats with AI</span>
                        <input
                            type="checkbox"
                            checked={preferences.shareReadingStats}
                            onChange={() => handleToggle('shareReadingStats')}
                            className="w-5 h-5"
                        />
                    </div>
                </div>

                <button
                    onClick={savePreferences}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                >
                    💾 Save Preferences
                </button>
            </div>
        </AuthenticatedLayout>
    );
};

export default Preferences;