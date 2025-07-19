import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type PlayVOCommandModel = BasePacketModel & {
	commandId: number,
	targetId: NetId,
	highlightPlayerIcon: boolean,
	fromPing: boolean,
};

export default class PlayVOCommand extends BasePacket {
	static create(payload: Partial<PlayVOCommandModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		highlightPlayerIcon: 1 << 0,
		fromPing: 1 << 1,
	};

	static reader(dvr: RelativeDataView, payload: PlayVOCommandModel) {
		super.reader(dvr, payload);

		payload.commandId = dvr.readUint32();
		payload.targetId = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.highlightPlayerIcon = bitfield1.highlightPlayerIcon;
		payload.fromPing = bitfield1.fromPing;
	}

	static writer(dvr: RelativeDataView, payload: PlayVOCommandModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.commandId);
		dvr.writeUint32(payload.targetId);

		dvr.writeBitfield(this.bitfield1, {
			highlightPlayerIcon: payload.highlightPlayerIcon,
			fromPing: payload.fromPing,
		});
	}
}
