tower.factory('MediaService', function($http, $q, Upload){
    var MediaService = {};

    MediaService.query = function(callback){
        var deferred = $q.defer();
        $http.get('/media/').success(function(response){
            if(response.error)
                deferred.reject(response.error);
            if(response.media)
                deferred.resolve(response.media);
        });
        return deferred.promise;
    };
    MediaService.upload = function(file, callback){
        return Upload.upload({url: 'media/upload/', data: {file: file}}).success(function(response){
            return callback(response);
        });
    };
    MediaService.update = function(file, callback){
        return $http.post('/media/update/', file).success(function(response){
            return callback(response);
        });
    };
    MediaService.delete = function(files, callback){
        return $http.post('/media/delete/', files).success(function(response){
            return callback(response);
        });
    };
    return MediaService;
});