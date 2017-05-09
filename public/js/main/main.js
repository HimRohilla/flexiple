var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: '/public/login.html',
			controller: 'LoginController'
		})
		.when('/register', {
			templateUrl: '/public/register.html',
			controller: 'RegisterController'
		})
		.when('/profile', {
			templateUrl: '/user/profile.html',
			controller: 'ProfileController'
		})		
		.otherwise({
			redirectTo: '/login'
		});
});
