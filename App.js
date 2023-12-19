// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home.js';
import Recipes from './components/Recipes.js';
import Ingredients from './components/Ingredients.js';
import Navbar from './components/Navbar.js';
import './components/global.css';

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  // Add more users as needed
];

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home users={users} />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/ingredients" element={<Ingredients />} />
    </Routes>
  </BrowserRouter>
);

export default App;
