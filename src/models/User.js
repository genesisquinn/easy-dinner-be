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
    groceryList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
    },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);




