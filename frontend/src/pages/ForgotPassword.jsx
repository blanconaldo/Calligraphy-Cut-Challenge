import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import CalligraphyLogo from '../assets/Calligraphy_Cut_Logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get the auth instance
  const auth = getAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!email || !email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);

      // Show success message
      setMessage('Password reset email sent! Please check your inbox and spam folders.');

      // Optional: Redirect after a delay
      setTimeout(() => {
        navigate('/login');
      }, 5000);

    } catch (error) {
      console.error('Password reset error:', error);

      // Handle specific Firebase error codes
      switch(error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/missing-email':
          setError('Please enter your email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many requests. Please try again later.');
          break;
        default:
          setError(`Failed to send password reset email: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#e8e6e3" }}>
      {/* Logo above the box */}
      <div className="mb-6">
          <Link to="/">
              <img src={CalligraphyLogo} alt="Calligraphy Cut Logo" className="h-8 w-auto"/>
          </Link>
      </div>

      <div className="w-full max-w-md px-8 py-12 rounded-md" style={{ backgroundColor: "rgb(26, 26, 26, 0.05)" }}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-medium text-black">Reset Password</h1>
        </div>

        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-white text-black font-medium rounded hover:bg-gray-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-gray-600 hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;