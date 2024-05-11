import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { ClientId } from '../../types/player';

export type SynchVersionC2SModel = BasePacketModel & {
	clientId: ClientId,
	version: string,
};

export default class SynchVersionC2S extends BasePacket {
	static create(payload: Partial<SynchVersionC2SModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SynchVersionC2SModel) {
		super.reader(dvr, payload);

		dvr.readFloat();
		payload.clientId = dvr.readUint32();
		payload.version = dvr.readStringNullTerminated(256);
	}

	static writer(dvr: RelativeDataView, payload: SynchVersionC2SModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(0);
		dvr.writeUint32(payload.clientId);
		dvr.writeStringNullTerminated(payload.version, 256);
	}
}
