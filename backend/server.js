require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const templates = require('./routes/tempRoute');

// Set your view engine (like EJS)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/frontend/public/views'); // Assuming your EJS files are in a 'views' folder

const uri = 'mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1qy8cpi.mongodb.net/?retryWrites=true&w=majority';
// Connect to MongoDB Atlas
mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log('Connected to MongoDB Atlas');
app.listen(PORT, () => {
    'App is listening.'
})
})
.catch((err) => {
console.error('Error connecting to MongoDB Atlas:', err.message);
});

/*------------------------------------------------
------Other middleware, routes, etc. set up-------
--------------------------------------------------*/

// Routes for registration and login
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());

app.use('/recipes', templates);

const Home = require("./controllers/controller");
const LoginRoute = require("./routes/loginRoute");
const RegisterRoute = require("./routes/registerRoute");
const verifyToken = require("./auth/middleware");
const RecipeRoute = require("./routes/recipeRoute");
const ForgotPassword = require("./routes/forgotPassRoute");
app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/auth", RecipeRoute);
app.use("/auth", router);
app.use("/auth", ForgotPassword);

router.get("/", verifyToken, Home.Home);

app.get('/navbar', (req, res) => {
    // Pass authentication status and active link to navbar.ejs
    res.render('navbar', { authenticated: req.user, active: 'home' }); // Replace 'home' with the active link name
});

/* app.post('/register', async (req, res) => {
try {
const newUser = await User.create(req.body);
res.status(201).json({ message: 'User registered successfully', user: newUser });
} catch (err) {
res.status(500).json({ message: 'Failed to register user' });
}
});

app.post('/login', async (req, res) => {
try {
// Implement login logic, validate credentials, and generate JWT or session
// For simplicity, just responding with a success message here
res.status(200).json({ message: 'Login successful' });
} catch (err) {
res.status(500).json({ message: 'Login failed' });
}
}); */


/* const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
}); */
