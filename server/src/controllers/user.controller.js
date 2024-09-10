const authGuard = require('../middlewares/authguard.middleware');
const userService = require('../services/user.service');

exports.getAll = async (req, res) => {
    try {
        await authGuard(req, res, async () => {
            const data = await userService.getAll();
            res.status(200).json({ data: data });
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getMe = async (req, res) => {
    try {
        await authGuard(req, res, async () => {
            const { email } = req.user;
            const data = await userService.findMe(email);
            res.status(200).json({ data: data });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}