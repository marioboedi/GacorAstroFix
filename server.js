const express = require('express');
const session = require('express-session');
const connectDB = require('./backend/config/db');
const userRoutes = require('./backend/routes/userRoutes');
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
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 30, 
    }, // Jangan lupa ubah ke true jika menggunakan HTTPS di produksi
  })
);
app.use(express.static(path.join(__dirname, 'frontend')));

// Rute Backend
app.use('/api/users', userRoutes);



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

// Logout
app.post('/user/logout', (req, res) => {
    console.log('Logout attempt'); // Debug
    req.session.destroy((err) => {
      if (err) {
        console.log('Logout gagal:', err); // Debug error
        return res.status(500).json({ message: 'Logout failed' });
      }
      console.log('Logout berhasil, sesi dihancurkan');
      res.clearCookie('connect.sid'); // Hapus cookie sesi
      return res.redirect('/login'); // Arahkan ke login
    });
  });
  

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
