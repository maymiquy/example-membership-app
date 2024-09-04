require('dotenv').config();

const User = require('../models/User');
const prisma = require('../config/prisma.config');
const xendit = require('../config/xendit.config');


const membershipService = {
    async membershipPricing() {
        try {
            const data = await prisma.plan.findMany();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async successSubscribe(email, priceId) {
        try {
            const user = await User.findByEmail(email);
            const plan = await prisma.plan.findUnique({
                where: {
                    id: priceId
                }
            })

            if (!plan) {
                throw new Error('Price not found');
            } else if (!user) {
                throw new Error('User not found');
            }

            const data = {
                externalId: `sub_${Date.now()}`,
                amount: plan.price,
                payerEmail: user.email,
                description: `Subscription for ${plan.name}`,
                currency: 'IDR',
                successRedirectUrl: `${process.env.APP_URL_CLIENT}/checkout/status`,
                failureRedirectUrl: `${process.env.APP_URL_CLIENT}/`,
            }

            const { Invoice } = xendit;
            const result = await Invoice.createInvoice({
                data: data,
            })

            return result;
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