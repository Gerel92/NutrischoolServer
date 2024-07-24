
const express = require('express');
const app = express();

app.use(express.json());

app.use('', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/user', require('./routes/advancement'));

app.listen(3000, () =>
{
    console.log('Server listening to port 3000');
});