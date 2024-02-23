
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.PlayEmoteModel) => {
	console.log('handle: c2s.PlayEmote');
	//console.log(packet);

	{
		const packet1 = packets.PlayEmote.create({
			netId: player.netId,
			emoteId: packet.emoteId,
		});
		player.packets.toVision(packet1);
	}

};
