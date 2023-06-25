const Server = require('./app/Server');

// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
Server.logging = require('./core/Logging');
Server.logging.changeOptions({
	debug: Server.logging.output.console,
	packet: Server.logging.output.websocket,
});

Server.doNotUsePathfinding = true;

require('./core/init_utilities')();


Server.network = require('./core/network/libs/enet').start({
	port: 5119,
	host: "127.0.0.1",
	blowfishKey: "17BLOhi6KZsTtldTsizvHg==",
});

require('./game/initializers/Team').initialize();
require('./game/initializers/Game').initialize();

//process.on('uncaughtException', (err) => {
//	console.log(err);
//});
