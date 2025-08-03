import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from './pages/Login';
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import BlogFeed from "./pages/BlogFeed";
import MyPosts from './pages/MyPosts';
import PostForm from './components/PostForm';
import Chatbot from './pages/Chatbot';
import { AuthProvider } from "./context/AuthContext";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/posts" element={<BlogFeed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {/* Dashboard (Protected) routes */}
          <Route path="/dashboard/my-posts" element={<MyPosts />} />
          <Route path="dashboard/create-post" element={<PostForm isEdit={false} />} />
          <Route path="dashboard/edit-post/:id" element={<PostForm isEdit={true} />} />
        </Routes>
      </Router>
    </AuthProvider>   
  </React.StrictMode>
);
