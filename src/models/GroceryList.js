const mongoose = require('mongoose');
const groceryListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true,
    },
    likedRecipeIngredients: [String], // Array to store liked ingredients
    customItems: [String], // Array to store custom items
});


module.exports = mongoose.model('GroceryList', groceryListSchema);