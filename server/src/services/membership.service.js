require('dotenv').config();

const User = require('../models/User');
const stripe = require('../config/stripe.config');

const membershipService = {
    async membershipPricing() {
        try {
            const { data } = await stripe.prices.list({
                apiKey: process.env.STRIPE_SECRET_KEY,
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async successSubscribe(email, priceId) {
        try {
            const user = await User.findByEmail(email);
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${process.env.APP_URL_CLIENT}/checkout/status?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.APP_URL_CLIENT}/`,
                customer: user.stripeId,
            }, {
                apiKey: process.env.STRIPE_SECRET_KEY,
            });

            return session;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async decrementUserArticleLimit(email) {
        try {
            const user = await User.decrementArticleLimit(email);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async decrementUserVideoLimit(email) {
        try {
            const user = await User.decrementVideoLimit(email);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async resetDailyLimit() {
        try {
            const result = await User.resetDailyLimit();
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = membershipService;