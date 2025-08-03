import React, { useState } from "react";
import { FaBars, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar({ onHamburgerClick, isDarkMode, toggleDarkMode, isSidebarOpen }) {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "About", href: "/about" },
  ];

  const handleLogin = () => {
    console.log("Login button clicked");
    alert("Login functionality would be implemented here");
  };

  return (
    <nav className={`border-b shadow-sm ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <div className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-black"}`}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1="16" y1="8" x2="2" y2="22" stroke="currentColor" strokeWidth="2" />
                  <line x1="17.5" y1="15" x2="9" y2="15" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Navigation Links (desktop only) */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium transition-colors duration-200 ${
                    isDarkMode 
                      ? "text-gray-300 hover:text-white" 
                      : "text-gray-900 hover:text-gray-600"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Profile Icon */}
            <button className={`p-2 rounded-full transition-colors duration-200 ${
              isDarkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}>
              <FaUser className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center rounded-full p-1 w-12 h-6 relative transition-all duration-300 ${
                isDarkMode ? "bg-gray-600" : "bg-yellow-100"
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
                  isDarkMode ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {isDarkMode ? <FaMoon className="w-3 h-3 text-gray-800" /> : <FaSun className="w-3 h-3 text-yellow-600" />}
              </div>
              <FaSun className="absolute left-1 w-3 h-3 opacity-0" />
              <FaMoon className="absolute right-1 w-3 h-3 opacity-30 text-gray-400" />
            </button>

            {/* Login Button */}
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              LOGIN
            </Link>

            {/* Hamburger Menu (always visible) */}
            <button
              onClick={onHamburgerClick}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isDarkMode 
                  ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
