app.controller("ReviewController", function ($scope, $http) {
    $scope.reviews = [];
    $scope.newReview = {};
    $scope.currentUserId = null; // Untuk menyimpan ID pengguna yang sedang login
  
    // Ambil ID pengguna yang sedang login terlebih dahulu, lalu fetch reviews
    $scope.init = function () {
      $http
        .get("/api/users/current")
        .then(function (response) {
          $scope.currentUserId = response.data.user._id;
          $scope.fetchReviews(); // Panggil fetchReviews setelah currentUserId diperoleh
        })
        .catch(function (error) {
          console.error("Error fetching current user:", error);
        });
    };
  
    // Ambil semua review
    $scope.fetchReviews = function () {
      $http.get("/api/reviews").then(
        function (response) {
          $scope.reviews = response.data;
        },
        function (error) {
          console.error("Error fetching reviews:", error);
        }
      );
    };
  
    // Tambah review
    $scope.addReview = function () {
      $http.post("/api/reviews", $scope.newReview).then(
        function (response) {
          // Tambahkan ulasan baru dan ambil ulang data review
          $scope.reviews.unshift(response.data.review);
          $scope.newReview = {};
          $scope.fetchReviews(); // Segarkan daftar review
        },
        function (error) {
          console.error("Error adding review:", error);
        }
      );
    };
  
    // Hapus review
    $scope.deleteReview = function (id) {
        console.log("Deleting review with ID:", id);  // Debug log ID yang dikirim
        const confirmation = confirm("Are you sure you want to delete this review?");
        if (confirmation) {
            $http.delete(`/api/reviews/${id}`).then(
                function (response) {
                    // Jika berhasil dihapus, filter review yang terhapus dari daftar
                    $scope.reviews = $scope.reviews.filter((review) => review._id !== id);
                    console.log('Review deleted');
                },
                function (error) {
                    console.error("Error deleting review:", error);
                }
            );
        }
    };
    
    
      
  
    // Edit review
    $scope.editReview = function (review) {
        const updatedContent = prompt("Edit your review:", review.content);
        const updatedRating = prompt("Edit your rating (1-5):", review.rating);
      
        if (updatedContent && updatedRating) {
          $http.put(`/api/reviews/${review._id}`, {
            content: updatedContent,
            rating: updatedRating,
          }).then(
            function (response) {
              // Perbarui ulasan yang di-edit
              const updatedReview = response.data.review;
              const index = $scope.reviews.findIndex(r => r._id === updatedReview._id);
              
              if (index !== -1) {
                // Perbarui konten dan rating di daftar review
                $scope.reviews[index] = updatedReview;
              }
            },
            function (error) {
              console.error("Error updating review:", error);
            }
          );
        }
      };
      
      
  
    // Cek apakah pengguna adalah pemilik review
    $scope.isReviewOwner = function (review) {
      if (!review || !review.user || !$scope.currentUserId) {
        return false; // Pastikan data valid
      }
      return review.user._id === $scope.currentUserId;
    };
  
    // Inisialisasi data
    $scope.init();
  });
  