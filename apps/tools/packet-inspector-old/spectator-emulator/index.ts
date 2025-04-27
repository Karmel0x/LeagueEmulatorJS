// ts-node tools/spectator-emulator/index.ts ../temp/replays/MeUrgot_and_MichaelCass_in_3v3_super_win__[GameReplays.org](1.0.0.126).rlp.json

import Timer from '@repo/gameserver/src/core/timer';
import NetworkApiEnet from '@repo/network/network-api/enet';
import { channels } from '@repo/packets/channels';
import packetIds from '@repo/packets/ids';
import '@repo/packets/register';
import repl from 'repl';
import { delay } from '../../utils';
import _replayreaders from '../_replayreaders/index';

const replayDir = '../../temp/replays/';
let replayName = process.argv[2] || (replayDir + 'LOL-REPLAY.rlp.json');
let replayUnpacked = _replayreaders(replayName);
console.log('replay:', replayName);

function bufferToArrayBuffer(buffer: Buffer) {
	return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

const packetIdsToSkip = [
	//0x00, // key exchange
	packetIds.World_SendCamera_Server_Acknologment,
];

const timer = new Timer().notYet();

async function start_spectator(peerNum: number) {
	timer.start();

	console.log('packet count:', replayUnpacked.length);
	for (let i = 0; i < replayUnpacked.length; i++) {
		let packet = replayUnpacked[i]!;

		if (!packet.data) {
			console.log('packet without data:', packet);
			continue;
		}

		if (!packet.time) {
			//console.log('packet without time:', packet);
			continue;
		}

		let packetId = new Uint8Array(packet.data, 0, 1)[0]!;
		if (packetIdsToSkip.includes(packetId))
			continue;

		while (timer.now() < packet.time) {
			await delay(1);
		}

		networkApi.send(peerNum, packet.data, packet.channel ?? channels.s2c);

		if (i % 100 === 0)
			console.log('packet number:', i);
	}

}

let started: { [peerNum: number]: boolean } = {};
async function init_network_handler(peerNum: number, data: ArrayBuffer, channel: number) {
	//let packetId = new Uint8Array(data, 0, 1)[0];
	//console.log('packetId:', packetId, 'channel:', channel);

	if (!started[peerNum]) {
		started[peerNum] = true;

		networkApi.setBlowfish(peerNum, '17BLOhi6KZsTtldTsizvHg==');
		start_spectator(peerNum);
	}
}

function findPlayerIds() {
	let beginPackets = replayUnpacked.slice(0, 100);
	let keyCheckPackets = beginPackets.filter(packet => {
		let packetId = new Uint8Array(packet.data, 0, 1)[0];
		return packetId === 0x00;
	});
	let playerIds = keyCheckPackets.map(packet => {
		let dv = new DataView(packet.data);
		let v = dv.getBigInt64(8, true);
		return Number(v);
	});
	return playerIds;
}

let config = {
	port: 5119,
	host: '127.0.0.1',
};

let networkApi = new NetworkApiEnet();
networkApi.bind(config.port, config.host);
console.log('network started on', config.host + ':' + config.port);

networkApi.once('receive', init_network_handler);

let playerIds = findPlayerIds();
console.log('run client with one of these playerIds:', ...playerIds);
console.log(`ex.: start "" "League of Legends.exe" "" "" "" "127.0.0.1 5119 17BLOhi6KZsTtldTsizvHg== ${playerIds[0]}"`);

if (repl.start) {
	console.log('available commands: .speed <num>, .pause, .resume, .timer, .send [<channel>] <hex>');

	const local = repl.start('> ');

	local.on('exit', () => {
		process.exit(0);
	});

	local.defineCommand('speed', {
		help: 'set speed',
		action(input) {
			this.clearBufferedCommand();

			// @todo send set frequency packet
			let speed = parseFloat(input);
			timer.speedUp(speed);
			console.log('speed:', speed);

			this.displayPrompt();
		},
	});

	local.defineCommand('pause', {
		help: 'pause',
		action(input) {
			this.clearBufferedCommand();

			// @todo send pause packet
			timer.pause();
			console.log('paused');

			this.displayPrompt();
		},
	});

	local.defineCommand('resume', {
		help: 'resume',
		action(input) {
			this.clearBufferedCommand();

			// @todo send resume packet
			timer.resume();
			console.log('resumed');

			this.displayPrompt();
		},
	});

	local.defineCommand('timer', {
		help: 'timer',
		action(input) {
			this.clearBufferedCommand();

			let s = Math.round(timer.now()) / 1000;
			console.log('timer:', s);

			this.displayPrompt();
		},
	});

	local.defineCommand('send', {
		help: 'send [<channel>] <hex>',
		action(input) {
			this.clearBufferedCommand();
			if (!input || input.length < 2) return;

			let channel = channels.s2c;
			if (input[1] === ' ') {
				channel = parseInt(input[0]!);
				input = input.slice(2);
			}

			input = input.replaceAll(' ', '').replaceAll('-', '');
			let packet = Buffer.from(input, 'hex');
			for (let i in started) {
				let peerNum = parseInt(i);
				networkApi.send(peerNum, bufferToArrayBuffer(packet), channel);
			}

			console.log('sent', packet.length, 'bytes to channel', channel);

			this.displayPrompt();
		},
	});

	local.defineCommand('wait', {
		help: 'wait',
		action(input) {
			this.clearBufferedCommand();

			let ms = parseInt(input);
			if (!ms) return;

			setTimeout(() => {
				this.displayPrompt();
			}, ms);
		},
	});

}
