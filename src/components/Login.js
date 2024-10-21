import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterLogin.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
      alert(response.data.message);
      // Optionally store the token in local storage
      localStorage.setItem('token', response.data.token);
      navigate('/search'); // redirect after successful login
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
      <Link className="login_text" to="/register">Don't have an account? <span className='span_login'>Register</span></Link>
    </div>
  );
}

export default Login;
