
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userQueries = require('../queries/user');
const tokenManager = require('../tokenManager');
const hashManager = require('../hashManager');

router.post('/signin', hashManager.hashPassword, async (req, res) => 
{
    const username = req.body._username;
    const password = req.body._password;

    console.log('POST /signin');

    if (username == null || password == null)
        return res.sendStatus(400);

    const user = await userQueries.getUserByName(username);
    
    if (user != undefined) // username already taken
        return res.status(403).send({ message : 'Username already taken'});

    const newUser = await userQueries.createUser(username, password)
    sendLoggedData(res, newUser);
});

router.post('/login', async (req, res) => 
{
    const username = req.body._username;
    const password = req.body._password;

    console.log('POST /login');

    if (username == null || password == null)
        return res.sendStatus(400);

    const user = await userQueries.getUserByName(username);

    if (user == undefined)
        return res.status(403).send('Invalid username');

    const auth = await bcrypt.compare(password, user._password);

    if (!auth)
        return res.status(403).send('Invalid password');

    sendLoggedData(res, user);
});

function sendLoggedData(res, user)
{
    const accessToken = tokenManager.generateAccessToken(user._username);
    const refreshToken = tokenManager.generateRefreshToken(user._username);

    res.status(201).json({ _user : user,  _tokens : {_accessToken : accessToken, _refreshToken : refreshToken } });
}

router.post('/token', async (req, res) => 
{
    const refreshToken = req.body._token;

    console.log('POST /token');

    if (refreshToken == null)
        return res.sendStatus(401);

    const refreshTokenList = await tokenManager.getRefreshTokens();

    if (!refreshTokenList.includes(refreshToken))
    {
        console.log('unknown refresh token');
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) =>
    {
        if (err)
        {
            console.log('error while verifying refresh token');
            return res.sendStatus(403);
        }

        const accessToken = tokenManager.generateRefreshToken({ username : user._username });
        res.json({ _accessToken : accessToken });
    });
});

router.post('/logout', (req, res) =>
{
    console.log('DELETE /logout');

    if (req.body._token == undefined)
        return res.status(401).send('No token sent');

    tokenManager.deleteRefreshToken(req.body._token);
    res.sendStatus(204);
});

module.exports = router;