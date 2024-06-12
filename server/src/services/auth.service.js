require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authService = {
    async register(name, email, password) {
        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create(name, email, hashedPassword);
            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async login(email, password) {
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const expire = 40 * 60 * 1000;
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: expire,
            });

            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = authService;