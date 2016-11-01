tower.factory('PageService', function($http, $q) {
    var PageService = {};

    PageService.fetch = function(){
        var deferred = $q.defer();
        $http.get('/page/').success(function(response){
            if(response.error)
                deferred.reject(response.error);
            if(response.pages)
                deferred.resolve(response.pages);
        });
        return deferred.promise;
    };
    PageService.query = function(callback){
        if(PageService.pages)
            return callback(PageService.pages);
        
        return $http.get('/page/').success(function(response){
            PageService.pages = response.pages;
            return callback(response.pages);
        });
    };
    PageService.get = function(page) {
        var deferred = $q.defer();
        $http.get('/page/'+ page).success(function(response){
            if(response.error)
                deferred.reject(response.error);
            if(response.page)
                deferred.resolve(response.page);
        });
        return deferred.promise;
    };
    PageService.createPage = function(page, callback) {
        return $http.post('/page/create', page).success(function(response){
            PageService.pages = response.pages;
            return callback(response);
        });
    };
    PageService.updatePage = function(page, callback) {
        return $http.post('/page/update', page).success(function(response){
            PageService.pages = response.pages;
            return callback(response);
        });
    };
    PageService.deletePage = function(page, callback) {
        return $http.post('/page/delete', page).success(function(response) {
            PageService.pages = response.pages;
            return callback(response);
        });
    };
    return PageService;
});