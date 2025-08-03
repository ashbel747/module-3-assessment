import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {

  const { isLoggedIn } = useAuth();  
  const { toggleSidebar } = useSidebar();
  return (
    <div className="flex">
      <Sidebar isLoggedIn={isLoggedIn} />

      <div className="flex-1">
        <Navbar />
        <main className="w-screen h-screen bg-white dark:bg-gray-800">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;