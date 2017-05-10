global.__base = __dirname + '/';
global.path_to_app_constants = __dirname + '/app/utility/constants';
var app = require('./app');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
	console.log('listening on *:3000');
});
