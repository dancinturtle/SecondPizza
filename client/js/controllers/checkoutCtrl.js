donationApp.controller('checkoutCtrl', function ($scope, donationFactory, $window, $location, userFactory) {
    userFactory.getAllUsers(function(data){
        $scope.categories = data;
  });

  donationFactory.getCharities(function(data){
    // console.log("chariites", data);
      $scope.charities = data;
  });


  $scope.create = function(newCharity){
    // console.log(newCharity);
    userFactory.getLoggedInUser(function(data){
      $scope.loggedInUser = data;
    })
    newCharity.user_id = $scope.loggedInUser;
    donationFactory.newDonation(newCharity, function(data){
      // console.log(data);
      $scope.newCharity = {};

      $location.path('/business/'+ $scope.loggedInUser);
    })
  }

    $scope.onSubmit = function () {
       $scope.processing = true;
     };

     $scope.stripeCallback = function (code, result) {
       console.log("code", code);
       $scope.processing = false;
       $scope.hideAlerts();
       if (result.error) {
         $scope.stripeError = result.error.message;
       } else {
         $scope.stripeToken = result.id;
       }
     };

     $scope.hideAlerts = function () {
       $scope.stripeError = null;
       $scope.stripeToken = null;
     };

     $scope.clear_cart = function(){
          console.log("clears the cart");

     }
     $scope.token = function(){
       console.log("gets the token");

     }
   });
