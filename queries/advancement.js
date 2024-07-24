
const database = require('../database');
const query = require('./query');

async function create(id)
{
    await database.query(query.insert('Advancement', ['_id']), [id]);
    return;
}

async function get(id)
{
    const [result] = await database.query(query.select('Advancement', null) + query.whereEqual('_id'), [id]);

    if (result.length > 0)
        return result[0];
    
    // no line found, create a new one
    await create(id);
    const [created] = await database.query(query.select('Advancement', null) + query.whereEqual('_id'), [id]);
    return created[0];
}

async function setQuizStep(id, value)
{
    await database.query(query.update('Advancement', ['_quiz_step']) + query.whereEqual('_id'), [value, id]);
    return;
}

module.exports.get = get;
module.exports.setQuizStep = setQuizStep;