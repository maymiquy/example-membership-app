const userService = require('../services/user.service');

exports.getAll = async (req, res) => {
    try {
        const data = await userService.getAll();
        res.status(200).json({ data: data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}