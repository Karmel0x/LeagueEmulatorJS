
import packets from '../packets/index';


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x48-PlayEmote.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.PlayEmote');
	//console.log(packet);

	{
		const packet1 = new packets.PlayEmote();
		packet1.netId = player.netId;
		packet1.emoteId = packet.emoteId;
		player.packets.toVision(packet1);
	}

};
