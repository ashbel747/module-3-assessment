"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hey there. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  // Fetch initial suggestions
  useEffect(() => {
    fetchSuggestions()
  }, [])

  const fetchSuggestions = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/chatbot/suggestions")
      const data = await response.json()
      if (data.success) {
        setSuggestions(data.suggestions.slice(0, 3)) // Show only first 3 suggestions
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      // Fallback suggestions
      setSuggestions([
        "What blog topics are trending this week?",
        "Suggest a title for my new post.",
        "Summarize this blog post",
      ])
    }
  }

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: "user",
        content: inputValue,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInputValue("")
      setIsTyping(true)

      try {
        const response = await fetch("http://localhost:3500/api/chatbot/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputValue }),
        })

        const data = await response.json()

        if (data.success) {
          const aiResponse = {
            id: messages.length + 2,
            type: "ai",
            content: data.response,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, aiResponse])

          // Update suggestions if new ones are provided
          if (data.suggestions && data.suggestions.length > 0) {
            setSuggestions(data.suggestions.slice(0, 3))
          }
        } else {
          throw new Error(data.error || "Failed to get response")
        }
      } catch (error) {
        console.error("Error sending message:", error)
        const errorResponse = {
          id: messages.length + 2,
          type: "ai",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorResponse])
      } finally {
        setIsTyping(false)
      }
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>
        <h1 className="text-lg font-medium text-gray-700">Ask our AI anything</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-3 rounded-3xl max-w-xs ${
                  message.type === "ai"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 shadow-sm border border-gray-100"
                }`}
              >
                <div className="text-sm leading-relaxed">{message.content}</div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-blue-500 px-4 py-3 rounded-3xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="px-6 pb-4">
        <div className="max-w-lg mx-auto">
          <p className="text-sm text-gray-600 mb-3">Suggestions on what to ask Our AI</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="px-6 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your projects"
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded transition-colors duration-200"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
