
import RelativeDataView from '../relative-data-view';
import Packet, { PacketDebugger, PacketMessage } from '../packets/packet';
import Registry from './registry';


export default class Parser {

	static read(channel: number, cmd: number, dvr: RelativeDataView) {
		let packetRegistry = Registry.getPacketRegistry(channel, cmd);
		let packetClass = packetRegistry.packets[cmd] as typeof Packet;

		if (!packetClass)
			throw new Error(`packet not defined ${channel} ${cmd} (${channel.toString(16)} ${cmd.toString(16)})`);

		return packetClass.read(dvr);
	}

	static parse(packet: PacketMessage) {
		const dvr = RelativeDataView.from(packet.data);

		try {
			const packetId = dvr.readUint8();
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
		}
	}

}
