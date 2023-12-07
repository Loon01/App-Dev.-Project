const mongoose = require("mongoose");

const LikedRecipes = new mongoose.Schema({
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

const Liked = mongoose.model("LikedRecipe", LikedRecipes);
module.exports = Liked;