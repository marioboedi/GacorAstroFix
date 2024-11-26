app.controller('MainController', function ($scope, $http) {
  // Ambil data pengguna yang login
  $http.get('/api/users/current').then(
    function (response) {
      $scope.username = response.data.user.username; // Simpan username di scope
    },
    function (error) {
      console.error('Error fetching user data:', error);
      if (error.status === 401) {
        window.location.href = '/login'; // Arahkan ke login jika belum login
      } else {
        $scope.username = 'Guest'; // Tampilkan Guest jika error lainnya
      }
    }
  );
});
 