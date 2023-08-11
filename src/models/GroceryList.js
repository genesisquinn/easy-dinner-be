const mongoose = require('mongoose');

const groceryListSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    recipes: [
        {
            recipeId: String,
            ingredients: [
                {
                    name: String,
                    crossedOut: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
        },
    ],
    customItems: [String],
});

module.exports = GroceryList;