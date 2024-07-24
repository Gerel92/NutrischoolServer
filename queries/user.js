
const database = require('../database');
const query = require('./query');

async function getUsers()
{
    const [result] = await database.query(query.select('Users', null));
    return result;
}

async function getUserById(id)
{
    const [result] = await database.query(query.select('Users', null) + query.whereEqual('_id'), [id]);
    return result[0];
}

async function getUserByName(username)
{
    const [result] = await database.query(query.select('Users', null) + query.whereEqual('_username'), [username]);
    return result[0];
}

async function createUser(username, password)
{
    const [result] = await database.query(query.insert('Users', ['_username', '_password']), [username, password]);
    return await getUserById(result.insertId);
}

async function setUserLastConnection(lastConnection, id)
{
    await database.query(query.update('Users', ['_last_connection']) + query.whereEqual('_id'), [lastConnection, id]);
    return;
}

async function getUserLastConnection(id)
{
    const [result] = await database.query(query.select('Users', ['_last_connection']) + query.whereEqual('_id'), [id]);
    return result[0];
}

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.getUserByName = getUserByName;
module.exports.setUserLastConnection = setUserLastConnection;
module.exports.getUserLastConnection = getUserLastConnection;