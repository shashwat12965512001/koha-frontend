'use client';

import AuthenticatedLayout from "@/components/AuthenticatedLayout";

const AnnouncementsPage = () => {
    const announcements = [
        {
            title: '📖 New Books Added to the Catalog',
            date: 'July 25, 2025',
            message: 'We’ve added 200+ new books in the Technology, Fiction, and Psychology sections. Check them out in the Search Catalog section.',
            important: true,
        },
        {
            title: '⏰ Extended Library Hours during Exams',
            date: 'July 20, 2025',
            message: 'From July 22 to August 5, the library will remain open from 8:00 AM to 10:00 PM including weekends.',
            important: false,
        },
        {
            title: '📢 Library Maintenance Notice',
            date: 'July 18, 2025',
            message: 'The East Wing Reading Room will be under maintenance on July 19 between 2:00 PM – 5:00 PM. Apologies for any inconvenience.',
            important: false,
        },
        {
            title: '🚫 Late Return Fine Updated',
            date: 'July 15, 2025',
            message: 'Fine for overdue books has been revised to ₹5/day starting August 1. Return on time to avoid charges.',
            important: true,
        },
    ];

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">📢 Library Announcements</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Important updates, new features, and library policy changes will appear here.
                </p>

                <div className="space-y-6">
                    {announcements.map((announcement, index) => (
                        <div
                            key={index}
                            className={`p-5 border rounded-lg shadow-sm transition ${announcement.important
                                ? 'bg-yellow-50 border-yellow-400'
                                : 'bg-white border-gray-200'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold text-gray-800">{announcement.title}</h2>
                                <span className="text-sm text-gray-500">{announcement.date}</span>
                            </div>
                            <p className="text-gray-700">{announcement.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AnnouncementsPage;