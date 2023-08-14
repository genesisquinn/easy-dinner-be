const mongoose = require ('mongoose');

const RecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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

    },

    source: {
        type: String,
    },
    
    image: {
        type: String, 

    },

    liked: {
        type: Boolean,
        default: false


    }


});

module.exports = mongoose.model('Recipe', RecipeSchema);