tower.factory('AuthService', function($http, $q, $sessionStorage){
    var AuthService = {}; 

    AuthService.session = function(){
        if($sessionStorage.session)
            return $sessionStorage.session;
        $sessionStorage.$reset();
        return null;
    };
    AuthService.getSession = function(){
        var deferred = $q.defer();
        $http.get('/auth/session').success(function(response){
            if(response.error){
                $sessionStorage.$reset();
                deferred.reject(response.error);
            }
            if(response.user){
                $sessionStorage.session = response.user;
                deferred.resolve(response.user);
            }
        });
        return deferred.promise;
    };
    AuthService.login = function(user, callback){
        return $http.post('/auth/login', user).success(function(response){
            $sessionStorage.session = response.user;
            return callback(response);
        }).error(function(err){
            return callback(err);
        });
    };
    AuthService.logout = function(callback){
        return $http.post('/auth/logout').success(function(response){
            $sessionStorage.$reset();
            return callback(response);
        }).error(function(err){
            return callback(err);
        });
    };
    AuthService.signup = function(user, callback){
        return $http.post('/auth/signup', user).success(function(response){
            $sessionStorage.session = response.user;
            return callback(response);
        }).error(function(err){
            return callback(err);
        });
    };
    AuthService.initialize = function(application, callback){
        return $http.post('/auth/initialize', application).success(function(response){
            $sessionStorage.application = response.application;
            return callback(response);
        }).error(function(err){
            return callback(err);
        });
    };
    return AuthService;
});