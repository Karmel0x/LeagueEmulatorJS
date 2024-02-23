
import Packet from '../packets/packet';
import PrimaryPacket from '../packets/primary-packet';
import BasePacket from '../packets/base-packet';


export default class Registry<Type extends typeof Packet> {

    static primary = new Registry<typeof PrimaryPacket>();
    static base = new Registry<typeof BasePacket>();

    static getPacketRegistry(channel: number, packetId: number) {
        if (channel === 0x00 && packetId === 0x00)
            return this.primary;

        return this.base;
    }

    packets: {
        [packetId: number]: Type
    } = {};

    lastPacketId: number = -1;

    register(packetClass: Type, packetId: number | undefined, channelId: number | undefined) {

        packetClass.id = packetId ?? ++this.lastPacketId;
        packetClass.channel = channelId ?? 0;

        this.packets[packetClass.id] = packetClass;
    }
}
