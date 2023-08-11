const mongoose = require('mongoose');

const likedRecipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe', 
        required: true,
    },
});

const LikedRecipe = mongoose.model('LikedRecipe', likedRecipeSchema);

module.exports = LikedRecipe;
