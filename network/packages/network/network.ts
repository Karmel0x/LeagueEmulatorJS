
import Parser from './parser';
import { PacketMessage } from '../packets/packet';
import { NetworkApi } from './network-api/network-api';
import NetworkApiEnet from './network-api/enet';
import EventEmitter from 'events';
import { PrimaryPacketModel } from '../packets/primary-packet';


export interface NetworkApiEvents {
	'parse-received': (peerNum: number, channel: number, packet: PrimaryPacketModel) => void;
}

export default class Network {

	static instance: Network;

	static start(config: { port?: number; host?: string; } = {}) {
		this.instance = new Network(config);
		return this.instance;
	}

	static logPacketSend(peerNums: number[], data: ArrayBuffer, channel: number) {
		console.log('sending packet of size', data.byteLength, 'to', peerNums, 'on channel', channel, 'data:', data);
	}

	static logPacketReceive(peerNum: number, data: ArrayBuffer, channel: number) {
		console.log('received packet of size', data.byteLength, 'from', peerNum, 'on channel', channel, 'data:', data);
	}

	networkApi: NetworkApi;
	eventEmitter: EventEmitter;

	constructor(config: { port?: number; host?: string; } = {}) {
		config.port = config.port || 5119;
		config.host = config.host || '127.0.0.1';

		this.networkApi = new NetworkApiEnet();
		this.networkApi.bind(config.port, config.host);
		console.log('network started on', config.host + ':' + config.port);

		this.eventEmitter = new EventEmitter();

		this.networkApi.on('receive', (peerNum: number, data: ArrayBuffer, channel: number) => {
			Network.logPacketReceive(peerNum, data, channel);

			let packet = Parser.parse({ data, channel });
			if (!packet)
				return;

			this.emit('parse-received', peerNum, channel, packet);
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

	sendData(peerNums: number[], data: ArrayBuffer, channel: number) {
		Network.logPacketSend(peerNums, data, channel);
		peerNums.forEach((peerNum) => {
			if (peerNum < 0) {
				console.error('invalid peerNum', peerNum);
				//console.trace();
				return;
			}

			this.networkApi.send(peerNum, data, channel);
		});
	}

	sendPacket(peerNums: number[], packet: PacketMessage) {
		this.sendData(peerNums, packet.data, packet.channel);
	}

}
