import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

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
