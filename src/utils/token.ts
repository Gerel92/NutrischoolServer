import { sign } from "hono/jwt";
import { envalid } from "./envalid";
import { prisma } from "../db/database";

export class TokenManager {
    static async generateAccessToken(userId: number) {
        return sign({ payload: userId, exp: Math.floor(Date.now() / 1000) + 60 * 5, }, envalid.ACCESS_TOKEN_SECRET,);
    }
    static async generateRefreshToken(userId: number) {
        return sign({ payload: userId, }, envalid.REFRESH_TOKEN_SECRET,);
    }

    static async generateAndSaveRefreshToken(userId: number) {
        const refreshToken = await this.generateRefreshToken(userId);
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return refreshToken;
    }
}