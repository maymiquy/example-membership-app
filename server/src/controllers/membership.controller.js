require('dotenv').config();

const membershipService = require('../services/membership.service');
const authGuard = require('../middlewares/authguard.middleware');
const userService = require('../services/user.service');
const stripe = require('../config/stripe.config');

const membershipController = {
    async getMemberships(req, res) {
        try {
            const data = await membershipService.membershipPricing();
            res.status(200).json({ data: data });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async subscribe(req, res) {
        try {
            await authGuard(req, res, async () => {
                const { email } = req.user;
                const { priceId } = req.body;
                const data = await membershipService.successSubscribe(email, priceId);
                res.status(200).json({ data: data });
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async checkoutSuccess(req, res) {
        try {
            const { session_id } = req.query;
            const session = await stripe.checkout.sessions.retrieve(session_id);
            const { email } = session.customer_details;

            if (session.payment_status === 'paid') {
                let membershipType;
                if (session.amount_total === 900000) {
                    membershipType = 'Basic';
                } else if (session.amount_total === 1900000) {
                    membershipType = 'Premium';
                } else if (session.amount_total === 2900000) {
                    membershipType = 'Platinum';
                }

                await userService.updateUserMembership(email, membershipType);
                await userService.createInitialUserDailyLimit(email);

                res.status(200).json({ message: 'Success' });
            } else {
                res.status(400).json({ message: 'Failed' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = membershipController;