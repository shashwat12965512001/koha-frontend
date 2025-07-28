'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const menuItems = [
        // Student Menu Items
        { id: 'student-portal', label: 'Student', icon: '📊', path: '/student-portal' },
        { id: 'borrowed', label: 'My Borrowed Books', icon: '📖', path: '/student-portal/borrowed' },
        { id: 'search', label: 'Search Catalog', icon: '🔍', path: '/student-portal/search' },
        { id: 'reserve', label: 'Reserve Books', icon: '💾', path: '/student-portal/reserve' },
        { id: 'reminders', label: 'Due Reminders', icon: '📅', path: '/student-portal/reminders' },
        { id: 'fines', label: 'Fine Summary', icon: '🧾', path: '/student-portal/fines' },
        { id: 'ai-recommendations', label: 'AI Recommendations', icon: '📚', path: '/student-portal/ai/recommendations' },
        { id: 'academic-suggestions', label: 'Academic Suggestions', icon: '🎯', path: '/student-portal/ai/academic' },
        { id: 'ai-summaries', label: 'AI Book Summaries', icon: '🧠', path: '/student-portal/ai/summaries' },
        { id: 'profile', label: 'My Profile', icon: '👤', path: '/student-portal/profile' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️', path: '/student-portal/preferences' },
        { id: 'reading-history', label: 'Reading History', icon: '📚', path: '/student-portal/history' },
        { id: 'usage-stats', label: 'Usage Stats', icon: '📊', path: '/student-portal/stats' },
        { id: 'book-request', label: 'Request a Book', icon: '📬', path: '/student-portal/request' },
        { id: 'feedback', label: 'Feedback / Support', icon: '💬', path: '/student-portal/feedback' },
        { id: 'events', label: 'Library Events', icon: '🗓️', path: '/student-portal/events' },
        { id: 'announcements', label: 'Announcements', icon: '📢', path: '/student-portal/announcements' },

        // Admin Menu Items
        // { id: 'admin-dashboard', label: 'Dashboard', icon: '📊', path: '/admin-dashboard' },
        // { id: 'acquisitions', label: 'Acquisitions', icon: '🛒', path: '/acquisitions' },
        // { id: 'serials', label: 'Serials', icon: '🗞️', path: '/serials' },
        // { id: 'circulation', label: 'Circulation', icon: '🔁', path: '/circulation' },
        // { id: 'inventory', label: 'Inventory', icon: '📦', path: '/inventory' },
        // { id: 'role_permissions', label: 'Roles & Permissions', icon: '🛡️', path: '/role_permissions' },
        // { id: 'issue-return', label: 'Issue/Return Books', icon: '📤', path: '/issue-return' },
        // { id: 'fine', label: 'Fines & Penalties', icon: '💰', path: '/fine' },
        // { id: 'catalog', label: 'Catalog', icon: '📚', path: '/catalog' },
        // { id: 'my-books', label: 'My Books', icon: '📖', path: '/my-books' },
        // { id: 'reservations', label: 'Reservations', icon: '🔖', path: '/reservations' },
        // { id: 'patrons', label: 'Patrons', icon: '👥', path: '/patrons' },
        // { id: 'reports', label: 'Reports', icon: '📈', path: '/reports' },
        // { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
        { id: 'logout', label: 'logout', icon: '👈', path: '/logout' }
    ];

    const isActive = (path) => pathname === path;

    return (
        <aside className={`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
            } min-h-screen sticky top-16 z-30`}>
            {/* Toggle Button */}
            <div className="p-4 border-b border-gray-700">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <svg
                        className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <a
                                onClick={(e) => {
                                    if (item.id === 'logout') {
                                        e.preventDefault();
                                        handleLogout();
                                    } else {
                                        router.push(item.path);
                                    }
                                }}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive(item.path)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                href={item.path}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {!isCollapsed && <span className="font-medium">{item.label}</span>}
                            </a>

                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;