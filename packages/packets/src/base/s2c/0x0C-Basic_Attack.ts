import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SBasicAttackData, { SBasicAttackDataModel } from '../../shared/SBasicAttackData';

export type Basic_AttackModel = BasePacketModel & SBasicAttackDataModel;

export default class Basic_Attack extends BasePacket {
	static create(payload: Partial<Basic_AttackModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: Basic_AttackModel) {
		super.reader(dvr, payload);

		SBasicAttackData.reader(dvr, payload);
	}

	static writer(dvr: RelativeDataView, payload: Basic_AttackModel) {
		super.writer(dvr, payload);

		SBasicAttackData.writer(dvr, payload);
	}
}
