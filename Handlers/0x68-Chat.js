
const _chat_admin = require('./_chat_admin');


module.exports = (player, packet) => {
	console.log('handle: COMMUNICATION.Chat');
	//console.log(packet);


	var Chat = global.Network.createPacket('Chat', 'COMMUNICATION');
	Object.assign(Chat, packet);
	Chat.netId = player.netId;
	player.sendPacket(Chat);
	console.debug(Chat);

	//var DEBUG_MESSAGE = global.Network.createPacket('DEBUG_MESSAGE');
	//DEBUG_MESSAGE.netId = player.netId;
	//DEBUG_MESSAGE.msg = packet.msg;
	//player.sendPacket(DEBUG_MESSAGE);

	_chat_admin(player, packet);
};
