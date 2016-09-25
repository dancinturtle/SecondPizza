donationApp.controller('loginCtrl', function ($scope, userFactory) {

    $scope.business_info;
    $scope.donation_id = 2;

    // Add new user/business
    $scope.add = function(){
        console.log("user data: ", $scope.newUser);
        userFactory.add($scope.newUser, function(data){


            $scope.newUser = {};
        });
    }

    userFactory.getdonation($scope.donation_id, function(data){

        console.log('adadaddad', data[0]);
        $scope.business_info = data[0];
    })
});
