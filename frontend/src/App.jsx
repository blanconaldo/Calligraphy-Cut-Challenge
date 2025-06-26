import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SignupPage from './pages/SignupPage';
import ChatbotPage from './pages/ChatbotPage';
import ForgotPassword from './pages/ForgotPassword.jsx';
import './App.css';

function App() {
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
