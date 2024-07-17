const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
    static async create(name, email, password, stripeId) {
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    stripeId
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

    static async initialDailyLimit(email, articleLimit, videoLimit, resetDailyLimit) {
        try {
            const user = await prisma.user.update({
                where: { email: email },
                data: {
                    articleLimit: articleLimit,
                    videoLimit: videoLimit,
                    resetDailyLimit: resetDailyLimit,
                },
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async decrementArticleLimit(email) {
        try {
            const user = await prisma.user.update({
                where: { email: email },
                data: {
                    articleLimit: {
                        decrement: 1,
                    },
                },
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async decrementVideoLimit(email) {
        try {
            const user = await prisma.user.update({
                where: { email: email },
                data: {
                    videoLimit: {
                        decrement: 1,
                    },
                },
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async resetDailyLimit() {
        try {
            console.log('Attempting to reset daily limits...');

            // Fetch all users that need reset
            const usersToReset = await prisma.user.findMany({
                where: {
                    resetDailyLimit: {
                        lte: new Date()
                    }
                }
            });

            // Update each user individually
            const updatePromises = usersToReset.map(user => {
                let newArticleLimit, newVideoLimit;

                switch (user.membershipType) {
                    case 'Basic':
                        newArticleLimit = 3;
                        newVideoLimit = 3;
                        break;
                    case 'Premium':
                        newArticleLimit = 10;
                        newVideoLimit = 10;
                        break;
                    default:
                        newArticleLimit = 999999;
                        newVideoLimit = 999999;
                }

                return prisma.user.update({
                    where: { id: user.id },
                    data: {
                        articleLimit: newArticleLimit,
                        videoLimit: newVideoLimit,
                        resetDailyLimit: new Date(new Date().setHours(24, 0, 0, 0))
                    }
                });
            });

            const results = await Promise.all(updatePromises);
            console.log('Reset completed. Affected users:', results.length);
            return { count: results.length };
        } catch (error) {
            console.error('Error in resetDailyLimit:', error);
            throw new Error(error.message);
        }
    }
}

module.exports = User;