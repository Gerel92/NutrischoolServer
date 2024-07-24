import { prisma } from "../db/database";

export class UserServices {
    static async getUsers() {
        return prisma.user.findMany({
        })
    }
    static async getUserById(id: number) {
        return prisma.user.findUnique({
            where: { id },
        })
    }
    static async setUserLastConnection(id: number) {
        return prisma.user.update({
            where: { id },
            data: { lastConnection: new Date() },
        })
    }
}