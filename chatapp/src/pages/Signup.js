import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css'; // Adjusted import path

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signup', {
        username,
        password
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/chat'); // Corrected navigation
      }
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
