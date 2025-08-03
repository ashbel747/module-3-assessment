import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero-section';
import SignUp from './pages/Signup';
import BlogFeed from './pages/BlogFeed';
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
          <SignUp />
          <BlogFeed />
        </main>
      </div>
    </div>
  );
}

export default App;
