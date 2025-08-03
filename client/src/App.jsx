import { useState } from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/sidebar"

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)
  const toggleDarkMode = () => setDarkMode(!isDarkMode)

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar
        onHamburgerClick={toggleSidebar}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  )
}

export default App