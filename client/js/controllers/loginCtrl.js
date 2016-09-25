
donationApp.controller('loginCtrl', function ($scope, $routeParams, userFactory, TwitterService, $location) {

    $scope.business_info;
    $scope.donation_id = $routeParams.id;

    // Add new user/business
    $scope.newUser = {};
    $scope.loggedInUser

    userFactory.getAllUsers(function(data){
      $scope.allUsers = data;
    })

    $scope.findUser = function(userToFind){
      for(var i=0; i<$scope.allUsers.length; i++){
        console.log("names", $scope.allUsers[i].name, userToFind.name);
        if($scope.allUsers[i].name == userToFind.name && $scope.allUsers[i].store_number == userToFind.store_number){

          $scope.loggedInUser = userToFind;
          return true;
        }
      }
      return false;
    }


    userFactory.getdonation($scope.donation_id, function(data){

        console.log('adadaddad', data[0]);
        $scope.business_info = data[0];
    })

    $scope.add = function(){
        console.log("user data: ", $scope.newUser);
        if($scope.findUser($scope.newUser)){
          $scope.loggedInUser = $scope.newUser;
          console.log("returned true", $scope.loggedInUser)
          $scope.newUser = {};
        }
        else {
          userFactory.add($scope.newUser, function(data){
            $scope.findUser($scope.newUser);
            console.log("returned false", $scope.loggedInUser)
            $scope.newUser = {};
          })
        }
        $location.path('/business/');
      };



      $scope.getUser = function(username){
          console.log("username entered ", username);
          TwitterService.getUser(username)
          .then(function(data){
              $scope.twitterErrors = undefined;
              console.log('it works!!!', data.result.userData);
              $scope.results = JSON.parse(data.result.userData);
          })
          .catch(function(error){
              console.error('there was an error retrieving data: ', error);
              $scope.twitterErrors = error.error;
          })
      }

      $scope.getUser('BoyCook');

});
