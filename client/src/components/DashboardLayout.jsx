import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import Navbar from './Navbar';
import ChatbotButton from './ChatbotButton';

const DashboardLayout = ({ children }) => {

  const { isLoggedIn } = useAuth();  
  const { toggleSidebar } = useSidebar();
  return (
    <div className="flex">
      <Sidebar isLoggedIn={isLoggedIn} />

      <div className="flex-1">
        <Navbar />
        <ChatbotButton />
        <main className="w-screen h-screen">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;