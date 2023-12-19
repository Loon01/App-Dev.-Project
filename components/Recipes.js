// Recipes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    recipeName: '',
    prepTime: 0,
    cookTime: 0,
    servingSize: 0,
    caloriesPerServing: 0,
    rating: 0,
    comments: '',
    image: null,
  });

  useEffect(() => {
    axios.get('http://localhost:3001/getRecipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    if (e.target.type === 'file') {
      setNewRecipe({
        ...newRecipe,
        image: e.target.files[0],
      });
    } else {
      setNewRecipe({
        ...newRecipe,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addRecipe = () => {
    const formData = new FormData();
    for (const key in newRecipe) {
      formData.append(key, newRecipe[key]);
    }

    axios.post('http://localhost:3001/createRecipe', formData)
      .then(response => {
        setRecipes([...recipes, response.data]);
        setNewRecipe({
          recipeName: '',
          prepTime: 0,
          cookTime: 0,
          servingSize: 0,
          caloriesPerServing: 0,
          rating: 0,
          comments: '',
          image: null,
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <div id="recipes-container">
      <div id="recipes-list-container">
        <h2>All Recipes</h2>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              <strong>{recipe.recipeName}</strong>
              <p></p>
              <p>Prep Time: {recipe.prepTime} minutes</p>
              <p>Cook Time: {recipe.cookTime} minutes</p>
              <p>Serving Size: {recipe.servingSize} </p>
              <p>comments: {recipe.comments} </p>
              {recipe.image && (
              <img src={`data:${recipe.image.contentType};base64,${recipe.image.data.toString('base64')}`} alt="Recipe" />
            )}
          </li>
          ))}
        </ul>
      </div>

      <div id="recipe-form-container">
        <h2>Add New Recipe</h2>
        <form id="recipe-form" encType="multipart/form-data">
          <div>
            <label>Recipe Name:</label>
            <input type="text" name="recipeName" value={newRecipe.recipeName} onChange={handleInputChange} />
          </div>
          <div>
            <label>Prep Time (minutes):</label>
            <input type="number" name="prepTime" value={newRecipe.prepTime} onChange={handleInputChange} />
          </div>
          <div>
            <label>Cook Time (minutes):</label>
            <input type="number" name="cookTime" value={newRecipe.cookTime} onChange={handleInputChange} />
          </div>
          <div>
            <label>Serving Size:</label>
            <input type="number" name="servingSize" value={newRecipe.servingSize} onChange={handleInputChange} />
          </div>
          <div>
            <label>Calories Per Serving:</label>
            <input type="number" name="caloriesPerServing" value={newRecipe.caloriesPerServing} onChange={handleInputChange} />
          </div>
          <div>
            <label>Rating:</label>
            <input type="number" name="rating" value={newRecipe.rating} onChange={handleInputChange} />
          </div>
          <div>
            <label>Comments:</label>
            <textarea name="comments" value={newRecipe.comments} onChange={handleInputChange} />
          </div>
          <div>
            <label>Image:</label>
            <input type="file" name="image" onChange={handleInputChange} />
          </div>
          <button type="button" onClick={addRecipe}>
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recipes;
