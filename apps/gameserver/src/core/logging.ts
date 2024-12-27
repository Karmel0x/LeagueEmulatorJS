
// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`
// for even better debugging you can run this emu with `node --inspect main`
// then open chrome browser and go to `chrome://inspect`
// or use Visual Studio Code debugger

import WebSocket from 'ws';
import Server from '../app/server';

export type LoggingOutput = (...args: any[]) => void;
//export type LoggingOutputType = 'none' | 'console' | 'websocket' | 'file';
export type LoggingType = 'log' | 'warn' | 'error' | 'debug' | 'packet';


function bufferToArrayBuffer(buffer: Buffer) {
	return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

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

	/**
	 * ...args printable arguments (packet ({channel, bytes, time}))
	 */
	static packet(...args: any[]) {

		if (Logging._packet === Logging.output.none)
			return;

		if (Logging._packet === Logging.output.console)
			return Logging._packet(...args);

		// send packet to packet-inspector with websocket
		if (Logging._packet === Logging.output.websocket) {
			if (!Logging.ws || Logging.ws.readyState !== 1)
				return;

			Logging.ws.send(JSON.stringify({
				cmd: 'addpacketforall',
				data: {
					channel: args[0].channel,
					data: Buffer.from(args[0].data).toString('hex'),
					time: args[0].time,
					peerNums: args[0].peerNums,
				},
			}));
		}
	}

	static options = {};

	/**
	 * Set where log should output (none/console/websocket/file)
	 */
	static changeOptions(options: { [key in LoggingType]?: LoggingOutput }) {
		this.options = options;

		for (const key in options) {
			if (options[key as keyof typeof options] === Logging.output.websocket) {
				try {
					const ws = new WebSocket('ws://127.0.0.1/ws');
					this.ws = ws;

					ws.on('error', function (error) {

					});

					ws.on('open', function () {
						ws.send(JSON.stringify({
							cmd: 'gs',
						}));
					});

					ws.on('message', function (data) {
						const res = JSON.parse(data as unknown as string);
						//console.log('message', data, res);
						if (res.cmd === 'sendpacket') {
							const { peerNums, data, channel } = res as { peerNums: number[], data: string, channel: number };
							const packetBuffer = Buffer.from(data.replaceAll(' ', ''), 'hex');
							console.log('sendpacket', peerNums, packetBuffer, channel);
							Server.network.sendData(peerNums, bufferToArrayBuffer(packetBuffer), channel);
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
