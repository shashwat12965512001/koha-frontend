'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export default function AuthenticatedLayout({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname(); // current route

    useEffect(() => {
        const checkAuthAndRedirect = () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!token || !user) {
                router.push('/login');
                return;
            }

            const role = user?.role?.name;
            const rolePathMap = {
                "Admin": "/admin",
                "Librarian": "/librarian",
                "Acquisition Manager": "/acquisition",
                "Inventory Manager": "/inventory",
                "Circulation Staff": "/circulation",
                "Finance Officer": "/finance",
                "Student": "/student",
            };

            const rolePath = rolePathMap[role];

            // 🚨 Redirect ONLY if current pathname doesn't start with role path
            if (!pathname.startsWith(rolePath)) {
                router.push(rolePath);
                return;
            }

            setIsAuthenticated(true);
            setIsLoading(false);
        };

        checkAuthAndRedirect();
    }, [router, pathname]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-50 overflow-auto">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}