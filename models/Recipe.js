const mongoose = require ('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String, 
    
    },
    instructions: {
        type: String, 
    
    },
    ingredients: {
        type: Array, 
    
    },
    category: {
        type: String,
        enum: ["Italian", "Asian", "Mediterranean", "American", "Caribbean", "Salads", "Other"],
        // required: true
    },
    image: {
        type: String, 
        // required: true
    },


});

module.exports = mongoose.model('Recipe', RecipeSchema);