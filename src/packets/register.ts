
import Server from '../app/Server';
import BasePacket from './BasePacket';
import channels from './channels';


export default function registerPacket(channelId: number, packetId: number | undefined, packetClass: typeof BasePacket) {

    Server.packets[channelId] = Server.packets[channelId] || {};
    const channelPackets = Server.packets[channelId];

    packetId = packetId ?? Object.keys(channelPackets).length;
    packetClass.id = packetId;
    packetClass.channel = channelId;
    packetClass.channelName = channels[channelId as keyof typeof channels] as string;

    channelPackets[packetId] = packetClass;
}
