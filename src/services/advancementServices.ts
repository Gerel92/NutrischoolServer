import { prisma } from "../db/database";

export class AdvancementServices {
    static async setQuizStepAdvancement(userId: number, step: number) {
        return prisma.advancement.upsert({
            where: { userId },
            update: {
                quizStep: step
            },
            create: {
                userId,
                quizStep: step
            }
        })
    }
    static async getAdvancement(userId: number) {
        return prisma.advancement.findUnique({
            where: { userId },
        })
    }
    static async getAdvancements() {
        return prisma.advancement.findMany({ include: { user: true } })
    }
}