const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/signup',
    [
        body('email', 'Email is required').isEmail(),
        body('password', 'Password is required').isLength({ min: 6 }),
    ]
    , register);
router.post('/login',[
        body('email', 'Email is required').isEmail(),
        body('password', 'Password is required').exists(),
    ], login);

module.exports = router;
