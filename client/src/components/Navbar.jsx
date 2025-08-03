import React, { useState, useEffect } from 'react';
import { useSidebar } from '../context/SidebarContext';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { FaRegSun, FaRegMoon, FaBars, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  /* Toggling sidebar */
  const { toggleSidebar } = useSidebar();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  //Setting theme mode states
  const [darkMode, setDarkMode] = useState(false);

  //Getting the saved theme from the local storage and setting it
  useEffect(() => {
    const theme = localStorage.getItem('currentTheme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  //Theme toggle logic
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');//Toggling the dark class
      localStorage.setItem('currentTheme', 'dark');//Saving it to local storage
    } else {
      document.documentElement.classList.remove('dark');//Toggling the dark class
      localStorage.setItem('currentTheme', 'light');//Saving it to local storage
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <>
      <Sidebar />
      <header className='sticky top-0 z-50 bg-amber-600'>
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 text-gray-800 dark:text-white">
          
          {/* Left side: Logo + Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Feather/Quill Logo */}
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-gray-800 dark:text-white">
                  <path
                    fill="currentColor"
                    d="M28 4c-1.5 0-3 0.5-4.5 1.5C21 7 18.5 9.5 16 12.5c-1.5 1.5-2.5 3-3 4.5c-0.5 1.5-0.5 3 0 4.5c0.5 1.5 1.5 3 3 4.5L14 28l-2-2c-1.5-1.5-3-2.5-4.5-3c-1.5-0.5-3-0.5-4.5 0C1.5 23.5 0.5 24.5 0 26l2 2c1.5-0.5 2.5-1.5 3-3c0.5-1.5 0.5-3 0-4.5c-0.5-1.5-1.5-3-3-4.5c2.5-2.5 5-5 8.5-6.5C12 8.5 14.5 7.5 17 7c2.5-0.5 5-0.5 7.5 0C26 7.5 27.5 8.5 28 10V4z"
                  />
                  {/* Curved line at bottom */}
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M4 28c2-1 4-1.5 6-1.5s4 0.5 6 1.5"
                  />
                </svg>
              </div>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200">
                Home
              </Link>
              <Link to="/articles" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200">
                Articles
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200">
                About
              </Link>
            </div>
          </div>

          {/* Right side: Person Icon + Toggle + Login + Hamburger */}
          <div className="flex items-center space-x-4">
            {/* Person Icon */}
            {isLoggedIn ? (
              <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <FaUserCircle className="w-6 h-6" />
              </Link>
            ) : (
              <div className="text-gray-700 dark:text-gray-300">
                <FaUserCircle className="w-6 h-6" />
              </div>
            )}
            
            {/* Theme Toggle with your custom color #5D7285 */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200"
              style={{ backgroundColor: '#5D7285' }}
              aria-label="Toggle theme"
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${darkMode ? 'translate-x-7' : 'translate-x-1'}`}>
                {darkMode ? (
                  <FaRegMoon className="h-4 w-4 text-gray-600 m-1" />
                ) : (
                  <FaRegSun className="h-4 w-4 text-yellow-500 m-1" />
                )}
              </span>
            </button>

            {/* Login Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-medium"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                LOGIN
              </Link>
            )}

            {/* Hamburger Menu (rightmost) */}
            <button
              onClick={toggleSidebar}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-label="Toggle Sidebar"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}