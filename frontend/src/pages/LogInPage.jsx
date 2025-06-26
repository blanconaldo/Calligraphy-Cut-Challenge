import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CalligraphyLogo from '../assets/Calligraphy_Cut_Logo.png'; // Import the logo

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Handle Email/Password sign in
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const result = await login(email, password);
    if (result.success) {
      navigate('/chat');
    } else {
      setError(result.error || 'Failed to sign in');
    }
  } catch (err) {
    setError('An unexpected error occurred');
    console.error(err);

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



// Also update the Google sign-in handler:
const handleGoogleSignIn = async () => {
  setError('');
  setLoading(true);

  try {
    const result = await loginWithGoogle();
    if (result.success) {
      navigate('/chat');  // Change from '/calculator' to '/chat'
    } else {
      setError(result.error || 'Failed to sign in with Google');
    }
  } catch (err) {
    setError('An unexpected error occurred');
    console.error(err);
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
          <h1 className="text-4xl font-serif font-medium text-black">Login</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
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

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              required
            />
          </div>

          <div className="text-center">
            <Link to="/forgot-password" className="text-gray-600 hover:underline text-sm">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-white text-black font-medium rounded hover:bg-gray-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>

          {/* Google Sign-In Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full p-3 bg-white text-black border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Sign in with Google
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link to="/register" className="text-gray-600 hover:underline text-sm">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;