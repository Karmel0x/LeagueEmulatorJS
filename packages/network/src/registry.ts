
import type BasePacket from './packets/base-packet';
import type Packet from './packets/packet';
import type PrimaryPacket from './packets/primary-packet';


export default class Registry<Type extends typeof Packet> {

    static primary = new Registry<typeof PrimaryPacket>();
    static base = new Registry<typeof BasePacket>();

    static getPacketRegistry(channel: number, packetId: number) {
        if (channel === 0x00 && packetId === 0x00)
            return this.primary;

        return this.base;
    }

    packets: {
        [packetId: string]: Type
    } = {};

    register(packetClass: Type, packetId: number | undefined, channelId: number | undefined) {

        packetClass.id = packetId ?? -1;
        packetClass.channel = channelId ?? -1;

        this.packets[`${packetClass.channel}-${packetClass.id}`] = packetClass;
    }
}
