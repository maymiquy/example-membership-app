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
                success_url: `${process.env.APP_URL_SERVER}/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.APP_URL_CLIENT}/subscription`,
                customer: user.stripId,
            }, {
                apiKey: process.env.STRIPE_SECRET_KEY,
            });

            return session;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = membershipService;