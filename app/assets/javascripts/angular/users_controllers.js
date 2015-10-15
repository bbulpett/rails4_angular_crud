var myApp = angular.module('myapplication', ['ngRoute', 'ngResource']);
// factory will process json response
myApp.factory('Users', ['$resource', function($resource){
	return $resource('/users.json', {}, {
		query: { method: 'GET', isArray: true },
		create: { method: 'POST' }
	});
}]);

myApp.factory('Users', ['$resource', function($resource){
	return $resource('/users/:id.json', {}, {
		show: { method: 'GET' },
		update: { method: 'PUT', params: {id: '@id'} },
		delete: { method: 'DELETE', params: {id: '@id'} }
	});
}]);
// routes deep-link URLs to controllers and views (HTML partials)
// the routes watch $location.url() and map path to existing routes
myApp.config({
	'$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProveder.when('/users', {
			templateUrl: '/templates/users/index.html',
			controller: 'UserListCtr'
		});
		$routeProvider.when('/users/new', {
			templateUrl: '/templates/users/new.html',
			controller: 'UserAddCtr'
		});
		$routeProvider.when('/users/:id/edit', {
			templateUrl: '/templates/users/edit.html',
			controller: 'UserUpdateCtr'
		});
		$routeProvider.otherwise({
			redirectTo: '/users'
		});
	}
});