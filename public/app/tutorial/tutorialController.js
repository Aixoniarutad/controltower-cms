tower.controller('tutorialController', function($scope, $state, $mdToast){
	$scope.step = 0;

	$scope.next = function(pos){
		$scope.step = pos;

		if($scope.step >= 5)
	    	return $state.go('dashboard.application.preview');
	};
	$scope.finishTutorial = function(){
		return $state.go('dashboard.application.preview');
	};
});