app.controller('LoginController', function ($scope, $http) {
    $scope.credentials = {};
  
    $scope.login = function () {
      $http
        .post('/api/users/login', $scope.credentials)
        .then((response) => {
          alert(response.data.message);
          window.location.href = '/';
        })
        .catch((error) => {
          alert(error.data.message || 'Login failed');
        });
    };
  });
  