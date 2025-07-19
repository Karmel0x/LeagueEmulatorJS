import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type SystemMessageModel = BasePacketModel & {
	sourceNetId: NetId,
	message: string,
};

/**
 * Orange message on chat box
 */
export default class SystemMessage extends BasePacket {
	static create(payload: Partial<SystemMessageModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SystemMessageModel) {
		super.reader(dvr, payload);

		payload.sourceNetId = dvr.readUint32();
		payload.message = dvr.readStringNullTerminated(512);
	}

	static writer(dvr: RelativeDataView, payload: SystemMessageModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.sourceNetId);
		dvr.writeStringNullTerminated(payload.message, 512);
	}
}
