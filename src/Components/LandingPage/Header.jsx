import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="w-8 h-8 bg-[#4544DF] text-white flex items-center justify-center rounded mr-2">
                <span className="text-xl font-normal">+</span>
              </div>
              <span className="text-xl font-extralight">NouraSense</span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#who-we-help" className="text-gray-800 font-extralight hover:text-[#4544DF] transition">Who We Help</a>
            <a href="#features" className="text-gray-800 font-extralight hover:text-[#4544DF] transition">Features</a>
            <a href="#partners" className="text-gray-800 font-extralight hover:text-[#4544DF] transition">Partners</a>
            <a href="#resources" className="text-gray-800 font-extralight hover:text-[#4544DF] transition">Resources</a>
            <a href="#company" className="text-gray-800 font-extralight hover:text-[#4544DF] transition">Company</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#login" className="flex items-center text-gray-800 font-extralight hover:text-[#4544DF]">
              <span className="mr-2">EN</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            <a href="#contact" className="px-5 py-2 rounded bg-[#4544DF] text-white font-extralight hover:bg-[#3c3cbb] transition">
              Get in touch
            </a>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-md text-gray-800 hover:text-[#4544DF] hover:bg-gray-50 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-4">
          <div className="space-y-1 pt-2 pb-3">
            <a href="#who-we-help" className="block px-3 py-2 rounded-md text-base font-extralight text-gray-800 hover:bg-gray-50 hover:text-[#4544DF]">
              Who We Help
            </a>
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-extralight text-gray-800 hover:bg-gray-50 hover:text-[#4544DF]">
              Features
            </a>
            <a href="#partners" className="block px-3 py-2 rounded-md text-base font-extralight text-gray-800 hover:bg-gray-50 hover:text-[#4544DF]">
              Partners
            </a>
            <a href="#resources" className="block px-3 py-2 rounded-md text-base font-extralight text-gray-800 hover:bg-gray-50 hover:text-[#4544DF]">
              Resources
            </a>
            <a href="#company" className="block px-3 py-2 rounded-md text-base font-extralight text-gray-800 hover:bg-gray-50 hover:text-[#4544DF]">
              Company
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-100">
            <div className="flex items-center px-3 py-2">
              <a href="#language" className="flex items-center text-gray-800 font-extralight">
                <span className="mr-2">EN</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
            </div>
            <div className="mt-3">
              <a href="#contact" className="block px-4 py-2 text-center rounded bg-[#4544DF] text-white font-extralight">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;