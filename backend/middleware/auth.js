// Middleware untuk memastikan pengguna sudah login
module.exports.isAuthenticated = (req, res, next) => {
  console.log('Middleware isAuthenticated dijalankan');
  console.log('Session UserID:', req.session ? req.session.userId : 'Tidak ada sesi');

  if (req.session && req.session.userId) {
    return next();
  }

  return res.redirect('/login'); // Jika belum login, arahkan ke halaman login
};

// Middleware untuk memastikan pengguna belum login
module.exports.isNotAuthenticated = (req, res, next) => {
  console.log('Middleware isNotAuthenticated dijalankan');
  console.log('Session UserID:', req.session ? req.session.userId : 'Tidak ada sesi');

  if (req.session && req.session.userId) {
    return res.redirect('/'); // Jika sudah login, arahkan ke halaman utama
  }

  return next();
};
