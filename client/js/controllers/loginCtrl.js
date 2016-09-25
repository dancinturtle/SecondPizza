
donationApp.controller('loginCtrl', function ($scope, $routeParams, userFactory, TwitterService, $location) {



    // $scope.donation_id = $routeParams.id;
    $scope.business_id = $routeParams.id;
    // console.log("business id", $scope.business_id);

    $scope.business_info;
    // $scope.donation_id = $routeParams.id;
    $scope.business_tweets = [];


    // Add new user/business
    $scope.newUser = {};
    $scope.loggedInUser;

    userFactory.getAllUsers(function(data){
        $scope.allUsers = data;
    })

    $scope.findUser = function(userToFind){
        for(var i=0; i<$scope.allUsers.length; i++){
            console.log("names", $scope.allUsers[i].name, userToFind.name);
            if($scope.allUsers[i].name == userToFind.name && $scope.allUsers[i].store_number == userToFind.store_number){


          $scope.loggedInUser = $scope.allUsers[i];
          userFactory.rememberUser($scope.loggedInUser, function(res){
            console.log("Back here again", res);
          })
          return true;
        }
        return false;
    }
  }

    // Get donation per id
    userFactory.getdonations($scope.business_id, function(data){
        $scope.business_info = data;
    })

    $scope.add = function(){
        console.log("user data: ", $scope.newUser);
        if($scope.findUser($scope.newUser)){
          console.log("returned true", $scope.loggedInUser)
          $location.path('/business/' + $scope.loggedInUser.id);
        }
        else {
          userFactory.add($scope.newUser, function(data){
            $scope.newUser.id = data;
            $scope.loggedInUser = $scope.newUser;
            console.log("returned false");

          })
        }
        $scope.newUser = {};
        // console.log($scope.loggedInUser)
        // $location.path('/business/' + $scope.loggedInUser.id);
      };





});
