import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';

export type HideObjectiveTextModel = BasePacketModel;

/**
 * hide text in border on middle of the screen
 * to show it use ShowObjectiveText
 */
export default class HideObjectiveText extends BasePacket {

}
