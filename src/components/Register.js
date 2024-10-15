import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/RegisterLogin.css';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleRegister = (e) => {
    e.preventDefault();

    
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    
    const emailExists = existingUsers.some(user => user.email === email);
    if (emailExists) {
      alert('Email is already registered.');
      return;
    }

    
    existingUsers.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful!');
    onRegister();

    navigate('/search'); 
  };

  return (
    <div className="register">
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default Register;




