import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/RegisterLogin.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = existingUsers.find(user => user.email === email);
    
    if (user) {
     
      if (password === user.password) {
        alert('Login successful!');
        navigate('/search'); 
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
    </div>
  );
}

export default Login;
