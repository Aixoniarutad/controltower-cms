tower.controller('moduleController', function($scope, $mdDialog, Template, Media, Page, Module){
	$scope.Template = Template;
	$scope.Media = Media;
	$scope.Page = Page;
	$scope.Module = Module;
	
	$scope.hide = function(){
		$mdDialog.hide();
	};
	$scope.cancel = function(){
		$mdDialog.cancel();
	};
	$scope.answer = function(answer){
		$mdDialog.hide(answer);
	};
});