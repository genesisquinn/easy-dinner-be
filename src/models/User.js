const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Additional fields for user-related data
    // savedRecipes: [Schema.Types.ObjectId], // If using references
    // groceryList: { type: Schema.Types.ObjectId }, // If using references
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);



