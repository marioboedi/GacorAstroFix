const express = require('express');
const session = require('express-session');
const connectDB = require('./backend/config/db');
const userRoutes = require('./backend/routes/userRoutes');
require('dotenv').config();
const path = require('path');


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
    cookie: { secure: false }, // Pastikan menggunakan HTTPS jika di produksi
  })
);
app.use(express.static(path.join(__dirname, 'frontend')));


// Rute Backend
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'views', 'login.html'));
});
  
  // Rute untuk halaman registrasi
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'views', 'register.html'));
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
