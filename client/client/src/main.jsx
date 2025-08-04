import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import DashboardLayout from "./components/DashboardLayout";
import Login from './pages/Login';
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import BlogFeed from "./pages/BlogFeed";
import MyPosts from './pages/MyPosts';
import SinglePostPage from './pages/SinglePostPage';
import PostForm from './components/PostForm';
import ChatbotPage from './pages/ChatbotPage'; // Add this import
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from './context/SidebarContext';
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/posts" element={<BlogFeed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts/:id" element={<SinglePostPage />} />
            <Route path="/dashboard/posts/:id" element={<SinglePostPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} /> {/* Add this route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-posts"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <MyPosts />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PostForm isEdit={false} />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-post/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PostForm isEdit={true} />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider> 
  </React.StrictMode>
);