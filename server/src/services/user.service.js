const User = require("../models/User");

const userService = {
    async getAll() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async findMe(email) {
        try {
            const user = await User.findByEmail(email);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateUserMembership(email, membershipType) {
        try {
            const user = await User.updateMembershipType(email, membershipType);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async createInitialUserDailyLimit(email) {
        try {
            const user = await User.initialDailyLimit(email, 0, 0, new Date());

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
}

module.exports = userService;