app.controller("AccountController", function ($scope, $http, $window) {
    $scope.user = {};
  
    // Update akun pengguna
    $scope.updateAccount = function () {
      console.log("Data yang akan diupdate:", $scope.user); // Debugging
  
      $http
        .put("/api/users/update", $scope.user)
        .then(function (response) {
          alert("Account updated successfully!");
          // Bisa lakukan redirect atau update UI dengan data baru
        })
        .catch(function (error) {
          console.error(error);
          alert("Failed to update account.");
        });
    };
  
    // Hapus akun pengguna
    $scope.deleteAccount = function () {
      if (!confirm("Are you sure you want to delete your account?")) return;
  
      $http
        .delete("/api/users/delete")
        .then(function (response) {
          alert("Account deleted successfully!");
          $window.location.href = "/login";
        })
        .catch(function (error) {
          console.error(error);
          alert("Failed to delete account.");
        });
    };
  
    // Logout pengguna
    $scope.logout = function () {
      $http
        .post("/user/logout")
        .then(function (response) {
          alert("Logged out successfully!");
          $window.location.href = "/login";
        })
        .catch(function (error) {
          console.error(error);
          alert("Failed to log out.");
        });
    };
  });
  