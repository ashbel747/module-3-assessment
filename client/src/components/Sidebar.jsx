import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();
  
  
  // Light/Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");

    toggleSidebar();
  };

  return (
    <div className={`fixed top-0 left-0 h-full w-64 sm:w-12 md:w-64 bg-blue-600 dark:bg-gray-800 text-white z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 flex flex-col`}>
      {/* Sidebar header */}
      <div className="p-4 flex justify-between items-center border-b border-blue-500">
        <span className="text-xl font-bold">Menu</span>
        <button onClick={toggleSidebar} aria-label="Close Sidebar">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Sidebar links */}
      <nav className="flex flex-col px-4 py-6 text-base space-y-2">

        {/* All posts - with darker background (selected) */}
        <Link to="/posts" onClick={toggleSidebar} className="flex items-center gap-3 px-3 py-2 bg-gray-600 bg-opacity-70 rounded-md text-white">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          <span className="text-white">All posts</span>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/dashboard" onClick={toggleSidebar} className="flex items-center gap-3 px-3 py-2 bg-gray-600 bg-opacity-70 rounded-md text-white">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-white">Dashboard</span>
            </Link>


            <Link to="/my-posts" onClick={toggleSidebar} className="flex items-center gap-3 px-3 py-2 hover:bg-blue-500 hover:bg-opacity-50 rounded-md transition-colors duration-200 text-white">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              <span className="text-white">My posts</span>
            </Link>


            <Link to="/create-post" onClick={toggleSidebar} className="flex items-center gap-3 px-3 py-2 hover:bg-blue-500 hover:bg-opacity-50 rounded-md transition-colors duration-200 text-white">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-white">Create post</span>
            </Link>
          </>
        )}
        
      </nav>

      {/* Bottom section */}
      <div className="mt-auto px-4 pb-4 space-y-2">
        {/* Light Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-between px-3 py-2 bg-gray-600 bg-opacity-70 rounded-md hover:bg-blue-500 hover:bg-opacity-50 transition-colors duration-200 w-full"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span className="text-white text-sm">Light Mode</span>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-1">
            <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-all duration-300 ${isDarkMode ? 'bg-blue-500 justify-end' : 'bg-green-500 justify-start'}`}>
              <div className="w-3 h-3 bg-white rounded-full transition-all duration-300"></div>
            </div>
          </div>
        </button>


        {/* Logout Button */}
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 bg-gray-600 bg-opacity-70 rounded-md hover:bg-blue-500 hover:bg-opacity-50 transition-colors duration-200 w-full">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          <span className="text-white text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;