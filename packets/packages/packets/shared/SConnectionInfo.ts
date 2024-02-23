import PartialPacket from '@workspace/network/packages/packets/partial-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { ClientId, PlayerId } from '../types/player';

export type SConnectionInfoModel = {
	clientId: ClientId,
	playerId: PlayerId,
	percentage: number,
	ETA: number,
	count: number,
	ping: number,
	ready: boolean,
};

export default class SConnectionInfo extends PartialPacket {
	static bitfield1 = {
		ready: 1,
	};

	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SConnectionInfoModel;
	}

	static reader(dvr: RelativeDataView, payload: SConnectionInfoModel) {
		payload.clientId = dvr.readUint32();
		payload.playerId = dvr.readInt64();
		payload.percentage = dvr.readFloat();
		payload.ETA = dvr.readFloat();
		payload.count = dvr.readUint16();
		payload.ping = dvr.readUint16();

		if (dvr.offset >= dvr.length)
			return;

		// v >= 4.18
		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.ready = bitfield1.ready;
	}

	static writer(dvr: RelativeDataView, payload: SConnectionInfoModel) {
		dvr.writeUint32(payload.clientId);
		dvr.writeInt64(payload.playerId);
		dvr.writeFloat(payload.percentage);
		dvr.writeFloat(payload.ETA);
		dvr.writeUint16(payload.count);
		dvr.writeUint16(payload.ping);

		dvr.writeBitfield(this.bitfield1, {
			ready: payload.ready,
		});
	}
}
