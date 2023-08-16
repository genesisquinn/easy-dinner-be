const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');

const getUserData = async (access_token) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    return response.json();

    const data = await response.json();
    console.log('data', data);
};

router.get('/', async (req, res, next) => {

    const code = req.query.code;
    try {
        const redirectUrl = 'https://dinnermadeeasy.netlify.app/recipes';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('Tokens acquired')
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        await getUserData(user.access_token);

    } catch (err) {
        console.log('Error signing in with Google')
    }
    // res.redirect(303, 'https://dinnermadeeasy.netlify.app/recipes');
});

module.exports = router;