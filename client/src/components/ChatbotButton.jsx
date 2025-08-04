import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatbotButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show the button on the chatbot page itself
  if (location.pathname === '/chatbot') {
    return null;
  }

  const handleChatbotClick = () => {
    navigate('/chatbot');
  };

  return (
    <button
      onClick={handleChatbotClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
      aria-label="Open AI Chatbot"
    >
      {/* Chat Icon */}
      <svg
        className="w-7 h-7 group-hover:scale-110 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      
      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
    </button>
  );
};

export default ChatbotButton;