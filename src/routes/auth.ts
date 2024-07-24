import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { AuthServices } from '../services/authServices'

const app = new Hono()

const loginSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(3).max(255),
})

const registerSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(3).max(255),
})

app
    .post('/login', zValidator('json', loginSchema), async (c) => {
        const { username, password } = c.req.valid('json')
        const result = await AuthServices.login(username, password).catch((e) => ({ success: false }))
        if (result.success) {
            return c.json(result)
        } else {
            return c.json({ message: 'Invalid credentials' }, 401)
        }
    })
    .post('/register', zValidator('json', registerSchema), async (c) => {
        const { username, password } = c.req.valid('json')
        const result = await AuthServices.register(username, password).catch((e) => ({ success: false }))
        if (result.success) {
            return c.json(result)
        } else {
            return c.json({ message: 'Invalid credentials' }, 401)
        }
    })

export default app