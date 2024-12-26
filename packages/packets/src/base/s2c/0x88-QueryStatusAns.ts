import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type QueryStatusAnsModel = BasePacketModel & {
	response: boolean,
};

export default class QueryStatusAns extends BasePacket {
	static create(payload: Partial<QueryStatusAnsModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: QueryStatusAnsModel) {
		super.reader(dvr, payload);

		payload.response = dvr.readBool();
	}

	static writer(dvr: RelativeDataView, payload: QueryStatusAnsModel) {
		super.writer(dvr, payload);

		dvr.writeBool(payload.response);
	}
}
