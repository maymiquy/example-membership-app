require('dotenv').config();

const membershipService = require('../services/membership.service');
const authGuard = require('../middlewares/authguard.middleware');
const userService = require('../services/user.service');
const xendit = require('../config/xendit.config');

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

                res.cookie('invoice_id', data.id, { maxAge: 15 * 60 * 1000 });
                res.status(200).json({ data: data });
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async checkoutSuccess(req, res) {
        try {
            const { invoice_id } = req.body;

            const { Invoice } = xendit;
            const invoice = await Invoice.getInvoiceById({
                invoiceId: invoice_id,
            });
            console.log(invoice);

            if (invoice.status === 'PAID') {
                const email = invoice.payerEmail;
                let membershipType;
                let limit;

                if (invoice.amount === 9000) {
                    membershipType = 'Basic';
                    limit = 3;
                } else if (invoice.amount === 19000) {
                    membershipType = 'Premium';
                    limit = 10;
                } else if (invoice.amount === 29000) {
                    membershipType = 'Platinum';
                    limit = 999999;
                }

                await userService.updateUserMembership(email, membershipType);
                await userService.createInitialUserDailyLimit(email, limit);

                res.status(200).json({ message: 'Success' });
            } else {
                res.status(400).json({ message: 'Failed' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async decrementUserArticleLimit(req, res) {
        try {
            await authGuard(req, res, async () => {
                const { email } = req.user;
                const data = await membershipService.decrementUserArticleLimit(email);
                res.status(200).json({ data: data });
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async decrementUserVideoLimit(req, res) {
        try {
            await authGuard(req, res, async () => {
                const { email } = req.user;
                const data = await membershipService.decrementUserVideoLimit(email);
                res.status(200).json({ data: data });
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async resetDailyLimit(req, res) {
        try {
            const result = await membershipService.resetDailyLimit();
            res.status(200);
            console.log('Daily limit reset completed at:', new Date().toLocaleString());
            console.log('Reset result:', result);
        } catch (error) {
            console.error('Error resetting daily limit:', error);
            res.status(400).json({ message: 'Error resetting daily limit' });
        }
    }
};

module.exports = membershipController;