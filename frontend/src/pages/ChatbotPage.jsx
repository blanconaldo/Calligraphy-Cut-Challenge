import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
// Import just what you need - this is safer than the full package
import CalligraphyLogo from '../assets/Calligraphy_Cut_Logo.png';

// You'll need to install this for safe HTML rendering
// pnpm add react-markdown rehype-sanitize

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Dynamically import ReactMarkdown to prevent initial load issues
  const [ReactMarkdown, setReactMarkdown] = useState(null);

  // Load ReactMarkdown dynamically when needed
  useEffect(() => {
    if (messages.some(msg => msg.role === 'assistant') && !ReactMarkdown) {
      import('react-markdown').then((module) => {
        setReactMarkdown(() => module.default);
      }).catch(error => {
        console.error("Failed to load ReactMarkdown:", error);
      });
    }
  }, [messages, ReactMarkdown]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send to backend API
      const response = await fetch('http://localhost:8001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          user_id: currentUser?.uid || null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get response');
      }

      const data = await response.json();

      // Add assistant response to chat
      setMessages(prev => [...prev, data.message]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Safely render message content with fallback for markdown
  const renderMessageContent = (message) => {
    if (message.role === 'assistant' && ReactMarkdown) {
      try {
        return (
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        );
      } catch (error) {
        console.error("Failed to render markdown:", error);
        return <span>{message.content}</span>;
      }
    }
    return <span>{message.content}</span>;
  };

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: "#e8e6e3" }}>
      {/* Header */}
      <div className="w-full bg-white py-2 px-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <img src={CalligraphyLogo} alt="Calligraphy Cut Logo" className="h-8 w-auto"/>
        </div>
        <div className="flex items-center gap-4">
          {/* Display user email */}
          <span className="text-black text-sm">
            {currentUser?.email}
          </span>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-100 text-black border border-white rounded-md hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-serif font-medium mb-2">Welcome to the Calligraphy Cut AI Assistant</h2>
              <p className="text-gray-600">Start a conversation by sending a message below.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg max-w-[80%] ${
                    msg.role === 'user'
                      ? 'ml-auto bg-white text-black'
                      : 'mr-auto bg-gray-100 text-black'
                  }`}
                >
                  {renderMessageContent(msg)}
                </div>
              ))}
              {loading && (
                <div className="mr-auto p-4 rounded-lg bg-gray-100 text-black max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;