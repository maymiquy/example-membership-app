const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const membershipController = require('../controllers/membership.controller');
const contentController = require('../controllers/content.controller');

const router = express.Router();

router.post('/register',
    [
        body('email').isEmail().withMessage('Email must be a valid email address'),
        body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
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
            .withMessage('Email must be a valid email address')
            .notEmpty()
            .withMessage('Email is required'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
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
router.post('/oauth/fb', authController.facebookOAuth);

router.get('/users', userController.getAll);
router.get('/me', userController.getMe);

router.get('/contents', contentController.getAllContents);
router.get('/contents/article/:id', contentController.getArticleById);
router.get('/contents/video/:id', contentController.getVideoById);

router.get('/pricing', membershipController.getMemberships);
router.post('/subscribe', membershipController.subscribe);
router.get('/checkout/success', membershipController.checkoutSuccess);

module.exports = router;
