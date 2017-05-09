var mainApp = angular.module('mainApp');

mainApp.controller('LoginController', ['$scope', '$http', function($scope, $http) {
	$scope.someError = false;
	$scope.someErrorMessage = "";
	$scope.loginUser = function(formData) {
		$http({
			method  : 'POST',
			url     : '/user/loginHandler',
			data    : $.param(formData),  // pass in data as strings
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		})
		.success(function(data) {
			if(data.success) {
				$scope.someError = false;
				$scope.someErrorMessage = "";
				// redirect to 
				window.location.href = "/users/profile";
			}
			else {
				$scope.someError = true;
				$scope.someErrorMessage = data.message;
			}
		});
	};	
}]);