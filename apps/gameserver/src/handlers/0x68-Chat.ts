
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';

import _chat_admin from './_chat_admin';


export default (player: Player, packet: packets.ChatModel) => {
	console.log('handle: chat.Chat');
	//console.log(packet);


	const packet1 = packets.Chat.create({
		netId: player.netId,
		message: packet.message,
	});
	player.network.sendPacket(packet1);
	console.debug(packet1);

	//const packet2 = new DEBUG_MESSAGE();
	//packet2.netId = player.netId;
	//packet2.message = packet.message;
	//player.network.sendPacket(packet2);

	_chat_admin(player, packet);
};
