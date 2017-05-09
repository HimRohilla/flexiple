var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');
var constants = require(path_to_app_constants);
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
app.use(cookieParser());
app.use(session({ 
	secret: constants.session_secret,
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setting middleware for all requests
router.use(function(req, res, next) {
	next();
});
app.use('/', router);

//to include all controllers
fs.readdirSync(constants.path_to_app_controllers).forEach(function (file) {
	if(file.substr(-3) == '.js') {
		str = "/" + file.substr(0, file.length - 3) + "/";
		app.use(str, require(constants.path_to_app_controllers + file));
	}
});

router.use('/public/*', function(req, res) {
	file_url = __base + req.originalUrl;
	res.sendFile(file_url);
});

router.use('/users/*', function(req, res) {

	// do some cookie check

	file_url = __base + 'app/views' + req.originalUrl + '.html';
	res.sendFile(file_url);	
});

router.get('/', function(req, res) {
	res.sendFile(__base + "public/index.html");
});

module.exports = app;