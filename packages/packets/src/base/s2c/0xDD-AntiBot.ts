import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type AntiBotModel = BasePacketModel & {
    eventType: number,
    /** max count = 32768 */
    data: Uint8Array,
};

export default class AntiBot extends BasePacket {
    static create(payload: Partial<AntiBotModel>) {
        return super.create(payload);
    }

    static reader(dvr: RelativeDataView, payload: AntiBotModel) {
        super.reader(dvr, payload);

        payload.eventType = dvr.readUint8();

        let count = dvr.readUint16();
        payload.data = dvr.readUint8Array(count);
    }

    static writer(dvr: RelativeDataView, payload: AntiBotModel) {
        super.writer(dvr, payload);

        dvr.writeUint8(payload.eventType);

        payload.data = payload.data || new Uint8Array(0);
        dvr.writeUint16(payload.data.length);
        dvr.writeByteArray(payload.data);
    }
}
