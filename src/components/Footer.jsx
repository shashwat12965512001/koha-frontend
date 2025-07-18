const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">PESU Library</h3>
                        <p className="text-gray-400 text-sm">
                            Your comprehensive library management solution.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white">Catalog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">My Books</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Reservations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mb-3">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mb-3">Contact</h4>
                        <div className="text-sm text-gray-400">
                            <p>PESU University</p>
                            <p>Bangalore, India</p>
                            <p>Email: library@pesu.edu</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                    <p>&copy; 2025 PESU Library System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;