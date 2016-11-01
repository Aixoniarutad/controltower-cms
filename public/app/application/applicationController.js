tower.controller('applicationController', function($scope, $state, $mdDialog, Template, User, Application, ApplicationService){
    // Start
    $scope.Template = Template;
    $scope.User = User;
    $scope.Application = Application;
    $scope.Preview = Application.pages[0];

    $scope.previewPage = function(page){
        $scope.Preview = page;
    };
    $scope.download = function(ev, application){
        ApplicationService.download(application, function(response){
            if(response.error){
                return $scope.Toast(response.error, 'error');
            }
            if(response.zipfile){
                $scope.zipfileMediaLink = response.zipfile;
                $mdDialog.show({
                    scope: $scope.$new(),
                    templateUrl: 'app/application/application.download.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });
            }
        });
    };
    $scope.update = function(ev, application){
        ApplicationService.update(application, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            $scope.Application = response.application;
            return $scope.Toast('Update successful');
        });
    };
    $scope.delete = function(ev, application){
        $mdDialog.show($mdDialog.confirm()
        .title('Delete Application?')
        .textContent('This action cannot be undone.')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Go Back')
        .clickOutsideToClose(true))
        .then(function(){
            ApplicationService.delete(application, function(response){
                if(response.error)
                    return $scope.Toast(response.error, 'error');
                $scope.Toast('Application removed');
                return $state.go('auth.login');
            });
        });
    };
    $scope.editMeta = function(ev, application){
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/application/application.meta.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };
});