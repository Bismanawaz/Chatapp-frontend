import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://7315-116-71-136-51.ngrok-free.app/auth/login', {
        username,
        password
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate.push('/chat');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
};

export default Login;
