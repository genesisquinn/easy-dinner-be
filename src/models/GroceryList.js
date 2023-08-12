const mongoose = require('mongoose');

const groceryListSchema = new mongoose.Schema({
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

module.exports = mongoose.model('List', groceryListSchema);