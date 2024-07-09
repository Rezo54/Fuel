// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import Modal from './Modal';
import logo from '../assets/Taskraft.png';
import '../App.css'; // Import App.css for the styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [resetModalIsOpen, setResetModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      setModalContent(error.message);
      setModalIsOpen(true);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetModalIsOpen(false);
      setModalContent('Password reset email sent.');
      setModalIsOpen(true);
    } catch (error) {
      setModalContent(error.message);
      setModalIsOpen(true);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src={logo} alt="Logo" />
        <h3>Login: Fuel Capture Form</h3>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="forgot-password-container">
          <button
            className="forgot-password"
            onClick={() => setResetModalIsOpen(true)}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      <div className="register-container">
        <span className="register-text">Don't have an account?</span>
        <button className="register-button">
          <a href="/register">Register</a>
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        content={modalContent}
      />
      <Modal
        isOpen={resetModalIsOpen}
        onRequestClose={() => setResetModalIsOpen(false)}
        content={
          <div>
            <h4>Reset Password</h4>
            <form onSubmit={handlePasswordReset}>
              <label htmlFor="resetEmail">Email</label>
              <input
                type="email"
                id="resetEmail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit">Send Reset Email</button>
            </form>
          </div>
        }
      />
    </div>
  );
};

export default Login;
