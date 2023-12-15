
import Server from '../app/Server.js';
import channels from './channels.js';

/**
 * 
 * @param {number} channelId 
 * @param {number | undefined} packetId 
 * @param {typeof import('./BasePacket.js').default} packetClass 
 */
function registerPacket(channelId, packetId, packetClass) {

    Server.packets[channelId] = Server.packets[channelId] || {};
    const channelPackets = Server.packets[channelId];

    packetId = packetId ?? Object.keys(channelPackets).length;
    packetClass.id = packetId;
    packetClass.channel = channelId;
    packetClass.channelName = channels[channelId];

    channelPackets[packetId] = packetClass;
}

export default registerPacket;
