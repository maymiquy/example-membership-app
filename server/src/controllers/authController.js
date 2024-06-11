const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { name, email, password, membershipType } = req.body;
        const user = await authService.register(name, email, password, membershipType);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.googleOAuth = async (req, res) => {
    try {
        // Implement Google OAuth logic here
        // ...
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.facebookOAuth = async (req, res) => {
    try {
        // Implement Facebook OAuth logic here
        // ...
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};