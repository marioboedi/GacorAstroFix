// backend/middleware/auth.js

// Middleware untuk memastikan pengguna sudah login
module.exports.isAuthenticated = (req, res, next) => {
  console.log('Middleware isAuthenticated dijalankan');
  console.log('Session UserID:', req.session ? req.session.userId : 'Tidak ada sesi');
  
  if (req.session && req.session.userId) {
    console.log('Pengguna sudah login, lanjutkan ke halaman');
    return next();
  }
  
  console.log('Pengguna belum login, arahkan ke halaman login');
  return res.redirect('/login'); // Jika belum login, arahkan ke halaman login
};

// Middleware untuk memastikan pengguna belum login
module.exports.isNotAuthenticated = (req, res, next) => {
  console.log('Middleware isNotAuthenticated dijalankan');
  console.log('Session UserID:', req.session ? req.session.userId : 'Tidak ada sesi');
  
  if (req.session && req.session.userId) {
    console.log('Pengguna sudah login, arahkan ke halaman utama');
    return res.redirect('/'); // Jika sudah login, arahkan ke halaman utama
  }
  
  console.log('Pengguna belum login, lanjutkan ke halaman');
  return next(); // Jika belum login, lanjutkan ke rute berikutnya
};
