// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to log in
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Store the token in local storage
      localStorage.setItem('token', response.data.token); // Store the JWT token

      // Extract user data from the response
      const userData = {
        email: response.data.email, // Assuming the response contains email
        userType: response.data.userType, // Ensure this field exists in your API response
      };

      // Call the onLogin function passed as a prop
      onLogin(userData); 

      // Redirect to the homepage after successful login
      setRedirect(true);
    } catch (err) {
      // Display the error message if credentials are invalid
      const errorMessage = err.response?.data?.msg || 'Invalid credentials. Please try again.';
      setError(errorMessage);
    }
  };

  // Redirect to /home if login is successful
  if (redirect) {
    navigate('/home'); // Redirect to homepage using useNavigate
    return null; // Prevent rendering of the component during redirect
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
