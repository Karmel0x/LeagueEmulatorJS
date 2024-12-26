import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type PlayVOCommandC2SModel = BasePacketModel & {
	commandId: number,
	targetNetId: NetId,
	eventHash: number,
	highlightPlayerIcon: boolean,
	fromPing: boolean,
	alliesOnly: boolean,
};

export default class PlayVOCommandC2S extends BasePacket {
	static create(payload: Partial<PlayVOCommandC2SModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		highlightPlayerIcon: 1 << 0,
		fromPing: 1 << 1,
		alliesOnly: 1 << 2,
	};

	static reader(dvr: RelativeDataView, payload: PlayVOCommandC2SModel) {
		super.reader(dvr, payload);

		payload.commandId = dvr.readUint32();
		payload.targetNetId = dvr.readUint32();
		payload.eventHash = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.highlightPlayerIcon = bitfield1.highlightPlayerIcon;
		payload.fromPing = bitfield1.fromPing;
		payload.alliesOnly = bitfield1.alliesOnly;
	}

	static writer(dvr: RelativeDataView, payload: PlayVOCommandC2SModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.commandId);
		dvr.writeUint32(payload.targetNetId);
		dvr.writeUint32(payload.eventHash);

		dvr.writeBitfield(this.bitfield1, {
			highlightPlayerIcon: payload.highlightPlayerIcon,
			fromPing: payload.fromPing,
			alliesOnly: payload.alliesOnly,
		});
	}
}
