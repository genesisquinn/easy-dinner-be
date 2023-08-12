const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        const registeredUser = await User.register(user, hashedPassword);
        res.status(201).json(registeredUser);
        res.redirect('./recipes');
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error });
        res.redirect('./register');
    }
});


router.post('/login', passport.authenticate('local'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.json({
            message: 'Login successful',
            user: {
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});


router.post('/signout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({ error: 'An error occurred during logout' });
        }
        res.clearCookie('connect.sid'); // Clears the session cookie
        res.json({ message: 'Logged out successfully' });
    });
});



module.exports = router;

