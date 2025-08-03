import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero-section';
import { useSidebar } from './context/SidebarContext';
import { Outlet } from 'react-router-dom';

function App() {
  const { isSidebarOpen } = useSidebar();

  return (
    <div>
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar />
        <main className="p-4">
          <Outlet />
          <Hero />
        </main>
      </div>
    </div>
  );
}

export default App;
