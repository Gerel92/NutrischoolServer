
const express = require('express');
const router = express.Router();
const userQueries = require('../queries/user');
const auth = require('../tokenManager');

router.get('/all', async (req, res) =>
{
    console.log('GET /user/all');

    const result = await userQueries.getUsers();
    res.status(200).send(result);
});

router.get('/:id/lastConnection', auth.authenticateToken, async (req, res) =>
{
    const id = req.params.id;
    
    console.log('GET /user/' + id + '/lastConection');

    if (id == null)
        return res.sendStatus(400);

    const result = await userQueries.getUserLastConnection(id);
    
    res.status(200).send(result);
});

router.post('/:id/lastConnection', auth.authenticateToken, async (req, res) =>
{
    const id = req.params.id;
    const lastConnection = req.body._last_connection;
    
    console.log('POST /user/' + id + '/lastConection');

    if (id == null || lastConnection == null)
        return res.status(400).send("No id or lastConection");

    const result = await userQueries.setUserLastConnection(lastConnection, id);
    
    res.status(200).send(result);
});

router.get('/:id', async (req, res) =>
{
    const id = req.params.id;
    
    console.log('GET /user/' + id);

    if (id == null)
        return res.sendStatus(400);

    const result = await userQueries.getUserById(id);

    console.log('   user ' + id + ": " + JSON.stringify(result));
    res.status(200).send(result);
});

module.exports = router;