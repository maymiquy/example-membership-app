const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/google', authController.loginWithGoogle);
// router.post('/facebook', authController.loginWithFacebook);

module.exports = router;