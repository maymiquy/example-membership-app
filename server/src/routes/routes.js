const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const membershipController = require('../controllers/membership.controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/users', userController.getAll);

router.get('/memberships', membershipController.getMemberships);
router.post('/subscribe', membershipController.subscribe);

module.exports = router;