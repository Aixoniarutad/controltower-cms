tower.factory('ApplicationService', function($http, $q){
    var ApplicationService = {};

    ApplicationService.query = function(){
        var deferred = $q.defer();
        $http.get('/application/').success(function(response){
            if(response.error){
                ApplicationService.application = null;
                deferred.reject(response.error);
            }
            if(response.application){
                ApplicationService.application = response.application;
                deferred.resolve(response.application);
            }
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    ApplicationService.update = function(application, callback){
        return $http.post('/application/update', application).success(function(response){
            ApplicationService.application = response.application;
            return callback(response);
        }).error(function(err){
            return callback(err);
        });
    };
    ApplicationService.delete = function(application, callback){
        return $http.post('/application/delete', application).success(function(response){
            ApplicationService.application = null;
            return callback(response);
        }).error(function(err){
            return callback(err);
        });
    };
    ApplicationService.download = function(application, callback){
        return $http.post('/application/download', application).success(function(response){
            ApplicationService.application = response.application;
            return callback(response);
        }).error(function(err){
            return callback(err);
        });
    };
    return ApplicationService;
});