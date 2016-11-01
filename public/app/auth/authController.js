tower.controller('authController', function ($scope, $state, AuthService, ApplicationService){
    
    $scope.login = function(user){
        AuthService.login(user, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            if(response.user && response.user.config.APPLICATION_ID){
                return $state.go('dashboard.application.preview');
            } else {
                return $state.go('auth.initialize');
            }
        });
    };
    $scope.signup = function(user){
        AuthService.signup(user, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            if(response.user){
                $scope.Toast('Account created.', 'success');
                return $state.go('auth.initialize');
            }
        });
    };
    $scope.initialize = function(application){
        AuthService.initialize(application, function(response){
            if(response.error){
                $scope.Toast(response.error, 'error');
                return $state.go('auth.login');
            }
            if(response.application){
                return $state.go('dashboard.application.preview');
            }
            if(response.user){
                $scope.Toast('Application created.', 'success');
                return $state.go('tutorial');
            }
        });
    };
});