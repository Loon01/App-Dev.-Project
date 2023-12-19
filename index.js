const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const RecipeModel = require('./models/Recipes');
const IngredientModel = require("./models/Ingredients");
const cors = require('cors');
const multer = require('multer');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://test:test123@cluster0.1qy8cpi.mongodb.net/cmps3390?retryWrites=true&w=majority");

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// New endpoint for fetching multiple random recipes
app.get("/getRandomRecipes", async (req, res) => {
    try {
      // Get the count of all recipes in the database
      const count = await RecipeModel.countDocuments();
  
      // Specify the number of random recipes you want (default to 2 if not provided in the request query)
      const numberOfRecipes = req.query.count ? parseInt(req.query.count) : 2;
  
      // Use the aggregate pipeline with $sample to get random recipes
      const randomRecipes = await RecipeModel.aggregate([
        { $sample: { size: numberOfRecipes } }
      ]);
  
      res.json(randomRecipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

app.get("/getUsers", (req, res) => {
    UserModel.find({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = UserModel(user);
    await newUser.save();
    res.json(newUser);
});

// New endpoint for updating a user by ID
app.put("/updateUser/:id", async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/getRecipes", (req, res) => {
    RecipeModel.find({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ error: "Internal server error" });
        });
});

// Updated endpoint for creating a recipe with file upload handling
app.post("/createRecipe", upload.single('image'), async (req, res) => {
    const recipeData = req.body;
    if (req.file) {
        recipeData.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }
    try {
        const newRecipe = await RecipeModel.create(recipeData);
        res.json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: "/createRecipe  error" });
    }
});

// New endpoint for updating a recipe by ID
app.put("/updateRecipe/:id", async (req, res) => {
    const recipeId = req.params.id;
    const updatedRecipeData = req.body;

    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId, updatedRecipeData, { new: true });
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



// Route to get all ingredients
app.get("/ingredients", async (req, res) => {
    try {
      // Fetch all ingredients from the database
      const allIngredients = await IngredientModel.find();
  
      // Send the list of ingredients as a response
      res.json(allIngredients);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/getIngredients", (req, res) => {
    IngredientModel.find({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ error: "Internal server error" });
        });
});

//---------------
// Updated endpoint for creating a Ingredient with file upload handling
app.post("/createIngredient", upload.single('image'), async (req, res) => {
    const IngredientData = req.body;
    if (req.file) {
        IngredientData.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }
    try {
        const newIngredient = await IngredientModel.create(IngredientData);
        res.json(newIngredient);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
//-------------

// Add this route to serve recipe images
app.get("/getRecipeImage/:id", async (req, res) => {
    try {
      const recipeId = req.params.id;
      const recipe = await RecipeModel.findById(recipeId);
  
      if (recipe && recipe.image) {
        res.contentType(recipe.image.contentType);
        res.send(recipe.image.data.buffer);
      } else {
        res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

app.listen(3001, () => {
    console.log("-----------server is running----------");
});
