import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';
import type { NetId } from '../../types/player';

export type UnitSetShowAutoAttackIndicatorModel = ExtendedPacketModel & {
	objectNetId: NetId,
	showIndicator: boolean,
	showMinimapIndicator: boolean,
};

export default class UnitSetShowAutoAttackIndicator extends ExtendedPacket {
	static create(payload: Partial<UnitSetShowAutoAttackIndicatorModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		showIndicator: 1,
		showMinimapIndicator: 2,
	};

	static reader(dvr: RelativeDataView, payload: UnitSetShowAutoAttackIndicatorModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.showIndicator = bitfield1.showIndicator;
		payload.showMinimapIndicator = bitfield1.showMinimapIndicator;
	}

	static writer(dvr: RelativeDataView, payload: UnitSetShowAutoAttackIndicatorModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);

		dvr.writeBitfield(this.bitfield1, {
			showIndicator: payload.showIndicator,
			showMinimapIndicator: payload.showMinimapIndicator,
		});
	}
}
