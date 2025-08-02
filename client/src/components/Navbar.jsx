import React, { useState, useEffect } from "react";
import { FaBars, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom"; // Keep this if using React Router

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [backendStatus, setBackendStatus] = useState("Checking...");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    testBackendConnection();
    loadUserData();
    loadThemePreference();
  }, []);

  const testBackendConnection = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/test");
      const data = await response.json();
      setBackendStatus(`✅ Backend: ${data.message}`);
    } catch (error) {
      setBackendStatus("❌ Backend not connected");
    }
  };

  const loadUserData = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/user");
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  const loadThemePreference = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/theme?userId=default");
      const data = await response.json();
      setIsDarkMode(data.theme === "dark");
    } catch (error) {
      console.error("Failed to load theme preference:", error);
    }
  };

  const toggleDarkMode = async () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);

    try {
      const response = await fetch("http://localhost:3500/api/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: newTheme,
          userId: "default",
        }),
      });

      const data = await response.json();
      console.log("Theme saved:", data.message);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  const handleLogin = () => {
    console.log("Login button clicked");
    alert("Login functionality would be implemented here");
  };

  return (
    <nav
      className={`relative transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 border-b border-gray-700" : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`w-6 h-6 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                <line x1="16" y1="8" x2="2" y2="22" stroke="currentColor" strokeWidth="2" />
                <line x1="17.5" y1="15" x2="9" y2="15" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 ml-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-lg font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-gray-100 hover:text-gray-300" : "text-gray-900 hover:text-gray-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 ml-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center rounded-full p-1 w-12 h-6 relative transition-all duration-300 ${
                isDarkMode ? "bg-gray-700" : "bg-yellow-100"
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
                  isDarkMode ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {isDarkMode ? <FaMoon className="w-3 h-3 text-gray-800" /> : <FaSun className="w-3 h-3 text-yellow-600" />}
              </div>
              <FaSun className={`absolute left-1 w-3 h-3 ${isDarkMode ? "opacity-30 text-gray-400" : "opacity-0"}`} />
              <FaMoon className={`absolute right-1 w-3 h-3 ${isDarkMode ? "opacity-0" : "opacity-30 text-gray-400"}`} />
            </button>

            {/* User Icon */}
            <button
              className={`p-2 rounded-full ${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              <FaUser className="w-4 h-4" />
            </button>

            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full ${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 right-0 shadow-lg z-50 ${
            isDarkMode ? "bg-gray-900 border-b border-gray-700" : "bg-white border-b border-gray-200"
          }`}
        >
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block font-medium py-2 ${
                  isDarkMode ? "text-gray-100 hover:text-gray-300" : "text-gray-900 hover:text-gray-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Debug Info */}
      <div className="hidden">
        <p className="text-xs text-gray-500 px-4 py-1">{backendStatus}</p>
      </div>
    </nav>
  );
}
