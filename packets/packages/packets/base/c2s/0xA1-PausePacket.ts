import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { ClientId } from '../../types/player';

export type PausePacketModel = BasePacketModel & {
	clientId: ClientId,
	pauseTimeRemaining: number,
	isTournament: boolean,
};

export default class PausePacket extends BasePacket {
	static create(payload: Partial<PausePacketModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isTournament: 1,
	};

	static reader(dvr: RelativeDataView, payload: PausePacketModel) {
		super.reader(dvr, payload);

		payload.clientId = dvr.readUint32();
		payload.pauseTimeRemaining = dvr.readInt32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isTournament = bitfield1.isTournament;
	}

	static writer(dvr: RelativeDataView, payload: PausePacketModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.clientId);
		dvr.writeInt32(payload.pauseTimeRemaining);

		dvr.writeBitfield(this.bitfield1, {
			isTournament: payload.isTournament,
		});
	}
}
