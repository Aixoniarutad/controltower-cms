tower.controller('dashboardController', function($scope, $state, $mdDialog, AuthService, User, Application){
	$scope.Toast('Welcome, '+User.local.username);

    $scope.logout = function(){
        AuthService.logout(function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            $scope.Toast('Logged out.');
            return $state.go('auth.login');
        });
    };
    $scope.tutorial = function(ev){
		$mdDialog.show($mdDialog.confirm()
        .title('Show Tutorial?')
        .targetEvent(ev)
        .ok('Start')
        .cancel('Go Back')
        .clickOutsideToClose(true))
        .then(function(){
            $state.go('tutorial');
            $scope.toggleFullScreen();
        });
    };
    $scope.toggleFullScreen = function(){
        if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement){
            if(document.documentElement.requestFullscreen){
              document.documentElement.requestFullscreen();
            } else if(document.documentElement.msRequestFullscreen){
              document.documentElement.msRequestFullscreen();
            } else if(document.documentElement.mozRequestFullScreen){
              document.documentElement.mozRequestFullScreen();
            } else if(document.documentElement.webkitRequestFullscreen){
              document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if(document.exitFullscreen){
                document.exitFullscreen();
            } else if(document.msExitFullscreen){
              document.msExitFullscreen();
            } else if(document.mozCancelFullScreen){
              document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen){
              document.webkitExitFullscreen();
            }
        }
    };
});