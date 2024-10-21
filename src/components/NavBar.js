// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass, faFilm } from '@fortawesome/free-solid-svg-icons'; // Import the filter icon
import '../styles/App.css';

function NavBar({ toggleFilter }) { // Accept toggleFilter as a prop
  return (
    <nav className="navbar navbar-expand-lg"> 
      <div className="container-fluid">
        <FontAwesomeIcon icon={faFilm} size="2x" style={{ color: '#fd0404' }} /> 
        <span style={{ marginLeft: '10px', fontSize: '20px' }}>MovieMinds</span> 
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </ul>
          
          <form className="d-flex" style={{ marginLeft: '20px' }}>
            <Link to="/register" style={{ textDecoration: 'none' }}> 
              <button className="btn" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} /> 
              </button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
