require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');


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

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                expiresIn: 360000,
            });

            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async googleOAuth(accessToken) {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            const { name, email } = data;

            let user = await User.findByEmail(email);

            if (!user) {
                const hashedPassword = await bcrypt.hash(email, 10);

                user = await User.create(name, email, hashedPassword);
            }

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                expiresIn: 360000,
            });

            return { user, token };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async facebookOAuth(accessToken) {
        try {
            const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
            console.log(response)
            const { name, email } = response.data;

            let user = await User.findByEmail(email);

            if (!user) {
                const hashedPassword = await bcrypt.hash(email, 10);

                const user = await User.create(name, email, hashedPassword);

                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                    expiresIn: 360000,
                });

                return { user, token };
            } else {
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                    expiresIn: 360000,
                });

                return { user, token };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = authService;