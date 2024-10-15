// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  return (
<nav className="navbar navbar-expand-lg" > 
    <div className="container-fluid">
    <img src="/logo.png" alt="Logo" style={{ width: '15%', height: 'auto', maxHeight: '60px' }} />
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
            </li>
            <button 
          type="button" 
  
        >
    
        </button>
            </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <Link to="/search" style={{ textDecoration: 'none' }}> 
              <button 
                className="btn" 
                type="submit" 
              >
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
