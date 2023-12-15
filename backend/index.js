import express from "express";
import { PORT, uri } from "./config.js";
import mongoose from "mongoose";
import { Recipe } from "./models/recipeModel.js";
import recipesRoute from "./routes/recipesRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for CORS POLICY
app.use(cors());

app.use("/recipes", recipesRoute);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("YURR");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
