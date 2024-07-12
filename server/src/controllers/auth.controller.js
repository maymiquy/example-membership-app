const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(201).json({
            message: 'Registration successfully',
            data: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        res.cookie('authcookie', token, {
            httpOnly: true,
            secure: false,
            maxAge: 40 * 60 * 1000,
        });

        res.status(200).json({
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('authcookie', {
            httpOnly: true,
            secure: false,
            maxAge: new Date(0),
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.googleOAuth = async (req, res) => {
    try {
        const { accessToken } = req.body;
        const { user, token } = await authService.googleOAuth(accessToken);

        res.cookie('authcookie', token, {
            httpOnly: true,
            secure: false,
            maxAge: 40 * 60 * 1000,
        });

        res.status(200).json({
            message: 'Google OAuth successful',
            user: {
                name: user.name,
                email: user.email
            },
            token: token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.facebookOAuth = async (req, res) => {
    try {
        const { accessToken } = req.body;
        const { user, token } = await authService.facebookOAuth(accessToken);

        res.cookie('authcookie', token, {
            httpOnly: true,
            secure: false,
            maxAge: 40 * 60 * 1000,
        });

        res.status(200).json({
            message: 'Facebook OAuth successful',
            user: {
                name: user.name,
                email: user.email
            },
            token: token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};