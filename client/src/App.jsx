import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useSidebar } from './context/SidebarContext';
import { Outlet } from 'react-router-dom';

function App() {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
