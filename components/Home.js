// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    // Fetch two random recipes when the component mounts
    axios.get('http://localhost:3001/getRandomRecipes', { params: { count: 2 } })
      .then(response => setFeaturedRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div id="container">
      {featuredRecipes.map((featuredRecipe, index) => (
        <div key={index} className="features">
          <h2>{featuredRecipe.recipeName}</h2>
          {featuredRecipe.image && (
            <img src={`data:${featuredRecipe.image.contentType};base64,${featuredRecipe.image.data.toString('base64')}`} alt="Food" />
          )}
          {/* Replace "example text" with the actual content you want to display */}
          <p>{/* Add the content you want to display here */}</p>
          {/* Add the link or button to view more details */}
          {/* <a href={`./indiv_recipe.html?recipeId=${featuredRecipe._id}`}>Learn How!</a> */}
        </div>
      ))}
    </div>
  );
};

export default Home;
