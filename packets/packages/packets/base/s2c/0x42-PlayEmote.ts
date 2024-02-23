import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import { Emote } from '../c2s/0x48-PlayEmote';

export type PlayEmoteModel = BasePacketModel & {
    emoteId: Emote,
};

export default class PlayEmote extends BasePacket {
    static create(payload: Partial<PlayEmoteModel>) {
        return super.create(payload);
    }

    static reader(dvr: RelativeDataView, payload: PlayEmoteModel) {
        super.reader(dvr, payload);

        payload.emoteId = dvr.readUint8();
    }

    static writer(dvr: RelativeDataView, payload: PlayEmoteModel) {
        super.writer(dvr, payload);

        dvr.writeUint8(payload.emoteId);
    }
}
