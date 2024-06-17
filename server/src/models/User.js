const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
    static async create(name, email, password, stripId) {
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    stripId
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

    static async findAll() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateMembershipType(email, type) {
        try {
            const user = await prisma.user.update({
                where: { email: email },
                data: {
                    membershipType: type,
                },
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = User;