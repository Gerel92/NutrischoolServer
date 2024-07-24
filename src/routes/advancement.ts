import { Hono } from "hono"
import { AdvancementServices } from "../services/advancementServices"

const app = new Hono()


app.get("/", async (c) => {
    return c.json(await AdvancementServices.getAdvancements())
})

export default app