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

  //Sticky Navigation
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  }


  return (
    <>
      <Sidebar />
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-amber-600 shadow" : "bg-amber-600 shadow"} dark:bg-gray-800`}>
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 text-gray-800 dark:text-white">
          
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-800 dark:text-white"
              aria-label="Toggle Sidebar"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <Link to="/" className="font-bold text-lg md:text-2xl">
              MyBlog
            </Link>
          </div>

          {/* Right: Auth Links + Theme Toggle */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-200 hover:text-blue-500">
                  <FaUserCircle className="w-6 h-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-none text-sm"
            >
              {darkMode ? (
                <FaRegSun className="hover:text-orange-400" />
              ) : (
                <FaRegMoon className="hover:text-white" />
              )}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
