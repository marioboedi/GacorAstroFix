app.controller("AccountController", function ($scope, $http, $window) {
    $scope.user = {};
  
    // Update akun pengguna
    $scope.updateAccount = function () {
        const dataToUpdate = {};
      
        // Hanya tambahkan field yang diisi
        if ($scope.user.username) {
          dataToUpdate.username = $scope.user.username;
        }
        if ($scope.user.email) {
          dataToUpdate.email = $scope.user.email;
        }
      
        console.log("Data yang akan diupdate:", dataToUpdate); // Debugging
      
        // Kirim permintaan hanya jika ada data yang diupdate
        if (Object.keys(dataToUpdate).length === 0) {
          alert("No fields to update.");
          return;
        }
      
        $http
          .put("/api/users/update", dataToUpdate)
          .then(function (response) {
            alert("Account updated successfully!");
            $window.location.href = "/"; // Arahkan ke halaman index
          })
          .catch(function (error) {
            console.error(error);
            alert("Failed to update account.");
          });
      };
      

    $scope.loadUser = function () {
        $http
          .get("/api/users/current")
          .then(function (response) {
            $scope.user = response.data.user; // Ambil data user
          })
          .catch(function (error) {
            console.error("Error fetching user data:", error);
            alert("Failed to load user data.");
          });
      };
      
      // Panggil fungsi saat controller dimuat
      $scope.loadUser();
      
      
  
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
  