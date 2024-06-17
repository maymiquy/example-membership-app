require('dotenv').config();

const User = require('../models/User');
const stripe = require('../config/stripe.config');

const membershipService = {
    async membershipPricing() {
        try {
            const memberships = await stripe.prices.list({
                apiKey: process.env.STRIPE_SECRET_KEY,
            });
            return memberships;
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
                success_url: `${process.env.APP_URL_SERVER}/contents`,
                cancel_url: `${process.env.APP_URL_SERVER}/plans`,
                customer: user.stripId,
            }, {
                apiKey: process.env.STRIPE_SECRET_KEY,
            });

            if (session.payment_status === 'unpaid') {
                if (session.amount_total === 900000) {
                    await User.updateMembershipType(email, 'Basic');
                } else if (session.amount_total === 1900000) {
                    await User.updateMembershipType(email, 'Premium');
                } else if (session.amount_total === 2900000) {
                    await User.updateMembershipType(email, 'Platinum');
                }
            }

            return session;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = membershipService;