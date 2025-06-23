import React, {createContext, useEffect, useState} from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {auth} from '../firebase/config';

// Add default value to fix the ESLint error
const authContextDefaultValue = {
  currentUser: null,
  register: async () => ({}),
  login: async () => ({}),
  loginWithGoogle: async () => ({}),
  logout: () => {}
};

// Create context with default value
export const AuthContext = createContext(authContextDefaultValue);

// Use a separate file for the provider component to fix Fast Refresh
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with email and password - following Firebase docs
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User signed in automatically
      const user = userCredential.user;
      return { success: true, user };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { success: false, error: errorMessage, code: errorCode };
    }
  };

  // Login with email and password - following Firebase docs
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
      const user = userCredential.user;
      return { success: true, user };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { success: false, error: errorMessage, code: errorCode };
    }
  };

  // Login with Google - following Firebase docs
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info
      const user = result.user;

      // This gives you a Google Access Token, if you need it
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      return { success: true, user };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used
      const email = error.customData?.email || '';
      // The AuthCredential type that was used
      // const credential = GoogleAuthProvider.credentialFromError(error);

      return {
        success: false,
        error: errorMessage,
        code: errorCode,
        email
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Listen for auth state changes - following Firebase docs
  useEffect(() => {
    // Clean up subscription
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    register,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}