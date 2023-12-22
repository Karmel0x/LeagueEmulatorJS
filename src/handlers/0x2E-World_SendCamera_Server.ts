
import packets from '../packets/index';

/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x2E-World_SendCamera_Server.js').struct} packet 
 */
export default (player, packet) => {
	//console.log('handle: C2S.World_SendCamera_Server');
	//console.log(packet);

	{
		const packet1 = new packets.World_SendCamera_Server_Acknologment();
		packet1.syncId = packet.syncId;
		player.network.sendPacket(packet1);
	}
};
