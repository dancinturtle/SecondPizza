donationApp.factory('TwitterService', function($http, $q){

    var getUser = function(username){
        var d = $q.defer();
        $http.post('/twitter/user', {username : username})
        .success(function(data){
            return d.resolve(data);
        })
        .error(function(error){
            return d.reject(error);
        });
        return d.promise;
    };


    var getSearch = function(hashtag){
        console.log('about to be get: ', hashtag);
        var d = $q.defer();
        $http.get('/twitter/search/'+hashtag)
        .success(function(data){
            return d.resolve(data);
        })
        .error(function(error){
            return d.reject(error);
        });
        return d.promise;
    };


    return {
        getUser : getUser,
        getSearch : getSearch
    }
});
