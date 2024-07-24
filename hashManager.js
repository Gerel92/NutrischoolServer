
const bcrypt = require('bcrypt');

async function hashPassword(req, res, next)
{
    if (req.body._password == null)
        return res.sendStatus(400);

    const salt = await bcrypt.genSalt();
    req.body._password = await bcrypt.hash(req.body._password, salt);
    next();
}

module.exports.hashPassword = hashPassword;