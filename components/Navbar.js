// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav>
    <ul id="navbar">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/recipes">Recipes</Link></li>
      <li><Link to="/ingredients">Ingredients</Link></li>
    </ul>
  </nav>
);

export default Navbar;
