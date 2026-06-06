const express = require('express');
const axios = require('axios');
const app = express();

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';

// 1. Serve your HTML file
app.use(express.static(__dirname));

// 2. The URL GitHub redirects back to
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    // Exchange the temporary code for a permanent access token
    const tokenResponse = await axios.post('https://github.com', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code
    }, { headers: { accept: 'application/json' } });

    const accessToken = tokenResponse.data.access_token;

    // Use the token to fetch the user's GitHub profile data
    const userResponse = await axios.get('https://github.com', {
        headers: { Authorization: `token ${accessToken}` }
    });

    const username = userResponse.data.login;
    res.send(`Welcome to your Gift Cards, ${username}!`);
});

app.listen(3000, () => console.log('App running on http://localhost:3000'));
