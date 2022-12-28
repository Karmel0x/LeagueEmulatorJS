
// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
global.Logging = require('./Core/Logging');
global.Logging.changeOptions({
	debug: Logging.output.console,
	packet: Logging.output.websocket,
});

global.doNotUsePathfinding = true;

require('./Core/init_utilities')();


global.Network = require('./Core/Network/libs/enet').start({
	port: 5119,
	host: "127.0.0.1",
	blowfishKey: "17BLOhi6KZsTtldTsizvHg==",
});

require('./Game/Initializers/Team').initialize();
require('./Game/Initializers/Game').initialize();

//process.on('uncaughtException', (err) => {
//	console.log(err);
//});
