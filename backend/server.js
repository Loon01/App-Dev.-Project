require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const uri = '${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1qy8cpi.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
console.error('Error connecting to MongoDB Atlas:', err.message);
});

/*------------------------------------------------
------Other middleware, routes, etc. set up-------
--------------------------------------------------*/

// Routes for registration and login
app.use(express.json()); // Middleware to parse JSON requests

app.post('/register', async (req, res) => {
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
