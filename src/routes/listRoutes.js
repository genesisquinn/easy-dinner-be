const express = require('express');
const router = express.Router();
const GroceryList = require('../models/GroceryList');
const { checkAuthenticated } = require('../auth');
const Recipe = require('../models/Recipe');


router.post('/custom-item', checkAuthenticated, async (req, res) => {
    const { customItem } = req.body;

    try {
        const groceryList = await GroceryList.findOneAndUpdate(
            { user: req.user._id },
            { $addToSet: { customItems: customItem } },
            { upsert: true, new: true }
        );


        res.json(groceryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/item/:itemName', checkAuthenticated, async (req, res) => {
    const { itemName } = req.params;

    try {
        const groceryList = await GroceryList.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { likedRecipeIngredients: itemName, customItems: itemName } },
            { new: true }
        );

        res.json(groceryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const groceryList = await GroceryList.findOne({ user: req.user._id });
        res.json(groceryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/reset', checkAuthenticated, async (req, res) => {
    const userId = req.body.userId;

    try {
        const groceryList = await GroceryList.findOne({ user: userId });
        if (groceryList) {
            groceryList.likedRecipeIngredients = [];
            await groceryList.save();
            res.json({ success: true, message: 'Liked recipes reset successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error resetting liked recipes:', error);
        res.status(500).json({ success: false, message: 'Error resetting liked recipes.' });
    }
});


module.exports = router;




