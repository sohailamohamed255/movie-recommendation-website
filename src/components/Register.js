import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterLogin.css';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      console.log(username,email,password);
      const response = await axios.post('http://localhost:5000/api/user/register', { name: username, email, password },  { headers: { 'Content-Type': 'application/json' } });
      alert(response.data.message);
      onRegister();
      navigate('/login'); 
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <Link className="login_text" to="/login">Already have an account? <span className='span_login'>Login</span></Link>
      </div>
    </div>
  );
}

export default Register;
