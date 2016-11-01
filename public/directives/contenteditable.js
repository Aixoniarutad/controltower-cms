tower.directive('contenteditable', function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel){
            function read(){
                ngModel.$setViewValue(element.html());
            }
            ngModel.$render = function(){
                element.html(ngModel.$viewValue || "");
            };
            scope.$watch(attrs.contenteditable, function(newVal, oldVal){
                if(newVal){
                    //element.css({'background': 'rgba(0, 0, 0, 0.15)'});
                    element.bind('blur keyup change', function(){
                        scope.$apply(read);
                    });
                }
            });
        }
    };
});
// tower.directive('contenteditable', function(){
//     return {
//         restrict: 'A',
//         require: 'ngModel',
//         link: function(scope, element, attrs, ngModel){
//             function read(){
//                 ngModel.$setViewValue(element.html());
//             }
//             ngModel.$render = function(){
//                 element.html(ngModel.$viewValue || "");
//             };
//             element.bind("blur keyup change", function(){
//                 scope.$apply(read);
//             });
//         }
//     };
// });