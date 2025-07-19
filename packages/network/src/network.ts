
import EventEmitter from 'events';
import NetworkApiEnet from './network-api/enet';
import type { NetworkApi } from './network-api/network-api';
import type { PacketMessage } from './packets/packet';
import type { PrimaryPacketModel } from './packets/primary-packet';
import Parser from './parser';


export type NetworkConfig = {
	port?: number;
	host?: string;
};

export interface NetworkApiEvents {
	'parse-received': (peerNum: number, channel: number, packet: PrimaryPacketModel) => void;
}

export default class Network {

	static instance: Network;

	static start(config: NetworkConfig = {}) {
		this.instance = new Network(config);
		return this.instance;
	}

	static logPacketSend(peers: number[], data: ArrayBufferLike, channel: number) {
		console.log('sending packet of size', data.byteLength, 'to', peers, 'on channel', channel, 'data:', data);
	}

	static logPacketReceive(peerNum: number, data: ArrayBufferLike, channel: number) {
		console.log('received packet of size', data.byteLength, 'from', peerNum, 'on channel', channel, 'data:', data);
	}

	networkApi: NetworkApi;
	readonly eventEmitter = new EventEmitter();

	constructor(config: NetworkConfig = {}) {
		config.port = config.port || 5119;
		config.host = config.host || '127.0.0.1';

		this.networkApi = new NetworkApiEnet();
		this.networkApi.bind(config.port, config.host);
		console.log('network started on', config.host + ':' + config.port);

		this.networkApi.on('receive', (peerNum: number, data: ArrayBuffer, channel: number) => {
			Network.logPacketReceive(peerNum, data, channel);

			try {
				const packet = Parser.parse({ data, channel });
				if (!packet)
					return;

				this.emit('parse-received', peerNum, channel, packet);
			}
			catch (e) {
				//if (e instanceof Error) {
				//	console.log(e.message);
				//}
			}
		});
	}

	on<T extends keyof NetworkApiEvents>(event: T, listener: NetworkApiEvents[T]) {
		this.eventEmitter.on(event, listener);
		return this;
	}

	once<T extends keyof NetworkApiEvents>(event: T, listener: NetworkApiEvents[T]) {
		this.eventEmitter.once(event, listener);
		return this;
	}

	off<T extends keyof NetworkApiEvents>(event: T, listener: NetworkApiEvents[T]) {
		this.eventEmitter.off(event, listener);
		return this;
	}

	emit<T extends keyof NetworkApiEvents>(event: T, ...args: Parameters<NetworkApiEvents[T]>) {
		this.eventEmitter.emit(event, ...args);
		return this;
	}

	sendData(peers: number[], data: ArrayBufferLike, channel: number, flags?: number) {
		Network.logPacketSend(peers, data, channel);
		peers.forEach((peerNum) => {
			if (peerNum < 0) {
				console.error('invalid peerNum', peerNum);
				//console.trace();
				return;
			}

			//console.log('sending packet of size', data.byteLength, 'to', peerNum, 'on channel', channel, 'cmd:', new Uint8Array(data)[0]);

			// @todo make this copy in cpp or handle encryption other way
			const dest = new ArrayBuffer(data.byteLength);
			new Uint8Array(dest).set(new Uint8Array(data));

			this.networkApi.send(peerNum, dest, channel, flags);
		});
	}

	sendPacket(peers: number[], packet: PacketMessage) {
		this.sendData(peers, packet.data, packet.channel, packet.flags);
	}

}
