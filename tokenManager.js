
const jwt = require('jsonwebtoken');
const tokenQueries = require('./queries/token');

function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // if authHeader == undefined return undefined else ruturn portion of authHeader

    if (token == null)
        return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>
    {
        if (err)
            return res.sendStatus(403);

        req.user = user;
        next();
    });
}

function generateAccessToken(username)
{
    return jwt.sign({ payload : username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn	: '60s' });
}

function generateRefreshToken(username)
{
    const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET);
    tokenQueries.addRefreshToken(refreshToken);
    return refreshToken;
}

module.exports.authenticateToken = authenticateToken;
module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.getRefreshTokens = tokenQueries.getRefreshTokens;
module.exports.deleteRefreshToken = tokenQueries.deleteRefreshToken;