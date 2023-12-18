// Recipes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    image: null,  // New state for handling image
  });

  useEffect(() => {
    axios.get('http://localhost:3001/getRecipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    // If the input is a file, update the image state
    if (e.target.type === 'file') {
      setNewRecipe({
        ...newRecipe,
        image: e.target.files[0],
      });
    } else {
      // Otherwise, handle other input changes
      setNewRecipe({
        ...newRecipe,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addRecipe = () => {
    const formData = new FormData();
    // Append recipe data to the form data
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
    <div>
      <h2>All Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <strong>{recipe.recipeName}</strong>
            <p>Prep Time: {recipe.prepTime} minutes</p>
            <p>Cook Time: {recipe.cookTime} minutes</p>
            {recipe.image && (
              <img src={`data:${recipe.image.contentType};base64,${recipe.image.data.toString('base64')}`} alt="Recipe" />
            )}
          </li>
        ))}
      </ul>

      <h2>Add New Recipe</h2>
      <form encType="multipart/form-data">
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
        <button type="button" onClick={addRecipe}>Add Recipe</button>
      </form>
    </div>
  );
};

export default Recipes;
