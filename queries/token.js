
const database = require('../database');
const query = require('./query');

async function getRefreshTokens()
{
    const [result] = await database.query(query.select('RefreshTokens', null));
    var array = [];

    for (i = 0; i < result.length; i++)
        array.push(result[i]._token);

    return array;
}

async function addRefreshToken(token)
{
    await database.query(query.insert('RefreshTokens', ['_token']), token);
}

async function deleteRefreshToken(token)
{
    await database.query(query.delete('RefreshTokens') + query.whereEqual('_token'), token)
}

module.exports.getRefreshTokens = getRefreshTokens;
module.exports.addRefreshToken = addRefreshToken;
module.exports.deleteRefreshToken = deleteRefreshToken;