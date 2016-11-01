tower.controller('pagesController', function($scope, $mdDialog, User, Application, Pages, PageService){
    // Start
    $scope.User = User;
    $scope.Application = Application;
    $scope.Pages = Pages;

    $scope.newPage = function(ev){
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/pages/pages.new.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };
    $scope.updateMeta = function(ev, page){
        $scope.Page = page;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/pages/page.meta.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };
    $scope.createPage = function(page){
        PageService.createPage(page, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');

            $scope.Pages = response.pages;
            return $scope.Toast('Page added');
        });
    };
    $scope.updatePage = function(page){
        PageService.updatePage(page, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            
            $scope.Page = response.page;
            $scope.Pages = response.pages;
            return $scope.Toast('Update successful');
        });
    };
    $scope.deletePage = function(ev, page){
        $mdDialog.show($mdDialog.confirm()
        .title('Delete page?')
        .textContent('This action cannot be undone.')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Go Back')
        .clickOutsideToClose(true))
        .then(function(){

            PageService.deletePage(page, function(response){
                if(response.error)
                    return $scope.Toast(response.error, 'error');
                
                $scope.Pages = response.pages;
                return $scope.Toast('Page removed');
            });
        });
    };
});