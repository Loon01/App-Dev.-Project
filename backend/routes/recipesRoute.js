import express from "express";
import { Recipe } from "../models/recipeModel.js";

const router = express.Router();

// Route to save new
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.ingredients ||
      !request.body.instructions
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, ingredients, instructions",
      });
    }
    const newRecipe = {
      title: request.body.title,
      ingredients: request.body.ingredients,
      instructions: request.body.instructions,
    };

    const recipe = await Recipe.create(newRecipe);

    return response.status(201).send(recipe);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get all from database
router.get("/", async (request, response) => {
  try {
    const recipes = await Recipe.find({});

    return response.status(200).json({
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one from database
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const Recipe = await Recipe.findById(id);

    return response.status(200).json(Recipe);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.ingredients ||
      !request.body.instructions
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, ingredients, instructions",
      });
    }

    const { id } = request.params;

    const result = await Recipe.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Recipe not found" });
    }

    return response
      .status(200)
      .send({ message: "Recipe updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for deletion
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Recipe.findByIdAndUpdate(id);

    if (!result) {
      return response.status(404).json({ message: "Recipe not found" });
    }

    return response
      .status(200)
      .send({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
