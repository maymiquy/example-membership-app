const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
    static async create(name, email, password, membershipType) {
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    membershipType,
                },
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findByEmail(email) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = User;