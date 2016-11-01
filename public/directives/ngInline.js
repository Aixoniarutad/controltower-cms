tower.directive('ngInline', function($templateCache, $compile){
    return {
        restrict: 'A',
        priority: 400,
        link: function(scope, element, attrs){
            var template = $templateCache.get(attrs.template);
            element.html(template);
            $compile(element.contents())(scope);
        }
    };
});