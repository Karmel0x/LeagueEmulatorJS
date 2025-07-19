
import type RelativeDataView from '../relative-data-view';
import PrimaryPacket, { type PrimaryPacketModel } from './primary-packet';

/**
 * uint32
 */
export type SenderNetId = number;

export type BasePacketModel = PrimaryPacketModel & {
	netId?: SenderNetId;
};

export default class BasePacket extends PrimaryPacket {
	static reader(dvr: RelativeDataView, payload: BasePacketModel) {
		super.reader(dvr, payload);
		payload.netId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: BasePacketModel) {
		super.writer(dvr, payload);
		dvr.writeUint32(payload.netId || 0);
	}
}
