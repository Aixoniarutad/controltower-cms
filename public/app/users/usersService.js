tower.factory('UsersService', function($http, $q){
    var UsersService = {};

    UsersService.fetch = function(){
        var deferred = $q.defer();
        $http.get('/user/').success(function(response){
            if(response.error)
                deferred.reject(response.error);
            if(response.users)
                deferred.resolve(response.users);
        });
        return deferred.promise;
    };
    UsersService.query = function(callback){
        if(UsersService.users)
            return callback(UsersService.users);
        
        return $http.get('/user/').success(function(response){
            UsersService.users = response.users;
            return callback(response.users);
        });
    };
    UsersService.get = function(user){
        var deferred = $q.defer();
        $http.get('/user/'+ user).success(function(response){
            if(response.error)
                deferred.reject(response.error);
            if(response.user)
                deferred.resolve(response.user);
        });
        return deferred.promise;
    };
    UsersService.create = function(user, callback){
        return $http.post('/user/create', user).success(function(response){
            UsersService.users = response.users;
            return callback(response);
        });
    };
    UsersService.update = function(user, callback){
        return $http.post('/user/update', user).success(function(response){
            UsersService.users = response.users;
            return callback(response);
        });
    };
    UsersService.delete = function(users, callback){
        return $http.post('/user/delete', users).success(function(response){
            UsersService.users = response.users;
            return callback(response);
        });
    };
    return UsersService;
});