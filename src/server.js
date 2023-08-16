if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const recipeRoutes = require('./routes/recipeRoutes');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const { configurePassport } = require('./auth');
const authRouter = require('./routes/oauth');


dotenv.config()

const corsOptions = {
    origin: 'https://dinnermadeeasy.netlify.app',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());


configurePassport(passport);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/recipes', recipeRoutes);
app.use('/groceries', listRoutes);
app.use('/user', userRoutes);
app.use('/oauth', authRouter);
app.use('/request', requestRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})