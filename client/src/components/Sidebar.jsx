"use client"

import { useState, useEffect } from "react"
import { FaHome, FaPencilAlt, FaFileAlt, FaPlus, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa"

export default function Sidebar({ isOpen, onClose, isDarkMode, onToggleDarkMode }) {
  const [activeItem, setActiveItem] = useState("All posts")

  const handleMenuClick = (item) => {
    setActiveItem(item.name)
    console.log(`Clicked on ${item.name}`)

    // Close sidebar on mobile after clicking
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  const handleDarkModeToggle = () => {
    onToggleDarkMode()
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    alert("Logout functionality would be implemented here")
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] text-white transition-transform duration-300 ease-in-out z-50 w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#1E3A8A" }}
      >
        {/* Menu Items */}
        <nav className="py-6">
          <ul className="space-y-1 px-4">
            {/* Dashboard */}
            <li>
              <button
                onClick={() => handleMenuClick({ name: "Dashboard", id: 1 })}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left ${
                  activeItem === "Dashboard" ? "text-white" : "text-blue-100 hover:text-white"
                }`}
                style={{
                  backgroundColor: activeItem === "Dashboard" ? "#1E40AF" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeItem !== "Dashboard") {
                    e.target.style.backgroundColor = "#1E40AF"
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== "Dashboard") {
                    e.target.style.backgroundColor = "transparent"
                  }
                }}
              >
                <FaHome className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">Dashboard</span>
              </button>
            </li>

            {/* All posts */}
            <li>
              <button
                onClick={() => handleMenuClick({ name: "All posts", id: 2 })}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left ${
                  activeItem === "All posts" ? "text-white" : "text-blue-100 hover:text-white"
                }`}
                style={{
                  backgroundColor: activeItem === "All posts" ? "#1E40AF" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeItem !== "All posts") {
                    e.target.style.backgroundColor = "#1E40AF"
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== "All posts") {
                    e.target.style.backgroundColor = "transparent"
                  }
                }}
              >
                <FaPencilAlt className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">All posts</span>
              </button>
            </li>

            {/* My posts */}
            <li>
              <button
                onClick={() => handleMenuClick({ name: "My posts", id: 3 })}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left ${
                  activeItem === "My posts" ? "text-white" : "text-blue-100 hover:text-white"
                }`}
                style={{
                  backgroundColor: activeItem === "My posts" ? "#1E40AF" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeItem !== "My posts") {
                    e.target.style.backgroundColor = "#1E40AF"
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== "My posts") {
                    e.target.style.backgroundColor = "transparent"
                  }
                }}
              >
                <FaFileAlt className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">My posts</span>
              </button>
            </li>

            {/* Create post */}
            <li>
              <button
                onClick={() => handleMenuClick({ name: "Create post", id: 4 })}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left ${
                  activeItem === "Create post" ? "text-white" : "text-blue-100 hover:text-white"
                }`}
                style={{
                  backgroundColor: activeItem === "Create post" ? "#1E40AF" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeItem !== "Create post") {
                    e.target.style.backgroundColor = "#1E40AF"
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== "Create post") {
                    e.target.style.backgroundColor = "transparent"
                  }
                }}
              >
                <FaPlus className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">Create post</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-100 flex items-center space-x-2">
              <FaMoon className="w-4 h-4" />
              <span>Dark mode</span>
            </span>
            <button
              onClick={handleDarkModeToggle}
              className={`flex items-center rounded-full p-1 w-12 h-6 relative transition-all duration-300`}
              style={{ backgroundColor: isDarkMode ? "#1E40AF" : "#3B82F6" }}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
                  isDarkMode ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {isDarkMode ? (
                  <FaMoon className="w-3 h-3" style={{ color: "#1E3A8A" }} />
                ) : (
                  <FaSun className="w-3 h-3 text-yellow-600" />
                )}
              </div>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left hover:opacity-90"
            style={{ backgroundColor: "#1E40AF" }}
          >
            <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}
