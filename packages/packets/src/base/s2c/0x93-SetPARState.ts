import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type SetPARStateModel = BasePacketModel & {
	unitNetId: NetId,
	parStateId: number,
};

export default class SetPARState extends BasePacket {
	static create(payload: Partial<SetPARStateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetPARStateModel) {
		super.reader(dvr, payload);

		payload.unitNetId = dvr.readUint32();
		payload.parStateId = dvr.readInt32();//readUint32
	}

	static writer(dvr: RelativeDataView, payload: SetPARStateModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.unitNetId);
		dvr.writeInt32(payload.parStateId);//writeUint32
	}
}
