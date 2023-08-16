const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');

router.post('/', async (req, res, next) => {
    console.log("Request for Auth")
    res.header('Acess-Control-Allow-Origin', 'https://dinnermadeeasy.netlify.app/');
    // res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectUrl = 'https://dinnermadeeasy.netlify.app/recipes';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    );
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        // access_type:'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'

    });
    res.json({ url: authorizeUrl })
});


module.exports = router;