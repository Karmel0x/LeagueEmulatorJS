
const Server = require('../app/Server');
const _chat_admin = require('./_chat_admin');


/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: COMMUNICATION.Chat');
	//console.log(packet);


	const Chat = Server.network.createPacket('Chat', 'COMMUNICATION');
	Object.assign(Chat, packet);
	Chat.netId = player.netId;
	player.network.sendPacket(Chat);
	console.debug(Chat);

	//const DEBUG_MESSAGE = Server.network.createPacket('DEBUG_MESSAGE');
	//DEBUG_MESSAGE.netId = player.netId;
	//DEBUG_MESSAGE.msg = packet.msg;
	//player.network.sendPacket(DEBUG_MESSAGE);

	_chat_admin(player, packet);
};
