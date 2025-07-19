
import * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.World_SendCamera_ServerModel) => {
	//console.log('handle: c2s.World_SendCamera_Server');
	//console.log(packet);

	{
		const packet1 = packets.World_SendCamera_Server_Acknologment.create({
			syncId: packet.syncId,
		});

		player.network.sendPacket(packet1);
	}
};
