global.__base = __dirname + '/';
global.path_to_app_constants = __dirname + '/app/utility/constants';
var app = require('./app');

app.listen(3000, function(){
	console.log('listening on *:3000');
});