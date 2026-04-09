
import registerPackets from '@repo/packets/register';
import './packet-helpers';

import Network from '@repo/network/network';
import * as packets from '@repo/packets/list';
import Server from './app/server';
import UnitAiList from './app/unit-ai-list';
import Logging from './core/logging';
import config from './game/game.config';
import Game from './game/initializers/game';
import Teams from './game/initializers/teams';
import handlers, { packetIdent, registerHandlers } from './handlers';

function main() {

	if (Server.debug) {
		// make Math.random predictable
		let mathSeed = 165314;
		Math.random = function () {
			const x = Math.sin(mathSeed++) * 10000;
			return x - Math.floor(x);
		};
	}

	registerPackets();
	registerHandlers();

	// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
	Logging.changeOptions({
		debug: Logging.output[config.logging.debug as keyof typeof Logging.output] || Logging.output.none,
		packet: Logging.output[config.logging.packet as keyof typeof Logging.output] || Logging.output.none,
	});

	Network.logPacketSend = (peers: number[], data: ArrayBufferLike, channel: number) => {
		Logging.packet({
			peers,
			data,
			channel,
			direction: 'sent',
		});
	};

	Network.logPacketReceive = (peerNum: number, data: ArrayBufferLike, channel: number) => {
		Logging.packet({
			peers: [peerNum],
			data,
			channel,
			direction: 'recv',
		});
	};

	Server.network = Network.start(config.server);

	Network.instance.on('parse-received', (peerNum, channel, packet) => {
		try {
			if (packet.cmd !== packets.Ping_Load_Info.id) {
				console.log('parse-received', peerNum, channel, packet);
			}

			if (packet.cmd === undefined)
				return;

			if (channel === packets.KeyCheck.channel && packet.cmd === packets.KeyCheck.id) {
				handlers[packetIdent(packets.KeyCheck)]?.(peerNum, packet);
				return;
			}

			// @todo
			const player = UnitAiList.playerByPeer[peerNum];
			if (!player)
				throw new Error('player not found');

			const handler = handlers[`${channel}-${packet.cmd}`];
			if (!handler)
				throw new Error(`handler not found ${channel}-${packet.cmd}`);

			handler(player, packet);

		}
		catch (e) {
			console.error('parse-received.error', e);
		}
	});

	Teams.initialize();
	Game.initialize();

	//process.on('uncaughtException', (err) => {
	//	console.log(err);
	//});

	//setTimeout(() => {
	//	console.log('exiting app after 3 hours');
	//	process.exit(0);
	//}, 1000 * 60 * 60 * 3);
}

main();

//setTimeout(() => {
//	process.exit(0);
//}, 1000 * 60 * 2);
