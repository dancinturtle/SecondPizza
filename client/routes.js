donationApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/dashboard.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
