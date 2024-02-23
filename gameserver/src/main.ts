
import Server from './app/server';
import Logging from './core/logging';
import './core/init_utilities';
import './packet-helpers';
import Network from '@workspace/network/packages/network/network';
import '@workspace/packets/packages/packets/register';
import * as packets from '@workspace/packets/packages/packets';
import handlers from './handlers';
import Teams from './game/initializers/teams';
import Game from './game/initializers/game';
import PlayerList from './app/player-list';

function main() {
	// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
	Logging.changeOptions({
		debug: Logging.output.console,
		packet: Logging.output.websocket,
	});

	Server.doNotUsePathfinding = true;

	Network.logPacketSend = (peerNums: number[], data: ArrayBuffer, channel: number) => {
		Logging.packet({
			peerNums,
			data,
			channel,
		});
	};

	Network.logPacketReceive = (peerNum: number, data: ArrayBuffer, channel: number) => {
		Logging.packet({
			peerNums: [peerNum],
			data,
			channel,
		});
	};

	Server.network = Network.start({
		port: 5119,
		host: '127.0.0.1',
	});

	Network.instance.on('parse-received', (peerNum, channel, packet) => {
		console.log('parse-received', peerNum, channel, packet);
		console.log('cmd', packet.cmd, 'id', packets.KeyCheck.id);
		if (packet.cmd === undefined)
			return;

		if (packet.cmd === packets.KeyCheck.id) {
			handlers[packets.KeyCheck.id](peerNum, packet);
			return;
		}

		let player = PlayerList.list[peerNum];
		if (!player)
			return;

		let handler = handlers[packet.cmd];
		if (!handler) {
			console.log('handler not found', packet.cmd);
			return;
		}

		handler(player, packet);
	});

	Teams.initialize();
	Game.initialize();

	//process.on('uncaughtException', (err) => {
	//	console.log(err);
	//});
}

main();
