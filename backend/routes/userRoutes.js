const express = require('express');
const { register, login, logout } = require('../controllers/userController');

const router = express.Router();

// Rute Registrasi
router.post('/register', register);

// Rute Login
router.post('/login', login);

// Rute Logout
router.post('/logout', logout);

module.exports = router;
