
// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
global.Logging = require('./Core/Logging');
global.Logging.changeOptions({
	debug: Logging.output.console,
	packet: Logging.output.websocket,
});


require('./Core/init_utilities')();

require('./Game/Initializers/Team').initialize();
require('./Game/Initializers/Game').initialize();

require('./Core/init_network')();


//process.on('uncaughtException', (err) => {
//	console.log(err);
//});
