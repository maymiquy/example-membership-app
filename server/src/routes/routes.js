const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const membershipController = require('../controllers/membership.controller');
const contentController = require('../controllers/content.controller');

const router = express.Router();

router.post('/register',
    [
        body('name').isString().isLength({ min: 3 }),
        body('email').isEmail(),
        body('password').isString().isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            await authController.register(req, res);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email address')
            .notEmpty()
            .withMessage('Email is required'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            await authController.login(req, res);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);
router.post('/logout', authController.logout);
router.post('/oauth/google', authController.googleOAuth);

router.get('/users', userController.getAll);

router.get('/contents', contentController.getAllContents);
router.get('/contents/article/:id', contentController.getArticleById);
router.get('/contents/video/:id', contentController.getVideoById);

router.get('/memberships', membershipController.getMemberships);
router.post('/subscribe', membershipController.subscribe);

module.exports = router;
