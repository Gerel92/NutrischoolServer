
const express = require('express');
const router = express.Router();
const advancementQueries = require('../queries/advancement');
const auth = require('../tokenManager');

router.get('/:id/advancement', async (req, res) =>
{
    const id = req.params.id;

    console.log('GET /user/' + id + '/advancement');

    if (id == null)
        return res.sendStatus('400');

    const advancement = await advancementQueries.get(id);

    res.json(advancement);
});

router.post('/:id/advancement/quiz-step', async (req, res) =>
{
    const id = req.params.id;
    const step = req.body._quiz_step;

    console.log('POST /user/' + id + '/advancement/quiz-step');

    if (id == null || step == null)
        return res.sendStatus('400');

    await advancementQueries.setQuizStep(id, step);

    res.sendStatus(200);
});

module.exports = router;