// frontend/js/mainController.js
app.controller('LogoutController', function($scope, $http, $window) {
    // Fungsi logout
    $scope.logout = function() {
      // Panggil rute logout di backend
      $http.post('/api/users/logout')
        .then(function(response) {
          if (response.data.message === 'Logged out successfully') {
            // Jika logout berhasil, arahkan ke halaman login
             $window.location.href = '/login';  // Atau bisa dengan '/login.html' tergantung rute
          }
        }, function(error) {
          alert('Logout error: ' + error.data);
        });
    };
  });
  