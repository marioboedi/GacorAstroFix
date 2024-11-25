app.controller('MainController', function ($scope, $http) {
    // Ambil data pengguna yang login
    $http.get('/api/users/current').then(
      function (response) {
        $scope.username = response.data.user.username; // Simpan username di scope
      },
      function (error) {
        console.error('Error fetching user data:', error);
        $scope.username = 'Guest'; // Default jika tidak ada pengguna
      }
    );
  });