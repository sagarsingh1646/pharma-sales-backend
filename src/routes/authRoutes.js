const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, login, getCurrentUser } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), getCurrentUser);

module.exports = router;
