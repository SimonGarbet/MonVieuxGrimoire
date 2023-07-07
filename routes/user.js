const express = require('express');
const router = express.Router();

const userControl = require('../controllers/user');

const sanitize = require ("../middleware/sanitize")

router.post('/signup', sanitize.loginValidate, sanitize.checkError, userControl.signup);
router.post('/login', sanitize.loginValidate, sanitize.checkError, userControl.login);

module.exports = router;