app.controller('RegisterController', function ($scope, $http) {
    $scope.user = {};
  
    $scope.register = function () {
      $http
        .post('/api/users/register', $scope.user)
        .then((response) => {
          alert(response.data.message);
          window.location.href = '/login';
        })
        .catch((error) => {
          alert(error.data.message || 'Registration failed');
        });
    };
  });
  