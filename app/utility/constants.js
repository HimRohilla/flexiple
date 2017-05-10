var constants = require('./constants');

function define(name, value) {
	Object.defineProperty(exports, name, {
		value:      value,
		enumerable: true,
		writable:     false,
		configurable: false
	});
}
define("host", "sql11.freemysqlhosting.net");
define("username", "sql11173574");
define("password", "gU8gBz7X9V");
define("db_name", "sql11173574");
define("URL", "https://desolate-ravine-98491.herokuapp.com/");
define("domain", "desolate-ravine-98491.herokuapp.com");
define("session_secret", 'ANY_SECRET');
define("path_to_app_controllers", __base + "app/controllers/");
define("path_to_app_models", __base + "app/models/");
define("path_to_app_views", __base + "app/views/");
define("path_to_app_utility", __base + 'app/utility/');
