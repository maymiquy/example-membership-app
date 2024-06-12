const User = require("../models/User");

const userService = {
    async getAll() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = userService;