import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';


export type CloseShopModel = BasePacketModel;

/**
 * close shop ui
 * may be used to close shop on getting damage
 */
export default class CloseShop extends BasePacket {

}
