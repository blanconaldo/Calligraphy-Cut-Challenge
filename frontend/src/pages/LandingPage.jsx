import React from 'react';
import { Link } from 'react-router-dom';
import CalligraphyLogo from '../assets/Calligraphy_Cut_Logo.png';

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: "#e8e6e3" }}>
      {/* Navbar */}
      <div className="w-full bg-white py-2 px-4 flex justify-between items-center shadow-sm">
        <Link to="/">
          <img src={CalligraphyLogo} alt="Calligraphy Cut Logo" className="h-8 w-auto" />
        </Link>

        <div className="flex gap-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition">
              Log In
            </button>
          </Link>

          <Link to="/register">
            <button className="px-6 py-2 bg-gray-100 text-black border border-white rounded-md hover:bg-gray-300 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      {/* Hero Section */}
      <div className="w-full py-20 px-8 flex flex-col items-center text-center">
        {/*<img src={CalligraphyLogo} alt="Calligraphy Cut Logo" className="h-16 w-auto mb-6"/>*/}

        <h1 className="text-6xl font-serif font-medium text-black mb-4">
          Calligraphy Cut's AI Assistant
        </h1>

        <p className="text-gray-700 mb-8 max-w-lg">
          Get ready to experience personalized hair styling with our cutting-edge AI chatbot.
          Discover answers to your styling questions and book appointments with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link to="/login">
            <button className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition">
              Log In →
            </button>
          </Link>

          <Link to="/register">
            <button className="px-8 py-3 bg-white text-black border border-white rounded-md hover:bg-gray-100 transition">
              Create Account
            </button>
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full py-12 px-4 bg-white">
        <h2 className="text-2xl font-serif font-medium text-black text-center mb-12">
          How It Works
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 flex items-center justify-center text-black mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Ask Questions</h3>
            <p className="text-gray-600">
              Enter details about your hair type, style preferences, and any questions about styling techniques.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 flex items-center justify-center text-black mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Our sophisticated AI system analyzes your needs to provide personalized styling advice and recommendations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 flex items-center justify-center text-black mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Get Results</h3>
            <p className="text-gray-600">
              Receive detailed styling recommendations, product suggestions, and book appointments with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full py-16 px-4 flex flex-col items-center text-center text-black" style={{ backgroundColor: "#e8e6e3" }}>
        <h2 className="text-3xl font-serif font-medium mb-4">
          Ready to Transform Your Hair Styling Experience?
        </h2>
        <p className="mb-8 max-w-lg">
          Join thousands of satisfied clients who have already discovered the Calligraphy Cut difference with our AI assistant.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/login" className="mb-4 sm:mb-0">
            <button className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-700 transition">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="px-8 py-3 bg-white text-black border border-white rounded-md hover:bg-gray-100 transition">
              Don't have an account? Sign up
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 bg-white text-center text-gray-500 text-sm">
        <p>© 2025 Calligraphy Cut. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;