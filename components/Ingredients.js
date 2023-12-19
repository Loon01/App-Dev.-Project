// Frontend/src/components/Ingredients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ingredients.css'; // Import the adjusted Ingredients.css file

const Ingredients = () => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    ingredientName: '',
    ingredientCategory: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3001/getIngredients')
      .then(response => setIngredientsList(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    // If the input is a file, update the image state
    if (e.target.type === 'file') {
      setNewIngredient({
        ...newIngredient,
      });
    } else {
      // Otherwise, handle other input changes
      setNewIngredient({
        ...newIngredient,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addIngredient = () => {
    const formData = new FormData();
    // Append ingredient data to the form data
    for (const key in newIngredient) {
      formData.append(key, newIngredient[key]);
    }

    axios.post('http://localhost:3001/createIngredient', formData)
      .then(response => {
        setIngredientsList([...ingredientsList, response.data]);
        setNewIngredient({
          ingredientName: '',
          ingredientCategory: '',
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <div id="ingredients-container">
      {/* Left column containing the ingredients list */}
      <div id="ingredients-list-container">
        <h2>Ingredients List</h2>
        <ul>
          {ingredientsList.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.ingredientName} - {ingredient.ingredientCategory}
              {/* Add other properties as needed */}
            </li>
          ))}
        </ul>
      </div>

      {/* Right column containing the form */}
      <div id="ingredient-form-container">
        <h1>Add New Ingredient</h1>
        <form encType="multipart/form-data" id="ingredient-form">
          <div>
            <label>Ingredient Name:</label>
            <input type="text" name="ingredientName" value={newIngredient.ingredientName} onChange={handleInputChange} />
          </div>
          <div>
            <label>Ingredient Category:</label>
            <input type="text" name="ingredientCategory" value={newIngredient.ingredientCategory} onChange={handleInputChange} />
          </div>

          {/* Add other input fields as needed */}

          <button type="button" onClick={addIngredient}>Add Ingredient</button>
        </form>
      </div>
    </div>
  );
};

export default Ingredients;
