const express = require('express');
const router = express.Router();
const GroceryList = require('../models/GroceryList');

router.post('/grocery-list/liked-recipe/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const googleId = req.user.googleId;

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const groceryList = await GroceryList.findOneAndUpdate(
            { googleId },
            { $addToSet: { likedRecipeIngredients: { $each: recipe.ingredients } } },
            { upsert: true, new: true }
        );

        res.json(groceryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/grocery-list/custom-item', async (req, res) => {
    const { customItem } = req.body;
    const googleId = req.user.googleId;

    try {
        const groceryList = await GroceryList.findOneAndUpdate(
            { googleId },
            { $addToSet: { customItems: customItem } },
            { upsert: true, new: true }
        );

        res.json(groceryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/grocery-list/item/:itemName', async (req, res) => {
    const { itemName } = req.params; 
    const googleId = req.user.googleId; 

    try {
        const groceryList = await GroceryList.findOneAndUpdate(
            { googleId },
            { $pull: { likedRecipeIngredients: itemName, customItems: itemName } },
            { new: true }
        );

        res.json(groceryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/grocery-list', async (req, res) => {
    const googleId = req.user.googleId;

    try {
        const groceryList = await GroceryList.findOne({ googleId });
        res.json(groceryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
