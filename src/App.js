
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register'; 
import Login from './components/Login';     
import SearchBar from './components/SearchBar'; 
import Home from './components/Home';        
import Navbar from './components/NavBar';     
import MovieDetails from './components/MovieDetails';
import './styles/App.css'; 

function App() {
  const [isRegistered, setIsRegistered] = useState(false); 

  
  const handleRegister = () => {
    setIsRegistered(true); 
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




 



