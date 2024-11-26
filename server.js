const express = require('express');
const session = require('express-session');
const connectDB = require('./backend/config/db');
const userRoutes = require('./backend/routes/userRoutes');
const reviewRoutes = require('./backend/routes/reviewRoutes');
require('dotenv').config();
const path = require('path');
const { isAuthenticated, isNotAuthenticated } = require('./backend/middleware/auth'); // Import middleware

const app = express();

// Koneksi ke database
connectDB();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 30, 
    }, // Jangan lupa ubah ke true jika menggunakan HTTPS di produksi
  })
);
app.use(express.static(path.join(__dirname, 'frontend')));

// Rute Backend
app.use('/api/users', userRoutes);

app.use('/api/reviews', reviewRoutes);


// Halaman index (hanya untuk pengguna yang sudah login)
app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
  
app.get('/login', isNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'views', 'login.html'));
});
  
app.get('/register', isNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'views', 'register.html'));
});

app.get("/account", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "account.html"));
});
  

// Logout
// Rute POST untuk logout
app.post('/user/logout', (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({ message: 'No active session' });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    res.clearCookie('connect.sid'); // Hapus cookie sesi
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

  
  

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});
