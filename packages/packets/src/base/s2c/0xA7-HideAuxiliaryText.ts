import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';

export type HideAuxiliaryTextModel = BasePacketModel;

/**
 * hide text in border on right of the screen
 * to show it use ShowAuxiliaryText
 */
export default class HideAuxiliaryText extends BasePacket {

}
