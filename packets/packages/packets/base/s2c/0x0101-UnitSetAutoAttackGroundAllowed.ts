import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';
import type { NetId } from '../../types/player';

export type UnitSetAutoAttackGroundAllowedModel = ExtendedPacketModel & {
	objectNetId: NetId,
	canAutoAttackGroundState: number,
};

export default class UnitSetAutoAttackGroundAllowed extends ExtendedPacket {
	static create(payload: Partial<UnitSetAutoAttackGroundAllowedModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetAutoAttackGroundAllowedModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.canAutoAttackGroundState = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: UnitSetAutoAttackGroundAllowedModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.canAutoAttackGroundState);
	}
}
