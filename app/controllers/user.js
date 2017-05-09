var express = require('express');
var app = express();
var router = express.Router();
var constants = require(path_to_app_constants);
var model = require(constants.path_to_app_models);
var functions = require(constants.path_to_app_utility + 'functions');

router.get('/', function(req, res) {
	res.send("This is index page");
});

router.post('/registerHandler', function(req, res) {
	model.findOne('users', {username: req.body.username}, ['id']).then(function(res1) {
		if(res1.result === undefined) {
			return model.save('users', {username: req.body.username, password: req.body.password, name: req.body.name}, {});
		}
		else {
			functions.sendResponse(res, {success: false, message: "User already registered"});
		}
	}).then(function(res2) {
		functions.sendResponse(res, {success: true});
	}, function(err) {
		functions.sendResponse(res, {success: false, message: "Sorry some error occured"});
	});
});

router.post('/loginHandler', function(req, res) {
	model.findOne('users', {username: req.body.username}, ['id']).then(function(res1) {
		if(res1.result !== undefined) {
			functions.sendResponse(res, {success: true});
		}
		else {
			functions.sendResponse(res, {success: false, message: "Sorry some error occured"});
		}
	}, function(err) {
		functions.sendResponse(res, {success: false, message: "Sorry some error occured"});
	});
});

module.exports = router;