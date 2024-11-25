const express = require('express');
const { register, login, logout, updateUser, deleteUser, getCurrentUser  } = require('../controllers/userController');
const { isAuthenticated } = require("../middleware/auth");


const router = express.Router();

// Rute Registrasi
router.post('/register', register);

// Rute Login
router.post('/login', login);

// Rute Logout
router.post('/logout', logout);

router.put("/update", isAuthenticated, updateUser);

router.delete("/delete", isAuthenticated, deleteUser);

router.get('/current', isAuthenticated, getCurrentUser);


module.exports = router;
