
import registerPackets from '@repo/packets/register';
import './packet-helpers';

import Network from '@repo/network/network';
import * as packets from '@repo/packets/list';
import Server from './app/server';
import UnitAiList from './app/unit-ai-list';
import Logging from './core/logging';
import config from './game/game.config.json';
import Game from './game/initializers/game';
import Teams from './game/initializers/teams';
import handlers, { packetIdent, registerHandlers } from './handlers';

function main() {

	registerPackets();
	registerHandlers();

	// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
	Logging.changeOptions({
		debug: Logging.output.console,
		packet: Logging.output.websocket,
	});

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
}

main();
