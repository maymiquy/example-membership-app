const membershipService = require('../services/membership.service');
const authMiddleware = require('../middlewares/auth.middleware');

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
            await authMiddleware(req, res, async () => {
                const { email } = req.user;
                const { priceId } = req.body;
                const data = await membershipService.successSubscribe(email, priceId);
                res.status(200).json({ data: data });
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

module.exports = membershipController;