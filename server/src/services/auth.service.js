require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const stripe = require('../config/stripe.config');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');


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
    },

    async googleOAuth(tokenId) {
        const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const { name, email } = ticket.getPayload();

            let user = await User.findByEmail(email);

            if (!user) {
                const hashedPassword = await bcrypt.hash(email, 10);

                const stripeCust = await stripe.customers.create(
                    {
                        email,
                    },
                    {
                        apiKey: process.env.STRIPE_SECRET_KEY
                    }
                );

                user = await User.create(name, email, hashedPassword, stripeCust.id);

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
    },

    async facebookOAuth(accessToken) {
        try {
            const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
            console.log(response)
            const { name, email } = response.data;

            let user = await User.findByEmail(email);

            if (!user) {
                const hashedPassword = await bcrypt.hash(email, 10);

                const stripeCust = await stripe.customers.create(
                    {
                        email,
                    },
                    {
                        apiKey: process.env.STRIPE_SECRET_KEY
                    }
                );

                const user = await User.create(name, email, hashedPassword, stripeCust.id);

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