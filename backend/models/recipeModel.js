import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: [String],
    instructions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
