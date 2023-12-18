// Frontend/src/components/Ingredients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ingredients = () => {
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientCategory, setIngredientCategory] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('/ingredients');
        setIngredientsList(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error.message);
      }
    };

    fetchIngredients();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend to add the ingredient
      const response = await axios.post('/ingredients', {
        ingredientName,
        ingredientCategory,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('Ingredient added successfully:', data);

        // Update the list of ingredients
        setIngredientsList((prevList) => [...prevList, data]);

        // Optionally, you can update the UI or take other actions
      } else {
        console.error('Failed to add ingredient:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding ingredient:', error.message);
    }
  };

  return (
    <div>
      <h2>Ingredients List</h2>
      <ul>
        {ingredientsList.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.ingredientName} - {ingredient.ingredientCategory}
            {/* Add other properties as needed */}
          </li>
        ))}
      </ul>

      <h1>Add Ingredient</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="ingredientName">Ingredient Name:</label>
        <input
          type="text"
          id="ingredientName"
          name="ingredientName"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          required
        />
        
        <label htmlFor="ingredientCategory">Ingredient Category:</label>
        <input
          type="text"
          id="ingredientCategory"
          name="ingredientCategory"
          value={ingredientCategory}
          onChange={(e) => setIngredientCategory(e.target.value)}
          required
        />

        {/* Add other input fields as needed */}

        <button type="submit">Add Ingredient</button>
      </form>
    </div>
  );
};

export default Ingredients;
