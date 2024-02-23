import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector2, { SVector2Model } from '../../shared/SVector2';
import CMovementDataNormal, { CMovementDataNormalModel } from '../../shared/CMovementDataNormal';
import type { NetId } from '../../types/player';

export enum IssueOrderType {
	orderNone = 0,
	hold = 1,
	moveTo = 2, // right click move
	attackTo = 3, // right click attack
	tempCastSpell = 4,
	petHardAttack = 5,
	petHardMove = 6,
	attackMove = 7,
	taunt = 8,
	petHardReturn = 9,
	stop = 10, // s key stop
	petHardStop = 11,
	use = 12,
	attackTerrainSustained = 13,
	attackTerrainOnce = 14,
	castSpell = 15,
}

export type IssueOrderReqModel = BasePacketModel & {
	orderType: IssueOrderType,
	position: SVector2Model,
	targetNetId: NetId,
	movementData?: CMovementDataNormalModel,
};

// something is different in BatchPacket
//const Vector2c = {
//    x_: 'uint8',
//    x: 'float',
//    y_: 'uint8',
//    y: 'float',
//};

/**
 * Request move
 */
export default class IssueOrderReq extends BasePacket {
	static create(payload: Partial<IssueOrderReqModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: IssueOrderReqModel) {
		super.reader(dvr, payload);

		payload.orderType = dvr.readUint8();
		payload.position = SVector2.read(dvr);
		payload.targetNetId = dvr.readUint32();

		if (dvr.bytesLeft <= 4)
			return;

		payload.movementData = CMovementDataNormal.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: IssueOrderReqModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.orderType);
		SVector2.writer(dvr, payload.position);
		dvr.writeUint32(payload.targetNetId);

		if (!payload.movementData)
			return;

		CMovementDataNormal.writer(dvr, payload.movementData);
	}
}