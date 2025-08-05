import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'Hi! I can generate a blog post for you. Just give me a topic!',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const sendMessage = async (messageText) => {
    try {
      const response = await fetch('https://social-blogging-api.onrender.com/api/generate-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: messageText }),
      });

      const data = await response.json();

      if (response.ok && data.blog_post) {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          text: data.blog_post,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to generate blog');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        text: inputValue,
      };
      setMessages((prev) => [...prev, userMessage]);

      const messageToSend = inputValue;
      setInputValue('');
      setIsTyping(true);

      await sendMessage(messageToSend);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-8 h-8 mb-4">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            </svg>
          </div>
          <h1 className="text-gray-700 text-lg font-medium">Ask AI to write a blog post!</h1>
        </div>

        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`px-4 py-3 rounded-2xl max-w-xs ${
                  message.type === 'user'
                    ? 'bg-white text-gray-800 rounded-br-md shadow-sm'
                    : 'bg-blue-400 text-white rounded-bl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-1 px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a blog topic..."
              className="w-full bg-white border dark:text-black text-black border-gray-200 rounded-full px-4 py-3 pr-12 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>

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
