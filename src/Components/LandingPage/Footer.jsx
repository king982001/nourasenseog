const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#F9F8F5] pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-extralight mb-4">NouraSense</h3>
                        <p className="text-gray-600 font-extralight mb-4">
                            Developing state-of-the-art diagnostics and reporting tools for better child care.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.linkedin.com/company/nourasense"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#4544DF] hover:bg-[#4544DF] hover:text-white transition"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.Instagram.com/nourasense_co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#4544DF] hover:bg-[#4544DF] hover:text-white transition"
                                aria-label="Instagram"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="mailto:support@nourasense.com"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#4544DF] hover:bg-[#4544DF] hover:text-white transition"
                                aria-label="Email"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                                </svg>
                            </a>
                            <a
                                href="tel:+919723964754"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#4544DF] hover:bg-[#4544DF] hover:text-white transition"
                                aria-label="Phone"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-extralight mb-4">Quick Links</h3>
                        <ul className="space-y-2 font-extralight">
                            <li><a href="#support" className="text-gray-600 hover:text-[#4544DF] transition">Support</a></li>
                            <li><a href="#feedback" className="text-gray-600 hover:text-[#4544DF] transition">Feedback</a></li>
                            <li><a href="#privacy-policy" className="text-gray-600 hover:text-[#4544DF] transition">Privacy Policy</a></li>
                            <li><a href="#terms" className="text-gray-600 hover:text-[#4544DF] transition">Terms and Conditions</a></li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-lg font-extralight mb-4">Account</h3>
                        <ul className="space-y-2 font-extralight">
                            <li><a href="#signup" className="text-gray-600 hover:text-[#4544DF] transition">Create Account</a></li>
                            <li><a href="#login" className="text-gray-600 hover:text-[#4544DF] transition">Sign In</a></li>
                            <li><a href="#doctor-login" className="text-gray-600 hover:text-[#4544DF] transition">Doctor Login</a></li>
                            <li><a href="#pricing" className="text-gray-600 hover:text-[#4544DF] transition">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="text-lg font-extralight mb-4">Contact Us</h3>
                        <ul className="space-y-2 font-extralight">
                            <li className="text-gray-600">Phone: +91 9723964754</li>
                            <li className="text-gray-600">Email: support@nourasense.com</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-500 text-sm font-extralight">
                        © Copyright NouraSense {currentYear}. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;