import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SBasicAttackData, { SBasicAttackDataModel } from '../../shared/SBasicAttackData';
import SVector2, { SVector2Model } from '../../shared/SVector2';

export type Basic_Attack_PosModel = BasePacketModel & SBasicAttackDataModel & {
	position: SVector2Model,
};

export default class Basic_Attack_Pos extends BasePacket {
	static create(payload: Partial<Basic_Attack_PosModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: Basic_Attack_PosModel) {
		super.reader(dvr, payload);

		SBasicAttackData.reader(dvr, payload);
		payload.position = SVector2.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: Basic_Attack_PosModel) {
		super.writer(dvr, payload);

		SBasicAttackData.writer(dvr, payload);
		SVector2.writer(dvr, payload.position);
	}
}
