const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'Username already exists' });

    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    // Simpan sesi
    req.session.userId = user._id;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// backend/controllers/userController.js
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out successfully' });
    });
};


exports.updateUser = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const updates = {};
  if (req.body.username) updates.username = req.body.username; // Tambahkan jika username dikirim
  if (req.body.email) updates.email = req.body.email;         // Tambahkan jika email dikirim

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      updates,
      { new: true } // Mengembalikan data terbaru setelah update
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.session.userId;

  console.log("Session UserID untuk delete:", userId);

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.log("User tidak ditemukan untuk delete");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User berhasil dihapus:", deletedUser);

    req.session.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error saat menghapus user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
};


exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId).select("username email"); // Mengambil username dan email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Error fetching user data" });
  }
};
