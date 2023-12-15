import Server from './app/Server.js';
import Logging from './core/Logging.js';
import './core/init_utilities.js';
import NetworkLib from './core/network/libs/enet.js';
import Teams from './game/initializers/Teams.js';
import Game from './game/initializers/Game.js';

// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
Server.logging = Logging;
Server.logging.changeOptions({
	debug: Server.logging.output.console,
	packet: Server.logging.output.websocket,
});

Server.doNotUsePathfinding = true;


Server.network = NetworkLib.start({
	port: 5119,
	host: "127.0.0.1",
	blowfishKey: "17BLOhi6KZsTtldTsizvHg==",
});

Teams.initialize();
Game.initialize();

//process.on('uncaughtException', (err) => {
//	console.log(err);
//});
