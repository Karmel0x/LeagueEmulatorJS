
import _replayreaders from '../_replayreaders/index';
import NetworkApiEnet from '@workspace/network/packages/network/network-api/enet';
import '@workspace/packets/packages/packets/register';
import packetIds from '@workspace/packets/packages/packets/ids';
import { delay } from '../utils';

let replayName = process.argv[2] || '../temp/replays/LOL-REPLAY.rlp.json';
let replayUnpacked = _replayreaders(replayName);
console.log('replay:', replayName);

function bufferToArrayBuffer(buffer: Buffer) {
	return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

const packetIdsToSkip = [
	0x00, // key exchange
	packetIds.World_SendCamera_Server_Acknologment,
];

async function start_spectator(peerNum: number) {
	let time = performance.now();

	console.log('packet count:', replayUnpacked.length);
	for (let i = 0; i < replayUnpacked.length; i++) {
		let packet = replayUnpacked[i];

		if (!packet.data) {
			console.log('packet without data:', packet);
			continue;
		}

		if (!packet.time) {
			//console.log('packet without time:', packet);
			continue;
		}

		let packetId = new Uint8Array(packet.data, 0, 1)[0];
		if (packetIdsToSkip.includes(packetId))
			continue;

		while (performance.now() - time < packet.time) {
			await delay(1);
		}

		networkApi.send(peerNum, packet.data, packet.channel || 0);

		if (i % 100 == 0)
			console.log('packet number:', i);
	}

}

let started: { [peerNum: number]: boolean } = {};
async function init_network_handler(peerNum: number, data: ArrayBuffer, channel: number) {
	let packetId = new Uint8Array(data, 0, 1)[0];
	if (packetId == 0x00) {// key exchange
		networkApi.setBlowfish(peerNum, '17BLOhi6KZsTtldTsizvHg==');

		let keyExchangePacket = '00 2a 00 ff 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00';
		let buffer = Buffer.from(keyExchangePacket.split(' ').join(''), 'hex');
		networkApi.send(peerNum, bufferToArrayBuffer(buffer), 0);
	}

	if (!started[peerNum]) {
		started[peerNum] = true;
		start_spectator(peerNum);
	}
}

let config = {
	port: 5119,
	host: '127.0.0.1',
};

let networkApi = new NetworkApiEnet();
networkApi.bind(config.port, config.host);
console.log('network started on', config.host + ':' + config.port);

networkApi.once('receive', init_network_handler);
