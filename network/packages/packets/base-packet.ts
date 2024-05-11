
import PrimaryPacket, { PrimaryPacketModel } from './primary-packet';
import type RelativeDataView from '../relative-data-view';

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
		dvr.readUint8();// pad?
		dvr.readUint8();// pad?
		dvr.readUint8();// pad?
		payload.netId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: BasePacketModel) {
		super.writer(dvr, payload);
		dvr.writeUint8(0);
		dvr.writeUint8(0);
		dvr.writeUint8(0);
		dvr.writeUint32(payload.netId || 0);
	}
}
