donationApp.controller('loginCtrl', function ($scope, userFactory) {

    // Add new user/business
    $scope.add = function(){
        console.log("user data: ", $scope.newUser);
        userFactory.add($scope.newUser, function(data){


            $scope.newUser = {};
        });
    }
});
