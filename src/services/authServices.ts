import { prisma } from "../db/database";
import { TokenManager } from "../utils/token";
import bcrypt from "bcrypt";

export class AuthServices {
    static async login(username: string, password: string) {
        const user = await prisma.user.findFirst({
            where: {
                username,
            },
            select: {
                id: true,
                password: true
            }
        })
        if (!user) {
            return {
                success: false,
            }
        }
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return {
                success: false,
            }
        }
        const accessToken = await TokenManager.generateAccessToken(user.id)
        const refreshToken = await TokenManager.generateAndSaveRefreshToken(user.id)
        return {
            success: true,
            user,
            token: {
                accessToken,
                refreshToken
            }
        }
    }

    static async register(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            }
        })
        const accessToken = await TokenManager.generateAccessToken(user.id)
        const refreshToken = await TokenManager.generateAndSaveRefreshToken(user.id)
        return {
            success: true,
            user,
            token: {
                accessToken,
                refreshToken
            }
        }
    }
}