import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type WorldSendGameNumberModel = BasePacketModel & {
    gameId: number,
    summonerName: string,
};

export default class World_SendGameNumber extends BasePacket {
    static create(payload: Partial<WorldSendGameNumberModel>) {
        return super.create(payload);
    }

    static reader(dvr: RelativeDataView, payload: WorldSendGameNumberModel) {
        super.reader(dvr, payload);

        payload.gameId = dvr.readInt64();
        payload.summonerName = dvr.readStringNullTerminated(128);
    }

    static writer(dvr: RelativeDataView, payload: WorldSendGameNumberModel) {
        super.writer(dvr, payload);

        dvr.writeInt64(payload.gameId);
        dvr.writeStringNullTerminated(payload.summonerName, 128);
    }
}
