var constants = require('./constants');

function define(name, value) {
	Object.defineProperty(exports, name, {
		value:      value,
		enumerable: true,
		writable:     false,
		configurable: false
	});
}
define("host", "localhost");
define("username", "root");
define("password", "");
define("db_name", "flexiple_db");
define("URL", "http://localhost:3000/");
define("domain", "localhost:3000");
define("session_secret", 'ANY_SECRET');
define("path_to_app_controllers", __base + "app/controllers/");
define("path_to_app_models", __base + "app/models/");
define("path_to_app_views", __base + "app/views/");
define("path_to_app_utility", __base + 'app/utility/');
