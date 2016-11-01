tower.directive('brandLoader', function($rootScope){
    return {
    restrict:'E',
    template:"<md-icon ng-if='!isStateLoading'>polymer</md-icon>"+
             "<md-progress-circular class='md-accent' ng-if='isStateLoading' md-diameter='40px' md-mode='indeterminate'></md-progress-circular>",
        link:function(scope, elem, attrs){
            scope.isStateLoading = false;
            $rootScope.$on('$stateChangeStart', function(){
                scope.isStateLoading = true;
            });
            $rootScope.$on('$stateChangeSuccess', function(){
                scope.isStateLoading = false;
            });
        }
    };
});