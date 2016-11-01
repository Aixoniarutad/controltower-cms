tower.factory('preload', function($q){
    return function(url){
        var deffered = $q.defer(),
        image = new Image();
        image.src = url;
    
        if(image.complete){
            deffered.resolve();
        } else {
            image.addEventListener('load', function(){
                deffered.resolve();
            });
            image.addEventListener('error', function(){
                deffered.reject();
            });
        }
        return deffered.promise;
    }
});
tower.directive('lazySrc', function(preload){
    return {
      restrict: 'AE',
      link: function(scope, element, attrs){
            element.hide();
            var elementParent = angular.element(element[0].parentNode);
            elementParent.css({'background': 'url(images/preloader.gif) no-repeat center'});
            preload(attrs['ngSrc']).then(function(){
                element.fadeIn();
                elementParent.css({'background': 'none'});
            });
        }
    };
});