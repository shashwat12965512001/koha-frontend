'use client';

import AuthenticatedLayout from "@/components/AuthenticatedLayout";

const EventsPage = () => {
    const events = [
        {
            title: '📚 Annual Book Fair',
            date: 'August 10, 2025',
            time: '10:00 AM – 4:00 PM',
            location: 'Main Library Hall',
            description: 'Explore new arrivals, classics, and discounted books. Special student offers available!',
        },
        {
            title: '🧠 AI in Education Talk',
            date: 'August 15, 2025',
            time: '2:00 PM – 3:30 PM',
            location: 'Auditorium B2',
            description: 'A talk on how AI is transforming the way students learn and how libraries are evolving.',
        },
        {
            title: '📝 Research Paper Writing Workshop',
            date: 'August 20, 2025',
            time: '11:00 AM – 1:00 PM',
            location: 'Lab 4, East Wing',
            description: 'Learn how to write effective academic papers, cite sources, and avoid plagiarism.',
        },
    ];

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">🗓️ Library Events</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Stay updated on upcoming events, workshops, and more hosted by the library.
                </p>

                <div className="space-y-6">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h2>
                            <div className="text-sm text-gray-600 mb-2">
                                📅 {event.date} &nbsp; | &nbsp; ⏰ {event.time} &nbsp; | &nbsp; 📍 {event.location}
                            </div>
                            <p className="text-gray-700">{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EventsPage;