// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Modal from './Modal';
import logo from '../assets/Taskraft.png';
import '../App.css'; // Import App.css for the styles

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setModalContent('Passwords do not match');
      setModalIsOpen(true);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        name,
        email,
        approved: false, // User is not approved by default
      });
      alert('Registration successful. Please wait for admin approval.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
    } catch (error) {
      setError(error.message);
      setModalContent(error.message);
      setModalIsOpen(true);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src={logo} alt="Logo" />
        <h3>Register</h3>
        {error && <p>{error}</p>}
        <form onSubmit={handleRegister}>
          <label htmlFor="name">Name and Surname</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="register-container">
        <span className="register-text">Already have an account?</span>
        <button className="register-button">
          <a href="/login">Login</a>
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        content={modalContent}
      />
    </div>
  );
};

export default Register;
