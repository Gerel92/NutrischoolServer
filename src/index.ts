import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import users from './routes/users'
import auth from './routes/auth'
import advancement from './routes/advancement'

const app = new Hono()

app
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })
  .route("/auth", auth)
  .route("/users", users)
  .route("/advancements", advancement)

const port = 3000
console.log(`Server is running on port http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})