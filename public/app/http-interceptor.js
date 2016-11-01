tower.factory('httpInterceptor', function($q, $rootScope){
    
    return {
        request: function(config){
            if(config.method==='POST')
                $rootScope.$broadcast('event:startProgress');
            return config || $q.when(config);
        },
        requestError: function(rejection){
            $rootScope.$broadcast('event:endProgress');
            return $q.reject(rejection);
        },
        response: function(response){
            if(response.config.method==='POST'){
                $rootScope.$broadcast('event:endProgress');
                console.log('httpResponse: ', 'success');
            }
            return response || $q.when(response);
        },
        responseError: function(rejection){
            $rootScope.$broadcast('event:endProgress');
            console.log('httpRejection: ', 'failure');
            return $q.reject(rejection);
        }
    };
});