import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
  };

  const navLinks = [
    { id: "Home", text: "Home", path: "/" },
    { id: "howitwork", text: "How It Works" },
    { id: "rentaldetail", text: "Rental Details" },
    { id: "why choose", text: "Why Choose Us" },
    { id: "testimonials", text: "Testimonials" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left-aligned Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 group transform transition duration-300 hover:scale-105"
            >
              <img
                src="/src/assets/logo.png"
                alt="RentRush Logo"
                className="h-[70px] md:h-[100px] w-auto"
              />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-[#C17D3C] leading-tight">
                  RentRush
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links - Desktop */}
          <div className="hidden md:flex items-center justify-center flex-5 mx-10">
            <div className="flex space-x-2 bg-gray-50 rounded-full px-2 py-1 shadow-inner">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-full text-lg font-medium text-gray-700 hover:text-[#00004b] hover:bg-white transition-all duration-200 ${
                    link.path ? "" : "cursor-pointer"
                  }`}
                >
                  {link.path ? (
                    <Link to={link.path}>{link.text}</Link>
                  ) : (
                    link.text
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right-aligned Actions */}
          <div className="flex items-center space-x-4">
            {/* Register Dropdown - Desktop */}
            <div className="relative group hidden md:block">
              <button className="flex items-center space-x-1 px-5 py-2 rounded-full text-lg font-medium text-[#00004b] bg-white border border-gray-200 hover:border-[#C17D3C] hover:text-[#C17D3C] transition-all duration-200 shadow-sm">
                <span>Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="absolute right-0 mt-2 w-48 origin-top-right scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-white shadow-lg rounded-md py-1 z-10 transition-all duration-200 transform border border-gray-100">
                <Link
                  to="/showroom/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#C17D3C] hover:text-white transition-colors duration-150"
                >
                  Showroom
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#C17D3C] hover:text-white transition-colors duration-150"
                >
                  Customer
                </Link>
              </div>
            </div>

            {/* Login Button - Desktop */}
            <Link
              to="/login"
              className="hidden md:block px-5 py-2 rounded-full bg-[#C17D3C] text-white text-lg font-medium shadow-md hover:bg-[#b67435] transition-colors duration-200"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} transition-all duration-300 ease-in-out`}
        >
          <div className="pt-2 pb-4 space-y-1 bg-white">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-[#00004b] hover:bg-gray-50 transition-all duration-200"
              >
                {link.path ? <Link to={link.path}>{link.text}</Link> : link.text}
              </button>
            ))}

            {/* Mobile Register Dropdown */}
            <div className="px-4 py-3">
              <div className="text-lg font-medium text-gray-700 mb-2">
                Register As:
              </div>
              <Link
                to="/showroom/signup"
                className="block px-4 py-2 text-gray-700 hover:bg-[#C17D3C] hover:text-white transition-colors duration-150 rounded-md"
              >
                Showroom
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-700 hover:bg-[#C17D3C] hover:text-white transition-colors duration-150 rounded-md"
              >
                Customer
              </Link>
            </div>

            {/* Mobile Login Button */}
            <Link
              to="/login"
              className="block mx-4 px-4 py-3 rounded-md bg-[#C17D3C] text-white text-lg font-medium text-center shadow-md hover:bg-[#b67435] transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
