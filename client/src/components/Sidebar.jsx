// components/Sidebar.jsx
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { isLoggedIn } = useAuth();

  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
      {/* Sidebar header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-600">
        <span className="text-xl font-bold">Menu</span>
        <button onClick={toggleSidebar} aria-label="Close Sidebar">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Sidebar links */}
      <nav className="flex flex-col gap-4 px-4 py-6 text-base">
        <Link to="/posts" onClick={toggleSidebar} className="hover:text-yellow-400">All Posts</Link>

        {isLoggedIn && (
          <>
            <Link to="/dashboard" onClick={toggleSidebar} className="hover:text-yellow-400">Dashboard</Link>
            <Link to="/create-post" onClick={toggleSidebar} className="hover:text-yellow-400">Create Post</Link>
            <Link to="/my-posts" onClick={toggleSidebar} className="hover:text-yellow-400">My Posts</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
