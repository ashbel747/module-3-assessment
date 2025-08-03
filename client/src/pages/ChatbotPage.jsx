import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log('Message sent:', inputValue);
      setInputValue('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-8 h-8 mb-4">
            {/* Sparkle Icon */}
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
            </svg>
          </div>
          <h1 className="text-gray-700 text-lg font-medium">Ask our AI anything</h1>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 mb-6">
          {/* AI Message */}
          <div className="flex justify-start">
            <div className="bg-blue-400 text-white px-4 py-3 rounded-2xl rounded-bl-md max-w-xs">
              <p className="text-sm">Hey there. How can I help you today?</p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-br-md max-w-xs shadow-sm">
              <p className="text-sm">What blog topics are trending this week?</p>
            </div>
          </div>

          {/* Typing Indicator */}
          <div className="flex justify-start">
            <div className="flex items-center space-x-1 px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-3">Suggestions on what to ask Our AI</p>
          <div className="space-y-2">
            <button 
              onClick={() => handleSuggestionClick('What blog topics are trending this week?')}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm text-left transition-colors"
            >
              What blog topics are trending this week?
            </button>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleSuggestionClick('Suggest a title for my new post')}
                className="flex-1 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm transition-colors"
              >
                Suggest a title for my new post
              </button>
              <button 
                onClick={() => handleSuggestionClick('Summarize this blog post')}
                className="flex-1 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm transition-colors"
              >
                Summarize this blog post
              </button>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your projects..."
              className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 pr-12 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              {/* Send Arrow Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <button 
            onClick={handleBackClick}
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-semibold text-sm transition-colors uppercase tracking-wide"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;