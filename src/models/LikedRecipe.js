const mongoose = require('mongoose');

const likedRecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', 
    required: true,
  },
});

module.exports = mongoose.model('LikedRecipe', likedRecipeSchema);
