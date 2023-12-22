
import packets from '../packets/index';
import _chat_admin from './_chat_admin';


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/COMMUNICATION/0x68-Chat.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: COMMUNICATION.Chat');
	//console.log(packet);


	const packet1 = new packets.Chat();
	Object.assign(packet1, packet);
	packet1.netId = player.netId;
	player.network.sendPacket(packet1);
	console.debug(packet1);

	//const packet2 = new DEBUG_MESSAGE();
	//packet2.netId = player.netId;
	//packet2.msg = packet.msg;
	//player.network.sendPacket(packet2);

	_chat_admin(player, packet);
};
