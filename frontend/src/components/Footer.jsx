import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 dark:bg-gray-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">BookStore</h3>
                        <p className="text-gray-300 dark:text-gray-400 mb-4">Your destination for literary adventures and knowledge.</p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://twitter.com" className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="https://instagram.com" className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/books" className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition-colors">
                                    All Books
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin size={20} className="text-pink-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-300 dark:text-gray-400">123 Book Street, Reading City, RC 12345</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="text-pink-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-300 dark:text-gray-400">(123) 456-7890</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="text-pink-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-300 dark:text-gray-400">info@bookstore.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-300 dark:text-gray-400 mb-4">Subscribe to get updates on new releases and special offers.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-gray-700 dark:bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-pink-500 w-full"
                            />
                            <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-r-md transition-colors">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 pt-6 text-center">
                    <p className="text-gray-300 dark:text-gray-400">
                        © {currentYear} BookStore. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
