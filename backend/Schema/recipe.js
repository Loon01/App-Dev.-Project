const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeID: {                 // title of recipe
    type: String,
    unique: true,
    required: true,
  },
  ingredients: [String],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;