tower.controller('usersController', function($scope, $mdDialog, $mdEditDialog, User, Users, UsersService, Application){
    // Start
    $scope.Application = Application;
    $scope.User = User;
    $scope.Users = Users;

    $scope.newUser = function(ev){
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/users/users.new.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };
    $scope.createUser = function(user){
        UsersService.create(user, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            $scope.Users = response.users;
            $scope.selected = [];
            return $scope.Toast('User added.');
        });
    };
    $scope.updateUser = function(user){
        UsersService.update(user, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            $scope.Users = response.users;
            $scope.selected = [];
            return $scope.Toast('User updated.');
        });
    };
    $scope.deleteUser = function(ev, users){
        $mdDialog.show($mdDialog.confirm()
        .title('Delete users?')
        .textContent('This action cannot be undone.')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Go Back')
        .clickOutsideToClose(true))
        .then(function(){
            UsersService.delete(users, function(response){
                if(response.error)
                    return $scope.Toast(response.error, 'error');
                $scope.Users = response.users;
                $scope.selected = [];
                return $scope.Toast('User removed');
            });
        });
    };

    // Data Table
    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15];
    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };
    $scope.query = {
        order: 'username',
        limit: 5,
        page: 1
    };
    $scope.getUserRoles = function(){
        return ['author', 'administrator'];
    };
    $scope.editField = function(event, user, fieldname){
        event.stopPropagation();

        var promise;
        var editDialog = {
            modelValue: user[fieldname],
            placeholder: 'Text',
            targetEvent: event,
            title: 'Text',
            validators: {'md-maxlength': 30},
            save: function(input){
                user[fieldname] = input.$modelValue;
                //return $scope.updateUser(user);
            }
        };
        if($scope.options.largeEditDialog){
            promise = $mdEditDialog.large(editDialog);
        } else {
            promise = $mdEditDialog.small(editDialog);
        }
        promise.then(function(ctrl){
            var input = ctrl.getInput();
            input.$viewChangeListeners.push(function(){
                input.$setValidity('test', input.$modelValue !== 'test');
            });
        });
    };
    $scope.toggleLimitOptions = function(){
        $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };
    $scope.logItem = function(item){
    };
    $scope.logOrder = function(order){
    };
    $scope.logPagination = function(page, limit){
    };
});