const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },
    prepTime: {
        type: Number,
        required: true,
    },
    cookTime: {
        type: Number,
        required: true,
    },
    servingSize: {
        type: Number,
        required: false,
    },
    caloriesPerServing: {
        type: Number,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    comments: {
        type: String,
        required: false,
    },
    image: {
        data: {
            type: Buffer,
            required: false,
        },
        contentType: {
            type: String,
            required: false,
        },
    },
});

const recipeModel = mongoose.model("recipe", recipeSchema);
module.exports = recipeModel;
