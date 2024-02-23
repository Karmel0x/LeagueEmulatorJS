import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

export type ShopItemSubstitutionClearModel = ExtendedPacketModel & {
	originalItemId: number,
};

export default class ShopItemSubstitutionClear extends ExtendedPacket {
	static create(payload: Partial<ShopItemSubstitutionClearModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ShopItemSubstitutionClearModel) {
		super.reader(dvr, payload);

		payload.originalItemId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ShopItemSubstitutionClearModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.originalItemId);
	}
}
