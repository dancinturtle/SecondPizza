donationApp.controller('businessCtrl', function ($scope, $routeParams, userFactory, $location, TwitterService) {

  $scope.business_info;
  $scope.business_id = $routeParams.id;
  console.log("business id", $scope.business_id);

  $scope.business_tweets = [];

  userFactory.getdonations($routeParams.id, function(data){
      $scope.business_info = data;
  })

  // All donation tweets
  $scope.getDonationTweets = function(){
      userFactory.getdonations($routeParams.id, function(data){
          $scope.business_info = data;
            for (var business in $scope.business_info) {
                $scope.business_tweets.push($scope.getSearch($scope.business_info[business].hashtag));
            }
      });
  }

  $scope.getDonationTweets();

  // Get Tweets by hashtag
  $scope.getSearch = function(hashtag){
      TwitterService.getSearch(hashtag)
      .then(function(data){
          $scope.twitterErrors = undefined;
          $scope.hashtagData = JSON.parse(data.result.hashData);
          console.log($scope.hashtagData);
      })
      .catch(function(error){
          console.error('there was an error retrieving data: ', error);
          $scope.twitterErrors = error.error;
      })
  }


});
