
// logging
// if using websocket at first run `node tools/packet-inspector` and open your browser at `127.0.0.1`

// for even better debugging you can run this emu with `node --inspect main`
// then open chrome browser and go to `chrome://inspect`
// or use Visual Studio Code debugger

const WebSocket = require("ws");


class Logging {
	static output = {
		none: () => { },
		console: console.debug,
		websocket() {
			if (!Logging.ws)
				return;

			Logging.ws.send(JSON.stringify({
				cmd: 'logging',
				data: arguments,
			}));
		},
		file() {
			//fs.appendFileSync('../LeagueEmulatorJS_log.json', JSON.stringify(arguments) + ",\n");
		}
	};

	/**
	 * @type {WebSocket | undefined}
	 */
	static ws;

	static _log = Logging.output.none;
	static _warn = Logging.output.none;
	static _error = Logging.output.none;
	static _debug = Logging.output.none;
	static _packet = Logging.output.none;

	/**
	 * @arguments printable arguments
	 */
	static debug() {
		//Logging._debug(arguments.callee.caller.name, ...arguments);
		Logging._debug(...arguments);
	}

	/**
	 * @arguments printable arguments (packet ({channel, bytes, time}))
	 */
	static packet() {
		if (Logging._packet == Logging.output.none)
			return;

		if (Logging._packet == Logging.output.console)
			return Logging._packet(...arguments);

		// send packet to packet-inspector with websocket
		if (Logging._packet == Logging.output.websocket) {
			if (!Logging.ws || Logging.ws.readyState != 1)
				return;

			Logging.ws.send(JSON.stringify({
				cmd: 'addpacketforall',
				data: {
					channel: arguments[0].channel || '',
					bytes: arguments[0].bytes || '',
					time: arguments[0].time || '',
					peerNums: arguments[0].peerNums || [],
				},
			}));
		}
	}

	static options = {};

	/**
	 * Set where log should output (none/console/websocket/file)
	 * @param {{log?: Function, warn?: Function, error?: Function, debug?: Function, packet?: Function}} options
	 */
	static changeOptions(options) {
		this.options = options;

		for (let key in options) {
			if (options[key] == Logging.output.websocket) {
				try {
					this.ws = new WebSocket('ws://127.0.0.1/ws');
					this.ws.on('error', function (error) {

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

module.exports = Logging;
