
import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SConnectionInfo, { SConnectionInfoModel } from '../../shared/SConnectionInfo';

export type Ping_Load_InfoModel = BasePacketModel & SConnectionInfoModel;

export default class Ping_Load_Info extends BasePacket {
    static create(payload: Partial<Ping_Load_InfoModel>) {
        return super.create(payload);
    }

    static reader(dvr: RelativeDataView, payload: Ping_Load_InfoModel) {
        super.reader(dvr, payload);
        SConnectionInfo.reader(dvr, payload);
    }

    static writer(dvr: RelativeDataView, payload: Ping_Load_InfoModel) {
        super.writer(dvr, payload);
        SConnectionInfo.writer(dvr, payload);
    }
}
