const express = require('express');
const router = express.Router();

// Define routes for /browse_recipes
router.get('/frontend/public/views/browse_recipes.ejs', (req, res) => {
    res.render('browse_recipes'); // Renders browse_recipes.ejs
});

module.exports = router;