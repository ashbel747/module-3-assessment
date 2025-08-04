import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero-section';
import SignUp from './pages/Signup';
import BlogFeed from './pages/BlogFeed';
import Accessibility from './components/Accesibility-section';
import ChatbotButton from './components/ChatbotButton';
import Footer from './components/Footer';
import { useSidebar } from './context/SidebarContext';
import { Outlet } from 'react-router-dom';

function App() {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className='overflow-hidden'>
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar />
        <main className='pt-16'>
          <Outlet />
          <Hero />
          <SignUp />
          <BlogFeed />
          <Accessibility />
          <Footer />
        </main>
      </div>
      <ChatbotButton />
    </div>
  );
}

export default App;