// models/Ingredients.js
const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ingredientName: {
    type: String,
    required: true,
  },
  ingredientCategory: {
    type: String,
    required: true,
  },
  // Remove quantity and unit properties
});

const IngredientModel = mongoose.model("ingredient", ingredientSchema);
module.exports = IngredientModel;
