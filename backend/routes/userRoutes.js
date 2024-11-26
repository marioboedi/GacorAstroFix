const express = require('express');
const {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  getCurrentUser,
} = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update', isAuthenticated, updateUser);
router.delete('/delete', isAuthenticated, deleteUser);
router.get('/current', isAuthenticated, getCurrentUser);

module.exports = router;
