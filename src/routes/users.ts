import { Hono } from 'hono'
import { UserServices } from '../services/userServices'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { AdvancementServices } from '../services/advancementServices'

const app = new Hono()

const advacementStepSchema = z.object({
    step: z.number().int(),
})

app
    .get('/', async (c) => c.json(await UserServices.getUsers()))
    .post('/:id/lastConnection', async (c) => c.json(await UserServices.setUserLastConnection(Number(c.req.param("id"))), 201))
    .get('/:id', async (c) => {
        const user = await UserServices.getUserById(Number(c.req.param("id")))
        if (user) {
            return c.json(user)
        } else {
            return c.json({ message: 'User not found' }, 404)
        }
    })
    .get('/:id/advancement', async (c) => {
        const advancement = await AdvancementServices.getAdvancement(Number(c.req.param("id")))
        if (advancement) {
            return c.json(advancement)
        } else {
            return c.json({ message: 'Advancement not found' }, 404)
        }
    })
    .post("/:id/advancement/quiz-step", zValidator('json', advacementStepSchema), async (c) => {
        const { step } = c.req.valid('json')
        return c.json(await AdvancementServices.setQuizStepAdvancement(Number(c.req.param("id")), step), 201)
    })

export default app