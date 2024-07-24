import { cleanEnv, str } from "envalid";

export const envalid = cleanEnv(process.env, {
    ACCESS_TOKEN_SECRET: str(),
    REFRESH_TOKEN_SECRET: str(),
})