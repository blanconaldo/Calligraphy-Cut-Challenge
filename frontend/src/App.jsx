import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SignupPage from './pages/SignupPage';
import ChatbotPage from './pages/ChatbotPage';
import ForgotPassword from './pages/ForgotPassword.jsx';
import './App.css';

function App() {
  // Define API URL - using environment variable or fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

  // Effect to ping the backend when the app loads
  useEffect(() => {
    // Send a ping to wake up the backend container
    console.log('Warming up backend service...');
    fetch(`${API_URL}/`)
      .then(() => {
        console.log('Backend service is awake and ready');
      })
      .catch(() => {
        console.log('Backend warming attempt complete');
      });
  }, [API_URL]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/chat" element={<ChatbotPage />} />
    </Routes>
  );
}

export default App;
