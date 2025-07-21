const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col space-y-3">
                        <img
                            width={150}
                            src="assets/img/logo-dark.png" // ← Update this to your actual logo path
                            alt="PESU Library Logo"
                        />
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-md font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white">Catalog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">My Books</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Reservations</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-md font-semibold mb-3">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-md font-semibold mb-3">Contact</h4>
                        <div className="text-sm text-gray-400">
                            <p>PESU University</p>
                            <p>Bangalore, India</p>
                            <p>Email: library@pesu.edu</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                    <p>&copy; 2025 PESU Library System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;