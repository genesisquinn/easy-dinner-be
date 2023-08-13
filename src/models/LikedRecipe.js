const mongoose = require('mongoose');

const likedRecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // Reference the Recipe model
    required: true,
  },
});

module.exports = mongoose.model('LikedRecipe', likedRecipeSchema);
