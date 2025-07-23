'use client';

import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();

    return (
        <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <img className='me-5' width={120} src="/assets/img/logo.png" alt="logo" />
                        <h1 className="text-xl font-semibold text-gray-900">
                            Library Management System
                        </h1>
                    </div>

                    {/* Right side - Profile and Actions */}
                    <div className="flex items-center space-x-4">

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <a href='/profile' className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">U</span>
                                </div>
                                <span className="text-sm font-medium">User</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;