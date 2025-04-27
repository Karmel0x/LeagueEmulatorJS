
import Packet, { PacketDebugger, PacketMessage } from './packets/packet';
import Registry from './registry';
import RelativeDataView from './relative-data-view';


export default class Parser {

	static getPacketClass(channel: number, cmd: number) {
		const packetRegistry = Registry.getPacketRegistry(channel, cmd);
		const packetClass = packetRegistry.packets[`${channel}-${cmd}`] as typeof Packet;

		if (!packetClass)
			throw new Error(`packet not defined ${channel} ${cmd} (0x${channel.toString(16)} 0x${cmd.toString(16)})`);

		return packetClass;
	}

	static read(channel: number, cmd: number, dvr: RelativeDataView) {
		const packetClass = this.getPacketClass(channel, cmd);
		return packetClass.read(dvr);
	}

	static parse(packet: PacketMessage) {
		const dvr = RelativeDataView.from(packet.data);
		PacketDebugger.offsets = {};
		PacketDebugger.readATM = {};

		try {
			const packetId = dvr.readUint8();

			console.log('packetId', packetId, 'channel', packet.channel);
			dvr.offset = 0;
			return this.read(packet.channel, packetId, dvr);
		}
		catch (e) {
			console.log(
				'error parsing packet on offset', dvr.offset, e,
				'offsets', PacketDebugger.offsets,
				'readATM', PacketDebugger.readATM,
				//'readATM', JSON.stringify(PacketDebugger.readATM, null, 2),
			);
			console.log('packet', packet);
			throw new Error(`error parsing packet on offset ${dvr.offset}`);
		}
		//finally {
		//	console.log(
		//		'offsets', PacketDebugger.offsets,
		//		'readATM', PacketDebugger.readATM,
		//	);
		//}
	}

}
