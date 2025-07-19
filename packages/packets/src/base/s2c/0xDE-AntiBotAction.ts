import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export enum AntiBotActionType {
    writeLog = 0x0,
    kickOut = 0x1,
    banPlayer = 0x2,
    trojan = 0x3,
    closeClient = 0x4,
};

export type AntiBotActionModel = BasePacketModel & {
    type: number,
};

export default class AntiBotAction extends BasePacket {
    static create(payload: Partial<AntiBotActionModel>) {
        return super.create(payload);
    }

    static reader(dvr: RelativeDataView, payload: AntiBotActionModel) {
        super.reader(dvr, payload);

        payload.type = dvr.readUint8();
    }

    static writer(dvr: RelativeDataView, payload: AntiBotActionModel) {
        super.writer(dvr, payload);

        dvr.writeUint8(payload.type);
    }
}
