var mainApp = angular.module('mainApp');

mainApp.controller('RegisterController', ['$scope', '$http', function($scope, $http) {
	$scope.passwordIsInCorrect = true;
	$scope.detailsCorrectMessage = "";
	$scope.checkPassword = function(formData) {
		if(formData.password !== formData.confirm_password) {
			$scope.passwordIsInCorrect = true;
		}
		else {
			$scope.passwordIsInCorrect = false;
		}
	}
	$scope.checkDetails = function(formData) {
		var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?A-Z0-9]+/;
		var emailFormat = /[@]/;
		if(format.test(formData.name)) {
			$scope.detailsCorrectMessage = "Name is not in valid format";
		}
		else if(formData.name.substr(0, 9) != "flexiple_") {
			$scope.detailsCorrectMessage = "Name must start with 'flexiple_'";
		}
		else if(!emailFormat.test(formData.username)) {
			$scope.detailsCorrectMessage = "email must contain @";
		}
		else if(formData.username.substr(formData.username.length - 3, 3) != ".in") {
			$scope.detailsCorrectMessage = "only .in domain emails are allowed";
		}
		else if(formData.password.replace(/[^A-Z]/g, "").length != 2 || formData.password.replace(/[^!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/g, "").length != 2) {
			$scope.detailsCorrectMessage = "Password must contains 2 uppercase letter and 2 special characters";
		}
		else {
			return true;
		}
		return false;
	};
	$scope.registerUser = function(formData) {
		if($scope.checkDetails(formData)) {
			$http({
				method  : 'POST',
				url     : '/user/registerHandler',
				data    : $.param(formData),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			.success(function(data) {
				if(data.success) {
					Materialize.toast("User registered successfully", 3000, 'rounded');
					window.location.href = "/users/profile";
				}
				else {
					console.log(data);
					if(data.message !== undefined) {
						Materialize.toast(data.message, 3000, 'rounded');
					}
					else {
						Materialize.toast("Sorry some error occured, please try again", 3000, 'rounded');
					}
				}
			});
		}
	};

}]);