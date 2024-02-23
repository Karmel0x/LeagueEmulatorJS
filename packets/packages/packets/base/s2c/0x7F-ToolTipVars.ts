import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type ToolTipVarsModel = BasePacketModel & {
	tooltips: {
		ownerNetId: NetId,
		slotIndex: number,
		values: number[],
		hideFromEnemy: boolean[],
	}[],
};

export default class ToolTipVars extends BasePacket {
	static create(payload: Partial<ToolTipVarsModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ToolTipVarsModel) {
		super.reader(dvr, payload);

		const count = dvr.readUint16();
		payload.tooltips = dvr.readArray(() => ({
			ownerNetId: dvr.readUint32(),
			slotIndex: dvr.readUint8(),
			values: dvr.readArray(() => dvr.readFloat(), 16),
			hideFromEnemy: dvr.readArray(() => dvr.readBool(), 16),
		}), count);
	}

	static writer(dvr: RelativeDataView, payload: ToolTipVarsModel) {
		if (!payload.tooltips || payload.tooltips.length < 1)
			return;

		super.writer(dvr, payload);

		dvr.writeUint16(payload.tooltips.length);
		payload.tooltips.forEach(tooltip => {
			dvr.writeUint32(tooltip.ownerNetId);
			dvr.writeUint8(tooltip.slotIndex);
			dvr.writeArray(tooltip.values, value => dvr.writeFloat(value), 16);
			dvr.writeArray(tooltip.hideFromEnemy, value => dvr.writeBool(value), 16);
		});
	}
}
