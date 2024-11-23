// backend/middleware/auth.js

module.exports.isAuthenticated = (req, res, next) => {
  console.log('Middleware isAuthenticated dijalankan');
  console.log('Session UserID:', req.session.userId); // Debug sesi
  if (req.session.userId) {
    return next(); // Jika sudah login, lanjutkan
  }
  console.log('Pengguna belum login, redirect ke /login');
  return res.redirect('/login'); // Jika belum login, arahkan ke login
};

module.exports.isNotAuthenticated = (req, res, next) => {
  console.log('Middleware isNotAuthenticated dijalankan');
  console.log('Session UserID:', req.session.userId); // Debug sesi
  if (req.session.userId) {
    console.log('Pengguna sudah login, redirect ke /');
    return res.redirect('/'); // Jika sudah login, arahkan ke halaman utama
  }
  console.log('Pengguna belum login, lanjutkan ke halaman');
  return next(); // Jika belum login, lanjutkan
};
