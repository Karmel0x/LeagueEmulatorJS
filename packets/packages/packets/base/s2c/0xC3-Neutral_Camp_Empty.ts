import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export enum TimerType {
	none = 0,
	system = 1,
	audio = 2,
};

export type Neutral_Camp_EmptyModel = BasePacketModel & {
	killerNetId: NetId,
	campIndex: number,
	timerType: TimerType,
	timerExpire: number,
	playVO: boolean,
};

export default class Neutral_Camp_Empty extends BasePacket {
	static create(payload: Partial<Neutral_Camp_EmptyModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		playVO: 1,
	};

	static reader(dvr: RelativeDataView, payload: Neutral_Camp_EmptyModel) {
		super.reader(dvr, payload);

		payload.killerNetId = dvr.readUint32();
		payload.campIndex = dvr.readInt32();
		payload.timerType = dvr.readInt32();
		payload.timerExpire = dvr.readFloat();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.playVO = bitfield1.playVO;
	}

	static writer(dvr: RelativeDataView, payload: Neutral_Camp_EmptyModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.killerNetId);
		dvr.writeInt32(payload.campIndex);
		dvr.writeInt32(payload.timerType);
		dvr.writeFloat(payload.timerExpire);

		dvr.writeBitfield(this.bitfield1, {
			playVO: payload.playVO,
		});
	}
}
