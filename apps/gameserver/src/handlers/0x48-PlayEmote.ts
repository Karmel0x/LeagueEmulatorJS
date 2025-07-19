
import * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.PlayEmoteModel) => {
	console.log('handle: c2s.PlayEmote');
	//console.log(packet);

	{
		const owner = player.owner;
		const packet1 = packets.PlayEmote.create({
			netId: owner.netId,
			emoteId: packet.emoteId,
		});
		player.owner.packets.toVision(packet1);
	}

};
