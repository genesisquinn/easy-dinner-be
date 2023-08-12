const mongoose = require('mongoose');

const groceryListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
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

module.exports = mongoose.model('GroceryList', groceryListSchema); 
