'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
    const role = user?.role?.name || '';
    let menuItems = [];

    const studentMenu = [
        { id: 'student', label: 'Dashboard', icon: '📊', path: '/student' },
        { id: 'borrowed', label: 'My Borrowed Books', icon: '📖', path: '/student/borrowed' },
        { id: 'search', label: 'Search Catalog', icon: '🔍', path: '/student/search' },
        { id: 'reserve', label: 'Reserve Books', icon: '💾', path: '/student/reserve' },
        { id: 'reminders', label: 'Due Reminders', icon: '📅', path: '/student/reminders' },
        { id: 'fines', label: 'Fine Summary', icon: '🧾', path: '/student/fines' },
        { id: 'ai-recommendations', label: 'AI Recommendations', icon: '📚', path: '/student/ai/recommendations' },
        { id: 'academic-suggestions', label: 'Academic Suggestions', icon: '🎯', path: '/student/ai/academic' },
        { id: 'ai-summaries', label: 'AI Book Summaries', icon: '🧠', path: '/student/ai/summaries' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️', path: '/student/preferences' },
        { id: 'reading-history', label: 'Reading History', icon: '📚', path: '/student/history' },
        { id: 'usage-stats', label: 'Usage Stats', icon: '📊', path: '/student/stats' },
        { id: 'book-request', label: 'Request a Book', icon: '📬', path: '/student/request' },
        { id: 'feedback', label: 'Feedback / Support', icon: '💬', path: '/student/feedback' },
        { id: 'events', label: 'Library Events', icon: '🗓️', path: '/student/events' },
        { id: 'announcements', label: 'Announcements', icon: '📢', path: '/student/announcements' },
    ];

    const adminMenu = [
        { id: 'admin', label: 'Dashboard', icon: '📊', path: '/admin' },
        { id: 'acquisitions', label: 'Acquisitions', icon: '🛒', path: '/admin/acquisitions' },
        { id: 'serials', label: 'Serials', icon: '🗞️', path: '/admin/serials' },
        { id: 'circulation', label: 'Circulation', icon: '🔁', path: '/admin/circulation' },
        { id: 'inventory', label: 'Inventory', icon: '📦', path: '/admin/inventory' },
        { id: 'role_permissions', label: 'Roles & Permissions', icon: '🛡️', path: '/admin/role_permissions' },
        { id: 'issue-return', label: 'Issue/Return Books', icon: '📤', path: '/admin/issue-return' },
        { id: 'fine', label: 'Fines & Penalties', icon: '💰', path: '/admin/fine' },
        { id: 'catalog', label: 'Catalog', icon: '📚', path: '/admin/catalog' },
        { id: 'my-books', label: 'My Books', icon: '📖', path: '/admin/my-books' },
        { id: 'reservations', label: 'Reservations', icon: '🔖', path: '/admin/reservations' },
        { id: 'patrons', label: 'Patrons', icon: '👥', path: '/admin/patrons' },
        { id: 'reports', label: 'Reports', icon: '📈', path: '/admin/reports' },
        { id: 'settings', label: 'Settings', icon: '⚙️', path: '/admin/settings' },
    ];

    // universal
    const commonMenu = [
        { id: 'logout', label: 'Logout', icon: '👈', path: '/logout' }
    ];

    if (role === 'Student') {
        menuItems = [...studentMenu, ...commonMenu];
    } else if (role === 'Admin') {
        menuItems = [...adminMenu, ...commonMenu];
    }


    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

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