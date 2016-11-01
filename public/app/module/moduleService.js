tower.factory('ModuleService', function($http) {
	var ModuleService = {};

	ModuleService.create = function(Page, Module, callback){
		var query = {
			page: Page, 
			module: Module
		};
		return $http.post('/module/create', query).success(function(data){
			return callback(data);
		});
	};
	ModuleService.update = function(Page, Module, callback){
		var query = {
			page: Page, 
			module: Module
		};
		return $http.post('/module/update', query).success(function(data){
			return callback(data);
		});
	};
	ModuleService.copy = function(Page, Module, callback){
		var query = {
			page: Page, 
			module: Module
		};
		return $http.post('/module/copy', query).success(function(data){
			return callback(data);
		});
	};
	ModuleService.delete = function(Page, Module, callback){
		var query = {
			page: Page, 
			module: Module
		};
		return $http.post('/module/delete', query).success(function(data){
			return callback(data);
		});
	};
	ModuleService.sort = function(Page, Modules, callback){
		var query = {
			page: Page, 
			modules: Modules
		};
		return $http.post('/module/sort', query).success(function(data){
			return callback(data);
		});
	};
	return ModuleService;
});