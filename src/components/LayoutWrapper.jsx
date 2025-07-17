'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const isAuthPage = pathname === '/login' || pathname === '/register';

    return (
        <>
            {!isAuthPage && <Header />}
            <main className="flex-1 px-6 py-4 bg-gray-50">{children}</main>
            {!isAuthPage && <Footer />}
        </>
    );
}
