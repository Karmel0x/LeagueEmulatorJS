
// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
// for even better debugging you can run this emu with `node --inspect main`
// then open chrome browser and go to `chrome://inspect`
// or use Visual Studio Code debugger

import Network from '@repo/network/network';
import Parser from '@repo/network/parser';
import WebSocket from 'ws';
import Server from '../app/server';
import Timer from './timer';

export type LoggingOutput = (...args: any[]) => void;
//export type LoggingOutputType = 'none' | 'console' | 'websocket' | 'file';
export type LoggingType = 'log' | 'warn' | 'error' | 'debug' | 'packet';


export function bufferToArrayBuffer(buffer: Buffer) {
	return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export type PacketLog = {
	id: number;
	time: number;
	direction: 'sent' | 'recv';
	peers: number[];
	size: number;
	channel: number;
	channelName: string;
	packet: number;
	packetName: string;

	parsed?: string;
	bytes?: string;
	debugOffsets: string;
};

export default class Logging {
	static output = {
		none: (...args: any[]) => { },

		console: console.debug,

		websocket(...args: any[]) {
			if (!Logging.ws)
				return;

			Logging.ws.send(JSON.stringify({
				cmd: 'logging',
				data: args,
			}));
		},

		file(...args: any[]) {
			//fs.appendFileSync('../log.json', JSON.stringify(args) + ",\n");
		}
	};

	static ws?: WebSocket;

	static _log = Logging.output.none;
	static _warn = Logging.output.none;
	static _error = Logging.output.none;
	static _debug = Logging.output.none;
	static _packet = Logging.output.none;

	/**
	 * ...args printable arguments
	 */
	static debug(...args: any[]) {
		//logging._debug(arguments.callee.caller.name, ...arguments);
		Logging._debug(...args);
	}

	static packet(arg: { channel: number, data: ArrayBufferLike, peers: number[], direction: 'sent' | 'recv' }) {

		if (Logging._packet === Logging.output.none)
			return;

		if (Logging._packet === Logging.output.console)
			return Logging._packet(arg);

		// send packet to packet-inspector with websocket
		if (Logging._packet === Logging.output.websocket) {
			if (!Logging.ws || Logging.ws.readyState !== WebSocket.OPEN)
				return;

			const { channel, data, peers, direction } = arg;
			const bytes = Buffer.from(data).toString('hex');
			const appTime = Timer.app.now();

			Logging.ws.send(JSON.stringify({
				cmd: 'addpacketforall',
				data: {
					channel,
					bytes,
					time: appTime,
					peers,
					direction,
				} satisfies Partial<PacketLog>,
			}));
		}
	}

	static options: { [key in LoggingType]?: LoggingOutput } = {};

	/**
	 * Set where log should output (none/console/websocket/file)
	 */
	static changeOptions(options: { [key in LoggingType]?: LoggingOutput }) {
		this.options = options;

		for (const key in options) {
			if (options[key as keyof typeof options] === Logging.output.websocket) {
				try {
					const ws = new WebSocket('ws://127.0.0.1:8080');
					console.log('connecting to inspector...');
					this.ws = ws;

					ws.on('error', function (error) {
						console.log('cannot connect to inspector');
					});

					ws.on('open', function () {
						console.log('connected to inspector');
						ws.send(JSON.stringify({
							cmd: 'gs',
						}));
					});

					ws.on('message', function (data) {
						const res = JSON.parse(data as unknown as string);
						//console.log('message', data, res);
						if (res.cmd === 'sendpacket') {
							const packet = res.packet as PacketLog;
							const { peers, bytes, channel, direction } = packet;
							if (!bytes) return;

							const data = Buffer.from(bytes, 'hex');
							console.log('sendpacket', peers, data, channel);

							if (direction === 'sent') {
								Server.network.sendData(peers, bufferToArrayBuffer(data), channel);
							}
							else if (direction === 'recv') {
								for (let i = 0; i < peers.length; i++) {
									const peerNum = peers[i]!;
									Network.logPacketReceive(peerNum, bufferToArrayBuffer(data), channel);

									try {
										const packet = Parser.parse({ data: bufferToArrayBuffer(data), channel });
										if (!packet)
											return;

										this.emit('parse-received', peerNum, channel, packet);
									}
									catch (e) {
										//if (e instanceof Error) {
										//	console.log(e.message);
										//}
									}
								}
							}
						}
					});
					break;
				} catch (e) {
					console.error('Logging: websocket error', e);
				}
			}
		}

		if (options.debug)
			console.debug = options.debug;

		if (options.debug)
			Logging._debug = options.debug;
		if (options.packet)
			Logging._packet = options.packet;

	}
}
