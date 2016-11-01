tower.controller('pageController', function($scope, $mdDialog, $mdBottomSheet, Template, User, Application, Media, Page, ModuleService){
    $scope.Template = Template;
    $scope.User = User;
    $scope.Application = Application;
    $scope.Media = Media;
    $scope.Page = Page;
    
    $scope.newModule = function(ev){
        $mdBottomSheet.show({
            scope: $scope.$new(),
            templateUrl: 'app/module/module.new.html'
        });
    };
    $scope.editModule = function(ev, Module){
        $mdDialog.show({
            scope: $scope.$new(),
            locals:{
                Media: Media,
                Page: Page,
                Module: Module
            },
            controller: 'moduleController',
            templateUrl: 'app/module/module.edit.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
        .then(function(answer){
            $scope.status = 'You said the information was "' + answer + '".';
        }, function(){
            $scope.status = 'You cancelled the dialog.';
        });
      };
    $scope.createModule = function(Page, Module){
        ModuleService.create(Page, Module, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            $mdBottomSheet.hide();
            $scope.Page = response.page;
            return $scope.Toast('Module added');
        });
    };
    $scope.updateModule = function(Page, Module){
        ModuleService.update(Page, Module, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            $scope.Page = response.page;
            return $scope.Toast('Module updated');
        });
    };
    $scope.copyModule = function(Page, Module){
        ModuleService.copy(Page, Module, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            $scope.Page = response.page;
            return $scope.Toast('Module copied');
        });
    };
    $scope.deleteModule = function(Page, Module){
        $mdDialog.show($mdDialog.confirm()
        .title('Delete this module?')
        .textContent('This action cannot be undone.')
        .ok('Delete Module')
        .cancel('Go Back')
        .clickOutsideToClose(true))
        .then(function(){
            ModuleService.delete(Page, Module, function(response){
                if(response.error)
                    return $scope.Toast(response.error, 'error');
                $scope.Page = response.page;
                return $scope.Toast('Module removed');
            });
        });
    };
    // Sorting
    $scope.sortModules = {
        animation: 150,
        ghostClass: 'sortable-page',
        onSort: function(evt){
            for(var i in evt.models){
                evt.models[i].order = i;
            }
            ModuleService.sort($scope.Page, evt.models, function(response){
                if(response.error)
                    return $scope.Toast(response.error, 'error');
                $scope.Page = response.page;
                return;
            });
        }
    };
});