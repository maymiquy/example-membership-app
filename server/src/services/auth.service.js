require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const stripe = require('../config/stripe.config');


const authService = {
    async register(name, email, password) {
        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const stripeCust = await stripe.customers.create(
                {
                    email,
                },
                {
                    apiKey: process.env.STRIPE_SECRET_KEY
                }
            );

            const newUser = await User.create(name, email, hashedPassword, stripeCust.id);
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

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                expiresIn: 360000,
            });

            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = authService;